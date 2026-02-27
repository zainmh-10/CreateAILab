export type PromptLevel = 'Basic' | 'Intermediate' | 'Advanced';

export type PromptTemplate = {
  id: string;
  title: string;
  level: PromptLevel;
  free: boolean;
  workflow: string;
  content: string;
};

const basicPrompts: PromptTemplate[] = [
  {
    id: 'b1',
    title: 'YouTube Hook Generator',
    level: 'Basic',
    free: true,
    workflow: '10x YouTube Script Generation',
    content: `Give me 12 YouTube opening hooks for this topic: [TOPIC].
Target audience: [AUDIENCE].
Each hook must be under 14 words and trigger curiosity without clickbait.
Label each hook as Curiosity, Proof, Contrarian, or Urgency.
Pick the best 3 and explain why each one should increase first 30 second retention.`
  },
  {
    id: 'b2',
    title: 'Simple Script Outline',
    level: 'Basic',
    free: true,
    workflow: '10x YouTube Script Generation',
    content: `Create a short YouTube script outline for this title: [TITLE].
Use exactly 6 sections: Hook, Problem, Mistake, Fix, Example, Call to action.
For each section write one clear line and one supporting bullet.
Keep language simple enough for a beginner creator to present on camera.`
  },
  {
    id: 'b3',
    title: 'Newsletter Angle Finder',
    level: 'Basic',
    free: true,
    workflow: 'Automated Newsletter Pipeline',
    content: `Generate 8 newsletter angles from this theme: [THEME].
Audience segment: [SEGMENT].
For each angle include: working subject line, one sentence value promise, and one proof point.
Sort from fastest to write to hardest to write.`
  },
  {
    id: 'b4',
    title: 'Weekly Newsletter Draft',
    level: 'Basic',
    free: true,
    workflow: 'Automated Newsletter Pipeline',
    content: `Draft this week newsletter issue for [BRAND].
Topic: [TOPIC].
Use this structure only: opener, one practical lesson, one quick story, one action task, one soft offer.
Word count target is 350 to 450 words.
Finish with two subject line options.`
  },
  {
    id: 'b5',
    title: 'Short Form Idea Sprint',
    level: 'Basic',
    free: true,
    workflow: 'Faceless TikTok Channel Setup',
    content: `Brainstorm 20 faceless TikTok ideas in the niche [NICHE].
Each idea needs a 5 second hook and one sentence concept.
Mark difficulty as Easy, Medium, or Hard for solo production.
Return the best 5 ideas for a first week posting plan.`
  },
  {
    id: 'b6',
    title: 'Repurpose Summary Prompt',
    level: 'Basic',
    free: true,
    workflow: 'Blog to Multi Platform Repurposing',
    content: `Turn this blog post into platform ready summaries.
Source text: [PASTE BLOG].
Output exactly: one LinkedIn post outline, one X thread outline, one email teaser, one Reel caption.
Keep the core message identical across all outputs.`
  },
  {
    id: 'b7',
    title: 'Podcast Clip Finder',
    level: 'Basic',
    free: true,
    workflow: 'Podcast to Clips Production System',
    content: `Read this podcast transcript and identify 10 clip moments.
Transcript: [PASTE TRANSCRIPT].
For each moment provide: start phrase, end phrase, why it is clip worthy, and ideal platform.
Prioritize moments with clear tension, surprise, or tactical value.`
  },
  {
    id: 'b8',
    title: 'Lead Magnet Headline Set',
    level: 'Basic',
    free: true,
    workflow: 'Lead Magnet Prompt Funnel',
    content: `Write 15 lead magnet titles for [AUDIENCE] who want [OUTCOME].
Use a mix of checklist, framework, and swipe file style titles.
Avoid hype words.
Choose the top 3 titles with short reasons based on conversion potential.`
  },
  {
    id: 'b9',
    title: 'Beginner CTA Generator',
    level: 'Basic',
    free: true,
    workflow: 'Lead Magnet Prompt Funnel',
    content: `Create 20 call to action lines for a lead magnet landing page.
Offer: [LEAD MAGNET].
Tone: [TONE].
Group CTAs into low pressure, direct, and urgency backed.
Keep each CTA under 10 words.`
  },
  {
    id: 'b10',
    title: 'Thumbnail Text Variants',
    level: 'Basic',
    free: true,
    workflow: '10x YouTube Script Generation',
    content: `Generate 18 thumbnail text options for this video idea: [IDEA].
Each option must be 2 to 4 words.
Avoid repeating verbs.
Tag each option as Emotion, Curiosity, or Outcome.
Recommend the strongest pair of thumbnail text plus title.`
  }
];

