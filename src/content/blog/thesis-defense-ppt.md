---
title: "答辩 PPT 救急：把论文交给 Agent，直接生成 PPT"
description: "每到毕业答辩季，PPT 都是一件麻烦事。论文写完后，还要把几十页内容压缩成几页汇报，套进学院模板，整理实验图表，最后再一页页检查格式。"
pubDate: 2026-05-29T18:10:03+08:00
category: "GitHub 实践"
tags: ["答辩PPT", "AI Skill", "论文"]
cover: "/media/thesis-defense-ppt/cover.jpg"
coverAlt: "答辩 PPT 救急：把论文交给 Agent，直接生成 PPT"
---

每到毕业答辩季，PPT 都是一件麻烦事。论文写完后，还要把几十页内容压缩成几页汇报，套进学院模板，整理实验图表，最后再一页页检查格式。

`thesis-defense-pptx-skill` 是一个用于生成论文答辩 PPT 的 Agent Skill。

它面向需要严格复用本地 PPT 模板的场景：`能够从本地论文 PDF/LaTeX 项目和指定的 PPT 模板出发，生成可编辑的正式答辩 PPT`，并支持逐页导出、版式检查和文字溢出检查。

![](/media/thesis-defense-ppt/img_01.jpg)

GitHub：`https://github.com/zouchenzhen/thesis-defense-pptx-skill`

## 效果展示

项目文档里展示了一组基于郑州大学 PPT 模板生成的毕业论文答辩页，可以直观看到模板复用后的实际效果。

![](/media/thesis-defense-ppt/img_02.png)

![](/media/thesis-defense-ppt/img_03.png)

## 核心亮点

这个项目的核心思路，是`把答辩 PPT 生成拆成一条本地可检查的流程`。它会先读论文材料，再套用指定模板，最后通过导出和扫描来检查页面质量。

![](/media/thesis-defense-ppt/img_04.jpg)

- **读取论文材料**：支持 PDF/LaTeX 项目，提取正文内容和候选图表。
- **保留原始 PPT 模板**：保留封面、字体、配色、导航、卡片样式和页面比例。
- **输出可编辑 PPTX**：生成 `.pptx` 文件，文字、图片、表格后续都能继续改。
- **导出总览检查**：Windows + PowerPoint 环境下，可以逐页导出 PNG，再生成整套 PPT 总览图。
- **扫描低级错误**：检查文字溢出、旧模板文字、占位词、TODO 等残留内容。

## 安装方法

安装时，可以直接让 Agent 处理。把下面这段话发给它：

```
帮我安装这个 Skill：
[https://github.com/zouchenzhen/thesis-defense-pptx-skill](https://github.com/zouchenzhen/thesis-defense-pptx-skill)
```

Windows 上体验最完整，因为项目里的导出和溢出检查依赖 Microsoft PowerPoint COM。macOS / Linux 也能跑 `python-pptx` 相关部分，但少了 PowerPoint 的真实渲染质检。

## 使用方法

正式使用时，把论文路径、PPT 模板路径和输出路径给 Agent。可以这样说：

```
使用 thesis-defense-pptx skill。

论文路径：
D:\thesis\毕业论文.pdfPPT 模板路径：
D:\template\学院答辩模板.pptx输出到：
D:\output\毕业答辩PPT.pptx要求：
生成 15 页左右的本科毕业论文答辩 PPT，严格沿用模板风格，保留封面、导航、配色和字体，输出可编辑 PPTX，并导出 PNG 做版式检查。
```如果你已经有一份半成品答辩 PPT，也可以一起提供给 Agent，让它参考已有结构和图表继续完善。

## 适用场景

它更适合这些人：

- **本科生 / 研究生**：论文已经写完，需要把 PDF 或 LaTeX 内容整理成答辩 PPT。
- **有固定模板的学院或实验室**：模板风格不能随便改，只能在原版式上替换内容。
- **经常帮别人改 PPT 的同学**：可以先让 Agent 做一版结构稿，再人工细修关键页面。
- **想把 PPT 生成流程本地化的人**：论文、模板和图表都留在本机，不需要上传到在线 PPT 工具。

要注意的是，它不是一键出图的设计工具，实验图、指标、导师口径和学校格式仍然要人工核对。

它更适合先把“整理、套模板、导出检查”跑起来，再在这个基础上精修，能省掉不少重复排版和检查时间。

## 写在最后

如果你最近也在做毕业答辩 PPT，可以用它试一下。也欢迎留言分享你用过的 PPT Skill。

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
