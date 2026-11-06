import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../dist/', import.meta.url);
const site = 'https://aicookcode.com';
const files = readdirSync(root, { recursive: true }).filter((file) => file.endsWith('.html'));
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const routeFor = (file) => `/${file.replaceAll('\\', '/').replace(/index\.html$/, '')}`;
const pages = files.filter((file) => file !== '404.html').map((file) => ({
  path: routeFor(file), html: read(file.replaceAll('\\', '/')),
}));
assert.ok(pages.length > 0, 'Run npm run build before npm test');
const page = (path) => pages.find((page) => page.path === path)?.html ?? '';

test('public pages have a single self canonical and allow indexing; 404 remains noindex', () => {
  for (const { path, html } of pages) {
    const canonicals = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/g)];
    assert.equal(canonicals.length, 1, path);
    assert.equal(canonicals[0][1], site + path, path);
    assert.match(html, /name="robots" content="index,follow/, path);
  }
  assert.match(read('404.html'), /name="robots" content="noindex,follow"/);
});

test('every rendered internal anchor resolves to an actual page or public file', () => {
  for (const { path, html } of pages) {
    for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      const url = new URL(href.replaceAll('&amp;', '&'), site + path);
      if (url.origin !== site || !['http:', 'https:'].includes(url.protocol)) continue;
      const target = decodeURIComponent(url.pathname).slice(1);
      assert.ok(existsSync(new URL(target, root)) || existsSync(new URL(join(target, 'index.html').replaceAll('\\', '/'), root)), `${path} -> ${href}`);
      assert.ok(!url.pathname.startsWith('/tags/'), `${path} links to retired tag ${href}`);
    }
  }
});

test('sitemap contains exactly the canonical public HTML pages and truthful priority article dates', () => {
  const xml = read('sitemap-0.xml');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(new Set(urls).size, urls.length);
  assert.deepEqual(new Set(urls), new Set(pages.map(({ path }) => site + path)));
  for (const slug of ['ai-tutor-kids', 'agent-loop-guide']) {
    const entry = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].find((match) => match[1].includes(`/articles/${slug}/`))?.[1];
    assert.match(entry ?? '', /<lastmod>2026-10-27(?:T00:00:00\.000Z)?<\/lastmod>/);
    const html = page(`/articles/${slug}/`);
    assert.match(html, /"dateModified":"2026-10-27T00:00:00\.000Z"/);
    assert.match(html, /内容更新：/);
  }
  for (const tag of ['Nginx', '微信小程序', '后端', '阿里云', 'Vibe Coding', '小程序发布']) {
    assert.ok(!existsSync(new URL(`tags/${tag}/index.html`, root)));
  }
});

test('priority tutorials retain crawlable links without the removed task module', () => {
  for (const path of ['/', '/topics/', '/topics/ai/', '/topics/github/']) {
    const html = page(path);
    assert.doesNotMatch(html, /class="learning-path|从一个具体任务开始/, path);
  }
  for (const [path, slug] of [
    ['/', 'ai-tutor-kids'], ['/', 'agent-loop-guide'],
    ['/topics/github/', 'ai-tutor-kids'], ['/topics/ai/', 'agent-loop-guide'],
  ]) {
    assert.match(page(path), new RegExp(`href="/articles/${slug}/"`), path);
  }
  for (const slug of ['ai-tutor-kids', 'agent-loop-guide']) {
    assert.match(page(`/articles/${slug}/`), /aria-label="推荐阅读顺序"/);
    assert.match(page(`/articles/${slug}/`), new RegExp(`data-article-id="${slug}"`));
  }
});

test('curated topic hubs and member articles link to each other in static HTML', () => {
  for (const [slug, articles] of [
    ['workbuddy', ['workbuddy-5-settings', 'workbuddy-mini-program-development', 'workbuddy-mini-program-launch']],
    ['ai-avatar', ['ai-talking-avatar', 'local-voice-cloning', 'voice-clone-local-tool']],
    ['ui-assets', ['ui-assets-skill', 'website-clone-ai']],
  ]) {
    for (const listing of ['/topics/', '/topics/ai/']) {
      assert.ok(page(listing).includes(`href="/topics/${slug}/"`), listing);
    }
    for (const article of articles) {
      assert.ok(page(`/topics/${slug}/`).includes(`href="/articles/${article}/"`), `${slug} -> ${article}`);
      assert.ok(page(`/articles/${article}/`).includes(`href="/topics/${slug}/"`), `${article} -> ${slug}`);
    }
  }
});

test('three editorial tracks preserve category routes and lead to evidence-bearing tutorials', () => {
  for (const path of ['/', '/topics/']) {
    const html = page(path);
    for (const label of ['AI 工具真实实测', '独立建站上线复盘', '普通用户可复现工作流']) assert.ok(html.includes(label), `${path}: ${label}`);
    for (const slug of ['ai-talking-avatar', 'local-voice-cloning', 'ui-assets-skill', 'workbuddy-mini-program-development', 'astro-cloudflare']) {
      assert.ok(html.includes(`href="/articles/${slug}/"`), `${path}: ${slug}`);
    }
    for (const slug of ['ai', 'github', 'web', 'tools']) assert.ok(html.includes(`href="/topics/${slug}/"`), `${path}: retained ${slug}`);
  }
});

test('independent product entries appear in the about context without a global cross-link module', () => {
  for (const href of ['https://astroew.com/chart', 'https://validusaddr.aicook.de5.net/']) {
    assert.ok(page('/about/').includes(`href="${href}"`));
    for (const path of ['/', '/topics/', '/articles/ai-talking-avatar/']) assert.ok(!page(path).includes(`href="${href}"`), path);
  }
});
