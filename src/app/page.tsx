import Link from 'next/link';

import { createMetadata } from '@/lib/metadata';
import { EmailCapture } from '@/components/email-capture';

export const metadata = createMetadata(
  'CreatorAILab | Supercharge your workflow with AI Tools',
  'Discover curated AI tools, copy-paste prompt templates, and step-by-step workflows for creators.',
  '/'
);

const features = [
  {
    title: 'AI Tools Directory',
    description: '20+ curated tools reviewed with pricing, pros/cons, and affiliate links. Find the right tool without hours of research.',
    href: '/tools',
    icon: '🔍'
  },
  {
    title: 'Workflow Tutorials',
    description: 'Step-by-step guides with video walkthroughs, checklists, and tool stacks. Go from idea to execution in one session.',
    href: '/workflows',
    icon: '⚡'
  },
  {
    title: 'Prompt Library',
    description: '50 copy-paste prompts across basic, intermediate, and advanced levels. Organized by workflow for maximum impact.',
    href: '/prompts',
    icon: '📋'
  }
];

const stats = [
  { label: 'AI Tools Reviewed', value: '20+' },
  { label: 'Workflow Guides', value: '20' },
  { label: 'Ready-to-Use Prompts', value: '50' },
  { label: 'Tool Categories', value: '7' }
];

export default function HomePage() {
  return (
    <>
      <div className="hero-surface">
        <div className="hero-blob one" />
        <div className="hero-blob two" />
        <section className="relative mx-auto max-w-6xl px-6 pb-28 pt-16 text-center">
          <p className="mx-auto mb-6 w-fit rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700">
            The #1 AI Resource for Solopreneurs
          </p>
          <h1 className="mx-auto max-w-3xl text-5xl font-black leading-tight text-slate-900 sm:text-7xl">
            Supercharge your workflow with <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">AI Tools</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-2xl leading-relaxed text-slate-600">
            Discover curated AI tools, copy-paste prompt templates, and step-by-step workflows designed specifically to help creators scale without burning out.
          </p>

          <div id="newsletter" className="mx-auto mt-10 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/70">
            <EmailCapture
              source="homepage_hero"
              compact
              title="Get the weekly AI news breakdown"
              description="Every Sunday at 8pm GMT, get the latest AI news, the best AI tool to use that week, and a short tutorial to apply it."
              buttonLabel="Join Free"
            />
          </div>

          <p className="mt-5 text-base text-slate-500">Join 10,000+ creators getting our weekly AI insights.</p>
        </section>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="card-soft p-6 text-center">
              <p className="text-4xl font-black text-indigo-600">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="text-center">
          <h2 className="text-4xl font-black text-slate-900">Everything you need to build with AI</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Stop wasting time researching tools. Start building real workflows that produce measurable results.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href} className="card-soft group space-y-4 p-7 transition-shadow hover:shadow-lg">
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
              <span className="inline-block text-sm font-semibold text-indigo-600">Explore &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black text-slate-900">How it works</h2>
          <p className="mt-3 text-lg text-slate-600">Three steps to transform your content workflow.</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          {[
            { step: '1', title: 'Pick a workflow', body: 'Choose from 20 proven workflow guides organized by difficulty level and use case.' },
            { step: '2', title: 'Grab the prompts', body: 'Copy the matching prompts from our library. They are pre-tuned for each workflow stage.' },
            { step: '3', title: 'Execute and iterate', body: 'Follow the step-by-step guide, track your results, and refine your process each week.' }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                {item.step}
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="card-soft p-8">
          <EmailCapture
            source="homepage_bottom"
            title="Want the AI tool to use this week?"
            description="Join the Sunday 8pm GMT newsletter for the biggest AI news, one featured tool pick, and a fast tutorial you can apply immediately."
            buttonLabel="Subscribe Free"
          />
        </div>
      </section>
    </>
  );
}
