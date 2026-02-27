import { EmailCapture } from '@/components/email-capture';
import { PromptTemplateCard } from '@/components/prompt-template-card';
import { createMetadata } from '@/lib/metadata';
import { promptLibraryStats, promptTemplates } from '@/lib/prompt-templates';

export const metadata = createMetadata('Prompt Library | CreatorAILab', 'Copy-paste prompt templates mapped to creator workflows.', '/prompts');

type PromptSearchParams = {
  level?: string;
  workflow?: string;
  q?: string;
};

const levels = ['all', 'basic', 'intermediate', 'advanced'];

export default function PromptsPage({ searchParams }: { searchParams?: PromptSearchParams }) {
  const workflows = ['all', ...Array.from(new Set(promptTemplates.map((p) => p.workflow))).sort()];

  const level = levels.includes((searchParams?.level ?? 'all').toLowerCase()) ? (searchParams?.level ?? 'all').toLowerCase() : 'all';
  const workflow = workflows.includes(searchParams?.workflow ?? 'all') ? (searchParams?.workflow ?? 'all') : 'all';
  const q = (searchParams?.q ?? '').toLowerCase();

  const filtered = promptTemplates.filter((prompt) => {
    const levelMatch = level === 'all' || prompt.level.toLowerCase() === level;
    const workflowMatch = workflow === 'all' || prompt.workflow === workflow;
    const queryMatch = !q || [prompt.title, prompt.workflow, prompt.content].join(' ').toLowerCase().includes(q);
    return levelMatch && workflowMatch && queryMatch;
  });

  return (
    <section className="mx-auto max-w-6xl space-y-8 px-6 py-16">
      <header className="space-y-3 text-center">
        <h1 className="text-5xl font-black text-slate-900">
          Copy-Paste <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Prompt Library</span>
        </h1>
        <p className="mx-auto max-w-4xl text-xl text-slate-600">
          50 workflow-labeled prompts: 10 basic free prompts, 20 intermediate prompts, and 20 advanced prompts.
        </p>
        <p className="text-sm font-semibold text-slate-500">
          Total: {promptLibraryStats.total} · Basic Free: {promptLibraryStats.basicFree} · Intermediate: {promptLibraryStats.intermediate} · Advanced: {promptLibraryStats.advanced}
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="card-soft space-y-3 border border-emerald-200 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Basic Free</p>
          <h2 className="text-xl font-extrabold text-slate-900">Fast Starter Prompts</h2>
          <p className="text-sm text-slate-600">Best for quick wins and immediate execution when speed matters more than depth.</p>
          <ul className="space-y-1 text-sm text-slate-700">
            <li>Includes 10 beginner-friendly prompts.</li>
            <li>Simple structure and low setup time.</li>
            <li>Ideal for first drafts and idea generation.</li>
          </ul>
        </article>

        <article className="card-soft space-y-3 border border-amber-200 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Intermediate Paid</p>
          <h2 className="text-xl font-extrabold text-slate-900">Operator Workflow Prompts</h2>
          <p className="text-sm text-slate-600">Designed for creators ready to move from generic outputs to measurable system execution.</p>
          <ul className="space-y-1 text-sm text-slate-700">
            <li>Unlocks 20 contextual workflow prompts.</li>
            <li>Adds KPI targets, assumptions, and tradeoff paths.</li>
            <li>Includes seven day action sequences for implementation.</li>
          </ul>
        </article>

        <article className="card-soft space-y-3 border border-violet-200 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-violet-700">Advanced Premium</p>
          <h2 className="text-xl font-extrabold text-slate-900">Strategic Systems Prompts</h2>
          <p className="text-sm text-slate-600">Built for high-performance creator businesses that need precise, high-stakes execution logic.</p>
          <ul className="space-y-1 text-sm text-slate-700">
            <li>Unlocks 20 deeply strategic advanced prompts.</li>
            <li>Adds decision thresholds, risk controls, and failure handling.</li>
            <li>Includes 30 day optimization loops and instrumentation plans.</li>
          </ul>
        </article>
      </section>

      <form className="card-soft grid gap-3 p-5 md:grid-cols-4">
        <input
          name="q"
          defaultValue={searchParams?.q ?? ''}
          placeholder="Search by title, workflow, or prompt text..."
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
        />

        <select name="level" defaultValue={level} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
          {levels.map((l) => (
            <option key={l} value={l}>{l[0].toUpperCase() + l.slice(1)}</option>
          ))}
        </select>

        <select name="workflow" defaultValue={workflow} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
          {workflows.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>

        <button type="submit" className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white md:w-fit">
          Apply Filters
        </button>
      </form>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((prompt) => (
          <PromptTemplateCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      {filtered.length === 0 ? <p className="text-center text-sm text-slate-600">No prompts matched your filters.</p> : null}

      <EmailCapture
        source="prompts-library"
        title="Get weekly workflow-specific prompt drops"
        description="Subscribe to receive new basic, intermediate, and advanced prompt packs each week."
        buttonLabel="Join Prompt Newsletter"
      />
    </section>
  );
}
