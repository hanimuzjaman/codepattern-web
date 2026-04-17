import { Link } from 'react-router-dom'

export function EmptyDashboardState() {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">Your progress dashboard is ready</h3>
      <p className="mt-2 text-slate-600">
        Start solving to unlock trend charts, streak tracking, and smart recommendations.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link to="/topics" className="rounded-lg border border-slate-300 px-4 py-2 text-slate-900 hover:bg-slate-50">
          Explore Topics
        </Link>
        <Link to="/problems" className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700">
          Solve Problems
        </Link>
      </div>
    </section>
  )
}
