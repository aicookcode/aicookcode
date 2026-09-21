---
title: "小白也能用 WorkBuddy 做微信小程序：开发阶段"
description: "从需求讨论、代码开发到微信开发者工具里的模拟器运行，带你完成小程序上线前的前三步。"
pubDate: 2026-08-23T07:40:00+08:00
category: "AI 应用"
tags: ["WorkBuddy", "微信小程序", "AI 编程", "小程序"]
cover: "/media/workbuddy-mini-program-development/cover.jpg"
coverAlt: "WorkBuddy 微信小程序开发阶段文章封面"
---

以前，开发小程序是程序员的专属技能；现在有了 AI，普通人一样可以做出自己的小程序。

我用两篇文章，以腾讯生态中的 **WorkBuddy** 搭建小程序为例，手把手带你走完从 0 到 1 的完整流程，让完全不懂代码的你，也能做出一个可以线上使用的小程序。

<figure>
  <video controls playsinline preload="metadata" width="720" poster="/media/workbuddy-mini-program-series/video-poster.jpg" aria-label="WorkBuddy 微信小程序从开发到上线的流程演示">
    <source src="/media/workbuddy-mini-program-series/workbuddy-mini-program.mp4" type="video/mp4" />
    你的浏览器暂不支持视频播放，可以<a href="/media/workbuddy-mini-program-series/workbuddy-mini-program.mp4">下载视频</a>观看。
  </video>
  <figcaption>WorkBuddy 搭建微信小程序的流程演示 · 时长 00:32</figcaption>
</figure>

**整个流程可以分成六步：**

1. 先和 WorkBuddy 讨论需求，让它开发完成一个最小可用版本；
2. 在本地准备微信开发者工具，并根据需要注册小程序账号、获取 AppID；
3. 把项目导入微信开发者工具，在电脑模拟器中运行和修复问题；
4. 使用「预览」或「真机调试」在手机上验证实际效果；
5. 上传代码并设置为体验版，邀请项目成员或体验成员扫码测试；
6. 如果要面向公众发布，再按小程序主体和业务情况完成平台备案等要求，提交审核并发布。

**整个流程将拆成两篇文章介绍：**

- 本文聚焦前 3 个步骤，带你从需求讨论和代码开发开始，到将小程序导入微信开发者工具，并在电脑模拟器中成功运行。

- 下一篇将继续介绍后续流程：从真机测试、体验版配置，到提交审核并正式发布上线。

下一篇：[小白也能用 WorkBuddy 做微信小程序：上线阶段](/articles/workbuddy-mini-program-launch/)

## WorkBuddy 的两个用途

**代码开发**：直接开发小程序代码。

**平台操作助手**：在实际操作微信公众平台时，帮助你解决账号注册、主体认证、权限配置、版本上传和审核等环节遇到的问题。

这些平台操作仍然需要你本人完成，但如果遇到看不懂的提示、配置问题或审核报错，可以把页面截图、错误信息或当前操作步骤发给 WorkBuddy，让它分析原因，并给出具体的解决方案和下一步操作方法。

> 注意：文章和示意图中展示的工具名称、功能名称及入口位置，可能会随着版本更新而调整。如果实际界面与文中有所不同，请以当前版本的具体界面为准，找到对应功能即可。

## 一、让 WorkBuddy 先完成方案和开发

### 召唤微信小程序开发专家

在 WorkBuddy 左侧菜单点击「专家·技能·连接器」，打开后在搜索框中输入「微信小程序」。找到对应专家后，点击「召唤」即可。

![召唤微信小程序开发专家](/media/workbuddy-mini-program-development/image-01.png)

召唤成功后会打开一个新的会话。

![WorkBuddy 小程序专家会话](/media/workbuddy-mini-program-development/image-02.png)

### 创建工作空间

在本地合适的位置新建一个文件夹，把它作为 WorkBuddy 可访问的**工作空间**，用来存放后续生成的代码。

