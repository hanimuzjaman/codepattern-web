export function PromptInput({ value, onChange, maxLength = 500, disabled, placeholder }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Prompt</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={maxLength}
        disabled={disabled}
        rows={3}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-cyan-500 disabled:bg-slate-100"
        placeholder={placeholder}
      />
      <p className="mt-1 text-right text-xs text-slate-500">
        {value.length}/{maxLength}
      </p>
    </label>
  )
}
