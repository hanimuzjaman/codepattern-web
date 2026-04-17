import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Page Not Found</h2>
        <p className="mt-2 text-slate-600">The route you requested does not exist.</p>
        <Link to="/" className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700">
          Go Home
        </Link>
      </div>
    </div>
  )
}
