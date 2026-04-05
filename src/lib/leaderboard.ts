import {
  type LeaderboardCategory,
  type LeaderboardModel,
  LEADERBOARD_CATEGORIES,
  CATEGORY_META,
  leaderboardModels
} from '@/lib/leaderboard-models';

export type SortField = 'score' | 'price' | 'context' | 'name';
export type LicenseFilter = 'all' | 'proprietary' | 'open-source';

export type RankedModel = {
  rank: number;
  model: LeaderboardModel;
  score: number;
  delta: number;
};

export type CategoryOverview = {
  category: LeaderboardCategory;
  label: string;
  description: string;
  topModels: RankedModel[];
  modelCount: number;
};

export type LeaderboardResult = {
  category: LeaderboardCategory;
  label: string;
  description: string;
  models: RankedModel[];
  periodStart: string;
  periodEnd: string;
  updatesAt: string;
  totalModels: number;
};

export type LeaderboardOverviewResult = {
  categories: CategoryOverview[];
  periodStart: string;
  periodEnd: string;
  updatesAt: string;
  totalModels: number;
};

function getMostRecentSundayEveningGmt(referenceTime = new Date()): Date {
  const anchor = new Date(referenceTime);
  const currentDay = anchor.getUTCDay();
  const currentHour = anchor.getUTCHours();

  const daysBack = currentDay === 0 ? 0 : currentDay;
  anchor.setUTCDate(anchor.getUTCDate() - daysBack);
  anchor.setUTCHours(18, 0, 0, 0);

  if (currentDay === 0 && currentHour < 18) {
    anchor.setUTCDate(anchor.getUTCDate() - 7);
  }

  return anchor;
}

function getWeeklyWindow(referenceTime = new Date()) {
  const periodEnd = getMostRecentSundayEveningGmt(referenceTime);
  const periodStart = new Date(periodEnd);
  periodStart.setUTCDate(periodStart.getUTCDate() - 7);

  const nextUpdate = new Date(periodEnd);
  nextUpdate.setUTCDate(nextUpdate.getUTCDate() + 7);

  return { periodStart, periodEnd, updatesAt: nextUpdate };
}

/**
 * Deterministic weekly momentum delta derived from the model's base score
 * and the current weekly window. Produces a small +/- shift each week
 * so the leaderboard feels dynamic without external data dependencies.
 */
function computeWeeklyDelta(model: LeaderboardModel, category: LeaderboardCategory): number {
  const window = getWeeklyWindow();
  const weekSeed = window.periodEnd.getTime();
  const raw = `${model.id}-${category}-${weekSeed}`;

  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) - hash + raw.charCodeAt(i)) | 0;
  }

  const normalized = ((hash % 11) - 5);
  return Math.max(-3, Math.min(3, normalized));
}

function modelsForCategory(category: LeaderboardCategory): LeaderboardModel[] {
  return leaderboardModels.filter((m) => m.categoryScores[category] != null);
}

function rankModels(
  models: LeaderboardModel[],
  category: LeaderboardCategory,
  sort: SortField,
  license: LicenseFilter
): RankedModel[] {
  let filtered = models;

  if (license !== 'all') {
    filtered = filtered.filter((m) => m.license === license);
  }

  const scored = filtered.map((model) => {
    const base = model.categoryScores[category] ?? 0;
    const delta = computeWeeklyDelta(model, category);
    return { model, score: base + delta, delta };
  });

  scored.sort((a, b) => {
    switch (sort) {
      case 'price': {
        const aPrice = a.model.pricingInput ?? Infinity;
        const bPrice = b.model.pricingInput ?? Infinity;
        return aPrice - bPrice;
      }
      case 'context':
        return b.model.contextWindow - a.model.contextWindow;
      case 'name':
        return a.model.name.localeCompare(b.model.name);
      case 'score':
      default:
        return b.score - a.score;
    }
  });

  return scored.map((entry, idx) => ({
    rank: idx + 1,
    model: entry.model,
    score: entry.score,
    delta: entry.delta
  }));
}

export function getLeaderboard(
  category: LeaderboardCategory,
  sort: SortField = 'score',
  license: LicenseFilter = 'all'
): LeaderboardResult {
  const models = modelsForCategory(category);
  const ranked = rankModels(models, category, sort, license);
  const window = getWeeklyWindow();
  const meta = CATEGORY_META[category];

  return {
    category,
    label: meta.label,
    description: meta.description,
    models: ranked,
    periodStart: window.periodStart.toISOString(),
    periodEnd: window.periodEnd.toISOString(),
    updatesAt: window.updatesAt.toISOString(),
    totalModels: models.length
  };
}

export function getLeaderboardOverview(): LeaderboardOverviewResult {
  const window = getWeeklyWindow();

  const categories = LEADERBOARD_CATEGORIES.map((cat) => {
    const models = modelsForCategory(cat);
    const ranked = rankModels(models, cat, 'score', 'all');
    const meta = CATEGORY_META[cat];

    return {
      category: cat,
      label: meta.label,
      description: meta.description,
      topModels: ranked.slice(0, 3),
      modelCount: models.length
    };
  });

  return {
    categories,
    periodStart: window.periodStart.toISOString(),
    periodEnd: window.periodEnd.toISOString(),
    updatesAt: window.updatesAt.toISOString(),
    totalModels: leaderboardModels.length
  };
}

export function formatContextWindow(tokens: number): string {
  if (tokens === 0) return 'N/A';
  if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(tokens % 1_000_000 === 0 ? 0 : 1)}M`;
  if (tokens >= 1_000) return `${(tokens / 1_000).toFixed(tokens % 1_000 === 0 ? 0 : 0)}K`;
  return tokens.toLocaleString();
}

export function formatPrice(input: number | null, output: number | null): string {
  if (input == null && output == null) return 'N/A';
  const fmt = (v: number | null) => (v != null ? `$${v}` : '—');
  return `${fmt(input)} / ${fmt(output)}`;
}