const intermediatePromptSeeds: PromptTemplate[] = [
  {
    id: 'i1',
    title: 'Script to Shot Breakdown',
    level: 'Intermediate',
    free: false,
    workflow: '10x YouTube Script Generation',
    content: `Convert this script into a production sheet: [SCRIPT].
Return a table with scene number, spoken line, camera framing, visual insert, on screen text, and estimated duration.
Flag any scene where pacing is likely to drag.
End with a total runtime estimate and 3 pacing improvements.`
  },
  {
    id: 'i2',
    title: 'Audience Objection Handler',
    level: 'Intermediate',
    free: false,
    workflow: '10x YouTube Script Generation',
    content: `For this video topic [TOPIC], map the top 7 audience objections that prevent action.
Write one objection handling segment for each objection.
Each segment must include empathy, proof, and one actionable next step.
Place each segment at the best point in a YouTube script timeline.`
  },
  {
    id: 'i3',
    title: 'Retention Drop Fix Prompt',
    level: 'Intermediate',
    free: false,
    workflow: '10x YouTube Script Generation',
    content: `You are an expert creator operations strategist.
Workflow context is 10x YouTube Script Generation.
Primary goal is rewriting weak sections to improve retention at key timestamps.
Use this retention data: [RETENTION NOTES].
Rewrite only the weak zones and preserve the creator voice.
Output format:
1 Objective
2 Step by step repair plan
3 Ready to use rewritten script block
4 QA checklist
5 Next action
Also provide two alternate rewrites with tradeoffs and include KPI targets for average view duration and 30 second retention.`
  },
  {
    id: 'i4',
    title: 'Newsletter KPI Planner',
    level: 'Intermediate',
    free: false,
    workflow: 'Automated Newsletter Pipeline',
    content: `Design a newsletter KPI system for [NEWSLETTER NAME].
Current metrics: [METRICS].
Build a weekly dashboard with leading indicators and lagging indicators.
Include thresholds that trigger subject line testing, content length adjustment, and send time changes.
Give me a 4 week experiment schedule.`
  },
  {
    id: 'i5',
    title: 'Segmented Newsletter Draft',
    level: 'Intermediate',
    free: false,
    workflow: 'Automated Newsletter Pipeline',
    content: `Write three versions of one newsletter for these segments: [SEGMENT A], [SEGMENT B], [SEGMENT C].
Topic is [TOPIC].
Keep the core lesson consistent but change examples, tone, and CTA by segment intent.
Show the segment specific subject line and opening paragraph for each version.`
  },
  {
    id: 'i6',
    title: 'Editorial Calendar Builder',
    level: 'Intermediate',
    free: false,
    workflow: 'Automated Newsletter Pipeline',
    content: `Build a 30 day newsletter calendar for [NICHE].
Need 2 issues per week plus one bonus send.
For each send provide theme, key story, reader action, and monetization angle.
Balance educational and conversion focused issues.
Mark which issues should be evergreen.`
  },
  {
    id: 'i7',
    title: 'Short Form Batch Scripting',
    level: 'Intermediate',
    free: false,
    workflow: 'Faceless TikTok Channel Setup',
    content: `Create a batch of 12 faceless TikTok scripts for [NICHE].
Each script must include a hook line, core point, visual instruction, and CTA.
Cap each script at 90 spoken words.
Sequence scripts so week one builds authority and week two pushes conversion.`
  },
  {
    id: 'i8',
    title: 'Voiceover Polishing Prompt',
    level: 'Intermediate',
    free: false,
    workflow: 'Faceless TikTok Channel Setup',
    content: `Polish these TikTok scripts for voiceover delivery: [SCRIPTS].
Improve rhythm, sentence length variation, and breath points.
Mark emphasis words in uppercase.
Remove tongue twisters and awkward transitions.
Return final scripts plus a narrator pacing guide.`
  },
  {
    id: 'i9',
    title: 'Visual Prompt Pack',
    level: 'Intermediate',
    free: false,
    workflow: 'Faceless TikTok Channel Setup',
    content: `Generate visual prompt sets for 10 faceless TikTok videos in [NICHE].
For each video provide one image generation prompt, one B roll search prompt, and one caption style direction.
Ensure visual tone is consistent across the set.
Add a do not use list to protect brand style.`
  },
  {
    id: 'i10',
    title: 'Repurpose Output Matrix',
    level: 'Intermediate',
    free: false,
    workflow: 'Blog to Multi Platform Repurposing',
    content: `Take this article and build a repurposing matrix: [ARTICLE].
Output a matrix for LinkedIn, X, Instagram, YouTube Shorts, and email.
For each platform define content format, hook angle, word count target, and CTA.
Include one KPI per platform that indicates successful adaptation.`
  },
  {
    id: 'i11',
    title: 'LinkedIn Thought Leadership Rewrite',
    level: 'Intermediate',
    free: false,
    workflow: 'Blog to Multi Platform Repurposing',
    content: `Rewrite this blog into a thought leadership LinkedIn post.
Source: [BLOG TEXT].
Use a personal insight opener, one contrarian claim, one practical framework, and a discussion CTA.
Do not sound academic.
Keep the final post between 180 and 240 words.`
  },
  {
    id: 'i12',
    title: 'Email Teaser and Social Combo',
    level: 'Intermediate',
    free: false,
    workflow: 'Blog to Multi Platform Repurposing',
    content: `From this source content [SOURCE], create one email teaser and four social teaser variants.
Each social teaser must target a different emotional trigger.
Email teaser must drive clicks without revealing the full lesson.
Return all outputs with a matching CTA strategy.`
  },
  {
    id: 'i13',
    title: 'Clip Packaging Prompt',
    level: 'Intermediate',
    free: false,
    workflow: 'Podcast to Clips Production System',
    content: `Package these identified podcast clips for distribution: [CLIP NOTES].
For each clip write title, opening subtitle line, caption copy, and hashtag set.
Specify which clip fits Shorts, Reels, or TikTok best and why.
Prioritize clips likely to generate saves and shares.`
  },
  {
    id: 'i14',
    title: 'Episode Summary Transformer',
    level: 'Intermediate',
    free: false,
    workflow: 'Podcast to Clips Production System',
    content: `Turn this transcript into listener assets: [TRANSCRIPT].
Return episode summary, 6 chapter markers, key quotes, and a one minute host read recap.
Highlight one signature insight that can become a recurring series theme.
Keep language natural and listener focused.`
  },
  {
    id: 'i15',
    title: 'Clip Distribution Sequence',
    level: 'Intermediate',
    free: false,
    workflow: 'Podcast to Clips Production System',
    content: `Build a 14 day distribution plan for 10 podcast clips.
Inputs: [CLIP LIST], [AUDIENCE PROFILE].
For each day assign platform, posting time, caption intent, and engagement follow up action.
Include rule based adjustments if first 3 posts underperform.`
  },
  {
    id: 'i16',
    title: 'Lead Magnet Landing Copy',
    level: 'Intermediate',
    free: false,
    workflow: 'Lead Magnet Prompt Funnel',
    content: `Write a conversion focused landing page for this lead magnet: [OFFER].
Audience pain point: [PAIN].
Include headline, subhead, benefit bullets, proof section, FAQ, and final CTA block.
Provide two headline options with different persuasion angles.`
  },
  {
    id: 'i17',
    title: 'Opt In Sequence Writer',
    level: 'Intermediate',
    free: false,
    workflow: 'Lead Magnet Prompt Funnel',
    content: `Create a 5 email opt in nurture sequence after someone downloads [LEAD MAGNET].
Goal is move subscriber from free value to next paid step.
Define objective for each email, key message, and CTA.
Include one re engagement email if no clicks by day 4.`
  },
  {
    id: 'i18',
    title: 'Affiliate Bridge Email',
    level: 'Intermediate',
    free: false,
    workflow: 'Lead Magnet Prompt Funnel',
    content: `Write an affiliate bridge email tied to this lead magnet: [LEAD MAGNET].
Affiliate offer: [OFFER].
Use story plus proof plus transition structure.
Avoid hard sell language.
End with a credibility anchored CTA and one plain text version.`
  },
  {
    id: 'i19',
    title: 'Prompt Pack Formatter',
    level: 'Intermediate',
    free: false,
    workflow: 'Lead Magnet Prompt Funnel',
    content: `Transform these raw prompts into a sellable prompt pack: [RAW PROMPTS].
For each prompt provide use case, expected output, input fields, and quick win example.
Group prompts by beginner, growth, and scaling goals.
Add concise usage notes for non technical users.`
  },
  {
    id: 'i20',
    title: 'Offer Positioning Refiner',
    level: 'Intermediate',
    free: false,
    workflow: 'Lead Magnet Prompt Funnel',
    content: `Refine positioning for this offer: [OFFER DETAILS].
Target segment: [SEGMENT].
Return positioning statement, differentiator, proof narrative, and objection responses.
Then write one homepage hero block and one lead magnet bridge paragraph aligned to that position.`
  }
];

