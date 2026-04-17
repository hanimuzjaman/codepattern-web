import { Link } from 'react-router-dom'
import { DifficultyBadge } from './DifficultyBadge'

export function ProblemCard({ problem }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{problem.title}</h3>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>

      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-cyan-700">{problem.topicName}</p>
      <p className="mt-2 text-sm text-slate-600">{problem.shortDescription}</p>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>{problem.premium ? 'Premium' : 'Free'}</span>
        <span>Status: Not Started</span>
      </div>

      <Link
        to={`/problems/${problem.slug}`}
        className="mt-4 inline-block rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Open Problem
      </Link>
    </article>
  )
}
