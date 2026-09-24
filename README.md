# AICookCode

面向 AI 应用与 GitHub 实践的中文技术博客，基于 Astro 静态生成。所有页面、文章、RSS 和站点地图统一使用 **https://aicookcode.com**，文章通过 `/articles/` 路由访问。可通过 GitHub 连接 Cloudflare Pages，之后每次推送自动部署。

## 本地运行

环境：Node.js 22.12 或更高版本、npm、Git。项目固定 `.node-version` 为 22，建议使用最新 Node 22 LTS。

```bash
npm ci
npm run dev
```

默认访问 http://127.0.0.1:4321；若端口被占用，Astro 会选择其他端口，以终端输出为准。

```bash
npm run check    # Astro / TypeScript 检查
npm run build    # 生成 dist 静态文件
npm run preview  # 本地预览生产构建
```

## 已实现

- 响应式首页、全部文章、专题页、开源项目索引、关于页和 404；首页由精选文章、最新文章、站点功能入口、专题和 RSS 组成。专题页用于站内浏览，文章页是主要搜索落地页。
- Markdown 内容集合，自动文章目录、阅读时长、阅读进度、代码复制与链接分享。
- 浏览器端全文搜索，支持标题、摘要、标签、分类与 Markdown 正文；按标题和标签加权排序。
- 分类筛选、深浅主题、本地保存主题偏好、移动端导航与键盘可访问搜索弹窗。
- RSS、站点地图、robots.txt、canonical、Open Graph、文章结构化数据。
- 隐私政策、服务条款、免责声明和联系页面，方便长期运营与广告审核。
- GitHub Actions 类型检查和生产构建，Cloudflare Pages 静态缓存与响应头。
- 10 篇可编辑的原创文章；第三方开源项目已明确标注归属。

搜索索引直接加载到浏览器，适合小中型个人博客。大量长文时可改用 Pagefind 分片索引。本站不包含用户账户、评论后端、邮件订阅服务或模型 API 服务。

## 主要目录

```text
.github/workflows/ci.yml    GitHub 自动检查
docs/DEPLOYMENT.md          GitHub 与 Cloudflare 部署操作
src/config/site.ts         站点信息、导航、功能模块、分类和 GitHub 地址
src/content/blog/          Markdown 文章
src/content.config.ts      文章字段校验
src/components/            导航、搜索、文章卡片、站点功能模块等
src/layouts/               基础布局、SEO 标签
src/pages/                 静态路由、RSS 与搜索索引
src/styles/global.css      响应式样式与主题
public/images/             本地封面素材
public/_headers            Cloudflare 响应头
```

## 新增文章

在 `src/content/blog/` 新建 `your-slug.md`，复制下列 frontmatter，再写正文。

```yaml
---
title: "文章标题"
description: "用一两句话说明文章解决的问题。"
pubDate: 2026-09-16
category: "AI 应用"
tags: ["AI", "独立开发"]
cover: "/images/workspace.jpg"
coverAlt: "封面的准确文字描述"
featured: false
draft: false
---
```

分类支持 `AI 应用`、`GitHub 实践`、`建站笔记`、`开发工具`。URL 是 `/articles/your-slug/`。二级和三级标题自动组成目录。

`draft: true` 或发布日期晚于构建时间的文章不会发布到页面、搜索或 RSS。计划文章到期后需要重新触发构建。修改文章可增加 `updatedDate`。标题、描述、图片与代码均应在正式发布前按你的实际经历和需求审阅。

## 扩展站点功能

全局导航配置在 `src/config/site.ts` 的 `navItems` 中：首页、文章、专题、项目和关于是当前已上线入口。未来新增工具、资源或社区时，先创建对应的 Astro 路由，再把导航项加入 `navItems`。

首页的站点功能入口配置在同文件的 `featureModules` 中。当前只展示真实存在的技术博客和开源项目，不展示空的“即将推出”卡片。新增真实模块后，在配置中加入 `title`、`description`、`href`、`icon` 和 `status: 'live'`，首页会自动显示对应入口。

## GitHub 与免费部署

`src/config/site.ts` 的 `githubUrl` 指向本站公开仓库，用于导航、作者归属和结构化数据；`author` 与 `authorUrl` 用于统一文章作者身份。根首页的 Email、X、Wechat、Telegram 也集中配置在同一文件的 `contact` 对象中；Wechat 使用微信号展示，X 和 Telegram 使用完整个人主页链接。

详细步骤见 [部署说明](docs/DEPLOYMENT.md)。Cloudflare Pages 只需要绑定 `aicookcode.com` 一个自定义域名。Cloudflare Pages 使用：

| 配置 | 值 |
| --- | --- |
| 框架 | Astro |
| 生产分支 | main |
| 构建命令 | npm run build |
| 输出目录 | dist |
| 根目录 | 仓库根目录 |
| Node.js | 22.12+，建议 Node 22 LTS |

首次需要手动登录、授权仓库并添加自定义域，之后代码推送自动发布。免费计划配额以 Cloudflare 当前政策为准；域名本身费用和未来外部 AI API 费用不包含在静态托管内。

## 素材与字体

封面图片本地保存，不在运行时请求 Unsplash。来源及许可链接见 [素材说明](docs/ASSETS.md)。页面字体使用 Google Fonts 的 DM Sans 和 Noto Sans SC，网络不可达时会使用系统字体；此请求会连接 Google 的字体服务。需要完全无第三方请求时，可移除 CSS 顶部的字体导入或自行托管字体。

## 许可

本项目未代替站点所有者指定代码与文章的开源许可证。公开仓库前请按你的授权意图添加 LICENSE；第三方素材仍遵守各自许可。