const advancedPromptSeeds: PromptTemplate[] = [
  {
    id: 'a1',
    title: 'Multi Variant Hook Testing Engine',
    level: 'Advanced',
    free: false,
    workflow: '10x YouTube Script Generation',
    content: `Build a high confidence hook testing engine for a YouTube video.
Inputs: topic [TOPIC], audience segments [SEGMENTS], channel baseline retention [BASELINE].
Produce 24 hooks mapped to segment intent and awareness stage.
Create a pre publish scoring model using novelty, clarity, and promise credibility.
Define exact accept reject rules so only top scoring hooks move to production.
Return final selection with expected first 30 second retention lift and rationale.`
  },
  {
    id: 'a2',
    title: 'Narrative Arc Optimizer',
    level: 'Advanced',
    free: false,
    workflow: '10x YouTube Script Generation',
    content: `Engineer a narrative arc for this script draft: [SCRIPT].
Objective is maximize watch duration without inflating runtime.
Map emotional state transitions every 45 seconds.
Insert proof events, pattern interrupts, and tension resets at the moments most likely to prevent drop off.
Deliver revised script map plus timing chart and risk notes for monotony zones.`
  },
  {
    id: 'a3',
    title: 'Script QA Rubric Generator',
    level: 'Advanced',
    free: false,
    workflow: '10x YouTube Script Generation',
    content: `Design a weighted script quality rubric for YouTube production teams.
Must score hook strength, audience relevance, proof density, pacing, and CTA alignment.
Each category needs explicit scoring anchors from 1 to 5.
Add hard fail criteria that block publishing.
Then apply the rubric to this script: [SCRIPT].
Return score, failure points, and exact rewrite instructions by section.`
  },
  {
    id: 'a4',
    title: 'Persona Specific Script Forking',
    level: 'Advanced',
    free: false,
    workflow: '10x YouTube Script Generation',
    content: `Fork one core YouTube script into 3 persona tuned versions.
Personas: [P1], [P2], [P3].
Keep central teaching identical while changing framing, examples, and objection handling.
For each persona include recommended title, thumbnail direction, and opening 20 seconds.
End with a deployment rule that says which version should publish first based on channel analytics.`
  },
  {
    id: 'a5',
    title: 'Topic Cluster Strategy Prompt',
    level: 'Advanced',
    free: false,
    workflow: '10x YouTube Script Generation',
    content: `Create a 30 day YouTube topic cluster strategy around [CORE THEME].
Design 12 videos that compound authority and naturally lead to [BUSINESS GOAL].
Map dependencies so each episode references a previous insight and tees up the next one.
Include expected audience journey from discovery to conversion.
Provide kill criteria for weak topic branches after week two.`
  },
  {
    id: 'a6',
    title: 'Newsletter Revenue Mapping',
    level: 'Advanced',
    free: false,
    workflow: 'Automated Newsletter Pipeline',
    content: `Architect a revenue mapped newsletter system for [NEWSLETTER].
Inputs: audience segments, offer stack, current monetization data.
Assign each newsletter block to one monetization purpose such as trust building, demand creation, or direct conversion.
Create a send sequence that maximizes long term revenue per subscriber.
Output monetization map, editorial rules, and measurement model.`
  },
  {
    id: 'a7',
    title: 'Automation Failure Recovery Plan',
    level: 'Advanced',
    free: false,
    workflow: 'Automated Newsletter Pipeline',
    content: `Design a failure resilient newsletter automation protocol.
Stack includes content generation, approval, scheduling, and delivery.
Define failure modes, early warning signals, fallback actions, and owner accountability for each mode.
Add an emergency manual send workflow that preserves brand quality under time pressure.
Return runbook format ready for team adoption.`
  },
  {
    id: 'a8',
    title: 'Cross Segment Offer Personalization',
    level: 'Advanced',
    free: false,
    workflow: 'Automated Newsletter Pipeline',
    content: `Build a personalization model for newsletter offers across segments.
Inputs: segment behavior data [DATA], offers [OFFERS], send history [HISTORY].
Define decision logic for which offer narrative should appear for each segment.
Generate personalized offer blocks for top 4 segments.
Include compliance guardrails and over personalization risk controls.`
  },
  {
    id: 'a9',
    title: 'Editorial Risk Scanner',
    level: 'Advanced',
    free: false,
    workflow: 'Automated Newsletter Pipeline',
    content: `Create an editorial risk scanner for newsletter drafts.
It must detect credibility gaps, legal exposure, unsupported claims, and tone mismatch with brand standards.
Produce a pass fail checklist and a severity ranking model.
Run the scanner against this draft: [DRAFT].
Return corrected copy for all high severity flags only.`
  },
  {
    id: 'a10',
    title: 'Newsletter Experiment Roadmap',
    level: 'Advanced',
    free: false,
    workflow: 'Automated Newsletter Pipeline',
    content: `Plan an 8 week newsletter experimentation roadmap.
Constraints: fixed list size, limited design resources, weekly send cadence.
Prioritize tests with highest expected lift in open rate, click rate, and revenue per send.
For each week define hypothesis, test design, success threshold, and next action rule.
Include a stop loss mechanism for experiments that reduce trust signals.`
  },
  {
    id: 'a11',
    title: 'Short Form Series Architecture',
    level: 'Advanced',
    free: false,
    workflow: 'Faceless TikTok Channel Setup',
    content: `Design a faceless TikTok series architecture for 4 weeks in niche [NICHE].
Create 3 recurring series pillars with clear audience promise.
For each pillar define hook style, visual grammar, and CTA progression.
Map how each video advances viewers from passive consumption to profile click and then to lead capture.
Return a calendar plus production batching logic.`
  },
  {
    id: 'a12',
    title: 'Hook to Retention Analyzer',
    level: 'Advanced',
    free: false,
    workflow: 'Faceless TikTok Channel Setup',
    content: `Analyze first 3 seconds performance for these clips: [CLIP METRICS].
Diagnose why viewers drop or stay by hook type, pacing, and visual reveal timing.
Generate redesigned openings for underperforming clips.
Each redesign must include exact spoken line, first shot instruction, and subtitle rhythm.
Add predicted retention gain with confidence level.`
  },
  {
    id: 'a13',
    title: 'Creative Direction System Prompt',
    level: 'Advanced',
    free: false,
    workflow: 'Faceless TikTok Channel Setup',
    content: `Develop a reusable creative direction system for a faceless TikTok brand.
Inputs: brand personality [BRAND], audience profile [AUDIENCE], business goal [GOAL].
Define non negotiable style rules for color mood, pacing, text overlays, and sound design.
Include quality gates that prevent off brand outputs.
Return a master prompt and a short operator guide for editors.`
  },
  {
    id: 'a14',
    title: 'Comment to Content Feedback Loop',
    level: 'Advanced',
    free: false,
    workflow: 'Faceless TikTok Channel Setup',
    content: `Create a comment driven content optimization loop.
Input set is comment export from last 30 videos: [COMMENTS].
Cluster comments by confusion, demand, objection, and testimonial signal.
Translate clusters into next 15 video concepts with priority scoring.
Provide a weekly process for repeating this loop with minimal manual effort.`
  },
  {
    id: 'a15',
    title: 'Repurposing Automation Blueprint',
    level: 'Advanced',
    free: false,
    workflow: 'Blog to Multi Platform Repurposing',
    content: `Design an automation blueprint that repurposes one long form blog into 7 platform specific assets.
Inputs: article text, brand voice rules, channel priorities.
Define transformation logic per platform including format constraints and CTA intent.
Add approval checkpoints and rollback conditions when quality falls below threshold.
Return system map and implementation steps by tool.`
  },
  {
    id: 'a16',
    title: 'Voice Consistency Enforcement Prompt',
    level: 'Advanced',
    free: false,
    workflow: 'Blog to Multi Platform Repurposing',
    content: `Build a voice consistency enforcement protocol for multi platform content.
Use this style reference: [STYLE GUIDE].
Create measurable voice markers and disallowed language patterns.
Apply protocol to this content batch: [BATCH].
Return corrected versions plus a compliance scorecard for each platform asset.`
  },
  {
    id: 'a17',
    title: 'Omnichannel Narrative Sequencing',
    level: 'Advanced',
    free: false,
    workflow: 'Blog to Multi Platform Repurposing',
    content: `Craft an omnichannel narrative sequence from one flagship article.
Goal is guide audience from awareness to action across LinkedIn, X, email, and short video captions.
Define the specific message handoff between channels so each asset builds on the previous one.
Output sequence timeline, content briefs, and conversion intent by touchpoint.`
  },
  {
    id: 'a18',
    title: 'Podcast Clip Funnel Optimizer',
    level: 'Advanced',
    free: false,
    workflow: 'Podcast to Clips Production System',
    content: `Engineer a podcast clip funnel that drives listeners to a clear conversion event.
Inputs: episode transcript [TRANSCRIPT], offer [OFFER], audience stage map [STAGES].
Select clip moments by funnel stage and intent.
Write packaging copy for each stage and define CTA progression.
Include attribution tracking plan to measure which clips generate conversions.`
  },
  {
    id: 'a19',
    title: 'Transcript Insight Miner',
    level: 'Advanced',
    free: false,
    workflow: 'Podcast to Clips Production System',
    content: `Mine this transcript for proprietary insights and reusable frameworks: [TRANSCRIPT].
Extract novel claims, practical methods, and quote worthy lines.
Group findings into themes that can power future episodes and short clips.
Return insight inventory, content opportunities, and editorial gaps to fill in next recording.`
  },
  {
    id: 'a20',
    title: 'Lead Magnet Lifecycle Optimizer',
    level: 'Advanced',
    free: false,
    workflow: 'Lead Magnet Prompt Funnel',
    content: `Design an end to end lead magnet lifecycle optimizer.
Inputs: traffic sources [SOURCES], lead magnet [MAGNET], email sequence data [EMAIL DATA], sales outcomes [SALES DATA].
Map leakage points from click to opt in to nurture to conversion.
Prescribe precise fixes for each leakage point with expected metric impact.
Output a 21 day implementation plan with daily actions, owners, and validation KPIs.`
  }
];

