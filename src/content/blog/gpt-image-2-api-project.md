---
title: "13K+ Star 的 GPT Image 2 项目：不只整理提示词，还能跑通 API 调用"
description: "GPT-Image-2 的 Prompt 工程和 API 实践"
pubDate: 2026-05-08T18:39:16+08:00
category: "AI 应用"
tags: ["GPT Image", "API", "开源项目"]
cover: "/media/gpt-image-2-api-project/cover.jpg"
coverAlt: "13K+ Star 的 GPT Image 2 项目：不只整理提示词，还能跑通 "
---

[上一篇文章里](/articles/gpt-image-2-4430-cases/)，我们介绍了 YouMind OpenLab 维护的 `awesome-gpt-image-2` 提示词仓库 —— 涵盖 **4430+ 风格化 Prompt 案例**，覆盖写实、动漫、3D、水墨中国风等主流风格，助你零基础写出高质量图像提示词。

本期聚焦其进阶兄弟项目：

EvoLinkAI/awesome-gpt-image-2-API-and-Prompts

![](/media/gpt-image-2-api-project/img_01.jpg)

这个项目主要围绕 GPT-Image-2 的 Prompt 工程和 API 实践展开，不仅整理了高质量提示词模板，还提供了调用参数配置和多场景示例，覆盖图像生成、图片编辑、风格迁移、批量生成等常见用法。

github 地址：

