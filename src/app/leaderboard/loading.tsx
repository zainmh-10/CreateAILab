export default function LeaderboardLoading() {
  return (
    <section className="mx-auto max-w-7xl space-y-8 px-6 py-16">
      <header className="space-y-4">
        <div className="h-7 w-48 animate-pulse rounded-full bg-slate-200" />
        <div className="h-14 w-3/4 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-6 w-2/3 animate-pulse rounded-lg bg-slate-100" />
      </header>

      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-10 w-28 shrink-0 animate-pulse rounded-full bg-slate-100" />
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-[22px] bg-slate-100" />
        ))}
      </div>
    </section>
  );
}
