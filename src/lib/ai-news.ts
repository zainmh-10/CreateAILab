import Parser from 'rss-parser';

import { popularToolsCatalog } from '@/lib/tool-catalog';

export type TrendLabel =
  | 'Launch'
  | 'Model Update'
  | 'Feature Update'
  | 'Pricing'
  | 'Policy'
  | 'Security'
  | 'Funding'
  | 'Partnership'
  | 'Research'
  | 'General';

export type NewsSourceRef = {
  id: string;
  label: string;
  kind: 'official' | 'news';
  url: string;
};

export type AiNewsItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  sourceKind: 'official' | 'news';
  summary: string;
  publishedAt: string;
  trendLabel: TrendLabel;
  importanceScore: number;
  seoHeadline: string;
  briefing: string;
  takeaways: string[];
};

export type NewsToolOption = {
  slug: string;
  name: string;
};

export type NewsDigest = {
  title: string;
  summary: string;
  highlights: string[];
};

export type TrendBreakdownItem = {
  label: TrendLabel;
  count: number;
};

export type WeeklyScoreboardArea =
  | 'Overall'
  | 'Model Progress'
  | 'Product Velocity'
  | 'Market Momentum'
  | 'Pricing Power'
  | 'Trust And Safety';

export type WeeklyScoreboardEntry = {
  area: WeeklyScoreboardArea;
  toolSlug: string;
  toolName: string;
  score: number;
  rationale: string;
};

export type WeeklyScoreboard = {
  periodStart: string;
  periodEnd: string;
  updatesAt: string;
  leaders: WeeklyScoreboardEntry[];
};

export type AiNewsBundle = {
  generalNews: AiNewsItem[];
  toolNews: AiNewsItem[];
  selectedTool: NewsToolOption | null;
  toolOptions: NewsToolOption[];
  updatedAt: string;
  generalDigest: NewsDigest;
  toolDigest: NewsDigest | null;
  trendBreakdown: TrendBreakdownItem[];
  toolTrendBreakdown: TrendBreakdownItem[];
  weeklyScoreboard: WeeklyScoreboard;
};

type ParsedFeedItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  isoDate?: string;
  content?: string;
  contentSnippet?: string;
};

type FeedSource = NewsSourceRef;

const parser = new Parser();
const FEED_REVALIDATE_SECONDS = 900;
const DAY_MS = 24 * 60 * 60 * 1000;

const GENERAL_QUERIES = [
  'artificial intelligence OR generative AI when:7d',
  'AI tools OR AI products OR AI models when:7d',
  'OpenAI OR Anthropic OR ChatGPT OR Claude OR Gemini OR Copilot OR Perplexity when:7d'
];

const OFFICIAL_GENERAL_FEEDS: FeedSource[] = [
  {
    id: 'openai-news',
    label: 'OpenAI',
    kind: 'official',
    url: 'https://openai.com/news/rss.xml'
  },
  {
    id: 'anthropic-news',
    label: 'Anthropic',
    kind: 'official',
    url: 'https://www.anthropic.com/news/feed_anthropic.xml'
  },
  {
    id: 'google-ai-blog',
    label: 'Google AI',
    kind: 'official',
    url: 'https://ai.googleblog.com/feeds/posts/default?alt=rss'
  },
  {
    id: 'github-copilot-blog',
    label: 'GitHub Copilot',
    kind: 'official',
    url: 'https://github.blog/ai-and-ml/github-copilot/feed/'
  }
];

const TOOL_OFFICIAL_FEEDS: Partial<Record<string, FeedSource[]>> = {
  chatgpt: [
    {
      id: 'openai-chatgpt-news',
      label: 'OpenAI',
      kind: 'official',
      url: 'https://openai.com/news/rss.xml'
    }
  ],
  claude: [
    {
      id: 'anthropic-claude-news',
      label: 'Anthropic',
      kind: 'official',
      url: 'https://www.anthropic.com/news/feed_anthropic.xml'
    }
  ],
  'google-gemini': [
    {
      id: 'google-gemini-news',
      label: 'Google AI',
      kind: 'official',
      url: 'https://ai.googleblog.com/feeds/posts/default?alt=rss'
    }
  ],
  'github-copilot': [
    {
      id: 'github-copilot-feed',
      label: 'GitHub Copilot',
      kind: 'official',
      url: 'https://github.blog/ai-and-ml/github-copilot/feed/'
    }
  ]
};

