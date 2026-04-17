export function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 text-rose-900">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg bg-rose-700 px-3 py-2 text-sm font-medium text-white hover:bg-rose-600"
        >
          Retry
        </button>
      ) : null}
    </div>
  )
}
