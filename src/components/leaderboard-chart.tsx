'use client';

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import type { RankedModel } from '@/lib/leaderboard';

type ChartDataPoint = {
  name: string;
  score: number;
  rank: number;
  delta: number;
};

function truncate(str: string, maxLen: number) {
  if (str.length <= maxLen) return str;
  return `${str.slice(0, maxLen - 1)}…`;
}

type LeaderboardChartProps = {
  models: RankedModel[];
  categoryLabel: string;
};

export function LeaderboardChart({ models, categoryLabel }: LeaderboardChartProps) {
  if (models.length === 0) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-500">No models to display for this category.</p>
      </div>
    );
  }

  const chartData: ChartDataPoint[] = models.slice(0, 15).map((entry) => ({
    name: entry.model.name,
    score: entry.score,
    rank: entry.rank,
    delta: entry.delta
  }));

  const maxScore = Math.max(...chartData.map((d) => d.score), 100);
  const domainMax = Math.ceil(maxScore / 10) * 10;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Score comparison — {categoryLabel}
      </h3>
      <div className="h-80 min-h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 4, right: 24, left: 4, bottom: 4 }}
          >
            <XAxis
              type="number"
              domain={[0, domainMax]}
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              tick={{ fontSize: 11, fill: '#334155' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => truncate(v, 14)}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value, _name, props) => {
                const payload = props?.payload as ChartDataPoint | undefined;
                const delta = payload?.delta ?? 0;
                const numVal = typeof value === 'number' ? value : 0;
                const deltaStr = delta !== 0 ? ` (${delta > 0 ? '+' : ''}${delta})` : '';
                return [`${numVal}${deltaStr}`, 'Score'];
              }}
              labelFormatter={(label) => {
                const entry = chartData.find((d) => d.name === label);
                return `#${entry?.rank ?? ''} ${label}`;
              }}
            />
            <Bar dataKey="score" radius={[0, 4, 4, 0]} maxBarSize={24}>
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={index < 3 ? '#6366f1' : '#818cf8'}
                  fillOpacity={1 - index * 0.03}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
