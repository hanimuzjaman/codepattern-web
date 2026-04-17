import { Link } from 'react-router-dom'

export function TopicCard({ topic }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{topic.name}</h3>
        <span className="rounded-md bg-sky-100 px-2 py-1 text-xs font-medium text-sky-800">
          {topic.difficultyLevel || 'Core'}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600">{topic.shortDescription}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>{topic.estimatedMinutes} min</span>
        <span>Progress: 0%</span>
      </div>
      <Link
        to={`/topics/${topic.slug}`}
        className="mt-4 inline-block rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Open Topic
      </Link>
    </article>
  )
}
