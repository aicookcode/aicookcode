---
title: "Claude-Mem：给 Claude Code 装上“持久记忆”，再也不用重复讲上轮结论了"
description: "新开会话要补背景，排查中途还得翻旧记录，上轮已确认的结论下轮又要重讲，时间全耗在重复对齐上，推进效率很难上来。有没有办法解决啊 ？🙆**有**！**Claude-Mem** 就是为解决这个问题诞生的。它由`thedotmack`发布在 GitHub 上，截至 2026-04-19，仓库已获得 **6"
pubDate: 2026-04-20T07:15:00+08:00
category: "GitHub 实践"
tags: ["Claude-Mem", "Claude Code", "记忆系统", "开源项目"]
cover: "/media/claude-mem/cover.jpg"
coverAlt: "Claude-Mem：给 Claude Code 装上“持久记忆”，再也不用重复"
---

新开会话要补背景，排查中途还得翻旧记录，上轮已确认的结论下轮又要重讲，时间全耗在重复对齐上，推进效率很难上来。有没有办法解决啊 ？🙆**有**！**Claude-Mem** 就是为解决这个问题诞生的。它由`thedotmack`发布在 GitHub 上，截至 2026-04-19，仓库已获得 **63k Star**，而且在持续升高。

**项目能自动捕获 Claude 在会话中的操作，AI压缩后形成可持续的跨会话记忆，并在后续会话自动注入相关上下文，让开发过程自然衔接。**

- git地址：`https://github.com/thedotmack/claude-mem`

- 官网地址：`https://claude-mem.ai/`

---

## 安装方法

单行命令安装：

```
npx claude-mem install
```

或在 Claude Code 插件市场安装：

```
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

安装完成后，需要重启 Claude Code 。进入新会话即可观察自动注入的历史上下文。

可以使用自然语言提问：

- “上次修了哪些 bug？”
- “认证模块之前是怎么做的？”
- “这个文件最近改过什么？”
- “昨天排查这个问题时结论是什么？”

---

## 工作原理

根据官方文档，Claude-Mem 安装后默认自动运行，核心循环是：

![](/media/claude-mem/img_01.png)

### 核心组件：

- 生命周期钩子：SessionStart、UserPromptSubmit、PostToolUse、Stop、SessionEnd
- 智能安装：带缓存的依赖检查器
- Worker 服务：默认运行在 37777 端口的 HTTP API，包含 Web Viewer UI 和搜索端点，由 Bun 管理
- SQLite 数据库：用于存储会话、观察记录和摘要
- mem-search 技能：支持自然语言查询与渐进披露
- Chroma 向量数据库：结合语义检索 + 关键词检索，实现更智能的上下文召回

---

## 关键特性

- 🧠 持久记忆：上下文可跨会话保留
- 📊 渐进披露：带有 token 成本可见性的分层记忆检索
- 🔍 技能搜索：通过 mem-search 技能查询项目历史
- 🖥️ Web 可视化界面：在`http://localhost:37777`实时查看记忆流
- 💻 Claude Desktop 技能：可在 Claude Desktop 对话中检索记忆
- 🔒 隐私控制：使用 < private > 标签排除敏感内容存储
- ⚙️ 上下文配置：精细控制注入到会话中的上下文内容
- 🤖 自动运行：无需手动干预
- 🔗 引用能力：可用 ID 引用历史观察（通过`http://localhost:37777/api/observation/{id}`访问，或在`http://localhost:37777`的 Web 界面查看全部）
- 🧪 Beta 通道：可通过版本切换体验 Endless Mode 等实验特性

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
