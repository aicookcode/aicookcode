---
visible: true
title: "MoneyPrinterTurbo 教程：安装、模型配置与短视频生成"
description: "从 Docker 启动到文案、素材、配音和字幕，梳理 MoneyPrinterTurbo 的配置顺序、常见失败环节与首条视频验收方法。"
pubDate: 2026-06-09T13:30:00+08:00
updatedDate: 2026-10-27
category: "GitHub 实践"
tags: ["MoneyPrinterTurbo", "AI 视频", "开源项目"]
cover: "/media/moneyprinterturbo/cover.jpg"
coverAlt: "82.1K+ Stars 的 AI 视频工具，输入主题，自动剪出一条视频"
---

`MoneyPrinterTurbo` 把文案、素材、配音、字幕和合成组织成一条短视频制作流程。本文重点说明启动后需要配置什么，以及如何检查第一条视频。

只需提供一个视频主题或关键词 ，就可以全自动生成视频文案、视频素材、视频字幕、视频背景音乐，然后合成一个高清的短视频。

软件开源不等于整条流程没有成本：模型服务、素材供应商和所选配音服务需要分别核对。

GitHub：`https://github.com/harry0703/MoneyPrinterTurbo`

![](/media/moneyprinterturbo/img_01.jpg)

## 效果展示

### Web 界面

这个项目提供了可视化 Web 界面，把主题输入、文案生成、素材来源、配音、字幕和背景音乐等配置集中到一个页面，简单操作即可完成一条短视频的生成。

![](/media/moneyprinterturbo/img_02.jpg)

### 视频演示

以下是项目的视频演示成片效果。

#### 主题：生命的意义是什么？（竖屏）

<figure>
  <video controls playsinline preload="metadata" width="578" height="1280" poster="/media/moneyprinterturbo/video-poster.jpg" aria-label="MoneyPrinterTurbo 生命的意义竖屏视频演示">
    <source src="/media/moneyprinterturbo/moneyprinterturbo-demo.mp4" type="video/mp4" />
    你的浏览器暂不支持视频播放，可以<a href="/media/moneyprinterturbo/moneyprinterturbo-demo.mp4">下载视频</a>观看。
  </video>
  <figcaption>MoneyPrinterTurbo 生成效果：生命的意义是什么？</figcaption>
</figure>

## 功能特性

- 完整的 MVC 架构，代码结构清晰，易于维护，支持 API 和 Web 界面
- 支持视频文案 AI 自动生成，也可以自定义文案
- 支持多种高清视频尺寸
- 支持批量视频生成，可以一次生成多个视频，然后选择一个最满意的
- 支持视频片段时长设置，方便调节素材切换频率
- 支持中文和英文视频文案
- 支持多种语音合成，可实时试听效果
- 支持字幕生成，可以调整字体、位置、颜色、大小，同时支持字幕描边设置
- 支持背景音乐，随机或者指定音乐文件，可设置背景音乐音量
- 支持在线素材来源及自己的本地素材；每个素材的使用范围仍应核对来源许可
- 支持 OpenAI、AIHubMix、Moonshot、Azure、gpt4free、one-api、通义千问、Google Gemini、Ollama、DeepSeek、MiniMax、 文心一言, Pollinations、ModelScope 等多种模型接入

## 安装方法

项目提供了三种常见使用方式：Windows 一键启动包、Agent 本地部署、Docker 部署。

### 方法一：Windows 一键启动包

Windows 用户可以优先试一键启动包，解压后直接使用（路径不要有 中文、特殊字符、空格）。当前提供的安装包是旧打包版本，下载后建议先运行 `update.bat` 更新代码，再运行 `start.bat` 启动。

