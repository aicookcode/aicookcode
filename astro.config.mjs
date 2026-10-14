import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Keep sitemap lastmod aligned with deliberate editorial updates, not every build.
// This batch changes article links, featured placement, and publication dates.
const currentEditorialUpdate = new Date('2026-10-14T04:27:00.000Z');
const recentlyUpdatedPages = new Map([
  ['/', currentEditorialUpdate],
  ['/articles/', currentEditorialUpdate],
  ['/topics/ai/', currentEditorialUpdate],
  ['/topics/github/', currentEditorialUpdate],
  ['/articles/agent-loop-guide/', currentEditorialUpdate],
  ['/articles/ai-prompt-workflow/', currentEditorialUpdate],
  ['/articles/claude-feishu-integration/', currentEditorialUpdate],
  ['/articles/kling-4-ai-video/', currentEditorialUpdate],
  ['/articles/logo-design-skill/', currentEditorialUpdate],
  ['/articles/video-to-agent-skill/', currentEditorialUpdate],
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
