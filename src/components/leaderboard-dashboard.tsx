'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { LeaderboardChart } from '@/components/leaderboard-chart';
import { LEADERBOARD_CATEGORIES, CATEGORY_META, type LeaderboardCategory } from '@/lib/leaderboard-models';
import {
  formatContextWindow,
  formatPrice,
  type CategoryOverview,
  type LeaderboardOverviewResult,
  type LeaderboardResult,
  type LicenseFilter,
  type RankedModel,
  type SortField
} from '@/lib/leaderboard';

/* ------------------------------------------------------------------ */
/*  Category icon SVGs (inline to avoid extra dependency)              */
/* ------------------------------------------------------------------ */

const CATEGORY_ICONS: Record<LeaderboardCategory | 'overview', React.ReactNode> = {
  overview: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h4v11H3zM10 3h4v18h-4zM17 8h4v13h-4z" />
    </svg>
  ),
  text: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  code: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  thinking: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  debugging: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01M8 12a4 4 0 014-4V6M16 12a4 4 0 00-4-4M8 12a4 4 0 004 4v2M16 12a4 4 0 01-4 4M4 8h2m12 0h2M4 16h2m12 0h2" />
    </svg>
  ),
  'ui-ux': (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  automation: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  editing: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  'video-generation': (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  'image-generation': (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  'document-scanning': (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  'ai-agents': (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
};

/* ------------------------------------------------------------------ */
/*  Small helper components                                           */
/* ------------------------------------------------------------------ */

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-xs font-bold text-white shadow-sm">
        1
      </span>
    );
  }
  if (rank === 2) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-slate-300 to-slate-400 text-xs font-bold text-white shadow-sm">
        2
      </span>
    );
  }
  if (rank === 3) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-violet-400 text-xs font-bold text-violet-600">
        3
      </span>
    );
  }
  return <span className="inline-flex h-7 w-7 items-center justify-center text-sm text-slate-500">{rank}</span>;
}

function DeltaBadge({ delta }: { delta: number }) {
  if (delta === 0) return <span className="text-xs text-slate-400">—</span>;
  const isPositive = delta > 0;
  return (
    <span className={`text-xs font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
      {isPositive ? '+' : ''}{delta}
    </span>
  );
}

function OrgBadge({ abbrev, org }: { abbrev: string; org: string }) {
  return (
    <span
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[10px] font-bold text-slate-600"
      title={org}
    >
      {abbrev}
    </span>
  );
}

function LicenseTag({ license }: { license: 'proprietary' | 'open-source' }) {
  const isOpen = license === 'open-source';
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
        isOpen
          ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
          : 'bg-slate-50 text-slate-500 ring-1 ring-slate-200'
      }`}
    >
      {isOpen ? 'Open' : 'Proprietary'}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: true
  });
}

/* ------------------------------------------------------------------ */
/*  Overview card                                                     */
/* ------------------------------------------------------------------ */

