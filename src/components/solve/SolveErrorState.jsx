import { Link } from 'react-router-dom'

export function SolveErrorState({ message, onRetry, problemSlug }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-800 shadow-sm">
      <h2 className="text-xl font-bold">Unable to open solve workspace</h2>
      <p className="mt-2 text-sm leading-6">{message}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-md bg-rose-700 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600"
          >
            Retry
          </button>
        ) : null}
        {problemSlug ? (
          <Link
            to={`/problems/${problemSlug}`}
            className="rounded-md border border-rose-300 px-4 py-2 text-sm font-medium text-rose-800 hover:bg-rose-100"
          >
            Back to Problem
          </Link>
        ) : null}
      </div>
    </div>
  )
}