- 百度网盘（v1.2.6）: [https://pan.baidu.com/s/1wg0UaIyXpO3SqIpaq790SQ?pwd=sbqx](https://pan.baidu.com/s/1wg0UaIyXpO3SqIpaq790SQ?pwd=sbqx) 提取码: sbqx
- Google Drive (v1.2.6): [https://drive.google.com/file/d/1HsbzfT7XunkrCrHw5ncUjFX8XX4zAuUh/view?usp=sharing](https://drive.google.com/file/d/1HsbzfT7XunkrCrHw5ncUjFX8XX4zAuUh/view?usp=sharing)

启动后，会自动打开浏览器（如果打开是空白，建议换成 Chrome 或者 Edge 打开）

### 方法二：Agent 本地部署

把下面这句话发给 Agent 即可：

```
下载项目，然后安装相关依赖并运行启动Web界面
https://github.com/harry0703/MoneyPrinterTurbo.git
```

运行成功后，一般会返回 Web 地址，在浏览器中打开即可：

```
http://127.0.0.1:8501
```

### 方法三：Docker 部署

官方当前提供预构建镜像方式。先复制示例配置，再启动容器；如果你下载的旧版本没有该 Compose 文件，请对照对应版本的 README：

```
git clone https://github.com/harry0703/MoneyPrinterTurbo.git
cd MoneyPrinterTurbo
# Bash；Windows PowerShell 使用 Copy-Item config.example.toml config.toml
cp config.example.toml config.toml
docker compose -f docker-compose.release.yml up
```

Web 界面：

```
http://127.0.0.1:8501
```

API 文档：

```
http://127.0.0.1:8080/docs
```

## 配置方法

页面启动后，先进入“基础设置”模块，配置大模型和素材来源相关信息。

### 大模型配置

目前支持多种大模型服务，也兼容第三方供应商平台，可以按自己的账号和模型习惯选择配置。

![](/media/moneyprinterturbo/img_03.png)

### 素材来源配置

目前视频源支持 Pexels 和 Pixabay。更推荐先用 Pexels：[https://www.pexels.com/zh-cn/discover/](https://www.pexels.com/zh-cn/discover/) ，它有中文版页面，也可以免费创建 API Key。

![](/media/moneyprinterturbo/img_04.jpg)

获取 API Key 以后，配置“视频源设置”

![](/media/moneyprinterturbo/img_05.png)

## 使用方法

作者在抖音提供了完整的使用演示视频，想先看实际操作流程的话，可以直接参考：[https://v.douyin.com/iFhnwsKY/](https://v.douyin.com/iFhnwsKY/)

## 首条视频：先做短样片，再扩大长度

选择一个自己能核对事实的主题，先用两三句文案生成短样片。先完成一条，不要第一次就批量生成。

1. **先确认文案。** 删除模型编造的数字、人名和引用；需要资料的内容先查证。
2. **再确认画面。** 逐镜检查是否与文案有关，检查横竖屏裁切，而不是只看素材有没有下载成功。
3. **单独试听。** 核对专有名词、数字读法和停顿，降低背景音乐到能听清人声的程度。
4. **最后看导出文件。** 从头播放，检查字幕是否遮挡、结尾是否截断，再决定是否扩大长度或批量运行。

文案生成失败时先查模型连接；素材为空先查来源配置与检索词；有音频却没有成片时检查合成日志和 FFmpeg。保留报错与该步骤输入，避免把每种问题都归因于模型。

带货视频可对照 [ClipForge 的商品图与脚本流程](/articles/clipforge-ai-short-video/)；需要自己的声音时，可先按 [本地克隆配音实践](/articles/local-voice-cloning/) 做短音频，再判断是否接入视频流程。

安装方式与配置字段参考 [MoneyPrinterTurbo 官方 README](https://github.com/harry0703/MoneyPrinterTurbo)。

## 写在最后

作者也提到，当前项目对于一些小白用户来说，还是有一定的门槛。录咖（AI智能多媒体服务平台）网站基于该项目，提供的免费AI视频生成器服务，可以不用部署，直接在线使用，非常方便。

- 中文版：[https://reccloud.cn](https://reccloud.cn)
- 英文版：[https://reccloud.com](https://reccloud.com)

![](/media/moneyprinterturbo/img_06.jpg)

我自己试着跑了一遍，整体体验还挺有意思。感兴趣的小伙伴可以去试试。
