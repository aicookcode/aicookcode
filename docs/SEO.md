# 2026-10-26 审计对应的修改与上线验证

本次仅处理 AICookCode 项目。报告中的收录数和流量数是历史快照，不能当作当前线上状态或代码故障的证据。

## 已在代码中处理

- 首页保留精选文章入口，专题通过文章列表提供静态 HTML 文本链接。首页和专题页不展示“从一个具体任务开始”模块。文章显示路线目录与前后步骤；相关推荐优先同一路线、共同标签，再考虑分类和发布时间。
- `ai-tutor-kids` 和 `agent-loop-guide` 更新标题、摘要、可手工核对的操作示例、验收与停止条件，保留原演示图片。新增示例明确标注为示例，没有补写虚构的测试成绩。
- 文章更新日期同时显示在正文、结构化数据与 sitemap；列表的 lastmod 随已发布文章的最新内容日期推进，不随每次构建刷新。
- GA4 统一到 `Analytics.astro`，仅正式域名 `aicookcode.com` 加载。本地开发与 Pages 预览域不发送统计；隐私页提供当前浏览器退出和恢复入口。
- 复制文章链接使用 canonical，避免把访问者的 UTM 或内部测试参数继续传播。

## 六个旧标签的处理结论

`/tags/Nginx/`、`/tags/微信小程序/`、`/tags/后端/`、`/tags/阿里云/`、`/tags/Vibe Coding/`、`/tags/小程序发布/` 均属于已移除的标签归档。目前源码无 `/tags/` 站内入口，sitemap 不生成标签页，没有内容完全等价的新标签页；继续保留真实 404。上线后抽查返回状态，不能把它们统一跳转首页。

保留 HTTP / www 到 HTTPS 根域的正常域名统一策略。文章仍使用自引用 canonical 与允许索引的 robots；不为“已发现但未收录”改成 noindex，也不反复提交 sitemap。

## 事件定义与验证

| 事件 | 触发条件 | 说明 |
| --- | --- | --- |
| `article_read` | 页面可见且有焦点，累计至少 60 秒，并到达正文高度的 75% | 每次页面加载最多一次；正文不包含作者卡片、联系方式与相关推荐 |
| `copy_code` | 剪贴板写入代码成功 | 不发送复制内容 |
| `share_article` | 复制文章 canonical 成功 | 仅代表链接复制成功，不代表分享已完成 |
| `rss_subscribe_click` | 点击站内 `/rss.xml` 链接 | 仅代表入口点击，不代表订阅成功 |
| `contact_click` | 点击邮箱、X 或 Telegram 链接 | 不发送邮箱地址；不推断微信扫码行为 |
| `project_visit` | 点击 GitHub 仓库或仓库内页面链接 | 发送域名与项目路径，不发送查询参数；个人主页链接不计入 |

正式站点自访前打开 `https://aicookcode.com/?analytics=off`，当前浏览器之后的页面访问都不再加载 GA4；恢复时打开 `https://aicookcode.com/?analytics=on`。无痕窗口、其他浏览器和设备需要各自设置。浏览器禁用本地存储时，`analytics=off` 仅对当前带参数的页面有效。

上线后，在专门用于验证的浏览器恢复统计，用 GA4 实时报告检查阅读、复制、RSS 和 GitHub 点击。需要参数级排查时启用 Google Analytics Debugger 后查看 DebugView；完成后关闭调试并恢复自访排除。拦截扩展、退出统计和网络失败可能导致不上报。

代码只负责发送事件，不会自动把事件标记为 GA4 关键事件。建议先核对业务目标，再将 `article_read`、`rss_subscribe_click` 或 `contact_click` 中适合的项目标记为关键事件。RSS 与联系点击是意向信号，不应当作真实订阅或询盘量。

## 必须在 Google 后台完成的事项

1. 在对应 GA4 属性的管理 → 产品关联 → Search Console 关联中，核对并关联 `aicookcode.com` 与网站数据流 `G-DPEF8K5DH3`。需有 Analytics 编辑权限和 GSC 已验证所有者权限；代码修改不等于已关联。
2. 发布后检查 `/articles/ai-tutor-kids/` 与 `/articles/agent-loop-guide/` 的实际页面、canonical 与最后抓取日期。若仍未收录，在 URL 检查中按需请求一次；报告中的 reCAPTCHA 失败发生在 GSC 提交流程，网站代码不能修复该服务连接。
3. 对外分发使用可区分渠道的 UTM，例如 `https://aicookcode.com/articles/ai-tutor-kids/?utm_source=wechat&utm_medium=social&utm_campaign=deeptutor_tutorial`。不要给站内导航添加 UTM；不要在参数中放个人信息。
4. 每周记录这两篇文章是否被抓取、索引、Google 选择的 canonical，以及非品牌展示、点击、自然搜索落地页互动和上述事件。Direct 占比高本身不能证明机器人流量。
5. 用 PageSpeed Insights 分别测首页和这两篇文章的移动/桌面体验，记录日期、LCP、INP / TBT、CLS 和问题资源。此次代码检查不代替实验室测量，也不宣称 Core Web Vitals 已通过。

## 本地回归

```bash
npm run check
npm run build
npm test
```

回归覆盖构建产物中的站内链接、canonical、sitemap、旧标签排除、重点文章入口，以及统计的生产域限制、退出设置、有效阅读阈值和交互事件。

参考：[Google 可抓取链接](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)、[sitemap 与 lastmod](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)、[GA4 自定义事件](https://developers.google.com/analytics/devguides/collection/ga4/events)、[关联 GSC](https://support.google.com/analytics/answer/10737381)、[标记关键事件](https://support.google.com/analytics/answer/13128484)。
