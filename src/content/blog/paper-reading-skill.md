---
title: "读论文太头大？这个 AI skill 直接帮你做图解、长文和 PPT"
description: "最近看到一个超级实用的开源项目：**paper-craft-skills**。它能让 AI 帮你把学术论文，变成精美的方法图解、高质感幻灯片和深度长文。"
pubDate: 2026-07-03T07:30:00+08:00
category: "GitHub 实践"
tags: ["论文阅读", "AI Skill", "科研"]
cover: "/media/paper-reading-skill/cover.jpg"
coverAlt: "读论文太头大？这个 AI skill 直接帮你做图解、长文和 PPT"
---

你是不是也遇到过这些情况？

- 读一篇顶会论文，密密麻麻的公式和图表看得头大；
- 想画个方法架构图，结果 PS/AI 画了半天还是不像样；
- 要做组会汇报 PPT，从零排版到找素材，熬到凌晨两点……

最近看到一个超级实用的开源项目：**paper-craft-skills**。它能让 AI 帮你把学术论文，变成精美的方法图解、高质感幻灯片和深度长文。

![](/media/paper-reading-skill/img_01.jpg)

GitHub：`https://github.com/zsyggg/paper-craft-skills`

## 项目简介

这个项目把论文二次加工这件事，拆成了三个可直接调用的 skill：

- paper-comic：把论文做成方法图解
- paper-analyzer：把论文写成适合阅读的深度长文
- paper-deck：把论文变成可以汇报的幻灯片

### paper-comic — 论文变方法图解

用这个 Skill，Agent 会先读完整篇论文，再推荐适合画哪些图。你确认之后，它就直接生成。

支持两种风格：

- paper-figure：干净、专业、发表级图表，适合投论文、做汇报
- sketchnote：明亮温暖、手绘风研究笔记，适合学习笔记、公众号分享

![](/media/paper-reading-skill/img_02.png)

### paper-analyzer — 论文变深度长文

它不是简单翻译，而是按你选的写作风格，把论文重新讲一遍。它会读全文、搜索对应的 GitHub 开源代码、提取公式并逐个符号讲解，还能用 Mermaid 画架构图。

支持三种写作风格：

- academic： 学术综述风，带 KaTeX 公式和对比表格
- storytelling：像爆款公众号文章，带钩子、类比和金句
- concise： 速查表风格，快速抓重点

![](/media/paper-reading-skill/img_03.jpg)

### paper-deck - 论文变高质感幻灯片

paper-deck 可以把论文、文章或技术笔记做成一套有设计感的幻灯片。

它会先生成 deck brief 和逐页大纲，再写出可复现的视觉提示词，逐页生成 16:9 的幻灯片图片，最后合成为 .pptx 和 .pdf。

因为每一页都有独立 prompt，后面要细调某一页也会方便很多。

支持四种风格：

- journal-minimal：Nature / IEEE 学术风
- business-research：商业汇报风
- warm-notes：温暖教学风
- liquid-glass：苹果玻璃质感，视觉感更强

![](/media/paper-reading-skill/img_04.jpg)

## 怎么用？超级简单！

### 安装

最省事的方式，是把这段话直接发给你的 Agent：

```
请帮我安装 zsyggg/paper-craft-skills
GitHub：[https://github.com/zsyggg/paper-craft-skills](https://github.com/zsyggg/paper-craft-skills)
```

AI 会自动帮你搞定一切，不需要任何配置！

### 使用

支持arXiv链接、本地PDF、甚至直接粘贴文字

```
/paper-comic [https://arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762)
/paper-deck [https://arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762) --style journal-minimal
/paper-analyzer [https://arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762)
```

## 谁适合使用？

学生党、研究员、老师和内容创作者的福音！

但如果你只是想要一句很短的论文摘要，这个项目就有点重了。它更适合“读完之后还要继续产出内容”的场景。

## 写在最后

读论文最难的，很多时候不是打开 PDF，而是读完之后脑子里还是一团散乱的。这个项目的价值，就在于帮你把这些散的东西重新理一遍。

你平时读论文，最卡的是哪一步：看公式、理方法，还是做笔记？欢迎留言聊聊。

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
