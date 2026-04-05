import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

import { buildWeeklyNewsletterIssue, isNewsletterRequestAuthorized, WEEKLY_NEWSLETTER_TAG } from '@/lib/newsletter';
import { prisma } from '@/lib/prisma';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function chunk<T>(items: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

export async function GET(request: NextRequest) {
  if (!isNewsletterRequestAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!resend) {
    return NextResponse.json({ error: 'Missing RESEND_API_KEY.' }, { status: 503 });
  }

  const issue = await buildWeeklyNewsletterIssue();
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: 'asc' }
  });
  const recipients = subscribers.filter((subscriber) => !subscriber.tags.includes(issue.issueTag));

  let sent = 0;

  for (const group of chunk(recipients, 25)) {
    await Promise.all(
      group.map(async (subscriber) => {
        const response = await resend.emails.send({
          from: 'CreatorAILab <onboarding@resend.dev>',
          to: [subscriber.email],
          subject: issue.subject,
          html: issue.html
        });

        if (response.error) {
          console.error('weekly_newsletter_send_failed', subscriber.email, response.error.message);
          return;
        }

        const nextTags = Array.from(new Set([...subscriber.tags, WEEKLY_NEWSLETTER_TAG, issue.issueTag]));
        await prisma.subscriber.update({
          where: { id: subscriber.id },
          data: { tags: nextTags }
        });
        sent += 1;
      })
    );
  }

  return NextResponse.json({
    success: true,
    issueTag: issue.issueTag,
    featuredToolSlug: issue.featuredToolSlug,
    attempted: recipients.length,
    sent
  });
}
