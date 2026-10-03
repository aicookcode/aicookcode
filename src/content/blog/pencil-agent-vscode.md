---
title: "我在 VS Code 里“聊天”10 分钟，AI 直接给我画完了页面：Pencil + Agent 太离谱了"
description: "最近总刷到 AI Pencil，我也一直好奇它到底能干嘛。真上手后只有一句话: 上头了。在 VS Code 里，它就像你的“设计搭子”，你说一句需求，它就把产品脑洞往可视化界面上落。"
pubDate: 2026-03-27T08:45:00+08:00
category: "AI 应用"
tags: ["Pencil", "VS Code", "AI 编程"]
cover: "/media/pencil-agent-vscode/cover.jpg"
coverAlt: "我在 VS Code 里“聊天”10 分钟，AI 直接给我画完了页面：Penci"
---

最近总刷到 AI Pencil，我也一直好奇它到底能干嘛。真上手后只有一句话: 上头了。在 VS Code 里，它就像你的“设计搭子”，你说一句需求，它就把产品脑洞往可视化界面上落。

不废话，直接上干货。下面这套详细步骤，带你 10 分钟从“我有个想法”直达“页面已经出来了”。coffee 还没凉，首版先跑起来。

---

VS Code 安装 Pencil 具体步骤

## 1.****在VS**

Code左侧栏找到插件入口**

![](/media/pencil-agent-vscode/img_01.png)

## 2. 搜索扩展
进入插件 Extensions，搜索 Pencil。

![](/media/pencil-agent-vscode/img_02.png)

## 3. 安装扩展
点击 install 安装，看到 Disable / Uninstall 说明安装成功。并且左侧侧边栏会出现笔的图标。如果没有生效，退出重启VS Code。

![](/media/pencil-agent-vscode/img_03.png)

![](/media/pencil-agent-vscode/img_04.png)

## 4. 首次打开 Pencil，进行注册登录
点击侧边栏笔图标，打开 Pencil，第一次进入时会出现登录注册页。

直接输入邮箱即可，国内邮箱也OK。点击Send Code按钮，然后到邮箱中查看验证码

![](/media/pencil-agent-vscode/img_05.png)

输入验证码，点击Verify

![](/media/pencil-agent-vscode/img_06.png)

按提示填写显示名、用户名、邮箱、密码，完成账户初始化。

![](/media/pencil-agent-vscode/img_07.png)

## 5. 确认 MCP 集成
在欢迎页可看到 MCP Integrations in Terminal，确认 CLI 集成状态。根据情况选择，或者后续使用 agent 连接也OK

![](/media/pencil-agent-vscode/img_08.png)

**6. 在 agent 聊天区让 Codex 确认对接 Pencil MCP**我用的 Codex ，所以以 Codex 为例，大家使用的 agent 都满足。直接输入类似：我现在需要在 vscode 中使用 pencil 进行设计，帮我对接 pencil mcp

![](/media/pencil-agent-vscode/img_09.png)

## 7. agent 确认对接完成
agent 在确认连接好以后，会给出反馈。看到类似“已对接好并可执行”的反馈即可。

![](/media/pencil-agent-vscode/img_10.png)

---

做到这里，安装就算正式通关了。
如果你已经开始手痒想点点点、改改改，恭喜你，症状完全正常。
别停，咱们趁热开跑，下一步直接把页面做出来。

VS Code 使用 Pencil 具体步骤

## 1. 输入你的想法

**在 agent 聊天框中输入你的想法，比如“帮我设计一个目前门户比较流行的登录页”，这时候 agent 就开始工作啦。工作过程中会有一些确认弹窗，点击 Approve 继续。**

![](/media/pencil-agent-vscode/img_11.png)

## 2. 输出界面

agent 会通过 MCP 调用 Pencil 工具，创建或编辑 .pen 文件，并把生成结果实时渲染到 VS Code 画布中。

下图就是我把想法丢进去后生成的界面。效果居然真不错，已经到了“我这个只会写代码的人也敢点评配色了”的程度。对设计小白来说，确实有点神奇，也有点上头。

![](/media/pencil-agent-vscode/img_12.png)

## 3. 继续迭代修改

不过还是有些小瑕疵，所以继续和 agent 沟通优化修改。如：“企业微信”和“飞书”文字需要居中。

![](/media/pencil-agent-vscode/img_13.png)

## 4. 查看最终效果
经过几轮你来我往的修改，可以当测试最终稿了。

![](/media/pencil-agent-vscode/img_14.png)

好啦，AI Pencil 已解锁成功。
接下来请尽情把脑洞倒进去，让灵感排队变成页面吧

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
