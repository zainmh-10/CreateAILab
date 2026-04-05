export default function LoadingTool() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-6 px-6 py-12">
      <div className="space-y-3">
        <div className="h-4 w-24 rounded bg-slate-200" />
        <div className="h-8 w-64 rounded bg-slate-200" />
        <div className="h-5 w-96 rounded bg-slate-200" />
      </div>
      <div className="h-64 rounded-2xl bg-slate-200" />
      <div className="card space-y-3">
        <div className="h-4 w-48 rounded bg-slate-200" />
        <div className="h-4 w-36 rounded bg-slate-200" />
        <div className="h-10 w-32 rounded bg-slate-200" />
      </div>
    </div>
  );
}
