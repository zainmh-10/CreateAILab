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
    content: `Turn this script into a shoot ready production sheet.
Script: [SCRIPT]
Format the output as a table with scene number, spoken line, scene objective, camera framing, visual insert or b roll, on screen text, edit cue, and estimated duration.
Break scenes at idea shifts, not paragraph breaks.
Flag any scene where pacing is likely to drag because the explanation repeats, the visual does not change, or the payoff arrives too late.
End with total runtime estimate, drag risk notes, and 3 pacing fixes that improve retention without losing clarity.`
  },
  {
    id: 'i2',
    title: 'Audience Objection Handler',
    level: 'Intermediate',
    free: false,
    workflow: '10x YouTube Script Generation',
    content: `Build an objection handling map for this YouTube topic: [TOPIC].
Identify the 7 objections most likely to stop the viewer from believing the claim, trusting the creator, or taking the next step.
For each objection, return:
1 the hidden fear behind it
2 the best place to answer it in the script
3 a spoken line that handles it naturally on camera
4 one proof device to support the line such as data, example, demo, or personal result
5 one transition sentence back into the main narrative.
End by ranking which objections must be handled early, mid video, and near the CTA.`
  },
  {
    id: 'i3',
    title: 'Retention Drop Fix Prompt',
    level: 'Intermediate',
    free: false,
    workflow: '10x YouTube Script Generation',
    content: `Repair the weak retention zones in this YouTube script without rewriting the whole piece.
Retention notes: [RETENTION NOTES]
For each weak zone, identify the likely reason for the drop such as slow setup, repeated explanation, weak proof, late payoff, or unclear transition.
Then return:
1 timestamp or section name
2 diagnosis
3 repair tactic
4 rewritten replacement lines
5 what visual or edit change should support the rewrite.
Preserve creator voice and only touch the sections that are hurting retention.
End with one QA pass that checks whether the repaired script earns a stronger next reason to keep watching.`
  },
  {
    id: 'i4',
    title: 'Newsletter KPI Planner',
    level: 'Intermediate',
    free: false,
    workflow: 'Automated Newsletter Pipeline',
    content: `Design a weekly KPI operating sheet for [NEWSLETTER NAME].
Current metrics: [METRICS].
Build one working dashboard with acquisition, engagement, monetization, and list health sections.
For each KPI include the definition, why it matters, healthy range, warning range, and operator action when it drops.
Add trigger rules for when to test subject lines, shorten copy, change send time, or suppress low intent segments.
Finish with a four week experiment calendar ordered by fastest likely win.`
  },
  {
    id: 'i5',
    title: 'Segmented Newsletter Draft',
    level: 'Intermediate',
    free: false,
    workflow: 'Automated Newsletter Pipeline',
    content: `Write three segment specific versions of one newsletter.
Segments: [SEGMENT A], [SEGMENT B], [SEGMENT C]
Topic: [TOPIC]
Keep the core lesson the same, but adapt framing, examples, objection handling, and CTA based on what each segment cares about most.
For each segment, return:
1 subject line
2 opening paragraph
3 one section that changes materially for that segment
4 CTA and why it fits that audience.
Finish with one note explaining which version should perform best and why.`
  },
  {
    id: 'i6',
    title: 'Editorial Calendar Builder',
    level: 'Intermediate',
    free: false,
    workflow: 'Automated Newsletter Pipeline',
    content: `Build a 30 day newsletter calendar for [NICHE].
Publishing requirement: 2 core issues per week plus 1 bonus send.
For each send, provide the theme, angle, audience intent, key story or teaching point, reader action, and monetization role.
Balance trust building, demand creation, and direct conversion so the calendar does not feel sales heavy.
Label which sends are evergreen, which depend on timely context, and which should only deploy when there is a strong offer match.
End with the best order for week one.`
  },
  {
    id: 'i7',
    title: 'Short Form Batch Scripting',
    level: 'Intermediate',
    free: false,
    workflow: 'Faceless TikTok Channel Setup',
    content: `Create a two week faceless TikTok batch for [NICHE].
Write 12 scripts split into 3 authority builders, 3 myth breakers, 3 proof based clips, and 3 conversion leaning clips.
For each script include hook, spoken body, visual beats, subtitle style cue, and CTA.
Cap each script at 90 spoken words and make the first sentence usable as an on screen hook.
Sequence the batch so week one earns trust and week two increases profile clicks or offer intent.`
  },
  {
    id: 'i8',
    title: 'Voiceover Polishing Prompt',
    level: 'Intermediate',
    free: false,
    workflow: 'Faceless TikTok Channel Setup',
    content: `Polish these TikTok scripts for smoother voiceover delivery: [SCRIPTS].
Improve rhythm, breath control, emphasis placement, and sentence transitions without changing the core meaning.
Mark emphasis words in uppercase and insert slash marks where a narrator should pause.
Remove phrases that feel robotic, overly long, or awkward to say out loud.
Return:
1 clean final scripts
2 narrator pacing notes
3 one line on where the energy should rise or soften in each script.`
  },
  {
    id: 'i9',
    title: 'Visual Prompt Pack',
    level: 'Intermediate',
    free: false,
    workflow: 'Faceless TikTok Channel Setup',
    content: `Generate a visual prompt pack for 10 faceless TikTok videos in [NICHE].
For each video, provide:
1 image generation prompt
2 B roll search prompt
3 motion or transition direction
4 caption style note
5 one visual mistake to avoid.
Keep the full set visually consistent so the channel feels recognizable, not random.
End with a shared do not use list that protects brand feel across all 10 videos.`
  },
  {
    id: 'i10',
    title: 'Repurpose Output Matrix',
    level: 'Intermediate',
    free: false,
    workflow: 'Blog to Multi Platform Repurposing',
    content: `Turn this article into a platform conversion matrix: [ARTICLE].
Create one row each for LinkedIn, X, Instagram, YouTube Shorts, and email.
For every platform define:
1 native content format
2 audience intent at that touchpoint
3 opening angle
4 core takeaway to preserve
5 recommended CTA
6 success KPI
7 one mistake that would make the asset feel copied instead of native.
End with the best publishing order if all assets launch from the same source piece.`
  },
  {
    id: 'i11',
    title: 'LinkedIn Thought Leadership Rewrite',
    level: 'Intermediate',
    free: false,
    workflow: 'Blog to Multi Platform Repurposing',
    content: `Rewrite this blog into a LinkedIn thought leadership post.
Source: [BLOG TEXT]
Use a personal insight opener, one strong point of view, one practical framework, and a comment generating close.
Make it sound like an operator sharing a hard won lesson, not a brand rep or essay writer.
Keep the post between 180 and 240 words.
Also provide one backup opener if the first opener feels too polished or too safe.`
  },
  {
    id: 'i12',
    title: 'Email Teaser and Social Combo',
    level: 'Intermediate',
    free: false,
    workflow: 'Blog to Multi Platform Repurposing',
    content: `Use this source content to create one email teaser and four social teaser variants: [SOURCE].
Each social teaser should lean on a different trigger such as curiosity, urgency, proof, status, or pain.
The email teaser should create enough intrigue to earn the click without giving away the full lesson.
Return each asset with:
1 hook
2 body copy
3 CTA
4 why that CTA fits the asset's intent.`
  },
  {
    id: 'i13',
    title: 'Clip Packaging Prompt',
    level: 'Intermediate',
    free: false,
    workflow: 'Podcast to Clips Production System',
    content: `Package these podcast clips for distribution: [CLIP NOTES].
For each clip, return a packaging card with:
1 platform fit ranking
2 title
3 first subtitle line
4 caption
5 comment pin prompt
6 reason this clip earns a save, share, or profile click.
Also note whether the clip should be framed as insight, controversy, story, or practical advice.
Prioritize clips with a strong opening payoff in the first 2 seconds.`
  },
  {
    id: 'i14',
    title: 'Episode Summary Transformer',
    level: 'Intermediate',
    free: false,
    workflow: 'Podcast to Clips Production System',
    content: `Turn this transcript into listener ready podcast assets: [TRANSCRIPT].
Return:
1 episode summary
2 six chapter markers with timestamp labels
3 best quotes
4 one minute host read recap
5 one signature insight that deserves to become a recurring theme.
Keep the language natural, specific, and listener first rather than generic show notes copy.`
  },
  {
    id: 'i15',
    title: 'Clip Distribution Sequence',
    level: 'Intermediate',
    free: false,
    workflow: 'Podcast to Clips Production System',
    content: `Build a 14 day distribution sequence for 10 podcast clips.
Inputs: [CLIP LIST], [AUDIENCE PROFILE]
For each day assign the clip, platform, posting window, caption intent, CTA style, and one follow up engagement action.
Sequence the clips so awareness clips warm the audience before stronger conversion or authority clips go live.
Add rule based adjustments for what to do if the first 3 posts underperform on watch time, saves, or profile clicks.`
  },
  {
    id: 'i16',
    title: 'Lead Magnet Landing Copy',
    level: 'Intermediate',
    free: false,
    workflow: 'Lead Magnet Prompt Funnel',
    content: `Write a landing page draft for this lead magnet: [OFFER].
Primary pain point: [PAIN].
Return the page in conversion order: hero, proof, benefit stack, what is inside, who it is for, FAQ, CTA close.
Write two hero directions with different persuasion angles: one pain led and one outcome led.
Make the benefit bullets specific, not generic, and tie each one to a likely reader question.
Add one short objection handling block before the final CTA.`
  },
  {
    id: 'i17',
    title: 'Opt In Sequence Writer',
    level: 'Intermediate',
    free: false,
    workflow: 'Lead Magnet Prompt Funnel',
    content: `Create a 5 email nurture sequence for someone who downloaded [LEAD MAGNET].
Goal: move the subscriber from free value to the next paid or booked step without breaking trust.
For each email, define the job of the email, core message, open loop if relevant, CTA, and what belief it should strengthen.
Include one re engagement email for subscribers who have not clicked by day 4.
Keep the sequence progressive so each email earns the next one.`
  },
  {
    id: 'i18',
    title: 'Affiliate Bridge Email',
    level: 'Intermediate',
    free: false,
    workflow: 'Lead Magnet Prompt Funnel',
    content: `Write an affiliate bridge email connected to this lead magnet: [LEAD MAGNET].
Affiliate offer: [OFFER]
Use a story to bridge from the lead magnet problem into the affiliate solution, then support the transition with proof and a low pressure CTA.
Avoid hard sell language, forced urgency, or exaggerated claims.
Return:
1 primary email
2 plain text version
3 subject line options
4 one note explaining why the bridge feels natural instead of salesy.`
  },
  {
    id: 'i19',
    title: 'Prompt Pack Formatter',
    level: 'Intermediate',
    free: false,
    workflow: 'Lead Magnet Prompt Funnel',
    content: `Transform these raw prompts into a sellable prompt pack: [RAW PROMPTS].
For each prompt, provide a productized card with title, use case, expected output, required inputs, best fit user, and a quick win example.
Group the pack by beginner, growth, and scaling use cases so the buyer can understand progression.
Add concise usage notes written for non technical users.
End with a recommended table of contents and one bundle positioning line for the full pack.`
  },
  {
    id: 'i20',
    title: 'Offer Positioning Refiner',
    level: 'Intermediate',
    free: false,
    workflow: 'Lead Magnet Prompt Funnel',
    content: `Refine the positioning for this offer: [OFFER DETAILS].
Target segment: [SEGMENT]
Return:
1 positioning statement
2 who it is for and not for
3 differentiator
4 proof narrative
5 top objections with concise responses.
Then write one homepage hero block and one lead magnet bridge paragraph that both express the same position in different contexts.`
  }
];

