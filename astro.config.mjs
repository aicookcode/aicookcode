import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Keep sitemap lastmod aligned with deliberate editorial updates, not every build.
// Listing pages have their own editorial dates; articles use their frontmatter.
const currentEditorialUpdate = new Date('2026-10-14T04:27:00.000Z');
const recentlyUpdatedPages = new Map([
  ['/', currentEditorialUpdate],
  ['/articles/', currentEditorialUpdate],
  ['/topics/ai/', currentEditorialUpdate],
  ['/topics/github/', currentEditorialUpdate],
]);

// Read only the ISO date fields in frontmatter, never dates in the article body.
// These are the same updatedDate/pubDate fields used by BlogPosting metadata.
const blogDirectory = fileURLToPath(new URL('./src/content/blog/', import.meta.url));
for (const filename of readdirSync(blogDirectory, { recursive: true })) {
  if (!filename.endsWith('.md')) continue;
  const source = readFileSync(join(blogDirectory, filename), 'utf8');
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
  const readDate = (field) => frontmatter?.match(new RegExp(`^${field}:\\s*["']?([0-9][^"'\\r\\n]*)["']?\\s*$`, 'm'))?.[1]?.trim();
  const date = new Date(readDate('updatedDate') ?? readDate('pubDate'));
  if (Number.isNaN(date.valueOf())) throw new Error(`Invalid sitemap date in ${filename}`);
  const slug = filename.replaceAll('\\', '/').replace(/\.md$/, '');
  recentlyUpdatedPages.set(`/articles/${slug}/`, date);
}

export default defineConfig({
  site: 'https://aicookcode.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({
    serialize: (item) => {
      const lastmod = recentlyUpdatedPages.get(new URL(item.url).pathname);
      return lastmod ? { ...item, lastmod } : item;
    },
  })],
  markdown: {
    shikiConfig: { theme: 'github-dark', wrap: false },
  },
});
