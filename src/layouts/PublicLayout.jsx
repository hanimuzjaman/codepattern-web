import { Outlet } from 'react-router-dom'

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-teal-50 px-4 py-8">
      <div className="mx-auto w-full max-w-5xl">
        <Outlet />
      </div>
    </div>
  )
}
