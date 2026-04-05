export const LEADERBOARD_CATEGORIES = [
  'text',
  'code',
  'thinking',
  'debugging',
  'ui-ux',
  'automation',
  'editing',
  'video-generation',
  'image-generation',
  'document-scanning',
  'ai-agents'
] as const;

export type LeaderboardCategory = (typeof LEADERBOARD_CATEGORIES)[number];

export type LeaderboardModel = {
  id: string;
  name: string;
  slug: string;
  organization: string;
  orgAbbrev: string;
  license: 'proprietary' | 'open-source';
  contextWindow: number;
  pricingInput: number | null;
  pricingOutput: number | null;
  releaseDate: string;
  categoryScores: Record<LeaderboardCategory, number | null>;
};

export const CATEGORY_META: Record<
  LeaderboardCategory,
  { label: string; description: string }
> = {
  text: {
    label: 'Text',
    description: 'General-purpose text generation, writing, and conversation'
  },
  code: {
    label: 'Code',
    description: 'Code generation, completion, and software engineering tasks'
  },
  thinking: {
    label: 'Thinking',
    description: 'Multi-step reasoning, chain-of-thought, and complex analysis'
  },
  debugging: {
    label: 'Debugging',
    description: 'Bug identification, root-cause analysis, and fix suggestions'
  },
  'ui-ux': {
    label: 'UI/UX',
    description: 'User interface design, prototyping, and UX recommendations'
  },
  automation: {
    label: 'Automation',
    description: 'Workflow automation, integration building, and task orchestration'
  },
  editing: {
    label: 'Editing',
    description: 'Content editing, rewriting, proofreading, and style refinement'
  },
  'video-generation': {
    label: 'Video Generation',
    description: 'AI-powered video creation, editing, and synthesis'
  },
  'image-generation': {
    label: 'Image Generation',
    description: 'Image creation, art generation, and visual design'
  },
  'document-scanning': {
    label: 'Document Scanning',
    description: 'OCR, document understanding, extraction, and structured parsing'
  },
  'ai-agents': {
    label: 'AI Agents',
    description: 'Autonomous task execution, tool use, and multi-step planning'
  }
};

function m(model: LeaderboardModel): LeaderboardModel {
  return model;
}

