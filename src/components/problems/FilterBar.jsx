export function FilterBar({
  topic,
  difficulty,
  topics,
  onTopicChange,
  onDifficultyChange,
  onReset,
}) {
  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3">
      <label className="text-sm">
        <span className="mb-1 block font-medium text-slate-700">Topic</span>
        <select
          value={topic}
          onChange={(event) => onTopicChange(event.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        >
          <option value="">All Topics</option>
          {topics.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm">
        <span className="mb-1 block font-medium text-slate-700">Difficulty</span>
        <select
          value={difficulty}
          onChange={(event) => onDifficultyChange(event.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        >
          <option value="">All Difficulties</option>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>
      </label>

      <div className="flex items-end">
        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}
