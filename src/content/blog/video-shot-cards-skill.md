---
title: "不用学剪辑！这个 Skill 准备了 104 张镜头卡给 Agent 做视频"
description: "于是我就想试试 AI 做视频，去 GitHub 上搜了一波，发现了一个宝贝 Skill：video-shotcraft。"
pubDate: 2026-08-03T17:34:00+08:00
category: "GitHub 实践"
tags: ["短视频", "分镜", "AI Skill"]
cover: "/media/video-shot-cards-skill/cover.jpg"
coverAlt: "不用学剪辑！这个 Skill 准备了 104 张镜头卡给 Agent 做视频"
---

**你不需要自己从零做视频，把这套方法交给 Agent，让它按步骤去干活。**最近想给自己做的产品剪一段简单介绍视频，但不想花额外时间去学剪辑，也不想为了这件事先付费买软件、买模板。

于是我就想试试 AI 做视频，去 GitHub 上搜了一波，发现了一个宝贝 Skill：video-shotcraft。

01PART一句话说清它是什么WHAT · 官方定位

![](/media/video-shot-cards-skill/img_01.png)

官方给它的定位是：一个把 ****Claude Code** / Codex** 等 AI Agent 变成**动效工作室**的 Skill。

产品交给它，它来完成分镜、动画和**声音设计**，产出一支**电影感**的宣传片、营销视频、发布视频或者功能演示。

它用 Remotion 写视频工程，把**真实页面截图**、**2.5D 运镜**、节奏卡点和**电影级 SFX**这些环节串起来。

镜头怎么走、页面怎么进场、转场怎么衔接、声音怎么配、最后怎么检查——这些容易说不清的东西，都被拆成了 Agent 能执行的步骤。

02PART104 张镜头卡 + 161 条动态样片GALLERY · 镜头配方对 Agent 说“做个炫酷的转场”或者“来点科技感”，它其实不知道你想要什么。为此，video-shotcraft 提供了 ****104 张镜头配方卡****。

每张卡片把镜头拆成了具体的执行方案——场景是什么、持续多久、怎么动、参数是什么，全部写清楚。比如 spotlight-hero-card、paper-title-card，覆盖了产品视频里常见的展示方式。

为了让用户能直观看到效果，video-shotcraft 还搭了一个在线 Gallery，把 104 张镜头卡和**161 条动态样片**放在一起——先浏览样片，挑一个接近的，再让 Agent 照着改成你的页面、文案和品牌颜色。

![](/media/video-shot-cards-skill/img_02.png)

### GALLERY

[https://vincentwei1021.github.io/video-shotcraft/library.html](https://vincentwei1021.github.io/video-shotcraft/library.html)

下面这支 38 秒的 Gallery 介绍片，本身就是用这个 skill 制作的——从分镜、镜头实现到声音设计，全部由 Agent 按库内方法论完成：

> 🎬 原文此处为视频演示

03PART它连声音也一起考虑了AUDIO · BGM & SFX很多产品视频看起来差一点，问题不一定在画面，而是在声音。

一个按钮点下去有没有反馈声，一个页面飞入有没有轻微 whoosh，一个标题出现有没有节奏点，这些细节会影响整段视频的感觉。

video-shotcraft 仓库里放了 ****5 首 BGM**** 和 **149 个音效**。这些音效还按 transition、impact、riser、camera、ui、text、paper 等类别整理好。

也就是说，它不只管“画面怎么动”，还把转场声、界面声、文字声、节奏点这些东西放进了制作流程。Agent 做视频时，可以按镜头节奏去安排声音，而不是到最后随便铺一首音乐。

04PART它怎么做一支视频WORKFLOW · 三种路线video-shotcraft 提供了三种使用路线。

① 直接用模板项目里有一个完整模板叫 ****Ink Press****，包含 10 个镜头结构。你可以让 Agent 在这个基础上替换产品截图、文案和品牌信息。

> 🎬 原文此处为视频演示

② 自主自由创作你把产品信息交给 Agent，让它自己决定视觉方向、镜头映射、分镜和音频方案。这种更像是把 Agent 当成一个会写代码的视频助理。

③ 共同创作你先和 Agent 一起确认产品简报、视觉方向、镜头安排和分镜，确认之后再让它进入制作。这种方式更适合你对成片有一些想法，不想完全放手给 Agent 的情况。

05PART安装和使用INSTALL · 上手即用安装很简单，把仓库链接丢给 Agent：

...prompt帮我安装这个 skill：

[https://github.com/Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft)

装好之后直接提需求就行。比如：

...prompt用 video-shotcraft 给我的桌面产品做一支宣传片。

也可以指定镜头卡，或者在 Gallery 里挑好再开始：

...prompt用 deck-deal-flyin 和 row-embed 两张镜头卡展示这个功能。

06PART适合谁AUDIENCE · 场景匹配适合想做产品宣传片、营销视频、发布视频或功能演示的人，尤其是 Web 产品、桌面软件、AI 小工具；不适合想一句话出片、做真人实拍或剧情短片的场景。

///LAST写在最后CONCLUSION对我这种“想做个产品介绍视频，但不想先去学剪辑”的人来说，video-shotcraft 降低了做视频的门槛。

如果你也在给自己的产品、AI 工具或者前端项目做视频，可以去看看这个项目。欢迎在评论区聊聊你的想法。

我是 AI 煮代码汤，记录 AI、编程和成长路上的日常折腾。这里会分享能直接上手的代码技巧、最近好玩的 AI 工具，也写一点技术之外的真实感受。希望你看完，不只是收藏一篇文章，而是真的多一个可以试试的办法。

既然看到这里了，如果觉得有用，随手点个赞、推荐、转发三连吧。

点赞推荐转发THANKS FOR READING

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
