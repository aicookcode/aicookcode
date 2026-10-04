---
title: "一句就能生成可编辑图表，AI 画图工具来了！"
description: "AI大模型和经典的draw.io完美结合，让你通过聊天就能生成、修改和优化各种图表!"
pubDate: 2026-06-23T07:30:00+08:00
category: "GitHub 实践"
tags: ["图表生成", "AI 画图", "开源项目"]
cover: "/media/ai-chart-generator/cover.jpg"
coverAlt: "一句就能生成可编辑图表，AI 画图工具来了！"
---

画架构图、流程图、系统设计图时，你可能也遇到过这种情况：系统关系明明已经想清楚了，一打开空白画布，还得手动拖形状、调连线、对齐层级，半小时很快就过去。

最近看到一个 GitHub 项目：`next-ai-draw-io`。它将 AI 大模型和经典的 draw.io（diagrams.net）结合，让你通过聊天就能生成、修改和优化各种图表！

GitHub（32.2K+ Stars）：`https://github.com/DayuanJiang/next-ai-draw-io`

![](/media/ai-chart-generator/img_01.png)

## 项目简介

**next-ai-draw-io** 是一个基于 Next.js 开发的 Web 应用（支持在线版和桌面端，提供 MCP Server），它在 draw.io 的基础上深度集成了 AI 能力。

可以直接用自然语言描述需求，AI 会生成 draw.io 格式的 XML 图表，并在画布里实时渲染出来。生成结果会进入 draw.io 体系，后续可以方便地编辑、调整和导出。

<figure>
  <video class="article-video-landscape" controls playsinline preload="metadata" width="2038" height="1080" poster="/media/ai-chart-generator/natural-language-poster.jpg" aria-label="next-ai-draw-io 自然语言生成图表演示">
    <source src="/media/ai-chart-generator/natural-language-demo.mp4" type="video/mp4" />
    你的浏览器暂不支持视频播放，可以<a href="/media/ai-chart-generator/natural-language-demo.mp4">下载视频</a>观看。
  </video>
  <figcaption>next-ai-draw-io 自然语言生成图表演示</figcaption>
</figure>

除了文本提示，还可以上传图片、PDF 或文本文件，让 AI 理解现有内容并生成或优化图表。

![](/media/ai-chart-generator/img_02.png)

## 核心亮点

- **自然语言生成图表**：直接描述系统、流程或架构，AI 就能生成 draw.io 图。
- **对话式改图**：生成后可以继续让 Agent 调整，比如加缓存层、改数据流、拆分模块。
- **上传资料生成**：支持上传 PDF 和文本文件，从已有文档里提取内容，再整理成图。
- **旧图复刻增强**：上传已有图表或图片后，可以让 AI 复刻结构、补充说明、优化布局。
- **版本历史**：每次修改都有记录，方便回看，也方便恢复到之前的版本。
- **多模型和 MCP**：支持 OpenAI、Anthropic（Claude）、Google、AWS Bedrock、DeepSeek、ByteDance Doubao、Ollama 等模型来源，也支持第三方供应商，并能接入 Claude Desktop、Cursor、VS Code 等客户端。

## 安装过程

在线版、桌面版和本地运行看到的是同一套页面，只是使用入口不同。

### 在线版

可以直接打开在线体验：

```
https://next-ai-drawio.jiang.jp/
```

### 桌面版

不熟悉代码的话，可以直接下载桌面版使用

```
https://github.com/DayuanJiang/next-ai-draw-io/releases
```

### 本地项目运行

如果想研究项目实现，或者自己部署，可以把代码下载到本地运行。

```
git clone https://github.com/DayuanJiang/next-ai-draw-io
cd next-ai-draw-io
npm install
cp env.example .env.local
npm run dev
```

启动后打开：

```
http://localhost:6002
```

### MCP 接入

如果你平时在 Claude、Cursor、VS Code 里写方案，可以把它接成 MCP Server，让 AI 客户端直接创建和编辑 draw.io 图。

```
{
  "mcpServers": {
    "drawio": {
      "command": "npx",
      "args": ["@next-ai-drawio/mcp-server@latest"]
    }
  }
}
```

Claude Code CLI 可以这样添加：

```
claude mcp add drawio -- npx @next-ai-drawio/mcp-server@latest
```

配置后，可以直接让 AI 创建图表：

```
Create a flowchart showing user authentication with login, MFA, and session management.
```

## 如何使用

使用之前，需要先配置 Agent 模型：

![](/media/ai-chart-generator/img_03.png)

![](/media/ai-chart-generator/img_04.png)

### 方法一：自然语音描述

比如你可以这样写：

```
绘制：腾讯TRTC 音视频通话流程

默认绘图规则：

视觉风格青春明亮，使用清爽浅色系配色，避免沉重色彩。
所有元素不使用阴影，不显示最小化按钮，整体保持简洁清晰。
布局紧凑但不拥挤，所有元素必须在单页视口内完整展示。
同等级元素保持相同大小、相同图形样式、相同边距和对齐方式。
分组/阶段背景框之间的间距保持一致，内部元素与边框之间也保持一致边距。
文字必须完整可读，不得与元素边框或连线重叠。
连线使用正交折线或清晰路径，开启动画效果。
连线不得穿过、覆盖或压住任何元素块和文字。
优先按从左到右、从上到下的流程组织内容，减少交叉线。
整体呈现为清晰、专业、易读的架构图。
```

生成效果：

![](/media/ai-chart-generator/img_05.png)

### 方法二：旧图重绘

如果已经有旧图，可以上传图片或已有图表，让 AI 复制结构、补充说明、调整布局。这个用法很适合整理过期架构图，或者把别人发来的粗糙流程图改成可维护的 draw.io 文件。

<figure>
  <video class="article-video-landscape" controls playsinline preload="metadata" width="1694" height="1080" poster="/media/ai-chart-generator/old-diagram-redraw-poster.jpg" aria-label="next-ai-draw-io 旧图重绘演示">
    <source src="/media/ai-chart-generator/old-diagram-redraw-demo.mp4" type="video/mp4" />
    你的浏览器暂不支持视频播放，可以<a href="/media/ai-chart-generator/old-diagram-redraw-demo.mp4">下载视频</a>观看。
  </video>
  <figcaption>next-ai-draw-io 旧图重绘演示</figcaption>
</figure>

## 适用场景

- **技术方案**：先让 AI 画出系统边界、模块分组、数据流，再手动补细节。
- **产品流程**：把登录、支付、审批、发布这类流程画成可讨论的图。
- **项目复盘**：把一个系统的调用链、部署结构、数据链路整理出来，方便团队对齐。
- **源码分析**：把模块依赖关系画出来，比纯文字更容易讲清楚。
- **旧图重画**：上传旧流程图，让 AI 先复刻结构，再继续整理。

它更偏技术图和流程图，不适合直接当成精美海报生成器。如果你要的是品牌级视觉设计，还需要后期排版；如果你要的是可编辑、可继续维护的架构图，它很值得试。

## 写在最后

在 AI 原生工具越来越普及的今天，next-ai-draw-io 把「说一句就出图」的效率带到了图表领域，大幅降低了可视化沟通的门槛。它不仅是 draw.io 的升级版，更是一个 **AI 驱动的生产力工具**。

这篇可以先收藏起来，下次需要画图时直接试一版。 你平时常用什么画图工具？
