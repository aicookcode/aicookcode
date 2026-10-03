---
title: "标注完直接改图，Codex 这个本地画布插件很实用"
description: "AI 生图，第一版通常不难，麻烦的是后面想改某个细节。明明只想改一个小地方，却要用文字描述一遍又一遍，最后还是不一定改到位。"
pubDate: 2026-06-24T07:30:00+08:00
category: "GitHub 实践"
tags: ["Codex", "画布插件", "AI 绘画"]
cover: "/media/codex-canvas-plugin/cover.jpg"
coverAlt: "标注完直接改图，Codex 这个本地画布插件很实用"
---

AI 生图，第一版通常不难，麻烦的是后面想改某个细节。明明只想改一个小地方，却要用文字描述一遍又一遍，最后还是不一定改到位。

所以 Cowart 这个项目一出来，热度起来得很快。

它是一个给 Codex 用的本地画布插件，图片生成后可以直接在画布上标注，哪里要改一眼就能说清楚。短短几天内就涨到了 2.2k Star。

用过之后，你会发现：以前在 Codex 里生成和迭代图片，简直像在“盲盒抽卡”；现在，它变成了`所见即所得、直观标注、实时迭代`的超级生产力武器。

GitHub：`https://github.com/zhongerxin/Cowart`

## 为什么 Cowart 这么香？

一个视频说明一切

> 🎬 原文此处为视频演示

> 视频来源：项目作者 @zhongerxin 的演示看完这个视频，你就会明白：这不只是个画布，而是一套**让 AI 图像创作真正“流动”起来**的工作流！

Cowart 基于 tldraw 实现本地无限画布，完美集成 Codex(GPT-Image-2) 的图像能力。

## 核心亮点包括:

- **AI Image Holder**：在画布上随便拖一个框，选中后直接让 Codex 生成图片，自动按比例填充，再也不用生成后手动拖大小。
- **直观标注迭代**：用箭头、文字在画布上随意涂涂画画 → 截图发给 Codex → 一键生成干净无标注痕迹的新版本，自动放在旁边对比。迭代效率直接起飞！
- **本地持久化**：所有画布和图片自动保存在项目目录的 canvas 文件夹，支持多页，不怕刷新丢失。
- **MCP 工具深度集成**：实时读取选中状态、插入图片、同步更新，体验丝滑。
- **一句话唤醒**：在 Codex 里说 “Open the Cowart canvas for this project.” 就能立刻打开。

## 安装

最省事的方式，是直接让 Codex 自动安装。将下面这段提示词复制给 Codex 即可。

```
请从 [https://github.com/zhongerxin/cowart.git](https://github.com/zhongerxin/cowart.git) 安装 Cowart Codex 插件。
请 clone 仓库到 ~/plugins/cowart，确认 .codex-plugin/plugin.json 存在，
把插件加入 personal marketplace，先运行 codex plugin marketplace add ~，
再运行 codex plugin add cowart@personal。
安装后请校验插件，并告诉我是否需要开启一个新对话来加载新技能和 MCP 工具。
```

项目也提供了手动安装方式，具体步骤可以直接看 README。

安装完成后，可以在插件列表里看到 Cowart。

![](/media/codex-canvas-plugin/img_01.png)

Cowart 目前内置了 3 个技能，分别对应不同的使用方式。

- cowart:cowart-open-canvas：打开 Cowart 本地画布。
- cowart:cowart-image-gen：把生成图片插入选中的 AI image holder。
- cowart:cowart-image-edit：根据用户提供的 Cowart 标注截图生成修订图。

![](/media/codex-canvas-plugin/img_02.png)

## 使用超简单

Cowart 的用法很简单，几步就能上手：

### step 1. 打开画布

在 Codex 中说：

```
Open the Cowart canvas for this project.

# 或者直接使用 `cowart-open-canvas` 技能打开
```

Cowart 会启动本地服务，默认地址是：

```
[http://127.0.0.1:43217/](http://127.0.0.1:43217/)
```

![](/media/codex-canvas-plugin/img_03.png)

### step 2. 生成新图

打开 Cowart 画布后，先在画布里创建一个 AI image holder，调整好尺寸并选中它。

![](/media/codex-canvas-plugin/img_04.jpg)

然后回到 Codex 对话框，直接输入你想生成的图片描述。例如：

```
生成一张可爱小猫躺在躺椅上吃西瓜的图片
```

Cowart 会根据选中的 holder 尺寸生成图片，并自动插入到画布对应位置。

![](/media/codex-canvas-plugin/img_05.png)

### step 3. 根据标注生成新图

在 Cowart 画布里用文字、箭头标出要改的地方，截图发给 Codex。

Codex 会读取标注内容，生成一张去掉标注痕迹的新图，并自动放在原图旁边。原图和标注都会保留，方便对比。

![](/media/codex-canvas-plugin/img_06.jpg)

生成的图片和画布数据都会保存在当前项目目录下，后续查看、复用或整理素材都很方便。

```
canvas/pages/<page-id>/assets/
```

## 适合什么场景

- **设计师 & UI/UX**：快速 brainstorm、视觉迭代、风格统一测试。
- **产品经理**：原型绘制、需求标注、AI 生成物料。
- **内容创作者**：海报、插画、短视频素材高效生成与修改。
- **AI 重度玩家**：喜欢用 Codex/GPT Image 搞创作，但苦于界面单一、迭代不直观的人。
- **开发者**：项目文档可视化、代码架构图 + AI 辅助美化。

一句话总结：**它把 Codex 的图像能力从“聊天框”拉到了“无限画布”上，让创意真正流动起来。**

## 写在最后

上线短短几天，Cowart 就已经在社区里积累了不少关注，star、fork 和 PR 也在持续增加。

如果你平时也会用 GPT Image 2 做图、改图，这个项目可以收藏玩起来。

欢迎在评论区聊聊你的使用体验，也可以顺手分享其他好用的工具。

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
