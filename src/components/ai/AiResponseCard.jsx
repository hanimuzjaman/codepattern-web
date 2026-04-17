function formatTimestamp(isoTime) {
  if (!isoTime) {
    return 'now'
  }
  return new Date(isoTime).toLocaleTimeString()
}

export function AiResponseCard({ item }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.content)
    } catch {
      // Clipboard access is best-effort.
    }
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="rounded bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">{item.action.toUpperCase()}</span>
          <span>{formatTimestamp(item.generatedAt)}</span>
          <span className="rounded bg-cyan-50 px-2 py-0.5 text-cyan-700">{item.provider}</span>
          {item.fallbackUsed ? <span className="rounded bg-amber-50 px-2 py-0.5 text-amber-700">fallback</span> : null}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
        >
          Copy
        </button>
      </div>
      <pre className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-800">{item.content}</pre>
    </article>
  )
}
