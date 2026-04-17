const styles = {
  EASY: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  MEDIUM: 'bg-amber-100 text-amber-800 border-amber-200',
  HARD: 'bg-rose-100 text-rose-800 border-rose-200',
}

export function DifficultyBadge({ difficulty }) {
  const normalized = String(difficulty || '').toUpperCase()
  const className = styles[normalized] || 'bg-slate-100 text-slate-700 border-slate-200'

  return (
    <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${className}`}>
      {normalized || 'UNKNOWN'}
    </span>
  )
}
