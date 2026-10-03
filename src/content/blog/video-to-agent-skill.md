---
title: "Agent 看不了视频？这个 Skill 把画面拆给它看"
description: "AI VIDEO · AGENT SKILL2026.07摸黑猜视频内容给 Agent 装一双**眼睛**开始看视频了claude-video · 关键画面 · 时间戳文字AI 煮代码汤SKILLVIDEO📦 6 Parts + Conclusion👉 滑动PART 01为什么看不见视频VIDEO "
pubDate: 2026-07-23T07:00:00+08:00
category: "GitHub 实践"
tags: ["视频理解", "AI Skill", "Agent"]
cover: "/media/video-to-agent-skill/cover.jpg"
coverAlt: "Agent 看不了视频？这个 Skill 把画面拆给它看"
---

AI VIDEO · AGENT SKILL2026.07摸黑猜视频内容给 Agent 装一双**眼睛**开始看视频了claude-video · 关键画面 · 时间戳文字AI 煮代码汤SKILLVIDEO📦 6 Parts + Conclusion👉 滑动PART 01为什么看不见视频VIDEO INPUTPART 02它是什么PIPELINEPART 03核心事项FRAMESPART 04安装超简单PROMPTPART 05怎么用USAGEPART 06适合谁USE CASESPART ///写在最后SUMMARY丢一个视频给 Agent，让它拆解分析内容。结果它读到标题、简介，运气好还能拉到字幕，然后就开始猜内容了。它压根没看见画面，不是在分析视频，是在**摸黑猜**。

最近翻到一个项目，叫 claude-video。它做的事很简单，给 Agent 补一双能看视频的眼睛。不是训练新的视频理解模型，而是加一个翻译官，把连续的视频流拆成两种 Agent 能读的材料，带时间戳的**关键画面**，加上带时间戳的字幕或逐字稿。Agent 才终于看懂了视频。

虽然名字带 Claude，但 Codex、Cursor 等等这些支持 Agent Skills 的 Agent 都能装。

GitHub 地址：

