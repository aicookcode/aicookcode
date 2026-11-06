// Editorial reading routes; the existing category URLs remain stable.
export const contentTracks = [
  {
    name: 'AI 工具真实实测',
    description: '看实际样音、成片和失败记录，先判断工具是否适合自己的设备与任务。',
    href: '/topics/ai/',
    articles: [
      { id: 'ai-talking-avatar', label: '照片数字人口播：从失败路线到实际成片' },
      { id: 'local-voice-cloning', label: '普通笔记本本地配音：换稿后的样音对照' },
    ],
  },
  {
    name: '独立建站上线复盘',
    description: '从本地内容到构建、域名和线上检查，理解一个站点如何持续发布。',
    href: '/topics/web/',
    articles: [
      { id: 'astro-cloudflare', label: 'Astro 博客：Markdown 到 Cloudflare Pages' },
      { id: 'flight-price-deploy', label: 'Node.js 全栈应用：部署与逐层排错' },
    ],
  },
  {
    name: '普通用户可复现工作流',
    description: '把任务拆成可操作步骤，准备输入、检查输出，再决定是否继续。',
    href: '/topics/',
    articles: [
      { id: 'workbuddy-mini-program-development', label: 'WorkBuddy：从需求到小程序模拟器' },
      { id: 'ui-assets-skill', label: '设计稿切图：选择素材、检查与导出' },
      { id: 'agent-loop-guide', label: 'Agent Loop：任务模板与停止条件' },
    ],
  },
];