const TOOL_QUERY_HINTS: Record<string, string> = {
  chatgpt: '"ChatGPT" OR "OpenAI"',
  claude: '"Claude" OR "Anthropic"',
  'google-gemini': '"Google Gemini" OR "Gemini AI" OR "Google AI"',
  'github-copilot': '"GitHub Copilot"',
  'canva-ai': '"Canva AI" OR "Magic Studio"',
  descript: '"Descript"',
  'capcut-ai': '"CapCut AI" OR "CapCut"',
  zapier: '"Zapier AI" OR "Zapier"',
  make: '"Make.com" OR "Make automation"',
  'notion-ai': '"Notion AI"',
  beehiiv: '"beehiiv"',
  perplexity: '"Perplexity AI" OR "Perplexity"',
  runway: '"Runway AI" OR "RunwayML"',
  elevenlabs: '"ElevenLabs"',
  synthesia: '"Synthesia"',
  heygen: '"HeyGen"',
  jasper: '"Jasper AI"',
  'grammarly-ai': '"Grammarly AI" OR "Grammarly"',
  'fireflies-ai': '"Fireflies AI" OR "Fireflies"'
};

const TREND_KEYWORDS: Array<{ label: TrendLabel; keywords: string[] }> = [
  { label: 'Security', keywords: ['security', 'breach', 'safety', 'vulnerability', 'guardrail', 'jailbreak'] },
  { label: 'Pricing', keywords: ['pricing', 'price', 'plan', 'subscription', 'cost', 'billing'] },
  { label: 'Funding', keywords: ['funding', 'raises', 'raised', 'valuation', 'investment', 'series'] },
  { label: 'Partnership', keywords: ['partner', 'partnership', 'integrates with', 'integration', 'collaboration'] },
  { label: 'Policy', keywords: ['policy', 'regulation', 'compliance', 'government', 'law', 'legal'] },
  { label: 'Model Update', keywords: ['model', 'benchmark', 'inference', 'reasoning', 'token', 'context window'] },
  { label: 'Launch', keywords: ['launch', 'launched', 'release', 'released', 'debut', 'introduces', 'introducing'] },
  { label: 'Feature Update', keywords: ['feature', 'rollout', 'update', 'workflow', 'tool', 'agent', 'assistant'] },
  { label: 'Research', keywords: ['research', 'paper', 'study', 'science', 'dataset'] }
];

