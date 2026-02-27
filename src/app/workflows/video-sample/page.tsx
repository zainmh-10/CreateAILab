import Link from 'next/link';

import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata('AI Video Tutorial Sample | CreatorAILab', 'Preview AI-generated video tutorial package before publishing.', '/workflows/video-sample');

const scenes = [
  {
    time: '0:00-0:12',
    title: 'Problem + Promise',
    visual: 'Creator workspace, script draft on laptop, subtle text animation',
    narration:
      'If writing YouTube scripts takes you hours, this workflow cuts the process down to about twenty minutes.'
  },
  {
    time: '0:12-0:28',
    title: 'Step 1 Context Mining',
    visual: 'Three high-performing video examples with hook pattern annotations',
    narration: 'Collect three top-performing videos and extract hook, pacing, and CTA patterns.'
  },
  {
    time: '0:28-0:44',
    title: 'Step 2 Hook Generation',
    visual: 'AI chat interface generating curiosity, contrarian, and authority hooks',
    narration: 'Prompt ChatGPT for three hook types based on audience and topic constraints.'
  },
  {
    time: '0:44-1:00',
    title: 'Step 3 Structured Outline',
    visual: 'Outline cards: hook, value points, proof, CTA',
    narration: 'Use Notion AI to transform the best hook into a structured script outline.'
  },
  {
    time: '1:00-1:16',
    title: 'Step 4 Clarity + Thumbnail',
    visual: 'Script refinement then Canva AI thumbnail concepts',
    narration: 'Tighten spoken-flow clarity and generate matching thumbnail concepts.'
  },
  {
    time: '1:16-1:30',
    title: 'Result Frame',
    visual: 'Completed script pack checklist and final CTA',
    narration: 'End with a reusable script pack you can repeat weekly for quality and speed gains.'
  }
];

const captions = [
  '00:00-00:12 Intro + promise',
  '00:12-00:28 Collect source patterns',
  '00:28-00:44 Generate 3 hook angles',
  '00:44-01:00 Build structured outline',
  '01:00-01:16 Refine + thumbnail concepts',
  '01:16-01:30 Final output summary'
];

export default function WorkflowVideoSamplePage() {
  return (
    <section className="mx-auto max-w-5xl space-y-8 px-6 py-14">
      <header className="space-y-3">
        <Link href="/workflows" className="text-sm font-semibold text-indigo-600 hover:underline">
          ← Back to Workflows
        </Link>
        <h1 className="text-4xl font-black text-slate-900">AI Video Tutorial Sample (Approval Preview)</h1>
        <p className="text-lg text-slate-600">
          This is a pre-render package for the workflow tutorial video. Review script, scene plan, and caption structure before final generation.
        </p>
      </header>

      <article className="card-soft space-y-4 p-6">
        <h2 className="text-xl font-bold text-slate-900">Target Workflow</h2>
        <p className="text-slate-700">10x YouTube Script Generation (`youtube-script-engine`)</p>
        <p className="text-slate-700">Duration target: ~90 seconds</p>
      </article>

      <article className="card-soft space-y-4 p-6">
        <h2 className="text-xl font-bold text-slate-900">Storyboard + Narration</h2>
        <div className="space-y-4">
          {scenes.map((scene) => (
            <div key={scene.time} className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">{scene.time}</p>
              <h3 className="text-lg font-semibold text-slate-900">{scene.title}</h3>
              <p className="mt-1 text-sm text-slate-600"><span className="font-semibold">Visual:</span> {scene.visual}</p>
              <p className="mt-1 text-sm text-slate-700"><span className="font-semibold">Narration:</span> {scene.narration}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="card-soft space-y-4 p-6">
        <h2 className="text-xl font-bold text-slate-900">Caption Plan</h2>
        <ul className="list-disc space-y-1 pl-5 text-slate-700">
          {captions.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </article>

      <article className="card-soft space-y-3 p-6">
        <h2 className="text-xl font-bold text-slate-900">Files Prepared for Rendering</h2>
        <ul className="list-disc space-y-1 pl-5 text-slate-700">
          <li>
            <Link href="/video-samples/youtube-script-engine/narration-script.txt" className="text-indigo-600 hover:underline">
              narration-script.txt
            </Link>
          </li>
          <li>
            <Link href="/video-samples/youtube-script-engine/captions.srt" className="text-indigo-600 hover:underline">
              captions.srt
            </Link>
          </li>
          <li>
            <Link href="/video-samples/youtube-script-engine/scene-prompts.md" className="text-indigo-600 hover:underline">
              scene-prompts.md
            </Link>
          </li>
        </ul>
      </article>
    </section>
  );
}