const workflowContext = {
  '10x YouTube Script Generation': {
    intermediate: `Context pack:
Creator profile: [CREATOR TYPE]
Content pillar: [CONTENT PILLAR]
Average view duration baseline: [AVD BASELINE]
Primary traffic source: [TRAFFIC SOURCE]
Core conversion event: [CONVERSION EVENT]
Make each recommendation improve retention, clarity, and conversion intent.`,
    advanced: `Strategic context:
Channel stage: [CHANNEL STAGE]
Recent 10 video performance summary: [PERFORMANCE SNAPSHOT]
Audience sophistication level: [AWARENESS LEVEL]
Production constraints: [TEAM SIZE], [EDITING CAPACITY], [PUBLISH CADENCE]
Monetization target tied to this content: [REVENUE GOAL]
System requirements:
Use explicit decision rules, include pre publish QA gates, and define post publish optimization triggers from actual watch behavior.`
  },
  'Automated Newsletter Pipeline': {
    intermediate: `Context pack:
Newsletter model: [NEWSLETTER MODEL]
Primary segment and intent: [SEGMENT]
Current baseline metrics: [OPEN RATE], [CLICK RATE], [REPLY RATE]
Offer being supported: [OFFER]
Keep output aligned to weekly execution reality and measurable improvement.`,
    advanced: `Strategic context:
Monetization architecture: [OFFERS], [LTV TARGET], [SEASONAL GOALS]
Data environment: [ANALYTICS STACK], [TRACKING LIMITS]
Operational constraints: [WRITING CAPACITY], [DESIGN CAPACITY], [APPROVAL SLA]
System requirements:
Include risk controls for reputation and compliance, define experiment stop rules, and provide a feedback loop that compounds subscriber value month over month.`
  },
  'Faceless TikTok Channel Setup': {
    intermediate: `Context pack:
Niche and audience promise: [NICHE], [PROMISE]
Posting cadence: [CADENCE]
Production stack: [TOOLS]
Current performance baseline: [VIEW BASELINE], [HOLD RATE]
Optimize for watch through, repeatability, and low friction production.`,
    advanced: `Strategic context:
Channel growth objective: [GROWTH GOAL]
Creative constraints: [VISUAL STYLE], [VOICE STYLE], [EDIT SPEED]
Distribution channels beyond TikTok: [SECONDARY CHANNELS]
System requirements:
Design repeatable content systems with quality gates, rapid iteration loops, and contingency actions when retention or completion drops below threshold.`
  },
  'Blog to Multi Platform Repurposing': {
    intermediate: `Context pack:
Source asset quality level: [SOURCE QUALITY]
Brand voice priorities: [VOICE TRAITS]
Target platforms and audience intent: [PLATFORMS]
Repurposing objective: [AWARENESS or LEAD GEN or CONVERSION]
Keep each output native to its platform while preserving one consistent thesis.`,
    advanced: `Strategic context:
Content operating model: [SOLO or TEAM]
Publishing volume target: [VOLUME TARGET]
Funnel position of each platform: [FUNNEL MAP]
System requirements:
Define transformation logic, QA controls, and attribution assumptions so repurposed assets increase conversion efficiency without diluting message integrity.`
  },
  'Podcast to Clips Production System': {
    intermediate: `Context pack:
Show format and audience profile: [SHOW FORMAT], [AUDIENCE]
Episode objective: [OBJECTIVE]
Distribution focus: [PLATFORM PRIORITY]
Current clip performance baseline: [BASELINE]
Prioritize moments that drive saves, shares, and intent to consume the long form episode.`,
    advanced: `Strategic context:
Content to revenue path: [REVENUE PATH]
Host authority angle: [AUTHORITY POSITION]
Publishing workflow constraints: [TURNAROUND TIME], [EDITOR BANDWIDTH]
System requirements:
Create clip selection logic tied to funnel stages, include instrumentation assumptions, and specify optimization actions for low performing clip cohorts.`
  },
  'Lead Magnet Prompt Funnel': {
    intermediate: `Context pack:
Ideal customer profile: [ICP]
Lead magnet promise: [PROMISE]
Email stack and send limits: [EMAIL STACK]
Primary conversion target after opt in: [TARGET OFFER]
Outputs must connect opt in value to a realistic next step without trust loss.`,
    advanced: `Strategic context:
Acquisition channels: [CHANNELS]
Offer ladder: [ENTRY], [CORE], [BACKEND]
Conversion baselines and bottlenecks: [BASELINES], [BOTTLENECKS]
System requirements:
Engineer lifecycle logic with leakage diagnostics, decision thresholds, and optimization loops that improve both conversion rate and lead quality over time.`
  }
} as const;