const advancedPromptSeeds: PromptTemplate[] = [
  {
    id: 'a1',
    title: 'Multi Variant Hook Testing Engine',
    level: 'Advanced',
    free: false,
    workflow: '10x YouTube Script Generation',
    content: `Build a high confidence YouTube hook testing engine for one topic.
Inputs:
Topic: [TOPIC]
Audience segments: [SEGMENTS]
Channel baseline retention: [BASELINE]
Recent title and thumbnail patterns: [PATTERNS]
Generate 24 hooks distributed across awareness stage, emotional trigger, and promise type.
Score every hook on novelty, specificity, credibility, tension, thumbnail compatibility, and likely retention impact in the first 30 seconds.
Create a weighted model with clear pass, hold, and reject bands.
Then shortlist the top 5 hooks, show why each could win, what could make it fail, and which thumbnail pairing best supports it.
End with the single production recommendation plus a backup choice if the top hook is too risky for the current audience.`
  },
  {
    id: 'a2',
    title: 'Narrative Arc Optimizer',
    level: 'Advanced',
    free: false,
    workflow: '10x YouTube Script Generation',
    content: `Engineer a retention optimized narrative arc for this script draft: [SCRIPT].
Objective: maximize watch duration without bloating runtime.
Map the viewer's emotional state, clarity level, and curiosity level every 45 seconds.
Identify where the script is spending attention without earning it, where proof arrives too late, and where tension goes flat.
Rebuild the arc with proof events, pattern interrupts, payoff checkpoints, and tension resets positioned where drop off is most likely.
Return the revised narrative map, timing chart, monotony risks, and one section that should be cut entirely if runtime needs tightening.`
  },
  {
    id: 'a3',
    title: 'Script QA Rubric Generator',
    level: 'Advanced',
    free: false,
    workflow: '10x YouTube Script Generation',
    content: `Design a weighted script quality rubric for a YouTube production team.
The rubric must score hook strength, audience relevance, novelty, proof density, pacing, retention logic, and CTA alignment.
Each category needs clear scoring anchors from 1 to 5, plus examples of what good and bad looks like.
Add hard fail criteria that should block a script from moving into production.
Then apply the rubric to this script: [SCRIPT]
Return the total score, category breakdown, fail points, and exact rewrite instructions by section in priority order.`
  },
  {
    id: 'a4',
    title: 'Persona Specific Script Forking',
    level: 'Advanced',
    free: false,
    workflow: '10x YouTube Script Generation',
    content: `Fork one core YouTube script into 3 persona tuned versions.
Personas: [P1], [P2], [P3]
Keep the core teaching identical while changing framing, examples, proof order, objection handling, and CTA emphasis for each persona.
For every version, include:
1 title direction
2 thumbnail concept
3 opening 20 seconds
4 the main belief shift the script should create
5 the reason this persona version could outperform the base version.
End with a deployment rule for which version should publish first and what channel data should determine the winner.`
  },
  {
    id: 'a5',
    title: 'Topic Cluster Strategy Prompt',
    level: 'Advanced',
    free: false,
    workflow: '10x YouTube Script Generation',
    content: `Create a 30 day YouTube topic cluster strategy around [CORE THEME].
Design 12 videos that compound authority and move viewers toward [BUSINESS GOAL].
Map dependencies so each video pays off a previous curiosity loop and tees up the next one.
Separate the cluster into discovery, depth, proof, and conversion roles.
Include the expected audience journey from first touch to repeat view to action.
Provide kill criteria for weak branches after week two and expansion rules for branches that outperform.`
  },
  {
    id: 'a6',
    title: 'Newsletter Revenue Mapping',
    level: 'Advanced',
    free: false,
    workflow: 'Automated Newsletter Pipeline',
    content: `Architect a revenue mapped newsletter system for [NEWSLETTER].
Inputs:
Audience segments: [SEGMENTS]
Offer stack: [OFFERS]
Current monetization data: [MONETIZATION DATA]
Email performance history: [EMAIL HISTORY]
Map the newsletter into revenue functions such as trust building, problem agitation, demand creation, objection handling, and direct conversion.
For each function, specify which segment should receive it, what copy pattern fits best, and what offer it should advance.
Design the send sequence so short term revenue does not cannibalize long term subscriber value.
Return:
1 revenue map by segment
2 editorial rules by email block
3 monetization cadence by week
4 measurement model for revenue per subscriber, click to sale rate, and unsubscribe risk
5 intervention rules when monetization rises but trust signals fall.`
  },
  {
    id: 'a7',
    title: 'Automation Failure Recovery Plan',
    level: 'Advanced',
    free: false,
    workflow: 'Automated Newsletter Pipeline',
    content: `Design a failure resilient newsletter automation recovery protocol.
Stack includes content generation, approval, scheduling, and delivery.
Define the major failure modes, earliest warning signals, fallback actions, owner accountability, and recovery time target for each one.
Add an emergency manual send workflow that protects brand quality under time pressure.
Return the plan as a runbook with severity levels, response steps, escalation logic, and a short postmortem template for repeat incidents.`
  },
  {
    id: 'a8',
    title: 'Cross Segment Offer Personalization',
    level: 'Advanced',
    free: false,
    workflow: 'Automated Newsletter Pipeline',
    content: `Build a personalization model for newsletter offers across segments.
Inputs:
Segment behavior data: [DATA]
Offers: [OFFERS]
Send history: [HISTORY]
Define the decision logic that determines which offer narrative, proof angle, and CTA should appear for each segment.
Generate personalized offer blocks for the top 4 segments and explain why each version fits the segment's buying state.
Include compliance guardrails, over personalization risk controls, and fallback logic for low confidence segmentation.`
  },
  {
    id: 'a9',
    title: 'Editorial Risk Scanner',
    level: 'Advanced',
    free: false,
    workflow: 'Automated Newsletter Pipeline',
    content: `Create an editorial risk scanner for newsletter drafts.
It must detect credibility gaps, legal exposure, unsupported claims, compliance risk, and tone mismatch with brand standards.
Produce a pass fail checklist, a severity ranking model, and a rule for what must be fixed before send approval.
Run the scanner against this draft: [DRAFT]
Return only the high severity issues, why each matters, and corrected copy for those specific sections.`
  },
  {
    id: 'a10',
    title: 'Newsletter Experiment Roadmap',
    level: 'Advanced',
    free: false,
    workflow: 'Automated Newsletter Pipeline',
    content: `Plan an 8 week newsletter experimentation roadmap.
Constraints: fixed list size, limited design resources, weekly send cadence.
Prioritize tests by expected lift, speed to learn, and downside risk to trust.
For each week define the hypothesis, variable being tested, test design, success threshold, rollback rule, and next action if the test wins or loses.
Include a stop loss mechanism for experiments that reduce trust signals such as replies, unsubscribes, or spam complaints.
End with the best first experiment if the team can only run one.`
  },
  {
    id: 'a11',
    title: 'Short Form Series Architecture',
    level: 'Advanced',
    free: false,
    workflow: 'Faceless TikTok Channel Setup',
    content: `Design a four week faceless TikTok series architecture for [NICHE].
Build 3 recurring series pillars with distinct jobs: discovery, authority, and conversion.
For each pillar define audience promise, recurring hook structure, visual grammar, text overlay style, editing rhythm, and CTA progression.
Map how a viewer can move from first exposure to repeat watch to profile click to lead capture across the series.
Add anti fatigue rules so the channel does not feel repetitive by week three.
Return series logic, publishing calendar, batching plan, and performance checkpoints for when a pillar should be scaled, revised, or replaced.`
  },
  {
    id: 'a12',
    title: 'Hook to Retention Analyzer',
    level: 'Advanced',
    free: false,
    workflow: 'Faceless TikTok Channel Setup',
    content: `Analyze first 3 second performance for these clips: [CLIP METRICS].
Diagnose why viewers drop or stay based on hook type, visual reveal timing, subtitle rhythm, pacing, and clarity of promise.
Cluster the clips into winning patterns and failure patterns.
Generate redesigned openings for the underperformers.
Each redesign must include the exact spoken line, first shot instruction, subtitle rhythm, and what should be visually withheld until the payoff.
Add predicted retention gain and confidence level for each redesign.`
  },
  {
    id: 'a13',
    title: 'Creative Direction System Prompt',
    level: 'Advanced',
    free: false,
    workflow: 'Faceless TikTok Channel Setup',
    content: `Develop a reusable creative direction system for a faceless TikTok brand.
Inputs:
Brand personality: [BRAND]
Audience profile: [AUDIENCE]
Business goal: [GOAL]
Define non negotiable style rules for color mood, pacing, text overlays, sound design, camera movement simulation, and edit density.
Include quality gates that prevent off brand outputs and drift over time.
Return a master system prompt, editor operating guide, and a quick audit checklist to judge whether a new asset belongs on the channel.`
  },
  {
    id: 'a14',
    title: 'Comment to Content Feedback Loop',
    level: 'Advanced',
    free: false,
    workflow: 'Faceless TikTok Channel Setup',
    content: `Create a comment driven content optimization loop.
Input set: comment export from the last 30 videos [COMMENTS]
Cluster comments by confusion, demand, objection, testimonial, skepticism, and repeat request.
Translate the clusters into the next 15 video concepts with priority scoring based on demand, strategic fit, and conversion potential.
Also define what should go into content, what should go into community replies, and what should be ignored.
Provide a weekly operating process for repeating the loop with minimal manual effort.`
  },
  {
    id: 'a15',
    title: 'Repurposing Automation Blueprint',
    level: 'Advanced',
    free: false,
    workflow: 'Blog to Multi Platform Repurposing',
    content: `Design an automation blueprint that converts one long form blog into 7 platform specific assets.
Inputs:
Article text: [ARTICLE TEXT]
Brand voice rules: [VOICE RULES]
Channel priorities: [CHANNEL PRIORITIES]
Available tools: [TOOLS]
Define the transformation logic for each destination asset, including what must stay constant, what must be rewritten, and what must be removed for platform fit.
Specify automation steps, human review checkpoints, fallback behavior when source content is weak, and rollback rules when output quality drops below threshold.
Return:
1 system map
2 step by step implementation flow by tool
3 QA checklist
4 failure modes
5 a recommendation for which steps should never be fully automated.`
  },
  {
    id: 'a16',
    title: 'Voice Consistency Enforcement Prompt',
    level: 'Advanced',
    free: false,
    workflow: 'Blog to Multi Platform Repurposing',
    content: `Build a voice consistency enforcement protocol for multi platform content.
Style reference: [STYLE GUIDE]
Create measurable voice markers, approved phrasing patterns, and disallowed language patterns.
Apply the protocol to this content batch: [BATCH]
Return corrected versions, a compliance scorecard for each asset, and a list of recurring drift issues the team should watch for in future outputs.`
  },
  {
    id: 'a17',
    title: 'Omnichannel Narrative Sequencing',
    level: 'Advanced',
    free: false,
    workflow: 'Blog to Multi Platform Repurposing',
    content: `Craft an omnichannel narrative sequence from one flagship article.
Goal: move the audience from awareness to belief to action across LinkedIn, X, email, and short video captions.
Define the exact message handoff between channels so each asset advances the story rather than repeating it.
For each touchpoint, specify narrative role, audience state, key message, CTA, and what curiosity should carry into the next channel.
Return the full sequence timeline, content briefs, and conversion intent by touchpoint.`
  },
  {
    id: 'a18',
    title: 'Podcast Clip Funnel Optimizer',
    level: 'Advanced',
    free: false,
    workflow: 'Podcast to Clips Production System',
    content: `Engineer a podcast clip funnel that drives listeners to a clear conversion event.
Inputs:
Episode transcript: [TRANSCRIPT]
Offer: [OFFER]
Audience stage map: [STAGES]
Current clip metrics if available: [METRICS]
Select clip moments by funnel stage, intent, and emotional payoff.
For each chosen clip define the job it performs in the funnel, the packaging angle, the CTA, and the next best asset the viewer should consume.
Design attribution assumptions so the team can tell whether awareness clips, belief clips, or offer clips are doing the real conversion work.
Return funnel map, selected clips, packaging system, CTA ladder, and measurement plan with failure triggers if clip views rise but assisted conversions do not.`
  },
  {
    id: 'a19',
    title: 'Transcript Insight Miner',
    level: 'Advanced',
    free: false,
    workflow: 'Podcast to Clips Production System',
    content: `Mine this transcript for proprietary insights and reusable frameworks: [TRANSCRIPT].
Extract novel claims, practical methods, recurring ideas, quote worthy lines, and any frameworks that could become signature intellectual property.
Group findings into themes that can power future long form episodes, short clips, newsletters, and lead magnets.
Return:
1 insight inventory
2 strongest reusable frameworks
3 content opportunities
4 ideas that need stronger proof next time
5 editorial gaps to fill in the next recording.`
  },
  {
    id: 'a20',
    title: 'Lead Magnet Lifecycle Optimizer',
    level: 'Advanced',
    free: false,
    workflow: 'Lead Magnet Prompt Funnel',
    content: `Design an end to end lead magnet lifecycle optimizer.
Inputs:
Traffic sources: [SOURCES]
Lead magnet: [MAGNET]
Email sequence data: [EMAIL DATA]
Sales outcomes: [SALES DATA]
Funnel benchmarks if available: [BENCHMARKS]
Map leakage points from click to opt in to nurture to conversion to qualified sale.
For each leakage point, diagnose likely cause, evidence needed, recommended fix, expected metric impact, and what should be tested before rolling the fix out broadly.
Separate quick wins from structural fixes.
Return a 21 day implementation plan with daily actions, owners, validation KPIs, and escalation rules for when opt ins improve but lead quality or downstream conversion gets worse.`
  }
];

