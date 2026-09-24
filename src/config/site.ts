export const site = {
  name: 'AICookCode',
  title: 'AICookCode - AI 应用与编程实践',
  description: '记录 AI 应用、编程实践、独立建站和开发工具，分享从想法到上线的真实过程。',
  url: 'https://aicookcode.com',
  author: 'AI 煮代码汤',
  authorUrl: '/about/',
  // Public repository for authorship and organization metadata.
  githubUrl: 'https://github.com/aicookcode/aicookcode',
  contact: {
    email: 'hello@aicookcode.com',
    xUrl: 'https://x.com/aicookcode',
    wechatUrl: '',
    wechatId: 'aicookcode',
    telegramUrl: 'https://t.me/aicookcode',
  },
};

export const navItems = [
  { label: '首页', href: '/' },
  { label: '文章', href: '/articles/' },
  { label: '专题', href: '/topics/' },
  { label: '开源项目', href: '/projects/' },
  { label: '关于', href: '/about/' },
] as const;

export const featureModules = [
  {
    title: '技术博客',
    description: 'AI 应用、GitHub 实践与开发方法的持续记录。',
    href: '/articles/',
    icon: 'book',
    status: 'live',
  },
  {
    title: '开源项目',
    description: '整理正在使用、研究和推荐的开源工具。',
    href: '/projects/',
    icon: 'project',
    status: 'live',
  },
] as const;

export const categories = [
  { name: 'AI 应用', slug: 'ai', description: '从一个想法，到一个可用的 AI 应用。', color: 'green', icon: 'sparkles' },
  { name: 'GitHub 实践', slug: 'github', description: '版本管理、开源协作与自动化工作流。', color: 'violet', icon: 'git' },
  { name: '建站笔记', slug: 'web', description: '用轻量的技术栈，搭建自己的互联网空间。', color: 'orange', icon: 'globe' },
  { name: '开发工具', slug: 'tools', description: '让日常开发更顺手的工具与方法。', color: 'blue', icon: 'terminal' },
] as const;

export const categorySlug = (name: string) => categories.find((item) => item.name === name)?.slug ?? 'all';
