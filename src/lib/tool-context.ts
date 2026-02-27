import type { Tool } from '@prisma/client';

type SourceLink = {
  label: string;
  url: string;
};

export type ToolContext = {
  heroImage: string;
  imageAlt: string;
  quickFacts: string[];
  workflowAngles: string[];
  newsletterHook: string;
  sources: SourceLink[];
};

const fallbackContext: ToolContext = {
  heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1400&auto=format&fit=crop',
  imageAlt: 'Abstract artificial intelligence visual',
  quickFacts: ['Used by creators to speed up production workflows.', 'Combines automation with creative output support.'],
  workflowAngles: ['Set one measurable outcome before you open the tool.', 'Use a repeatable template so each output improves week over week.'],
  newsletterHook: 'Use one focused workflow this week and track the quality lift.',
  sources: []
};

const toolContextBySlug: Record<string, ToolContext> = {
  chatgpt: {
    heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Conversational AI interface on a laptop',
    quickFacts: [
      'ChatGPT supports text, image, and voice interactions in a single interface.',
      'Teams can build reusable GPTs to standardize prompts and outputs.',
      'It is commonly used for ideation, drafting, coding help, and research synthesis.'
    ],
    workflowAngles: [
      'Create a reusable system prompt for your brand voice and keep it in one shared document.',
      'Pair ChatGPT with a publishing checklist to reduce revisions before posting.'
    ],
    newsletterHook: 'Draft your next three content angles in one session, then batch-edit for tone.',
    sources: [
      { label: 'OpenAI - ChatGPT', url: 'https://openai.com/chatgpt/' },
      { label: 'OpenAI - ChatGPT Pricing', url: 'https://openai.com/chatgpt/pricing/' }
    ]
  },
  claude: {
    heroImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'AI assistant concept with natural language text',
    quickFacts: [
      'Claude is positioned for writing, analysis, and coding workflows.',
      'The platform offers plans for individual users and teams.',
      'Many creators use it for long-form drafting and structured editing passes.'
    ],
    workflowAngles: [
      'Use one pass for structure and a second pass for clarity to improve long-form quality.',
      'Feed prior newsletter issues to maintain a consistent editorial voice.'
    ],
    newsletterHook: 'Run an outline-first writing workflow before drafting full posts.',
    sources: [
      { label: 'Anthropic - Claude', url: 'https://www.anthropic.com/claude' },
      { label: 'Anthropic - Pricing', url: 'https://www.anthropic.com/pricing' }
    ]
  },
  midjourney: {
    heroImage: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Stylized AI generated art concept',
    quickFacts: [
      'Midjourney focuses on prompt-based image generation with stylized outputs.',
      'Core controls include aspect ratio, stylization, and variation options.',
      'Creators use it for concept art, thumbnails, and brand exploration.'
    ],
    workflowAngles: [
      'Keep a prompt library of your best styles and reuse it for visual consistency.',
      'Generate multiple composition variants before finalizing campaign assets.'
    ],
    newsletterHook: 'Build a visual moodboard with 20 prompt variations before design lock-in.',
    sources: [
      { label: 'Midjourney Docs - Quick Start', url: 'https://docs.midjourney.com/docs/quick-start' },
      { label: 'Midjourney Docs - Plans', url: 'https://docs.midjourney.com/docs/plans' }
    ]
  },
  'canva-ai': {
    heroImage: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Colorful digital design board',
    quickFacts: [
      'Canva Magic Studio includes AI generation and editing workflows inside Canva.',
      'It supports creator tasks like writing, resizing, and image/video assistance.',
      'Teams use templates to keep brand output consistent across channels.'
    ],
    workflowAngles: [
      'Start from one approved template and produce channel-specific variants quickly.',
      'Combine AI-assisted copy with design templates for faster campaign launches.'
    ],
    newsletterHook: 'Turn one hero design into platform-specific assets in a single batch session.',
    sources: [
      { label: 'Canva - Magic Studio', url: 'https://www.canva.com/magic-studio/' },
      { label: 'Canva - Pricing', url: 'https://www.canva.com/pricing/' }
    ]
  },
  descript: {
    heroImage: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Podcast recording and video editing setup',
    quickFacts: [
      'Descript offers text-based editing for audio and video projects.',
      'It includes features for transcription and voice/video cleanup workflows.',
      'Creators use it to accelerate podcast and short-form repurposing.'
    ],
    workflowAngles: [
      'Edit transcript text first, then polish timing and visuals.',
      'Use transcript highlights to generate social clips and show notes quickly.'
    ],
    newsletterHook: 'Repurpose one long recording into clips, captions, and summary copy in one workflow.',
    sources: [
      { label: 'Descript - Product', url: 'https://www.descript.com/' },
      { label: 'Descript - Overdub', url: 'https://www.descript.com/features/overdub' }
    ]
  },
  'capcut-ai': {
    heroImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Mobile first video editing workflow',
    quickFacts: [
      'CapCut provides AI-assisted video editing tools for fast social production.',
      'The platform emphasizes mobile-friendly creation and quick publishing workflows.',
      'Creators use it for captions, short edits, and trend-driven content iterations.'
    ],
    workflowAngles: [
      'Create a repeatable short-form template with hook, proof, and CTA segments.',
      'Batch-produce clips from one raw recording to increase posting frequency.'
    ],
    newsletterHook: 'Use one raw video to create five testable short clips this week.',
    sources: [
      { label: 'CapCut - AI Video Generator', url: 'https://www.capcut.com/tools/ai-video-generator' },
      { label: 'CapCut - Video Editor', url: 'https://www.capcut.com/tools/video-editor' }
    ]
  },
  zapier: {
    heroImage: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Automation workflow dashboard',
    quickFacts: [
      'Zapier connects apps through trigger-action automation workflows.',
      'Its app ecosystem is widely used for no-code operational automations.',
      'Creators use Zaps to route leads, publish updates, and sync campaign data.'
    ],
    workflowAngles: [
      'Automate repetitive post-publish tasks so every content release follows the same checklist.',
      'Use one intake form to trigger drafting, review, and distribution steps automatically.'
    ],
    newsletterHook: 'Automate your post-publication checklist to reclaim execution time.',
    sources: [
      { label: 'Zapier - Platform Overview', url: 'https://zapier.com/' },
      { label: 'Zapier - Pricing', url: 'https://zapier.com/pricing' }
    ]
  },
  make: {
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Complex automation graph and flow map',
    quickFacts: [
      'Make offers visual scenario builders for multi-step automations.',
      'Its drag-and-drop approach is popular for custom logic and branching flows.',
      'Operators and routers let teams build advanced automation behavior without full code.'
    ],
    workflowAngles: [
      'Map your workflow end-to-end before building scenarios to avoid hidden edge cases.',
      'Add error routes early so failed tasks do not silently block downstream publishing.'
    ],
    newsletterHook: 'Audit one manual workflow and convert it into a branching scenario this week.',
    sources: [
      { label: 'Make - Platform', url: 'https://www.make.com/' },
      { label: 'Make - What is Make', url: 'https://www.make.com/en/help/getting-started/what-is-make' }
    ]
  },
  'notion-ai': {
    heroImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Knowledge management and writing workspace',
    quickFacts: [
      'Notion AI is embedded in Notion documents and workspace workflows.',
      'It supports writing, summarization, and organization across team knowledge.',
      'Creators use it to manage editorial calendars and content operations in one workspace.'
    ],
    workflowAngles: [
      'Store briefs, prompts, and publishing notes in one linked database.',
      'Use AI summaries to turn meeting notes into immediately actionable tasks.'
    ],
    newsletterHook: 'Unify your content planning and drafting system in one workspace to reduce context switching.',
    sources: [
      { label: 'Notion - AI', url: 'https://www.notion.com/product/ai' },
      { label: 'Notion - Pricing', url: 'https://www.notion.com/pricing' }
    ]
  },
  beehiiv: {
    heroImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Newsletter creation and publishing workflow',
    quickFacts: [
      'Beehiiv is focused on newsletter publishing, growth, and monetization workflows.',
      'It includes audience segmentation and publishing features for operators and creators.',
      'Teams use it to run editorial newsletters with analytics and referral loops.'
    ],
    workflowAngles: [
      'Create one repeatable issue template with sections for insight, example, and CTA.',
      'Pair segmentation with targeted CTAs to increase click and conversion rates.'
    ],
    newsletterHook: 'Ship one high-signal issue weekly using a fixed format and segmented call-to-action.',
    sources: [
      { label: 'beehiiv - Features', url: 'https://www.beehiiv.com/features' },
      { label: 'beehiiv - Pricing', url: 'https://www.beehiiv.com/pricing' }
    ]
  },
  'google-gemini': {
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'AI assistant running on a laptop interface',
    quickFacts: [
      'Gemini is Google AI assistant with multimodal capabilities for writing and research workflows.',
      'It integrates with Google ecosystem workflows for documents and productivity tasks.',
      'Creators use it for idea generation, summarization, and drafting with quick iteration cycles.'
    ],
    workflowAngles: [
      'Use Gemini to produce first-pass research notes and then validate with primary sources.',
      'Create one reusable prompt template for your content pillars and run weekly batches.'
    ],
    newsletterHook: 'Run one weekly research-to-draft sprint in Gemini to reduce prep time.',
    sources: [
      { label: 'Google Gemini', url: 'https://gemini.google.com/' },
      { label: 'Google Workspace with Gemini', url: 'https://workspace.google.com/gemini/' }
    ]
  },
  perplexity: {
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Research dashboard and analytics concept',
    quickFacts: [
      'Perplexity is an answer engine focused on citation-backed responses and research speed.',
      'It is frequently used to gather source-linked summaries before writing production drafts.',
      'Operators use it to accelerate competitive and trend research workflows.'
    ],
    workflowAngles: [
      'Start with Perplexity for source discovery, then move final drafting into your writing tool.',
      'Collect citations in one document so downstream scripts and newsletters stay grounded in sources.'
    ],
    newsletterHook: 'Build a source-backed trend brief in under 20 minutes before every content sprint.',
    sources: [
      { label: 'Perplexity', url: 'https://www.perplexity.ai/' },
      { label: 'Perplexity Enterprise Pro', url: 'https://www.perplexity.ai/enterprise-pro' }
    ]
  },
  'github-copilot': {
    heroImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Developer coding with AI assistant suggestions',
    quickFacts: [
      'GitHub Copilot is an AI coding assistant used in popular IDE environments.',
      'Teams use it for drafting code, tests, and implementation scaffolding.',
      'It can accelerate technical content and product-building workflows when paired with code review.'
    ],
    workflowAngles: [
      'Use Copilot for first-pass implementation, then enforce manual review and test gates.',
      'Pair generated code with explicit acceptance criteria before merge or publish.'
    ],
    newsletterHook: 'Turn one technical idea into a working prototype faster with Copilot-assisted scaffolding.',
    sources: [
      { label: 'GitHub Copilot', url: 'https://github.com/features/copilot' },
      { label: 'Copilot Documentation', url: 'https://docs.github.com/en/copilot' }
    ]
  },
  runway: {
    heroImage: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Video post production interface with cinematic footage',
    quickFacts: [
      'Runway provides AI-assisted video generation and editing workflows.',
      'Creators use it for concept videos, visual effects, and ad creative iteration.',
      'Output quality improves significantly with iterative prompt and style controls.'
    ],
    workflowAngles: [
      'Generate multiple short concept cuts before committing to one final edit direction.',
      'Keep a style prompt library to improve consistency across campaign visuals.'
    ],
    newsletterHook: 'Prototype three ad concepts in Runway before full production spend.',
    sources: [
      { label: 'Runway', url: 'https://runwayml.com/' },
      { label: 'Runway Learn', url: 'https://help.runwayml.com/hc/en-us' }
    ]
  },
  elevenlabs: {
    heroImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Audio recording setup with microphones',
    quickFacts: [
      'ElevenLabs focuses on AI voice generation, dubbing, and speech workflows.',
      'It is used for narration pipelines in podcasts, tutorials, and short-form content.',
      'Voice quality improves when scripts are written for spoken cadence first.'
    ],
    workflowAngles: [
      'Draft scripts in short spoken phrases, then generate voiceover and adjust pacing.',
      'Create a reusable voice style profile and apply it to your recurring series.'
    ],
    newsletterHook: 'Build a repeatable voiceover process for tutorials without full studio recording.',
    sources: [
      { label: 'ElevenLabs', url: 'https://elevenlabs.io/' },
      { label: 'ElevenLabs Docs', url: 'https://elevenlabs.io/docs' }
    ]
  },
  synthesia: {
    heroImage: 'https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Digital presenter and studio setup',
    quickFacts: [
      'Synthesia creates avatar-based videos for explainers, training, and onboarding.',
      'Teams use it to scale scripted instructional content without live recording.',
      'It works best with concise scripts and clearly segmented scene structure.'
    ],
    workflowAngles: [
      'Write short scene-by-scene scripts and keep each segment focused on one learning objective.',
      'Use one visual style template across all training modules for consistency.'
    ],
    newsletterHook: 'Ship training-style video tutorials faster with scripted avatar workflows.',
    sources: [
      { label: 'Synthesia', url: 'https://www.synthesia.io/' },
      { label: 'Synthesia Academy', url: 'https://academy.synthesia.io/' }
    ]
  },
  heygen: {
    heroImage: 'https://images.unsplash.com/photo-1574717024453-3540567f3a2b?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'AI generated presenter video on a monitor',
    quickFacts: [
      'HeyGen provides avatar video generation and localization workflows.',
      'Creators use it for tutorials, UGC-style ads, and multilingual videos.',
      'Strong scripting and scene direction are key to authentic final outputs.'
    ],
    workflowAngles: [
      'Build one master script, then localize variants for each audience segment.',
      'Use consistent opening hooks and CTA patterns across avatar videos.'
    ],
    newsletterHook: 'Create multilingual tutorial variants from one core script in a single workflow.',
    sources: [
      { label: 'HeyGen', url: 'https://www.heygen.com/' },
      { label: 'HeyGen Help Center', url: 'https://help.heygen.com/' }
    ]
  },
  jasper: {
    heroImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Marketing copy planning workspace',
    quickFacts: [
      'Jasper is a marketing-focused AI writing platform with brand voice controls.',
      'Teams use it for campaign copy, ads, and conversion-focused messaging.',
      'It is commonly adopted in content operations with frequent campaign production.'
    ],
    workflowAngles: [
      'Set clear campaign goals and audience segments before generating any copy variants.',
      'Use one brand voice profile and run iterative conversion copy tests weekly.'
    ],
    newsletterHook: 'Run faster campaign copy experiments with a controlled brand voice workflow.',
    sources: [
      { label: 'Jasper', url: 'https://www.jasper.ai/' },
      { label: 'Jasper Pricing', url: 'https://www.jasper.ai/pricing' }
    ]
  },
  'grammarly-ai': {
    heroImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Writing and editing interface on a laptop',
    quickFacts: [
      'Grammarly combines grammar, clarity, and tone guidance in one writing assistant.',
      'Creators use it as a final quality-control pass before publication.',
      'It is most effective when applied after structure and message are already finalized.'
    ],
    workflowAngles: [
      'Complete your content draft first, then run Grammarly as a dedicated polish step.',
      'Create style goals per channel to keep tone consistent across platforms.'
    ],
    newsletterHook: 'Reduce avoidable writing errors by adding one final quality pass before publishing.',
    sources: [
      { label: 'Grammarly', url: 'https://www.grammarly.com/' },
      { label: 'Grammarly AI Writing Assistance', url: 'https://www.grammarly.com/ai-writing-assistant' }
    ]
  },
  'fireflies-ai': {
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Meeting notes and collaboration workspace',
    quickFacts: [
      'Fireflies records, transcribes, and summarizes meetings for teams.',
      'It helps operators turn calls into searchable notes and action items.',
      'Creators use it to capture interview and client call insights for content repurposing.'
    ],
    workflowAngles: [
      'Tag high-signal moments during calls and route action items into your content backlog.',
      'Turn one meeting summary into a weekly content brief with next-step tasks.'
    ],
    newsletterHook: 'Transform meeting transcripts into clear action plans and content angles automatically.',
    sources: [
      { label: 'Fireflies AI', url: 'https://fireflies.ai/' },
      { label: 'Fireflies Product Tour', url: 'https://fireflies.ai/product' }
    ]
  }
};

