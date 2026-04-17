export function SolveLoadingState() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <div className="h-[520px] animate-pulse rounded-2xl border border-slate-200 bg-white" />
      <div className="space-y-4">
        <div className="h-[120px] animate-pulse rounded-2xl border border-slate-200 bg-white" />
        <div className="h-[420px] animate-pulse rounded-2xl border border-slate-200 bg-white" />
      </div>
    </div>
  )
}