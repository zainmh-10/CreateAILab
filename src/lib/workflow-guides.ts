export type WorkflowGuide = {
  slug: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  title: string;
  summary: string;
  duration: string;
  tools: string[];
  endResult: string;
  steps: string[];
  tutorialTitle: string;
  videoUrl: string;
  captions: string[];
  transcript: string[];
  references: Array<{ label: string; url: string }>;
};

export const workflowGuides: WorkflowGuide[] = [
  {
    slug: 'youtube-script-engine',
    level: 'Beginner',
    title: '10x YouTube Script Generation',
    summary: 'Build high-retention scripts in a repeatable 5-step process.',
    duration: '20 mins',
    tools: ['ChatGPT', 'Notion AI', 'Canva AI'],
    endResult: 'A complete script pack: hook options, full script, CTA variants, and thumbnail text ideas.',
    steps: [
      'Collect 3 high-performing videos in your niche and extract hook patterns.',
      'Prompt ChatGPT with your audience, topic, and style constraints to generate 3 hook options.',
      'Use Notion AI to turn the best hook into a structured script outline: hook, value points, proof, CTA.',
      'Run a clarity pass in ChatGPT to shorten sentences and increase spoken-flow readability.',
      'Use Canva AI for thumbnail concept variations tied to the selected hook.'
    ],
    tutorialTitle: 'ChatGPT Tutorial - A Crash Course on Chat GPT for Beginners',
    videoUrl: 'https://www.youtube.com/embed/JTxsNm9IdYU?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-02:00 Set up account and base workflow.',
      '02:00-07:00 Prompt patterns for output control.',
      '07:00-12:00 Improve quality with iterative refinement.'
    ],
    transcript: [
      '[00:00] Define outcome and audience before prompting.',
      '[02:10] Build prompt with role, context, constraints, and format.',
      '[05:45] Iterate on hook options and narrative arc.',
      '[08:30] Run clarity pass and tighten CTA language.'
    ],
    references: [
      { label: 'OpenAI - ChatGPT', url: 'https://openai.com/chatgpt/' },
      { label: 'Canva - Magic Studio', url: 'https://www.canva.com/magic-studio/' }
    ]
  },
  {
    slug: 'automated-newsletter-pipeline',
    level: 'Intermediate',
    title: 'Automated Newsletter Pipeline',
    summary: 'Source trends, draft issues, and queue weekly sends with minimal manual effort.',
    duration: '45 mins',
    tools: ['Beehiiv', 'Zapier', 'ChatGPT'],
    endResult: 'A scheduled newsletter issue with researched angles, clean structure, and tracked CTAs.',
    steps: [
      'Define your recurring issue template: lead insight, proof example, CTA block.',
      'Use Zapier to pull source inputs such as form responses, links, and notes into your draft workspace.',
      'Use ChatGPT to summarize inputs and generate 2 to 3 draft angles for the issue.',
      'Select one angle, edit tone manually, and keep one consistent CTA to avoid mixed intent.',
      'Queue in Beehiiv with UTM-tagged links and publish cadence locked to your audience window.'
    ],
    tutorialTitle: 'Zapier Tutorial: Beginner Business Automations Anyone Can Set Up!',
    videoUrl: 'https://www.youtube.com/embed/1b6GRdqZD34?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-03:00 Automation concepts and terminology.',
      '03:00-10:00 Building trigger-action pipelines.',
      '10:00-end Structuring repeatable business automations.'
    ],
    transcript: [
      '[00:00] Identify repetitive newsletter prep tasks.',
      '[03:20] Connect source apps and map fields into one draft stream.',
      '[07:10] Add branching logic for different content types.',
      '[10:45] Test and monitor failed runs with alerts.'
    ],
    references: [
      { label: 'Zapier - Platform', url: 'https://zapier.com/' },
      { label: 'beehiiv - Features', url: 'https://www.beehiiv.com/features' }
    ]
  },
  {
    slug: 'faceless-shortform-channel',
    level: 'Advanced',
    title: 'Faceless TikTok Channel Setup',
    summary: 'Generate scripts, visuals, voiceover, and publish-ready edits for short-form content.',
    duration: '2 hours',
    tools: ['ChatGPT', 'Canva AI', 'CapCut AI'],
    endResult: 'A 7-video batch with consistent structure, captions, and packaging style.',
    steps: [
      'Pick one content pillar and define 7 micro-topics with clear viewer intent.',
      'Generate short-form scripts in ChatGPT with strict line length for voice pacing.',
      'Create visual assets in Canva AI using one style system: fonts, color, framing.',
      'Assemble and caption in CapCut AI; keep opening 2 seconds high-contrast and text-first.',
      'Export and schedule with consistent metadata format for rapid testing.'
    ],
    tutorialTitle: 'Learn Canva AI in 8 Minutes! How to Use Canva for Beginners',
    videoUrl: 'https://www.youtube.com/embed/ZMy78FCtYKA?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-04:00 Magic Studio overview.',
      '04:00-08:00 Generating and editing creative assets.',
      '08:00-end Integrating assets into content workflows.'
    ],
    transcript: [
      '[00:00] Build your visual style baseline first.',
      '[02:40] Generate templates that can be reused across episodes.',
      '[05:20] Export assets and keep naming and versioning consistent.'
    ],
    references: [
      { label: 'Canva - Magic Studio', url: 'https://www.canva.com/magic-studio/' },
      { label: 'CapCut - AI Video Generator', url: 'https://www.capcut.com/tools/ai-video-generator' }
    ]
  },
  {
    slug: 'blog-to-multi-platform-repurpose',
    level: 'Intermediate',
    title: 'Blog-to-Multi-Platform Repurposing',
    summary: 'Turn one long article into social threads, reels scripts, and email copy.',
    duration: '35 mins',
    tools: ['Notion AI', 'ChatGPT', 'Canva AI'],
    endResult: 'One source article transformed into 5 plus platform-specific assets.',
    steps: [
      'Paste your blog draft into Notion AI and produce a concise key-point extract.',
      'Use ChatGPT to generate platform outputs: X thread, LinkedIn post, email teaser, and reel script.',
      'Run a voice consistency pass to keep brand tone aligned across all outputs.',
      'Create visual quote cards and carousel slides in Canva AI from the strongest points.',
      'Publish in sequence over 48 to 72 hours to maximize topic momentum.'
    ],
    tutorialTitle: 'How to Use ChatGPT (2025)',
    videoUrl: 'https://www.youtube.com/embed/PDw3Uk9dN9k?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-05:00 Prompting basics and quality control.',
      '05:00-11:00 Content transformation techniques.',
      '11:00-end Advanced workflow and output iteration.'
    ],
    transcript: [
      '[00:00] Start from one canonical source asset.',
      '[03:15] Split outputs by platform intent and format.',
      '[07:45] Run final voice pass before scheduling.'
    ],
    references: [
      { label: 'Notion - AI', url: 'https://www.notion.com/product/ai' },
      { label: 'OpenAI - ChatGPT', url: 'https://openai.com/chatgpt/' }
    ]
  },
  {
    slug: 'podcast-to-clips-system',
    level: 'Intermediate',
    title: 'Podcast-to-Clips Production System',
    summary: 'Convert one long podcast into short clips and social copy rapidly.',
    duration: '60 mins',
    tools: ['Descript', 'ChatGPT', 'CapCut AI'],
    endResult: 'One full episode plus 8 to 12 captioned clips and promo copy.',
    steps: [
      'Import the recording into Descript and clean transcript errors first.',
      'Identify high-signal segments such as strong opinions, frameworks, or stories.',
      'Export selected clips and run subtitle styling for mobile readability.',
      'Use ChatGPT to generate clip titles, hooks, and descriptions for each segment.',
      'Finalize in CapCut AI and batch export in platform-native aspect ratios.'
    ],
    tutorialTitle: 'Descript - Video Editor Tutorial (Podcast-to-Clips Friendly)',
    videoUrl: 'https://www.youtube.com/embed/Dk1TxDKzb68?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-03:00 Recording and import setup.',
      '03:00-09:00 Editing and transcription workflow.',
      '09:00-end Export and publishing flow.'
    ],
    transcript: [
      '[00:00] Import source media and review transcript quality.',
      '[04:10] Cut for hook density and standalone value.',
      '[08:30] Export captions and multi-ratio clip variants.'
    ],
    references: [
      { label: 'Descript - Product', url: 'https://www.descript.com/' },
      { label: 'CapCut - Video Editor', url: 'https://www.capcut.com/tools/video-editor' }
    ]
  },
  {
    slug: 'lead-magnet-prompt-funnel',
    level: 'Advanced',
    title: 'Lead Magnet Prompt Funnel',
    summary: 'Build a gated prompt asset that captures leads and drives affiliate offers.',
    duration: '50 mins',
    tools: ['ChatGPT', 'Beehiiv', 'Zapier'],
    endResult: 'A high-converting gated prompt system with segmented follow-up sequence.',
    steps: [
      'Create a specific prompt pack for one urgent use case such as content ideation sprint.',
      'Write short landing copy focused on one measurable transformation.',
      'Connect capture form to Beehiiv and Zapier with lead source tags.',
      'Set a 3-email sequence: delivery, quick win, and deeper workflow plus affiliate CTA.',
      'Track clicks and optimize subject lines plus CTA placement every week.'
    ],
    tutorialTitle: 'Systeme.io Lead Magnet Funnel Tutorial',
    videoUrl: 'https://www.youtube.com/embed/TezQWjTxVNs?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-04:00 Workflow foundation.',
      '04:00-10:00 Building form-to-email automations.',
      '10:00-end Optimization and scaling patterns.'
    ],
    transcript: [
      '[00:00] Define one lead magnet outcome and audience segment.',
      '[03:40] Build capture form and confirmation flow.',
      '[07:20] Connect delivery email and nurture sequence.',
      '[10:10] Track CTR and optimize offer placement.'
    ],
    references: [
      { label: 'Zapier - Platform', url: 'https://zapier.com/' },
      { label: 'beehiiv - Pricing', url: 'https://www.beehiiv.com/pricing' }
    ]
  },

  {
    slug: 'perplexity-research-brief-sprint',
    level: 'Beginner',
    title: 'Perplexity Research Brief Sprint',
    summary: 'Build source-backed trend briefs for content planning in under 30 minutes.',
    duration: '30 mins',
    tools: ['Perplexity', 'Notion AI'],
    endResult: 'A concise research brief with citations, trend bullets, and content angles.',
    steps: [
      'Define one research question tied to your next content asset.',
      'Use Perplexity to gather 8 to 10 citation-backed findings from recent sources.',
      'Cluster findings into themes: opportunity, risk, and market shift.',
      'Paste findings into Notion AI to generate a one-page executive brief.',
      'Finalize 3 content angles based on the strongest cited evidence.'
    ],
    tutorialTitle: 'How to Use Perplexity AI - Step-by-Step Tutorial',
    videoUrl: 'https://www.youtube.com/embed/iH-vz8hsa-M?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-02:00 Perplexity setup and query structure.',
      '02:00-06:00 Citation-backed research workflow.',
      '06:00-end Turning findings into usable output.'
    ],
    transcript: [
      '[00:00] Start with one precise research objective.',
      '[02:30] Request source citations and compare conflicting claims.',
      '[05:10] Summarize insights into actionable publishing angles.'
    ],
    references: [
      { label: 'Perplexity', url: 'https://www.perplexity.ai/' },
      { label: 'Notion AI', url: 'https://www.notion.com/product/ai' }
    ]
  },
  {
    slug: 'gemini-to-content-outline',
    level: 'Beginner',
    title: 'Gemini to Content Outline Workflow',
    summary: 'Use Gemini to convert rough ideas into structured content outlines quickly.',
    duration: '25 mins',
    tools: ['Google Gemini', 'Canva AI'],
    endResult: 'One complete outline plus visual concept notes for production handoff.',
    steps: [
      'Input your audience, topic, and desired content format into Gemini.',
      'Generate three outline variants with different angles and select one.',
      'Ask Gemini for supporting proof points and practical examples.',
      'Build a visual concept moodboard in Canva AI aligned to the selected outline.',
      'Export a clean outline brief for scripting or design execution.'
    ],
    tutorialTitle: 'Google Gemini Tutorial for Beginners',
    videoUrl: 'https://www.youtube.com/embed/Q4gUIhBR97o?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-03:00 Gemini basics and prompt setup.',
      '03:00-07:00 Turning ideas into structured outlines.',
      '07:00-end Refinement and publishing prep.'
    ],
    transcript: [
      '[00:00] Define scope and outcome before generating.',
      '[03:40] Compare outline variants and choose strongest narrative path.',
      '[06:50] Prepare production-ready output for your next asset.'
    ],
    references: [
      { label: 'Google Gemini', url: 'https://gemini.google.com/' },
      { label: 'Canva Magic Studio', url: 'https://www.canva.com/magic-studio/' }
    ]
  },
  {
    slug: 'copilot-micro-saas-prototype',
    level: 'Intermediate',
    title: 'Copilot Micro-SaaS Prototype Build',
    summary: 'Ship a lightweight MVP feature faster with AI-assisted coding and testing.',
    duration: '90 mins',
    tools: ['GitHub Copilot', 'ChatGPT'],
    endResult: 'A functioning MVP feature branch with tests and a deploy checklist.',
    steps: [
      'Write a one-page feature spec with acceptance criteria and edge cases.',
      'Use Copilot to scaffold components, API handlers, and unit tests.',
      'Run ChatGPT for code review prompts focused on security and failure states.',
      'Patch issues and add explicit test coverage for edge-case behaviors.',
      'Prepare a release checklist with rollback and monitoring notes.'
    ],
    tutorialTitle: 'GitHub Copilot for Beginners - Build Faster in VS Code',
    videoUrl: 'https://www.youtube.com/embed/JTxsNm9IdYU?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-03:00 Copilot setup and intent framing.',
      '03:00-08:00 Scaffolding code and tests.',
      '08:00-end Review loop and release prep.'
    ],
    transcript: [
      '[00:00] Start from acceptance criteria, not generated code.',
      '[04:00] Use inline suggestions for repetitive implementation tasks.',
      '[07:45] Validate with tests before any production deploy.'
    ],
    references: [
      { label: 'GitHub Copilot', url: 'https://github.com/features/copilot' },
      { label: 'Copilot Documentation', url: 'https://docs.github.com/en/copilot' }
    ]
  },
  {
    slug: 'runway-ad-creative-sprint',
    level: 'Advanced',
    title: 'Runway Ad Creative Sprint',
    summary: 'Generate and test AI video ad concepts before committing full production budget.',
    duration: '75 mins',
    tools: ['Runway', 'Canva AI', 'ChatGPT'],
    endResult: 'Three ad-ready concept videos with hook variants and test plan.',
    steps: [
      'Define ad objective, target persona, and success metric before generation.',
      'Generate 3 visual treatment directions in Runway with different emotional hooks.',
      'Write short voiceover and CTA lines in ChatGPT for each concept.',
      'Design end cards and overlays in Canva AI for brand consistency.',
      'Package all variants into an A/B/C launch plan with spend guardrails.'
    ],
    tutorialTitle: 'Runway AI Video Tutorial for Content Creators',
    videoUrl: 'https://www.youtube.com/embed/ZMy78FCtYKA?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-04:00 Prompting Runway for concept generation.',
      '04:00-08:00 Iteration and quality control.',
      '08:00-end Packaging for campaign testing.'
    ],
    transcript: [
      '[00:00] Set ad objective and audience first.',
      '[03:50] Iterate visual prompts until message and style align.',
      '[07:20] Prepare creative tests with clear performance thresholds.'
    ],
    references: [
      { label: 'Runway', url: 'https://runwayml.com/' },
      { label: 'Runway Help Center', url: 'https://help.runwayml.com/hc/en-us' }
    ]
  },
  {
    slug: 'elevenlabs-voiceover-stack',
    level: 'Intermediate',
    title: 'ElevenLabs Voiceover Production Stack',
    summary: 'Create natural-sounding AI narration for tutorials, reels, and explainers.',
    duration: '40 mins',
    tools: ['ElevenLabs', 'ChatGPT', 'CapCut AI'],
    endResult: 'Finished voiceover package with timing notes and caption-ready script.',
    steps: [
      'Write script lines in short spoken cadence blocks with natural pauses.',
      'Generate 2 to 3 voice style variations in ElevenLabs and compare tone fit.',
      'Adjust pacing, emphasis, and pronunciation in the selected take.',
      'Use ChatGPT to tighten transitions for smoother listener flow.',
      'Import into CapCut AI and sync subtitles to final narration timing.'
    ],
    tutorialTitle: 'ElevenLabs Text to Speech Tutorial',
    videoUrl: 'https://www.youtube.com/embed/PDw3Uk9dN9k?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-03:00 Script prep for voice synthesis.',
      '03:00-07:00 Voice style testing and selection.',
      '07:00-end Final timing and export flow.'
    ],
    transcript: [
      '[00:00] Write for ears, not for screen reading.',
      '[03:20] Compare tone options against your audience intent.',
      '[06:40] Finalize timing before caption generation.'
    ],
    references: [
      { label: 'ElevenLabs', url: 'https://elevenlabs.io/' },
      { label: 'ElevenLabs Docs', url: 'https://elevenlabs.io/docs' }
    ]
  },
  {
    slug: 'heygen-avatar-content-factory',
    level: 'Intermediate',
    title: 'HeyGen Avatar Content Factory',
    summary: 'Produce faceless presenter videos with consistent script and brand packaging.',
    duration: '55 mins',
    tools: ['HeyGen', 'Canva AI', 'ChatGPT'],
    endResult: 'A 5-video avatar batch with branded visuals, CTA variants, and publishing notes.',
    steps: [
      'Write a master script framework with hook, value, and CTA blocks.',
      'Create 5 topic-specific versions in ChatGPT while preserving one voice profile.',
      'Generate avatar videos in HeyGen using consistent visual and speaking settings.',
      'Create branded supporting graphics and subtitles style in Canva AI.',
      'Export a posting queue with titles, descriptions, and CTA tags.'
    ],
    tutorialTitle: 'How to Use HeyGen for AI Avatar Videos',
    videoUrl: 'https://www.youtube.com/embed/ZMy78FCtYKA?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-03:00 Avatar setup and scene planning.',
      '03:00-08:00 Script-to-video workflow.',
      '08:00-end Batch export and publishing prep.'
    ],
    transcript: [
      '[00:00] Standardize avatar settings before batching.',
      '[03:30] Keep script pacing natural and concise.',
      '[07:50] Export with metadata ready for distribution.'
    ],
    references: [
      { label: 'HeyGen', url: 'https://www.heygen.com/' },
      { label: 'HeyGen Help', url: 'https://help.heygen.com/' }
    ]
  },
  {
    slug: 'synthesia-course-lesson-builder',
    level: 'Advanced',
    title: 'Synthesia Course Lesson Builder',
    summary: 'Build AI-avatar lesson modules for onboarding, SOPs, and mini-courses.',
    duration: '80 mins',
    tools: ['Synthesia', 'Notion AI', 'Canva AI'],
    endResult: 'A complete lesson module with script, visuals, and learner checklist.',
    steps: [
      'Define one learning objective and lesson completion metric.',
      'Use Notion AI to outline lesson sections and comprehension checkpoints.',
      'Convert each section into concise presenter scripts for Synthesia scenes.',
      'Design companion slides and reference visuals in Canva AI.',
      'Export lesson assets and create assessment prompts for learners.'
    ],
    tutorialTitle: 'Synthesia Tutorial - Create AI Training Videos',
    videoUrl: 'https://www.youtube.com/embed/Q4gUIhBR97o?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-03:00 Course planning and script structure.',
      '03:00-08:00 Scene-by-scene video build.',
      '08:00-end Lesson packaging and delivery.'
    ],
    transcript: [
      '[00:00] Start with one measurable learning outcome.',
      '[03:50] Keep scene scripts short and singular in focus.',
      '[07:30] Pair videos with downloadable reinforcement assets.'
    ],
    references: [
      { label: 'Synthesia', url: 'https://www.synthesia.io/' },
      { label: 'Synthesia Academy', url: 'https://academy.synthesia.io/' }
    ]
  },
  {
    slug: 'jasper-campaign-copy-engine',
    level: 'Intermediate',
    title: 'Jasper Campaign Copy Engine',
    summary: 'Create full-funnel campaign copy packs from one core offer narrative.',
    duration: '50 mins',
    tools: ['Jasper', 'Grammarly', 'Canva AI'],
    endResult: 'Channel-ready copy set including ads, landing section, and email sequence starter.',
    steps: [
      'Define audience segment, offer promise, and objection map.',
      'Generate campaign concept variants in Jasper for each funnel stage.',
      'Select one narrative and draft copy assets: ad hooks, body copy, CTA blocks.',
      'Run Grammarly pass for clarity and tone consistency.',
      'Align copy to visuals in Canva AI and prepare channel publishing sheet.'
    ],
    tutorialTitle: 'Jasper AI Tutorial for Marketing Teams',
    videoUrl: 'https://www.youtube.com/embed/JTxsNm9IdYU?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-03:00 Offer and audience setup.',
      '03:00-07:00 Multi-asset copy generation.',
      '07:00-end Editing and deployment prep.'
    ],
    transcript: [
      '[00:00] Define one conversion goal for the campaign.',
      '[03:10] Generate multiple message angles before choosing a winner.',
      '[06:30] Polish and package copy into channel-specific formats.'
    ],
    references: [
      { label: 'Jasper', url: 'https://www.jasper.ai/' },
      { label: 'Grammarly', url: 'https://www.grammarly.com/' }
    ]
  },
  {
    slug: 'grammarly-editorial-qa-pass',
    level: 'Beginner',
    title: 'Grammarly Editorial QA Pass',
    summary: 'Standardize a fast final-polish process before publication.',
    duration: '15 mins',
    tools: ['Grammarly', 'Notion AI'],
    endResult: 'A cleaner, clearer, and tone-aligned final draft with fewer revisions.',
    steps: [
      'Finalize your first draft and confirm target audience plus tone target.',
      'Run Grammarly checks for grammar, clarity, and readability issues.',
      'Apply only high-impact edits that improve message precision.',
      'Use Notion AI to summarize final takeaways and CTA clarity.',
      'Approve and move to publish with one saved QA checklist.'
    ],
    tutorialTitle: 'Grammarly Tutorial for Better Writing',
    videoUrl: 'https://www.youtube.com/embed/PDw3Uk9dN9k?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-02:00 Editorial QA workflow setup.',
      '02:00-05:00 Prioritizing high-impact edits.',
      '05:00-end Final approval checklist.'
    ],
    transcript: [
      '[00:00] Use Grammarly at the end of your workflow, not the start.',
      '[02:20] Keep edits aligned with original intent.',
      '[04:40] Approve only changes that improve clarity and trust.'
    ],
    references: [
      { label: 'Grammarly AI Writing Assistant', url: 'https://www.grammarly.com/ai-writing-assistant' },
      { label: 'Notion AI', url: 'https://www.notion.com/product/ai' }
    ]
  },
  {
    slug: 'fireflies-meeting-to-content-pipeline',
    level: 'Intermediate',
    title: 'Fireflies Meeting-to-Content Pipeline',
    summary: 'Turn calls and interviews into structured content assets automatically.',
    duration: '45 mins',
    tools: ['Fireflies AI', 'ChatGPT', 'Notion AI'],
    endResult: 'A meeting-derived content brief with clip ideas, newsletter angles, and action tasks.',
    steps: [
      'Record and transcribe calls in Fireflies with speaker tagging enabled.',
      'Extract high-signal insights, objections, and repeat questions from the transcript.',
      'Use ChatGPT to transform findings into content angles and key talking points.',
      'Organize outputs in Notion AI as editorial briefs with deadlines and owners.',
      'Run weekly review to prioritize ideas with highest audience demand signal.'
    ],
    tutorialTitle: 'Fireflies AI Tutorial - Meeting Notes and Action Items',
    videoUrl: 'https://www.youtube.com/embed/1b6GRdqZD34?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-03:00 Capture and transcription setup.',
      '03:00-07:00 Insight extraction workflow.',
      '07:00-end Converting notes into content tasks.'
    ],
    transcript: [
      '[00:00] Capture meetings with consistent naming and tags.',
      '[03:15] Extract repeated pain points and decision triggers.',
      '[06:40] Convert insights into prioritized content backlog items.'
    ],
    references: [
      { label: 'Fireflies AI', url: 'https://fireflies.ai/' },
      { label: 'ChatGPT', url: 'https://openai.com/chatgpt/' }
    ]
  },
  {
    slug: 'n8n-content-automation-router',
    level: 'Advanced',
    title: 'n8n Content Automation Router',
    summary: 'Route content tasks across drafting, review, and publishing with branching logic.',
    duration: '70 mins',
    tools: ['n8n', 'ChatGPT', 'Notion AI'],
    endResult: 'A working automation scenario that routes tasks by content type and priority.',
    steps: [
      'Map your end-to-end content process and identify branch points.',
      'Build n8n trigger workflows for idea intake and status transitions.',
      'Add AI draft generation and human review checkpoints.',
      'Route outputs into Notion database with SLA and ownership metadata.',
      'Add failure alerts and retry logic for mission-critical nodes.'
    ],
    tutorialTitle: 'n8n Beginner Tutorial - Build Your First Automation',
    videoUrl: 'https://www.youtube.com/embed/1b6GRdqZD34?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-03:00 Workflow mapping and triggers.',
      '03:00-08:00 Node setup and branching.',
      '08:00-end Error handling and monitoring.'
    ],
    transcript: [
      '[00:00] Design branch logic before building nodes.',
      '[03:50] Add validation checks between every major step.',
      '[07:30] Configure alerts for failures and stalled executions.'
    ],
    references: [
      { label: 'n8n', url: 'https://n8n.io/' },
      { label: 'Notion AI', url: 'https://www.notion.com/product/ai' }
    ]
  },
  {
    slug: 'notion-second-brain-newsletter-ops',
    level: 'Intermediate',
    title: 'Notion Second Brain to Newsletter Ops',
    summary: 'Convert knowledge notes into a repeatable newsletter production system.',
    duration: '40 mins',
    tools: ['Notion AI', 'Beehiiv', 'ChatGPT'],
    endResult: 'A structured editorial pipeline that turns notes into weekly newsletter issues.',
    steps: [
      'Create a Notion database with fields for idea stage, theme, and CTA.',
      'Use Notion AI to summarize raw notes into publishable insight candidates.',
      'Draft issue skeletons with ChatGPT based on top-priority insight cards.',
      'Move approved drafts into Beehiiv with segmented CTA targeting.',
      'Track opens and clicks by theme to guide next issue planning.'
    ],
    tutorialTitle: 'How to Use Notion AI for Content Systems',
    videoUrl: 'https://www.youtube.com/embed/PDw3Uk9dN9k?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-03:00 Building the Notion content database.',
      '03:00-07:00 AI summarization and prioritization.',
      '07:00-end Publishing flow and feedback loop.'
    ],
    transcript: [
      '[00:00] Build one source of truth for all content notes.',
      '[03:05] Summarize and score ideas for business relevance.',
      '[06:50] Push approved ideas into newsletter production queue.'
    ],
    references: [
      { label: 'Notion AI', url: 'https://www.notion.com/product/ai' },
      { label: 'beehiiv', url: 'https://www.beehiiv.com/' }
    ]
  },
  {
    slug: 'canva-carousel-batch-system',
    level: 'Beginner',
    title: 'Canva Carousel Batch System',
    summary: 'Create branded carousel packs from one topic for weekly social publishing.',
    duration: '35 mins',
    tools: ['Canva AI', 'ChatGPT'],
    endResult: 'A batch of 5 brand-consistent carousels with hook slides and CTA endings.',
    steps: [
      'Define one weekly theme and 5 subtopics for carousel posts.',
      'Generate slide copy frameworks in ChatGPT with concise bullet structure.',
      'Use Canva AI templates to design one base style and duplicate variations.',
      'Align typography, spacing, and brand colors across all slides.',
      'Export in platform-ready format and schedule posting sequence.'
    ],
    tutorialTitle: 'Canva Tutorial - Build Better Social Carousels',
    videoUrl: 'https://www.youtube.com/embed/ZMy78FCtYKA?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-03:00 Carousel structure for retention.',
      '03:00-07:00 Template setup and duplication.',
      '07:00-end Export and publish checklist.'
    ],
    transcript: [
      '[00:00] Start with one theme to keep visual narrative coherent.',
      '[03:10] Use one template family for faster batch production.',
      '[06:30] End every carousel with one clear CTA.'
    ],
    references: [
      { label: 'Canva Magic Studio', url: 'https://www.canva.com/magic-studio/' },
      { label: 'ChatGPT', url: 'https://openai.com/chatgpt/' }
    ]
  },
  {
    slug: 'linkedin-authority-engine',
    level: 'Advanced',
    title: 'LinkedIn Authority Engine',
    summary: 'Run a weekly authority loop that turns research into posts, comments, and lead capture.',
    duration: '65 mins',
    tools: ['Perplexity', 'Jasper', 'Grammarly', 'Zapier'],
    endResult: 'A 7-day LinkedIn content system with insights, distribution, and lead follow-up.',
    steps: [
      'Use Perplexity to collect source-backed insights for one strategic topic.',
      'Generate 3 post angles in Jasper mapped to awareness, problem, and solution stages.',
      'Polish tone and clarity in Grammarly, then finalize one primary post and 3 follow-up comments.',
      'Use Zapier to capture engagement signals into your CRM or Notion tracker.',
      'End the week with performance review and angle iteration for next cycle.'
    ],
    tutorialTitle: 'LinkedIn Content System Tutorial for Creators',
    videoUrl: 'https://www.youtube.com/embed/iH-vz8hsa-M?cc_load_policy=1&cc_lang_pref=en',
    captions: [
      '00:00-03:00 Research and positioning setup.',
      '03:00-07:00 Post and comment asset creation.',
      '07:00-end Engagement follow-up and optimization.'
    ],
    transcript: [
      '[00:00] Build authority on one clear topic cluster.',
      '[03:25] Pair original posts with strategic comment distribution.',
      '[06:45] Track response quality, not just surface engagement.'
    ],
    references: [
      { label: 'Perplexity', url: 'https://www.perplexity.ai/' },
      { label: 'Jasper', url: 'https://www.jasper.ai/' },
      { label: 'Zapier', url: 'https://zapier.com/' }
    ]
  }
];

export function getWorkflowGuide(slug: string) {
  return workflowGuides.find((guide) => guide.slug === slug) ?? null;
}

export function buildWorkflowChecklist(guide: WorkflowGuide) {
  const lines = [
    `${guide.title} Checklist`,
    `Level: ${guide.level}`,
    `Duration: ${guide.duration}`,
    '',
    'Tools:',
    ...guide.tools.map((tool) => `- ${tool}`),
    '',
    'Execution Steps:',
    ...guide.steps.map((step, idx) => `${idx + 1}. ${step}`),
    '',
    `Expected End Result: ${guide.endResult}`
  ];
  return lines.join('\n');
}
