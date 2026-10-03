---
title: "让 Claude Code、ChatGPT 生成更好看的文案排版，Kami Skill值得收藏"
description: "现在用 AI 输出内容已经很简单，但生成结果往往排版散乱，结构、字体、颜色都不统一，让人很难有兴趣继续读下去。"
pubDate: 2026-05-21T12:41:16+08:00
category: "GitHub 实践"
tags: ["Kami", "文档排版", "AI Skill"]
cover: "/media/kami-doc-design/cover.jpg"
coverAlt: "让 Claude Code、ChatGPT 生成更好看的文案排版，Kami Sk"
---

现在用 AI 输出内容已经很简单，但生成结果往往排版散乱，结构、字体、颜色都不统一，让人很难有兴趣继续读下去。

针对这个问题，GitHub 上一位开发者开源了一个 Agent Skill：`Kami`，目前已有 5.5K+ Stars。

这个 Skill 为 Agent 定制了`一套文档设计规范`。按作者的说法，一套交给任何 Agent 都能放心出活的安静设计系统。

GitHub：`https://github.com/tw93/Kami`

![](/media/kami-doc-design/img_01.jpg)

## 项目定位

`一个面向 AI Agent 的文档设计系统。一种强调色、衬线层级、暖色羊皮纸画布。`给任何 Agent 一段描述，就能得到稳定的排版输出。也可以作为视觉设计简报给到 Claude Design 或 GPT Canvas 这类图像渲染工具。

## 效果展示

Skill 提供十种模板类型：一页纸、长文档、信件、作品集、简历、幻灯片、个股研报、更新日志、落地页（中英文）。外加 14 种内联 SVG 图表用于可视化说明。输出为 HTML，可导出为 PDF、PNG 或幻灯片。

### 官方展示效果

可以访问[https://kami.tw93.fun/index-zh.html](https://kami.tw93.fun/index-zh.html)查看更多内容

![图片说明](/media/kami-doc-design/img_02.jpg)

![Luo landing page](/media/kami-doc-design/img_03.png)

![Mole landing page](/media/kami-doc-design/img_04.png)

### 自测

我找了一段 Flutter 相关资料，想整理下来，方便后续继续阅读。用 Kami Skill 生成长文档后，版面比直接看 Markdown 清爽不少，长时间阅读舒服很多，也更适合留存。

Markdow 文档样式：

![](/media/kami-doc-design/img_05.png)

使用Kami 生成的长文档样式：

![](/media/kami-doc-design/img_06.png)

## 设计原则

暖米纸底，油墨蓝点缀，serif 承担层级，硬阴影与花哨配色都退后；这套系统面向印刷文档，负责把内容收束成稳定、清晰、易读的版面。

1. 页面背景羊皮纸 #f5f4ed，不用纯白
2. 强调色只有油墨蓝 #1B365D，不引入第二种彩色
3. 所有灰色暖调 (yellow-brown undertone)，禁止冷蓝灰
4. 英文 serif 通吃标题和正文，中文标题用 serif、正文用 sans
5. Serif 正文 400，标题 500，不用合成 bold
6. 行距三档：紧凑标题 1.1–1.3 / 密排 1.4–1.45 / 阅读 1.5–1.55
7. Tag 背景必须实色 hex，禁止 rgba（WeasyPrint 双层矩形 bug）
8. 阴影只用 ring 或 whisper shadow，不用硬 drop shadow

## 支持语言

英文、中文、日文。

每种语言使用专属衬线字体：

- 英文用 Charter
- 中文用 TsangerJinKai02
- 日文用 YuMincho。

字距、行高、字号都按语言做了印刷级调优。

## 安装方法

最省事的方式，是直接让 Agent 帮你安装。把下面这句话发给它就行：

```
帮我安装这个sill
github地址：[https://github.com/tw93/Kami](https://github.com/tw93/Kami)
```

## 使用方法

使用自然语言告诉 Agent 要做什么，它会按需求匹配模板。

英文可以这样写：

```
make a one-pager for my startup
turn this research into a long doc
build me a resume
design a slide deck for my talk
build a landing page for my app
```

中文可以这样写：

```
帮我做一份一页纸
帮我排版一份长文档
帮我写一封正式信件
帮我做一份作品集
帮我做一份简历
帮我做一套演讲幻灯片
帮我做一个产品落地页
```

如果经常要用自己的身份信息和品牌风格，还可以创建这个文件：

```
~/.config/kami/brand.md
```

里面可以放姓名、角色、邮箱、网站、GitHub、品牌色、默认语言、页面尺寸、语气偏好等信息。

Kami 会把它当成低优先级上下文：当前任务说得不清楚时才参考，当前需求明确时以当前需求为准。

## 写在最后

AI Agent 负责生成内容，Kami 提供排版和视觉规则。经常用 AI Agent 写材料的话，可以先收藏备用。

如果你还见过类似的 Agent Skill、文档排版工具，或者 AI 生成 PPT 项目，也欢迎在留言区补充。后面可以再整理一波同类项目清单。

![](/media/kami-doc-design/img_07.png)

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
