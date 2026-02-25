'use client';

import { FormEvent, useMemo, useState } from 'react';

import { EmailCapture } from '@/components/email-capture';
import { trackEvent } from '@/lib/analytics';

const questions = [
  'What is your primary content type?',
  'How often do you publish?',
  'What is your biggest bottleneck?',
  'What budget range do you have?',
  'Do you need team collaboration?'
];

export default function QuizPage() {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);

  const completed = useMemo(() => answers.every(Boolean), [answers]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!completed) {
      return;
    }
    trackEvent('quiz_completed', { answersCount: answers.length });
    setSubmitted(true);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">AI Tool Finder Quiz</h1>
      {!submitted ? (
        <form onSubmit={onSubmit} className="space-y-4">
          {questions.map((q, i) => (
            <label key={q} className="card block space-y-2">
              <span className="text-sm font-semibold">{i + 1}. {q}</span>
              <input
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                value={answers[i]}
                onChange={(event) => {
                  const next = [...answers];
                  next[i] = event.target.value;
                  setAnswers(next);
                }}
                placeholder="Your answer"
              />
            </label>
          ))}
          <button className="btn" type="submit" disabled={!completed}>
            See recommendation
          </button>
        </form>
      ) : (
        <div className="card space-y-2">
          <h2 className="text-xl font-semibold">Recommended Stack</h2>
          <p className="text-sm text-slate-700">Starter stack: ChatGPT + Notion AI + Canva + Zapier + Descript.</p>
          <p className="text-xs text-slate-500">Optional: replace with OpenAI API dynamic output in phase 1.5.</p>
        </div>
      )}
      <EmailCapture source="quiz-results" />
    </div>
  );
}
