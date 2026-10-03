---
title: "82.1K+ Stars 的 AI 视频工具，输入主题，自动剪出一条视频"
description: "最近刷到一个免费开源神器：`MoneyPrinterTurbo` —— AI 短视频生成工具。"
pubDate: 2026-06-09T13:30:00+08:00
category: "GitHub 实践"
tags: ["MoneyPrinterTurbo", "AI 视频", "开源项目"]
cover: "/media/moneyprinterturbo/cover.jpg"
coverAlt: "82.1K+ Stars 的 AI 视频工具，输入主题，自动剪出一条视频"
---

最近刷到一个免费开源神器：`MoneyPrinterTurbo` —— AI 短视频生成工具。

只需提供一个视频主题或关键词 ，就可以全自动生成视频文案、视频素材、视频字幕、视频背景音乐，然后合成一个高清的短视频。

这个 GitHub 项目最近热度非常高，目前已经有 82.1K+ Stars。

GitHub：`https://github.com/harry0703/MoneyPrinterTurbo`

![](/media/moneyprinterturbo/img_01.jpg)

## 效果展示

### Web 界面

这个项目提供了可视化 Web 界面，把主题输入、文案生成、素材来源、配音、字幕和背景音乐等配置集中到一个页面，简单操作即可完成一条短视频的生成。

![](/media/moneyprinterturbo/img_02.jpg)

### 视频演示

以下是项目的视频演示成片效果。

#### 主题：生命的意义是什么？（竖屏）

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
- 视频素材来源高清，而且无版权，也可以使用自己的本地素材
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
[https://github.com/harry0703/MoneyPrinterTurbo.git](https://github.com/harry0703/MoneyPrinterTurbo.git)
```

运行成功后，一般会返回 Web 地址，在浏览器中打开即可：

```
[http://127.0.0.1:8501](http://127.0.0.1:8501)
```

### 方法三：Docker 部署

如果希望环境更干净，可以直接用 Docker：

```
git clone [https://github.com/harry0703/MoneyPrinterTurbo.git](https://github.com/harry0703/MoneyPrinterTurbo.git)
cd MoneyPrinterTurbo
docker compose up
```

Web 界面：

```
[http://127.0.0.1:8501](http://127.0.0.1:8501)
```

API 文档：

```
[http://127.0.0.1:8080/docs](http://127.0.0.1:8080/docs)
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

## 写在最后

作者也提到，当前项目对于一些小白用户来说，还是有一定的门槛。录咖（AI智能多媒体服务平台）网站基于该项目，提供的免费AI视频生成器服务，可以不用部署，直接在线使用，非常方便。

- 中文版：[https://reccloud.cn](https://reccloud.cn)
- 英文版：[https://reccloud.com](https://reccloud.com)

![](/media/moneyprinterturbo/img_06.jpg)

我自己试着跑了一遍，整体体验还挺有意思。感兴趣的小伙伴可以去试试，也欢迎在评论区分享你生成的视频效果和使用体验。

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
