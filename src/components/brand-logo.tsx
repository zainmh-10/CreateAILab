import Link from 'next/link';

export function BrandLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight text-slate-900">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-sm text-white">
        ✧
      </span>
      <span className="text-2xl">CreatorAILab</span>
    </Link>
  );
}
