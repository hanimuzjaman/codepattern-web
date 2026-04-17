import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function AppLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold text-slate-900">CodePattern</h1>
          <nav className="flex items-center gap-3 text-sm">
            <Link to="/dashboard" className="text-slate-700 hover:text-slate-900">
              Dashboard
            </Link>
            <Link to="/topics" className="text-slate-700 hover:text-slate-900">
              Topics
            </Link>
            <Link to="/problems" className="text-slate-700 hover:text-slate-900">
              Problems
            </Link>
            <Link to="/profile" className="text-slate-700 hover:text-slate-900">
              Profile
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-md bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-700"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <p className="mb-4 text-sm text-slate-600">Signed in as {user?.email}</p>
        <Outlet />
      </main>
    </div>
  )
}
