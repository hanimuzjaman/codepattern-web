export function TopicsListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-200" />
          <div className="mt-6 h-8 w-28 animate-pulse rounded bg-slate-200" />
        </div>
      ))}
    </div>
  )
}