function enrichIntermediatePrompt(prompt: PromptTemplate): PromptTemplate {
  const context = workflowContext[prompt.workflow as keyof typeof workflowContext]?.intermediate;
  const enrichedContent = `${prompt.content}

Intermediate execution requirements:
Deliverables must be implementation ready, not conceptual.
Include assumptions and how to validate each one quickly.
Provide two alternative approaches with tradeoff analysis.
Define KPI targets and a seven day action sequence.
Return output in a format a creator operator can run immediately.
${context ? `\n${context}` : ''}`;

  return { ...prompt, content: enrichedContent };
}

function enrichAdvancedPrompt(prompt: PromptTemplate): PromptTemplate {
  const context = workflowContext[prompt.workflow as keyof typeof workflowContext]?.advanced;
  const enrichedContent = `${prompt.content}

Advanced execution requirements:
Treat this as a high stakes operator brief.
State assumptions, dependencies, and failure points explicitly.
Include decision thresholds that determine whether to scale, iterate, or stop.
Add instrumentation plan with leading and lagging indicators.
Provide red team critique of the proposed plan and mitigation actions.
Return a 30 day optimization system with weekly review checkpoints and escalation triggers.
The final output must be precise enough that an execution team can deploy without clarification questions.
${context ? `\n${context}` : ''}`;

  return { ...prompt, content: enrichedContent };
}

const intermediatePrompts = intermediatePromptSeeds.map(enrichIntermediatePrompt);
const advancedPrompts = advancedPromptSeeds.map(enrichAdvancedPrompt);

export const promptTemplates: PromptTemplate[] = [
  ...basicPrompts,
  ...intermediatePrompts,
  ...advancedPrompts
];

export const promptLibraryStats = {
  total: promptTemplates.length,
  basicFree: basicPrompts.length,
  intermediate: intermediatePrompts.length,
  advanced: advancedPrompts.length
};