function buildGoogleNewsSearchUrl(query: string) {
  return `https://news.google.com/rss/search?hl=en-US&gl=US&ceid=US:en&q=${encodeURIComponent(query)}`;
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function stripHtml(value: string) {
  return decodeHtmlEntities(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function truncate(value: string, length: number) {
  if (value.length <= length) {
    return value;
  }

  return `${value.slice(0, length - 1).trimEnd()}…`;
}

function getSourceFromTitle(title: string) {
  const parts = title.split(' - ');
  return parts.length > 1 ? parts.at(-1) ?? 'Google News' : 'Google News';
}

function cleanTitle(title: string) {
  const parts = title.split(' - ');
  return parts.length > 1 ? parts.slice(0, -1).join(' - ') : title;
}

function normalizeTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\b(the|a|an|and|or|to|for|of|in|on|with)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getRecencyScore(publishedAt: string) {
  const publishedTime = new Date(publishedAt).getTime();
  if (Number.isNaN(publishedTime)) {
    return 0;
  }

  const ageInDays = (Date.now() - publishedTime) / DAY_MS;
  if (ageInDays <= 1) return 6;
  if (ageInDays <= 3) return 5;
  if (ageInDays <= 7) return 4;
  if (ageInDays <= 14) return 2;
  if (ageInDays <= 30) return 1;
  return 0;
}

function classifyTrendLabel(title: string, summary: string): TrendLabel {
  const haystack = `${title} ${summary}`.toLowerCase();

  for (const rule of TREND_KEYWORDS) {
    if (rule.keywords.some((keyword) => haystack.includes(keyword))) {
      return rule.label;
    }
  }

  return 'General';
}

function getTrendWeight(label: TrendLabel) {
  switch (label) {
    case 'Security':
      return 6;
    case 'Pricing':
    case 'Policy':
      return 5;
    case 'Launch':
    case 'Model Update':
      return 4;
    case 'Funding':
    case 'Partnership':
      return 3;
    case 'Feature Update':
    case 'Research':
      return 2;
    case 'General':
    default:
      return 1;
  }
}

function calculateImportanceScore(args: {
  title: string;
  summary: string;
  publishedAt: string;
  sourceKind: 'official' | 'news';
  trendLabel: TrendLabel;
}) {
  const haystack = `${args.title} ${args.summary}`.toLowerCase();
  const keywordHits = TREND_KEYWORDS.flatMap((rule) => rule.keywords).reduce((score, keyword) => {
    return score + (haystack.includes(keyword) ? 1 : 0);
  }, 0);

  return (
    getRecencyScore(args.publishedAt) +
    getTrendWeight(args.trendLabel) +
    keywordHits +
    (args.sourceKind === 'official' ? 3 : 0)
  );
}

function buildSeoHeadline(title: string, trendLabel: TrendLabel, source: string) {
  const labelText = trendLabel === 'General' ? 'AI Update' : trendLabel;
  return `${title} | ${labelText} Brief From ${source}`;
}

function ensureSentence(value: string) {
  const trimmed = value.trim().replace(/\s+/g, ' ');
  if (!trimmed) {
    return '';
  }

  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function splitIntoSentences(value: string) {
  const protectedValue = value.replace(/(\d)\.(\d)/g, '$1__DOT__$2');

  return protectedValue
    .replace(/\s+/g, ' ')
    .match(/[^.!?]+[.!?]?/g)
    ?.map((sentence) => ensureSentence(sentence.replace(/__DOT__/g, '.')))
    .filter((sentence) => sentence.length >= 40) ?? [];
}

function normalizeSentence(value: string) {
  return normalizeTitle(value).replace(/\b(ai|artificial|intelligence|announces|introduces|launches|launch|update|news)\b/g, ' ').replace(/\s+/g, ' ').trim();
}

function isLowSignalSentence(value: string) {
  return (
    value.length < 40 ||
    value.length > 280 ||
    /cookie|newsletter|sign up|subscribe|advertisement|all rights reserved|javascript|privacy policy|comprehensive, up-to-date news coverage|aggregated from sources all over the world|google news/i.test(value)
  );
}

function selectDistinctSentences(sentences: string[], limit: number, ...avoidValues: string[]) {
  const seen = new Set(avoidValues.map((value) => normalizeSentence(value)).filter(Boolean));
  const selected: string[] = [];

  for (const sentence of sentences) {
    const cleaned = ensureSentence(sentence);
    const normalized = normalizeSentence(cleaned);
    if (!normalized || seen.has(normalized) || isLowSignalSentence(cleaned)) {
      continue;
    }

    selected.push(cleaned);
    seen.add(normalized);

    if (selected.length >= limit) {
      break;
    }
  }

  return selected;
}

function getDeterministicIndex(seed: string, size: number) {
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }

  return size === 0 ? 0 : hash % size;
}

function buildLeadIn(title: string, source: string, trendLabel: TrendLabel) {
  const labelText = trendLabel === 'General' ? 'AI shift' : trendLabel.toLowerCase();
  const prefixOptions: Record<TrendLabel, string[]> = {
    Launch: ['Launch watch:', 'New rollout:', 'Fresh release:'],
    'Model Update': ['Model watch:', 'Capability shift:', 'Inference update:'],
    'Feature Update': ['Feature drop:', 'Workflow change:', 'Product tweak:'],
    Pricing: ['Pricing shift:', 'Cost watch:', 'Commercial move:'],
    Policy: ['Policy watch:', 'Rules shift:', 'Regulation signal:'],
    Security: ['Security watch:', 'Risk signal:', 'Trust update:'],
    Funding: ['Funding signal:', 'Market move:', 'Capital watch:'],
    Partnership: ['Partnership watch:', 'Integration move:', 'Distribution signal:'],
    Research: ['Research watch:', 'Lab signal:', 'Frontier note:'],
    General: ['Worth noting:', 'Here is the signal:', 'On the radar:']
  };
  const prefixes = prefixOptions[trendLabel];
  const prefix = prefixes[getDeterministicIndex(`${source}:${title}:${trendLabel}`, prefixes.length)];
  const options = [
    `${prefix} ${source} is pushing a new ${labelText} with ${title}.`,
    `${prefix} ${title} stands out as one of the clearer ${labelText} signals from ${source}.`,
    `${prefix} ${source} is using ${title} to show where this ${labelText} story is heading.`,
    `${prefix} ${title} adds a fresh angle to the current ${labelText} cycle around ${source}.`,
    `${prefix} ${title} is the key ${labelText} development attached to ${source} right now.`
  ];

  return options[getDeterministicIndex(`${title}:${source}:${trendLabel}`, options.length)];
}

function buildFallbackSummary(title: string, source: string, trendLabel: TrendLabel) {
  const cleanedTitle = title.replace(/[.!?]+$/, '').trim();
  const leadIn = buildLeadIn(cleanedTitle, source, trendLabel);

  if (/^introducing\s+/i.test(cleanedTitle)) {
    return `${leadIn} ${source} introduced ${cleanedTitle.replace(/^introducing\s+/i, '')}.`;
  }

  if (/^(why|how)\s+/i.test(cleanedTitle)) {
    return `${leadIn} The article explores ${cleanedTitle.replace(/^(Why|How)\b/, (value) => value.toLowerCase())}.`;
  }

  return `${leadIn} The article focuses on ${cleanedTitle}.`;
}

function shortenBullet(value: string) {
  const cleaned = value
    .replace(/^(big move|worth a look|what changed|why this is notable|the short version|launch watch|new rollout|fresh release|model watch|capability shift|inference update|feature drop|workflow change|product tweak|pricing shift|cost watch|commercial move|policy watch|rules shift|regulation signal|security watch|risk signal|trust update|funding signal|market move|capital watch|partnership watch|integration move|distribution signal|research watch|lab signal|frontier note|worth noting|here is the signal|on the radar):\s*/i, '')
    .replace(/^the article (focuses on|explores)\s+/i, '')
    .replace(/\b(according to|reportedly|announced that|introduces|introducing)\b/gi, (match) =>
      match.toLowerCase()
    )
    .trim();

  return truncate(ensureSentence(cleaned), 140);
}

function stripTitleFromSentence(sentence: string, title: string) {
  const normalizedTitle = title.replace(/[.!?]+$/, '').trim();
  const escapedTitle = escapeRegex(normalizedTitle);

  return sentence
    .replace(new RegExp(`^${escapedTitle}\\s*(is|are|was|were|:|-)?\\s*`, 'i'), '')
    .replace(new RegExp(escapedTitle, 'ig'), '')
    .replace(/^\s*(is|are|was|were)\s+/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildTitleBullet(title: string, trendLabel: TrendLabel) {
  const cleanedTitle = title.replace(/[.!?]+$/, '').trim();

  switch (trendLabel) {
    case 'Launch':
      return `New launch: ${cleanedTitle}.`;
    case 'Model Update':
      return `Model change: ${cleanedTitle}.`;
    case 'Feature Update':
      return `Feature update: ${cleanedTitle}.`;
    case 'Pricing':
      return `Pricing move: ${cleanedTitle}.`;
    case 'Policy':
      return `Policy shift: ${cleanedTitle}.`;
    case 'Security':
      return `Security update: ${cleanedTitle}.`;
    case 'Funding':
      return `Funding signal: ${cleanedTitle}.`;
    case 'Partnership':
      return `Partnership move: ${cleanedTitle}.`;
    case 'Research':
      return `Research note: ${cleanedTitle}.`;
    case 'General':
    default:
      return `Key update: ${cleanedTitle}.`;
  }
}

function buildSourceBullet(source: string, sourceKind: 'official' | 'news') {
  return sourceKind === 'official'
    ? `Source: ${source} announcement.`
    : `Source: ${source} report.`;
}

function buildDetailBullet(summary: string, title: string, trendLabel: TrendLabel) {
  const firstSentence = splitIntoSentences(summary)[0] ?? '';
  const stripped = stripTitleFromSentence(firstSentence, title);

  if (stripped.length >= 24 && !isLowSignalSentence(stripped)) {
    return shortenBullet(stripped);
  }

  switch (trendLabel) {
    case 'Launch':
      return 'Adds a new product or rollout to the market.';
    case 'Model Update':
      return 'Highlights changes in capability, speed, or model size.';
    case 'Feature Update':
      return 'Changes how the product works in day-to-day use.';
    case 'Pricing':
      return 'Changes pricing or cost structure for users.';
    case 'Policy':
      return 'Signals a policy or access change around the product.';
    case 'Security':
      return 'Focuses on security, safety, or trust implications.';
    case 'Funding':
      return 'Signals financing, investment, or market momentum.';
    case 'Partnership':
      return 'Adds an integration, alliance, or distribution change.';
    case 'Research':
      return 'Highlights a research result that may shape future products.';
    case 'General':
    default:
      return 'Highlights the main shift behind the story.';
  }
}

function buildSummaryContextSentence(title: string, trendLabel: TrendLabel) {
  const cleanedTitle = title.replace(/[.!?]+$/, '').trim();

  switch (trendLabel) {
    case 'Launch':
      return `The core update is a new launch centered on ${cleanedTitle}.`;
    case 'Model Update':
      return `The main change is a model update tied to ${cleanedTitle}.`;
    case 'Feature Update':
      return `The story is mainly about a product update tied to ${cleanedTitle}.`;
    case 'Pricing':
      return `The change here is commercial and tied to ${cleanedTitle}.`;
    case 'Policy':
      return `The story points to a policy shift around ${cleanedTitle}.`;
    case 'Security':
      return `The update is mainly about security implications linked to ${cleanedTitle}.`;
    case 'Funding':
      return `The signal here is market momentum around ${cleanedTitle}.`;
    case 'Partnership':
      return `The change is driven by partnership or distribution movement around ${cleanedTitle}.`;
    case 'Research':
      return `The article highlights a research development linked to ${cleanedTitle}.`;
    case 'General':
    default:
      return `The story centers on a broader AI change tied to ${cleanedTitle}.`;
  }
}

function buildSummarySourceSentence(source: string, sourceKind: 'official' | 'news') {
  return sourceKind === 'official'
    ? `${source} is the original source for this announcement.`
    : `${source} is covering the change from the outside.`;
}

function buildChangeBullets(
  candidates: string[],
  title: string,
  source: string,
  summary: string,
  trendLabel: TrendLabel,
  sourceKind: 'official' | 'news',
  avoidValues: string[]
) {
  const selected = selectDistinctSentences(candidates, 6, ...avoidValues)
    .map((sentence) => shortenBullet(sentence))
    .filter(Boolean);
  const fallbackPool = [
    buildTitleBullet(title, trendLabel),
    buildDetailBullet(summary, title, trendLabel),
    buildSourceBullet(source, sourceKind)
  ];

  for (const fallback of fallbackPool) {
    const normalizedFallback = normalizeSentence(fallback);
    if (!normalizedFallback || selected.some((item) => normalizeSentence(item) === normalizedFallback)) {
      continue;
    }

    selected.push(fallback);
    if (selected.length >= 2) {
      break;
    }
  }

  return selected.slice(0, 2);
}

function buildNewsCopy(
  title: string,
  summary: string,
  trendLabel: TrendLabel,
  source: string,
  sourceKind: 'official' | 'news',
  extraContext: string[] = []
) {
  const candidateSentences = selectDistinctSentences(
    [
      ...splitIntoSentences(summary),
      ...extraContext.flatMap((value) => splitIntoSentences(value))
    ],
    8,
    title
  );

  const fallbackLead = ensureSentence(buildFallbackSummary(title, source, trendLabel));
  const primarySentence = candidateSentences[0] ?? fallbackLead;
  const leadSentence =
    candidateSentences[0] && !/^(big move|worth a look|what changed|why this is notable|the short version):/i.test(candidateSentences[0])
      ? `${buildLeadIn(title, source, trendLabel)} ${primarySentence}`
      : primarySentence;
  const supportingSentences = selectDistinctSentences(
    candidateSentences.slice(1),
    3,
    title,
    primarySentence,
    leadSentence
  );

  const fallbackSummarySentences = selectDistinctSentences(
    [
      buildSummaryContextSentence(title, trendLabel),
      buildSummarySourceSentence(source, sourceKind)
    ],
    3,
    title,
    leadSentence,
    primarySentence,
    ...supportingSentences
  );
  const briefingSentences = [leadSentence, ...supportingSentences, ...fallbackSummarySentences].slice(0, 4);
  const briefing = truncate(briefingSentences.join(' '), 760);

  const takeaways = buildChangeBullets(
    candidateSentences,
    title,
    source,
    summary,
    trendLabel,
    sourceKind,
    [
      title,
      leadSentence,
      primarySentence,
      ...supportingSentences,
      ...briefingSentences
    ]
  );

  return {
    summary: truncate(leadSentence, 220),
    seoHeadline: buildSeoHeadline(title, trendLabel, source),
    briefing,
    takeaways
  };
}

type ExtractedArticleContent = {
  description: string;
  paragraphs: string[];
};

const articleContentCache = new Map<string, Promise<ExtractedArticleContent | null>>();

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractMetaContent(html: string, key: string) {
  const escapedKey = escapeRegex(key);
  const patterns = [
    new RegExp(`<meta[^>]+(?:name|property)=["']${escapedKey}["'][^>]+content=["']([^"']+)["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${escapedKey}["'][^>]*>`, 'i')
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    const content = match?.[1] ? stripHtml(match[1]) : '';
    if (content) {
      return content;
    }
  }

  return '';
}

function extractJsonLdText(html: string) {
  const matches = Array.from(
    html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
  );
  const snippets: string[] = [];

  const visit = (value: unknown) => {
    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }

    if (typeof value !== 'object') {
      return;
    }

    const record = value as Record<string, unknown>;
    for (const key of ['headline', 'description', 'articleBody']) {
      const nextValue = record[key];
      if (typeof nextValue === 'string') {
        const cleaned = stripHtml(nextValue);
        if (cleaned) {
          snippets.push(cleaned);
        }
      }
    }

    for (const nestedValue of Object.values(record)) {
      visit(nestedValue);
    }
  };

  for (const match of matches) {
    try {
      visit(JSON.parse(match[1]));
    } catch {
      continue;
    }
  }

  return selectDistinctSentences(snippets.flatMap((value) => splitIntoSentences(value)), 6);
}

function extractArticleParagraphs(html: string) {
  const articleSection =
    html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] ??
    html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ??
    html;

  const cleanedSection = articleSection
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ');

  const paragraphs = Array.from(cleanedSection.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi))
    .map((match) => stripHtml(match[1]))
    .filter((paragraph) => !isLowSignalSentence(paragraph));

  return selectDistinctSentences(paragraphs, 8);
}

async function fetchArticleContent(url: string): Promise<ExtractedArticleContent | null> {
  const cached = articleContentCache.get(url);
  if (cached) {
    return cached;
  }

  const promise = (async () => {
    try {
      const response = await fetch(url, {
        next: { revalidate: FEED_REVALIDATE_SECONDS },
        redirect: 'follow',
        headers: {
          'User-Agent': 'CreatorAILab-News/1.0'
        }
      });

      if (!response.ok) {
        return null;
      }

      const contentType = response.headers.get('content-type') ?? '';
      if (!contentType.includes('text/html')) {
        return null;
      }

      const html = await response.text();
      const description =
        extractMetaContent(html, 'description') ||
        extractMetaContent(html, 'og:description') ||
        extractMetaContent(html, 'twitter:description');
      const jsonLdSnippets = extractJsonLdText(html);
      const paragraphs = selectDistinctSentences(
        [...extractArticleParagraphs(html), ...jsonLdSnippets],
        8,
        description
      );

      if (!description && paragraphs.length === 0) {
        return null;
      }

      return {
        description,
        paragraphs
      };
    } catch {
      return null;
    }
  })();

  articleContentCache.set(url, promise);
  return promise;
}

async function enrichNewsItem(item: AiNewsItem) {
  const articleContent = await fetchArticleContent(item.url);
  if (!articleContent) {
    return item;
  }

  const enrichedCopy = buildNewsCopy(
    item.title,
    articleContent.description || item.summary,
    item.trendLabel,
    item.source,
    item.sourceKind,
    articleContent.paragraphs
  );

  return {
    ...item,
    ...enrichedCopy
  };
}

async function enrichNewsItems(items: AiNewsItem[]) {
  return Promise.all(items.map((item) => enrichNewsItem(item)));
}

function getMostRecentSundayEveningGmt(referenceTime = new Date()) {
  const utcNow = referenceTime;
  const currentDay = utcNow.getUTCDay();
  const currentHour = utcNow.getUTCHours();

  const daysSinceSunday = currentDay;
  const anchor = new Date(
    Date.UTC(
      utcNow.getUTCFullYear(),
      utcNow.getUTCMonth(),
      utcNow.getUTCDate() - daysSinceSunday,
      18,
      0,
      0,
      0
    )
  );

  if (currentDay === 0 && currentHour < 18) {
    anchor.setUTCDate(anchor.getUTCDate() - 7);
  }

  return anchor;
}

function getWeeklyScoreboardWindow(referenceTime = new Date()) {
  const periodEnd = getMostRecentSundayEveningGmt(referenceTime);
  const periodStart = new Date(periodEnd);
  periodStart.setUTCDate(periodStart.getUTCDate() - 7);

  const nextUpdate = new Date(periodEnd);
  nextUpdate.setUTCDate(nextUpdate.getUTCDate() + 7);

  return {
    periodStart,
    periodEnd,
    updatesAt: nextUpdate
  };
}

function isWithinWindow(dateString: string, start: Date, end: Date) {
  const time = new Date(dateString).getTime();
  return Number.isFinite(time) && time >= start.getTime() && time < end.getTime();
}

function buildToolLookup() {
  return new Map(getNewsToolOptions().map((tool) => [tool.slug, tool.name]));
}

function getAreaScore(entry: AiNewsItem, area: WeeklyScoreboardArea) {
  switch (area) {
    case 'Overall':
      return entry.importanceScore;
    case 'Model Progress':
      return entry.trendLabel === 'Model Update' || entry.trendLabel === 'Research' ? entry.importanceScore : 0;
    case 'Product Velocity':
      return entry.trendLabel === 'Launch' || entry.trendLabel === 'Feature Update' ? entry.importanceScore : 0;
    case 'Market Momentum':
      return entry.trendLabel === 'Funding' || entry.trendLabel === 'Partnership' ? entry.importanceScore : 0;
    case 'Pricing Power':
      return entry.trendLabel === 'Pricing' ? entry.importanceScore : 0;
    case 'Trust And Safety':
      return entry.trendLabel === 'Security' || entry.trendLabel === 'Policy' ? entry.importanceScore : 0;
    default:
      return 0;
  }
}

function buildScoreboardRationale(toolName: string, area: WeeklyScoreboardArea, score: number) {
  switch (area) {
    case 'Overall':
      return `${toolName} generated the strongest overall mix of high-signal launches, updates, and market-moving coverage this week.`;
    case 'Model Progress':
      return `${toolName} led the strongest model and research signal this week with a score of ${score}.`;
    case 'Product Velocity':
      return `${toolName} showed the fastest product velocity through launches and feature rollouts this week.`;
    case 'Market Momentum':
      return `${toolName} led the market-momentum signal through funding or partnership activity this week.`;
    case 'Pricing Power':
      return `${toolName} drove the most meaningful pricing-related signal this week.`;
    case 'Trust And Safety':
      return `${toolName} led the trust-and-safety conversation through policy or security-related developments.`;
    default:
      return `${toolName} led this area this week.`;
  }
}

function sortAndDedupe(items: AiNewsItem[], limit: number) {
  const seenUrls = new Set<string>();
  const seenTitles = new Set<string>();
  const deduped: AiNewsItem[] = [];

  for (const item of items) {
    const normalizedTitle = normalizeTitle(item.title);
    if (seenUrls.has(item.url) || seenTitles.has(normalizedTitle)) {
      continue;
    }

    seenUrls.add(item.url);
    seenTitles.add(normalizedTitle);
    deduped.push(item);
  }

  const sorted = deduped.sort((a, b) => {
    const scoreDelta = b.importanceScore - a.importanceScore;
    if (scoreDelta !== 0) {
      return scoreDelta;
    }

    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const diversified: AiNewsItem[] = [];
  const perSourceCount = new Map<string, number>();

  for (const item of sorted) {
    const sourceCount = perSourceCount.get(item.source) ?? 0;
    if (sourceCount >= 2 && diversified.length < limit - 1) {
      continue;
    }

    diversified.push(item);
    perSourceCount.set(item.source, sourceCount + 1);

    if (diversified.length >= limit) {
      break;
    }
  }

  if (diversified.length < limit) {
    for (const item of sorted) {
      if (!diversified.some((existing) => existing.id === item.id)) {
        diversified.push(item);
      }

      if (diversified.length >= limit) {
        break;
      }
    }
  }

  return diversified.slice(0, limit);
}

async function fetchFeedSource(source: FeedSource, limit: number, useGoogleNewsTitleParsing = false) {
  try {
    const response = await fetch(source.url, {
      next: { revalidate: FEED_REVALIDATE_SECONDS },
      headers: {
        'User-Agent': 'CreatorAILab-News/1.0'
      }
    });

    if (!response.ok) {
      return [];
    }

    const xml = await response.text();
    const feed = await parser.parseString(xml);
    const items = ((feed.items ?? []) as ParsedFeedItem[])
      .map((item) => {
        const rawTitle = item.title?.trim();
        const url = item.link?.trim();

        if (!rawTitle || !url) {
          return null;
        }

        const publishedAt = item.isoDate ?? item.pubDate ?? new Date(0).toISOString();
        const summary = truncate(stripHtml(item.contentSnippet ?? item.content ?? ''), 220);
        const title = useGoogleNewsTitleParsing ? cleanTitle(rawTitle) : rawTitle;
        const sourceLabel = useGoogleNewsTitleParsing ? getSourceFromTitle(rawTitle) : source.label;
        const trendLabel = classifyTrendLabel(title, summary);
        const sourceKind = source.kind;
        const importanceScore = calculateImportanceScore({
          title,
          summary,
          publishedAt,
          sourceKind,
          trendLabel
        });
        const newsCopy = buildNewsCopy(title, summary, trendLabel, sourceLabel, sourceKind);

        return {
          id: `${url}:${publishedAt}`,
          title,
          url,
          source: sourceLabel,
          sourceKind,
          publishedAt,
          trendLabel,
          importanceScore,
          seoHeadline: newsCopy.seoHeadline,
          summary: newsCopy.summary,
          briefing: newsCopy.briefing,
          takeaways: newsCopy.takeaways
        } satisfies AiNewsItem;
      })
      .filter((item): item is AiNewsItem => item !== null);

    return sortAndDedupe(items, limit);
  } catch {
    return [];
  }
}

async function fetchNewsQuery(query: string, limit: number) {
  return fetchFeedSource(
    {
      id: `google-news:${query}`,
      label: 'Google News',
      kind: 'news',
      url: buildGoogleNewsSearchUrl(query)
    },
    limit,
    true
  );
}

function buildTrendBreakdown(items: AiNewsItem[]): TrendBreakdownItem[] {
  const counts = new Map<TrendLabel, number>();

  for (const item of items) {
    counts.set(item.trendLabel, (counts.get(item.trendLabel) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

function buildDigest(title: string, items: AiNewsItem[], subjectName?: string): NewsDigest {
  if (items.length === 0) {
    return {
      title,
      summary: subjectName
        ? `No strong live signals are available for ${subjectName} right now. Check again later for new launches, updates, pricing changes, and product coverage.`
        : 'No strong live AI signals are available right now. Check again later for new launches, updates, pricing changes, and major ecosystem shifts.',
      highlights: []
    };
  }

  const trendBreakdown = buildTrendBreakdown(items);
  const topTrends = trendBreakdown.slice(0, 3).map((item) => item.label);
  const topSources = Array.from(new Set(items.slice(0, 5).map((item) => item.source))).slice(0, 3);
  const highlights = items.slice(0, 3).map((item) => item.title);

  const trendText =
    topTrends.length > 1
      ? `${topTrends.slice(0, -1).join(', ')} and ${topTrends.at(-1)}`
      : topTrends[0] ?? 'general AI changes';

  const sourceText = topSources.join(', ');

  return {
    title,
    summary: subjectName
      ? `Recent coverage for ${subjectName} is centered on ${trendText.toLowerCase()}. The strongest live signals are coming from ${sourceText}.`
      : `This week's AI coverage is led by ${trendText.toLowerCase()}. The strongest live signals are coming from ${sourceText}.`,
    highlights
  };
}

async function buildWeeklyScoreboard(): Promise<WeeklyScoreboard> {
  const window = getWeeklyScoreboardWindow();
  const toolOptions = getNewsToolOptions();
  const toolLookup = buildToolLookup();

  const results = await Promise.all(
    toolOptions.map(async (tool) => {
      const data = await getToolAiNews(tool.slug, { enrichArticles: false });
      const weeklyItems = data.toolNews.filter((item) =>
        isWithinWindow(item.publishedAt, window.periodStart, window.periodEnd)
      );

      return {
        tool,
        weeklyItems
      };
    })
  );

  const areas: WeeklyScoreboardArea[] = [
    'Overall',
    'Model Progress',
    'Product Velocity',
    'Market Momentum',
    'Pricing Power',
    'Trust And Safety'
  ];

  const leaders = areas
    .map((area) => {
      const ranked = results
        .map(({ tool, weeklyItems }) => ({
          tool,
          score: weeklyItems.reduce((sum, item) => sum + getAreaScore(item, area), 0)
        }))
        .sort((a, b) => b.score - a.score);

      const winner = ranked.find((entry) => entry.score > 0) ?? ranked[0];
      if (!winner) {
        return null;
      }

      const toolName = toolLookup.get(winner.tool.slug) ?? winner.tool.name;

      return {
        area,
        toolSlug: winner.tool.slug,
        toolName,
        score: winner.score,
        rationale: buildScoreboardRationale(toolName, area, winner.score)
      } satisfies WeeklyScoreboardEntry;
    })
    .filter((entry): entry is WeeklyScoreboardEntry => entry !== null);

  return {
    periodStart: window.periodStart.toISOString(),
    periodEnd: window.periodEnd.toISOString(),
    updatesAt: window.updatesAt.toISOString(),
    leaders
  };
}

export function getNewsToolOptions(): NewsToolOption[] {
  return [...popularToolsCatalog]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((tool) => ({
      slug: tool.slug,
      name: tool.name
    }));
}

export async function getGeneralAiNews(options?: { enrichArticles?: boolean }) {
  const queryResults = await Promise.all(GENERAL_QUERIES.map((query) => fetchNewsQuery(query, 8)));
  const officialResults = await Promise.all(OFFICIAL_GENERAL_FEEDS.map((source) => fetchFeedSource(source, 6)));
  const dedupedNews = sortAndDedupe([...queryResults.flat(), ...officialResults.flat()], 14);
  const generalNews = options?.enrichArticles === false ? dedupedNews : await enrichNewsItems(dedupedNews);

  return {
    generalNews,
    trendBreakdown: buildTrendBreakdown(generalNews),
    generalDigest: buildDigest('What Changed In AI This Week', generalNews)
  };
}

export async function getToolAiNews(slug?: string | null, options?: { enrichArticles?: boolean }) {
  if (!slug) {
    return {
      selectedTool: null,
      toolNews: [],
      toolDigest: null,
      toolTrendBreakdown: [] as TrendBreakdownItem[]
    };
  };

  const selectedTool = getNewsToolOptions().find((tool) => tool.slug === slug) ?? null;
  if (!selectedTool) {
    return {
      selectedTool: null,
      toolNews: [],
      toolDigest: null,
      toolTrendBreakdown: [] as TrendBreakdownItem[]
    };
  }

  const toolQuery = `${TOOL_QUERY_HINTS[slug] ?? `"${selectedTool.name}"`} (AI OR update OR feature OR pricing OR release OR launch) when:30d`;
  const querySource = {
    id: `google-news:${slug}`,
    label: 'Google News',
    kind: 'news' as const,
    url: buildGoogleNewsSearchUrl(toolQuery)
  };

  const officialSources = TOOL_OFFICIAL_FEEDS[slug] ?? [];
  const [queryResults, officialResults] = await Promise.all([
    fetchFeedSource(querySource, 10, true),
    Promise.all(officialSources.map((source) => fetchFeedSource(source, 8)))
  ]);

  const dedupedToolNews = sortAndDedupe([...queryResults, ...officialResults.flat()], 10);
  const toolNews = options?.enrichArticles === false ? dedupedToolNews : await enrichNewsItems(dedupedToolNews);

  return {
    selectedTool,
    toolNews,
    toolDigest: buildDigest(`What Changed For ${selectedTool.name}`, toolNews, selectedTool.name),
    toolTrendBreakdown: buildTrendBreakdown(toolNews)
  };
}

export async function getAiNewsBundle(selectedToolSlug?: string | null): Promise<AiNewsBundle> {
  const [generalData, toolData, weeklyScoreboard] = await Promise.all([
    getGeneralAiNews(),
    getToolAiNews(selectedToolSlug),
    buildWeeklyScoreboard()
  ]);

  return {
    generalNews: generalData.generalNews,
    toolNews: toolData.toolNews,
    selectedTool: toolData.selectedTool,
    toolOptions: getNewsToolOptions(),
    updatedAt: new Date().toISOString(),
    generalDigest: generalData.generalDigest,
    toolDigest: toolData.toolDigest,
    trendBreakdown: generalData.trendBreakdown,
    toolTrendBreakdown: toolData.toolTrendBreakdown,
    weeklyScoreboard
  };
}