type PromptArchetype =
  | 'production'
  | 'editorial'
  | 'planning'
  | 'analysis'
  | 'systems';

function getPromptArchetype(prompt: PromptTemplate): PromptArchetype {
  const title = prompt.title.toLowerCase();

  if (/shot|visual|clip packaging|formatter|creative direction/.test(title)) {
    return 'production';
  }

  if (/rewrite|writer|draft|copy|voiceover|positioning|personalization|teaser|bridge email|landing/.test(title)) {
    return 'editorial';
  }

  if (/planner|calendar|sequence|roadmap|cluster|architecture/.test(title)) {
    return 'planning';
  }

  if (/retention|analyzer|scanner|miner|qa|failure|objection|rubric/.test(title)) {
    return 'analysis';
  }

  return 'systems';
}

function buildIntermediateExecutionFrame(prompt: PromptTemplate) {
  switch (getPromptArchetype(prompt)) {
    case 'production':
      return `Production handoff:
Build the answer so it can be dropped into a production doc today.
State missing assumptions and give one fast validation step for each before filming or editing starts.
Provide two execution routes: lean creator version and upgraded production version, with effort versus payoff tradeoffs.
Set KPI targets for retention, clarity, and conversion intent.
Close with a seven day action sequence that a creator operator can run immediately.`;
    case 'editorial':
      return `Editorial operating brief:
Return copy that is ready to publish or ready to hand to an editor with minimal cleanup.
Call out assumptions about audience intent, offer fit, and tone, then show how to validate each in under one day.
Provide two editorial directions with tradeoffs in speed, distinctiveness, and conversion intent.
Define KPI targets tied to readability, retention, and click or reply behavior.
End with a seven day execution rhythm covering draft, review, publish, and optimization.`;
    case 'planning':
      return `Execution planning brief:
Structure the answer like a working plan, not a brainstorm.
List assumptions, dependencies, and the fastest way to test each one before resources are committed.
Provide a conservative path and a higher upside path, with clear tradeoffs in effort, risk, and likely performance.
Attach KPI targets that determine whether the plan is on track by day 3 and day 7.
Return the final answer in an operator friendly format with dates, owners, and next actions.`;
    case 'analysis':
      return `Diagnostic brief:
Treat this as a performance investigation with a fix plan attached.
State what you are assuming, what evidence would confirm or reject it, and the fastest way to get that evidence.
Offer two remediation paths with tradeoffs in speed, complexity, and expected lift.
Define KPI targets for the repaired asset or workflow and specify what should improve first.
End with a seven day repair sequence that moves from diagnosis to implementation to review.`;
    case 'systems':
    default:
      return `Operator brief:
Make the output implementation ready rather than conceptual.
Spell out assumptions, operating constraints, and fast validation steps before recommending actions.
Provide two workable approaches with tradeoff analysis across retention, clarity, and conversion intent.
Define KPI targets and a seven day execution sequence with concrete actions.
Return the final answer in a format a creator operator can run immediately.`;
  }
}

