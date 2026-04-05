import { SignIn } from '@clerk/nextjs';

import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata('Sign in | CreatorAILab', 'Sign in to CreatorAILab.', '/sign-in');

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-6 py-16">
      <SignIn
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