创建完成后，在 WorkBuddy 中将这个文件夹配置为工作空间。请记下这个文件夹的完整路径。稍后在微信开发者工具中创建项目时，还要把它填写为项目目录。

![在 WorkBuddy 中配置工作空间](/media/workbuddy-mini-program-development/image-03.png)

### 先讨论方案，再开始写代码

不要一上来只说「帮我做一个小程序」。先让 WorkBuddy 和你一起把**目标、用户和第一版范围**讨论清楚。例如：

```text
我想做一个记账小程序。先不要写代码，请先和我讨论方案，并告诉我需要补充哪些信息。
```

这个描述可以替换成任何你想做的主题。

WorkBuddy 通常会继续追问：小程序面向哪些用户、第一版要解决什么问题、数据存储在哪里、账号属于个人还是企业等。这些问题中，有些可能是你之前没有想到的。先把它们回答清楚，再开始开发，可以避免做到一半才发现数据方案或功能范围不合适。

### 数据存储在哪里

小程序项目本身不会自动替你保存业务数据。以记账小程序为例，用户记录的每一笔账单，都需要存储在一个固定的位置。这个位置通常称为「数据库」，可以把它理解为专门保存和管理数据的仓库，用来记录账单，并支持后续的查询、修改和删除。

![小程序数据存储示意](/media/workbuddy-mini-program-development/image-04.png)

小程序开发中常见方案主要有以下两种。

**方案一：微信云开发（新手推荐）**

微信云开发集成了数据库、云存储和云函数等能力，对新手来说，通常比自己搭建后端更容易上手。

在本文的示例中，记账小程序在与 WorkBuddy 讨论方案时，选择「微信云开发」作为数据存储方案。确定方案后，WorkBuddy 会完成相关代码的开发。

微信云开发提供一定额度的免费云开发环境。在规定额度内，开发者可以免费使用相关云服务，对于一个简单的小程序足够用。小程序正式上线后，免费环境的到期时间会调整为上线后的第 15 天；如果需要长期使用，就要按照平台提示续费或转为付费环境。

