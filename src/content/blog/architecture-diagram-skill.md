---
title: "5.1K+ Stars 的架构图生成 Skill，复杂系统也能一图看懂"
description: "如果平时要写技术方案、项目复盘、源码分析，架构图基本绕不开。手动画图很费时间，AI 直接生成又容易风格乱、层级乱，后面还要重新整理一遍。"
pubDate: 2026-05-19T17:12:31+08:00
category: "GitHub 实践"
tags: ["架构图", "AI Skill", "系统设计"]
cover: "/media/architecture-diagram-skill/cover.jpg"
coverAlt: "5.1K+ Stars 的架构图生成 Skill，复杂系统也能一图看懂"
---

如果平时要写技术方案、项目复盘、源码分析，架构图基本绕不开。手动画图很费时间，AI 直接生成又容易风格乱、层级乱，后面还要重新整理一遍。

最近看到一个 GitHub 项目：`architecture-diagram-generator`，目前有 `5.1K+ Stars`。

它把架构图生成整理成一个标准化 Agent Skill，只要输入系统描述，就能生成一份深色风格的 `HTML + SVG 架构图`，浏览器打开就能看，也能直接导出 PNG / PDF。

GitHub：`https://github.com/Cocoon-AI/architecture-diagram-generator`

## 项目定位

它本质上是一个 `Skill`。里面包含生成规则、配色系统、SVG 模板和导出逻辑。`你可以直接给出系统描述，也可以让 Agent 先分析仓库代码结构，再生成一份完整的 HTML 架构图文件`。

生成出来的文件是一份`独立 HTML`，里面包含 CSS 和 SVG，放到本地浏览器就能打开。对于写文档、做方案、补 README 图的人来说，这个形态比较方便。

## 核心亮点

这个 Skill 的重点，是给 Agent 一套明确的架构图规则。这样生成结果会更稳定，也更接近可以直接放进技术文档的架构图。

- **独立 HTML 输出**：生成结果可以直接发给别人，也可以放进文档、静态页面或知识库。
- **SVG 架构图**：节点、连线、分组、说明都在 SVG 里，不依赖外部画图软件。
- **深色技术风格**：默认是 Slate 深色背景、网格底纹、JetBrains Mono 字体，前端、后端、数据库、云服务、安全模块有固定配色。
- **内置导出工具栏**：v1.1 以后，生成图右上角带 Copy / PNG / PDF 按钮，打开 HTML 就能导出。
- **可以对话式调整**：初版不满意，可以继续让 Agent 增加组件、调整连线、换布局、补说明。

## 安装方法

### 方法一：Agent 代执行

复制下面这段话给你的 Agent，让它帮你完成安装。

```
安装这个skill，github：
[https://github.com/Cocoon-AI/architecture-diagram-generator](https://github.com/Cocoon-AI/architecture-diagram-generator)
```

### 方法二：手动安装

先下载 `architecture-diagram.zip`，然后把其中的 Skill 解压到本地 skills 目录。

### 方法三：Claude.ai

如果你用的是 Claude.ai，项目推荐的方式是下载 `architecture-diagram.zip`，然后到 Claude 的 `Customize -> Skills` 里上传并启用。项目文档也提醒：需要先开启 Code Execution。

## 使用方法

项目给出了具体示例：

### web app

```
Create an architecture diagram for a web application with:
- React frontend
- Node.js/Express API
- PostgreSQL database
- Redis cache
- JWT authentication
```

![Web App Architecture](/media/architecture-diagram-skill/img_01.png)

### 自测

为了测试真实代码库的生成效果，我选了 GitHub 上的开源商城项目 mall4j。这个项目体量不小，既有后台管理和用户端 API，也包含 Vue 后台、小程序、uni-app 等多端前端；后端则基于 Spring Boot、Sa-Token、MyBatis-Plus、Redis、MySQL 等技术栈实现。

```
mall4j-master 分析这个项目，并生成架构图。中文输出
```

![](/media/architecture-diagram-skill/img_02.png)

通过这张图，可以很快看清 mall4j 的主体边界：哪些是前端入口，哪些是后端应用，业务模块、认证、缓存、数据库和外部服务分别处在什么位置。对第一次接触这个项目的人来说，它比直接翻目录更容易建立整体认识。

## 适合什么场景

我觉得它最适合三类场景。

- **项目文档**：把前端、后端、数据库、缓存、网关、外部服务这些模块梳理成一张图。
- **源码分析**：面对复杂代码库时，先用架构图看清模块分层和调用关系，再进入具体源码。
- **方案沟通**：和同事讨论系统设计时，先让 AI 生成一版，再在对话里继续改布局、改节点、改说明。

如果只是画一张很精细的品牌级设计图，它未必是最好的选择。它更偏技术文档风格，重点是把组件关系、数据流和边界表达清楚。

## 写在最后

这个项目最有意思的地方，是把 AI 生成架构图这件事做得更可控：有固定模板，有统一风格，也能直接导出。

![](/media/architecture-diagram-skill/img_03.png)