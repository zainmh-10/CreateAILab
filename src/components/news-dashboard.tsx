'use client';

import { useEffect, useMemo, useState } from 'react';

import type {
  AiNewsBundle,
  AiNewsItem,
  TrendBreakdownItem,
  TrendLabel,
  WeeklyScoreboardArea,
  WeeklyScoreboardEntry
} from '@/lib/ai-news';

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Unknown date';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
}

function formatShortDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }

  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'GMT',
    timeZoneName: 'short'
  }).format(date);
}

function formatShortDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }

  return new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'GMT'
  }).format(date);
}

function getAreaAccent(area: WeeklyScoreboardArea) {
  switch (area) {
    case 'Overall':
      return 'border-indigo-200 bg-indigo-50 text-indigo-700';
    case 'Model Progress':
      return 'border-violet-200 bg-violet-50 text-violet-700';
    case 'Product Velocity':
      return 'border-sky-200 bg-sky-50 text-sky-700';
    case 'Market Momentum':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    case 'Pricing Power':
      return 'border-amber-200 bg-amber-50 text-amber-800';
    case 'Trust And Safety':
      return 'border-rose-200 bg-rose-50 text-rose-700';
    default:
      return 'border-slate-200 bg-slate-50 text-slate-700';
  }
}

function trendChipClasses(label: TrendLabel) {
  switch (label) {
    case 'Launch':
      return 'bg-indigo-100 text-indigo-700';
    case 'Model Update':
      return 'bg-violet-100 text-violet-700';
    case 'Feature Update':
      return 'bg-sky-100 text-sky-700';
    case 'Pricing':
      return 'bg-amber-100 text-amber-800';
    case 'Policy':
      return 'bg-orange-100 text-orange-800';
    case 'Security':
      return 'bg-rose-100 text-rose-700';
    case 'Funding':
      return 'bg-emerald-100 text-emerald-700';
    case 'Partnership':
      return 'bg-teal-100 text-teal-700';
    case 'Research':
      return 'bg-fuchsia-100 text-fuchsia-700';
    case 'General':
    default:
      return 'bg-slate-100 text-slate-700';
  }
}

function TrendChip({ label, count }: { label: TrendLabel; count?: number }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${trendChipClasses(label)}`}>
      <span>{label}</span>
      {typeof count === 'number' ? <span className="opacity-80">{count}</span> : null}
    </span>
  );
}

function TrendStrip({ items, emptyLabel }: { items: TrendBreakdownItem[]; emptyLabel: string }) {
  if (items.length === 0) {
    return <p className="text-sm text-slate-500">{emptyLabel}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <TrendChip key={item.label} label={item.label} count={item.count} />
      ))}
    </div>
  );
}

function ScoreboardCard({ entry }: { entry: WeeklyScoreboardEntry }) {
  return (
    <article className="card-soft space-y-3 p-5">
      <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getAreaAccent(entry.area)}`}>
        {entry.area}
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900">{entry.toolName}</h3>
        <p className="mt-1 text-sm text-slate-600">Weekly score: {entry.score}</p>
      </div>
      <p className="text-sm leading-6 text-slate-700">{entry.rationale}</p>
    </article>
  );
}

