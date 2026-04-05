import { NextRequest, NextResponse } from 'next/server';

import { buildWeeklyNewsletterIssue, isNewsletterRequestAuthorized } from '@/lib/newsletter';

export async function GET(request: NextRequest) {
  if (!isNewsletterRequestAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const issue = await buildWeeklyNewsletterIssue();

  return NextResponse.json({
    success: true,
    issueTag: issue.issueTag,
    featuredToolSlug: issue.featuredToolSlug,
    attempted: 0,
    sent: 0,
    message:
      'Subscriber list storage is disabled (no database). Connect a database or use Resend audiences / another provider to send bulk issues.'
  });
}
