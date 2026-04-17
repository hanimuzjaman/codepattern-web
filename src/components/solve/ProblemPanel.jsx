export function ProblemPanel({ problem }) {
  const examples = Array.isArray(problem?.examples) ? problem.examples : []

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">Solve Workspace</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">{problem.title}</h2>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">{problem.difficulty}</span>
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-800">{problem.topic?.name}</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">{problem.shortDescription}</p>
      </header>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Statement</h3>
        <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700">{problem.description}</p>
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Constraints</h3>
        <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700">{problem.constraintsText}</p>
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Examples</h3>
        <div className="mt-3 space-y-3">
          {examples.length === 0 ? <p className="text-sm text-slate-600">No examples available.</p> : null}
          {examples.map((example, index) => (
            <article key={`${example.input}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
              <p><strong>Input:</strong> {example.input}</p>
              <p className="mt-1"><strong>Output:</strong> {example.output}</p>
              {example.explanation ? <p className="mt-1 text-slate-600">{example.explanation}</p> : null}
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}