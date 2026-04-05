import { NewsDashboard } from '@/components/news-dashboard';
import { getAiNewsBundle } from '@/lib/ai-news';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata(
  'Latest AI News | CreatorAILab',
  'Track essential AI news, major AI product changes, and tool-specific updates from live web sources.',
  '/news'
);

export const revalidate = 900;

export default async function NewsPage() {
  const initialData = await getAiNewsBundle();

  return (
    <section className="mx-auto max-w-6xl space-y-8 px-6 py-16">
      <header className="space-y-4">
        <p className="w-fit rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700">
          Live AI News Monitor
        </p>
        <h1 className="max-w-4xl text-5xl font-black leading-tight text-slate-900 sm:text-6xl">
          Essential <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">AI News</span> and Product Changes
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-600">
          Monitor major AI launches, pricing changes, model updates, policy shifts, and tool-specific product news.
          This page pulls live information from the web, ranks the highest-signal changes, rewrites them into readable briefings,
          and publishes a weekly leaderboard of which AI tools are leading by area.
        </p>
      </header>

      <NewsDashboard initialData={initialData} />
    </section>
  );
}