export function getToolContext(slug: string): ToolContext {
  return toolContextBySlug[slug] ?? fallbackContext;
}

export function buildToolBlogSections(tool: Tool, context: ToolContext) {
  return [
    {
      title: `What ${tool.name} is good at`,
      body: `${tool.name} is a strong option for ${tool.bestFor ?? 'creator workflows'} and works well when paired with clear process constraints. ${context.quickFacts[0] ?? ''} ${context.quickFacts[1] ?? ''}`.trim()
    },
    {
      title: 'How creators can operationalize it',
      body: `Most teams underuse AI tools because they rely on one-off prompts. A better approach is to set a weekly operating rhythm, then apply the tool to repeated bottlenecks. ${context.workflowAngles.join(' ')}`
    },
    {
      title: 'Execution checklist',
      body: `Start with one use case tied to output quality or speed. Track a baseline for two weeks, then compare the improvement after introducing ${tool.name}. Keep what works, remove anything that adds complexity, and document the final workflow for repeatability.`
    }
  ];
}

export function buildNewsletterHtml() {
  const issueDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const sections = Object.entries(toolContextBySlug)
    .map(([slug, context]) => {
      const name = slug
        .split('-')
        .map((part) => part[0].toUpperCase() + part.slice(1))
        .join(' ');

      return `
        <tr>
          <td style="padding: 0 0 20px;">
            <h3 style="margin: 0 0 8px; font-size: 18px; color: #0f172a;">${name}</h3>
            <p style="margin: 0; color: #334155; line-height: 1.55;">${context.newsletterHook}</p>
          </td>
        </tr>
      `;
    })
    .join('');

  return `
    <div style="background:#f8fafc;padding:24px;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;">
        <tr>
          <td>
            <p style="margin:0 0 8px;color:#6366f1;font-weight:700;">CreatorAILab Weekly Brief</p>
            <h1 style="margin:0 0 10px;font-size:26px;color:#0f172a;">AI Tool Playbook - ${issueDate}</h1>
            <p style="margin:0 0 20px;color:#475569;line-height:1.6;">This issue gives you one concrete execution idea per tool so you can ship faster without adding operational chaos.</p>
          </td>
        </tr>
        ${sections}
        <tr>
          <td style="padding-top:8px;border-top:1px solid #e2e8f0;">
            <p style="margin:10px 0 0;color:#64748b;font-size:13px;line-height:1.5;">You are receiving this because you subscribed at CreatorAILab.</p>
          </td>
        </tr>
      </table>
    </div>
  `;
}
