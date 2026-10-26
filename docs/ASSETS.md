# 视觉素材

以下照片来自 Unsplash，已下载到 `public/images/`。遵守 [Unsplash License](https://unsplash.com/license)，不将原始照片作为独立素材产品销售。

| 本地文件 | 来源图片 |
| --- | --- |
| workspace.jpg | https://images.unsplash.com/photo-1499750310107-5fef28a66643 |
| code.jpg | https://images.unsplash.com/photo-1555066931-4365d14bab8c |
| laptop.jpg | https://images.unsplash.com/photo-1515879218367-8466d910aaa4 |
| keyboard.jpg | https://images.unsplash.com/photo-1587620962725-abab7fe55159 |

`ai-cover.png`、`github-cover.png` 和 `astro-cover.png` 为本项目绘制的流程封面，表达文章讨论的实际技术流程，不是软件运行截图。品牌名称归各自所有者。

界面图标来自 Lucide（ISC 许可），品牌图片保存在 `public/logoImage/`。页面使用系统字体，不加载 Google Fonts。

生产构建由 `integrations/optimize-images.mjs` 生成响应式 WebP，涵盖模板与 Markdown 正文中的本地静态图片。原文件不覆盖、不删除，历史图片与下载地址仍然可用；动图与二维码保留原始像素文件。生成的图片位于 `dist/_astro/`，按原图内容、处理版本与尺寸命名，可使用不可变缓存；缓存位于 Astro cacheDir 下。统计输出到忽略提交的 `test-results/image-optimization.json`。


## ui-assets-skill 文章

正文截图位于 public/media/ui-assets-skill/，由作者本地文章目录导入。cover.png 使用内置 imagegen 工具生成，为从 UI 设计稿提取素材的概念封面，并非实际软件截图。

