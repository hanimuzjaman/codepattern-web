import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-teal-700">CodePattern</p>
      <h2 className="mt-2 text-3xl font-bold text-slate-900">From Zero to Interview-Ready</h2>
      <p className="mt-3 max-w-2xl text-slate-600">
        Build DSA momentum with guided roadmaps, adaptive practice, and AI coaching in one workspace.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {isAuthenticated ? (
          <Link to="/dashboard" className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700">
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link to="/register" className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700">
              Create Account
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-slate-300 px-4 py-2 text-slate-900 hover:bg-slate-50"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </section>
  )
}
