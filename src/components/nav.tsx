import Link from 'next/link';

const links = [
  { href: '/tools', label: 'Tools' },
  { href: '/workflows', label: 'Workflows' },
  { href: '/prompts', label: 'Prompts' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/admin', label: 'Admin' }
];

export function Nav() {
  return (
    <header className="border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          CreatorAILab
        </Link>
        <nav className="flex items-center gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-700 hover:text-slate-950">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
