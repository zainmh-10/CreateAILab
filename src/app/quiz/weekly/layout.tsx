import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata(
  'Weekly AI Quiz | CreatorAILab',
  'Test your AI knowledge with 20 questions (5 easy, 15 hard). New quiz every Sunday at 8pm GMT. Get instant results and email your score.',
  '/quiz/weekly'
);

export default function WeeklyQuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
