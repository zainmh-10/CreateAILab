import { createMetadata } from '@/lib/metadata';
import { EmailCapture } from '@/components/email-capture';

export const metadata = createMetadata(
  'CreatorAILab | Supercharge your workflow with AI Tools',
  'Discover curated AI tools, copy-paste prompt templates, and step-by-step workflows for creators.',
  '/'
);

export default function HomePage() {
  return (
    <div className="hero-surface">
      <div className="hero-blob one" />
      <div className="hero-blob two" />
      <section className="relative mx-auto max-w-6xl px-6 pb-28 pt-16 text-center">
        <p className="mx-auto mb-6 w-fit rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700">
          ✧ The #1 AI Resource for Solopreneurs
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
            title="Get free AI workflows + newsletter issue"
            description="Enter your email and we will send a full creator newsletter with tactical playbooks for each tool."
            buttonLabel="Get Free Workflows"
          />
        </div>

        <p className="mt-5 text-base text-slate-500">Join 10,000+ creators getting our weekly AI insights.</p>
      </section>
    </div>
  );
}
