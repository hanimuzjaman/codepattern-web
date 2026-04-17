function buildPages(currentPage, totalPages) {
  if (totalPages <= 0) {
    return []
  }

  const pages = new Set([currentPage])
  pages.add(0)
  pages.add(totalPages - 1)

  for (let offset = 1; offset <= 1; offset += 1) {
    pages.add(Math.max(0, currentPage - offset))
    pages.add(Math.min(totalPages - 1, currentPage + offset))
  }

  return [...pages].sort((a, b) => a - b)
}

export function ProblemsPagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null
  }

  const pages = buildPages(page, totalPages)

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      {pages.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onPageChange(item)}
          className={`rounded-md px-3 py-1.5 text-sm ${
            item === page
              ? 'bg-slate-900 text-white'
              : 'border border-slate-300 bg-white text-slate-700'
          }`}
        >
          {item + 1}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages - 1}
        className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}
