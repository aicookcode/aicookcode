---
title: "别再手动扒官网样式了！这个 Skill 直接生成设计系统文档"
description: "看到一个设计漂亮的网站，想借鉴到自己的项目里，手动查询、整理相关数据费时又费力。莫急，宝藏 Skill 来帮忙！"
pubDate: 2026-05-27T07:05:00+08:00
category: "GitHub 实践"
tags: ["设计系统", "AI Skill", "前端开发"]
cover: "/media/rico-design-system/cover.jpg"
coverAlt: "别再手动扒官网样式了！这个 Skill 直接生成设计系统文档"
---

看到一个设计漂亮的网站，想借鉴到自己的项目里，手动查询、整理相关数据费时又费力。莫急，宝藏 Skill 来帮忙！

`rico-design-md` —— 可以将任意网站转换为设计系统文档，也支持在不同设计令牌格式之间转换。

GitHub：`https://github.com/ricocc/rico-skills`

![](/media/rico-design-system/img_01.jpg)

## 核心功能

1. **网站转设计系统** - 输入任意网站 URL，自动提取设计令牌、颜色、排版、间距、阴影和组件样式
2. **多种输出格式** - 生成 DESIGN.md、preview.html、tokens.json（DTCG）、variables.css 和 theme.css（Tailwind v4）
3. **格式转换** - 在任意支持的格式之间转换（如 DESIGN.md 转 tokens.json、variables.css 转 DESIGN.md）
4. **可视化预览** - 生成一个独立的 preview.html 页面，展示完整的设计系统

![图像](/media/rico-design-system/img_02.jpg)

## 安装方法

最省事的方式，是直接让 Agent 帮你安装。把下面这句话发给它就行：

```
安装 rico-design-md skill。
github地址：[https://github.com/ricocc/rico-skills/tree/main](https://github.com/ricocc/rico-skills/tree/main)
```

## 使用方法

`rico-design-md` 支持显式命令，也支持自然语言。

生成默认文档和预览页：

```
rico DESIGN.md [https://linear.app](https://linear.app)
```

只提取设计令牌：

```
rico tokens [https://stripe.com](https://stripe.com)
```

生成 CSS 变量：

```
rico variables [https://vercel.com](https://vercel.com)
```

生成 Tailwind v4 主题文件：

```
rico theme.css [https://linear.app](https://linear.app)
```

全部输出：

```
rico 全部输出 [https://linear.app](https://linear.app)
```

也可以换成自然语言：

```
为 linear.app 创建 DESIGN.md
提取 stripe.com 的设计令牌
分析 GitHub 的设计系统
```

项目文档里还写到，它可以做格式转换，比如把已有 `DESIGN.md` 转成 `tokens.json`，或者在 `tokens.json`、`variables.css`、`theme.css` 之间互转。

```
rico 把 DESIGN.md 转为 tokens
```

## 适用场景

- 需要为现有网站生成设计系统文档
- 想要提取设计令牌用于开发实现
- 需要在不同设计令牌格式之间转换
- 想要一个品牌设计系统的可视化参考页面

## 写在最后

`rico-design-md` 比较适合放进“看网站、拆风格、做前端”的工作流里。它不会替代设计师判断，但能先把颜色、字体、组件这些基础资料整理出来，后面再改就有抓手。

如果你用过类似的设计系统提取工具，欢迎留言分享。

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
