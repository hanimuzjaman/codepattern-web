export function FormField({ id, label, type = 'text', value, onChange, autoComplete, error, disabled }) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        disabled={disabled}
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 ${
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
            : 'border-slate-300 focus:border-slate-500 focus:ring-slate-200'
        } ${disabled ? 'cursor-not-allowed bg-slate-100 text-slate-500' : 'bg-white text-slate-900'}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="text-xs text-rose-700">
          {error}
        </p>
      ) : null}
    </div>
  )
}