function buildAdvancedExecutionFrame(prompt: PromptTemplate) {
  switch (getPromptArchetype(prompt)) {
    case 'production':
      return `Production systems command brief:
Treat this as a multi stakeholder handoff for creator, editor, producer, and operator.
Map assumptions, dependencies, resource bottlenecks, QA checkpoints, and likely failure points before recommending the build.
Design a primary production path plus a fallback path for low time, low budget, or low asset availability scenarios.
Add instrumentation for retention, pacing, scene density, and conversion intent, including thresholds for iterate, escalate, or cut.
Finish with a 30 day optimization loop, weekly review checkpoints, and a red team critique with mitigation actions.`;
    case 'editorial':
      return `Editorial control brief:
Treat this as a high stakes messaging system, not a one off draft.
State audience assumptions, persuasion risks, compliance or brand risks, and dependencies that could weaken performance.
Provide a primary editorial architecture plus a secondary architecture, with tradeoffs in speed, authority, retention, and conversion.
Include instrumentation for open rate, hold rate, click depth, reply intent, and downstream conversion where relevant.
Return a 30 day optimization system with review checkpoints, kill criteria, and a red team section that attacks weak claims and messaging gaps.`;
    case 'planning':
      return `Strategic planning command brief:
Build an execution system that can survive real world constraints, not an idealized roadmap.
Make assumptions, dependencies, staffing limits, and sequencing risks explicit before setting the plan.
Provide one lower risk route and one higher leverage route, then define exactly when the team should switch between them.
Add leading and lagging KPI targets, decision thresholds, and escalation triggers for missed milestones.
Close with a 30 day operating sequence, weekly review cadence, and a red team critique of the plan's weakest points.`;
    case 'analysis':
      return `Performance diagnostics command brief:
Treat the response as a fault isolation and optimization document for an execution team.
Identify root cause hypotheses, evidence required, failure modes, and measurement blind spots before prescribing fixes.
Provide a primary fix path and a counter hypothesis path, with tradeoffs in confidence, speed, and expected upside.
Define decision thresholds for scale, iterate, hold, or stop based on leading and lagging indicators.
Return a 30 day optimization system with weekly checkpoints, instrumentation design, and a red team pass on misread signals or false positives.`;
    case 'systems':
    default:
      return `Systems architecture brief:
Treat this as a high stakes operator brief that must be deployable without follow up clarification.
State assumptions, dependencies, edge cases, and failure points explicitly before giving recommendations.
Include a primary architecture and a secondary architecture, with tradeoffs in complexity, speed, resilience, and conversion impact.
Add instrumentation plan with leading and lagging indicators plus thresholds that trigger scale, iterate, or rollback decisions.
Return a 30 day optimization system with weekly checkpoints, escalation logic, and a red team critique with mitigation steps.`;
  }
}

