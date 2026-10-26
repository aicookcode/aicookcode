import { createHash } from 'node:crypto';
import { access, copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { basename, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, serialize } from 'parse5';
import sharp from 'sharp';

const sizes = {
  hero: '(max-width: 450px) calc(100vw - 36px), (max-width: 760px) calc(100vw - 44px), (max-width: 1200px) 62vw, 720px',
  card: '(max-width: 450px) calc(100vw - 36px), (max-width: 760px) calc((100vw - 60px) / 2), (max-width: 1200px) calc((100vw - 100px) / 3), 360px',
  article: '(max-width: 450px) calc(100vw - 36px), (max-width: 760px) calc(100vw - 44px), (max-width: 1050px) calc(100vw - 284px), 740px',
};
const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const hasClass = (node, name) => attr(node, 'class')?.split(/\s+/).includes(name);
const set = (node, name, value) => {
  const existing = node.attrs.find((item) => item.name === name);
  if (existing) existing.value = String(value);
  else node.attrs.push({ name, value: String(value) });
};

// Static output is the deployment artifact. Process its actual HTML so Markdown
// images and component images share one pipeline without changing public URLs.
export default function optimizeImages() {
  let publicRoot;
  let cacheRoot;
  let reportPath;
  let origin;
  return {
    name: 'aicookcode-responsive-images',
    hooks: {
      'astro:config:done': ({ config }) => {
        publicRoot = fileURLToPath(config.publicDir);
        cacheRoot = fileURLToPath(new URL('aicookcode-images/', config.cacheDir));
        reportPath = fileURLToPath(new URL('test-results/image-optimization.json', config.root));
        origin = new URL(config.site).origin;
      },
      'astro:build:done': async ({ dir, logger }) => {
        const outputRoot = fileURLToPath(dir);
        const outputImages = join(outputRoot, '_astro');
        await Promise.all([mkdir(outputImages, { recursive: true }), mkdir(cacheRoot, { recursive: true })]);
        const originals = new Map();
        const generated = new Map();
        const report = { images: [], pages: [] };

        async function original(src) {
          const url = new URL(src, origin);
          if (url.origin !== origin || !/\.(?:png|jpe?g|webp|avif|gif|svg)$/i.test(url.pathname)) return null;
          const path = resolve(publicRoot, `.${decodeURIComponent(url.pathname)}`);
          if (!path.startsWith(resolve(publicRoot) + sep)) throw new Error(`Image outside public directory: ${src}`);
          if (!originals.has(path)) originals.set(path, (async () => {
            const input = await readFile(path);
            const metadata = await sharp(input).metadata();
            const rotated = (metadata.orientation ?? 1) >= 5;
            return {
              input, path: url.pathname, bytes: input.length,
              width: rotated ? metadata.height : metadata.width,
              height: rotated ? metadata.width : metadata.height,
              animated: (metadata.pages ?? 1) > 1,
              vector: metadata.format === 'svg',
              hash: createHash('sha256').update(input).update(`webp-82-v1-${sharp.versions.vips}`).digest('hex').slice(0, 20),
            };
          })());
          return originals.get(path);
        }

        async function variants(image, brand) {
          const profile = brand ? [180, 240, 480, 720] : [320, 640, 960, 1440];
          const widths = [...new Set(profile.map((width) => Math.min(width, image.width)))];
          return Promise.all(widths.map(async (width) => {
            const filename = `${basename(image.path, extname(image.path))}-${image.hash}-${width}.webp`;
            if (!generated.has(filename)) generated.set(filename, (async () => {
              const cached = join(cacheRoot, filename);
              try { await access(cached); }
              catch {
                await sharp(image.input).rotate().resize({ width, withoutEnlargement: true })
                  .webp({ quality: 82, effort: 4 }).toFile(cached);
              }
              await copyFile(cached, join(outputImages, filename));
              const bytes = (await readFile(cached)).length;
              const result = { src: `/_astro/${filename}`, width, bytes };
              report.images.push({ original: image.path, originalBytes: image.bytes, ...result });
              return result;
            })());
            return generated.get(filename);
          }));
        }

        const files = (await readdir(outputRoot, { recursive: true })).filter((file) => file.endsWith('.html'));
        for (const file of files) {
          const htmlPath = join(outputRoot, file);
          const document = parse(await readFile(htmlPath, 'utf8'));
          const images = [];
          const videos = [];
          function walk(node, ancestors = []) {
            if (node.tagName === 'img') images.push({ node, ancestors });
            if (node.tagName === 'video') videos.push(node);
            for (const child of node.childNodes ?? []) walk(child, [...ancestors, node]);
          }
          walk(document);
          let contentImage = 0;
          let coverImage = 0;
          const homepage = file.replaceAll('\\', '/') === 'index.html';
          const articlePage = file.replaceAll('\\', '/').startsWith('articles/') && file.replaceAll('\\', '/') !== 'articles/index.html';
          for (const { node, ancestors } of images) {
            const src = attr(node, 'src');
            if (!src) continue;
            const hero = ancestors.some((parent) => hasClass(parent, 'feature-story'));
            const card = ancestors.some((parent) => hasClass(parent, 'post-cover'));
            const brand = hasClass(node, 'brand-logo');
            const body = ancestors.some((parent) => attr(parent, 'data-article-content') !== undefined);
            const qr = ancestors.some((parent) => hasClass(parent, 'contact-channel-qr'));
            const about = hasClass(node, 'about-photo');
            const priority = hero || about || (body && contentImage++ === 0) || (card && !homepage && !articlePage && coverImage++ === 0);
            set(node, 'loading', priority || brand ? 'eager' : 'lazy');
            set(node, 'decoding', 'async');
            if (priority) set(node, 'fetchpriority', 'high');
            const image = await original(src);
            if (!image) continue;
            set(node, 'width', image.width);
            set(node, 'height', image.height);
            // Preserve animation and the original QR pixels rather than recompressing them.
            if (image.animated || image.vector || qr) continue;
            const candidates = await variants(image, brand);
            const fallback = candidates.find((item) => item.width >= (brand ? 240 : 960)) ?? candidates.at(-1);
            set(node, 'src', fallback.src);
            set(node, 'srcset', candidates.map((item) => `${item.src} ${item.width}w`).join(', '));
            set(node, 'sizes', brand ? (ancestors.some((parent) => parent.tagName === 'footer') ? '150px' : '(max-width: 760px) 168px, 240px') : hero ? sizes.hero : card ? sizes.card : about ? '(max-width: 1200px) 100vw, 1136px' : sizes.article);
          }
          for (const video of videos) {
            if (attr(video, 'autoplay') === undefined) set(video, 'preload', 'none');
            const poster = attr(video, 'poster');
            if (!poster) continue;
            const image = await original(poster);
            if (!image || image.animated || image.vector) continue;
            const candidates = await variants(image, false);
            set(video, 'poster', (candidates.find((item) => item.width >= 960) ?? candidates.at(-1)).src);
          }
          await writeFile(htmlPath, serialize(document));
          report.pages.push({ path: `/${file.replaceAll('\\', '/').replace(/index\.html$/, '')}`, images: images.length });
        }
        await mkdir(resolve(reportPath, '..'), { recursive: true });
        await writeFile(reportPath, JSON.stringify(report, null, 2));
        logger.info(`Generated ${generated.size} responsive WebP images from ${originals.size} originals; originals remain available at their existing URLs.`);
      },
    },
  };
}
