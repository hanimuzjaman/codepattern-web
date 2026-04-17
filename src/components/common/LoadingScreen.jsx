export function LoadingScreen({ message = 'Loading...' }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700" />
        <p className="mt-3 text-sm text-slate-700">{message}</p>
      </div>
    </div>
  )
}
