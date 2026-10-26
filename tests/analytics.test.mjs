import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createContext, runInContext } from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../src/components/Analytics.astro', import.meta.url), 'utf8');
const bootstrap = source.match(/<script is:inline>([\s\S]*?)<\/script>/)[1];
const client = ts.transpileModule(source.match(/<script>([\s\S]*?)<\/script>/)[1], {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const helper = ts.transpileModule(readFileSync(new URL('../src/lib/analytics.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function browser({ host = 'aicookcode.com', search = '', storage = new Map(), brokenStorage = false, article = true } = {}) {
  const scripts = [];
  const documentListeners = new Map();
  const windowListeners = new Map();
  let now = 0;
  let interval;
  let focused = true;
  let top = 2000;
  class Element {
    constructor(href) { this.href = href; }
    closest() { return this; }
  }
  const content = { dataset: { articleId: 'ai-tutor-kids' }, getBoundingClientRect: () => ({ top, height: 4000 }) };
  const document = {
    visibilityState: 'visible',
    hasFocus: () => focused,
    head: { append: (script) => scripts.push(script) },
    createElement: () => ({}),
    querySelector: () => article ? content : null,
    addEventListener: (name, callback) => documentListeners.set(name, callback),
    removeEventListener: (name) => documentListeners.delete(name),
  };
  const context = createContext({
    URL, URLSearchParams, Element, document, innerHeight: 800,
    location: { hostname: host, origin: `https://${host}`, pathname: '/articles/ai-tutor-kids/', search },
    localStorage: {
      getItem: (key) => { if (brokenStorage) throw Error('storage blocked'); return storage.get(key) ?? null; },
      setItem: (key, value) => { if (brokenStorage) throw Error('storage blocked'); storage.set(key, value); },
      removeItem: (key) => { if (brokenStorage) throw Error('storage blocked'); storage.delete(key); },
    },
    performance: { now: () => now },
    setInterval: (callback) => { interval = callback; return 1; },
    clearInterval: () => { interval = undefined; },
    addEventListener: (name, callback) => windowListeners.set(name, callback),
    removeEventListener: (name) => windowListeners.delete(name),
    exports: {},
  });
  context.window = context;
  runInContext(bootstrap, context);
  runInContext(helper, context);
  const trackEvent = context.exports.trackEvent;
  context.exports = {};
  context.require = () => ({ trackEvent });
  runInContext(client, context);
  return {
    context, scripts, storage,
    events: () => Array.from(context.dataLayer ?? [], (item) => Array.from(item)).filter((item) => item[0] === 'event'),
    tick: (seconds) => { for (let i = 0; i < seconds; i++) { now += 1000; interval?.(); } },
    reach: () => { top = -2300; windowListeners.get('scroll')?.(); },
    hide: () => { document.visibilityState = 'hidden'; documentListeners.get('visibilitychange')?.(); },
    show: () => { document.visibilityState = 'visible'; documentListeners.get('visibilitychange')?.(); },
    blur: () => { focused = false; windowListeners.get('blur')?.(); },
    focus: () => { focused = true; windowListeners.get('focus')?.(); },
    click: (href) => documentListeners.get('click')?.({ target: new Element(href) }),
  };
}

test('GA4 initializes once on the production host and remains disabled on local and preview hosts', () => {
  const production = browser();
  assert.equal(production.scripts.length, 1);
  const configs = Array.from(production.context.dataLayer).filter((item) => item[0] === 'config');
  assert.equal(configs.length, 1);
  assert.equal(configs[0][1], 'G-DPEF8K5DH3');
  for (const host of ['localhost', '127.0.0.1', 'preview.aicookcode.pages.dev']) {
    const preview = browser({ host });
    preview.click(`https://${host}/rss.xml`);
    preview.reach(); preview.tick(65);
    assert.equal(preview.scripts.length, 0, host);
    assert.equal(preview.events().length, 0, host);
  }
});

test('browser opt-out persists across visits and explicit opt-in restores tracking', () => {
  const disabled = browser({ search: '?analytics=off' });
  disabled.click('https://aicookcode.com/rss.xml');
  assert.equal(disabled.scripts.length, 0);
  assert.equal(disabled.events().length, 0);
  assert.equal(browser({ storage: disabled.storage }).scripts.length, 0);
  assert.equal(browser({ storage: disabled.storage, search: '?analytics=on' }).scripts.length, 1);
  assert.equal(browser({ search: '?analytics=off', brokenStorage: true }).scripts.length, 0);
});

test('effective reading requires both 60 active seconds and 75 percent of the actual article, once per load', () => {
  const earlyScroll = browser();
  earlyScroll.reach(); earlyScroll.tick(59);
  assert.equal(earlyScroll.events().length, 0);
  earlyScroll.tick(1);
  assert.equal(earlyScroll.events().length, 1);
  assert.equal(earlyScroll.events()[0][1], 'article_read');
  assert.equal(earlyScroll.events()[0][2].article_id, 'ai-tutor-kids');
  earlyScroll.tick(90); earlyScroll.reach();
  assert.equal(earlyScroll.events().length, 1);
  const stayedAtTop = browser();
  stayedAtTop.tick(70);
  assert.equal(stayedAtTop.events().length, 0);
  stayedAtTop.reach();
  assert.equal(stayedAtTop.events().length, 1);
});

test('hidden or unfocused tabs do not accrue reading time; non-article pages do not report reads', () => {
  const reader = browser();
  reader.reach(); reader.tick(20);
  reader.hide(); reader.tick(100); reader.show();
  reader.blur(); reader.tick(100); reader.focus(); reader.tick(39);
  assert.equal(reader.events().length, 0);
  reader.tick(1);
  assert.equal(reader.events().length, 1);
  const listing = browser({ article: false });
  listing.tick(100);
  assert.equal(listing.events().length, 0);
});

test('intent events distinguish RSS, contact and repositories without sending email addresses or query strings', () => {
  const visitor = browser();
  for (const href of [
    'https://aicookcode.com/rss.xml',
    'mailto:private@example.com?subject=private',
    'https://x.com/aicookcode',
    'https://t.me/aicookcode',
    'https://github.com/HKUDS/DeepTutor?secret=private',
    'https://github.com/aicookcode',
    'https://aicookcode.com/articles/',
  ]) visitor.click(href);
  assert.deepEqual(visitor.events().map((event) => event[1]), ['rss_subscribe_click', 'contact_click', 'contact_click', 'contact_click', 'project_visit']);
  const data = JSON.stringify(visitor.events());
  assert.doesNotMatch(data, /private|secret/);
  assert.equal(visitor.events().at(-1)[2].project_path, '/HKUDS/DeepTutor');
});
