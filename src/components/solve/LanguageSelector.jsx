export function LanguageSelector({ value, onChange, options }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
      <span className="whitespace-nowrap">Language</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}