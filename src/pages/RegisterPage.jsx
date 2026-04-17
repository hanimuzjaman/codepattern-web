import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertMessage } from '../components/common/AlertMessage'
import { FormField } from '../components/forms/FormField'
import { useAuth } from '../hooks/useAuth'
import { getUserFacingError } from '../utils/errorMessage'

function validate(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Name is required'
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  }

  return errors
}

export function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  function onChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  async function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setServerError('')
    setSuccessMessage('')

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      await register({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      })

      setSuccessMessage('Registration successful. Redirecting to login...')
      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 700)
    } catch (error) {
      setServerError(getUserFacingError(error, 'Registration failed. Please try again.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Create Account</h2>
      <p className="mt-1 text-sm text-slate-600">Start your structured DSA journey today.</p>

      <form className="mt-5 space-y-4" onSubmit={onSubmit} noValidate>
        <AlertMessage message={serverError} />
        <AlertMessage type="success" message={successMessage} />

        <FormField
          id="name"
          label="Name"
          value={values.name}
          onChange={onChange}
          autoComplete="name"
          error={errors.name}
          disabled={isSubmitting}
        />

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
          autoComplete="new-password"
          error={errors.password}
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-teal-700 hover:text-teal-600">
          Login
        </Link>
      </p>
    </div>
  )
}
