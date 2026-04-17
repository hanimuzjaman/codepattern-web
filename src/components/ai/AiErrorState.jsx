export function AiErrorState({ message, onRetry, canRetry }) {
  return (
    <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
      <p>{message}</p>
      {canRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-md bg-rose-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-600"
        >
          Retry
        </button>
      ) : null}
    </div>
  )
}
