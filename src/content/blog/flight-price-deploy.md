---
title: "把 Vibe Coding 的机票比价系统部署到阿里云（保姆级教程）"
description: "从前后端分离、Nginx 代理到 systemd 守护，记录一个 Vibe Coding 项目从本地玩具走向公网服务的完整部署流程。"
pubDate: 2026-04-23T06:20:00+08:00
category: "开发工具"
tags: ["Vibe Coding", "阿里云", "部署", "Nginx", "Node.js"]
cover: "/media/flight-price-deploy/cover.jpg"
coverAlt: "机票比价系统部署到阿里云的服务器架构示意"
---

最近我用 Codex + Vibe Coding 做了一个机票比价系统，前后端都跑通了，本地体验丝滑。兴奋之余，突然想起半年前双 11 优惠买的阿里云服务器还在吃灰，索性将项目部署上去，让它从“本地玩具”变成一个能在公网访问的完整系统。

在 Codex 的辅助下，这套机票比价系统最终顺利完成了上云部署。当前后端全部跑通，浏览器里直接访问完整系统时，那种“项目真的活起来了”的感觉特别强烈。

这篇是我从 0 到 1 的完整复盘，包含：

- 方案选型和整体部署流程说明；
- 5 大步骤保姆级操作，带截图和命令；
- 后续发布更新流程。

照着做，新手 2 小时内也能将项目轻松上云。

## 方案选型

这套项目采用的是前后端分离架构，前端使用 React，后端使用 Next.js。

- 前端打包完成后，由 Nginx 负责托管静态页面；
- 后端以独立 API 服务的形式运行，监听服务器内部的 3000 端口。为了不让后端直接暴露在公网，外部请求先进入 Nginx，再由它转发到后端服务；
- 后端交给 systemd 守护，这样不用依赖终端前台运行，终端关闭后服务也不会中断。

正式域名还没就绪前，可以先用公网 IP 过渡：

- 前端页面通过 `http://服务器IP:8001` 访问；
- 后端接口通过 `http://服务器IP:3100/api/*` 访问；
- 外部请求先进入 Nginx，再由它分别转发到前端静态资源和后端服务；
- 后续接入正式域名时，只需要调整 Nginx 配置即可。

![服务器、Nginx、前端静态资源、Node API 与 systemd 的部署关系](/media/flight-price-deploy/image-01.png)

这套方案的好处有两个：结构清晰，前后端职责分开；后续换域名、换服务器，也比较好迁移。

## 整体部署流程

部署流程分为 5 步：

1. 确认服务器环境；
2. 把仓库代码拉到服务器；
3. 部署并跑通后端服务，再配置 Nginx 代理；
4. 构建前端并交给 Nginx 托管静态文件；
5. 最后用 systemd 守护后端进程。

> 小提示：现在阿里云的 Workbench 远程终端已经接入了 AI 智能能力，很多配置操作可以直接用自然语言来完成。

## 第一步：先把服务器环境准备好

### 1. 安装基础工具

如果是全新的 Linux 服务器，先安装基础工具：

```bash
sudo apt update
sudo apt install -y nginx git curl build-essential
```

- `sudo`：用管理员权限执行命令；
- `apt`：Ubuntu / Debian 系统里的包管理工具；
- `update`：更新软件包索引；
- `install`：安装指定内容。

上述命令中，第一句先更新包列表，第二句再安装软件。

### 2. 安装 Node.js 和 pnpm

如果服务器上已经有别的项目，建议用 nvm 管理 Node 版本，避免互相影响。

#### 2.1 安装 nvm

nvm 是用于管理 Node 版本的工具，支持在一台机器上安装和维护多个 Node 版本，并可按项目需求快速切换。

安装命令：

```bash
curl -o- -L https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

安装过程可能会出现 `Failed to connect to github.com port 443`。这是网络不稳定、连接 GitHub 超时导致的，可以改成脚本方式：

```bash
export METHOD=script
curl -o- -L https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

![nvm 安装时的网络错误示例](/media/flight-price-deploy/image-02.png)

安装成功后如图：

![nvm 安装成功](/media/flight-price-deploy/image-03.png)

加载 nvm：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

验证：

```bash
nvm --version
```

如果有版本号输出，就表示安装成功。

#### 2.2 安装 Node

使用 nvm 安装指定 Node 版本：

```bash
nvm install 22.22.2
```

查看当前系统可用 Node 版本：

```bash
nvm ls
```

切换使用 Node 版本：

```bash
nvm use 22.22.2
```

查看 Node 版本：

```bash
node -v
```

#### 2.3 安装 pnpm

如果使用 pnpm，执行下面的命令：

```bash
corepack enable
corepack prepare pnpm@10.28.2 --activate
```

`corepack enable` 会启用 Node.js 自带的包管理器版本管理工具，然后让 Corepack 下载并启用指定版本的 pnpm。

查看 pnpm 版本：

```bash
pnpm -v
```

### 3. 开放端口号

需要将外部请求的端口号配置到安全组中：前端 8001，后端 3100。

在阿里云服务器的左侧菜单找到「安全组」，创建安全组，并在入方向添加规则。

![阿里云安全组入方向端口配置](/media/flight-price-deploy/image-04.png)

## 第二步：把代码放到服务器

先准备一个统一目录：

