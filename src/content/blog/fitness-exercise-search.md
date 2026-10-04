---
title: "GitHub 热榜上的 1324 个健身动作项目，我用 AI 编程做成了搜索站"
description: "vibe coding一个可在线体验的健身动作查询工具"
pubDate: 2026-07-07T20:30:00+08:00
category: "GitHub 实践"
tags: ["健身", "AI 编程", "搜索站"]
cover: "/media/fitness-exercise-search/cover.jpg"
coverAlt: "GitHub 热榜上的 1324 个健身动作项目，我用 AI 编程做成了搜索站"
---

最近 GitHub Trending 上有个健身数据集很火，叫 **exercises-dataset**。它整理了 1324 个健身动作，分类、器械、目标肌群、动作步骤、多语言说明都配好了。

健身动作资料整理起来是细活。动作叫什么，主要练哪里，要不要器械，步骤怎么写，中文说明怎么补，辅助肌群怎么标，这些信息真要一条条处理，需要不少时间。**exercises-dataset** 直接把这些内容整理成了一份能复用的数据，用来做筛选搜索、动作库、训练计划，都非常棒。

### 这个项目提供了什么

主角 **hasaneyldrm/exercises-dataset**，GitHub 地址在这里：

```
[https://github.com/hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset)
```

它提供了**1324 条健身动作的结构化数据**。每条数据里包含动作名称、分类、身体部位、目标肌群、辅助肌群、器械、步骤说明、多语言内容（支持6种不同语言，英语、西班牙语、意大利语、土耳其语、俄语、中文）。

一条动作数据大概长这样：

```json
{  
    "id": "0001",  
    "name": "3/4 sit-up", 
    "body_part": "waist",  
    "equipment": "body weight",  
    "target": "abs",  
    "secondary_muscles": ["hip flexors", "lower back"],  
    "instruction_steps": [
        "Lie flat on your back with your knees bent and feet flat on the ground.",    
        "Place your hands behind your head with your elbows pointing outwards.",    
        "Engaging your abs, slowly lift your upper body off the ground."  
    ],  
    "media_id": "0001"
}
```

这份数据好用的地方，在于它已经把动作名称、训练部位、目标肌群、器械和步骤说明拆成了字段。程序可以直接读取、筛选、组合，不用再从一大段文字里重新拆。

比如做训练计划生成器，可以按目标肌群和器械条件去组合动作。做 AI 私教时，这些结构化字段也能作为底层知识库，让生成出来的建议更具体。

### 媒体资源怎么处理

做健身动作查询，只看文字不够。一个动作到底怎么发力、身体怎么移动，最好还是有图片或者 GIF。

**exercises-dataset** 的数据里有 **media_id**，项目文档指出可以通过 **media_id**调用接口找到对应动作 GIF。但我实际使用的时候，这条路径在当前环境里没法稳定正常获取。

在 X 上看到一位老师提到 **ExerciseGymGifsDB**，这个项目刚好补上了动作 GIF 这块。于是，在我的搜索站项目开发中，**exercises-dataset** 负责动作数据，**ExerciseGymGifsDB** 负责动作 GIF 演示。

| 项目 | 作用 |
| --- | --- |
| **hasaneyldrm/exercises-dataset** | 提供动作数据、分类、器械、目标肌群、多语言说明 |
| **JahelCuadrado/ExerciseGymGifsDB** | 提供动作 GIF 演示素材 |

**ExerciseGymGifsDB** 的 GitHub 地址在这里：

```
https://github.com/JahelCuadrado/ExerciseGymGifsDB
```

我的代码中使用的是 **ExerciseGymGifsDB** 提供的这个索引：

```
https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/api/en/exercises.json
```

目前在国内网络环境下，这个地址也能正常访问。

### 准备好数据源以后，vibe coding 搭页面

数据源处理完，页面本身就简单多了。我做的是一个 Web 演示，用 React + Ant Design。对经常 vibe coding 的人来说，React 应该不陌生；Ant Design 又是 React 生态里常用的组件库，表单、列表、卡片、弹窗、分页这些组件都有，做这种管理台风格的小页面很顺手。

这次页面结构比较简单：顶部搜索框、筛选条件、分页卡片列表、动作详情弹窗，再加上 GIF 预览和步骤说明。