export const leaderboardModels: LeaderboardModel[] = [
  m({
    id: 'gpt-5',
    name: 'GPT-5',
    slug: 'gpt-5',
    organization: 'OpenAI',
    orgAbbrev: 'OA',
    license: 'proprietary',
    contextWindow: 1_000_000,
    pricingInput: 5,
    pricingOutput: 15,
    releaseDate: '2025-12-18',
    categoryScores: {
      text: 95,
      code: 93,
      thinking: 94,
      debugging: 92,
      'ui-ux': 82,
      automation: 85,
      editing: 93,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': 88,
      'ai-agents': 91
    }
  }),
  m({
    id: 'gpt-5-mini',
    name: 'GPT-5 Mini',
    slug: 'gpt-5-mini',
    organization: 'OpenAI',
    orgAbbrev: 'OA',
    license: 'proprietary',
    contextWindow: 512_000,
    pricingInput: 0.4,
    pricingOutput: 1.6,
    releaseDate: '2026-01-15',
    categoryScores: {
      text: 88,
      code: 85,
      thinking: 83,
      debugging: 82,
      'ui-ux': 72,
      automation: 78,
      editing: 86,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': 79,
      'ai-agents': 80
    }
  }),
  m({
    id: 'claude-opus-4-6',
    name: 'Claude Opus 4.6',
    slug: 'claude-opus-4-6',
    organization: 'Anthropic',
    orgAbbrev: 'AN',
    license: 'proprietary',
    contextWindow: 200_000,
    pricingInput: 15,
    pricingOutput: 75,
    releaseDate: '2026-02-10',
    categoryScores: {
      text: 96,
      code: 95,
      thinking: 97,
      debugging: 95,
      'ui-ux': 86,
      automation: 84,
      editing: 95,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': 90,
      'ai-agents': 94
    }
  }),
  m({
    id: 'claude-sonnet-4-6',
    name: 'Claude Sonnet 4.6',
    slug: 'claude-sonnet-4-6',
    organization: 'Anthropic',
    orgAbbrev: 'AN',
    license: 'proprietary',
    contextWindow: 200_000,
    pricingInput: 3,
    pricingOutput: 15,
    releaseDate: '2026-02-10',
    categoryScores: {
      text: 91,
      code: 92,
      thinking: 90,
      debugging: 90,
      'ui-ux': 83,
      automation: 82,
      editing: 91,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': 85,
      'ai-agents': 89
    }
  }),
  m({
    id: 'gemini-3-pro',
    name: 'Gemini 3 Pro',
    slug: 'gemini-3-pro',
    organization: 'Google',
    orgAbbrev: 'G',
    license: 'proprietary',
    contextWindow: 2_000_000,
    pricingInput: 3.5,
    pricingOutput: 10.5,
    releaseDate: '2026-01-22',
    categoryScores: {
      text: 93,
      code: 90,
      thinking: 91,
      debugging: 89,
      'ui-ux': 80,
      automation: 83,
      editing: 90,
      'video-generation': null,
      'image-generation': 78,
      'document-scanning': 93,
      'ai-agents': 88
    }
  }),
  m({
    id: 'gemini-3-flash',
    name: 'Gemini 3 Flash',
    slug: 'gemini-3-flash',
    organization: 'Google',
    orgAbbrev: 'G',
    license: 'proprietary',
    contextWindow: 1_000_000,
    pricingInput: 0.15,
    pricingOutput: 0.6,
    releaseDate: '2026-01-22',
    categoryScores: {
      text: 85,
      code: 82,
      thinking: 79,
      debugging: 78,
      'ui-ux': 68,
      automation: 76,
      editing: 83,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': 82,
      'ai-agents': 75
    }
  }),
  m({
    id: 'grok-4',
    name: 'Grok 4',
    slug: 'grok-4',
    organization: 'xAI',
    orgAbbrev: 'xAI',
    license: 'proprietary',
    contextWindow: 256_000,
    pricingInput: 3,
    pricingOutput: 15,
    releaseDate: '2026-02-20',
    categoryScores: {
      text: 92,
      code: 91,
      thinking: 93,
      debugging: 91,
      'ui-ux': 77,
      automation: 80,
      editing: 89,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': 82,
      'ai-agents': 87
    }
  }),
  m({
    id: 'llama-4-405b',
    name: 'Llama 4 405B',
    slug: 'llama-4-405b',
    organization: 'Meta',
    orgAbbrev: 'M',
    license: 'open-source',
    contextWindow: 128_000,
    pricingInput: 0.8,
    pricingOutput: 2.4,
    releaseDate: '2026-01-08',
    categoryScores: {
      text: 89,
      code: 87,
      thinking: 86,
      debugging: 85,
      'ui-ux': 73,
      automation: 77,
      editing: 87,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': 78,
      'ai-agents': 82
    }
  }),
  m({
    id: 'llama-4-70b',
    name: 'Llama 4 70B',
    slug: 'llama-4-70b',
    organization: 'Meta',
    orgAbbrev: 'M',
    license: 'open-source',
    contextWindow: 128_000,
    pricingInput: 0.18,
    pricingOutput: 0.54,
    releaseDate: '2026-01-08',
    categoryScores: {
      text: 83,
      code: 80,
      thinking: 78,
      debugging: 77,
      'ui-ux': 64,
      automation: 70,
      editing: 81,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': 71,
      'ai-agents': 73
    }
  }),
  m({
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    slug: 'deepseek-v3',
    organization: 'DeepSeek',
    orgAbbrev: 'DS',
    license: 'open-source',
    contextWindow: 128_000,
    pricingInput: 0.27,
    pricingOutput: 1.1,
    releaseDate: '2025-12-28',
    categoryScores: {
      text: 87,
      code: 89,
      thinking: 88,
      debugging: 86,
      'ui-ux': 70,
      automation: 74,
      editing: 84,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': 76,
      'ai-agents': 81
    }
  }),
  m({
    id: 'mistral-large-3',
    name: 'Mistral Large 3',
    slug: 'mistral-large-3',
    organization: 'Mistral',
    orgAbbrev: 'MI',
    license: 'proprietary',
    contextWindow: 128_000,
    pricingInput: 2,
    pricingOutput: 6,
    releaseDate: '2026-02-04',
    categoryScores: {
      text: 88,
      code: 86,
      thinking: 85,
      debugging: 84,
      'ui-ux': 72,
      automation: 76,
      editing: 86,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': 80,
      'ai-agents': 79
    }
  }),
  m({
    id: 'qwen-3-72b',
    name: 'Qwen 3 72B',
    slug: 'qwen-3-72b',
    organization: 'Alibaba',
    orgAbbrev: 'AL',
    license: 'open-source',
    contextWindow: 128_000,
    pricingInput: 0.2,
    pricingOutput: 0.6,
    releaseDate: '2026-01-18',
    categoryScores: {
      text: 84,
      code: 83,
      thinking: 82,
      debugging: 80,
      'ui-ux': 66,
      automation: 72,
      editing: 82,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': 77,
      'ai-agents': 76
    }
  }),
  m({
    id: 'codestral-2',
    name: 'Codestral 2',
    slug: 'codestral-2',
    organization: 'Mistral',
    orgAbbrev: 'MI',
    license: 'proprietary',
    contextWindow: 256_000,
    pricingInput: 0.3,
    pricingOutput: 0.9,
    releaseDate: '2026-02-04',
    categoryScores: {
      text: 72,
      code: 91,
      thinking: 80,
      debugging: 89,
      'ui-ux': 75,
      automation: 78,
      editing: 70,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': null,
      'ai-agents': 83
    }
  }),
  m({
    id: 'github-copilot',
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    organization: 'GitHub / OpenAI',
    orgAbbrev: 'GH',
    license: 'proprietary',
    contextWindow: 128_000,
    pricingInput: null,
    pricingOutput: null,
    releaseDate: '2026-01-30',
    categoryScores: {
      text: 70,
      code: 90,
      thinking: 76,
      debugging: 88,
      'ui-ux': 78,
      automation: 80,
      editing: 72,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': null,
      'ai-agents': 85
    }
  }),
  m({
    id: 'devin',
    name: 'Devin',
    slug: 'devin',
    organization: 'Cognition',
    orgAbbrev: 'CO',
    license: 'proprietary',
    contextWindow: 128_000,
    pricingInput: null,
    pricingOutput: null,
    releaseDate: '2025-12-10',
    categoryScores: {
      text: 62,
      code: 88,
      thinking: 84,
      debugging: 91,
      'ui-ux': 76,
      automation: 90,
      editing: 60,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': null,
      'ai-agents': 95
    }
  }),
  m({
    id: 'midjourney-v7',
    name: 'Midjourney v7',
    slug: 'midjourney-v7',
    organization: 'Midjourney',
    orgAbbrev: 'MJ',
    license: 'proprietary',
    contextWindow: 0,
    pricingInput: null,
    pricingOutput: null,
    releaseDate: '2026-01-20',
    categoryScores: {
      text: null,
      code: null,
      thinking: null,
      debugging: null,
      'ui-ux': 90,
      automation: null,
      editing: null,
      'video-generation': null,
      'image-generation': 97,
      'document-scanning': null,
      'ai-agents': null
    }
  }),
  m({
    id: 'dall-e-4',
    name: 'DALL-E 4',
    slug: 'dall-e-4',
    organization: 'OpenAI',
    orgAbbrev: 'OA',
    license: 'proprietary',
    contextWindow: 0,
    pricingInput: null,
    pricingOutput: null,
    releaseDate: '2026-02-12',
    categoryScores: {
      text: null,
      code: null,
      thinking: null,
      debugging: null,
      'ui-ux': 82,
      automation: null,
      editing: null,
      'video-generation': null,
      'image-generation': 93,
      'document-scanning': null,
      'ai-agents': null
    }
  }),
  m({
    id: 'stable-diffusion-35',
    name: 'Stable Diffusion 3.5',
    slug: 'stable-diffusion-35',
    organization: 'Stability AI',
    orgAbbrev: 'SA',
    license: 'open-source',
    contextWindow: 0,
    pricingInput: null,
    pricingOutput: null,
    releaseDate: '2025-11-15',
    categoryScores: {
      text: null,
      code: null,
      thinking: null,
      debugging: null,
      'ui-ux': 70,
      automation: null,
      editing: null,
      'video-generation': null,
      'image-generation': 86,
      'document-scanning': null,
      'ai-agents': null
    }
  }),
  m({
    id: 'flux-pro-2',
    name: 'Flux Pro 2',
    slug: 'flux-pro-2',
    organization: 'Black Forest Labs',
    orgAbbrev: 'BF',
    license: 'proprietary',
    contextWindow: 0,
    pricingInput: null,
    pricingOutput: null,
    releaseDate: '2026-01-10',
    categoryScores: {
      text: null,
      code: null,
      thinking: null,
      debugging: null,
      'ui-ux': 74,
      automation: null,
      editing: null,
      'video-generation': null,
      'image-generation': 91,
      'document-scanning': null,
      'ai-agents': null
    }
  }),
  m({
    id: 'firefly-3',
    name: 'Adobe Firefly 3',
    slug: 'firefly-3',
    organization: 'Adobe',
    orgAbbrev: 'AD',
    license: 'proprietary',
    contextWindow: 0,
    pricingInput: null,
    pricingOutput: null,
    releaseDate: '2025-10-20',
    categoryScores: {
      text: null,
      code: null,
      thinking: null,
      debugging: null,
      'ui-ux': 85,
      automation: null,
      editing: 80,
      'video-generation': null,
      'image-generation': 88,
      'document-scanning': null,
      'ai-agents': null
    }
  }),
  m({
    id: 'runway-gen3',
    name: 'Runway Gen-3 Alpha',
    slug: 'runway-gen3',
    organization: 'Runway',
    orgAbbrev: 'RW',
    license: 'proprietary',
    contextWindow: 0,
    pricingInput: null,
    pricingOutput: null,
    releaseDate: '2025-11-05',
    categoryScores: {
      text: null,
      code: null,
      thinking: null,
      debugging: null,
      'ui-ux': null,
      automation: null,
      editing: null,
      'video-generation': 93,
      'image-generation': null,
      'document-scanning': null,
      'ai-agents': null
    }
  }),
  m({
    id: 'sora-2',
    name: 'Sora 2',
    slug: 'sora-2',
    organization: 'OpenAI',
    orgAbbrev: 'OA',
    license: 'proprietary',
    contextWindow: 0,
    pricingInput: null,
    pricingOutput: null,
    releaseDate: '2026-02-25',
    categoryScores: {
      text: null,
      code: null,
      thinking: null,
      debugging: null,
      'ui-ux': null,
      automation: null,
      editing: null,
      'video-generation': 95,
      'image-generation': null,
      'document-scanning': null,
      'ai-agents': null
    }
  }),
  m({
    id: 'kling-2',
    name: 'Kling 2',
    slug: 'kling-2',
    organization: 'Kuaishou',
    orgAbbrev: 'KS',
    license: 'proprietary',
    contextWindow: 0,
    pricingInput: null,
    pricingOutput: null,
    releaseDate: '2026-01-28',
    categoryScores: {
      text: null,
      code: null,
      thinking: null,
      debugging: null,
      'ui-ux': null,
      automation: null,
      editing: null,
      'video-generation': 90,
      'image-generation': null,
      'document-scanning': null,
      'ai-agents': null
    }
  }),
  m({
    id: 'pika-2',
    name: 'Pika 2',
    slug: 'pika-2',
    organization: 'Pika Labs',
    orgAbbrev: 'PK',
    license: 'proprietary',
    contextWindow: 0,
    pricingInput: null,
    pricingOutput: null,
    releaseDate: '2026-02-15',
    categoryScores: {
      text: null,
      code: null,
      thinking: null,
      debugging: null,
      'ui-ux': null,
      automation: null,
      editing: null,
      'video-generation': 87,
      'image-generation': null,
      'document-scanning': null,
      'ai-agents': null
    }
  }),
  m({
    id: 'google-document-ai',
    name: 'Google Document AI',
    slug: 'google-document-ai',
    organization: 'Google',
    orgAbbrev: 'G',
    license: 'proprietary',
    contextWindow: 0,
    pricingInput: null,
    pricingOutput: null,
    releaseDate: '2025-09-10',
    categoryScores: {
      text: null,
      code: null,
      thinking: null,
      debugging: null,
      'ui-ux': null,
      automation: 72,
      editing: null,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': 96,
      'ai-agents': null
    }
  }),
  m({
    id: 'azure-doc-intelligence',
    name: 'Azure Document Intelligence',
    slug: 'azure-doc-intelligence',
    organization: 'Microsoft',
    orgAbbrev: 'MS',
    license: 'proprietary',
    contextWindow: 0,
    pricingInput: null,
    pricingOutput: null,
    releaseDate: '2025-10-15',
    categoryScores: {
      text: null,
      code: null,
      thinking: null,
      debugging: null,
      'ui-ux': null,
      automation: 70,
      editing: null,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': 92,
      'ai-agents': null
    }
  }),
  m({
    id: 'zapier-central',
    name: 'Zapier Central AI',
    slug: 'zapier-central',
    organization: 'Zapier',
    orgAbbrev: 'ZP',
    license: 'proprietary',
    contextWindow: 0,
    pricingInput: null,
    pricingOutput: null,
    releaseDate: '2026-01-05',
    categoryScores: {
      text: null,
      code: null,
      thinking: null,
      debugging: null,
      'ui-ux': null,
      automation: 92,
      editing: null,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': null,
      'ai-agents': 86
    }
  }),
  m({
    id: 'make-ai',
    name: 'Make AI',
    slug: 'make-ai',
    organization: 'Make',
    orgAbbrev: 'MK',
    license: 'proprietary',
    contextWindow: 0,
    pricingInput: null,
    pricingOutput: null,
    releaseDate: '2025-12-15',
    categoryScores: {
      text: null,
      code: null,
      thinking: null,
      debugging: null,
      'ui-ux': null,
      automation: 88,
      editing: null,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': null,
      'ai-agents': 78
    }
  }),
  m({
    id: 'cursor-agent',
    name: 'Cursor AI',
    slug: 'cursor-agent',
    organization: 'Anysphere',
    orgAbbrev: 'AS',
    license: 'proprietary',
    contextWindow: 200_000,
    pricingInput: null,
    pricingOutput: null,
    releaseDate: '2026-02-18',
    categoryScores: {
      text: 68,
      code: 94,
      thinking: 82,
      debugging: 93,
      'ui-ux': 84,
      automation: 82,
      editing: 74,
      'video-generation': null,
      'image-generation': null,
      'document-scanning': null,
      'ai-agents': 93
    }
  })
];
