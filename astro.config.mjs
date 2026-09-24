import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Keep sitemap lastmod aligned with deliberate editorial updates, not every build.
const recentlyUpdatedPages = new Map([
  ['/articles/jev-ai-decision-engine/', new Date('2026-09-24T04:00:00.000Z')],
  ['/articles/workbuddy-mini-program-development/', new Date('2026-09-24T04:00:00.000Z')],
  ['/articles/workbuddy-mini-program-launch/', new Date('2026-09-24T04:00:00.000Z')],
]);

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
