export function ChartCard({ title, points }) {
  const values = points?.map((point) => point.attempts || 0) || []
  const maxValue = Math.max(1, ...values)

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500">Last {points?.length || 0} days</p>
      </div>

      {!points?.length ? (
        <p className="mt-8 text-sm text-slate-500">No submission trend yet.</p>
      ) : (
        <div className="mt-6 flex h-40 items-end gap-1.5">
          {points.map((point) => {
            const attempts = point.attempts || 0
            const accepted = point.accepted || 0
            const height = Math.max(6, (attempts / maxValue) * 100)
            const successHeight = attempts > 0 ? Math.max(2, (accepted / attempts) * height) : 0

            return (
              <div key={point.date} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                <div className="relative flex w-full max-w-4 items-end rounded-sm bg-slate-200" style={{ height: `${height}%` }}>
                  <span className="absolute bottom-0 w-full rounded-sm bg-cyan-500" style={{ height: `${successHeight}%` }} />
                </div>
                <span className="text-[10px] text-slate-500">{String(point.date).slice(5)}</span>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
