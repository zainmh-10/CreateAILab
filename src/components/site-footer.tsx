import Link from 'next/link';

import { BrandLogo } from '@/components/brand-logo';

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-[#fafafa]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div className="space-y-4">
          <BrandLogo />
          <p className="max-w-xs text-sm text-slate-600">
            Empowering non-technical creators and solopreneurs to build faster, create better content, and scale their audience using AI.
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-slate-900">Platform</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/tools">AI Tools Directory</Link></li>
            <li><Link href="/workflows">Workflow Guides</Link></li>
            <li><Link href="/prompts">Prompt Library</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-slate-900">Legal</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms of Service</Link></li>
            <li><Link href="#">Affiliate Disclosure</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between border-t border-slate-200 px-6 py-6 text-sm text-slate-500">
        <p>© 2026 CreatorAILab. All rights reserved.</p>
        <p>Built for creators, by creators.</p>
      </div>
    </footer>
  );
}
