import Link from 'next/link';

import { BrandLogo } from '@/components/brand-logo';

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <BrandLogo />
        <nav className="flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/tools" className="hover:text-indigo-600">Discover Tools</Link>
          <Link href="/workflows" className="hover:text-indigo-600">Workflows</Link>
          <Link href="/prompts" className="hover:text-indigo-600">Prompts</Link>
          <a href="#newsletter" className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2 font-semibold text-white shadow-lg shadow-indigo-200">
            Join Newsletter
          </a>
        </nav>
      </div>
    </header>
  );
}
