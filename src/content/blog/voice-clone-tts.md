---
title: "Claude 能用你的声音说话了，靠的是这个 38k Star 的开源语音项目"
description: "你让 Claude Code 改一段代码，跑完测试后，它不再只是往终端里吐一串日志，而是直接说一句：测试通过了。声音还可以不是系统默认朗读，而是你提前设置好的声音。"
pubDate: 2026-07-06T17:22:33+08:00
category: "GitHub 实践"
tags: ["语音克隆", "TTS", "开源项目"]
cover: "/media/voice-clone-tts/cover.jpg"
coverAlt: "Claude 能用你的声音说话了，靠的是这个 38k Star 的开源语音项目"
---

你让 Claude Code 改一段代码，跑完测试后，它不再只是往终端里吐一串日志，而是直接说一句：测试通过了。声音还可以不是系统默认朗读，而是你提前设置好的声音。

这就是 Voicebox 最有意思的地方。

它不是单纯做声音克隆，也不是又一个网页 TTS 服务。它更像是放在你电脑里的本地语音工作室：先准备声音，再把这套声音能力开放给 Claude Code、Cursor、Codex 这类支持 MCP 的 Agent。

Github：[https://github.com/jamiepine/voicebox](https://github.com/jamiepine/voicebox)截至 2026 年 7 月 6 日，Voicebox 在 GitHub 上已经有 38K+ Star。对于一个今年 1 月才创建的开源项目来说，这个增长速度已经很能说明问题。

### Voicebox 是什么

Voicebox 是一个本地优先的开源 AI 语音工作室。

#### 更具体一点，它先帮你准备声音。

你可以录一段音频，也可以上传一段参考音频，让 Voicebox 创建一个 voice profile。这个 profile 可以理解成声音档案。之后输入文字，Voicebox 就能用这个声音生成语音。

![Voicebox 语音生成界面](/media/voice-clone-tts/img_01.jpg)

#### 它也负责管理语音生成。

在桌面界面里，你可以选择声音、输入文本、生成音频、查看历史记录，也能播放波形。做旁白、角色对话、播客片段，都可以放在这个界面里完成。

![Voicebox 桌面管理界面](/media/voice-clone-tts/img_02.jpg)

#### 更关键的是，它能把声音能力开放给外部工具。

这也是今天这篇文章重点内容。Voicebox 内置了 MCP Server，也提供本地 REST API。Claude Code、Cursor、Codex 这类 Agent 可以通过 MCP 调用本机的 Voicebox，让它把某段文字读出来。

![Voicebox MCP 开放能力](/media/voice-clone-tts/img_03.jpg)

### 安装使用

### 安装

打开 GitHub Releases 页面，下载对应系统的桌面安装包。下载完成后，安装并打开 Voicebox。

下载地址：

[https://github.com/jamiepine/voicebox/releases](https://github.com/jamiepine/voicebox/releases)

### 测试一次普通语音生成

打开 Voicebox 后，先用预设声音做一次测试。

在输入框里写一句简单文本，比如「测试通过了」，然后点击生成。

如果 Voicebox 能正常播放这句话，说明桌面应用、语音生成和本地播放已经跑通。

### 准备一个可以被调用的声音

想让 Agent 用指定声音说话，需要先在 Voicebox 里准备一个 voice profile。

第一次体验，可以直接选择预设声音。

如果要用自己的声音，就在 Voicebox 里录制或上传一段参考音频，创建新的 voice profile。创建完成后，这个声音档案会被保存下来。之后生成语音时，选择对应 profile，再输入文字即可。

### 把 Agent 接到 Voicebox

声音准备好以后，配置 MCP 接入。

Voicebox 启动后，会在本地提供一个 MCP 服务地址。以 Claude Code 为例，可以用下面这条命令添加：

```
claude mcp add voicebox \
  --transport http \
  --url [http://127.0.0.1:17493/mcp](http://127.0.0.1:17493/mcp) \
  --header "X-Voicebox-Client-Id: claude-code"
```

配置完成后，Claude Code 就可以调用本机的 Voicebox。

常用能力主要有三类。

- voicebox.speak：把文字说出来。
- voicebox.list_profiles：查看当前有哪些声音档案。
- voicebox.transcribe：把音频转成文字。

这一步完成后，Agent 就可以在关键节点直接开口。

### 接上以后，可以怎么用

接入 MCP 以后，还需要在提示词或项目规则里写清楚，什么时候让 Agent 调用 Voicebox。

可以这样写：

```
任务完成后，调用 Voicebox 的 speak 工具，用一句话播报结果。
测试失败时，调用 Voicebox 的 speak 工具，简短说明失败原因。
需要我确认方案时，先调用 Voicebox 的 speak 工具提醒我。
播报内容控制在一句话内，只说结论。
```

这样设置以后，Agent 在处理任务时，就会把语音播报当成工作流程的一部分。

#### 最直接的用法，是任务提醒

让 Claude Code 修改项目、运行测试、整理结果，任务结束后，它可以通过 Voicebox 说一句「测试通过了」。构建失败时，也可以提醒你失败原因。

#### 另一个场景，是多 Agent 协作

如果你同时让不同 Agent 做不同事，可以在规则里给它们指定不同 voice profile。代码检查、文档整理、测试执行，分别用不同声音播报结果。

这会让 Agent 的反馈更清楚。你听到声音，就知道是哪条任务线有了结果。

### 用 REST API 接进自己的工作流

Voicebox 也不只服务 MCP 客户端。

它还提供本地 REST API。比如脚本执行结束后，也可以把状态交给 Voicebox：

```
curl -X POST [http://127.0.0.1:17493/speak](http://127.0.0.1:17493/speak) \
  -H "Content-Type: application/json" \
  -H "X-Voicebox-Client-Id: my-script" \
  -d '{"text": "Deploy complete.", "profile": "Morgan"}'
```

这样一来，Voicebox 就不只是一个「输入文字生成语音」的桌面工具，而是可以接进本机工作流的一环。

Agent、脚本、自动化流程，都可以把需要播报的内容交给它。

### 其他功能

### 语音输入

除了让 Agent 说话，Voicebox 还有一个实用功能：全局语音输入。

用法很简单。**按住快捷键，说话，Voicebox 把语音转成文字，再自动粘贴到当前输入框。** 写 Prompt、写邮件、记想法时，用语音解放双手，简直太棒了。

这和前面的 Agent 语音输出也刚好接上：你可以用声音把想法输入给电脑，也可以让 Agent 用声音把结果反馈给你。一个负责输入，一个负责输出，Voicebox 就把这条语音链路补完整了。

### 内容创作

Voicebox 还有 Stories 编辑器，偏内容创作场景。它可以把不同角色的声音放到一条时间线上，可以做多角色对话、播客片段、叙事旁白。

![Voicebox Stories 编辑器](/media/voice-clone-tts/img_04.jpg)

### 现在还不算成熟

Voicebox 是今年 1 月才创建的新项目，GitHub 关注度涨得很快，功能和兼容性也还在持续调整。Issue 里还能看到模型加载、GPU 适配、听写粘贴、MCP 兼容、长音频转写等真实问题。

它现在还不是那种下载后就能稳定投入团队生产的成熟商业软件，但如果你想体验 Agent 语音输出，或者把声音克隆、语音输入、自动化播报这些能力放回自己的电脑里，已经很值得试。

### 写在最后

Voicebox 最有意思的地方，是把声音这件事从单纯的“生成一段音频”，往前推到了 Agent 工作流里。

以前给 Agent 接工具，是让它会查资料、会写代码、会操作文件。现在给它接 Voicebox，是让它在需要的时候开口说话。

如果你平时用 Claude Code、Cursor 或其他支持 MCP 的 Agent，你最想让它在什么时候开口提醒你？欢迎评论区留言讨论。

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
