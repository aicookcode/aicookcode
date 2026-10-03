---
title: "AI 一句话生成 Lottie 动画！这款开源神器让动效开发效率暴增 10 倍"
description: "今天这篇文章，带你彻底搞懂它到底有多强，怎么用，以及为什么值得你马上试试。"
pubDate: 2026-06-10T12:35:20+08:00
category: "GitHub 实践"
tags: ["Lottie", "AI 动画", "开源项目"]
cover: "/media/lottie-ai-animation/cover.jpg"
coverAlt: "AI 一句话生成 Lottie 动画！这款开源神器让动效开发效率暴增 10 倍"
---

## 再见 After Effects，手动抠路径的时代结束了

大家好，我是你的效率工具党。

### 最近刷到几个惊艳的 Lottie 动画演示：逼真的股票 K 线图逐根生长、Spotify Logo 流畅弹出、Apple 风「hello」文字书写动画……我以为又是哪个大厂动效设计师的手笔，结果发现

## 全部由 AI 一句话生成

### ！

### 背后工具就是最近爆火的开源项目 ——

**diffusionstudio/lottie（Text-to-Lottie）**。

今天这篇文章，带你彻底搞懂它到底有多强，怎么用，以及为什么值得你马上试试。

![Text to Lottie](/media/lottie-ai-animation/img_01.gif)

---

## **什么是 Text-to-Lottie？**

### 它是一个

## 开源的 AI Skill + 本地播放器

，

### 核心能力就是：

**用自然语言（Prompt） → 直接生成生产级 Lottie JSON 动画**

- 基于 Claude / Cursor / Codex 等大模型
- 输出标准的 Lottie JSON 文件（可直接用于网页、iOS、Android）
- 内置高性能 Skia CanvasKit 播放器 + 实时控制面板
- 生成后**热重载**，边改 Prompt 边看效果

### 一句话总结：

## 把 After Effects 的复杂工作，变成了和 AI 聊天

。

## **实际效果有多惊艳？**

> 🎬 原文此处为视频演示

- 用文字描述生成 TSLA 风格 K 线图动画，红绿柱子逐根生长，相机平滑移动
- Spotify Logo 弹出 + 笔画绘制 + 文字淡入，还能实时改颜色和粗细
- SVG 路径按自然书写顺序显现，搭配高级 Apple 渐变效果

### 这些都不是静态演示，而

### 是

## 真实可导出的 Lottie 文件

### ，直接就能上线使用。

## **安装方法**

如果只是想让 Codex / Claude Code 学会生成 Lottie，可以先安装 skill：

```
npx skills add diffusionstudio/lottie
```

如果还要在本地预览动画，需要把播放器项目也拉下来：

```
npx degit diffusionstudio/lottie my-animation
cd my-animation
npm install
npm run dev
```

启动后打开终端里打印的本地地址，一般是：

```
[http://localhost:5173](http://localhost:5173)
```

打开浏览器后，你会看到一个全屏播放器 + 右侧控制面板，可以实时调整颜色、速度、尺寸等参数，超级爽。

## **使用方法**

### 提示词使用

安装 skill 后，可以直接对 Agent 说：

```
使用 text-to-lottie 生成一个 3 秒循环播放的 loading 动画，主色是蓝绿色，背景透明。
```

以下是演示视频中动画更详细的参考提示

#### 参考一：股票 K 线图

> 一款高端金融科技Lottie，透明背景的烛台图表，配有350根真实的TSLA风格红绿蜡烛，从左到右快速显示;每根细长的蜡烛垂直生长，进入其OHLC主体和匹配颜色的灯芯，间距紧凑，自然聚集波动，无网格或标签，单一母摄像组短暂停留后顺畅地平移，顺应市场趋势，呈现150帧、30帧/秒的画面。

#### 参考二：Spotify Logo

> 从Spotify SVG标志创建Lottie动画，圆形标记弹出，三个内部标记笔画通过修剪路径动画绘制，词标字符从下方上升并依次淡入。添加可编辑的Skottie槽位，用于标志颜色和标记笔画宽度，并支持预览控制。

#### 参考三：Apple 风「hello」文字书写动画

> 从SVG路径创建Lottie动画 [https://github.com/JaceThings/SF-Hello/blob/main/SVG/hello-en.svg.](https://github.com/JaceThings/SF-Hello/blob/main/SVG/hello-en.svg.)用一个跟随自然路径方向的动画揭示路径。在路径上应用高级的苹果主题渐变。使用徐入式出时机、透明背景，并保留原始SVG几何体。

### 提示词指南

1. 为模型打基础尽可能提供SVG、真实世界数据或截图。当动画基于具体素材时，效果会好很多。
2. 使用运动设计术语，用运动设计语言如缓入、缓出和缓入，描述时机和动作。
3. 像摄像师一样思考。专业动态图形通常依赖摄像机运动，在提示中加入摄像机推、平移、变焦和类似绑定的动作，Agent 可以通过群变换来模拟这些。
4. 描述你需要的控制项。默认情况下，输出通常只显示背景色控制。如果你想自定义其他属性，可以明确要求 Agent 为它们创建控制项。
5. 指定帧率和时长。如果你的动画需要特定的帧率或时长，请在提示中包含期望的帧率和总帧数。

## **在网页中如何引入使用？**

### 生成的

`lottie.json`

### 是标准格式，引入方式非常简单：

```
<!-- 推荐方式：Web Component -->
<dotlottie-wc 
  src="你的动画.json" 
  loop 
  autoplay 
  style="width: 400px; height: 400px;">
</dotlottie-wc>
```

### 也支持

`lottie-web`、`lottie-react`

### 等主流库，iOS 和 Android 也能直接用同一个文件。

## **谁最适合使用？**

- 前端 / 全栈开发者（尤其 React、Next.js、小程序、App）
- UI 设计师、产品经理（想快速验证动效）
- 独立开发者 / 小团队（不想花钱请动效师）
- 所有正在用 Claude / Cursor 写代码的程序员

## **为什么强烈推荐？**

1. **效率碾压**：原来要做一个复杂矢量动画可能需要几小时，现在几分钟搞定
2. **可编辑性强**：生成后还能继续调 Prompt 迭代，或者手动微调 JSON
3. **生产可用**：输出的是标准 Lottie，性能好、体积小
4. **完全开源免费**（MIT 协议）

### 项目地址：

**[https://github.com/diffusionstudio/lottie**](https://github.com/diffusionstudio/lottie**)

## **最后**

### 在 AI 工具越来越强的今天，

## Text-to-Lottie 把动效门槛又降低了一个数量级

。

与其花时间学 After Effects，不如先用 AI 把想法快速落地。

你最想用它生成什么类型的动画呢？欢迎在评论区分享

## 点赞 + 在看

### ，下次我继续分享更多前端 AI 神器！

---

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
