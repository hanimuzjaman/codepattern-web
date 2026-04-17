export function StatCard({ label, value, hint, accent = 'slate' }) {
  const accentClass = {
    slate: 'from-slate-50 to-slate-100 text-slate-900',
    emerald: 'from-emerald-50 to-emerald-100 text-emerald-900',
    cyan: 'from-cyan-50 to-cyan-100 text-cyan-900',
    amber: 'from-amber-50 to-amber-100 text-amber-900',
  }[accent] || 'from-slate-50 to-slate-100 text-slate-900'

  return (
    <article className={`rounded-2xl border border-slate-200 bg-gradient-to-br p-4 shadow-sm ${accentClass}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">{label}</p>
      <p className="mt-3 text-3xl font-bold">{value}</p>
      {hint ? <p className="mt-2 text-sm opacity-80">{hint}</p> : null}
    </article>
  )
}