function NewsCard({ item }: { item: AiNewsItem }) {
  return (
    <article className="card-soft space-y-4 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <TrendChip label={item.trendLabel} />
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.sourceKind === 'official' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
          {item.sourceKind === 'official' ? 'Official Source' : 'Press Coverage'}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span>{item.source}</span>
        <span className="text-slate-300">•</span>
        <span>{formatDate(item.publishedAt)}</span>
      </div>
      <h3 className="text-xl font-bold text-slate-900">
        <a href={item.url} target="_blank" rel="noreferrer" className="hover:text-indigo-600">
          {item.title}
        </a>
      </h3>
      <p className="text-sm leading-7 text-slate-700">{item.briefing}</p>
      {item.takeaways.length > 0 ? (
        <ul className="space-y-2 text-sm leading-6 text-slate-700">
          {item.takeaways.map((takeaway) => (
            <li key={takeaway} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-700">
        Read source →
      </a>
    </article>
  );
}

export function NewsDashboard({ initialData }: { initialData: AiNewsBundle }) {
  const [selectedTool, setSelectedTool] = useState(initialData.selectedTool?.slug ?? '');
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadNews(showLoading: boolean, toolSlug: string) {
    if (showLoading) {
      setLoading(true);
    }

    try {
      const url = toolSlug ? `/api/news?tool=${encodeURIComponent(toolSlug)}` : '/api/news';
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Unable to refresh live news.');
      }

      const nextData = (await response.json()) as AiNewsBundle;
      setData(nextData);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to refresh live news.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    loadNews(false, selectedTool)
      .then(() => {
        if (cancelled) {
          return;
        }
      })
      .catch(() => undefined);

    const interval = window.setInterval(() => {
      loadNews(false, selectedTool).catch(() => undefined);
    }, 15 * 60 * 1000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [selectedTool]);

  const selectedToolLabel = useMemo(() => {
    return data.toolOptions.find((tool) => tool.slug === selectedTool)?.name ?? 'this tool';
  }, [data.toolOptions, selectedTool]);

  return (
    <div className="space-y-12">
      <section className="card-soft space-y-4 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Essential Latest AI News</h2>
            <p className="max-w-3xl text-sm leading-6 text-slate-600">
              This section aggregates live web news for major AI product releases, model launches, pricing changes,
              policy shifts, and important ecosystem updates. It refreshes automatically every 15 minutes.
            </p>
          </div>
          <div className="text-sm text-slate-500">
            Last refreshed: {formatTimestamp(data.updatedAt)}
          </div>
        </div>

        {error ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">
            {error}
          </p>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-[1.25fr,0.75fr]">
          <article className="card-soft space-y-4 border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wide text-indigo-700">Weekly Digest</p>
              <h3 className="text-2xl font-bold text-slate-900">{data.generalDigest.title}</h3>
              <p className="text-sm leading-7 text-slate-700">{data.generalDigest.summary}</p>
            </div>
            {data.generalDigest.highlights.length > 0 ? (
              <ul className="space-y-2 text-sm text-slate-700">
                {data.generalDigest.highlights.map((highlight) => (
                  <li key={highlight} className="rounded-lg bg-white px-3 py-2 shadow-sm">
                    {highlight}
                  </li>
                ))}
              </ul>
            ) : null}
          </article>

          <article className="card-soft space-y-4 p-6">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Trend Breakdown</p>
              <h3 className="text-lg font-bold text-slate-900">What is driving coverage</h3>
            </div>
            <TrendStrip items={data.trendBreakdown} emptyLabel="No trend signals are available yet." />
            <p className="text-sm leading-6 text-slate-600">
              Trend chips rank the strongest live themes across launches, model updates, pricing, policy changes, and other market-moving AI events.
            </p>
          </article>
        </div>

        <article className="card-soft space-y-5 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Weekly Scoreboard</p>
              <h3 className="text-2xl font-bold text-slate-900">Which AI tool is leading, and where</h3>
              <p className="max-w-3xl text-sm leading-6 text-slate-600">
                This leaderboard uses the strongest live news signals from the most recently completed weekly window and updates automatically every Sunday evening GMT.
              </p>
            </div>
            <div className="text-sm text-slate-500">
              <p>Window: {formatShortDate(data.weeklyScoreboard.periodStart)} to {formatShortDate(data.weeklyScoreboard.periodEnd)}</p>
              <p>Next update: {formatShortDateTime(data.weeklyScoreboard.updatesAt)}</p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.weeklyScoreboard.leaders.map((entry) => (
              <ScoreboardCard key={entry.area} entry={entry} />
            ))}
          </div>
        </article>

        <div className="grid gap-5 lg:grid-cols-2">
          {data.generalNews.length > 0 ? (
            data.generalNews.map((item) => <NewsCard key={item.id} item={item} />)
          ) : (
            <p className="text-sm text-slate-600">No live AI headlines are available right now. Please check again shortly.</p>
          )}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Track a Specific AI Tool</h2>
            <p className="text-sm leading-6 text-slate-600">
              Choose a tool to see product-specific news, launches, feature rollouts, pricing updates, and notable changes.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="text-sm font-medium text-slate-700" htmlFor="tool-news-select">
              Tool
            </label>
            <select
              id="tool-news-select"
              value={selectedTool}
              onChange={(event) => setSelectedTool(event.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
            >
              <option value="">Select a tool</option>
              {data.toolOptions.map((tool) => (
                <option key={tool.slug} value={tool.slug}>
                  {tool.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => loadNews(true, selectedTool).catch(() => undefined)}
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh now'}
            </button>
          </div>
        </div>

        {selectedTool ? (
          data.toolNews.length > 0 ? (
            <div className="space-y-4">
              {data.toolDigest ? (
                <article className="card-soft space-y-4 border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-6">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-violet-700">Tool Summary</p>
                    <h3 className="text-xl font-bold text-slate-900">{data.toolDigest.title}</h3>
                    <p className="text-sm leading-7 text-slate-700">{data.toolDigest.summary}</p>
                  </div>
                  <TrendStrip
                    items={data.toolTrendBreakdown}
                    emptyLabel={`No clear change themes are available for ${selectedToolLabel} yet.`}
                  />
                  {data.toolDigest.highlights.length > 0 ? (
                    <ul className="space-y-2 text-sm text-slate-700">
                      {data.toolDigest.highlights.map((highlight) => (
                        <li key={highlight} className="rounded-lg bg-white px-3 py-2 shadow-sm">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ) : null}
              <p className="text-sm font-medium text-slate-700">
                Showing the latest changes and coverage for <span className="text-slate-900">{selectedToolLabel}</span>.
              </p>
              <div className="grid gap-5 lg:grid-cols-2">
                {data.toolNews.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="card-soft p-6 text-sm text-slate-600">
              No recent live updates were found for {selectedToolLabel}. Try another tool or refresh again later.
            </div>
          )
        ) : (
          <div className="card-soft p-6 text-sm text-slate-600">
            Select any supported AI tool from the dropdown to load its latest product news and major changes.
          </div>
        )}
      </section>
    </div>
  );
}
