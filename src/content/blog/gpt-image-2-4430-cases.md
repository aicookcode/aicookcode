---
title: "GPT Image 2 不会写提示词？这个开源仓库整理了 4430 条案例"
description: "是不是经常在网上看到很好看的 AI 生成图，但自己一上手就卡住。想要的画面明明在脑子里，却不知道怎么写提示词。试来试去，最后只能反复加“高清、精美、电影感”，但效果还是差点意思😮‍💨。"
pubDate: 2026-05-07T10:35:16+08:00
category: "AI 应用"
tags: ["GPT Image", "提示词", "案例库"]
cover: "/media/gpt-image-2-4430-cases/cover.jpg"
coverAlt: "GPT Image 2 不会写提示词？这个开源仓库整理了 4430 条案例"
---

是不是经常在网上看到很好看的 AI 生成图，但自己一上手就卡住。想要的画面明明在脑子里，却不知道怎么写提示词。试来试去，最后只能反复加“高清、精美、电影感”，但效果还是差点意思😮‍💨。

今天推荐一个很适合收藏的 GPT Image 2 提示词仓库：**awesome-gpt-image-2**。这个项目由 YouMind OpenLab 维护，目前整理了 4430 条 GPT Image 2 提示词，支持 16 种语言。

项目还专门做了一个可视化画廊。你可以像逛图片网站一样浏览案例，也可以通过搜索、分类，以及使用场景、风格、主体类型去找灵感。

- 仓库地址：[https://github.com/YouMind-OpenLab/awesome-gpt-image-2](https://github.com/YouMind-OpenLab/awesome-gpt-image-2)
- 画廊地址：[https://youmind.com/zh-CN/gpt-image-2-prompts](https://youmind.com/zh-CN/gpt-image-2-prompts)

这篇文章按以下两部分介绍：

- 效果展示：仓库提示词效果展示
- 使用方法：如何使用它生成自己的图片

## 效果展示

以下是画廊里的精选案例

### 1. 商业食品摄影海报

![](/media/gpt-image-2-4430-cases/img_01.jpg)

### 2. 手绘成都美食地图

![Illustrated City Food Map - Image 1](/media/gpt-image-2-4430-cases/img_02.jpg)

### 3. 敦煌舞动作序列海报

![Infographic / Edu Visual - Dunhuang Dance Sequence Poster - Image 1](/media/gpt-image-2-4430-cases/img_03.jpg)

### 4. 3D 石阶演化信息图

![3D Stone Staircase Evolution Infographic - Image 1](/media/gpt-image-2-4430-cases/img_04.jpg)

### 5. 中国宫殿构件项目

![](/media/gpt-image-2-4430-cases/img_05.jpg)

### 6. 动漫武术对决

![Anime Martial Arts Battle Illustration - Image 1](/media/gpt-image-2-4430-cases/img_06.jpg)

## 使用方法

### step1: 找案例提示词

先找风格在仓库或者画廊里浏览你喜欢的图片案例，找到接近自己需求的风格，然后把对应提示词复制下来

![](/media/gpt-image-2-4430-cases/img_07.png)

### step2: 改写提示词

改写提示词把里面的主题、角色、场景、颜色、尺寸等信息替换成自己的需求。如果不知道怎么改，也可以直接交给 GPT，让它在保留原提示词结构的基础上帮你改写。

**比如我想改成狐狸：**

> 生成一张以“{argument name=&quot;subject&quot; default=&quot;cat&quot;}”为角色的宣传海报，采用直观的主视觉构图。海报采用上下层级结构：上部以最具辨识度的头部、面部轮廓、面具或人物外轮廓作为大型视觉主体，形成高辨识度的剪影主形；中下部则以完整的人物形象作为次要主体。在大轮廓内部及周围运用双重曝光与拼贴叙事构图，将多个场景、图像、小型人物关系、辅助元素及环境层级融合在云雾、水墨与留白之中。整体画面保留大面积留白，边缘处以水墨晕染及虚化破碎处理，在 {argument name=&quot;style&quot; default=&quot;东方美学&quot;} 中营造出真实的空间关系与呼吸感。尺寸：3:4
> 根据上面的提示词，改写为狐狸

**GPT 经过整理后输出：**

> 生成一张以“狐狸”为角色的宣传海报，采用直观的主视觉构图。海报采用上下层级结构：上部以狐狸最具辨识度的尖耳、狐首、面部轮廓、狐面具或灵狐外轮廓作为大型视觉主体，形成高辨识度的剪影主形；中下部则以完整的狐狸角色形象作为次要主体。在大轮廓内部及周围运用双重曝光与拼贴叙事构图，将山林、月色、古建筑、雾气、溪流、小型人物关系、辅助符号及环境层级融合在云雾、水墨与留白之中。狐狸可呈现灵动、神秘、优雅的气质，保留细长眼神、蓬松尾巴、柔顺毛发与东方神话感。整体画面保留大面积留白，边缘处以水墨晕染及虚化破碎处理，在东方美学中营造出真实的空间关系、层次感与呼吸感。尺寸：3:4。

### step3: 生成图片

用 GPT Image 2 生成图片把改好的提示词丢给 GPT Image 2 出图。如果结果不满意，就根据问题继续微调，比如调整主体、构图、光影、风格强度、细节元素等，直到接近想要的效果。

![](/media/gpt-image-2-4430-cases/img_08.png)

## 写在最后

awesome-gpt-image-2 可以先收藏起来。下次不知道怎么写生图提示词时，就去画廊里找一个接近的案例，复制 Prompt，再换成自己的主题试一试。

如果要商用，记得留意素材、人物、IP 和版权边界。

你最近用 GPT Image 2 生成了什么图？