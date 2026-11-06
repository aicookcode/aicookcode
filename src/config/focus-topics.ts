// Curated guides use existing substantive articles, never empty keyword landing pages.
export const focusTopics = [
  {
    slug: 'workbuddy', name: 'WorkBuddy 使用教程',
    title: 'WorkBuddy 教程：设置、微信小程序开发与上线',
    description: '从自定义指令、记忆和技能设置开始，用 WorkBuddy 开发微信小程序，再完成真机测试、体验版与审核发布。',
    introduction: '第一次使用先看设置；已经有小程序需求，可以直接进入开发篇。开发篇负责跑通模拟器，上线篇接着处理真机、体验权限与发布。',
    steps: [
      { id: 'workbuddy-5-settings', goal: '先配置自定义指令、记忆、技能更新与备份。' },
      { id: 'workbuddy-mini-program-development', goal: '拆解需求、建立工作空间，导入微信开发者工具。' },
      { id: 'workbuddy-mini-program-launch', goal: '检查真机、体验版、上传和审核发布流程。' },
    ],
  },
  {
    slug: 'ai-avatar', name: 'AI 数字人与配音',
    title: 'AI 数字人口播教程：照片、声音克隆与视频制作',
    description: '按照片准备、短音频验证、声音克隆和口播视频的顺序，阅读 AI 数字人与 Qwen3-TTS、ZipVoice 本地配音实战。',
    introduction: '想做第一条口播视频，先看照片数字人实战；需要持续换稿配音，再看本地声音克隆。先验证短样本的音色、读音与画面，再投入完整视频。',
    steps: [
      { id: 'ai-talking-avatar', goal: '用一张照片和短音频检查人物、声音与口型。' },
      { id: 'local-voice-cloning', goal: '按实测机器配置运行 Qwen3-TTS 与 ZipVoice。' },
      { id: 'voice-clone-local-tool', goal: '了解 VoiceStudio 的模型、录音与转录选择。' },
    ],
  },
  {
    slug: 'ui-assets', name: 'UI 素材与页面还原',
    title: 'UI 素材提取与页面还原：切图 Skill 和网站复刻教程',
    description: '从 UI 设计稿提取背景、图标和装饰，再用素材还原页面；结合 ui-assets-skill 实测与 Open Lovable 网站复刻验收流程。',
    introduction: '手里有设计图时，先提取可复用素材；需要从公开网页搭建预览时，再看网站复刻流程。完成后逐项检查布局、资源、交互和后端功能。',
    steps: [
      { id: 'ui-assets-skill', goal: '从设计稿识别、检查并打包背景和装饰素材。' },
      { id: 'website-clone-ai', goal: '生成 React 页面并检查资源、交互与功能边界。' },
    ],
  },
];