```bash
sudo mkdir -p /srv
sudo chown -R $USER:$USER /srv
```

然后拉取代码：

```bash
cd /srv
git clone <你的仓库地址> demo-app
cd /srv/demo-app
```

如果仓库是私有的，需要提前准备好访问令牌，避免拉代码时卡住。

阿里云服务器拉取 GitHub 仓库代码可能会遇到网络波动，可以使用国内 Gitee 仓库作为拉取源，省掉很多无意义的网络折腾。

## 第三步：先部署后端接口

### 1. 安装依赖并构建

```bash
cd /srv/demo-app/backend
pnpm install --frozen-lockfile
pnpm build
```

先手动启动一次，确认服务本身没问题：

```bash
cd /srv/demo-app/backend
PORT=3000 NODE_ENV=production pnpm start
```

另开一个终端检查健康接口：

```bash
curl http://127.0.0.1:3000/api/health
```

能通，说明后端部署已经成功。

### 2. 用 Nginx 代理后端服务

后端建议不要直接暴露内部端口，而是让 Nginx 统一接收外部请求。当前配置除了代理到 3000 端口，还做了前端访问跨域配置。

示例配置：

```nginx
server {
    listen 3100;
    server_name _;

    location / {
        if ($request_method = OPTIONS) {
            add_header Access-Control-Allow-Origin "前端地址" always;
            add_header Access-Control-Allow-Methods "GET,POST,OPTIONS" always;
            add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
            add_header Access-Control-Max-Age 86400 always;
            add_header Content-Length 0;
            add_header Content-Type text/plain;
            return 204;
        }

        add_header Access-Control-Allow-Origin "前端地址" always;
        add_header Access-Control-Allow-Methods "GET,POST,OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
        add_header Vary "Origin" always;

        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

保存配置后检查并重载 Nginx：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

这里有三个地方一定要确认：

- `/etc/nginx/conf.d/backend.conf` 中的文件名可以按需修改；
- `listen` 端口要和你的实际规划一致；
- `前端地址` 要换成你的前端访问地址。

配置完成后，浏览器直接访问：

```text
http://服务器公网IP:3100/api/health
```

![后端健康接口访问结果](/media/flight-price-deploy/image-05.jpg)

能通，说明后端代理这一层已经打通。

## 第四步：部署前端页面

### 1. 安装依赖并构建

```bash
cd /srv/demo-app/frontend
pnpm install --frozen-lockfile
pnpm build
```

确认构建产物目录，例如：

```text
/srv/demo-app/frontend/build
```

### 2. 用 Nginx 托管静态文件

```nginx
server {
    listen 8001;
    server_name _;

    root /srv/demo-app/frontend/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

检查配置并重新加载：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

这里有三个地方一定要确认：

- `/etc/nginx/conf.d/frontend.conf` 中的文件名可以按需修改；
- `listen` 端口要和你的实际规划一致；
- `root` 是否写成了真实构建产物的目录。

完成后访问：

```text
http://服务器公网IP:8001
```

![前端页面已经通过公网访问](/media/flight-price-deploy/image-06.png)

页面能打开，说明前端已经上线。

## 第五步：用 systemd 守护后端服务

如果只是手动运行 `pnpm start`，终端关了，服务通常也就停了。

更稳妥的方式，是交给 systemd 托管。systemd 是 Linux 的系统和服务管理器，负责后台服务的启动、停止、重启、开机自启和日志管理。

示例配置：

```ini
[Unit]
Description=demo-backend
After=network.target

[Service]
Type=simple
User=YOUR_USER
WorkingDirectory=/srv/demo-app/backend
Environment=HOME=/home/YOUR_USER
Environment=NVM_DIR=/home/YOUR_USER/.nvm
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=PATH=/home/YOUR_USER/.nvm/versions/node/v22.x.x/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
ExecStart=/home/YOUR_USER/.nvm/versions/node/v22.x.x/bin/pnpm start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

`YOUR_USER` 要替换成当前登录用户，并确保配置的各个路径正确。

这里为什么要写绝对路径？因为 systemd 不会自动加载你的终端环境，也不会帮你执行 `nvm use`。如果路径写错，服务经常会出现“手动能跑，开机跑不起来”的问题。

启用服务：

```bash
sudo systemctl daemon-reload
sudo systemctl enable demo-backend
sudo systemctl start demo-backend
sudo systemctl status demo-backend
```

查看日志：

```bash
journalctl -u demo-backend -f
```

![systemd 后台服务状态](/media/flight-price-deploy/image-07.png)

## 后续发布怎么做

如果项目后面还有更新，发布流程通常就是这一套：

```bash
cd /srv/demo-app
git pull

cd /srv/demo-app/backend
pnpm install --frozen-lockfile
pnpm build

cd /srv/demo-app/frontend
pnpm install --frozen-lockfile
pnpm build

sudo systemctl restart demo-backend
sudo systemctl reload nginx
```

## 结语

如果你手里也刚好有一台阿里云服务器，不妨找个时间亲手试一次。现在有 AI 帮忙，写代码有人辅助，配环境有人提醒，排问题也有人一起查，很多原本看起来很头大的流程，其实已经比以前顺手很多了。

一个属于自己的系统，真的越来越容易落地。别让服务器继续吃灰了，折腾起来，说不定下一个跑在公网里的，就是你自己的作品。
