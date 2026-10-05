---
title: "把 Claude Code / Codex 接入飞书，让你的工作变轻松"
description: "让本地 Agent 进入真实协作流程"
pubDate: 2026-08-18T19:17:19+08:00
category: "GitHub 实践"
tags: ["飞书", "Claude Code", "Codex", "效率"]
cover: "/media/claude-feishu-integration/cover.jpg"
coverAlt: "把 Claude Code / Codex 接入飞书，让你的工作变轻松"
featured: true
featuredOrder: 2
---

现在越来越多人在用 **Claude Code、Codex**，但国内团队的工作大多发生在飞书：需求文档、群聊、评论和会议记录。

过去要让 Agent 参与工作，得先把这些内容导出来，再放到它能看见的地方。现在，可以把 Claude Code、Codex 直接接进飞书，**让 Agent 进入日常协作现场**。

飞书官方推荐一套接入方案——**Lark Coding Agent Bridge**。可以把你本机正在运行的 Claude Code 或 Codex 接到飞书里，让它变成一个**可以聊天、发卡片、读文件、接收任务**的 bot。

**飞书负责协作入口，本地 Agent 负责真正执行。**

![Lark Coding Agent Bridge](/media/claude-feishu-integration/img_01.png)

## 你的痛点，它一条条都给你解决了

### 1. 飞书可以作为移动端控制入口

Claude Code、Codex 都在提供移动端能力，但在国内，**部分手机或应用商店无法直接安装**。

把 Agent 接进飞书后，只要电脑本地 bridge 正在运行，就可以直接用飞书移动端发消息、语音输入和查看进度，**远程控制电脑上的 Claude Code 或 Codex**。

![移动端控制 Agent](/media/claude-feishu-integration/img_02.jpg)

### 2. 飞书消息可以直接交给 Agent

群里一句需求、用户一条反馈，过去都要复制粘贴给 Agent。上下文一多，**漏信息几乎不可避免**。

现在可以把飞书消息合并转发给 Claude Code、Codex，**让需求、背景和反馈一起进入当前 session**。

![转发飞书消息](/media/claude-feishu-integration/img_03.png)

### 3. 让 AI 直接参与文档协作

AI 写完文档后，团队还要下载、打开，再用文字描述修改位置，**反馈成本比较高**。

接入飞书文档后，大家可以直接划词评论，Agent 再根据反馈继续修改。**方案和执行就连起来了**。

![飞书文档协作](/media/claude-feishu-integration/img_04.png)

### 4. 用群聊和话题管理 session

终端 tab 一多，**项目和 session 很快就混在一起**。昨天开的窗口，今天常常找不到。

现在可以**用一个群对应项目、一个话题对应任务**，让历史上下文更清楚。需要新会话时，发送 `/new chat 项目名` 就可以。

### 5. 回复不再只有一大段文字

纯文本一长，进度、工具调用和最终结果很容易混在一起。Bridge 支持**图文混排的消息**，让表达更清晰；也能发送**可交互的飞书卡片**，让交互更直观。

![飞书卡片消息](/media/claude-feishu-integration/img_05.png)

## 超简单安装

### 开始之前，先备好这三样

接入之前，需要先准备好以下三样东西：

1. Node.js 环境 `>= 20.12.0`；
2. 当前电脑已经登录的 **Claude Code 或 Codex CLI**；
3. 飞书/Lark **PersonalAgent 应用**。

### 安装并启动

在命令行中执行：

```bash
npm i -g lark-channel-bridge
```

第一次启动使用：

```bash
lark-channel-bridge run
```

首次运行时，会进入一个**二维码向导**：

1. 终端里显示二维码；
2. 用飞书扫描；
3. 选择或创建一个 **PersonalAgent 应用**；
4. 选择要连接的 Agent；
5. Bridge **自动写入本地配置**。

配置通常会保存在：

```text
~/.lark-channel/config.json
```

`run` 适合**首次配置和前台调试**。确认 bot 能正常收发消息后，先用 Ctrl-C 停掉前台进程，再用系统服务常驻后台：

```bash
# 启动
lark-channel-bridge start

# 查看状态
lark-channel-bridge status

# 停止
lark-channel-bridge stop
```

## 适合谁？

同时用飞书和 Claude Code / Codex 的小伙伴，都值得一试。

## 最后说一句

Agent 落地的难点，不是不够聪明，而是**进不了团队的真实工作环境**。

**Lark Coding Agent Bridge** 把它接进了你天天在用的飞书。让本地 Agent 进入真实协作流。

GitHub 地址：[https://github.com/zarazhangrui/lark-coding-agent-bridge](https://github.com/zarazhangrui/lark-coding-agent-bridge)

飞书官方实践：[Claude Code/Codex 接入飞书教程：Lark Coding Agent Bridge 实践](https://www.feishu.cn/content/article/7647408304896953549)