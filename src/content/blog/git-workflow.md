---
title: "不再只会 git push：一套顺手的日常工作流"
description: "从分支、提交到 Pull Request，用一套简单的 Git 流程，让每一次修改都有迹可循。"
pubDate: 2026-09-16T05:00:00+08:00
category: "GitHub 实践"
tags: ["Git", "GitHub"]
cover: "/images/github-cover.png"
coverAlt: "main 与 feature 分支通过三个提交合并的 Git 工作流示意"
---

Git 的价值不只是把代码传到远端，而是让你能回答：改了什么、为什么改、什么时候开始出问题。

下面是一套适合个人项目和小团队的基础流程。命令假设默认分支叫 `main`，远端叫 `origin`。

## 开始前，先看工作区

```bash
git status
git diff
```

先确认当前分支和未提交的修改。若有正在进行的工作，先妥善提交或保存，避免把两个任务混在一起。

工作区干净后，更新主分支：

```bash
git switch main
git pull --ff-only
git switch -c feat/article-search
```

`--ff-only` 只接受快进更新。出现分叉时会停止，让你先理解差异。不要因为更新失败就立即执行强制推送或重置。

## 一次提交，解释一件事

一个好的提交应该能被独立理解。例如「增加搜索结果空状态」比「update」更有信息量。

```bash
git diff
git add src/components/Search.astro
git diff --staged
git commit -m "feat: add empty state for article search"
```

暂存前先看修改，提交前再看一次暂存区。明确列出文件可以降低误提交的概率，但仍要检查文件内容，尤其是配置、测试数据和截图。

提交说明不必拘泥于某一种格式。重点是内容具体、范围清楚，并且与团队习惯一致。

## 推送分支，再检查改动

```bash
git push -u origin feat/article-search
```

在 GitHub 上为这个分支创建 Pull Request。即使只有一个人开发，PR 也可以作为一次发布前的自查。

描述里写清三个问题：这次解决了什么问题、用户会看到什么变化、做过哪些验证。附上界面截图时，注意不要暴露真实用户数据或密钥。

## 遇到冲突，先理解两边

当主分支已经有新变化，可以在功能分支上合并最新主分支：

```bash
git fetch origin
git merge origin/main
```

如果出现冲突，打开相关文件，结合两边的意图决定最终内容。完成后运行检查，暂存解决后的文件，再完成合并提交。

这只是适合入门的一种策略。团队如果使用 rebase，应按团队约定执行。不要对其他人正在使用的共享分支随意重写历史。

## 合并前，把检查自动化

对 Astro 项目，最基本的两项检查是：

```bash
npm run check
npm run build
```

前者检查组件和类型，后者验证页面能否生成。把它们写入 GitHub Actions 后，每次 Pull Request 都能重复执行同样的验证。

自动检查不会替代人工阅读。仍然需要确认内容正确、链接可用，以及移动端没有布局问题。

## 合并后，回到干净起点

远端合并完成后，切回主分支并同步：

```bash
git switch main
git pull --ff-only
git status
```

确认相关提交已合并，再决定是否删除本地功能分支。如果使用 squash merge，Git 可能无法通过原提交判断是否已合并，应先核对远端 PR 和主分支内容，不要机械地强制删除。

更多命令说明可以查看 [Git 官方文档](https://git-scm.com/docs) 与 [GitHub 的 Pull Request 文档](https://docs.github.com/en/pull-requests)。
