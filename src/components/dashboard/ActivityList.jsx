import { Link } from 'react-router-dom'

function statusTone(status) {
  if (status === 'ACCEPTED') return 'bg-emerald-100 text-emerald-800'
  if (status === 'WRONG_ANSWER') return 'bg-rose-100 text-rose-800'
  return 'bg-slate-100 text-slate-700'
}

function formatDate(isoDate) {
  if (!isoDate) return 'Unknown time'
  return new Date(isoDate).toLocaleString()
}

export function ActivityList({ items }) {
  if (!items?.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
        No recent activity yet. Solve your first problem to unlock progress insights.
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={`${item.problemSlug}-${item.createdAt}-${index}`} className="rounded-xl border border-slate-200 bg-white p-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Link to={`/problems/${item.problemSlug}`} className="font-semibold text-slate-900 hover:text-cyan-700">
                {item.problemTitle}
              </Link>
              <p className="text-xs text-slate-500">{item.topicName} • {item.language}</p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone(item.status)}`}>
              {item.status}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">{formatDate(item.createdAt)}</p>
        </li>
      ))}
    </ul>
  )
}
