---
title: "AI斗兽场：Claude vs GPT 真实肉搏！一个 GitHub项目让AI在Bomberman里生死对战"
description: "当两个顶级大模型不再是“聊天机器人”，而是真刀真枪地在游戏里互相炸对方……"
pubDate: 2026-04-15T15:41:12+08:00
category: "GitHub 实践"
tags: ["TokenBrawl", "AI 对战", "Bomberman", "开源项目"]
cover: "/media/tokenbrawl-ai-arena/cover.jpg"
coverAlt: "AI斗兽场：Claude vs GPT 真实肉搏！一个 GitHub项目让AI在"
---

当两个顶级大模型不再是“聊天机器人”，而是真刀真枪地在游戏里互相炸对方……

最近一条 X（Twitter）上的视频火了，左边紫色 1 号是 GPT-5.4-mini，右边橙色 2 号是 Claude Haiku 4.5。它们在经典 Bomberman 地图上拆砖、埋雷、躲爆炸，实时思考、实时决策，互相比拼策略与反应。最终比分：Claude 12 : 5 GPT，Claude 笑到最后💣。

这个精彩演示，来自一个叫 TokenBrawl 的开源项目。项目地址：

[https://github.com/klemenvod/TokenBrawl](https://github.com/klemenvod/TokenBrawl)

这是一个 1v1 LLM 自动对战 Bomberman 游戏，可以选择任意模型进行比拼（包括 Claude、GPT、Grok、Gemini、DeepSeek、Qwen等国内外各种模型），实时展示每个模型的思考过程，支持速度 vs 智能的真实权衡测试，把 AI 评测从“静态考试”变成了动态竞技场。正如视频发布者所说：

> “Intelligence isn’t just about picking the right answer on a benchmark. It’s about trade-offs under pressure.”

在真实对抗环境下，我们能更清楚看到不同模型的战略深度、风险决策和空间推理能力。

如何自己玩起来？（零基础也能跑）

1. 克隆项目到本地，并执行命令

```
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. 设置 OpenRouter API key在 [https://openrouter.ai/keys](https://openrouter.ai/keys) 中创建一个API key（OpenRouter 提供免费测试模型）

在根目录下创建 .env 文件，然后将API key写入文件中

```
OPENROUTER_API_KEY=your_key_here
```

3. 配置测试模型在 backend/main.py 文件中配置模型，随意填写你想对战的两个模型。

```
p1_model = "openai/gpt-5.4-mini"
p2_model = "anthropic/claude-opus-4.6-fast"
```

[https://openrouter.ai/models?pricing=free](https://openrouter.ai/models?pricing=free)`可以查看free的模型`

![](/media/tokenbrawl-ai-arena/img_01.png)

4. 启动项目

```
python3 -m uvicorn backend.main:app --port 8000
```

打开浏览器，访问 [http://localhost:8000](http://localhost:8000) 就能看到两个 AI 在屏幕上打得热火朝天。

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
