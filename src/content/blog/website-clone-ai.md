---
title: "输入网址，AI 直接复刻出完整网站"
description: "最近前端圈被一个开源项目刷屏了：Open Lovable 。它由知名网页抓取工具 Firecrawl 团队推出，上线短短几天就收获上万 Star，现在已经超过 26k Star，堪称 2026 年最火的 AI + 前端开源项目之一。"
pubDate: 2026-06-18T07:30:00+08:00
category: "GitHub 实践"
tags: ["网站复刻", "AI 编程", "开源项目"]
cover: "/media/website-clone-ai/cover.jpg"
coverAlt: "输入网址，AI 直接复刻出完整网站"
---

最近前端圈被一个开源项目刷屏了：Open Lovable 。它由知名网页抓取工具 Firecrawl 团队推出，上线短短几天就收获上万 Star，现在已经超过 26k Star，堪称 2026 年最火的 AI + 前端开源项目之一。

GitHub：`https://github.com/firecrawl/open-lovable`

## 项目定位

**`一句话总结：输入任何网站的 URL，它能在几分钟内完整复刻出一个几乎相同的 React 现代网页应用，包括复杂布局、样式和基础交互。`**

> 🎬 原文此处为视频演示

## 实现流程

：Firecrawl 负责抓取网页内容和截图，AI 负责生成代码，Vercel Sandbox 或 E2B 负责运行预览。生成后还可以继续在聊天窗口里改页面，比如换风格、改区块、补组件。

![](/media/website-clone-ai/img_01.jpg)

## 核心亮点

- **一键复刻任意网站**：支持复杂布局和交互，还原度极高。
- **支持搜索入口**：不记得具体网址时，可以输入关键词，项目会走 Firecrawl 搜索，返回候选页面和截图。
- **多模型支持**：兼容 OpenAI、Claude Code、Gemini 等主流大模型和第三方供应商，随便选。
- **强大网页抓取能力**：底层依赖 Firecrawl，能精准抓取页面结构、内容和样式，还原更准确。
- **带沙箱预览**：生成代码会写进 Vercel Sandbox 或 E2B，页面可以直接预览。
- **聊天修改调整项目**：生成后可以继续描述修改需求，项目会基于已有文件做编辑。

项目本质上是 Firecrawl 团队自用的内部工具，后来开源分享。官方也提到，如果想要更完整的一站式云端体验，可以看看他们的 [https://lovable.dev/](https://lovable.dev/)。

## 安装使用

### 1. 克隆 & 安装

```
git clone [https://github.com/firecrawl/open-lovable.git](https://github.com/firecrawl/open-lovable.git)
cd open-lovable
pnpm install # or npm install / yarn install
```

### 2. 配置 `.env.local` 文件

## 填入必要的 API Key

- **FIRECRAWL_API_KEY**：用于抓取复刻网页的内容和截图。在 firecrawl.dev 获取，免费额度是 1000 credits，生成视频里的一个页面大约消耗 20 credits，大家可以据此估算。

```
FIRECRAWL_API_KEY=your_firecrawl_api_key
```

- **AI 模型对应的 API_KEY**：用于 AI 生成 React 代码。按你实际使用的模型填写对应的 API_KEY；如果用的是第三方供应商，还需要再填对应的 Base_URL。

```
# API Key 任选其一
GEMINI_API_KEY=your_gemini_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
OPENAI_API_KEY=your_openai_api_key
GROQ_API_KEY=your_groq_api_key

# 第三方供应商时填写对应地址
OPENAI_BASE_URL=xxxx
```

- **Vercel 或 E2B 沙盒配置**：用于运行和预览复刻的 React 项目。Vercel 和 E2B 都提供免费额度，选其一配置即可。

```
# 使用 vercel
SANDBOX_PROVIDER=vercel
VERCEL_OIDC_TOKEN=auto_generated_by_vercel_env_pull

# 或者使用 E2B
SANDBOX_PROVIDER=e2b
E2B_API_KEY=your_e2b_api_key
```

### 3. 项目启动

```
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可使用。

![](/media/website-clone-ai/img_02.png)

界面简洁友好，直接输入网站链接，AI 就开始工作，几分钟后生成完整的 React 代码并预览。

![](/media/website-clone-ai/img_03.png)

![](/media/website-clone-ai/img_04.png)

### 4. 项目下载

生成好的 React 项目如果需要下载到本地，直接点击页面上的下载按钮即可。

![](/media/website-clone-ai/img_05.png)

## 谁适合使用？

- **独立开发者 / 创业者**：快速做出产品原型或营销落地页。
- **前端工程师**：学习优秀网站的实现方式，或快速启动新项目。
- **设计师**：把设计稿或灵感网站快速变成可交互代码。
- **AI 爱好者**：体验 AI 如何深度理解和生成前端应用。

## 写在最后

之前为了复刻一个平台，和组里的小伙伴们折腾了很久。要是早点遇到这个项目，应该能省下不少时间，也少走很多弯路。

感兴趣的朋友可以先收藏起来试用一下，欢迎在评论区留言交流。

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
