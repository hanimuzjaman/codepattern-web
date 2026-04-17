import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AlertMessage } from '../components/common/AlertMessage'
import { FormField } from '../components/forms/FormField'
import { useAuth } from '../hooks/useAuth'
import { getUserFacingError } from '../utils/errorMessage'

function validate(values) {
  const errors = {}

  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  }

  return errors
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const from = location.state?.from || '/dashboard'

  function onChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  async function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setServerError('')

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      await login({
        email: values.email.trim(),
        password: values.password,
      })
      navigate(from, { replace: true })
    } catch (error) {
      setServerError(getUserFacingError(error, 'Login failed. Please try again.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Login</h2>
      <p className="mt-1 text-sm text-slate-600">Continue your interview preparation journey.</p>

      <form className="mt-5 space-y-4" onSubmit={onSubmit} noValidate>
        <AlertMessage message={serverError} />

        <FormField
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={onChange}
          autoComplete="email"
          error={errors.email}
          disabled={isSubmitting}
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={onChange}
          autoComplete="current-password"
          error={errors.password}
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        New here?{' '}
        <Link to="/register" className="font-medium text-teal-700 hover:text-teal-600">
          Create an account
        </Link>
      </p>
    </div>
  )
}
