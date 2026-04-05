import { SignUp } from '@clerk/nextjs';

import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata('Sign up | CreatorAILab', 'Create a CreatorAILab account.', '/sign-up');

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-6 py-16">
      <SignUp
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-lg shadow-slate-200/80'
          }
        }}
      />
    </div>
  );
}
