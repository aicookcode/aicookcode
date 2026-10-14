---
title: "不再只会 git push：一套顺手的日常工作流"
description: "从分支、提交到 Pull Request，用一套简单的 Git 流程，让每一次修改都有迹可循。"
pubDate: 2026-03-20T05:00:00+08:00
category: "GitHub 实践"
tags: ["Git", "GitHub"]
cover: "/images/github-cover.png"
coverAlt: "main 与 feature 分支通过三个提交合并的 Git 工作流示意"
---

Git 的价值不只是把代码传到远端，而是让你能回答：改了什么、为什么改、什么时候开始出问题。

很多人学 Git 的路径是：`add`、`commit`、`push` 三连，所有修改都在 `main` 上直接做。项目小的时候没感觉，直到某天 push 了一版跑不起来的代码，或者想找回「昨天还能跑」的版本，才发现历史记录里全是「update」「fix」「123」，根本无从下手。下面这套流程就是为了解决这个问题：让每一次修改都有迹可循，出问题时能快速定位、从容回退。

命令假设默认分支叫 `main`，远端叫 `origin`。

## 开始前，先看工作区

```bash
git status
git diff
```

先确认当前分支和未提交的修改。若有正在进行的工作，先妥善提交或保存，避免把两个任务混在一起。这是成本最低的好习惯：十秒钟的检查，能省掉半小时的「我刚才改的到底去哪了」。

工作区干净后，更新主分支：

```bash
git switch main
git pull --ff-only
git switch -c feat/article-search
```

`--ff-only` 只接受快进更新。出现分叉时会停止，让你先理解差异。不要因为更新失败就立即执行强制推送或重置——先搞清楚「为什么分叉」，再决定怎么处理。

分支名也值得讲究。一个好的分支名让人一眼看懂这是在干什么：

- `feat/article-search`：新功能
- `fix/login-redirect`：修 bug
- `docs/update-readme`：只改文档
- `chore/upgrade-deps`：升级依赖等杂务

前缀统一后，分支列表本身就是一份任务清单。三个月后回看，你也能立刻想起每个分支是干嘛的。

## 临时有事？先把现场存起来

正在写搜索功能，突然要切去修一个线上 bug，代码写到一半不想提交——这时候用 `stash` 把现场暂存：

```bash
git stash push -m "搜索排序写到一半"
git switch fix/urgent-bug
# ... 修完 bug，提交，推送 ...
git switch feat/article-search
git stash pop
```

`stash` 相当于把工作区的修改打包收进抽屉，工作区恢复干净；`pop` 再把它取出来。带上 `-m` 写清楚里面是什么，抽屉多了也不会拿错。注意 `stash` 默认不包含未跟踪的新文件，需要的话加上 `-u`。

## 一次提交，解释一件事

一个好的提交应该能被独立理解。例如「增加搜索结果空状态」比「update」更有信息量。

```bash
git diff
git add src/components/Search.astro
git diff --staged
git commit -m "feat: add empty state for article search"
```

暂存前先看修改，提交前再看一次暂存区。明确列出文件可以降低误提交的概率，但仍要检查文件内容，尤其是配置、测试数据和截图。

提交信息的格式推荐用 Conventional Commits，一眼能看出这次提交的性质：

| 前缀 | 含义 | 示例 |
| --- | --- | --- |
| `feat` | 新功能 | `feat: add empty state for article search` |
| `fix` | 修 bug | `fix: prevent draft posts from appearing in index` |
| `docs` | 文档 | `docs: update search usage in README` |
| `style` | 格式调整 | `style: format search component` |
| `refactor` | 重构 | `refactor: extract query parsing helper` |
| `chore` | 杂务 | `chore: bump astro to 5.x` |

提交说明不必拘泥于某一种格式。重点是内容具体、范围清楚，并且与团队习惯一致。一个人开发时，这套规范最大的受益者是未来的你。

## 改错了，先别慌

提交之后发现改错了，根据情况选工具：

- **已经 push、别人可能在用**：用 `git revert` 生成一个「撤销某次提交」的新提交。历史记录保持完整，协作者不受影响。
- **还没 push、只有本地有**：可以用 `git reset --soft HEAD~1` 回到提交前（保留修改），或者 `--hard` 彻底丢弃（危险，确认不再需要才用）。

```bash
# 安全撤销：生成一次新的反向提交
git revert <commit-hash>

# 本地反悔：回到上一次提交，修改保留在工作区
git reset --soft HEAD~1
```

记住一条铁律：**不要对已经 push 的共享分支做 `reset --hard` 再强制推送**。你本地是干净了，协作者那边会乱套。拿不准的时候，`revert` 永远是更安全的选择。

## 推送分支，再检查改动

```bash
git push -u origin feat/article-search
```

在 GitHub 上为这个分支创建 Pull Request。即使只有一个人开发，PR 也可以作为一次发布前的自查。

描述里写清三个问题：这次解决了什么问题、用户会看到什么变化、做过哪些验证。附上界面截图时，注意不要暴露真实用户数据或密钥。一个省事的办法是给仓库加一份 PR 模板（`.github/pull_request_template.md`），每次开 PR 自动带出提纲：

```markdown
## 改了什么
<!-- 一句话描述 -->

## 用户可见的变化
<!-- 截图或描述 -->

## 验证
- [ ] npm run check 通过
- [ ] npm run build 通过
- [ ] 本地/预览环境手动验证
```

## 遇到冲突，先理解两边

当主分支已经有新变化，可以在功能分支上合并最新主分支：

```bash
git fetch origin
git merge origin/main
```

如果出现冲突，打开相关文件，结合两边的意图决定最终内容。完成后运行检查，暂存解决后的文件，再完成合并提交。

解决冲突时别急着选「要我的」或「要他的」。先看冲突的两段代码各自想干什么，很多时候正确答案是两边都要，只是要手动拼起来。解决完务必重新跑一遍检查和构建，确认合并后的代码真的能工作。

这只是适合入门的一种策略。团队如果使用 rebase，应按团队约定执行。不要对其他人正在使用的共享分支随意重写历史。

## 合并前，把检查自动化

对 Astro 项目，最基本的两项检查是：

```bash
npm run check
npm run build
```

前者检查组件和类型，后者验证页面能否生成。把它们写入 GitHub Actions 后，每次 Pull Request 都能重复执行同样的验证，不用靠人肉记住：

```yaml
# .github/workflows/check.yml
name: check
on: [pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run check
      - run: npm run build
```

自动检查不会替代人工阅读。仍然需要确认内容正确、链接可用，以及移动端没有布局问题。自动化的意义是把「低级错误」拦在人眼之前，让人的注意力留给真正需要判断的东西。

## 合并后，回到干净起点

远端合并完成后，切回主分支并同步：

```bash
git switch main
git pull --ff-only
git status
```

确认相关提交已合并，再决定是否删除本地功能分支。如果使用 squash merge，Git 可能无法通过原提交判断是否已合并，应先核对远端 PR 和主分支内容，不要机械地强制删除。

定期清理已经合并的本地分支，`git branch --merged` 可以列出它们。工作区保持干净，下一次开工时不用先花十分钟回忆「这个分支还能不能删」。

从「看工作区」到「回到干净起点」，这套流程走下来，每一次修改都有分支承载、有提交解释、有 PR 记录、有自动检查背书。刚开始会觉得步骤多，走顺之后会发现：出问题时你能精确回答「是哪次改动引入的」，这就是 Git 真正的价值。

更多命令说明可以查看 [Git 官方文档](https://git-scm.com/docs) 与 [GitHub 的 Pull Request 文档](https://docs.github.com/en/pull-requests)。
