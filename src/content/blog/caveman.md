---
title: "Claude Code都在装的GitHub项目：35k Star的Caveman，专治agent话太多"
description: "Caveman是 Julius Brussee 发布在 GitHub 上的一个开源项目，核心目标很直接："
pubDate: 2026-04-17T13:57:15+08:00
category: "GitHub 实践"
tags: ["Caveman", "AI Agent", "Claude Code", "开源项目"]
cover: "/media/caveman/cover.jpg"
coverAlt: "Claude Code都在装的GitHub项目：35k Star的Caveman"
---

## Caveman

是 Julius Brussee 发布在 GitHub 上的一个开源项目，核心目标很直接：

**让 agent 用更短、更硬、更直接的方式输出结果。**截至 **2026 年 4 月 17 日**，这个仓库在 GitHub 上已经有 **35.2k Star**。它不是新模型，不是推理优化器，也不是某种底层框架，而是一套围绕“简洁表达”设计出来的工程化工具。

它解决的问题也很明确：

- 减少 AI 回复里的礼貌寒暄
- 减少重复复述和冗余解释
- 保留问题原因、影响路径和修复动作
- 降低输出 token 占用和上下文浪费

换句话说，Caveman 做的不是提升模型智商，而是压缩模型表达。

目前主流 AI 编程环境基本都能接入，包括：Claude Code、Codex、Gemini CLI、Cursor、Windsurf、Copilot、Cline等。

项目地址：`https://github.com/JuliusBrussee/caveman`

---

## 它到底怎么工作？

Caveman 的做法并不复杂：

**通过一套风格规则，约束 agent 的表达方式，让回答尽量接近命令式、结论式和电报式输出。**项目 README 里有个很典型的例子。

![](/media/caveman/img_01.png)

可以看到，它并不是把信息删没了。它只是把那些“像为了显得周到而加进去”的语言全部剃掉了。这也是这个项目最值得注意的地方。

**它优化的不是知识本身，而是知识传递的路径。**

---

## Caveman 不只是个玩梗项目，它已经做成了一个完整工具

### 1. 它有不同强度，不是一刀切

![](/media/caveman/img_02.png)

Caveman 不是只有一种“原始人模式”，而是分成了多个档位：

- `Lite`：更克制，保留基本语法和可读性
- `Full`：默认压缩，明显更短
- `Ultra`：极限压缩，尽量电报体
- `文言文`：用更短的中文古典表达进一步压缩

这个设计很有针对性。因为不是所有任务都适合“越短越好”的表达。简单修 Bug、看错误、改命令参数，当然越利落越好。但如果场景是复杂架构讨论，或者带新人学习原理，太短反而会损失理解。所以 Caveman 不是在鼓吹“以后都别解释”，而是在提供一个可调的表达带宽。

### 2. 它不只压缩输出，还开始压缩输入

Caveman 提供压缩输入的能力：`caveman-compress`。

这个工具是拿来压缩像 `CLAUDE.md` 这种每次会话都会加载的记忆文件的。它会把原文保留成备份，再生成一份更短的压缩版供 Agent 读取。

![](/media/caveman/img_03.png)

通过对比可以看到，几类记忆文件平均还能再省 **46%** 的输入 token。输出优化是一层，输入治理是另一层。而 Caveman 已经开始往第二层走了。

---

## Caveman 如何安装使用

![](/media/caveman/img_04.png)

方法非常简单。Caveman已经列出了所有环境安装的方法，根据需要选择对应的命令安装即可✅。

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
