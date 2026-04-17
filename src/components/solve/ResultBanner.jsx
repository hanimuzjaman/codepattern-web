const STYLE_MAP = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  error: 'border-rose-200 bg-rose-50 text-rose-800',
  info: 'border-slate-200 bg-slate-50 text-slate-700',
}

export function ResultBanner({ tone = 'info', title, message, meta }) {
  return (
    <div className={`rounded-xl border p-4 ${STYLE_MAP[tone] || STYLE_MAP.info}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-sm font-semibold uppercase tracking-[0.2em]">{title}</h4>
        {meta ? <span className="text-xs font-medium">{meta}</span> : null}
      </div>
      <p className="mt-2 whitespace-pre-line text-sm leading-6">{message}</p>
    </div>
  )
}