export function DashboardSkeleton() {
  return (
    <section className="space-y-4 animate-pulse">
      <div className="h-24 rounded-2xl bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="h-28 rounded-2xl bg-slate-200" />
        <div className="h-28 rounded-2xl bg-slate-200" />
        <div className="h-28 rounded-2xl bg-slate-200" />
        <div className="h-28 rounded-2xl bg-slate-200" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-64 rounded-2xl bg-slate-200" />
        <div className="h-64 rounded-2xl bg-slate-200" />
      </div>
    </section>
  )
}
