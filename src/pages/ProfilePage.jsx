import { useAuth } from '../hooks/useAuth'

export function ProfilePage() {
  const { user } = useAuth()

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Profile</h2>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase text-slate-500">Name</dt>
          <dd className="mt-1 text-slate-900">{user?.name || '-'}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-500">Email</dt>
          <dd className="mt-1 text-slate-900">{user?.email || '-'}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs uppercase text-slate-500">Roles</dt>
          <dd className="mt-1 flex flex-wrap gap-2">
            {user?.roles?.map((role) => (
              <span key={role} className="rounded-md bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800">
                {role}
              </span>
            ))}
          </dd>
        </div>
      </dl>
    </section>
  )
}
