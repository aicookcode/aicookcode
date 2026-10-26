import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../config/site';
import { learningPaths } from '../config/learning-paths';

export type Post = CollectionEntry<'blog'>;
export async function getPosts() {
  return (await getCollection('blog', ({ data }) => !data.draft && data.pubDate <= new Date()))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
export const postPath = (post: Post) => `/articles/${post.id}/`;
export const postUrl = (post: Post) => `${site.url}${postPath(post)}`;
export const dateLabel = (date: Date) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Shanghai',
}).format(date).replaceAll('/', '.');
export const readMinutes = (post: Post) => Math.max(1, Math.ceil((post.body?.length ?? 0) / 450));

export function getRelatedPosts(post: Post, posts: Post[], limit = 3) {
  const pathIds = new Set(learningPaths
    .filter((path) => path.steps.some((step) => step.id === post.id))
    .flatMap((path) => path.steps.map((step) => step.id)));
  const score = (item: Post) =>
    Number(pathIds.has(item.id)) * 8 +
    item.data.tags.filter((tag) => post.data.tags.includes(tag)).length * 3 +
    Number(item.data.category === post.data.category);
  return posts.filter((item) => item.id !== post.id)
    .sort((a, b) => score(b) - score(a) || b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, limit);
}