const workflowContext = {
  '10x YouTube Script Generation': {
    intermediate: `YouTube operating context:
Creator profile: [CREATOR TYPE]
Content pillar: [CONTENT PILLAR]
Average view duration baseline: [AVD BASELINE]
Primary traffic source: [TRAFFIC SOURCE]
Core conversion event: [CONVERSION EVENT]
Make each recommendation improve retention, clarity, and conversion intent.`,
    advanced: `YouTube strategy stack:
Channel stage: [CHANNEL STAGE]
Recent 10 video performance summary: [PERFORMANCE SNAPSHOT]
Audience sophistication level: [AWARENESS LEVEL]
Production constraints: [TEAM SIZE], [EDITING CAPACITY], [PUBLISH CADENCE]
Monetization target tied to this content: [REVENUE GOAL]
System pressure test:
Use explicit decision rules, include pre publish QA gates, and define post publish optimization triggers from actual watch behavior.`
  },
  'Automated Newsletter Pipeline': {
    intermediate: `Newsletter operating context:
Newsletter model: [NEWSLETTER MODEL]
Primary segment and intent: [SEGMENT]
Current baseline metrics: [OPEN RATE], [CLICK RATE], [REPLY RATE]
Offer being supported: [OFFER]
Keep output aligned to weekly execution reality and measurable improvement.`,
    advanced: `Newsletter strategy stack:
Monetization architecture: [OFFERS], [LTV TARGET], [SEASONAL GOALS]
Data environment: [ANALYTICS STACK], [TRACKING LIMITS]
Operational constraints: [WRITING CAPACITY], [DESIGN CAPACITY], [APPROVAL SLA]
System pressure test:
Include risk controls for reputation and compliance, define experiment stop rules, and provide a feedback loop that compounds subscriber value month over month.`
  },
  'Faceless TikTok Channel Setup': {
    intermediate: `Short form operating context:
Niche and audience promise: [NICHE], [PROMISE]
Posting cadence: [CADENCE]
Production stack: [TOOLS]
Current performance baseline: [VIEW BASELINE], [HOLD RATE]
Optimize for watch through, repeatability, and low friction production.`,
    advanced: `Short form strategy stack:
Channel growth objective: [GROWTH GOAL]
Creative constraints: [VISUAL STYLE], [VOICE STYLE], [EDIT SPEED]
Distribution channels beyond TikTok: [SECONDARY CHANNELS]
System pressure test:
Design repeatable content systems with quality gates, rapid iteration loops, and contingency actions when retention or completion drops below threshold.`
  },
  'Blog to Multi Platform Repurposing': {
    intermediate: `Repurposing operating context:
Source asset quality level: [SOURCE QUALITY]
Brand voice priorities: [VOICE TRAITS]
Target platforms and audience intent: [PLATFORMS]
Repurposing objective: [AWARENESS or LEAD GEN or CONVERSION]
Keep each output native to its platform while preserving one consistent thesis.`,
    advanced: `Repurposing strategy stack:
Content operating model: [SOLO or TEAM]
Publishing volume target: [VOLUME TARGET]
Funnel position of each platform: [FUNNEL MAP]
System pressure test:
Define transformation logic, QA controls, and attribution assumptions so repurposed assets increase conversion efficiency without diluting message integrity.`
  },
  'Podcast to Clips Production System': {
    intermediate: `Podcast clips operating context:
Show format and audience profile: [SHOW FORMAT], [AUDIENCE]
Episode objective: [OBJECTIVE]
Distribution focus: [PLATFORM PRIORITY]
Current clip performance baseline: [BASELINE]
Prioritize moments that drive saves, shares, and intent to consume the long form episode.`,
    advanced: `Podcast clips strategy stack:
Content to revenue path: [REVENUE PATH]
Host authority angle: [AUTHORITY POSITION]
Publishing workflow constraints: [TURNAROUND TIME], [EDITOR BANDWIDTH]
System pressure test:
Create clip selection logic tied to funnel stages, include instrumentation assumptions, and specify optimization actions for low performing clip cohorts.`
  },
  'Lead Magnet Prompt Funnel': {
    intermediate: `Lead magnet operating context:
Ideal customer profile: [ICP]
Lead magnet promise: [PROMISE]
Email stack and send limits: [EMAIL STACK]
Primary conversion target after opt in: [TARGET OFFER]
Outputs must connect opt in value to a realistic next step without trust loss.`,
    advanced: `Lead magnet strategy stack:
Acquisition channels: [CHANNELS]
Offer ladder: [ENTRY], [CORE], [BACKEND]
Conversion baselines and bottlenecks: [BASELINES], [BOTTLENECKS]
System pressure test:
Engineer lifecycle logic with leakage diagnostics, decision thresholds, and optimization loops that improve both conversion rate and lead quality over time.`
  }
} as const;

function enrichIntermediatePrompt(prompt: PromptTemplate): PromptTemplate {
  const context = workflowContext[prompt.workflow as keyof typeof workflowContext]?.intermediate;
  const executionFrame = buildIntermediateExecutionFrame(prompt);
  const enrichedContent = `${prompt.content}

${executionFrame}
${context ? `\n\n${context}` : ''}`;

  return { ...prompt, content: enrichedContent };
}

function enrichAdvancedPrompt(prompt: PromptTemplate): PromptTemplate {
  const context = workflowContext[prompt.workflow as keyof typeof workflowContext]?.advanced;
  const executionFrame = buildAdvancedExecutionFrame(prompt);
  const enrichedContent = `${prompt.content}

${executionFrame}
${context ? `\n\n${context}` : ''}`;

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
