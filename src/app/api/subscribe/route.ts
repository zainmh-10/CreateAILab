import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

import { prisma } from '@/lib/prisma';
import { subscribeEmailLimiter, subscribeIpLimiter } from '@/lib/rate-limit';
import { subscribeSchema } from '@/lib/validators';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function isLikelyBot(userAgent: string | null) {
  const value = (userAgent ?? '').toLowerCase();
  return value.includes('bot') || value.includes('crawler') || value.includes('spider');
}

export async function POST(request: NextRequest) {
  const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]?.trim() || '127.0.0.1';
  const userAgent = request.headers.get('user-agent');

  const body = await request.json().catch(() => null);
  const parsed = subscribeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email payload.' }, { status: 400 });
  }

  const { email, source, website, formStartedAt } = parsed.data;

  // Honeypot and bot heuristics return generic success to avoid attacker feedback loops.
  if ((website ?? '').length > 0 || isLikelyBot(userAgent)) {
    return NextResponse.json({ success: true });
  }

  if (formStartedAt && Date.now() - formStartedAt < 1200) {
    return NextResponse.json({ success: true });
  }

  if (subscribeIpLimiter) {
    const ipLimit = await subscribeIpLimiter.limit(`subscribe:ip:${ip}`);
    if (!ipLimit.success) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }
  }

  if (subscribeEmailLimiter) {
    const emailLimit = await subscribeEmailLimiter.limit(`subscribe:email:${email.toLowerCase()}`);
    if (!emailLimit.success) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }
  }

  await prisma.subscriber.upsert({
    where: { email },
    create: { email, source: source ?? 'unknown', tags: ['lead'] },
    update: { source: source ?? 'unknown', tags: ['lead'] }
  });

  if (resend) {
    await resend.emails.send({
      from: 'CreatorAILab <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to CreatorAILab',
      html: '<p>Thanks for subscribing. You will receive weekly AI workflow tactics.</p>'
    });
  }

  return NextResponse.json({ success: true });
}