function OverviewCard({
  overview,
  onSelect
}: {
  overview: CategoryOverview;
  onSelect: (cat: LeaderboardCategory) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(overview.category)}
      className="card-soft w-full space-y-3 p-5 text-left transition-shadow hover:shadow-lg"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          {CATEGORY_ICONS[overview.category]}
        </span>
        <div>
          <h3 className="text-sm font-bold text-slate-900">{overview.label}</h3>
          <p className="text-[11px] text-slate-500">{overview.modelCount} models</p>
        </div>
      </div>

      <ol className="space-y-2">
        {overview.topModels.map((entry) => (
          <li key={entry.model.id} className="flex items-center gap-2">
            <RankBadge rank={entry.rank} />
            <OrgBadge abbrev={entry.model.orgAbbrev} org={entry.model.organization} />
            <span className="flex-1 truncate text-sm font-medium text-slate-800">{entry.model.name}</span>
            <span className="shrink-0 text-sm font-semibold text-slate-900">{entry.score}</span>
          </li>
        ))}
      </ol>

      <p className="text-xs font-semibold text-indigo-600">View full rankings &rarr;</p>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Table header sort button                                          */
/* ------------------------------------------------------------------ */

function SortHeader({
  label,
  field,
  currentSort,
  onSort,
  className = ''
}: {
  label: string;
  field: SortField;
  currentSort: SortField;
  onSort: (f: SortField) => void;
  className?: string;
}) {
  const isActive = currentSort === field;
  return (
    <button
      type="button"
      onClick={() => onSort(field)}
      className={`group inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide ${
        isActive ? 'text-indigo-700' : 'text-slate-500 hover:text-slate-700'
      } ${className}`}
    >
      {label}
      <svg
        className={`h-3 w-3 transition ${isActive ? 'text-indigo-500' : 'text-slate-300 group-hover:text-slate-400'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Full table row                                                    */
/* ------------------------------------------------------------------ */

function ModelRow({ entry }: { entry: RankedModel }) {
  const { rank, model, score, delta } = entry;
  return (
    <tr className="group border-b border-slate-100 transition-colors hover:bg-slate-50/60">
      <td className="py-3 pl-4 pr-2">
        <RankBadge rank={rank} />
      </td>
      <td className="py-3 pr-4">
        <div className="flex items-center gap-2.5">
          <OrgBadge abbrev={model.orgAbbrev} org={model.organization} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{model.name}</p>
            <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
              {model.organization}
              <LicenseTag license={model.license} />
            </p>
          </div>
        </div>
      </td>
      <td className="py-3 pr-4 text-right">
        <span className="text-sm font-bold text-slate-900">{score}</span>
        <span className="ml-1.5"><DeltaBadge delta={delta} /></span>
      </td>
      <td className="hidden py-3 pr-4 text-right text-sm text-slate-700 md:table-cell">
        {formatPrice(model.pricingInput, model.pricingOutput)}
      </td>
      <td className="hidden py-3 pr-4 text-right text-sm text-slate-700 lg:table-cell">
        {formatContextWindow(model.contextWindow)}
      </td>
      <td className="hidden py-3 pr-4 text-sm text-slate-600 xl:table-cell">
        {model.organization}
      </td>
    </tr>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile model card (renders on small screens instead of table)     */
/* ------------------------------------------------------------------ */

function MobileModelCard({ entry }: { entry: RankedModel }) {
  const { rank, model, score, delta } = entry;
  return (
    <div className="card-soft flex items-start gap-3 p-4">
      <RankBadge rank={rank} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <OrgBadge abbrev={model.orgAbbrev} org={model.organization} />
          <p className="truncate text-sm font-semibold text-slate-900">{model.name}</p>
        </div>
        <p className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
          {model.organization}
          <LicenseTag license={model.license} />
        </p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
          <span>
            <span className="font-semibold text-slate-900">Score:</span> {score}
            <span className="ml-1"><DeltaBadge delta={delta} /></span>
          </span>
          <span>
            <span className="font-semibold text-slate-900">Price:</span> {formatPrice(model.pricingInput, model.pricingOutput)}
          </span>
          <span>
            <span className="font-semibold text-slate-900">Context:</span> {formatContextWindow(model.contextWindow)}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main dashboard                                                    */
/* ------------------------------------------------------------------ */

type ActiveTab = 'overview' | LeaderboardCategory;

export function LeaderboardDashboard({
  initialOverview
}: {
  initialOverview: LeaderboardOverviewResult;
}) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [sort, setSort] = useState<SortField>('score');
  const [license, setLicense] = useState<LicenseFilter>('all');
  const [categoryData, setCategoryData] = useState<LeaderboardResult | null>(null);
  const [loading, setLoading] = useState(false);

  const loadCategory = useCallback(async (cat: LeaderboardCategory, s: SortField, l: LicenseFilter) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/leaderboard?category=${cat}&sort=${s}&license=${l}`);
      if (res.ok) {
        const data: LeaderboardResult = await res.json();
        setCategoryData(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab !== 'overview') {
      loadCategory(activeTab, sort, license);
    }
  }, [activeTab, sort, license, loadCategory]);

  const handleTabSelect = useCallback((tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'overview') {
      setCategoryData(null);
    }
  }, []);

  const handleCategoryFromCard = useCallback((cat: LeaderboardCategory) => {
    setSort('score');
    setLicense('all');
    setActiveTab(cat);
  }, []);

  const tabs: { id: ActiveTab; label: string }[] = useMemo(
    () => [
      { id: 'overview', label: 'Overview' },
      ...LEADERBOARD_CATEGORIES.map((c) => ({ id: c as ActiveTab, label: CATEGORY_META[c].label }))
    ],
    []
  );

  const periodInfo = categoryData ?? initialOverview;

  return (
    <div className="space-y-6">
      {/* Meta bar */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Window: {formatDate(periodInfo.periodStart)} &mdash; {formatDate(periodInfo.periodEnd)}
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Next update: {formatDateTime(periodInfo.updatesAt)}
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {initialOverview.totalModels} models tracked
        </span>
      </div>

      {/* Category tabs */}
      <div className="scrollbar-hide -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabSelect(tab.id)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-slate-400'}>
                {CATEGORY_ICONS[tab.id === 'overview' ? 'overview' : (tab.id as LeaderboardCategory)]}
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Overview grid */}
      {activeTab === 'overview' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {initialOverview.categories.map((cat) => (
            <OverviewCard key={cat.category} overview={cat} onSelect={handleCategoryFromCard} />
          ))}
        </div>
      )}

      {/* Category detail */}
      {activeTab !== 'overview' && (
        <div className="space-y-4">
          {/* Category header + filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {categoryData?.label ?? CATEGORY_META[activeTab].label}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {categoryData?.description ?? CATEGORY_META[activeTab].description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(['all', 'proprietary', 'open-source'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLicense(l)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    license === l
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {l === 'all' ? 'All' : l === 'proprietary' ? 'Proprietary' : 'Open Source'}
                </button>
              ))}
            </div>
          </div>

          {loading && !categoryData && (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          )}

          {categoryData && (
            <>
              {/* Score comparison chart */}
              <LeaderboardChart models={categoryData.models} categoryLabel={categoryData.label} />

              {/* Desktop table */}
              <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:block">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <th className="py-3 pl-4 pr-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          #
                        </th>
                        <th className="py-3 pr-4">
                          <SortHeader label="Model" field="name" currentSort={sort} onSort={setSort} />
                        </th>
                        <th className="py-3 pr-4 text-right">
                          <SortHeader label="Score" field="score" currentSort={sort} onSort={setSort} className="justify-end" />
                        </th>
                        <th className="hidden py-3 pr-4 text-right md:table-cell">
                          <SortHeader label="Price $/M" field="price" currentSort={sort} onSort={setSort} className="justify-end" />
                        </th>
                        <th className="hidden py-3 pr-4 text-right lg:table-cell">
                          <SortHeader label="Context" field="context" currentSort={sort} onSort={setSort} className="justify-end" />
                        </th>
                        <th className="hidden py-3 pr-4 text-xs font-semibold uppercase tracking-wide text-slate-500 xl:table-cell">
                          Organization
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryData.models.map((entry) => (
                        <ModelRow key={entry.model.id} entry={entry} />
                      ))}
                      {categoryData.models.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-sm text-slate-500">
                            No models match the current filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile cards */}
              <div className="space-y-3 sm:hidden">
                {categoryData.models.map((entry) => (
                  <MobileModelCard key={entry.model.id} entry={entry} />
                ))}
                {categoryData.models.length === 0 && (
                  <p className="py-12 text-center text-sm text-slate-500">
                    No models match the current filters.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
