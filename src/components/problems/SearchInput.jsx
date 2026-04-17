export function SearchInput({ value, onChange, placeholder = 'Search problems...' }) {
  return (
    <label className="flex w-full items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2">
      <span className="text-slate-400">/</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border-none bg-transparent text-sm text-slate-900 outline-none"
      />
    </label>
  )
}
