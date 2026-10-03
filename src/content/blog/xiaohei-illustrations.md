---
title: "写内容总缺正文配图？这个小黑 Skill 能把文章观点直接画出来"
description: "写公众号、博客、方法论文章时，正文配图是不是经常卡住？最近刷到一个非常有意思的配图 Skill — `Ian Xiaohei Illustrations`。"
pubDate: 2026-05-31T06:00:00+08:00
category: "GitHub 实践"
tags: ["小黑", "插画", "AI 绘画", "开源项目"]
cover: "/media/xiaohei-illustrations/cover.jpg"
coverAlt: "写内容总缺正文配图？这个小黑 Skill 能把文章观点直接画出来"
---

写公众号、博客、方法论文章时，正文配图是不是经常卡住？最近刷到一个非常有意思的配图 Skill — `Ian Xiaohei Illustrations`。

这个 Skill 可以用来给中文文章生成 16:9 横版正文配图，默认风格是白底、手绘线稿、少量中文批注，还有一个叫“小黑”的黑色小角色参与画面里的核心动作。

![](/media/xiaohei-illustrations/img_01.png)

GitHub：`https://github.com/helloianneo/ian-xiaohei-illustrations`

## 项目定位

Ian Xiaohei Illustrations 本质上是一个 Agent Skill。用来指导 AI Agent 为中文文章、帖子、博客、Notion 文档和方法论内容`生成正文配图。``核心目标：先理解文章里的认知锚点，再把其中一个判断、流程、结构、状态或隐喻，变成一张有记忆点的 16:9 手绘解释图。`

## 效果展示

**项目里放出了不少具体效果展示，下面就是其中一部分。顺带一提，这篇文章里的几张配图，也都是用这个 Skill 生成的，可以直接当作实测效果参考。![](/media/xiaohei-illustrations/img_02.jpg)**

![内容发酵](/media/xiaohei-illustrations/img_03.png)

![](/media/xiaohei-illustrations/img_04.jpg)

![](/media/xiaohei-illustrations/img_05.jpg)

## 工作流程

这个项目最有用的地方，是它`把“配图”拆成了一个可复用的工作流`。Agent 不只是接到一句“帮我生成插图”，而是先判断文章哪里值得画，再为每张图设计结构、动作和短标注。

![](/media/xiaohei-illustrations/img_06.png)

1. 读取文章、Markdown、Notion 内容、截图或用户给的主题
2. 提炼核心观点、认知转折、流程结构和适合视觉化的段落
3. 先输出 shot list：每张图只选一个认知锚点
4. 为每张图选择结构类型：Workflow、系统局部、前后对比、角色状态、概念隐喻、方法分层、地图路线或小漫画分镜
5. 重新发明一个低科技、怪诞但成立的物理隐喻
6. 让小黑承担核心动作
7. 每张图单独调用图像模型生成
8. 按 QA checklist 检查：白底、留白、小黑动作、中文标注、非 PPT 感、非旧案例复刻
9. 保存最终 PNG，并报告用途和路径

## 安装方法

把下面这句话发给 Agent 即可：

```
帮我安装这个 sill
[https://github.com/helloianneo/ian-xiaohei-illustrations](https://github.com/helloianneo/ian-xiaohei-illustrations)
```

## 使用方法

安装后，在 Agent 里可以直接这样用：

```
Use $ian-xiaohei-illustrations 把下面这篇文章生成 4 张小黑怪诞正文配图。
要求：16:9 横版、纯白背景、黑色手绘线稿、少量红橙蓝中文手写批注。
```

如果你只是想先看配图方案，不急着生成图片，可以这样写：

```
Use $ian-xiaohei-illustrations 先不要生图。
请分析下面这篇文章哪里值得配图，输出 5 张左右的 shot list。
每张图写清楚：放在哪段后、主题、核心意思、结构类型、小黑在做什么、建议中文标注词。
```

如果只想给一个概念生成单张图，也可以直接给一句话：

```
Use $ian-xiaohei-illustrations 为“信任需要一块证据一块证据铺过去”生成一张正文配图。
画面要怪诞但清爽，小黑必须承担核心动作。
```

它更适合把一个判断、流程、结构或状态画成一张图，不适合做长段文字型信息图。中文标注越短越稳，每张图只讲一个核心意思。

## 适合场景

### 特别适合：

- 写中文文章，需要正文配图和文章插图的人
- 做知识型内容、方法论内容、AI 工作流内容的人
- 想把抽象判断画成具体隐喻的人
- 想要一种比 PPT 信息图更轻、更怪、更有个人识别度的配图风格的人
- 用 Codex 做内容生产，希望稳定复用一套视觉语言的人

### 不适合：

- 想要商业插画、品牌 KV 或精致扁平插画的人
- 想要传统 PPT 信息图、复杂架构图或流程图的人
- 想要儿童卡通、可爱 IP、表情包风格的人
- 想把大量正文、长段解释或完整课程页塞进一张图里的人
- 需要严格可编辑矢量源文件的人

## 写在最后

这个 Skill 的价值，不只是“生成几张配图”，而是把文章配图变成了一套可重复调用的视觉工作流。

如果你经常写中文长文，尤其是 AI、工具、方法论这类内容，它很适合作为一个长期放在手边的配图助手。

你也试过类似的正文配图方案的话，欢迎在评论区分享。

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
