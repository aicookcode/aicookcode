// Curated by the task a reader wants to complete, rather than publication date.
export const learningPaths = [
  {
    id: 'ai-workflow',
    title: '让 AI 按验收标准完成任务',
    description: '从写清任务，到设置循环与停止条件，最后检查应用是否可交付。',
    topics: ['ai'],
    steps: [
      { id: 'ai-prompt-workflow', goal: '写清目标、上下文与验收条件' },
      { id: 'agent-loop-guide', goal: '复制 Loop 模板，执行并检查每一轮结果' },
      { id: 'ai-app-checklist', goal: '补齐错误处理、用量与交付检查' },
    ],
  },
  {
    id: 'ai-tutor',
    title: '围绕教材搭建 AI 家教',
    description: '先理解模型密钥的配置边界，再导入一小段教材，验证引用、练习和错题复习。',
    topics: ['ai', 'github'],
    steps: [
      { id: 'environment-variables', goal: '配置模型前，先保护好 API 密钥' },
      { id: 'ai-tutor-kids', goal: '配置 DeepTutor，用一节教材验收辅导效果' },
    ],
  },
];
