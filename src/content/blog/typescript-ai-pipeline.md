---
title: "TypeScript 大师的 AI 编程流水线：5 个 Skill，从想法到可维护代码"
description: "用 AI 写代码的人，大多经历过两个阶段：一开始，一句话让 AI 开工，代码很快出来，方向却完全跑偏；后来，代码能跑、功能也对，却越来越难维护，一个小需求就要改七八个文件。"
pubDate: 2026-07-13T16:30:00+08:00
category: "GitHub 实践"
tags: ["TypeScript", "AI 编程", "AI Skill"]
cover: "/media/typescript-ai-pipeline/cover.jpg"
coverAlt: "TypeScript 大师的 AI 编程流水线：5 个 Skill，从想法到可维"
---

用 AI 写代码的人，大多经历过两个阶段：一开始，一句话让 AI 开工，代码很快出来，方向却完全跑偏；后来，代码能跑、功能也对，却越来越难维护，一个小需求就要改七八个文件。

为了解决这两个问题，Total TypeScript 创始人 Matt Pocock 把自己的 AI 编程方法整理成 **5 个 Agent Skill，串成一条完整流水线。**项目开源后，很快在 GitHub 冲到 16 万 Star。

他的核心观点很简单：**AI 编程助手就像一群没有记忆的工程师。**每次开启新对话，它都对项目一无所知，也不会记得之前的默契。与其反复调教，不如用一套固定流程约束它——**这 5 个 Skill，就是把完整的开发流程变成 AI 可以按顺序执行的规则。**

![alt text](/media/typescript-ai-pipeline/img_01.png)

### ① grill-me：动手前先把自己问透

这一步我们在之前的文章里详细聊过。grill-me 的核心逻辑是：**你给 AI 一个想法，它不急着生成代码，而是把这个想法拆成一连串需要确认的小问题，一问一答地把模糊需求捋清楚。**它源自 Frederick P. Brooks《设计原本》里的「设计树」概念——做设计就像在走一棵树的分叉，每选一个方向都要走到最底层才能动手。grill-me 就是逼着你和 AI 走完这棵树。

![alt text](/media/typescript-ai-pipeline/img_02.png)

Matt 说他最长的一次被 AI 问了 50 多个问题，聊了半小时。好消息是 AI 不会只问问题，它会顺手给一个建议答案，你只需要判断对不对就行。

用完之后你会得到一份和 AI 达成共识的需求理解。**但理解只存在当前对话里。**所以这一步结束之后，需要把确认下来的东西变成文档固化下来——这就是第二步。

### ② to-prd：把口头共识变成需求文档

grill-me 让你和 AI 聊透了，但换个对话、换个 Agent，前面的共识全没了。**to-prd 做的事就是把这段对话整理成一份产品需求文档（PRD）。**它的工作流不是从零开始写，而是能识别你已经做过的事。如果你刚跟 AI 做完 grill-me，它会跳过闲聊环节，直接从对话里提取需求。然后它会探索你的代码仓库，验证需求描述跟现有代码对不对得上，最后整理成一个带 user stories 的 PRD。

## user stories

是这个环节最值得注意的东西。它们用自然语言描述系统该怎么工作，既让人类看得懂，也能变成下一步的任务切分依据。

![alt text](/media/typescript-ai-pipeline/img_03.png)

PRD 描述的是「我们要做到什么」，但它没有告诉你「怎么一步步做到」。这就是第三步要解决的问题。

### ③ to-issues：把 PRD 拆成可独立执行的任务

这是 Matt 流水线里容易被低估的一步，但其实很关键：**他拆任务的方式跟大多数人不一样。**多数人拆任务是按技术层来切——你做前端、他做后端、另一个人写数据库。这叫水平切片。问题在于，每一层都依赖其他层，A 没做完 B 就没法动，整条线串行推进。

