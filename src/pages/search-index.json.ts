import { getPosts, postUrl } from '../lib/posts';
export async function GET() {
  const posts = await getPosts();
  return new Response(JSON.stringify(posts.map((post) => ({
    title: post.data.title, description: post.data.description, category: post.data.category,
    tags: post.data.tags, url: postUrl(post), body: post.body,
  }))), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
