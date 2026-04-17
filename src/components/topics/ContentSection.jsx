export function ContentSection({ title, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 text-sm leading-7 text-slate-700 whitespace-pre-line">{children}</div>
    </section>
  )
}
