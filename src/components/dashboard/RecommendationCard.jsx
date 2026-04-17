export function RecommendationCard({ recommendation }) {
  return (
    <section className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-100 p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Recommended Next Action</p>
      <p className="mt-3 text-base font-semibold text-amber-900">{recommendation || 'Solve 2 easy problems to start your streak today.'}</p>
      <p className="mt-2 text-sm text-amber-800">
        Recommendation adapts to your solved volume, recent accuracy, consistency, and topic coverage.
      </p>
    </section>
  )
}
