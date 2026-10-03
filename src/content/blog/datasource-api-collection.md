---
title: "找数据源和选接口不再是 Vibe Coding 的瓶颈了，这里有 1680 个数据源 API"
description: "开篇引言**这个 46 万 Star 的 GitHub 仓库，可能是每个 AI 开发者都该收藏的“API 货架”**现在用 Claude Code、Codex 这类 AI 编程工具做产品，写代码反而越来越不是最难的部分。"
pubDate: 2026-08-16T17:44:32+08:00
category: "GitHub 实践"
tags: ["数据源", "API", "Vibe Coding"]
cover: "/media/datasource-api-collection/cover.jpg"
coverAlt: "找数据源和选接口不再是 Vibe Coding 的瓶颈了，这里有 1680 个数"
---

开篇引言**这个 46 万 Star 的 GitHub 仓库，可能是每个 AI 开发者都该收藏的“API 货架”**现在用 Claude Code、Codex 这类 AI 编程工具做产品，写代码反而越来越不是最难的部分。

一个后台、一个 Dashboard，甚至一个完整的前端页面，AI 几分钟就能搭出雏形。

真正容易卡住的问题是：

去哪找数据？

股票行情从哪里来？

新闻数据从哪里来？

天气、地图、航班、体育、政府公开数据，又该接哪家服务？

以前做一个产品，通常是这样的流程：

先搜索 API → 阅读文档 → 注册账号 → 申请 Key → 测试接口 → 再开始写代码。

现在，流程正在发生变化：

先告诉 Agent 你想做什么 → 让它寻找合适的数据源 → 验证接口 → 自动接入 → 再开始完善产品。

最近看到一条帖子，提到 GitHub 上一个非常老牌的仓库：

