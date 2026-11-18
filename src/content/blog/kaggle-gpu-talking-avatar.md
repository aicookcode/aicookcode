---
title: "免费GPU跑开源模型，用一张照片生成数字人口播视频"
description: "用 Kaggle 免费 GPU 在云端运行 EchoMimicV3，把一张照片和一段配音生成数字人口播视频。附 Notebook、素材导入和显卡设置步骤。"
pubDate: 2026-11-13
category: "AI 应用"
tags: ["Kaggle","GPU","EchoMimicV3","AI数字人","数字人口播"]
cover: "/media/kaggle-gpu-talking-avatar/cover.jpg"
coverAlt: "Kaggle 免费 GPU，标题下方是一张带云朵轮廓的显卡"
---

像视频、图像生成这类高耗 Token 的模型，我一直想尝试运行开源模型，但受限于本地电脑配置，许多大模型更适合在 GPU 环境下运行。

互联网资源丰富，我还真找到了一个**免费提供 GPU** 资源的平台—— **Kaggle**。

前几篇文章介绍了数字人视频的制作，主要采用一些轻量方案，实现人物口型同步、眨眼等效果。这次，我尝试在 Kaggle 平台运行开源数字人模型。

接下来，就从 Kaggle 的注册和验证说起，看看如何利用它提供的免费 GPU，将本地准备好的照片和配音生成数字人视频。

## 先认识一下Kaggle

![Kaggle 官网首页](/media/kaggle-gpu-talking-avatar/homepage.png)

Kaggle 是 Google 旗下的数据科学与机器学习平台。对于普通用户来说，可以把它理解为一台能通过浏览器使用的云端电脑。

它提供有额度限制的免费 GPU 资源，即使本地电脑配置不高，也能借助云端显卡尝试运行一些对算力要求较高的 AI 模型。

## 注册验证

打开 Kaggle 官网注册账号，并按照页面提示完成基本信息填写和邮箱验证。

官网地址：https://www.kaggle.com/

由于使用 GPU 前需要通过**手机号验证身份**，所以进入账号的 Settings，找到Phone Verification，并完成手机号验证。

完成注册和验证后，可以在 **Settings** 中查看账号的可用存储空间和 GPU 使用额度。每周 30 小时的 GPU 额度，具体以账号页面显示为准。

需要注意，GPU 额度按累计运行时间计算。建议在需要时再开启 GPU，任务完成后及时停止会话，避免空闲等待消耗额度。

![Kaggle 账号设置中的 GPU 及存储额度](/media/kaggle-gpu-talking-avatar/gpu-quotas.png)

## Datasets、Models、Notebook

在 Kaggle 中，最常使用到 Notebook、Datasets 和 Models 三部分。

结合这次数字人制作，可以把它们理解为：**执行任务的工作台、保存素材的文件夹，以及存放模型的仓库。**

| 名称       | 可以理解为    | 本次用来做什么             |
| -------- | -------- | ------------------- |
| Notebook | 执行任务的工作台 | 安装环境、读取素材、运行模型、生成视频 |
| Datasets | 保存素材的文件夹 | 存放人物照片、配音和文案        |
| Models   | 存放模型的仓库  | 保存数字人模型及其配套文件       |

在 Kaggle 上执行任务，需要先创建一个 Notebook，再通过运行 Python 代码完成具体操作。

不过，Notebook 的运行环境不适合长期存放素材和模型，运行时产生的临时文件，下次打开时不一定还在。

因此，建议把需要反复使用的数据和素材保存到 **Datasets**，把模型及配套文件保存到 **Models**。需要使用时，在 Notebook 中通过 **Add Input** 添加相应资源，程序就能读取并使用。

![Notebook 的代码执行区与数据集、模型引用区](/media/kaggle-gpu-talking-avatar/notebook-inputs.png)

不懂 Python 也无需担心：**把需求告诉 AI，让它生成适用于 Kaggle 的 Notebook 文件（`.ipynb`）。然后在平台上新建一个 Notebook，导入文件，再按步骤运行即可。**

![在 Kaggle Notebook 的 File 菜单中选择 Import Notebook](/media/kaggle-gpu-talking-avatar/import-notebook.png)

## 怎么开始使用GPU？

在 Kaggle 中新建一个 Notebook，进入编辑页面后，就能看到代码区域和运行设置。

在代码区域添加需要执行的代码，或导入 AI 生成的 Notebook 文件，再通过顶部的 **Settings → Accelerator** 选择运行设备：不需要 GPU 时选择 **None**，需要时再切换到可用的 GPU。

![在 Settings 的 Accelerator 菜单中选择 GPU](/media/kaggle-gpu-talking-avatar/gpu-accelerator.png)

切换运行设备时，按页面提示重启会话；如需手动操作，可使用右上角的会话开关。

![Kaggle Notebook 顶部的会话状态与会话开关](/media/kaggle-gpu-talking-avatar/notebook-session.png)

## 数字人视频测试

为了先验证平台能不能承担视频生成，我没有把所有工具一次性搬到 Kaggle。

我先在本地电脑上准备好人物照片和配音，再交给云端完成最需要显卡的环节：**根据照片和音频，生成数字人口播视频。**

整个分工很清楚：

| 工作               | 放在哪里做      |
| ---------------- | ---------- |
| 整理文案、生成配音、准备人物图片 | 本地         |
| 安装运行环境、加载数字人模型   | Kaggle     |
| 根据照片和配音生成视频      | Kaggle GPU |
| 下载、检查、剪辑和最终导出    | 本地         |

这次数字人视频测试的是开源项目 **EchoMimicV3 的 Flash 路线**。

从环境安装、模型下载到数字人视频生成，我都让 AI 生成对应的 Notebook 文件，再导入 Kaggle，按步骤运行，操作起来非常方便。

如果使用的 Agent 支持直接操作浏览器，还可以把文件导入、环境配置和运行等步骤也交给它来完成，你只需要等着验收成果。

## 使用 GPU 最需要注意的点

1. **需要时再开 GPU**：整理素材、下载文件和准备依赖尽量在 CPU 阶段完成，开始生成视频时再开启 GPU。
2. **切换前先保存**：切换设备会重启环境，提前保存素材和配置，避免临时文件丢失。
3. **检查并保存结果后，停止会话**：确认视频画面、声音和本地播放正常，保存成片、日志及所需云端输出，再停止 GPU 会话；只关闭浏览器页面不等于停止任务。

## 写在最后

这次尝试，让我在本地配置有限的情况下，也跑通了开源数字人模型。借助 Kaggle 的免费 GPU 和 AI 的代码辅助，想试的模型又多了一个动手实践的机会。

你有没有想运行、却受限于电脑配置的开源模型？欢迎在评论区聊聊，也欢迎分享你经常使用的 AI 工具和网站。觉得这篇有帮助，记得点个赞、在看，转发给同样爱折腾的朋友。
