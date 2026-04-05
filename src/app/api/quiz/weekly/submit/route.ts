import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { scoreQuiz } from '@/lib/weekly-quiz';

const submitSchema = z.object({
  answers: z.record(z.string(), z.number())
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = submitSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid answers.' }, { status: 400 });
  }

  const result = scoreQuiz(parsed.data.answers);
  return NextResponse.json(result);
}
