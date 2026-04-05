import { NextRequest, NextResponse } from 'next/server';

import { LEADERBOARD_CATEGORIES, type LeaderboardCategory } from '@/lib/leaderboard-models';
import {
  getLeaderboard,
  getLeaderboardOverview,
  type SortField,
  type LicenseFilter
} from '@/lib/leaderboard';

const VALID_SORTS: SortField[] = ['score', 'price', 'context', 'name'];
const VALID_LICENSES: LicenseFilter[] = ['all', 'proprietary', 'open-source'];

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const categoryParam = params.get('category')?.trim().toLowerCase() ?? null;
  const sortParam = (params.get('sort')?.trim().toLowerCase() ?? 'score') as SortField;
  const licenseParam = (params.get('license')?.trim().toLowerCase() ?? 'all') as LicenseFilter;

  const sort = VALID_SORTS.includes(sortParam) ? sortParam : 'score';
  const license = VALID_LICENSES.includes(licenseParam) ? licenseParam : 'all';

  if (!categoryParam || categoryParam === 'overview') {
    const data = getLeaderboardOverview();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=7200' }
    });
  }

  const category = categoryParam as LeaderboardCategory;
  if (!(LEADERBOARD_CATEGORIES as readonly string[]).includes(category)) {
    return NextResponse.json(
      { error: `Invalid category. Valid: ${LEADERBOARD_CATEGORIES.join(', ')}` },
      { status: 400 }
    );
  }

  const data = getLeaderboard(category, sort, license);
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=7200' }
  });
}
