# 发布到 GitHub 与 Cloudflare Pages

本地项目目录：`C:\Users\Lenovo\Documents\ChatGPT\aicookcode`。

## 1. 发布前检查

```powershell
# 进入项目文件夹
npm ci
npm run check
npm run build
npm run preview
```

确认文章、图片、站点介绍符合你的发布意图。修改 `src/config/site.ts` 中的作者和 GitHub 地址；当前 GitHub 地址为空，界面暂链接 GitHub 官网。

本地初始化仓库不代表已经上传。当前交付不创建远端仓库，也不绑定 GitHub 账号。

## 2. 选择 GitHub 仓库

登录 GitHub，新建一个空仓库，例如 `aicookcode`。公开或私有按需要选择，Cloudflare 需要有对应仓库的访问权限。为避免初次推送冲突，远端创建时不要额外初始化 README。

在本地终端配置你自己的 Git 提交身份；不要照抄别人的名字和邮箱。

仓库尚未初始化时先执行 `git init -b main`。

```powershell
git config user.name "YOUR_NAME"
git config user.email "YOUR_GITHUB_EMAIL"
git add .
git diff --staged --stat
git commit -m "feat: launch AICookCode Astro blog"
git remote add origin https://github.com/YOUR_ACCOUNT/aicookcode.git
git push -u origin main --force # 强推合并

```

将占位值替换成你的真实信息。首次推送按 Git 的登录提示完成认证。不要把令牌写进远端 URL，也不要把密钥提交到仓库。已有 `origin` 时先用 `git remote -v` 查看并确认，不要盲目重复添加。

## 3. 创建 Cloudflare Pages 项目

1. 登录 Cloudflare，进入 Workers & Pages，选择创建 Pages 项目并导入已有 Git 仓库。
2. 授权 GitHub，选择上一步的仓库。
3. 生产分支选择 `main`，框架选择 Astro。
4. 构建命令填写 `npm run build`，输出目录填写 `dist`，根目录保持仓库根目录。
5. Node 版本采用项目 `.node-version` 的 22；若平台需要明确配置 `NODE_VERSION`，设置为受支持的最新 22 LTS 且不低于 22.12。
6. 保存并部署，等待构建完成。先打开生成的 `*.pages.dev` 地址确认页面。

本项目是 `output: 'static'`，不需要 Cloudflare SSR 适配器、数据库、Worker 入口或 API 密钥。GitHub Actions 只做代码检查，实际发布由 Pages 的 Git 集成负责，避免重复部署。

Cloudflare 界面入口可能调整，以官方说明为准：https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/

## 4. 绑定站点域名

1. 打开对应 Pages 项目，进入「自定义域」，添加 `aicookcode.com`。
2. 即使之前已经解析域名，也必须在 Pages 中完成这一步，以便平台关联域名和签发 HTTPS 证书。
3. 根域名连接 Pages 需要该域在 Cloudflare 管理名称服务器；按控制台校验结果检查 Nameservers。
4. 等待 DNS 与证书状态变为有效，检查 `https://aicookcode.com/`、`https://aicookcode.com/articles/` 和 `https://aicookcode.com/privacy/`。
5. 可选添加 `www.aicookcode.com` 并在 Cloudflare 配置到根域名的永久重定向。

本站使用单一主域名和标准路由：`aicookcode.com/` 是首页，文章位于 `/articles/`，专题、项目、标签、RSS、法律和联系页面均位于同一域名下。`astro.config.mjs`、`src/config/site.ts` 和 `public/robots.txt` 已按这个架构配置，未来换域名时同步修改。站点地图地址为 `https://aicookcode.com/sitemap-index.xml`。

官方说明：https://developers.cloudflare.com/pages/configuration/custom-domains/

## 5. 之后的日常发布

新增或修改 Markdown，检查并构建，通过 Git 提交到 `main`。Pages 自动拉取并发布，GitHub Actions 也会执行类型检查和构建。

若希望生产发布必须等待 PR 检查通过，在 GitHub 的仓库规则中为 `main` 配置保护规则，并使用 PR 合并；默认 Pages 的部署和 Actions 检查是独立触发的。

## 6. 用网页上传 GitHub 时的注意事项

如果不使用命令行，可以在 GitHub 仓库页面点击 `Add file` > `Upload files`，把**解压后的项目内容**拖入上传区域，然后提交到 `main`。GitHub 仓库根目录必须直接看到 `package.json`、`src/` 和 `public/`。

压缩包只是临时传输方式，GitHub 不会自动解压 zip 文件。不要只上传一个 `aicookcode.zip`，也不要多套一层目录，例如 `aicookcode/aicookcode/src`。Windows 资源管理器如果隐藏点文件，请打开“查看” > “显示” > “隐藏的项目”，确认 `.github/workflows/ci.yml`、`.gitignore` 和 `.node-version` 都已上传。