[https://github.com/bradautomates/claude-video](https://github.com/bradautomates/claude-video)

01PARTAgent 为什么看不见视频VIDEO INPUT · 输入边界现在的 Agent 已经很会**读东西**了，代码、网页、文档、图片，它都能处理。但视频一直有点麻烦，Agent **没法直接打开一个视频文件**去看画面里发生了什么。

![](/media/video-to-agent-skill/img_01.png)

比如一个开箱视频，主播嘴上说的全是感想，但产品长什么样、做工细节、实际大小，**全在画面里**，Agent 只能靠字幕猜。

或者一段教学视频，讲解人说「像这样操作就行」，但「这样」到底是哪样，Agent 看不到画面就永远不知道。

字幕只能让 Agent 知道他说了什么，**看不到屏幕上发生了什么**。

这就是 claude-video 这个项目有意思的地方。它不是想替代专业视频分析系统，而是先解决一个更具体的问题，**别让 Agent 闭着眼睛聊视频**。

claude-video 的价值

## 让 Agent 终于能拿到视频里的「画面证据」和「声音文本」

02PART一句话讲清楚，它到底是什么PIPELINE · 预处理流水线claude-video 是一个 Agent Skill，核心命令叫 /watch。Agent 可以用这个 Skill 把视频链接或本地视频**拆成它能理解的信息**。

Skill **执行流程**大概是这样：

yt-dlp 下载视频，ffmpeg 抽取关键帧，同时拿字幕。有字幕就直接用，没有的话走 Whisper 做语音转文字。最后把**关键画面和带时间戳的文字**一起交给 Agent，一边读图一边读文字，再回答问题。

![](/media/video-to-agent-skill/img_02.png)

所以我觉得它最准确的定位，是一个**视频预处理流水线**。它负责把视频翻译成 **Agent 能吃下去的上下文**。

03PART它不是逐帧看，而是挑重点看KEY FRAMES · TOKEN MODES先说抽帧这里先把方式说清楚：它**不是把整段视频逐帧塞给 Agent**，而是先挑出关键画面再分析。视频通常是每秒 24 帧或 30 帧，如果每一帧都塞给 Agent，上下文直接爆炸。claude-video 默认会按视频长度**控制抽帧数量**，先把画面压到 Agent 能处理的范围里。

![](/media/video-to-agent-skill/img_03.png)

这里需要注意的是，**超过 10 分钟**的视频，默认抽出来的关键画面会变稀。它仍然可以用来粗扫内容，但不适合直接拿来抠细节。如果要分析某个具体片段，最好直接**给出时间范围**，让 Agent 只看关键那几十秒。

再说模式

## 关键画面越多**，Agent 能看到的细节越多，

token 消耗也越高**。所以 claude-video 准备了几种模式，让你在「省 token」和「看细节」之间做取舍。

![](/media/video-to-agent-skill/img_04.png)

简单理解，transcript 是只听声音，efficient 是快速翻相册，balanced 是正常看重点，token-burner 是让 Agent 盯着细节看。另外，transcript 模式完全不下载视频、不抽帧，如果只是整理访谈、演讲、课程的字幕笔记，用它**最省 token**。

04PART安装非常简单INSTALL · 交给 Agent将下面内容**发给你的 Agent**，让它按你当前的电脑环境去装。

text帮我把这个项目安装成可用的 Agent Skill，并按项目文档检查依赖。

[https://github.com/bradautomates/claude-video](https://github.com/bradautomates/claude-video)

凡是需要我拍板或手动操作的地方，用一问一答的方式跟我确认，别替我做决定。

注意：需要文字内容时，有字幕就用字幕；没有字幕或本地录屏，就让大模型把语音转成文字。默认优先配置 Groq 的 whisper-large-v3，也支持 OpenAI 的 whisper-1。

05PART怎么用PROMPT · 使用示例将**视频和问题**一起丢给 Agent 来处理。

普通分析text/watch 看一下这个视频，帮我总结它讲了什么，按时间线列出关键内容。

这里粘贴视频链接只看片段如果你做内容，想拆开头钩子，也可以**只看前 10 秒**。

text/watch 只看这个视频的前 10 秒，帮我拆一下它的开头钩子，画面、字幕、节奏分别做了什么。

这里粘贴视频链接设置模式text/watch 用 efficient 模式快速看这个视频，先告诉我大概讲了什么，哪些地方值得再细看。

这里粘贴视频链接长视频指定时间段长视频最好**指定时间范围**。比如只关心某个功能演示，就让 Agent 只看那几十秒；不要把两小时视频整段丢进去，否则**上下文和 token** 都会被浪费。

text/watch 只看这个视频的 2:15 到 2:45，告诉我这一段具体演示了什么功能。

这里粘贴视频链接06PART适合谁USE CASES · 使用场景

### 经常收到 bug 录屏的开发者

让 Agent 先帮你看一遍问题出现在哪。

### 做内容的人

用它拆公开视频的开头、结构和画面节奏。

### 产品经理

快速扫产品发布、功能演示和培训视频。

### Agent 玩家

把视频当成一种新的输入材料。

## 适合把视频变成 Agent 可处理的上下文，不适合替代专业视频理解系统

///LAST写在最后SUMMARY · 少猜一点，多看一点过去我们给 Agent 的材料，大多是文字。claude-video 将视频也拆成了 **Agent 能处理的材料**，让它能看到关键画面。它不是什么一步到位的未来，更像一个今天就能装上试试的小零件：让 Agent 少猜一点，多看一点。

如果你也想试试，就从一个**短视频或者自己的录屏**开始吧。欢迎留言告诉我，你最想让 Agent 帮你看哪类视频。

我是 **AI 煮代码汤**，记录 AI、编程和成长路上的日常折腾。这里会分享能直接上手的代码技巧、最近好玩的 AI 工具，也写一点技术之外的真实感受。希望你看完，不只是收藏一篇文章，而是真的**多一个可以试试的办法**。

既然看到这里了，如果觉得有用，随手点个赞、推荐、转发三连吧。

点赞推荐转发THANKS FOR READING

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