[https://github.com/EvoLinkAI/awesome-gpt-image-2-API-and-Prompts](https://github.com/EvoLinkAI/awesome-gpt-image-2-API-and-Prompts)

这篇文章按以下两部分介绍：

- Prompts 介绍：介绍仓库里的提示词内容
- API 使用：介绍使用方法

## Prompts 介绍

项目里收录了 359+ 高质量 GPT-Image-2 提示词，覆盖海报、人像、UI mockup、角色设定和营销视觉等场景。每个案例都有输出图和对应 prompt，具体使用方式和其他提示词仓库类似，可以参考[我的上一篇文章](/articles/gpt-image-2-4430-cases/)。

![](/media/gpt-image-2-api-project/img_02.png)

![](/media/gpt-image-2-api-project/img_03.png)

画廊地址：[https://evolink.ai/zh/gpt-image-2-prompts](https://evolink.ai/zh/gpt-image-2-prompts)

## API 使用

EvoLink.AI 提供了两种 API 请求方式：直接调用 API 接口，或安装 Skill。

### 准备工作

1. **注册账号**

   需要先注册 EvoLink.AI 账号，登录控制台。

2. **生成 API Key**

   在「API Keys」页面，点击「Create New Key」按钮，按需配置后生成 API Key。

![](/media/gpt-image-2-api-project/img_04.png)

3. **注意事项**

   使用 API 生成图片会消耗 Credits 额度。所以正式使用前，建议先用低分辨率、低质量参数跑几次，确认效果和消耗都符合预期，再根据自己的需求提高分辨率或批量生成。

   > EvoLink 新用户注册后会赠送 10 Credits 试用额度，可以先用来测试接口。
   >
   > 我自己测试了一次：生成一张 `3:4` 比例、`1K` 分辨率、`quality=low` 的猫咪图片，大约消耗了 `0.27 Credits`。

4. **官方 API 平台**

   官方文档提供了在线接口测试入口，可直接在页面中进行测试。

   [https://docs.evolink.ai/en/api-manual/image-series/nanobanana/nanobanana-2-image-generate](https://docs.evolink.ai/en/api-manual/image-series/nanobanana/nanobanana-2-image-generate)

![](/media/gpt-image-2-api-project/img_05.png)

### 方式一：API 接口调用

EvoLink 的 `gpt-image-2` 接口采用异步任务模式，流程如下：

![](/media/gpt-image-2-api-project/img_06.png)

#### 1. 提交图像生成任务

请求：

- 需要将请求中的 `YOUR_API_KEY` 替换为你实际获取的 API Key。
- `data` 中设置图片具体参数。

```bash
curl --request POST \
  --url https://api.evolink.ai/v1/images/generations \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '
{
  "model": "gpt-image-2",
  "size": "3:4",
  "quality": "low",
  "resolution": "1K",
  "prompt": "小猫咪图片"
}
```

| 参数 | 是否必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `model` | 是 | `string` | `gpt-image-2` | 图片生成模型名 |
| `prompt` | 是 | `string` | 无 | 图片生成或图片编辑提示词，最多 `32000` 字符。 |
| `image_urls` | 否 | `string[]` | 无 | 参考图 URL 列表，用于生图或图片编辑。支持 `1~16` 张图，单张不超过 `50MB`，格式支持 `.jpeg`、`.jpg`、`.png`、`.webp`。图片 URL 需要能被服务器直接访问。 |
| `size` | 否 | `string` | `auto` | 图片尺寸。支持比例格式，如 `1:1`、`3:4`、`9:16`、`16:9`；也支持显式像素格式，如 `1024x1024`、`1536x1024`。 |
| `resolution` | 否 | `string` | `1K` | 分辨率档位，仅在 `size` 使用比例格式时生效。可选 `1K`、`2K`、`4K`。如果 `size` 写的是具体像素，这个参数会被忽略。 |
| `quality` | 否 | `string` | `medium` | 生成质量，可选 `low`、`medium`、`high`。 |
| `n` | 否 | `integer` | `1` | 生成图片数量，范围 `1~10`，每张图会独立计费。 |
| `callback_url` | 否 | `string` | 无 | 任务完成、失败或取消后回调的 HTTPS 地址。只支持 HTTPS，不支持内网地址，最多重试 3 次。 |

返回结果：

获取 `task_id`，即返回结果中的 `id` 字段，格式为 `task-unified-1111111111-aaaaybbb`。

```json
{
  "created": 1778207111,
  "id": "task-unified-1111111111-aaaaybbb",
  "model": "gpt-image-2",
  "object": "image.generation.task",
  "progress": 1,
  "status": "processing",
  "task_info": {
    "can_cancel": true,
    "estimated_time": 300
  },
  "type": "image",
  "usage": {
    "billing_rule": "per_1k_tokens",
    "credits_reserved": 0.2712,
    "user_group": "default"
  }
}
```

#### 2. 查询任务状态

请求：

用第 1 步中获取的 `task_id` 轮询查询任务状态，直至返回 `success` 或 `failed`。

```bash
curl --request GET \
  --url "https://api.evolink.ai/v1/tasks/{task_id}" \
  --header "Authorization: Bearer YOUR_API_KEY"
```

返回结果：

`success` 后获取图片下载地址。

```json
{
  "created": 1778221118,
  "duration": 170,
  "id": "task-unified-1111111111-aaaaybbb",
  "model": "gpt-image-2",
  "object": "image.generation.task",
  "progress": 100,
  "result_data": [
    {
      "url": "https://files.evolink.ai/0014OHD0GODJDP6ZNC/images/2026/05/08/feb1d2b05f6746a49f59bbec912e01d5.png"
    },
    {
      "url": "https://files.evolink.ai/0014OHD0GODJDP6ZNC/images/2026/05/08/dd31bea103594690a3c6bafe1fd4a518.png"
    }
  ],
  "results": [
    "https://files.evolink.ai/0014OHD0GODJDP6ZNC/images/2026/05/08/feb1d2b05f6746a49f59bbec912e01d5.png",
    "https://files.evolink.ai/0014OHD0GODJDP6ZNC/images/2026/05/08/dd31bea103594690a3c6bafe1fd4a518.png"
  ],
  "status": "completed",
  "task_info": {
    "can_cancel": false
  },
  "type": "image",
  "usage": {
    "credits_used": 0.5442,
    "image_cached_input_tokens": 0,
    "image_input_tokens": 0,
    "image_output_tokens": 293,
    "text_cached_input_tokens": 0,
    "text_input_tokens": 20,
    "total_tokens": 313
  }
}
```

#### 3. 下载图片

图片结果链接有效期为 24 小时，生成后建议尽快下载到本地或自己的服务器中保存。

### 方式二：Skill 使用

#### 1. 安装

```bash
npx evolink-gpt-image -y
```

#### 2. 配置 API Key

需要在本地设置环境变量，直接通过 Agent 进行配置即可。

```text
export EVOLINK_API_KEY=你的_api_key 帮我配置环境变量
```

![](/media/gpt-image-2-api-project/img_07.png)

#### 3. 使用

自然语言描述即可生成图片。

![](/media/gpt-image-2-api-project/img_08.png)

![](/media/gpt-image-2-api-project/img_09.png)

## 写在最后

最后简单说一下 EvoLink.AI。

EvoLink.AI 可以理解成一个统一的 AI 模型 API 接入平台。它把不同模型和能力接到同一个平台里，用户通过统一的 API Key 和接口地址，就可以调用对应的模型服务。

如果你想通过 API 来生成图片，除了直接请求官方 API，EvoLink.AI 也是一个可以尝试的选择。

大家平时还有哪些好用的图片生成 API 平台？