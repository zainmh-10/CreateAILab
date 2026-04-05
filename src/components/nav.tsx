'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';

import { BrandLogo } from '@/components/brand-logo';

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <BrandLogo />

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/tools" className="hover:text-indigo-600">Discover Tools</Link>
          <Link href="/news" className="hover:text-indigo-600">Latest AI News</Link>
          <Link href="/leaderboard" className="hover:text-indigo-600">Leaderboard</Link>
          <Link href="/workflows" className="hover:text-indigo-600">Workflows</Link>
          <Link href="/prompts" className="hover:text-indigo-600">Prompts</Link>
          <Link href="/quiz" className="hover:text-indigo-600">Quiz</Link>
          <SignedOut>
            <Link href="/sign-in" className="text-slate-600 hover:text-indigo-600">
              Sign in
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'h-9 w-9 ring-2 ring-slate-200'
                }
              }}
            />
          </SignedIn>
          <a href="#newsletter" className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2 font-semibold text-white shadow-lg shadow-indigo-200">
            Join Newsletter
          </a>
        </nav>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-6 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-600">
            <Link href="/tools" className="py-2 hover:text-indigo-600" onClick={() => setOpen(false)}>Discover Tools</Link>
            <Link href="/news" className="py-2 hover:text-indigo-600" onClick={() => setOpen(false)}>Latest AI News</Link>
            <Link href="/leaderboard" className="py-2 hover:text-indigo-600" onClick={() => setOpen(false)}>Leaderboard</Link>
            <Link href="/workflows" className="py-2 hover:text-indigo-600" onClick={() => setOpen(false)}>Workflows</Link>
            <Link href="/prompts" className="py-2 hover:text-indigo-600" onClick={() => setOpen(false)}>Prompts</Link>
            <Link href="/quiz" className="py-2 hover:text-indigo-600" onClick={() => setOpen(false)}>Quiz</Link>
            <div className="flex items-center gap-3 border-t border-slate-100 pt-3">
              <SignedOut>
                <Link href="/sign-in" className="text-sm font-medium text-slate-600 hover:text-indigo-600" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'h-9 w-9 ring-2 ring-slate-200'
                    }
                  }}
                />
              </SignedIn>
            </div>
            <a href="#newsletter" className="mt-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-center font-semibold text-white" onClick={() => setOpen(false)}>
              Join Newsletter
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
