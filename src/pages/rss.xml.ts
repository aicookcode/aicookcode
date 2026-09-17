import rss from '@astrojs/rss';
import { getPosts, postUrl } from '../lib/posts';
import { site } from '../config/site';
export async function GET() {
  return rss({ title: site.title, description: site.description, site: site.url,
    items: (await getPosts()).map((post) => ({ title: post.data.title, pubDate: post.data.pubDate, description: post.data.description, link: postUrl(post), categories: post.data.tags })),
    customData: '<language>zh-cn</language>',
  });
}
