import { LeaderboardDashboard } from '@/components/leaderboard-dashboard';
import { getLeaderboardOverview } from '@/lib/leaderboard';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata(
  'Weekly AI Leaderboard | CreatorAILab',
  'Live rankings of AI models across text, code, thinking, debugging, UI/UX, automation, editing, video generation, image generation, document scanning, and AI agents. Updated every Sunday evening GMT.',
  '/leaderboard'
);

export const revalidate = 3600;

export default function LeaderboardPage() {
  const overview = getLeaderboardOverview();

  return (
    <section className="mx-auto max-w-7xl space-y-8 px-6 py-16">
      <header className="space-y-4">
        <p className="w-fit rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700">
          Weekly AI Leaderboard
        </p>
        <h1 className="max-w-4xl text-5xl font-black leading-tight text-slate-900 sm:text-6xl">
          Which <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">AI model</span> is leading?
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-600">
          We rank the top AI models across 11 capability categories&mdash;from text and code to
          image generation and autonomous agents. Scores reflect benchmark performance and real-world
          capability, with weekly momentum shifts every Sunday evening GMT.
        </p>
      </header>

      <LeaderboardDashboard initialOverview={overview} />
    </section>
  );
}
