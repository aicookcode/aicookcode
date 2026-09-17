---
title: "从本地到线上：用 Astro 搭建并发布你的博客"
description: "以 AICookCode 为例，串起本地开发、Markdown 写作、GitHub 管理与 Cloudflare Pages 部署。"
pubDate: 2026-09-16T04:00:00+08:00
category: "建站笔记"
tags: ["Astro", "Cloudflare"]
cover: "/images/astro-cover.png"
coverAlt: "Astro 静态网站通过 GitHub 部署到 Cloudflare Pages 的流程"
featured: true
---

一个个人博客最重要的能力，是让你愿意持续写下去。Astro 可以把 Markdown 文章生成静态页面，搭配 GitHub 和 Cloudflare Pages，形成一个维护成本很低的发布流程。

这篇文章围绕本站的实际项目结构展开。站点采用纯静态输出，不需要数据库或常驻服务器。

## 先把本地环境跑起来

本站使用的 Astro 版本要求 Node.js 22.12 或更高版本。建议安装维护中的 Node.js LTS，并在本地和云端使用一致的大版本。

进入项目目录，安装依赖并启动开发服务：

```bash
npm ci
npm run dev
```

开发服务器会在终端显示访问地址。使用 `npm ci` 时需要仓库中已经包含 `package-lock.json`，它会按照锁文件安装依赖。

项目中的三个常用位置是：

```text
src/content/blog/   # Markdown 文章
src/config/site.ts # 站点信息与 GitHub 地址
public/images/     # 文章图片
```

## 写第一篇 Markdown 文章

在文章目录新增一个文件，例如 `my-first-project.md`。文件名会成为文章地址的一部分，发布后尽量保持稳定。

```yaml
---
title: "我的第一个小项目"
description: "这次实践解决了什么问题，以及如何实现。"
pubDate: 2026-09-16
category: "AI 应用"
tags: ["AI", "独立开发"]
cover: "/images/workspace.jpg"
coverAlt: "笔记本电脑与纸质笔记本"
draft: false
---
```

分隔线下方写正文。使用二级、三级标题，页面会自动生成文章目录。`draft: true` 的文章不会出现在页面、RSS 或搜索中。

发布日期在未来的文章也不会被当前构建包含。静态网站不会在时间到达后自动改变，届时需要触发一次新的构建。

## 提交到 GitHub

先在 GitHub 创建自己的仓库，然后按照仓库页面的说明连接本地项目。仓库链接和账号由你自己决定。

第一次提交之前，检查 `.gitignore` 已排除依赖目录、构建产物、本地环境变量和日志。完成提交并推送后，把真实仓库链接填写到 `src/config/site.ts` 的 `githubUrl`。

如果还不熟悉分支和提交，可以先阅读 [一套顺手的日常 Git 工作流](/articles/git-workflow/)。

## 连接 Cloudflare Pages

在 Cloudflare 控制台进入 Workers & Pages，创建 Pages 项目并连接 GitHub 仓库。不同时间的控制台入口文字可能略有变化。

使用以下构建配置：

| 配置项 | 值 |
| --- | --- |
| 生产分支 | main |
| 框架预设 | Astro，或手动配置 |
| 构建命令 | npm run build |
| 构建输出目录 | dist |
| 项目根目录 | 仓库根目录 |
| Node.js | 22.12 及以上，建议 Node 22 LTS |

本站是静态站点，不需要安装 Cloudflare 的服务端适配器。构建后，Pages 发布 `dist` 中的文件。

首次连接 GitHub 需要你登录并授权仓库访问。连接完成后，后续推送会自动触发部署。免费计划适合这类静态博客，但构建次数和其他配额应以 [Cloudflare Pages 当前限制](https://developers.cloudflare.com/pages/platform/limits/) 为准。

## 绑定自己的域名

Pages 部署成功后，先访问分配的 `pages.dev` 地址，确认页面和资源正常。

再到这个 Pages 项目的「自定义域」中添加 `aicookcode.com`。**即使域名已经有 DNS 解析，也仍然需要在 Pages 项目里完成绑定。** 根域名用于 Pages 时，需要让对应域的名称服务器指向 Cloudflare；请以控制台的校验要求为准。

不要在不确认用途的情况下删除现有解析记录。DNS 校验与证书签发完成后，访问 HTTPS 地址检查首页、文章页和 RSS。

如果同时使用 `www` 子域名，建议在 Cloudflare 设置它到主域名的永久重定向，保持统一的内容地址。

## 每次发布前做两项检查

```bash
npm run check
npm run build
npm run preview
```

类型检查和生产构建通过后，再用预览服务确认页面。检查标题、封面、代码块、内部链接和手机布局。

本站仓库已准备相同的 GitHub Actions 检查。之后的日常写作流程就是：新增 Markdown → 本地检查 → 提交到 GitHub → 等待 Pages 自动部署。

参考：[Astro 部署到 Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/) · [Pages 自定义域名](https://developers.cloudflare.com/pages/configuration/custom-domains/)