上传后打开仓库的 `Actions` 页面，确认 `ci.yml` 执行 `npm ci`、`npm run check` 和 `npm run build` 均通过。Cloudflare Pages 需要读取 `package.json` 和 `package-lock.json`，这两个文件必须位于仓库根目录。

## 7. 提交 Google Search Console

### 7.1 部署前检查

先完成 Cloudflare Pages 部署和根域绑定，并在浏览器隐私窗口确认以下地址都能打开：

```text
https://aicookcode.com/
https://aicookcode.com/robots.txt
https://aicookcode.com/sitemap-index.xml
```

页面源代码应满足：文章页面有唯一标题和描述，canonical 使用 `https://aicookcode.com/.../`，文章不是 `noindex`，`robots.txt` 声明了 sitemap，sitemap 不包含草稿和未来日期文章。

### 7.2 添加 Domain property（推荐）

Domain property 会覆盖 `http`、`https`、根域、`www` 和未来的子域名，推荐用 DNS 验证。

1. 打开 [Google Search Console](https://search.google.com/search-console)，点击左上角属性选择器 > `Add property`。
2. 选择 `Domain`，输入 `aicookcode.com`。不要填写 `https://`，也不要填写路径。
3. 复制 Google 显示的 TXT 值，例如：

```text
google-site-verification=xxxxxxxxxxxxxxxx
```

4. 登录 Cloudflare，进入 `aicookcode.com` > `DNS` > `Records` > `Add record`。
5. 新增一条记录：

| 字段 | 值 |
| --- | --- |
| Type | `TXT` |
| Name | `@`（部分界面显示为 `aicookcode.com`） |
| Content | 粘贴 Google 给出的完整 TXT 值 |
| TTL | `Auto` |

6. 保存后回到 Search Console，点击 `Verify`。
7. 如果立即失败，等待几分钟到数小时后重试。验证成功后保留 TXT 记录，不要删除。

如果不能修改 DNS，可以选择 `URL-prefix` 属性并使用 Google 提供的 HTML 标签或 HTML 文件验证；它只覆盖 `https://aicookcode.com/`，优先级低于 Domain property。

### 7.3 提交 sitemap

1. 在 Search Console 选择已验证的 `aicookcode.com` 属性。
2. 打开左侧 `Sitemaps`。
3. 在 `Add a new sitemap` 输入：

```text
sitemap-index.xml
```

也可以输入完整地址 `https://aicookcode.com/sitemap-index.xml`，然后点击 `Submit`。

只提交 sitemap index，不要重复提交 `sitemap-0.xml`，也不要提交 `rss.xml` 或 `search-index.json`。新文章发布并完成 Cloudflare 构建后，sitemap 会自动更新，通常不需要重新添加同一个 sitemap。

### 7.4 检查并请求索引

在左侧 `URL inspection` 依次检查：

```text
https://aicookcode.com/
https://aicookcode.com/articles/
https://aicookcode.com/articles/ai-app-checklist/
https://aicookcode.com/about/
```

首次检查点击 `Test Live URL`。页面可抓取但尚未收录时，可以点击 `Request indexing`。不需要为 sitemap 中的每个 URL 手动请求索引；Google 会根据 sitemap 和站内链接自行发现页面。

之后在 `Pages`、`Sitemaps`、`Core Web Vitals`、`HTTPS`、`Manual actions` 和 `Security issues` 中查看报告。出现“已发现，尚未编入索引”不一定是技术故障，应先确认内容独立、canonical 正确且没有 `noindex`。

### 7.5 新文章的收录流程

1. 在 `src/content/blog/` 复制或新建 Markdown 文件。
2. 修改文件名 slug、`title`、`description`、`pubDate`、封面、标签和正文。
3. 确认 `draft: false`，并且 `pubDate` 不晚于构建日期。
4. 提交并推送到 GitHub 的 `main` 分支。
5. 等待 Cloudflare Pages 部署成功。
6. 打开新文章 URL，确认返回 200。
7. 必要时在 URL inspection 中点击 `Request indexing`。

提交 sitemap 不保证立即收录；不要频繁重复提交同一个 URL，也不要使用重复 URL、隐藏文字或其他方式强行提高收录。

## 8. 常见问题

- **本地可以运行、云端构建失败：**检查 Node 版本、文件名大小写、锁文件是否提交以及构建日志。
- **页面资源 404：**根域部署不要配置额外 `base`；确认发布的是 `dist`。
- **域名已解析但访问失败：**检查是否已在 Pages 自定义域里添加，DNS 目标与证书状态是否正确。
- **未来日期文章未出现：**静态构建时会过滤未来文章，发布日期到达后触发重新构建。
- **自定义 404：**项目输出 `404.html`，Cloudflare Pages 据此使用正常 404 行为，而非 SPA 回退。
- **免费范围：**静态托管可以使用免费计划；配额查看 https://developers.cloudflare.com/pages/platform/limits/ 。域名续费、未来模型调用等属于独立费用。
