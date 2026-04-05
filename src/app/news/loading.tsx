export default function LoadingNewsPage() {
  return (
    <section className="mx-auto max-w-6xl animate-pulse space-y-8 px-6 py-16">
      <div className="space-y-4">
        <div className="h-8 w-40 rounded-full bg-slate-200" />
        <div className="h-14 w-full max-w-3xl rounded bg-slate-200" />
        <div className="h-6 w-full max-w-2xl rounded bg-slate-200" />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="card-soft space-y-4 p-5">
            <div className="h-4 w-40 rounded bg-slate-200" />
            <div className="h-7 w-full rounded bg-slate-200" />
            <div className="h-20 w-full rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </section>
  );
}
