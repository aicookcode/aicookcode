# 剩余文章检查与修改记录

检查日期：2026-10-27（America/New_York）。当前保留 25 篇文章，网址均保持不变。本轮检查全部文章，针对 12 篇完成内容修改。

## 收录证据与范围

用户报告 `site:aicookcode.com` 可见 13 篇。通过浏览器实际访问同一 Google 查询，以及 `site:aicookcode.com/articles/`，当前会话均显示下表中的 10 篇文章，没有可见分页入口。**这不是对用户所见 13 篇的否定，也不能用当前结果证明另外 15 篇未收录。** 本次没有访问到 Search Console URL 检查结果，因此不编造“已抓取未收录”等原因。

查询入口：[Google 站点搜索](https://www.google.com/search?q=site%3Aaicookcode.com)。搜索结果受时间、地区和结果省略影响；此处记录的是观察样本，不是 Google 全量索引清单。

2026-10-28 补充：用户确认 Astro / Cloudflare Pages 部署文章已收录，要求不改动。已撤回该篇本轮的标题、摘要、正文和更新日期修改；其余文章改动保留。

2026-10-28 再补充：用户确认 public-apis 数据接口文章已收录。已按相同规则撤回该篇本轮全部修改，保留原有标题、摘要、正文及日期。

2026-10-28 补充确认：环境变量与 API 密钥文章同样已收录，已撤回本轮标题、摘要、正文和更新日期修改，后续保留不改动。

## 对照结论

- 技术模板相同：25 篇均使用相同文章模板、canonical、结构化数据与索引指令。没有发现一个只阻挡“搜索未显示组”的共同技术开关。
- 搜索可见样本中，数字人口播、本地配音和小程序系列有具体操作、原始截图或结果材料，适合作为实践文章的编辑参照。
- 搜索未显示样本中，Open Lovable、MoneyPrinterTurbo、Meetily、VoiceStudio 等原稿更偏功能介绍，部分标题不写项目名，存在绝对效果承诺、过时硬件说法和不可直接复制的命令。这些是独立可核对的编辑问题，并非已证明的未收录原因。
- 反例同样存在：搜索可见的架构图文章也使用 Star 数标题；未显示的 DeepTutor、Agent Loop 原本已有较详细示例。因此不能把文章长度、Star 数、截图数量或某种措辞当成收录公式。

## 逐篇记录

| 文章 | 本次证据 | 检查与修改 |
| --- | --- | --- |
| [Agent Loop 使用指南：提示词模板、验收示例与停止条件](https://aicookcode.com/articles/agent-loop-guide/) | 本次搜索未显示，索引状态待确认 | 补充轮次对比与反例保存，区分自评和外部证据。 |
| [第一个 AI 应用：先做小，再做完整](https://aicookcode.com/articles/ai-app-checklist/) | Google 本次搜索可见 | 已检查；本轮保留正文与网址，不因未出现/出现而批量重写。 |
| [让 AI 编程更可靠：把任务写成可验证的步骤](https://aicookcode.com/articles/ai-prompt-workflow/) | Google 本次搜索可见 | 已检查；本轮保留正文与网址，不因未出现/出现而批量重写。 |
| [一张照片做出 AI 数字人口播视频：从声音调试到成片的完整实战](https://aicookcode.com/articles/ai-talking-avatar/) | Google 本次搜索可见 | 已检查；本轮保留正文与网址，不因未出现/出现而批量重写。 |
| [DeepTutor AI 家教教程：教材导入、模型配置与练习验收](https://aicookcode.com/articles/ai-tutor-kids/) | 本次搜索未显示，索引状态待确认 | 补充学生作答、AI 解析与人工核对记录的分离方法。 |
| [5.1K+ Stars 的架构图生成 Skill，复杂系统也能一图看懂](https://aicookcode.com/articles/architecture-diagram-skill/) | Google 本次搜索可见 | 已检查；本轮保留正文与网址，不因未出现/出现而批量重写。 |
| [从本地到线上：用 Astro 搭建并发布你的博客](https://aicookcode.com/articles/astro-cloudflare/) | 用户确认已收录（2026-10-28） | 按用户要求撤回本轮全部修改，恢复到已提交版本；后续保留不改动。 |
| [把 Claude Code / Codex 接入飞书，让你的工作变轻松](https://aicookcode.com/articles/claude-feishu-integration/) | Google 本次搜索可见 | 已检查；本轮保留正文与网址，不因未出现/出现而批量重写。 |
| [ClipForge 带货视频教程：商品图、脚本、配音与导出](https://aicookcode.com/articles/clipforge-ai-short-video/) | 本次搜索未显示，索引状态待确认 | 去掉固定两分钟承诺；补商品规格、脚本、画面和导出检查，修正费用说法。 |
| [BrowserAct Skills 使用指南：网页采集、字段校验与流程复用](https://aicookcode.com/articles/crawler-skills/) | 本次搜索未显示，索引状态待确认 | 标题明确 BrowserAct；补字段、抽查、去重与失败记录模板。 |
| [找数据源和选接口不再是 Vibe Coding 的瓶颈了，这里有 1680 个数据源 API](https://aicookcode.com/articles/datasource-api-collection/) | 用户确认已收录（2026-10-28） | 按用户要求撤回本轮全部修改，恢复到已提交版本；后续保留不改动。 |
| [环境变量怎么放？从本地配置到密钥边界](https://aicookcode.com/articles/environment-variables/) | 用户确认已收录（2026-10-28） | 按用户要求撤回本轮全部修改，恢复到已提交版本；后续保留不改动。 |
| [Node.js 全栈应用部署到阿里云：Nginx、systemd 与排错](https://aicookcode.com/articles/flight-price-deploy/) | 本次搜索未显示，索引状态待确认 | 按本机接口、Nginx、浏览器拆分 502/404 等排查。 |
| [普通笔记本也能本地克隆配音：Qwen3-TTS 与 ZipVoice 实战](https://aicookcode.com/articles/local-voice-cloning/) | Google 本次搜索可见 | 已检查；本轮保留正文与网址，不因未出现/出现而批量重写。 |
| [Meetily 本地会议纪要：录音、转写、摘要与隐私设置](https://aicookcode.com/articles/meeting-recorder-local/) | 本次搜索未显示，索引状态待确认 | 去掉本地必然保密的承诺，补本地/云端模型边界与短录音验证。 |
| [MoneyPrinterTurbo 教程：安装、模型配置与短视频生成](https://aicookcode.com/articles/moneyprinterturbo/) | 本次搜索未显示，索引状态待确认 | 标题明确项目名；修复命令，按官方说明补 Compose 配置与短样片验收。 |
| [Node.js HTTP 服务入门：进程、端口、请求与响应](https://aicookcode.com/articles/node-service-runtime/) | 本次搜索未显示，索引状态待确认 | 补可运行 server.cjs 示例、真实 404、本机监听与阻塞排查。 |
| [Agent Reach 使用指南：让 AI 搜索和读取多平台资料](https://aicookcode.com/articles/social-reader-ai/) | 本次搜索未显示，索引状态待确认 | 标题明确 Agent Reach；补来源链接、全文/摘要区分与失败记录。 |
| [不想手动抠图？试试这个让 AI 帮你切图的 Skill](https://aicookcode.com/articles/ui-assets-skill/) | Google 本次搜索可见 | 已检查；本轮保留正文与网址，不因未出现/出现而批量重写。 |
| [VideoLingo 视频字幕翻译：8GB Intel Mac 实践与校对方法](https://aicookcode.com/articles/video-subtitle-ai/) | 本次搜索未显示，索引状态待确认 | 标题明确 VideoLingo；补一分钟字幕验证，修正 Edge TTS 离线说法。 |
| [VoiceStudio 本地语音工具：声音克隆、配音与转录入门](https://aicookcode.com/articles/voice-clone-local-tool/) | 本次搜索未显示，索引状态待确认 | 标题明确 VoiceStudio；更新平台边界，补短音频对照及引擎差异。 |
| [Open Lovable 网站复刻教程：安装、模型配置与页面验收](https://aicookcode.com/articles/website-clone-ai/) | 本次搜索未显示，索引状态待确认 | 标题明确 Open Lovable；修复命令，去掉任意网站完整复刻承诺，补交互和资源验收。 |
| [难怪你的 WorkBuddy 跟别人不一样——这 5 个设置可能一个都没开](https://aicookcode.com/articles/workbuddy-5-settings/) | Google 本次搜索可见 | 已检查；本轮保留正文与网址，不因未出现/出现而批量重写。 |
| [WorkBuddy 微信小程序开发：从需求到模拟器运行](https://aicookcode.com/articles/workbuddy-mini-program-development/) | Google 本次搜索可见 | 已检查；本轮保留正文与网址，不因未出现/出现而批量重写。 |
| [WorkBuddy 微信小程序上线：真机测试、体验版与审核发布](https://aicookcode.com/articles/workbuddy-mini-program-launch/) | Google 本次搜索可见 | 已检查；本轮保留正文与网址，不因未出现/出现而批量重写。 |

## 改动原则与后续核对

保留原发布时间、slug、已有演示素材和可核对的实践记录。仅对本轮有正文改动的 12 篇登记实际编辑日期 `2026-10-27`；不改首页固定编辑日期，不伪造额外实验成绩。新增内容均是操作建议、测试输入或验收方法，不冒充已完成的产品实测。

更新后的 sitemap 自动读取文章 updatedDate；不用删除原 sitemap，也不为每篇文章创建重复入口。发布后先确认正式 URL 返回 200、正文可读且不含 noindex，再在 Search Console 对重点文章查看最后抓取时间、Google 选择的 canonical 和索引状态。若本地修改尚未发布，搜索结果不会因为本地编辑发生变化。

Google 文档说明技术可抓取不代表一定收录；本轮的目的在于让内容更准确、能实际使用，而不是保证收录或排名。[以用户为中心的内容](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)、[页面索引报告](https://support.google.com/webmasters/answer/7440203)、[请求重新抓取](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)。

项目配置与兼容性已对照正文所链接的官方仓库核对；以后更新文章时，应再次核对对应版本，不把当前 README 的特性反推为旧版本已经支持。