Matt 用的是**「tracer bullet」式的纵向切片**。**每一刀都切穿所有技术层，包含一个完整的功能路径：从用户操作到数据落库。**每个 issue 可以独立开发、独立测试、独立验收。如果你用多个 Agent 并行工作，这种方式可以让它们同时开干而不是互相等。

它还会自动标注任务之间的依赖关系：哪几个 task 没有前置依赖可以立刻开工，哪几个必须等前面的完成，看板上一目了然。

![alt text](/media/typescript-ai-pipeline/img_04.png)

### ④ tdd：用测试驱动开发来保证代码质量

到这里，你已经有了：一份写清楚的需求文档，一堆排好依赖的可执行任务。**下一步是怎么让 AI 写出来的代码真的可靠。**Matt 的做法是把 **TDD** 整个方法论写成一个 Skill。TDD 对很多开发者来说是个耳熟但手生的词，核心循环就三步：先写一个会失败的测试（红），再写最少的代码让它通过（绿），然后重构代码让它更干净（重构）。**把这个循环交给 AI 来跑，效果出奇地好。**

> Matt 的原文说：Doing really good TDD has been the most consistent way to improve agent outputs.
> 做扎实的 TDD 是他发现的最能稳定提升 AI 代码质量的手段。

这个 Skill 不只是调用测试框架。它还包含了关于接口设计、mock 策略和深模块（deep module）的指导。

核心思路是：面对混乱的代码库，人类会本能地把东西拆得很碎来降低心智负担，但 AI 面对一堆细碎模块反而更迷。把相关概念收到较深的模块里，只暴露一个薄的接口，AI 理解起来会容易得多。代码结构对了，测试的边界自然就清楚了。

![alt text](/media/typescript-ai-pipeline/img_05.png)

### ⑤ improve-codebase-architecture：让代码库对 AI 友好

前面四步是「做一件新事」的流程。这一步是「维护做事的环境」。你可以在每次大版本开发结束后跑一遍，也可以每周定期跑。

这个 Skill 会巡视你的代码库，找出三类问题：哪里多个小文件挤着解释同一个概念（认知碎片）;哪里为了可测试性把纯函数抽出来了,但真正容易出错的是调用方式（测试错位）;哪里模块耦合过紧导致牵一发而动全身（集成风险）。然后它会给出重构建议——把浅模块做深，让接口边界更清晰。

![alt text](/media/typescript-ai-pipeline/img_06.png)

> Matt 有一句话值得记住：If you have a garbage code base, the AI will produce garbage within that code base.
> 代码库烂，AI 产出的代码只会更烂。代码库本身的质量，就是 AI 产出的天花板。

这一步的价值不是一次性的。你每次跑完，代码库就更适合 AI 工作一点。慢慢地你会发现同样的需求，AI 给出的代码质量明显在提升——不是模型变聪明了，是工作的环境变干净了。

### 安装和使用

安装很简单，直接把下面这段话发给你的 Agent：

```
请帮我安装 mattpocock/skills 中的 grill-me、to-prd、to-issues、tdd、improve-codebase-architecture     GitHub：[https://github.com/mattpocock/skills](https://github.com/mattpocock/skills)  
```

使用就是按顺序调这 5 个命令：

```
/grill-me 做一个用户导出功能  /to-prd  /to-issues  /tdd  /improve-codebase-architecture  
```

### 结尾

回头看这五步，会发现它跟一个工程团队的工作方式几乎一一对应：**需求评审、写需求文档、拆任务、测试驱动开发、架构评审**。Matt 只不过把这些流程编码成了 AI 能执行的规则。

很多人觉得 AI 编程最大的问题是「模型不够聪明」。但你去问那些能让 AI 稳定产出高质量代码的开发者，会发现他们早就不纠结 prompt 了——他们在搭流程，它可能是你在 AI 越来越强的前提下，能做的最有杠杆的一件事。

你现在的 AI 编程流程，缺了这五步里的哪一步？欢迎在评论区聊聊。

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
