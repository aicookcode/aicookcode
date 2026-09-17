import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../config/site';

export type Post = CollectionEntry<'blog'>;
export async function getPosts() {
  return (await getCollection('blog', ({ data }) => !data.draft && data.pubDate <= new Date()))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
export const postUrl = (post: Post) => `${site.url}/articles/${post.id}/`;
export const dateLabel = (date: Date) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Shanghai',
}).format(date).replaceAll('/', '.');
export const readMinutes = (post: Post) => Math.max(1, Math.ceil((post.body?.length ?? 0) / 450));
