export type TutorialStep = {
  title: string;
  body: string;
  substeps?: string[];
  toolTips?: string[];
  examplePrompt?: string;
  toolRef?: string;
};

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
  detailedTutorial?: TutorialStep[];
  toolQuickStarts?: Record<string, string>;
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
      { label: 'OpenAI Academy - ChatGPT Basics', url: 'https://academy.openai.com/home/resources/chatgpt-basics' },
      { label: 'Canva - Magic Studio', url: 'https://www.canva.com/magic-studio/' },
      { label: 'Notion - AI', url: 'https://www.notion.com/product/ai' }
    ],
    toolQuickStarts: {
      ChatGPT:
        'Start a new chat at chat.openai.com. Use role + context + constraints in your prompt. Iterate with follow-up messages to refine output. Accept or edit suggestions inline.',
      'Notion AI':
        'Highlight text and use the Ask AI menu (or type /ai) to summarize, expand, or restructure. Use AI Summary database properties for automatic summaries on database pages.',
      'Canva AI':
        'Open Magic Studio from the left sidebar. Use Magic Media for image generation from text, Magic Design for template suggestions, and Magic Write for copy. Be specific in prompts for best results.'
    },
    detailedTutorial: [
      {
        title: 'Collect and analyze high-performing hooks',
        body: 'Before generating anything, study what works in your niche. Open 3 videos that have strong retention (check analytics or use videos with high view-to-subscriber ratios). Watch the first 30 seconds of each and note: the opening line structure, the question or claim used, and how quickly they deliver the first value beat. Write these patterns down in a simple list.',
        toolRef: 'Manual research',
        substeps: [
          'Identify 3 videos in your niche with strong retention metrics',
          'Transcribe or note the exact opening 2-3 sentences of each',
          'Extract the hook pattern: question, bold claim, story tease, or contradiction'
        ]
      },
      {
        title: 'Generate 3 hook options with ChatGPT',
        body: 'Open ChatGPT and start a new chat. Your prompt should include your audience, topic, and style constraints. Request exactly 3 hook options so you can compare and pick the strongest. Use the example prompt below as a template.',
        toolRef: 'ChatGPT',
        examplePrompt: `You are a YouTube script writer for [your niche]. My audience is [describe audience]. Create 3 opening hook options for a video about [topic]. Each hook must:
- Be under 15 words
- Create curiosity or urgency
- Lead naturally into the main value
Format: Option A, Option B, Option C with one sentence each.`,
        toolTips: [
          'Use "New Chat" for each script project to keep context clean',
          'Include your channel tone (casual, professional, energetic) in the prompt',
          'Ask for variations if the first batch feels generic'
        ]
      },
      {
        title: 'Turn the best hook into a script outline with Notion AI',
        body: 'Paste your selected hook into a Notion page. Use Notion AI (highlight and select "Ask AI" or type /ai) to expand it into a structured outline. Request: hook, 3-5 value points, proof or example section, and CTA. This gives you a skeleton before writing full sentences.',
        toolRef: 'Notion AI',
        substeps: [
          'Paste the chosen hook at the top of a new Notion page',
          'Select the hook text and choose "Ask AI" > "Expand" or "Continue writing"',
          'Add instruction: "Structure this as: Hook, Value Point 1, Value Point 2, Value Point 3, Proof/Example, CTA"',
          'Review and adjust the outline before moving to full script'
        ]
      },
      {
        title: 'Run a clarity pass in ChatGPT',
        body: 'Copy your full script draft into ChatGPT. Ask it to shorten sentences, remove filler, and improve spoken-flow readability. Specify that the output should sound natural when read aloud. Apply only the edits that preserve your voice.',
        toolRef: 'ChatGPT',
        examplePrompt: `Improve this script for spoken delivery. Shorten long sentences, remove filler words, and make it flow naturally when read aloud. Keep my voice and key phrases. Return the revised script only.`,
        toolTips: [
          'Paste the script in full for best context',
          'Request "return revised script only" to avoid extra commentary',
          'Do a final read-through yourself—AI can over-tighten'
        ]
      },
      {
        title: 'Create thumbnail concepts in Canva AI',
        body: 'Open Canva and go to Magic Studio. Use Magic Media or Magic Design to generate thumbnail concept variations. Your prompt should tie to the selected hook: include the emotional beat, key words, and visual style. Generate 2-3 options and pick the strongest for your final thumbnail.',
        toolRef: 'Canva AI',
        substeps: [
          'Create a new design with YouTube thumbnail dimensions (1280x720)',
          'Open Magic Media and enter a prompt that matches your hook',
          'Include: subject, emotion, text overlay idea, and style (e.g. bold, minimal)',
          'Generate and refine until you have 2-3 strong options'
        ],
        toolTips: [
          'More specific prompts yield better results (e.g. "photorealistic" vs "good")',
          'Keep text on thumbnails short—3-5 words max for readability',
          'Use one consistent style system across your channel'
        ]
      }
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
      { label: 'Zapier - Create a Zap', url: 'https://zapier.com/resources/guides/quick-start/create-zap' },
      { label: 'beehiiv - Features', url: 'https://www.beehiiv.com/features' },
      { label: 'beehiiv - Newsletter Setup Checklist', url: 'https://blog.beehiiv.com/p/beehiiv-newsletter-setup-checklist' }
    ],
    toolQuickStarts: {
      Beehiiv:
        'Create your newsletter at beehiiv.com. Use templates for consistent layout. Add UTM parameters to links for tracking. Set a realistic send frequency and stick to it.',
      Zapier:
        'A Zap = trigger + action. Create a new Zap, choose your trigger app (e.g. new form response, new note), connect your account, then add an action (e.g. create draft, send to Slack). Test before turning on.',
      ChatGPT:
        'Paste raw inputs and ask for summarization or angle generation. Use clear format instructions (e.g. "2-3 bullet angles, each 1-2 sentences") for consistent output.'
    },
    detailedTutorial: [
      {
        title: 'Define your recurring issue template',
        body: 'Before automating, lock in a repeatable structure. Every issue should have: a lead insight (the main takeaway), a proof example (data, story, or case study), and a CTA block (one primary action). Write this template in a doc so you can paste it into ChatGPT later.',
        substeps: [
          'Document the 3-part structure: Lead insight, Proof example, CTA block',
          'Define your ideal word count per section',
          'Choose one CTA type per issue to avoid mixed intent'
        ]
      },
      {
        title: 'Build a Zapier workflow to collect inputs',
        body: 'In Zapier, create a new Zap. Set your trigger—e.g. new form response, new row in Airtable, or new note in a designated folder. Add an action that sends the data to a central draft workspace (Notion, Google Doc, or Beehiiv draft). Map the key fields: source link, notes, date. Test the trigger to ensure data flows correctly.',
        toolRef: 'Zapier',
        substeps: [
          'Create Zap > choose trigger app (e.g. Typeform, Google Forms, Airtable)',
          'Connect account and select trigger event',
          'Add action: Create/Update draft in your workspace',
          'Map form fields to draft fields',
          'Test with a sample run'
        ],
        toolTips: [
          'Use "Test trigger" to pull real data before building the rest',
          'Add a Filter step if you only want certain submissions to trigger',
          'Keep field names consistent for easier ChatGPT parsing'
        ]
      },
      {
        title: 'Use ChatGPT to summarize and generate angles',
        body: 'Paste the collected inputs (links, notes, form responses) into ChatGPT. Ask it to summarize the key themes and generate 2-3 draft angles for the issue. Specify your audience and tone. Pick one angle that fits your lead insight slot.',
        toolRef: 'ChatGPT',
        examplePrompt: `I have these inputs for my weekly newsletter: [paste links/notes]. Summarize the key themes and generate 2-3 possible angles for this week's issue. Format each angle as: Headline + 2-3 sentence summary. My audience is [describe]. Tone: [casual/professional].`,
        toolTips: [
          'Paste raw inputs—ChatGPT can handle multiple URLs and text blocks',
          'Request "2-3 angles" to get options without overwhelming output',
          'Select one angle and refine before writing the full draft'
        ]
      },
      {
        title: 'Edit tone and finalize the CTA',
        body: 'Draft the full issue in your editor. Use your selected angle as the lead. Keep one consistent CTA throughout—avoid mixing "sign up for X" with "buy Y" in the same issue. Edit for tone manually so it sounds like you, not generic AI.',
        substeps: [
          'Write the lead section from your chosen angle',
          'Add proof example and supporting details',
          'Insert one clear CTA block with a single action',
          'Read aloud to check flow and tone'
        ]
      },
      {
        title: 'Queue in Beehiiv with UTM-tagged links',
        body: 'Paste your draft into Beehiiv. Add UTM parameters to all links (utm_source=newsletter, utm_medium=email, utm_campaign=issue_date). Set your send time and publish. Lock your cadence to a consistent day and time (e.g. every Tuesday 8am) so your audience knows when to expect it.',
        toolRef: 'Beehiiv',
        substeps: [
          'Create new post in Beehiiv Content',
          'Paste draft and format with headings and bullets',
          'Add UTM params to each link: ?utm_source=newsletter&utm_medium=email&utm_campaign=YYYY-MM-DD',
          'Schedule send for your audience window',
          'Review and hit Publish'
        ],
        toolTips: [
          'Use a recognizable sender address (avoid noreply@)',
          'Choose send time based on when your audience typically opens',
          'Track opens and clicks by theme to guide future issues'
        ]
      }
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
      { label: 'CapCut - AI Video Generator', url: 'https://www.capcut.com/tools/ai-video-generator' },
      { label: 'CapCut - Auto Captions', url: 'https://www.capcut.com/resource/add-captions-with-ai' }
    ],
    toolQuickStarts: {
      ChatGPT:
        'Generate scripts with strict line length (8-12 words per line for TikTok/Reels). Specify "short-form vertical video script" and include pacing notes.',
      'Canva AI':
        'Use Magic Design for templates. Pick one style system (fonts, colors, framing) and duplicate for all 7 videos. Magic Media can generate B-roll or background visuals.',
      'CapCut AI':
        'Import clips, use Text > Auto Captions to generate subtitles. Choose 9:16 for TikTok/Reels. Customize font and animation. Export in platform-native format.'
    },
    detailedTutorial: [
      {
        title: 'Pick one content pillar and 7 micro-topics',
        body: 'Choose a single pillar (e.g. productivity, finance tips, storytelling) and define 7 micro-topics with clear viewer intent. Each topic should answer one specific question or deliver one actionable tip. Write these as simple one-liners before scripting.',
        substeps: [
          'Select one content pillar for the batch',
          'List 7 micro-topics that fit the pillar',
          'For each topic, write the viewer intent: "By the end, they will..."',
          'Order topics by hook strength or logical flow'
        ]
      },
      {
        title: 'Generate short-form scripts in ChatGPT',
        body: 'Prompt ChatGPT for scripts with strict line length. Short-form video needs 8-12 words per line for natural voice pacing. Specify vertical format, hook-first structure, and CTA. Request 7 scripts in one go to save time.',
        toolRef: 'ChatGPT',
        examplePrompt: `Create 7 short-form vertical video scripts (TikTok/Reels style). Each script must:
- Be 30-60 seconds when read at natural pace
- Use 8-12 words per line (one line per screen/caption)
- Start with a hook in the first 2 seconds
- End with a clear CTA
Topics: [list your 7 micro-topics]. Tone: [your tone].`,
        toolTips: [
          'Shorter lines = easier captions and better retention',
          'Hook must land in the first 2 seconds—no slow build',
          'Keep one consistent CTA across the batch'
        ]
      },
      {
        title: 'Create visual assets in Canva AI',
        body: 'Open Canva and establish one style system: fonts, colors, framing. Use Magic Design to generate templates, then duplicate for each video. Keep text overlays high-contrast and readable on mobile. Export all assets with consistent naming (video_01, video_02, etc.).',
        toolRef: 'Canva AI',
        substeps: [
          'Create a 9:16 design and set your brand fonts and colors',
          'Use Magic Design or templates to build the first frame',
          'Duplicate the design 6 times and swap text for each topic',
          'Ensure opening frame has high-contrast text',
          'Export all as MP4 or image sequences'
        ],
        toolTips: [
          'One template family = faster batch production',
          'Use bold, readable fonts—avoid thin or decorative',
          'Keep file naming consistent for easy import into CapCut'
        ]
      },
      {
        title: 'Assemble and caption in CapCut AI',
        body: 'Import your visuals and any voiceover into CapCut. Use Text > Auto Captions to generate subtitles from your audio. Style captions for mobile readability. Keep the opening 2 seconds high-contrast and text-first to stop the scroll.',
        toolRef: 'CapCut AI',
        substeps: [
          'Import all assets into a new 9:16 project',
          'Add voiceover or use CapCut AI voice if needed',
          'Go to Text > Auto Captions, select language, generate',
          'Edit any caption errors and apply consistent font/style',
          'Ensure first 2 seconds have strong visual hook'
        ],
        toolTips: [
          'CapCut AI captions are ~85% accurate—plan 5 min to fix',
          'Videos with captions see up to 40% higher retention',
          'Export in platform-native format (e.g. 1080x1920 for TikTok)'
        ]
      },
      {
        title: 'Export and schedule with consistent metadata',
        body: 'Batch export all 7 videos. Use a consistent naming format and write titles, descriptions, and hashtags in a spreadsheet. Schedule posts over 7 days. Track performance to identify which topics and hooks resonate.',
        substeps: [
          'Export all videos in 1080x1920 (9:16)',
          'Create a metadata sheet: title, description, hashtags per video',
          'Schedule posts with consistent timing',
          'Track views, likes, and saves to inform next batch'
        ]
      }
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
      { label: 'OpenAI - ChatGPT', url: 'https://openai.com/chatgpt/' },
      { label: 'Canva - Magic Studio', url: 'https://www.canva.com/magic-studio/' }
    ],
    toolQuickStarts: {
      'Notion AI':
        'Paste your blog into a Notion page. Highlight and use Ask AI to summarize or extract key points. Use /ai for a summary block that persists.',
      ChatGPT:
        'Paste key points and request platform-specific outputs. Specify format (X thread = numbered tweets, LinkedIn = 1-2 paragraphs, etc.) for best results.',
      'Canva AI':
        'Use Magic Media for quote cards. Paste the quote as text, choose a style, generate. Use one template for carousel slides to keep branding consistent.'
    },
    detailedTutorial: [
      {
        title: 'Extract key points with Notion AI',
        body: 'Paste your full blog draft into a Notion page. Use Notion AI to produce a concise key-point extract: highlight the full text, select "Ask AI" > "Summarize" or type /ai and ask for "Extract the 5-7 main points as bullet list." This becomes your source for all platform outputs.',
        toolRef: 'Notion AI',
        substeps: [
          'Paste blog into new Notion page',
          'Highlight all text, open Ask AI menu',
          'Request: "Extract the 5-7 main points as a bullet list"',
          'Copy the extracted points for ChatGPT'
        ]
      },
      {
        title: 'Generate platform outputs in ChatGPT',
        body: 'Paste your key points into ChatGPT. Request platform-specific formats: X thread (numbered tweets, 280 chars each), LinkedIn post (1-2 paragraphs, hook + value + CTA), email teaser (subject + 2-3 sentence preview), reel script (30-60 sec, hook-first). Use one prompt per platform for cleaner output.',
        toolRef: 'ChatGPT',
        examplePrompt: `I have these key points from a blog: [paste points]. Generate:
1. X/Twitter thread: 5-7 numbered tweets, max 280 chars each, hook in first tweet
2. LinkedIn post: 1-2 paragraphs, professional tone, end with question or CTA
3. Email teaser: subject line + 2-3 sentence preview that creates curiosity
4. Reel script: 30-60 sec, hook in first 2 sec, one clear takeaway`,
        toolTips: [
          'Request one format per message for cleaner output',
          'Include your brand voice in the prompt',
          'Edit outputs to match your tone—AI can sound generic'
        ]
      },
      {
        title: 'Run a voice consistency pass',
        body: 'Read all platform outputs side by side. Check that tone, terminology, and key phrases align. Adjust any section that feels off-brand. Ensure the CTA is consistent (or intentionally varied) across platforms.',
        substeps: [
          'Compare X thread, LinkedIn, email, and reel script',
          'Align terminology and tone',
          'Ensure one consistent CTA or clear variation by platform',
          'Make final edits before creating visuals'
        ]
      },
      {
        title: 'Create quote cards and carousel slides in Canva AI',
        body: 'Open Canva and use Magic Media or templates. Create quote cards from the strongest 2-3 points. Use one font and color system. For carousels, create 5-7 slides with one point per slide, plus a hook slide and CTA slide.',
        toolRef: 'Canva AI',
        substeps: [
          'Create quote card design with your strongest point',
          'Duplicate and swap text for 2-3 more cards',
          'Create carousel slides: hook, points 1-5, CTA',
          'Export in platform dimensions (1080x1080 for carousel, 1080x1350 for portrait)'
        ]
      },
      {
        title: 'Publish in sequence over 48-72 hours',
        body: 'Schedule posts to maximize topic momentum. Typical order: X thread first (fast, shareable), LinkedIn next (professional audience), email teaser (drives traffic), reel last (visual recap). Space them 12-24 hours apart.',
        substeps: [
          'Post X thread first to test resonance',
          'Publish LinkedIn 12-24 hours later',
          'Send email teaser to drive traffic to full blog',
          'Publish reel 48-72 hours after blog goes live'
        ]
      }
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
      { label: 'Descript - Create Clips', url: 'https://help.descript.com/hc/en-us/articles/10119670449293-Create-clips-and-repurpose-your-content' },
      { label: 'CapCut - Video Editor', url: 'https://www.capcut.com/tools/video-editor' }
    ],
    toolQuickStarts: {
      Descript:
        'Import media and Descript auto-transcribes. Open AI Tools panel (right sidebar) > Repurpose > Create clips. Set number (1-20) and length (10s-5min). Optional: enter topic or criteria to guide clip selection.',
      ChatGPT:
        'Paste clip timestamps and context. Request titles, hooks, and descriptions for each. Specify platform (YouTube Shorts, TikTok, etc.) for format.',
      'CapCut AI':
        'Import clips, use Text > Auto Captions. Choose 9:16 or 1:1. Export in platform-native aspect ratios. Batch export for multiple formats.'
    },
    detailedTutorial: [
      {
        title: 'Import recording and clean transcript in Descript',
        body: 'Import your podcast audio or video into Descript. Wait for automatic transcription. Review the transcript and fix any errors—especially names, technical terms, and key phrases. Clean transcript = better clip selection and search.',
        toolRef: 'Descript',
        substeps: [
          'Import media file (audio or video) into Descript',
          'Wait for auto-transcription to complete',
          'Click through transcript and correct errors',
          'Use "Remove filler words" if needed for cleaner clips'
        ],
        toolTips: [
          'Source composition must be at least as long as clips you want',
          'Very short compositions (under 1 min) may not generate clips',
          'Accurate transcript improves AI clip selection'
        ]
      },
      {
        title: 'Use Create clips to generate short-form segments',
        body: 'Open the AI Tools panel in the right sidebar. Scroll to Repurpose > Create clips. Optionally enter a topic, goal, or criteria to guide selection. Choose layout (portrait 9:16 or square 1:1). Set number of clips (1-20) and length (10 seconds to 5 minutes). Click Submit. Clips appear in a "Clips from [name]" folder.',
        toolRef: 'Descript',
        substeps: [
          'Open AI Tools panel (right sidebar)',
          'Scroll to Repurpose section, select Create clips',
          'Optional: enter topic or criteria (e.g. "best storytelling moments")',
          'Choose layout: portrait (9:16) or square (1:1)',
          'Set number of clips (e.g. 10) and length (e.g. 60 seconds)',
          'Click Submit and wait for generation'
        ],
        toolTips: [
          'Each clip is its own composition—edit further as needed',
          'You can also ask Underlord to create clips with a natural language request',
          'Export clips individually or batch from the project panel'
        ]
      },
      {
        title: 'Generate titles, hooks, and descriptions with ChatGPT',
        body: 'For each clip, paste the transcript excerpt and timestamp into ChatGPT. Request a title, hook (first line for social), and description. Specify platform (YouTube Shorts, TikTok, etc.) for format. Batch these requests to save time.',
        toolRef: 'ChatGPT',
        examplePrompt: `Here's a 60-second podcast clip transcript: [paste]. Generate:
- Title (under 60 chars, curiosity-driven)
- Hook (first line for social, 10-15 words)
- Description (2-3 sentences for YouTube Shorts/TikTok)
Platform: [YouTube Shorts / TikTok / both]`,
        toolTips: [
          'Include timestamp and topic for context',
          'Request platform-specific formats for each',
          'Keep hooks under 15 words for captions'
        ]
      },
      {
        title: 'Finalize in CapCut AI and batch export',
        body: 'Import your Descript clips into CapCut. Add Auto Captions (Text > Auto Captions), style them for mobile readability. Export in platform-native aspect ratios: 9:16 for TikTok/Reels, 1:1 for feed posts. Create a batch export list if you need multiple formats per clip.',
        toolRef: 'CapCut AI',
        substeps: [
          'Import clips from Descript export',
          'Add Auto Captions, select language, generate',
          'Edit caption errors and apply consistent style',
          'Export 9:16 for TikTok/Reels, 1:1 for feed',
          'Use batch export if multiple ratios needed'
        ]
      }
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
      { label: 'beehiiv - Pricing', url: 'https://www.beehiiv.com/pricing' },
      { label: 'beehiiv - Newsletter Setup', url: 'https://blog.beehiiv.com/p/beehiiv-newsletter-setup-checklist' }
    ],
    toolQuickStarts: {
      ChatGPT:
        'Create prompt packs for specific use cases. Structure as: role, task, format, examples. Test prompts before gating. Use for delivery email and sequence copy.',
      Beehiiv:
        'Create a signup form for your lead magnet. Use custom fields for lead source tags. Set up a welcome email that delivers the asset. Use segments for follow-up sequences.',
      Zapier:
        'Connect Beehiiv new subscriber to your CRM or Notion. Add lead source tags. Route to different sequences based on source. Set up alerts for new signups.'
    },
    detailedTutorial: [
      {
        title: 'Create a specific prompt pack for one use case',
        body: 'Choose one urgent use case (e.g. content ideation sprint, email subject lines, landing page copy). Build a prompt pack in ChatGPT: 3-5 prompts that deliver a clear transformation. Test each prompt yourself before gating. The pack should be immediately usable—not generic tips.',
        toolRef: 'ChatGPT',
        examplePrompt: `Create a prompt pack for "Content Ideation Sprint" that includes:
1. A prompt to generate 10 blog ideas in 5 minutes
2. A prompt to expand one idea into an outline
3. A prompt to generate 3 headlines per idea
Format: Each prompt as copy-paste ready, with [brackets] for user inputs. Include a 1-sentence "what you get" for each.`,
        toolTips: [
          'Focus on one measurable transformation (e.g. "10 ideas in 5 min")',
          'Test every prompt before including in the pack',
          'Use [brackets] for user customization points'
        ]
      },
      {
        title: 'Write short landing copy focused on one transformation',
        body: 'Create a landing page that promises one clear outcome. Headline = transformation. Subhead = who it is for. Bullets = what they get. CTA = one action. Avoid listing features—focus on the result they will achieve.',
        substeps: [
          'Headline: "[Transformation] in [timeframe]"',
          'Subhead: "For [audience] who want [outcome]"',
          '3 bullets: specific deliverables from the prompt pack',
          'Single CTA: "Get the pack" or "Unlock now"'
        ]
      },
      {
        title: 'Connect capture form to Beehiiv and Zapier',
        body: 'Create a Beehiiv signup form for the lead magnet. Add custom fields for lead source (e.g. twitter, linkedin, blog). Connect Zapier: trigger = new Beehiiv subscriber, action = add to CRM/Notion with lead source tag. Test the flow with a real signup.',
        toolRef: 'Beehiiv + Zapier',
        substeps: [
          'Create signup form in Beehiiv with email + optional source field',
          'Create Zap: Trigger = new subscriber in Beehiiv',
          'Action = create/update record in CRM or Notion',
          'Map lead source from form to CRM field',
          'Test with a signup and verify data flows'
        ]
      },
      {
        title: 'Set up 3-email sequence',
        body: 'Email 1: Deliver the prompt pack immediately with clear instructions. Email 2: Quick win—one prompt to try today. Email 3: Deeper workflow + affiliate CTA. Keep each email focused on one goal. Use Beehiiv segments if you have multiple lead magnets.',
        toolRef: 'Beehiiv',
        substeps: [
          'Email 1: Delivery + how to use the pack',
          'Email 2: One prompt to try, with example',
          'Email 3: Full workflow walkthrough + affiliate offer',
          'Space 2-3 days apart'
        ]
      },
      {
        title: 'Track clicks and optimize weekly',
        body: 'Review open rates, click rates, and CTA placement. Test subject lines and CTA copy. Optimize the email that drives the most affiliate clicks. Run one test per week—don\'t change multiple variables at once.',
        substeps: [
          'Track opens, clicks, and conversions by email',
          'Identify top-performing subject lines',
          'Test CTA placement (top vs bottom of email)',
          'Iterate one variable per week'
        ]
      }
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
      { label: 'Notion AI', url: 'https://www.notion.com/product/ai' },
      { label: 'Perplexity - Citation Guide', url: 'https://www.promptalpha.ai/blog/how-perplexity-decides-what-to-cite' }
    ],
    toolQuickStarts: {
      Perplexity:
        'Every query triggers live web search with citations. Use precise questions. Click citations to verify sources. Pro Search does multi-step research; Deep Research runs 2-4 min across hundreds of sources.',
      'Notion AI':
        'Paste findings and use Ask AI to summarize into a one-page brief. Use /ai for a summary block. Highlight and "Find action items" to extract next steps.'
    },
    detailedTutorial: [
      {
        title: 'Define one research question tied to your next content',
        body: 'Start with a precise research objective. Your question should be specific enough to yield actionable findings (e.g. "What are the top 5 trends in [niche] for 2025?" not "What is happening in [niche]?"). Write it down before opening Perplexity.',
        substeps: [
          'Identify your next content asset (blog, video, newsletter)',
          'Write one research question that will inform it',
          'Include timeframe and scope (e.g. "2025", "B2B SaaS")',
          'Aim for 8-10 citation-backed findings'
        ]
      },
      {
        title: 'Use Perplexity to gather citation-backed findings',
        body: 'Open Perplexity and enter your research question. Request "8-10 findings with sources from the last 12 months." Click through citations to verify—Perplexity cites inline. Use Pro Search for multi-step research or Deep Research for comprehensive coverage. Copy findings with source links.',
        toolRef: 'Perplexity',
        examplePrompt: `What are the top 5 trends in [your niche] for 2025? Provide 8-10 specific findings with sources from the last 12 months. Include: trend name, brief description, and 1-2 supporting statistics or examples. Format as bullet list with inline citations.`,
        toolTips: [
          'Perplexity performs live web search—no fallback to training data alone',
          'Citations appear inline—click to verify source',
          'Use Pro Search or Deep Research for complex questions',
          'Best with clear, recent, open-access sources'
        ]
      },
      {
        title: 'Cluster findings into themes',
        body: 'Group your 8-10 findings into themes: opportunity (growth areas), risk (threats or challenges), market shift (behavior or tech changes). This structure helps you prioritize which angles to pursue and creates a clear brief for Notion AI.',
        substeps: [
          'Review all findings and source links',
          'Label each: Opportunity, Risk, or Market Shift',
          'Note conflicting claims—compare sources',
          'Rank by strength of evidence and relevance'
        ]
      },
      {
        title: 'Generate one-page executive brief in Notion AI',
        body: 'Paste your clustered findings into a Notion page. Use Notion AI to generate a one-page executive brief: summary, key themes, and 3 recommended content angles. Specify format: "Executive brief, 1 page, with 3 content angle recommendations."',
        toolRef: 'Notion AI',
        examplePrompt: `Summarize these research findings into a one-page executive brief. Include: 1) 2-3 sentence summary, 2) Key themes (opportunity, risk, market shift), 3) Three content angle recommendations with strongest cited evidence. Keep it concise.`,
        toolTips: [
          'Paste findings with source links for context',
          'Use "Ask AI" or /ai block for summarization',
          'Edit the output to match your voice'
        ]
      },
      {
        title: 'Finalize 3 content angles from strongest evidence',
        body: 'Review the brief and select 3 content angles. For each, note the strongest cited evidence. Use these to draft your next blog, video, or newsletter. Prioritize angles with multiple strong sources.',
        substeps: [
          'Select 3 angles from the brief',
          'For each, list 1-2 strongest supporting sources',
          'Draft outline or script using this evidence',
          'Link back to sources for fact-checking'
        ]
      }
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
      { label: 'Canva Magic Studio', url: 'https://www.canva.com/magic-studio/' },
      { label: 'Gemini API - Quickstart', url: 'https://ai.google.dev/gemini-api/docs/quickstart' }
    ],
    toolQuickStarts: {
      'Google Gemini':
        'Go to gemini.google.com. Input audience, topic, and format. Use clear structure requests (e.g. "3 outline variants"). Iterate with follow-ups to refine.',
      'Canva AI':
        'Use Magic Design or Magic Media to build a moodboard. Describe the visual direction that matches your outline. Export for handoff to design or production.'
    },
    detailedTutorial: [
      {
        title: 'Input audience, topic, and format into Gemini',
        body: 'Open Gemini at gemini.google.com. In your first message, specify: your target audience, the content topic, and desired format (blog, video script, course module). Request three outline variants with different angles so you can compare.',
        toolRef: 'Google Gemini',
        examplePrompt: `I'm creating [content format] for [audience]. Topic: [topic]. Generate 3 outline variants, each with a different angle or narrative approach. For each variant include: headline, 4-6 section headers, and 1-sentence summary of the angle.`,
        toolTips: [
          'Define scope and outcome before generating',
          'Request multiple variants to compare approaches',
          'Include audience context for better relevance'
        ]
      },
      {
        title: 'Select one outline and ask for proof points',
        body: 'Choose the strongest outline variant. Ask Gemini for supporting proof points, statistics, or practical examples for each section. This enriches your outline for scripting or design handoff.',
        toolRef: 'Google Gemini',
        examplePrompt: `For this outline: [paste outline]. Add 1-2 supporting proof points, statistics, or practical examples per section. Format as bullet under each section header.`,
        toolTips: [
          'Paste the full outline for context',
          'Request specific types of support (stats, examples, quotes)',
          'Verify any statistics before using in final content'
        ]
      },
      {
        title: 'Build visual concept moodboard in Canva AI',
        body: 'Open Canva and use Magic Media or Magic Design. Create a moodboard that aligns with your selected outline: colors, imagery style, typography direction. Describe the visual direction in your prompt. Export for production handoff.',
        toolRef: 'Canva AI',
        substeps: [
          'Create new design, open Magic Media or Magic Design',
          'Prompt with: "Moodboard for [topic], style: [e.g. minimal, bold, professional]"',
          'Generate 4-6 visual concepts',
          'Export as images for design/production reference'
        ],
        toolTips: [
          'More specific prompts yield better results',
          'Reference your outline tone (e.g. "serious", "playful")',
          'Use one style system across all concepts'
        ]
      },
      {
        title: 'Export clean outline brief',
        body: 'Compile the final outline with proof points into a single document. Add the moodboard images. This becomes your production brief for scripting, design, or video production.',
        substeps: [
          'Combine outline + proof points in one doc',
          'Attach or link moodboard images',
          'Add any production notes (length, tone, assets needed)',
          'Share with team or use for solo execution'
        ]
      }
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
      { label: 'Copilot Documentation', url: 'https://docs.github.com/en/copilot' },
      { label: 'VS Code - Copilot Getting Started', url: 'https://code.visualstudio.com/docs/copilot/getting-started' }
    ],
    toolQuickStarts: {
      'GitHub Copilot':
        'In VS Code: Tab accepts inline suggestions. Ctrl+Alt+I opens Chat. Use @workspace for context. Agents can implement features across files—select Agent from dropdown.',
      ChatGPT:
        'Paste code and ask for review. Use prompts like "Review for security issues" or "Identify edge cases." Request specific feedback format.'
    },
    detailedTutorial: [
      {
        title: 'Write a one-page feature spec',
        body: 'Before writing code, document the feature: acceptance criteria, edge cases, and success definition. Include inputs, outputs, and error handling. This spec guides Copilot and gives you a checklist for validation.',
        substeps: [
          'Define feature in 1-2 sentences',
          'List 3-5 acceptance criteria',
          'Note edge cases and error states',
          'Specify tech stack and constraints'
        ]
      },
      {
        title: 'Use Copilot to scaffold components and tests',
        body: 'Open VS Code with Copilot. Start typing or use Chat (Ctrl+Alt+I). For scaffolding: describe the component or API handler, accept inline suggestions with Tab. Use @workspace to give Copilot file context. For tests: ask "Generate unit tests for [function/file]."',
        toolRef: 'GitHub Copilot',
        substeps: [
          'Create file and add a comment describing the component',
          'Let Copilot suggest implementation—Tab to accept',
          'Use Chat: "@workspace generate unit tests for [file]"',
          'Run tests and fix any failures'
        ],
        toolTips: [
          'Start from acceptance criteria, not generated code',
          'Use inline suggestions for repetitive patterns',
          'Agents can implement across multiple files—use for larger features'
        ]
      },
      {
        title: 'Run ChatGPT code review',
        body: 'Paste your key files into ChatGPT. Ask for a focused review: security issues, failure states, edge cases. Use a structured prompt to get actionable feedback. Apply only high-impact fixes.',
        toolRef: 'ChatGPT',
        examplePrompt: `Review this code for: 1) Security vulnerabilities, 2) Unhandled failure states, 3) Edge cases that could cause bugs. Return a list of issues with severity (high/medium/low) and suggested fix. Code: [paste]`,
        toolTips: [
          'Paste full context—imports, types, and logic',
          'Request severity levels to prioritize',
          'Don\'t paste secrets or proprietary logic'
        ]
      },
      {
        title: 'Patch issues and add edge-case tests',
        body: 'Address the high-severity issues from the review. Add explicit test coverage for edge cases. Re-run the test suite. Ensure all acceptance criteria from your spec are met.',
        substeps: [
          'Fix security and failure-state issues first',
          'Add tests for each edge case identified',
          'Re-run full test suite',
          'Verify acceptance criteria'
        ]
      },
      {
        title: 'Prepare release checklist',
        body: 'Document rollback steps, monitoring points, and deployment order. Include: how to revert, what to watch in logs/metrics, and who to notify on failure.',
        substeps: [
          'Write rollback procedure',
          'List monitoring checks (errors, latency)',
          'Note deployment order if multiple services',
          'Add on-call or escalation contact'
        ]
      }
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
      { label: 'Runway Help Center', url: 'https://help.runwayml.com/hc/en-us' },
      { label: 'Runway - Gen-3 Prompting Guide', url: 'https://help.runwayml.com/hc/en-us/articles/30586818553107-Gen-3-Alpha-Prompting-Guide' }
    ],
    toolQuickStarts: {
      Runway:
        'Use prompt formula: [Subject] + [Action] + [Setting] + [Style] + [Camera]. Be descriptive, not conversational. Use positive phrasing—avoid "no" or "don\'t." Gen-3 Alpha: 10 credits/sec; Turbo: 5 credits/sec.',
      'Canva AI':
        'Design end cards and overlays. Use one template for brand consistency. Export in video dimensions (1920x1080 or 1080x1920).',
      ChatGPT:
        'Write voiceover and CTA lines. Keep short and punchy. Specify tone (urgent, calm, exciting) and length (e.g. 5-10 seconds).'
    },
    detailedTutorial: [
      {
        title: 'Define ad objective, persona, and success metric',
        body: 'Before generating anything, lock in: who is the ad for, what action you want, and how you will measure success. This guides your creative direction and keeps iterations focused.',
        substeps: [
          'Define target persona (demographics, pain points)',
          'Set primary CTA (sign up, buy, watch)',
          'Choose success metric (CTR, conversion, view-through)',
          'Note emotional hook (fear, desire, curiosity)'
        ]
      },
      {
        title: 'Generate 3 visual treatments in Runway',
        body: 'Sign up at runway.ml. Select Gen-3 Alpha. Use the prompt formula: [Subject] + [Action] + [Setting] + [Style] + [Camera Movement]. Generate 3 different emotional hooks. Be specific about lighting and camera—avoid vague or conceptual language.',
        toolRef: 'Runway',
        examplePrompt: `Low angle static shot: A sleek smartphone rotates slowly on a white pedestal, studio lighting, minimalist background, camera slowly orbiting around the product.`,
        toolTips: [
          'Use positive phrasing—avoid "no clouds" or "don\'t move"',
          'Be descriptive and visual, not conversational',
          'Include: subject, action, setting, style, camera',
          'Keep prompts under 400 characters',
          'Keywords: cinematic, diffused lighting, slow motion, tracking'
        ]
      },
      {
        title: 'Write voiceover and CTA lines in ChatGPT',
        body: 'For each of the 3 concepts, write short voiceover (5-10 seconds) and CTA line. Specify tone to match the visual hook. Keep CTAs under 5 words for maximum impact.',
        toolRef: 'ChatGPT',
        examplePrompt: `Write a 5-10 second voiceover and CTA for an ad with [emotional hook]. Product: [product]. Tone: [urgent/calm/exciting]. CTA must be under 5 words. Format: Voiceover script, then CTA line.`,
        toolTips: [
          'Match voiceover tone to visual emotion',
          'Keep CTA short and action-oriented',
          'Test multiple CTA variants'
        ]
      },
      {
        title: 'Design end cards and overlays in Canva AI',
        body: 'Create branded end cards for each concept. Use one template—swap logo, CTA text, and color accent. Add overlays if needed (e.g. text on video). Export in 1920x1080 or 1080x1920 for your platform.',
        toolRef: 'Canva AI',
        substeps: [
          'Create end card template with logo and CTA area',
          'Duplicate for each concept, swap CTA text',
          'Export as PNG or video',
          'Import into Runway or edit in CapCut'
        ]
      },
      {
        title: 'Package into A/B/C launch plan',
        body: 'Create a test plan: assign spend per variant, define success threshold, set end date. Document creative specs for each. Use platform-native A/B testing (Meta, Google) or manual rotation.',
        substeps: [
          'Label variants A, B, C with creative specs',
          'Set spend guardrails per variant',
          'Define success threshold (e.g. CTR > 2%)',
          'Schedule review date to declare winner'
        ]
      }
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
      { label: 'ElevenLabs Docs', url: 'https://elevenlabs.io/docs' },
      { label: 'ElevenLabs - Voice Cloning', url: 'https://elevenlabs.io/docs/product-guides/voices/voice-cloning/instant-voice-cloning' }
    ],
    toolQuickStarts: {
      ElevenLabs:
        'Write script in short spoken blocks. Use Voice Lab for cloning (1 min for Instant, 5 min for Professional). Adjust pacing with punctuation. Generate 2-3 voice variations to compare.',
      ChatGPT:
        'Tighten transitions between sections. Paste script and ask for "smoother listener flow" or "natural bridges." Keep edits minimal.',
      'CapCut AI':
        'Import voiceover, use Text > Auto Captions. Sync subtitles to narration timing. Export with captions burned in or as SRT.'
    },
    detailedTutorial: [
      {
        title: 'Write script in short spoken cadence blocks',
        body: 'Write for ears, not eyes. Use short sentences. Add natural pauses with line breaks. Aim for 8-12 words per line. Read aloud as you write—if it feels choppy, shorten. Include emphasis cues in brackets if needed (e.g. [pause], [emphasis on X]).',
        substeps: [
          'Break script into 8-12 word lines',
          'Add line breaks for natural pauses',
          'Read aloud and adjust for flow',
          'Note any pronunciation or emphasis needs'
        ]
      },
      {
        title: 'Generate 2-3 voice variations in ElevenLabs',
        body: 'Open ElevenLabs. Use Voice Lab to select or clone a voice. Instant cloning needs 1 min of audio; Professional needs ~5 min. Generate 2-3 takes with different voice styles. Compare tone fit for your audience and content type.',
        toolRef: 'ElevenLabs',
        substeps: [
          'Select or clone voice in Voice Lab',
          'Paste script in short blocks',
          'Generate 2-3 variations (different voices or settings)',
          'Listen and compare tone fit',
          'Select best match for audience'
        ],
        toolTips: [
          'Use punctuation for pacing—commas = short pause, periods = longer',
          'Keep audio consistent and noise-free for cloning',
          'Single speaker only in clone samples'
        ]
      },
      {
        title: 'Adjust pacing, emphasis, and pronunciation',
        body: 'In ElevenLabs, use the playback controls to adjust. Add emphasis with punctuation or SSML if supported. Re-generate sections that feel off. Export the final take with timing notes for caption sync.',
        toolRef: 'ElevenLabs',
        substeps: [
          'Adjust stability and clarity sliders if needed',
          'Re-generate sections with different punctuation',
          'Export final audio (WAV or MP3)',
          'Note total duration for caption timing'
        ]
      },
      {
        title: 'Tighten transitions in ChatGPT',
        body: 'Paste your script into ChatGPT. Ask it to improve transitions between sections for smoother listener flow. Apply only edits that preserve your voice and key phrases.',
        toolRef: 'ChatGPT',
        examplePrompt: `Improve the transitions between these script sections for smoother listener flow. Keep my voice and key phrases. Return revised script only. [paste script]`,
        toolTips: [
          'Focus on section bridges, not full rewrite',
          'Apply edits selectively',
          'Re-read aloud after changes'
        ]
      },
      {
        title: 'Import into CapCut and sync subtitles',
        body: 'Import your voiceover and visuals into CapCut. Use Text > Auto Captions, select "Voiceover" or "Original sound" as source. Generate captions, then edit any errors. Style for readability. Export with captions burned in or as separate SRT.',
        toolRef: 'CapCut AI',
        substeps: [
          'Import voiceover and video/assets',
          'Text > Auto Captions > select voiceover source',
          'Generate, edit errors, apply style',
          'Export in target format'
        ]
      }
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
      { label: 'HeyGen Help', url: 'https://help.heygen.com/' },
      { label: 'HeyGen Academy', url: 'https://www.heygen.com/academy/ai-studio/how-to-create-a-new-project' }
    ],
    toolQuickStarts: {
      HeyGen:
        'AI Studio: Create Video > Start from Scratch. Write script in editor, select avatar from library. Keep videos under 180 seconds. Use consistent avatar and voice settings for batch.',
      'Canva AI':
        'Create branded graphics and subtitle style. Use one template for all 5 videos. Export in 1080p for HeyGen overlay.',
      ChatGPT:
        'Create 5 topic-specific script versions from one master framework. Preserve hook, value, CTA structure. Specify "same voice profile" for consistency.'
    },
    detailedTutorial: [
      {
        title: 'Write master script framework',
        body: 'Create a template with three blocks: Hook (first 5 seconds), Value (main content), CTA (last 5 seconds). Keep each block concise. This framework gets customized per topic but preserves structure.',
        substeps: [
          'Hook block: question, claim, or story tease',
          'Value block: 2-4 key points',
          'CTA block: one clear action',
          'Total length: 45-90 seconds per video'
        ]
      },
      {
        title: 'Create 5 topic-specific versions in ChatGPT',
        body: 'Paste your framework into ChatGPT. Ask for 5 topic-specific versions that preserve the hook/value/CTA structure and one consistent voice profile. Specify tone and audience. Output as 5 separate scripts.',
        toolRef: 'ChatGPT',
        examplePrompt: `Using this script framework: [paste]. Create 5 topic-specific versions for: [list 5 topics]. Preserve the hook, value, CTA structure. Use one consistent voice (e.g. friendly, authoritative). Each script 45-90 seconds when read. Format as Script 1, Script 2, etc.`,
        toolTips: [
          'Keep voice profile consistent across all 5',
          'Vary content, not structure',
          'Ensure each script stands alone'
        ]
      },
      {
        title: 'Generate avatar videos in HeyGen',
        body: 'Open HeyGen AI Studio. Create Video > Start from Scratch. Select portrait or landscape. Paste script 1, choose avatar and voice. Use consistent settings for all 5. Generate. Repeat for scripts 2-5. Keep each under 180 seconds for best results.',
        toolRef: 'HeyGen',
        substeps: [
          'Create Video > Start from Scratch',
          'Paste script, select avatar from library',
          'Choose voice, set expressiveness (Low/Normal/High)',
          'Generate video',
          'Repeat with same avatar/voice for all 5 scripts'
        ],
        toolTips: [
          'Keep videos under 180 seconds',
          'Standardize avatar and voice before batching',
          'Avatar IV offers higher quality but uses more credits'
        ]
      },
      {
        title: 'Create branded graphics in Canva AI',
        body: 'Design supporting graphics and subtitle style in Canva. Use one template: same fonts, colors, logo placement. Create lower-thirds, end cards, or B-roll overlays. Export for HeyGen or composite in CapCut.',
        toolRef: 'Canva AI',
        substeps: [
          'Create template with brand fonts and colors',
          'Design lower-thirds, end cards as needed',
          'Export in 1080p',
          'Add to HeyGen scenes or composite in editor'
        ]
      },
      {
        title: 'Export posting queue with metadata',
        body: 'Export all 5 videos. Create a spreadsheet: title, description, CTA tag, platform. Use consistent naming. Schedule posts with 1-2 day spacing.',
        substeps: [
          'Export all 5 in 1080p',
          'Write title and description per video',
          'Add CTA tags for tracking',
          'Schedule in platform or use scheduler'
        ]
      }
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
      { label: 'Synthesia Academy', url: 'https://academy.synthesia.io/' },
      { label: 'Synthesia - Training Videos', url: 'https://www.synthesia.io/post/training-videos' }
    ],
    toolQuickStarts: {
      Synthesia:
        '5-step flow: Input content (script, PDF, URL) > Outline scenes > Edit (avatars, voices, B-roll) > Design (branding, quizzes) > Generate. Supports 160+ languages, 240+ avatars. Export MP4 or SCORM for LMS.',
      'Notion AI':
        'Use to outline lesson sections and comprehension checkpoints. Highlight text, Ask AI for "Add comprehension checkpoints" or "Break into sections."',
      'Canva AI':
        'Design companion slides and reference visuals. Use Magic Design for consistent style. Export for Synthesia B-roll or as downloadable assets.'
    },
    detailedTutorial: [
      {
        title: 'Define learning objective and completion metric',
        body: 'Start with one measurable outcome: "By the end, the learner will be able to..." Add a completion metric (quiz score, checklist, or reflection). This guides your lesson structure and Synthesia scene planning.',
        substeps: [
          'Write one learning objective',
          'Define completion metric (quiz, checklist, etc.)',
          'List 3-5 key concepts to cover',
          'Note any prerequisites'
        ]
      },
      {
        title: 'Outline lesson sections in Notion AI',
        body: 'Use Notion AI to outline lesson sections and comprehension checkpoints. Paste your objective and key concepts. Ask for "Lesson outline with 4-6 sections and a comprehension checkpoint after each." Refine the outline before scripting.',
        toolRef: 'Notion AI',
        examplePrompt: `Create a lesson outline for: [objective]. Key concepts: [list]. Include 4-6 sections with a comprehension checkpoint (1-2 questions) after each. Format: Section title, bullet points, checkpoint.`,
        toolTips: [
          'Keep sections short—3-5 min each',
          'Checkpoints reinforce learning',
          'Use /ai block for persistent outline'
        ]
      },
      {
        title: 'Convert sections into Synthesia scripts',
        body: 'For each section, write a concise presenter script. One scene = one concept. Keep scripts short (30-90 seconds). Use Synthesia Assistant (beta) to help write or refine. Add scene descriptions for B-roll or visuals.',
        toolRef: 'Synthesia',
        substeps: [
          'Create new Synthesia project',
          'Input outline or paste section by section',
          'Select AI avatar and voice per scene',
          'Add B-roll or screen recording if needed',
          'Insert comprehension checkpoints as quiz blocks'
        ],
        toolTips: [
          'Keep scene scripts short and singular in focus',
          'Use Synthesia Assistant for script suggestions',
          'Add interactive elements (quizzes, buttons) for engagement'
        ]
      },
      {
        title: 'Design companion slides in Canva AI',
        body: 'Create slides or reference visuals for each section. Use one template. Export as images for Synthesia B-roll or as downloadable PDF for learners. Align with lesson narrative.',
        toolRef: 'Canva AI',
        substeps: [
          'Create slide template with brand style',
          'One slide per key concept',
          'Export as PNG or PDF',
          'Upload to Synthesia or attach as resource'
        ]
      },
      {
        title: 'Export and create assessment prompts',
        body: 'Generate your Synthesia video. Export as MP4 or SCORM for LMS. Create assessment prompts (quiz questions, reflection prompts) for learners. Add to lesson page or LMS.',
        toolRef: 'Synthesia',
        substeps: [
          'Generate video in Synthesia',
          'Export MP4 or SCORM',
          'Create assessment (quiz, reflection)',
          'Package with downloadable reinforcement assets'
        ]
      }
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
      { label: 'Jasper - Campaigns', url: 'https://www.jasper.ai/solutions/campaigns' },
      { label: 'Grammarly', url: 'https://www.grammarly.com/' }
    ],
    toolQuickStarts: {
      Jasper:
        'Use Campaigns or Canvas for full-funnel copy. Define audience and offer in Brand IQ. Generate multiple angles per funnel stage. Use Grid for batch generation.',
      Grammarly:
        'Paste copy and run clarity, tone, and grammar checks. Apply high-impact edits only. Use at the end of your workflow, not the start.',
      'Canva AI':
        'Align copy to visuals. Use Magic Write for headlines. Create channel publishing sheet with copy + visual specs.'
    },
    detailedTutorial: [
      {
        title: 'Define audience, offer, and objection map',
        body: 'Before generating copy, document: audience segment, offer promise, and top 3 objections. This informs your message angles and ensures Jasper outputs stay on-brand. Use Jasper Brand IQ if available.',
        substeps: [
          'Define audience segment (demographics, pain points)',
          'Write offer promise in one sentence',
          'List top 3 objections and counter-messages',
          'Set tone (professional, casual, urgent)'
        ]
      },
      {
        title: 'Generate campaign concept variants in Jasper',
        body: 'In Jasper Campaigns or Canvas, input your audience and offer. Generate concept variants for each funnel stage: awareness (problem-focused), consideration (solution-focused), conversion (offer-focused). Request 2-3 angles per stage. Select the strongest narrative.',
        toolRef: 'Jasper',
        substeps: [
          'Open Campaigns or Canvas',
          'Input audience and offer context',
          'Generate awareness-stage angles (problem, pain)',
          'Generate consideration angles (solution, proof)',
          'Generate conversion angles (offer, CTA)',
          'Select one narrative thread across stages'
        ],
        toolTips: [
          'Use Brand IQ for consistent voice',
          'Generate multiple angles before choosing',
          'Campaigns solution transforms briefs into on-brand content'
        ]
      },
      {
        title: 'Draft copy assets in Jasper',
        body: 'With your chosen narrative, draft: ad hooks (3-5 options), body copy, CTA blocks. Use Jasper templates or free-form. Request channel-specific formats (Meta ad, Google ad, landing section, email opener).',
        toolRef: 'Jasper',
        substeps: [
          'Draft 3-5 ad hooks',
          'Write body copy for each funnel stage',
          'Create CTA blocks (primary, secondary)',
          'Format for each channel (ads, landing, email)'
        ]
      },
      {
        title: 'Run Grammarly pass',
        body: 'Paste all copy into Grammarly. Run clarity and tone checks. Apply only edits that improve message precision. Reject changes that alter your voice or key phrases. Use at the end of the workflow.',
        toolRef: 'Grammarly',
        toolTips: [
          'Use Grammarly at the end, not the start',
          'Apply high-impact edits only',
          'Keep edits aligned with original intent'
        ]
      },
      {
        title: 'Align copy to visuals in Canva AI',
        body: 'Create or update visuals to match copy. Use Canva Magic Write for headline variations. Build a channel publishing sheet: asset, copy, dimensions, platform. Prepare for deployment.',
        toolRef: 'Canva AI',
        substeps: [
          'Match visuals to ad hooks and CTAs',
          'Create channel-specific formats',
          'Build publishing sheet (asset + copy + specs)',
          'Export and schedule'
        ]
      }
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
      { label: 'Notion AI', url: 'https://www.notion.com/product/ai' },
      { label: 'Notion AI - Summarize Guide', url: 'https://guides.ai/how-to-summarize-in-notion-ai/' }
    ],
    toolQuickStarts: {
      Grammarly:
        'Paste draft and run grammar, clarity, readability checks. Set audience and tone in settings. Apply only high-impact edits. Use at the end of your workflow.',
      'Notion AI':
        'Use to summarize final takeaways and CTA clarity. Highlight key sections, Ask AI for "Summarize key takeaways" or "Is the CTA clear?"'
    },
    detailedTutorial: [
      {
        title: 'Finalize first draft and confirm audience and tone',
        body: 'Complete your draft before running any checks. Confirm your target audience (e.g. technical, general) and tone target (formal, casual, persuasive) in Grammarly settings. This ensures suggestions align with your goals.',
        substeps: [
          'Finish first draft',
          'Open Grammarly and set audience',
          'Set tone (e.g. confident, friendly, formal)',
          'Ensure document is complete'
        ]
      },
      {
        title: 'Run Grammarly checks',
        body: 'Let Grammarly scan for grammar, clarity, and readability. Review suggestions. Prioritize: grammar errors first, then clarity, then style. Apply only changes that improve message precision.',
        toolRef: 'Grammarly',
        substeps: [
          'Run full Grammarly check',
          'Address critical grammar issues',
          'Review clarity suggestions',
          'Apply readability improvements selectively'
        ],
        toolTips: [
          'Use Grammarly at the end of your workflow, not the start',
          'Reject suggestions that change your voice',
          'Focus on high-impact edits only'
        ]
      },
      {
        title: 'Apply only high-impact edits',
        body: 'Not every suggestion is right. Apply edits that fix errors or significantly improve clarity. Skip changes that are stylistic preferences or alter your intent. When in doubt, read the sentence aloud—if it sounds right, keep it.',
        substeps: [
          'Apply grammar and spelling fixes',
          'Accept clarity edits that improve precision',
          'Skip style suggestions that change your voice',
          'Re-read edited sections'
        ]
      },
      {
        title: 'Use Notion AI to summarize takeaways and CTA',
        body: 'Paste your final draft into Notion. Use Notion AI to summarize key takeaways and check CTA clarity. Ask: "Summarize the main takeaways" and "Is the CTA clear and actionable?" Use the output as a final QA checklist.',
        toolRef: 'Notion AI',
        examplePrompt: `Summarize the key takeaways from this draft. Then evaluate: Is the CTA clear and actionable? Return: 3 bullet takeaways + 1 sentence on CTA clarity.`,
        toolTips: [
          'Use for final pass, not drafting',
          'Summaries help you verify message landed',
          'Save QA checklist for future pieces'
        ]
      },
      {
        title: 'Approve and publish with saved QA checklist',
        body: 'Review the Notion AI summary. Confirm takeaways and CTA are correct. Save your QA checklist (grammar, clarity, tone, CTA) for reuse. Approve and move to publish.',
        substeps: [
          'Verify takeaways match intent',
          'Confirm CTA is clear',
          'Save QA checklist template',
          'Publish'
        ]
      }
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
      { label: 'Fireflies - How to Use', url: 'https://fireflies.ai/blog/how-to-use-fireflies-ai/' },
      { label: 'ChatGPT', url: 'https://openai.com/chatgpt/' }
    ],
    toolQuickStarts: {
      'Fireflies AI':
        'Sign up, connect calendar. Fred bot auto-joins Zoom/Meet/Teams. Transcript + summary + action items ready 5-10 min after call. Or upload MP3/M4A/WAV/MP4. Enable speaker tagging.',
      ChatGPT:
        'Paste transcript excerpts. Ask for "content angles," "key talking points," or "newsletter angles." Specify format (bullets, brief, etc.).',
      'Notion AI':
        'Create editorial briefs with deadlines and owners. Use database for idea stage, theme, CTA. Use AI to summarize and prioritize.'
    },
    detailedTutorial: [
      {
        title: 'Record and transcribe calls in Fireflies',
        body: 'Create account at fireflies.ai. Connect Google Calendar or Outlook. In Settings, enable Auto-join and select which meetings Fred should join (Zoom, Meet, Teams). For manual capture: install Chrome extension or upload files (MP3, M4A, WAV, MP4). Enable speaker tagging for multi-person calls. Transcript and summary ready 5-10 min after call.',
        toolRef: 'Fireflies AI',
        substeps: [
          'Sign up and connect calendar',
          'Enable Auto-join for target meeting types',
          'Or use Chrome extension / file upload',
          'Enable speaker tagging in settings',
          'Wait for transcript and summary'
        ],
        toolTips: [
          'Use consistent meeting names and tags for search',
          '95% transcription accuracy across 100+ languages',
          'Summary and action items auto-generated'
        ]
      },
      {
        title: 'Extract high-signal insights from transcript',
        body: 'Review the transcript. Look for: repeated pain points, objections, decision triggers, stories, and "aha" moments. Note timestamps. Extract 5-10 high-signal excerpts. These become your content angles.',
        substeps: [
          'Read transcript with content lens',
          'Highlight repeated pain points',
          'Note objections and how they were addressed',
          'Extract strong quotes or stories',
          'List 5-10 content-worthy insights with timestamps'
        ]
      },
      {
        title: 'Transform findings into content angles with ChatGPT',
        body: 'Paste your extracted insights into ChatGPT. Ask for content angles: blog ideas, newsletter angles, clip ideas, social posts. Specify format. Request 3-5 angles ranked by audience demand.',
        toolRef: 'ChatGPT',
        examplePrompt: `From this meeting transcript excerpt: [paste]. Extract content angles. Generate: 2 newsletter angles, 2 blog ideas, 2 clip ideas (with timestamps). Rank by audience demand. Format as bullet list.`,
        toolTips: [
          'Include context (meeting type, participants)',
          'Request specific formats per platform',
          'Use timestamps for clip ideas'
        ]
      },
      {
        title: 'Organize in Notion AI as editorial briefs',
        body: 'Create a Notion database for content ideas. Fields: idea stage, theme, CTA, deadline, owner. Add each angle as a page. Use Notion AI to summarize and add priority scores. Create editorial briefs with deadlines and owners.',
        toolRef: 'Notion AI',
        substeps: [
          'Create database with: stage, theme, CTA, deadline, owner',
          'Add each content angle as a page',
          'Use Notion AI to summarize and score',
          'Assign deadlines and owners',
          'Sort by priority'
        ]
      },
      {
        title: 'Run weekly review and prioritize',
        body: 'Each week, review the backlog. Prioritize ideas with highest audience demand signal (comments, questions, engagement). Move top ideas to "In progress." Archive or deprioritize low-signal items.',
        substeps: [
          'Review backlog weekly',
          'Score by demand signal',
          'Move top 3-5 to In progress',
          'Update deadlines and owners',
          'Archive low-priority ideas'
        ]
      }
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
      { label: 'n8n - First Workflow Tutorial', url: 'https://docs.n8n.io/try-it-out/tutorial-first-workflow' },
      { label: 'Notion AI', url: 'https://www.notion.com/product/ai' }
    ],
    toolQuickStarts: {
      n8n:
        'Workflow = trigger + nodes + connections. Sign up at n8n.cloud (or self-host). Triggers: webhook, schedule, form. Nodes: HTTP, OpenAI, Notion. Add branching with IF nodes. Configure failure alerts.',
      ChatGPT:
        'Use for AI draft generation node. Pass idea/context, get draft back. Can also use for summarization or routing logic prompts.',
      'Notion AI':
        'Store outputs in Notion database. Fields: status, SLA, owner, content type. Use for human review checkpoints and routing metadata.'
    },
    detailedTutorial: [
      {
        title: 'Map your content process and identify branch points',
        body: 'Document your end-to-end content flow: idea intake, drafting, review, publishing. Identify where decisions branch (e.g. by content type, priority, or assignee). Draw a simple flowchart before building in n8n.',
        substeps: [
          'List all steps from idea to publish',
          'Identify decision points (type, priority, owner)',
          'Note which steps need human review',
          'Map data flow between steps'
        ]
      },
      {
        title: 'Build n8n trigger workflows',
        body: 'Sign up at n8n.cloud. Create a new workflow. Add trigger: Webhook (for form submissions), Schedule (for recurring), or Form (for idea intake). Test the trigger to ensure data flows. Add a second workflow for status transitions if needed.',
        toolRef: 'n8n',
        substeps: [
          'Create workflow, add Trigger node',
          'Choose: Webhook, Schedule, or Form',
          'Configure trigger (e.g. every Monday 9am)',
          'Test trigger and verify output data'
        ],
        toolTips: [
          'Design branch logic before building nodes',
          'n8n has 400+ integrations',
          'Use webhook for external form submissions'
        ]
      },
      {
        title: 'Add AI draft generation and human review checkpoints',
        body: 'Add an OpenAI or HTTP node to call ChatGPT API. Pass idea/context, get draft. Add an IF node to branch by content type or priority. Add a manual approval or Notion update for human review. Route approved items to next step.',
        toolRef: 'n8n + ChatGPT',
        substeps: [
          'Add OpenAI node with prompt template',
          'Pass idea/context from trigger',
          'Add IF node for branching (e.g. by type)',
          'Add Notion "Create page" or "Update" for review queue',
          'Add manual trigger or wait for approval'
        ],
        toolTips: [
          'Add validation checks between major steps',
          'Use Notion database for review queue',
          'Include SLA and ownership in metadata'
        ]
      },
      {
        title: 'Route outputs into Notion database',
        body: 'Add Notion nodes to create or update database rows. Map workflow output to Notion fields: status, SLA, owner, content type, draft link. Use filters to route by type or priority.',
        toolRef: 'Notion AI',
        substeps: [
          'Create Notion database with required fields',
          'Add Notion node, map fields from previous nodes',
          'Set status based on workflow stage',
          'Add owner and SLA from workflow data'
        ]
      },
      {
        title: 'Add failure alerts and retry logic',
        body: 'Configure error handling. Add retry on failure for critical nodes. Add an Error Trigger or email/Slack notification on workflow failure. Test failure scenarios to ensure alerts fire.',
        toolRef: 'n8n',
        substeps: [
          'Enable retry on critical nodes (3 attempts)',
          'Add Error Trigger workflow',
          'Connect to Slack or email for alerts',
          'Test by forcing a failure'
        ],
        toolTips: [
          'Configure alerts for mission-critical nodes',
          'Use retry for transient failures (API rate limits)',
          'Document failure response procedure'
        ]
      }
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
      { label: 'beehiiv', url: 'https://www.beehiiv.com/' },
      { label: 'beehiiv - Newsletter Design', url: 'https://www.beehiiv.com/blog/how-to-design-your-newsletter-inside-beehiiv' }
    ],
    toolQuickStarts: {
      'Notion AI':
        'Create database with idea stage, theme, CTA. Use Ask AI to summarize raw notes into publishable insights. Use AI Summary property for auto-summaries on new entries.',
      Beehiiv:
        'Create newsletter, use templates. Move approved drafts from Notion. Use segments for CTA targeting. Add UTM params. Track opens and clicks by theme.',
      ChatGPT:
        'Draft issue skeletons from top-priority insight cards. Paste 3-5 insights, ask for "newsletter issue outline with lead, proof, CTA."'
    },
    detailedTutorial: [
      {
        title: 'Create Notion database for content ideas',
        body: 'Create a Notion database with fields: idea stage (Backlog, In progress, Approved), theme, CTA, priority, and notes. This becomes your single source of truth for newsletter content. Add a template for new ideas.',
        toolRef: 'Notion AI',
        substeps: [
          'Create new database',
          'Add properties: Stage, Theme, CTA, Priority, Notes',
          'Add AI Summary property for auto-summaries',
          'Create template for new idea capture'
        ]
      },
      {
        title: 'Summarize raw notes with Notion AI',
        body: 'Paste raw notes, meeting takeaways, or saved articles into database pages. Use Notion AI to summarize into publishable insight candidates. Ask: "Summarize into 2-3 sentence insight suitable for newsletter." Score by business relevance.',
        toolRef: 'Notion AI',
        examplePrompt: `Summarize this note into a 2-3 sentence newsletter insight. Keep the key takeaway and one supporting detail. Tone: [your tone].`,
        toolTips: [
          'Summarize and score ideas for relevance',
          'Use AI Summary property for persistent summaries',
          'Treat AI output as first draft, not final'
        ]
      },
      {
        title: 'Draft issue skeletons with ChatGPT',
        body: 'Select top-priority insight cards from your database. Paste 3-5 into ChatGPT. Ask for a newsletter issue skeleton: lead (from strongest insight), proof/example, CTA block. Use your recurring template structure.',
        toolRef: 'ChatGPT',
        examplePrompt: `Create a newsletter issue skeleton from these insights: [paste 3-5]. Structure: Lead (strongest insight), Proof/Example, CTA block. One CTA only. Tone: [your tone]. Return outline only.`,
        toolTips: [
          'Use top-priority insights from Notion',
          'Keep one CTA per issue',
          'Paste template structure for consistency'
        ]
      },
      {
        title: 'Move approved drafts to Beehiiv',
        body: 'Write the full draft from your skeleton. Move to Beehiiv: create new post, paste content, format. Use segmented CTA targeting if you have segments. Add UTM parameters to all links. Schedule for your audience window.',
        toolRef: 'Beehiiv',
        substeps: [
          'Write full draft from skeleton',
          'Create new post in Beehiiv',
          'Paste and format (headings, bullets)',
          'Add UTM params to links',
          'Select segment for CTA if applicable',
          'Schedule send'
        ]
      },
      {
        title: 'Track opens and clicks by theme',
        body: 'After sending, review Beehiiv analytics. Note opens and clicks by theme or topic. Use this to guide next issue planning—double down on themes that perform, test new angles for underperformers.',
        substeps: [
          'Review open rate and click rate',
          'Break down by theme or topic',
          'Note top-performing content',
          'Adjust next issue planning'
        ]
      }
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
      { label: 'ChatGPT', url: 'https://openai.com/chatgpt/' },
      { label: 'Canva - Magic Studio Guide', url: 'https://www.canva.com/magic/' }
    ],
    toolQuickStarts: {
      'Canva AI':
        'Use Magic Design for carousel templates. Pick one base style, duplicate for variations. Use Magic Write for slide copy. Align typography, spacing, brand colors across all slides.',
      ChatGPT:
        'Generate slide copy frameworks with concise bullet structure. Specify "5 slides per carousel, hook slide + 3 value slides + CTA slide." Request 5 carousels for 5 subtopics.'
    },
    detailedTutorial: [
      {
        title: 'Define weekly theme and 5 subtopics',
        body: 'Choose one weekly theme (e.g. productivity tips, marketing trends). Break it into 5 subtopics for 5 carousel posts. Each subtopic should be a standalone takeaway. Order by hook strength or logical flow.',
        substeps: [
          'Select one weekly theme',
          'List 5 subtopics',
          'Ensure each subtopic is self-contained',
          'Order for posting sequence'
        ]
      },
      {
        title: 'Generate slide copy frameworks in ChatGPT',
        body: 'Prompt ChatGPT for carousel slide copy. Request: hook slide, 3 value slides (concise bullets), CTA slide. Specify 5 carousels (one per subtopic). Use consistent structure across all.',
        toolRef: 'ChatGPT',
        examplePrompt: `Create 5 carousel frameworks for weekly theme: [theme]. Subtopics: [list 5]. Each carousel: 1) Hook slide (1 sentence), 2) Value slides (3 slides, 3-5 bullets each), 3) CTA slide. Concise, scannable. Format as Carousel 1, Carousel 2, etc.`,
        toolTips: [
          'Keep bullets short—3-7 words each',
          'One clear CTA per carousel',
          'Use one template structure for all 5'
        ]
      },
      {
        title: 'Design base style and duplicate in Canva AI',
        body: 'Open Canva. Use Magic Design or templates to create one base carousel design. Set fonts, colors, spacing. Duplicate 5 times. Swap text for each subtopic. Ensure typography and brand colors align across all.',
        toolRef: 'Canva AI',
        substeps: [
          'Create first carousel with base style',
          'Set fonts, colors, spacing',
          'Duplicate design 4 times',
          'Swap slide text for each subtopic',
          'Verify visual consistency'
        ],
        toolTips: [
          'One template family = faster batch',
          'Use high contrast for readability',
          'End every carousel with one clear CTA'
        ]
      },
      {
        title: 'Export and schedule posting sequence',
        body: 'Export all 5 carousels in platform-ready format (1080x1080 for Instagram, 1080x1350 for portrait). Create a schedule: post one per day or space over the week. Use consistent hashtags and captions.',
        substeps: [
          'Export in 1080x1080 or 1080x1350',
          'Write caption and hashtags per carousel',
          'Schedule in platform or scheduler',
          'Space posts 12-24 hours apart'
        ]
      }
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
      { label: 'Grammarly', url: 'https://www.grammarly.com/' },
      { label: 'Zapier', url: 'https://zapier.com/' }
    ],
    toolQuickStarts: {
      Perplexity:
        'Research one strategic topic with citation-backed insights. Use precise questions. Copy findings with source links. Pro Search for multi-step research.',
      Jasper:
        'Generate 3 post angles mapped to awareness, problem, solution. Use Brand IQ for voice. Create primary post + 3 follow-up comments. Use Campaigns or Canvas.',
      Grammarly:
        'Polish tone and clarity. Apply before posting. Use at end of workflow. Keep edits aligned with your voice.',
      Zapier:
        'Connect LinkedIn engagement to CRM or Notion. Trigger on new connection, message, or form response. Add lead source tags. Route to follow-up sequence.'
    },
    detailedTutorial: [
      {
        title: 'Use Perplexity to collect source-backed insights',
        body: 'Open Perplexity. Research one strategic topic for the week. Request 8-10 citation-backed insights. Focus on recent data, trends, or expert opinions. Copy findings with source links. This becomes your content foundation.',
        toolRef: 'Perplexity',
        examplePrompt: `What are the top 3 [strategic topic] trends for [audience] in 2025? Provide 8-10 specific insights with sources from the last 6 months. Include statistics or expert quotes where possible. Format as bullets with citations.`,
        toolTips: [
          'Build authority on one clear topic cluster',
          'Use citations to add credibility',
          'Pro Search for deeper research'
        ]
      },
      {
        title: 'Generate 3 post angles in Jasper',
        body: 'In Jasper, input your Perplexity findings. Generate 3 post angles: one for awareness (problem/pain), one for consideration (solution/insight), one for conversion (offer/CTA). Map to funnel stages. Select one primary post and draft 3 follow-up comments for engagement.',
        toolRef: 'Jasper',
        substeps: [
          'Paste Perplexity insights into Jasper',
          'Generate awareness-stage post (problem, trend)',
          'Generate consideration post (solution, framework)',
          'Generate conversion post (offer, CTA)',
          'Select primary post, draft 3 comment variations'
        ],
        toolTips: [
          'Pair original posts with strategic comments',
          'Use Brand IQ for consistent voice',
          'Comments extend reach—use thoughtfully'
        ]
      },
      {
        title: 'Polish in Grammarly',
        body: 'Paste your primary post and comments into Grammarly. Run clarity and tone checks. Apply edits that improve precision. Ensure your voice comes through. Finalize one primary post and 3 follow-up comments.',
        toolRef: 'Grammarly',
        toolTips: [
          'Track response quality, not just surface engagement',
          'Keep edits minimal—preserve your voice',
          'Use at end of workflow'
        ]
      },
      {
        title: 'Use Zapier to capture engagement signals',
        body: 'Create a Zap: trigger = new LinkedIn connection, message, or form response. Action = add to CRM or Notion with lead source tag. Route high-intent leads to follow-up sequence. This captures leads from your content engagement.',
        toolRef: 'Zapier',
        substeps: [
          'Create Zap, choose LinkedIn trigger',
          'Connect account, select event',
          'Add action: create/update CRM or Notion record',
          'Map lead source and engagement data',
          'Test and enable'
        ]
      },
      {
        title: 'Weekly review and angle iteration',
        body: 'At week end, review performance: which post got most engagement, which comments drove replies, which led to connections or DMs. Iterate angles for next cycle. Double down on what resonates.',
        substeps: [
          'Review engagement by post',
          'Note which angles performed best',
          'Track connection and DM quality',
          'Plan next week angles based on data'
        ]
      }
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
