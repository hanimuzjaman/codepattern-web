const ACTIONS = [
  { id: 'hint', label: 'Ask Hint' },
  { id: 'explain', label: 'Explain' },
  { id: 'analyze', label: 'Analyze Complexity' },
  { id: 'mistakes', label: 'Common Mistakes' },
  { id: 'review', label: 'Review Code' },
]

export function ActionButtons({ selectedAction, onActionChange, disabled }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ACTIONS.map((action) => (
        <button
          key={action.id}
          type="button"
          disabled={disabled}
          onClick={() => onActionChange(action.id)}
          className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${
            selectedAction === action.id
              ? 'border-cyan-700 bg-cyan-700 text-white'
              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
          } disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}
