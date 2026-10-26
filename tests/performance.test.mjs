import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { parse } from 'parse5';
import sharp from 'sharp';

const root = new URL('../dist/', import.meta.url);
const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const hasClass = (node, name) => attr(node, 'class')?.split(/\s+/).includes(name);
function nodes(path) {
  const result = [];
  function walk(node, parents = []) {
    result.push({ node, parents });
    for (const child of node.childNodes ?? []) walk(child, [...parents, node]);
  }
  walk(parse(readFileSync(new URL(path, root), 'utf8')));
  return result;
}
const pages = readdirSync(root, { recursive: true }).filter((file) => file.endsWith('.html')).map((file) => ({ file, nodes: nodes(file.replaceAll('\\', '/')) }));

test('all production image candidates exist, have dimensions and reserve the correct aspect ratio', async () => {
  const checked = new Set();
  for (const { file, nodes } of pages) {
    for (const { node } of nodes.filter(({ node }) => node.tagName === 'img')) {
      const src = attr(node, 'src');
      if (!src?.startsWith('/')) continue;
      assert.ok(Number(attr(node, 'width')) > 0 && Number(attr(node, 'height')) > 0, `${file}: missing image dimensions`);
      const candidates = (attr(node, 'srcset') ?? '').split(',').filter(Boolean).map((entry) => entry.trim().split(/\s+/));
      assert.ok(existsSync(new URL(`.${src}`, root)), `${file}: ${src}`);
      if (src.startsWith('/_astro/')) {
        assert.ok(candidates.length > 0 && attr(node, 'sizes'), `${file}: missing responsive candidates`);
        assert.match(src, /\.webp$/);
      }
      for (const [url, width] of candidates) {
        const target = new URL(`.${url}`, root);
        assert.ok(existsSync(target), `${file}: missing ${url}`);
        if (!checked.has(url)) {
          const metadata = await sharp(readFileSync(target)).metadata();
          assert.equal(metadata.width, Number.parseInt(width));
          const expectedHeight = Math.max(1, Math.round(metadata.width * Number(attr(node, 'height')) / Number(attr(node, 'width'))));
          assert.ok(Math.abs(metadata.height - expectedHeight) <= 1, `${file}: unexpected crop for ${url}`);
          checked.add(url);
        }
      }
    }
  }
  assert.ok(checked.size > 100, 'The pipeline must cover article screenshots as well as covers');
});

test('home LCP and first archive cover are eager; article images after the first are lazy', () => {
  const home = nodes('index.html').find(({ node, parents }) => node.tagName === 'img' && parents.some((parent) => hasClass(parent, 'feature-story'))).node;
  assert.equal(attr(home, 'loading'), 'eager');
  assert.equal(attr(home, 'fetchpriority'), 'high');
  for (const path of ['articles/index.html', 'topics/ai/index.html']) {
    const cover = nodes(path).find(({ node, parents }) => node.tagName === 'img' && parents.some((parent) => hasClass(parent, 'post-cover'))).node;
    assert.equal(attr(cover, 'loading'), 'eager');
    assert.equal(attr(cover, 'fetchpriority'), 'high');
  }
  const bodyImages = nodes('articles/ui-assets-skill/index.html').filter(({ node, parents }) => node.tagName === 'img' && parents.some((parent) => attr(parent, 'data-article-content') !== undefined));
  assert.equal(attr(bodyImages[0].node, 'loading'), 'eager');
  assert.ok(bodyImages.length > 1);
  assert.ok(bodyImages.slice(1).every(({ node }) => attr(node, 'loading') === 'lazy'));
});

test('largest known covers and logo stay within image payload budgets; original public URLs remain intact', () => {
  const report = JSON.parse(readFileSync(new URL('../test-results/image-optimization.json', import.meta.url), 'utf8'));
  for (const source of ['/media/ai-tutor-kids/cover.jpg', '/media/ai-talking-avatar/cover.jpg', '/media/ui-assets-skill/cover-website-v2.png', '/logoImage/logo-5.png']) {
    const variants = report.images.filter((image) => image.original === source);
    assert.ok(variants.length > 1, source);
    const mobile = variants.find((image) => image.width === (source.includes('logoImage') ? 240 : 640));
    assert.ok(mobile.bytes < 65 * 1024, source);
    assert.ok(mobile.bytes < mobile.originalBytes * 0.1, source);
    assert.equal(statSync(new URL(`.${source}`, root)).size, mobile.originalBytes, `${source}: original changed`);
  }
});

test('production styles do not request remote fonts and video files load on demand', () => {
  for (const file of readdirSync(new URL('_astro/', root)).filter((file) => file.endsWith('.css'))) {
    assert.doesNotMatch(readFileSync(new URL(`_astro/${file}`, root), 'utf8'), /fonts\.(?:googleapis|gstatic)\.com|@import/);
  }
  for (const { nodes } of pages) {
    for (const { node } of nodes.filter(({ node }) => node.tagName === 'video')) {
      if (attr(node, 'autoplay') === undefined) assert.equal(attr(node, 'preload'), 'none');
      const poster = attr(node, 'poster');
      if (poster?.startsWith('/')) assert.ok(existsSync(new URL(`.${poster}`, root)));
    }
  }
});

test('muted text clears 4.5:1 against every light-theme surface', () => {
  const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
  const light = css.match(/:root\{([^}]+)\}/)[1];
  const color = (key) => {
    const hex = light.match(new RegExp(`--${key}:(#[a-f0-9]{3,6})`))[1];
    return hex.length === 4 ? '#' + hex.slice(1).split('').map((part) => part + part).join('') : hex;
  };
  const luminance = (hex) => {
    const rgb = hex.slice(1).match(/../g).map((channel) => Number.parseInt(channel, 16) / 255).map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  for (const key of ['bg', 'surface', 'surface-soft', 'green-soft']) {
    const contrast = (luminance(color(key)) + 0.05) / (luminance(color('muted')) + 0.05);
    assert.ok(contrast >= 4.5, `${key}: ${contrast.toFixed(2)}:1`);
  }
});
