import { NextResponse } from 'next/server';

import { getCurrentQuizSet, getQuestionsForClient, getWeekNumberGMT } from '@/lib/weekly-quiz';

export async function GET() {
  const set = getCurrentQuizSet();
  const questions = getQuestionsForClient();
  const weekNumber = getWeekNumberGMT();
  return NextResponse.json({
    weekLabel: set.weekLabel,
    weekNumber,
    questions
  });
}
