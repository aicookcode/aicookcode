import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createContext, runInContext } from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../src/components/Search.astro', import.meta.url), 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
const script = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const posts = [{ title: 'Qwen 本地语音', tags: ['TTS'], category: 'AI 应用', description: '本地配音教程', body: 'Windows CPU', url: '/articles/local-voice-cloning/' }];

function browser() {
  const timers = new Map();
  const events = [];
  let nextTimer = 0;
  class Element {
    listeners = new Map();
    children = [];
    value = '';
    open = true;
    textContent = '';
    addEventListener(name, callback) { this.listeners.set(name, callback); }
    replaceChildren() { this.children = []; }
    append(...children) { this.children.push(...children); }
    focus() {}
    showModal() { this.open = true; }
    close() { this.open = false; this.listeners.get('close')?.(); }
  }
  const elements = new Map(['#search-dialog', '#search-input', '#search-status', '#search-results', '[data-search-close]'].map((key) => [key, new Element()]));
  const document = {
    querySelector: (key) => elements.get(key),
    querySelectorAll: () => [],
    createElement: () => new Element(),
    addEventListener() {},
    body: { classList: { add() {}, remove() {} } },
  };
  const context = createContext({
    document, HTMLElement: Element, exports: {},
    require: () => ({ trackEvent: (name, params) => events.push({ name, params }) }),
    fetch: async () => ({ ok: true, json: async () => posts }),
    setTimeout: (callback, delay) => { timers.set(++nextTimer, { callback, delay }); return nextTimer; },
    clearTimeout: (id) => timers.delete(id),
  });
  runInContext(script, context);
  return {
    events, elements,
    input(value) {
      const element = elements.get('#search-input');
      element.value = value;
      element.listeners.get('input')();
    },
    async advance(delay) {
      for (const [id, timer] of [...timers]) {
        if (timer.delay !== delay) continue;
        timers.delete(id);
        await timer.callback();
      }
      await new Promise(setImmediate);
    },
    close() { elements.get('#search-dialog').close(); },
  };
}

test('search remains functional and sends one settled event without the query or result text', async () => {
  const visitor = browser();
  visitor.input('Q'); visitor.input('Qw'); visitor.input('Qwen');
  await visitor.advance(120);
  assert.equal(visitor.elements.get('#search-results').children.length, 1);
  assert.equal(visitor.events.length, 0);
  await visitor.advance(600);
  assert.equal(visitor.events.length, 1);
  assert.equal(visitor.events[0].name, 'site_search');
  assert.equal(visitor.events[0].params.result_count, 1);
  assert.equal(visitor.events[0].params.query_length, 4);
  assert.doesNotMatch(JSON.stringify(visitor.events), /Qwen|语音|Windows|local-voice/);
  visitor.input('Qwen'); await visitor.advance(120); await visitor.advance(600);
  assert.equal(visitor.events.length, 1, 'The same displayed query must not be counted twice');
});

test('empty-result searches report zero and closing the dialog cancels pending analytics', async () => {
  const visitor = browser();
  visitor.input('private@example.com'); await visitor.advance(120); await visitor.advance(600);
  assert.match(visitor.elements.get('#search-status').textContent, /没有找到/);
  assert.equal(visitor.events[0].params.result_count, 0);
  assert.doesNotMatch(JSON.stringify(visitor.events), /private|example|@/);
  visitor.input('Windows'); await visitor.advance(120); visitor.close(); await visitor.advance(600);
  assert.equal(visitor.events.length, 1);
  visitor.input(''); await visitor.advance(120); await visitor.advance(600);
  assert.equal(visitor.events.length, 1);
});
