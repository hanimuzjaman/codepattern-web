export function TopicHeader({ topic }) {
  return (
    <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">Topic</p>
      <h2 className="mt-2 text-3xl font-bold text-slate-900">{topic.name}</h2>
      <p className="mt-3 max-w-3xl text-slate-600">{topic.shortDescription}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600">
        <span className="rounded-md bg-cyan-100 px-2 py-1 font-medium text-cyan-800">
          {topic.difficultyLevel || 'Core'}
        </span>
        <span>{topic.estimatedMinutes} min learning time</span>
        <span>Updated: {new Date(topic.updatedAt).toLocaleDateString()}</span>
      </div>
    </header>
  )
}
