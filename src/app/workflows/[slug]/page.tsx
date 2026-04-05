import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CopyablePrompt } from '@/components/copyable-prompt';
import { createMetadata } from '@/lib/metadata';
import { getWorkflowGuide, workflowGuides } from '@/lib/workflow-guides';

type Params = { slug: string };

export async function generateStaticParams() {
  return workflowGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const guide = getWorkflowGuide(params.slug);
  if (!guide) {
    return createMetadata('Workflow Not Found | CreatorAILab', 'Workflow tutorial not found.', `/workflows/${params.slug}`);
  }

  return createMetadata(`${guide.title} | Workflow Tutorial`, guide.summary, `/workflows/${guide.slug}`);
}

export default function WorkflowDetailPage({ params }: { params: Params }) {
  const guide = getWorkflowGuide(params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-5xl space-y-8 px-6 py-14">
      <div className="space-y-3">
        <Link href="/workflows" className="text-sm font-semibold text-indigo-600 hover:underline">← Back to all workflows</Link>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">{guide.level}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{guide.duration}</span>
        </div>
        <h1 className="text-5xl font-black text-slate-900">{guide.title}</h1>
        <p className="text-xl text-slate-600">{guide.summary}</p>
      </div>

      <article className="card-soft space-y-7 p-7">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Tools You Need</h2>
          <ul className="mt-3 list-disc pl-6 text-slate-700">
            {guide.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>

        {guide.toolQuickStarts && Object.keys(guide.toolQuickStarts).length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-slate-900">Tools Quick Start</h2>
            <p className="mt-2 text-sm text-slate-600">How to use each tool for this workflow:</p>
            <ul className="mt-3 space-y-3">
              {Object.entries(guide.toolQuickStarts).map(([tool, text]) => (
                <li key={tool} className="rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                  <span className="font-semibold text-slate-800">{tool}:</span>{' '}
                  <span className="text-slate-700">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold text-slate-900">Step-by-Step Tutorial</h2>
          {guide.detailedTutorial && guide.detailedTutorial.length > 0 ? (
            <ol className="mt-4 list-none space-y-8 pl-0">
              {guide.detailedTutorial.map((step, idx) => (
                <li key={idx} className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {idx + 1}. {step.title}
                    {step.toolRef && (
                      <span className="ml-2 text-sm font-normal text-slate-500">({step.toolRef})</span>
                    )}
                  </h3>
                  <p className="text-slate-700 leading-relaxed">{step.body}</p>
                  {step.substeps && step.substeps.length > 0 && (
                    <ol className="list-decimal space-y-1 pl-6 text-slate-700">
                      {step.substeps.map((sub, i) => (
                        <li key={i}>{sub}</li>
                      ))}
                    </ol>
                  )}
                  {step.examplePrompt && (
                    <div>
                      <p className="mb-2 text-sm font-semibold text-slate-700">Example prompt:</p>
                      <CopyablePrompt content={step.examplePrompt} />
                    </div>
                  )}
                  {step.toolTips && step.toolTips.length > 0 && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3">
                      <p className="mb-2 text-sm font-semibold text-amber-800">Tips:</p>
                      <ul className="list-disc space-y-1 pl-5 text-sm text-amber-900">
                        {step.toolTips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-700">
              {guide.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-xl font-bold text-slate-900">Expected End Result</h2>
          <p className="mt-2 text-slate-700">{guide.endResult}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={`/workflows/${guide.slug}/checklist`}
            className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold text-white"
            download
          >
            Download Checklist (.txt)
          </a>
          <a href={guide.videoUrl.replace('/embed/', '/watch?v=').split('?')[0]} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700">
            Open on YouTube
          </a>
        </div>
      </article>

      <article className="card-soft space-y-4 p-7">
        <h2 className="text-xl font-bold text-slate-900">Video Tutorial (Captions Enabled)</h2>
        <p className="text-sm text-slate-600">{guide.tutorialTitle}</p>
        <div className="aspect-video overflow-hidden rounded-xl border border-slate-200">
          <iframe
            src={guide.videoUrl}
            title={`${guide.title} tutorial video`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="text-sm font-semibold text-slate-900">Caption timeline</h3>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
            {guide.captions.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </article>

      <article className="card-soft space-y-4 p-7">
        <h2 className="text-xl font-bold text-slate-900">Transcript Block</h2>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-7 text-slate-700">
          {guide.transcript.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </article>

      <article className="card-soft p-7">
        <h2 className="text-xl font-bold text-slate-900">References</h2>
        <ul className="mt-3 list-disc pl-6 text-slate-700">
          {guide.references.map((ref) => (
            <li key={ref.url}>
              <Link href={ref.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                {ref.label}
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
