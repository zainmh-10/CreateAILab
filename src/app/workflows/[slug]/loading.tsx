export default function LoadingWorkflow() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-6 px-6 py-14">
      <div className="space-y-3">
        <div className="h-4 w-32 rounded bg-slate-200" />
        <div className="flex gap-3">
          <div className="h-6 w-20 rounded-full bg-slate-200" />
          <div className="h-6 w-16 rounded-full bg-slate-200" />
        </div>
        <div className="h-10 w-80 rounded bg-slate-200" />
        <div className="h-5 w-full max-w-lg rounded bg-slate-200" />
      </div>
      <div className="card-soft space-y-4 p-7">
        <div className="h-5 w-40 rounded bg-slate-200" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-full rounded bg-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