给 AI 的提示词，大概可以写成这样：

```
我准备了两个健身动作相关的数据源： 
1. exercises-dataset，里面有动作名称、分类、身体部位、目标肌群、器械、步骤说明、多语言内容和 media_id。
2. ExerciseGymGifsDB，里面有动作 GIF 信息，可以通过 jsDelivr CDN 读取索引和素材地址。 

请用 React + Ant Design 帮我做一个健身动作搜索页面。 
页面要求：

  1. 顶部有搜索框，可以按动作名称搜索。
  2. 支持按身体部位、器械、目标肌群筛选。
  3. 主体是分页卡片列表，每张卡片展示动作名称、部位、器械和 GIF 预览。
  4. 点击卡片后打开详情弹窗。
  5. 详情弹窗里展示 GIF、动作基础信息、目标肌群、辅助肌群和分步骤说明。
```

这个提示词不复杂，关键是把数据来源、技术栈、核心功能和点击后的展示内容都讲清楚。只说「帮我做个健身网站」，结果很容易跑偏；把页面结构和交互写具体，第一版就更容易落地。

我后面也有计划把这个方向继续做成微信小程序版本，目前还在筹备中。小程序更适合移动端查询，尤其是健身动作这种随手打开、随手查的场景。

### 最后做出来的效果

最后做出来的是一个在线健身动作搜索站。列表页里可以搜索动作，也可以按身体部位、器械、目标肌群筛选。点开某个动作后，会弹出详情页，里面有 GIF、基础信息、目标肌群、辅助肌群和分步骤说明。

列表页截图：

![列表页截图](/media/fitness-exercise-search/img_01.png)

详情页截图：

![详情页截图](/media/fitness-exercise-search/img_02.png)

页面操作视频：

<figure>
  <video class="article-video-landscape" controls playsinline preload="metadata" width="1280" height="672" poster="/media/fitness-exercise-search/exercise-search-video-poster.jpg" aria-label="健身动作搜索站操作演示">
    <source src="/media/fitness-exercise-search/exercise-search-demo.mp4" type="video/mp4" />
    你的浏览器暂不支持视频播放，可以<a href="/media/fitness-exercise-search/exercise-search-demo.mp4">下载视频</a>观看。
  </video>
  <figcaption>健身动作搜索站操作演示</figcaption>
</figure>

在线体验地址：

```
https://eric8787x.github.io/exercise/
```

演示代码也放在 GitHub 上了：

```
https://github.com/eric8787x/exercise/tree/main
```

你可以直接打开页面体验，也可以把代码拉下来本地跑。如果不想用我的代码，也可以复制上面的提示词，换成自己的数据源，做一个自己的版本。

### 这次做完后的感受

我以前看到这种数据集，大概率也是先收藏。收藏夹里又多一个「以后可能有用」的项目，然后很长时间都不会再打开。

现在有了 AI 和 vibe coding，一个想法很快就能变成可以打开、可以操作的页面。做完这个小项目，还是会忍不住感叹：AI 真的把实现想法的门槛拉低了很多。

这里也要把授权问题说清楚。如果只是自己学习、写文章、做演示，开源素材组合起来玩一玩问题不大。真要做商业产品，动作图片、GIF、视频这些媒体素材一定要重新确认授权。

### 后面还可以怎么做

这个项目继续往下做，有不少方向。比如做一个微信小程序动作库，方便手机端直接查；也可以做训练计划生成器，按目标肌群、器械、训练频率自动组合动作等等。

这些方向都不用一开始做得很大。先有一个能搜索、能筛选、能看动作、能打开在线链接的小版本，就够开始了。

### 写在最后

回到 **exercises-dataset** 这个项目本身，它最直接的价值，是把 1324 条健身动作整理成了结构化数据。

再加上 vibe coding，一个在线健身动作搜索站很快就能搭出来。

如果你也想试试，可以从这三个入口开始：

```
原始数据集：https://github.com/hasaneyldrm/exercises-dataset
动作搜索站在线演示：https://eric8787x.github.io/exercise/
演示代码：https://github.com/eric8787x/exercise/tree/main
```

你会更想把它做成哪种版本，健身动作小程序、AI 私教，还是训练计划生成器？
