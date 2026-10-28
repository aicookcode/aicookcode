---
visible: true
title: "Open Lovable 网站复刻教程：安装、模型配置与页面验收"
description: "用 Firecrawl、模型 API 和预览环境生成 React 页面，修正安装命令，并逐项检查布局、交互、资源与后端功能边界。"
pubDate: 2026-06-18T07:30:00+08:00
updatedDate: 2026-10-27
category: "GitHub 实践"
tags: ["网站复刻", "AI 编程", "开源项目"]
cover: "/media/website-clone-ai/cover.jpg"
coverAlt: "输入网址，AI 直接复刻出完整网站"
---

Open Lovable 是 Firecrawl 团队开源的网页生成项目：输入参考网址，抓取可访问的页面内容，再让模型生成 React 页面，并在预览环境中继续修改。本文按安装、配置、生成和验收四个环节整理使用方法。

GitHub：`https://github.com/firecrawl/open-lovable`

## 项目定位

**它适合从参考页面生成前端原型。** 网页抓取结果、模型能力和源站访问限制都会影响生成质量；登录、支付、数据库和服务端业务需要单独实现，不能从页面外观推断这些功能已经可用。

<figure>
  <video class="article-video-landscape" controls playsinline preload="metadata" width="2210" height="1080" poster="/media/website-clone-ai/video-poster.jpg" aria-label="Open Lovable 网站复刻效果演示">
    <source src="/media/website-clone-ai/website-clone-demo.mp4" type="video/mp4" />
    你的浏览器暂不支持视频播放，可以<a href="/media/website-clone-ai/website-clone-demo.mp4">下载视频</a>观看。
  </video>
  <figcaption>Open Lovable 网站复刻效果演示</figcaption>
</figure>

**实现流程**：Firecrawl 负责抓取网页内容和截图，AI 负责生成代码，Vercel Sandbox 或 E2B 负责运行预览。生成后还可以继续在聊天窗口里改页面，比如换风格、改区块、补组件。

![](/media/website-clone-ai/img_01.jpg)

## 核心亮点

- **以网址作为页面参考**：可据此生成布局和基础交互，复杂页面仍需逐项检查。
- **支持搜索入口**：不记得具体网址时，可以输入关键词，项目会走 Firecrawl 搜索，返回候选页面和截图。
- **多模型支持**：可按当前版本支持的供应商配置模型；模型名称、接口兼容性和环境变量应对照仓库说明。
- **强大网页抓取能力**：底层依赖 Firecrawl，能精准抓取页面结构、内容和样式，还原更准确。
- **带沙箱预览**：生成代码会写进 Vercel Sandbox 或 E2B，页面可以直接预览。
- **聊天修改调整项目**：生成后可以继续描述修改需求，项目会基于已有文件做编辑。

本文围绕 [Open Lovable 官方仓库](https://github.com/firecrawl/open-lovable) 的本地部署流程展开。安装与环境变量以你下载版本的 README 为准。

## 安装使用

### 1. 克隆 & 安装

```
git clone https://github.com/firecrawl/open-lovable.git
cd open-lovable
pnpm install
```

### 2. 配置 `.env.local` 文件

**填入必要的 API Key**

- **FIRECRAWL_API_KEY**：用于抓取复刻网页的内容和截图。在 Firecrawl 控制台获取。抓取、模型和预览环境分别核对额度，不把一次演示的消耗当作所有页面的固定成本。

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

- **Vercel 或 E2B 沙盒配置**：用于运行和预览复刻的 React 项目。按当前版本支持的提供方选择并配置，额度与计费以对应平台为准。

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

## 第一次生成后，怎样确认页面能交付

先选择自己有权使用、无需登录的单页作为参考，记录桌面和手机两种宽度，再生成一个版本。下面是检查方法，不是对任意网站的还原率承诺。

| 检查项 | 操作 | 通过标准 |
| --- | --- | --- |
| 布局 | 对照两种宽度检查导航、正文与页脚 | 无横向溢出，主要信息没有遮挡 |
| 交互 | 点击导航、按钮，提交一份测试表单 | 链接可达；未接入后端的操作明确提示 |
| 资源 | 检查图片、字体和浏览器失败请求 | 没有依赖原站登录态的资源 |
| 下载交付 | 在新目录安装下载项目并启动 | 能复现预览结果，所需变量有示例 |

抓取失败先检查源网址能否公开访问；抓取成功但生成失败，再查模型配置；代码生成后预览失败，再检查预览环境的错误。三步分开排查，避免每次都重新生成整站。

只有截图或设计稿时，可参考 [UI 素材提取实践](/articles/ui-assets-skill/) 准备素材；准备公开部署时，再按 [Astro 与 Cloudflare Pages 发布检查](/articles/astro-cloudflare/) 理解构建产物与域名的关系。后者是本站静态博客的部署示例，不直接替代 React 项目的构建配置。

## 谁适合使用？

- **独立开发者 / 创业者**：快速做出产品原型或营销落地页。
- **前端工程师**：学习优秀网站的实现方式，或快速启动新项目。
- **设计师**：把设计稿或灵感网站快速变成可交互代码。
- **AI 爱好者**：体验 AI 如何深度理解和生成前端应用。

## 写在最后

之前为了复刻一个平台，和组里的小伙伴们折腾了很久。要是早点遇到这个项目，应该能省下不少时间，也少走很多弯路。

感兴趣的朋友可以先收藏起来试用一下。