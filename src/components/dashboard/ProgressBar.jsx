export function ProgressBar({ value, label, subtitle }) {
  const normalized = Math.max(0, Math.min(100, Number(value || 0)))

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          {subtitle ? <p className="text-xs text-slate-500">{subtitle}</p> : null}
        </div>
        <p className="text-sm font-semibold text-slate-700">{normalized.toFixed(1)}%</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-[width] duration-500"
          style={{ width: `${normalized}%` }}
        />
      </div>
    </div>
  )
}
