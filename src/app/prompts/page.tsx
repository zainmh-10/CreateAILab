import { EmailCapture } from '@/components/email-capture';
import { PromptCard } from '@/components/prompt-card';
import { safeGetPrompts } from '@/lib/content';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata('Prompt Library | CreatorAILab', 'Curated prompts for creator workflows.', '/prompts');

type PromptsSearchParams = {
  category?: string;
};

export default async function PromptsPage({ searchParams }: { searchParams?: PromptsSearchParams }) {
  const prompts = await safeGetPrompts();
  const categories = ['all', ...Array.from(new Set(prompts.map((prompt) => prompt.category))).sort()];
  const selectedCategory = categories.includes(searchParams?.category ?? 'all') ? searchParams?.category ?? 'all' : 'all';
  const filtered = prompts.filter((prompt) => selectedCategory === 'all' || prompt.category === selectedCategory);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Prompt Library</h1>
        <p className="text-slate-700">High-performing prompts grouped by category.</p>
      </header>

      <form className="card flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="text-sm font-medium">
          Category
          <select name="category" defaultValue={selectedCategory} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm sm:min-w-56">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <button className="btn w-fit" type="submit">
          Filter
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((prompt) => (
          <PromptCard
            key={prompt.id}
            title={prompt.title}
            category={prompt.category}
            content={prompt.content}
            gated={prompt.gated}
          />
        ))}
        {filtered.length === 0 ? <p className="text-sm text-slate-600">No prompts match this category.</p> : null}
      </div>

      <EmailCapture source="prompts-library" />
    </div>
  );
}