官方计费说明：[微信云开发计费说明](https://developers.weixin.qq.com/miniprogram/dev/wxcloudservice/wxcloud/billing/price.html)

**方案二：自有服务器和数据库**

这种方案的可控性更强，但需要自己开发后端接口、设计数据库、配置 HTTPS 和服务器域名，并负责部署、监控和维护。对第一次做小程序的人来说，成本通常更高。

### 先开发一个最小可用版本

方案确认后，就可以让 WorkBuddy 开始开发。

第一版建议**只跑通一个核心闭环**。一次加入太多功能，会让报错彼此叠加，排错和修改都会变得困难。

先让一条最重要的流程跑起来，再逐步扩展，通常比一开始追求「功能完整」更容易成功。

## 二、准备开发者工具和小程序账号

在 WorkBuddy 生成代码的同时，准备好微信开发者工具和小程序账号。

### 安装微信开发者工具

打开微信官方的「微信开发者工具」下载页，选择适合当前系统的稳定版安装，并扫码登录。这个工具用于导入项目、构建代码、查看模拟器效果、调试报错，以及上传小程序代码。

下载地址：[微信开发者工具下载页](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

![微信开发者工具下载页](/media/workbuddy-mini-program-development/image-05.png)

### 注册小程序并获取 AppID

如果当前只想看电脑模拟器效果，可以先使用开发者工具提供的**测试配置**，跳过注册这一步。但真实的云开发环境、代码上传、体验版和正式发布，都要以真实小程序账号为基础。

打开微信公众平台，选择注册「小程序」，按照平台提示填写相关信息。

![注册小程序](/media/workbuddy-mini-program-development/image-06.png)

![选择小程序类型](/media/workbuddy-mini-program-development/image-07.png)

注册完成后，在小程序管理后台找到对应的 AppID。不同版本的后台入口可能略有变化，通常可以在「开发」或「开发设置」中找到。

![查看 AppID](/media/workbuddy-mini-program-development/image-08.png)

把 AppID 发给 WorkBuddy，让它写入项目配置。

```text
请将项目中的 AppID 配置为下面这个值：

<你的 AppID>
```

## 三、在电脑模拟器中运行项目

打开微信开发者工具，继续完成项目导入和构建。

### 创建项目并运行

打开微信开发者工具，扫码登录后点击「+」新建项目。

![微信开发者工具新建项目](/media/workbuddy-mini-program-development/image-09.png)

创建项目时，主要填写以下内容：

1. **项目名称**：填写一个便于区分的名称即可；
2. **项目目录**：填写前面记录的 WorkBuddy 工作空间路径；
3. **AppID**：有真实 AppID 时填写真实值；只做本地演示时，可以点击「测试号」随机生成一个测试 APPID；
4. **后端服务**：需要使用微信云开发时，选择「微信云开发」；不使用云开发时，选择「不使用云服务」。（注意：微信云开发必须使用真实的 APPID。）

以上内容填写完成后创建项目，再点击「信任并运行」。工具会自动构建，完成后可以在界面中看到模拟器、工程文件和调试工具。

![项目配置页面](/media/workbuddy-mini-program-development/image-10.png)

![项目运行界面](/media/workbuddy-mini-program-development/image-11.png)

### 根据错误信息逐项修复

第一次打开项目时看到红色报错很常见，不用担心。先打开「调试器（DEVTOOLS）」中的 **Console**，查看报错。

![微信开发者工具报错](/media/workbuddy-mini-program-development/image-12.png)

把完整的错误信息、触发步骤和相关页面一起发给 WorkBuddy，让它判断原因并修改代码。每次修改后重新编译，并重新走一遍触发问题的操作，确认问题确实消失。

如果修改后界面没有变化，可以先清理开发者工具缓存，再重新编译。

![清理缓存后重新编译](/media/workbuddy-mini-program-development/image-13.png)

### 配置微信云开发环境

只有在项目选择了微信云开发，并且代码确实需要数据库、云存储或云函数时，才需要进行这一步；不使用云开发可以直接跳过。

**Step 1 · 创建云环境**

在微信开发者工具中点击「云开发」，按提示创建或选择云环境。

![打开云开发](/media/workbuddy-mini-program-development/image-14.png)

**Step 2 · 复制环境 ID**

创建完成后，复制环境 ID。

![复制云开发环境 ID](/media/workbuddy-mini-program-development/image-15.png)

**Step 3 · 修改项目中环境 ID 配置**

把环境 ID 发给 WorkBuddy，让它写入项目配置。

```text
请将项目中的微信云开发环境 ID 配置为下面这个值：

<你的云开发环境 ID>
```

**Step 4 · 创建云资源**

根据 WorkBuddy 的提示创建对应资源，并检查访问权限。

![创建云开发资源](/media/workbuddy-mini-program-development/image-16.png)

以当前记账小程序为例，需要在数据库中创建三个集合。

![配置云开发资源](/media/workbuddy-mini-program-development/image-17.png)

![配置云开发环境](/media/workbuddy-mini-program-development/image-18.png)

创建资源并完成配置后，重新编译项目。

![重新编译项目](/media/workbuddy-mini-program-development/image-19.png)

### 阶段性成果

如果没有新的报错，小程序就可以在微信开发者工具的模拟器中正常运行了。

## 写在最后

到这里，我们已经完成了小程序开发的前三个步骤，在电脑模拟器中运行起来了我们开发的小程序，看到了实际的效果。

[下一篇文章](/articles/workbuddy-mini-program-launch/)，我们将继续往下走：把小程序放到手机上进行真机测试，上传代码并设置体验版，最后完成审核和发布上线。

你最想用 WorkBuddy 做一个什么样的小程序？是记账、打卡，还是一个专属于自己的效率工具？

---