仓库地址[https://github.com/public-apis/public-apis](https://github.com/public-apis/public-apis)截至目前，这个仓库已经拥有约 46.1 万个 Star、5.1 万个 Fork。

它看起来只是一个 Markdown 文件，但对 AI Coding 来说，更像是一张“**真实世界 API 地图**”。

01PARTpublic-apis 到底是什么？

WHAT IS PUBLIC-APIS先说结论：

它不是一个 **API** 网关，也不是一个统一的数据服务，更不是一个可以直接调用的 SDK。

它本质上是一份由社区维护的公开 API 清单。

仓库的 README 按照不同领域，把 **API** 分成了几十个类别，包括：

• Finance•Cryptocurrency•News•Weather•Maps•Government•Machine Learning•Sports & Fitness•Music•Security•Open Data•Transportation按照当前 README 的目录和表格粗略统计，里面已经整理了约 51 个类别、1,680 个 **API** 条目。

每个条目通常会提供几项关键信息：

| 字段 | 说明 |
| --- | --- |
| API | API 名称和官方文档链接 |
| Description | 这个 API 能做什么 |
| Auth | 是否需要 API Key 或 OAuth |
| HTTPS | 是否支持 HTTPS |
| CORS | 是否允许浏览器跨域调用 |

这几列看起来简单，但对于一个正在做产品的人来说，已经是一张非常实用的筛选表。

比如，你想做一个天气小组件。

你不需要先在搜索引擎里漫无目的地搜索“免费天气 **API**”，也不需要打开二十几个比较文章。

直接进入仓库的 Weather 分类，就可以看到一批候选：

• Open-Meteo•OpenWeatherMap•Weatherstack•Weather.gov•wttr.in•RainViewer•Hong Kong Observatory如果你想做加密货币行情，也可以进入 Cryptocurrency 分类，查看 CoinGecko、CoinCap、Coinpaprika 等项目。

这就是它最有价值的地方：

把“搜索 API”这个动作，变成了一个结构化的选择问题。

02PART真正有用的，不是“免费”，而是“可组合”COMPOSABLE DATA SOURCES很多人看到 **public-apis**，第一反应是：

“这里面是不是有很多免费的 **API**？”这个理解不算错，但还不够准确。

它更大的价值，是让不同领域的**数据源**变得容易组合。

假设我们要做一个简单的 Dashboard，首页展示三类信息：

### 1

北京当前天气

### 2

比特币实时价格

### 3

最新太空新闻我们可以先选三个接口作为实验对象：

| 数据模块 | API | README 标记 | 适合做什么 |
| --- | --- | --- | --- |
| 天气 | Open-Meteo | 无认证、支持 HTTPS、支持 CORS | 天气卡片、温度趋势 |
| 加密货币 | CoinGecko | 无认证、支持 HTTPS、支持 CORS | 币价、涨跌、行情摘要 |
| 新闻 | Spaceflight News API | 无认证、支持 HTTPS、支持 CORS | 新闻列表、资讯流 |

这里要注意：

README 中的 No Auth，不代表永远没有限制。

有些 **API** 虽然不要求 Key，但可能有频率限制、调用次数限制、**商业使用限制**，甚至会在流量变大以后要求注册账号。

所以，仓库适合用来“发现候选”，最终能不能上线，还要回到**官方文档**确认。

下面是一个最小化的 Node.js 示例：

...jsconst endpoints = {weather:

"[https://api.open-meteo.com/v1/forecast](https://api.open-meteo.com/v1/forecast)" +"?latitude=39.9042" +"&longitude=116.4074" +"&current=temperature_2m,weather_code",crypto:

"[https://api.coingecko.com/api/v3/simple/price](https://api.coingecko.com/api/v3/simple/price)" +"?ids=bitcoin&vs_currencies=usd",news:

"[https://api.spaceflightnewsapi.net/v4/articles/?limit=3](https://api.spaceflightnewsapi.net/v4/articles/?limit=3)"

};

async function getJSON(url) {const response = await fetch(url);

if (!response.ok) {throw new Error(`Request failed: ${response.status}`);

}return response.json();

}const [weather, crypto, news] = await Promise.all([getJSON(endpoints.weather),getJSON(endpoints.crypto),getJSON(endpoints.news)]);

const dashboardData = {temperature:

weather.current.temperature_2m,bitcoinUsd:

crypto.bitcoin.usd,news:

news.results.map(item => ({title: item.title,url: item.url,source: item.news_site}))};

console.log(dashboardData);

这段代码没有什么复杂算法。

真正有价值的是：

三个原本互不相关的数据源，被组合成了一个产品功能。

天气 **API** 提供环境数据，行情 API 提供市场数据，新闻 API 提供内容数据。

代码只是把它们接起来。

03PARTAI Agent 应该怎样使用这个仓库？

AGENT WORKFLOW最简单的方式，是把仓库链接直接丢给 **Agent**，然后说：

...text我要做一个“美股 + 新闻 + Crypto 情绪”的 Dashboard。

请先阅读：

[https://github.com/public-apis/public-apis](https://github.com/public-apis/public-apis)

要求：

1. 从 Finance、News、Cryptocurrency 分类中各筛选 3 个候选 API；

2. 优先选择支持 HTTPS、文档完整、存在免费额度的服务；

3. 标明每个 API 是否需要 API Key；

4. 检查是否适合浏览器直接调用；

5. 对每个候选接口给出一个最小可运行的请求示例；

6. 不要先写 UI，先输出数据源对比表；

7. 如果某个 API 的免费额度、商业授权或数据延迟存在风险，请明确标注。

这个提示词里有一个很重要的顺序：

先选数据源，再写界面。

很多 AI Coding 项目一开始就让模型生成页面：

“帮我做一个财经 Dashboard，界面要有股票、新闻和情绪分析。”结果页面做得很漂亮，但数据接口是临时编的，或者调用方式根本不存在。

更稳妥的流程应该是：

第一步：先定义数据需求不要只说“我要股票数据”。

要明确：

• 需要实时数据，还是延迟数据？

• 需要日线，还是分钟线？

• 需要美股、A 股，还是全球市场？

• 需要新闻标题，还是全文内容？

• 情绪分析是自己调用模型，还是 **API** 直接提供？

• 允许多少延迟？

• 是否需要长期存储？

需求越具体，**Agent** 越容易筛选出合适的**数据源**。

第二步：让 Agent 读取 public-apis让它根据分类、认证方式、HTTPS 和 CORS 状态，先生成**候选清单**。

这个时候不要急着让 **Agent** 写大量代码。

先让它回答：

• 哪些 **API** 真的符合需求？

• 哪些需要 Key？

• 哪些只能服务端调用？

• 哪些有明确免费额度？

• 哪些文档已经过时？

• 哪些接口存在地区限制？

第三步：实际请求验证README 只是索引，不能代替测试。

让 **Agent** 对候选 **API** 发起最小请求，确认：

• 域名是否还能访问；

• 返回格式是否符合文档；

• 错误响应是否清晰；

• 时间字段和货币单位是什么；

• 是否存在分页；

• 是否有频率限制；

• 是否需要特殊请求头。

第四步：生成适配层不要把第三方 **API** 的原始返回值直接塞进前端。

建议让 **Agent** 为每个**数据源**创建一个**独立适配器**。这样做的好处是：以后某个接口失效、改价或者限流时，只需要替换适配器，不需要重写整个产品。

04PART从 Demo 到产品，中间还差什么？

DEMO → PRODUCT调用 **API** 并不等于完成产品。

AI 可以很快帮你接上接口，但以下几件事，仍然需要开发者认真处理。

1. 不要把 API Key 放进前端只要是需要认证的接口，Key 就应该放在**服务端环境变量**里：

...envMARKET_API_KEY=your_key_hereNEWS_API_KEY=your_key_here前端调用自己的后端，由后端去调用第三方服务。

否则，Key 会直接暴露在浏览器开发者工具里。

2. 给外部接口加超时和重试第三方服务随时可能变慢、限流或者临时不可用。

生产环境至少需要处理：

• 请求超时；

• 429 频率限制；

• 500 服务异常；

• 网络抖动；

• 空数据；

• 字段缺失；

• 返回格式变化。

不要让一个新闻接口挂掉，导致整个首页白屏。

3. 统一不同 API 的数据结构不同服务对同一个概念的命名可能完全不同。

比如价格可能叫：

• price•current_price•last•close新闻发布时间也可能叫：

• published_at•pubDate•created•timestamp建议在服务端**统一成自己的数据模型**：

...js{symbol: "BTC",price: 63007,currency: "USD",capturedAt: "2026-08-16T07:30:00Z"

}这样前端只需要认识自己的数据结构，不需要知道每个供应商的字段细节。

4. 对结果做缓存天气、新闻、行情数据不一定每秒都需要重新请求。

合理的**缓存策略**可以减少：

• ## API调用次数；

• 页面加载时间；

• 触发限流的概率；

• 对单一服务的依赖。

5. 给数据来源留出替换空间不要把整个产品绑定在一个 **API** 上。

对关键数据，最好准备：

• 主**数据源**；

• 备用**数据源**；

• 本地缓存；

• 降级展示方案。

比如实时价格拿不到时，可以展示最近一次成功请求的结果，并明确标注更新时间。

05PART这个仓库最容易被误解的地方COMMON MISUNDERSTANDINGS误解一：列在仓库里的 API 都是永久可用的不是。

## public-apis

是社区维护的清单，条目可能会发生变化，接口也可能下线、改版或者停止免费服务。

所以，它更像一张地图，而不是一张保证书。

误解二：免费就等于可以无限调用不是。

## 免费 API

通常会有：

• 每分钟调用上限；

• 每月额度；

• IP 限制；

• 数据延迟；

• ## 商业使用限制；

• 地区限制；

• 必须署名或保留来源。

上线前一定要查看官方服务条款。

误解三：支持 CORS 就适合直接放前端也不一定。

CORS 只说明浏览器跨域策略是否允许调用，并不代表：

• 接口稳定；

• 数据适合公开展示；

• 没有速率限制；

• 可以绕过认证；

• 允许商业用途。

误解四：仓库采用 MIT，就代表里面所有数据都能随便用MIT License 适用于这个仓库本身的内容和代码。

但仓库里收录的每一个 **API**，都有自己的授权、**数据版权**和商业条款。

特别是新闻、金融、地图、政府数据和机器学习服务，不能只看仓库里的那一行说明。

///LASTAI Coding 的下一个瓶颈，不是代码量THE NEXT BOTTLENECK过去，一个开发者最稀缺的资源是写代码的时间。

现在，AI 正在快速压低这部分成本。

但产品不会因为代码写得快，就自动拥有：

• 实时行情；

• 可靠新闻；

• 准确天气；

• 合法数据；

• 稳定接口；

• 可持续的商业权限。

AI 可以负责思考和生成代码。

代码可以负责执行逻辑。

**但 API 才是产品连接真实世界的接口。**这也是 **public-apis** 对 AI 开发者真正有价值的地方：

它提供的不是某一个神奇工具，而是一种**新的工作方式**。

以前是：

我想做一个产品，然后到处找数据。

现在可以变成：

我先描述产品需要什么数据，再让 Agent 从结构化目录中筛选、验证和接入。

这个变化看起来只是少了几次搜索。

但对于一个需要快速试错的独立开发者来说，它可能意味着：

从半天的资料搜集，缩短到十几分钟的候选筛选；

从凭经验选接口，变成按认证、协议、跨域和授权条件做判断；

从“先做页面再补数据”，变成“先验证数据，再让页面围绕真实数据生长”。

所以，下次让 Claude Code 或 Codex 开始做一个新项目时，不妨先把这个仓库发给它：

仓库地址[https://github.com/public-apis/public-apis](https://github.com/public-apis/public-apis)然后问一句：

“在开始写代码之前，先帮我找到这个产品真正需要的数据。”很多时候，产品的第一行代码，不应该是一个组件。

**而应该是一条被验证过的 API。**你在 Vibe Coding 时会遇到哪些问题或者好的建议，欢迎在评论区分享讨论。

我是 **AI 煮代码汤**，记录 AI、编程和成长路上的日常折腾。这里会分享能直接上手的代码技巧、最近好玩的 AI 工具，也写一点技术之外的真实感受。希望你看完，不只是收藏一篇文章，而是真的多一个可以试试的办法。

既然看到这里了，如果觉得有用，随手点个赞、推荐、转发三连吧。

点赞推荐转发THANKS FOR READING

*本文原载于微信公众号「AI煮代码汤」，经作者整理后发布于本站。*
