import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthProvider } from '../context/AuthContext'
import { useAuth } from '../hooks/useAuth'

const meMock = vi.fn()
const loginMock = vi.fn()
const registerMock = vi.fn()

vi.mock('../services/authService', () => ({
  authService: {
    me: (...args) => meMock(...args),
    login: (...args) => loginMock(...args),
    register: (...args) => registerMock(...args),
  },
}))

vi.mock('../services/httpClient', () => ({
  setUnauthorizedHandler: vi.fn(),
}))

function TestHarness() {
  const { user, isAuthenticated, login, logout } = useAuth()

  return (
    <div>
      <p data-testid="auth-state">{isAuthenticated ? 'yes' : 'no'}</p>
      <p data-testid="user-email">{user?.email || ''}</p>
      <button
        type="button"
        onClick={() => login({ email: 'alpha@mail.com', password: 'SecurePass1' })}
      >
        login
      </button>
      <button type="button" onClick={logout}>
        logout
      </button>
    </div>
  )
}

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.localStorage.clear()
  })

  it('keeps user logged out when there is no persisted token', async () => {
    render(
      <AuthProvider>
        <TestHarness />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('auth-state')).toHaveTextContent('no')
    })

    expect(meMock).not.toHaveBeenCalled()
  })

  it('hydrates user from persisted token', async () => {
    window.localStorage.setItem('codepattern.auth.token', 'persisted-token')
    meMock.mockResolvedValue({ name: 'Persisted User', email: 'persisted@mail.com', roles: ['USER'] })

    render(
      <AuthProvider>
        <TestHarness />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('auth-state')).toHaveTextContent('yes')
    })

    expect(screen.getByTestId('user-email')).toHaveTextContent('persisted@mail.com')
  })

  it('stores token and updates authenticated state after login', async () => {
    loginMock.mockResolvedValue({
      accessToken: 'new-token',
      user: { name: 'Alpha', email: 'alpha@mail.com', roles: ['USER'] },
    })

    render(
      <AuthProvider>
        <TestHarness />
      </AuthProvider>,
    )

    fireEvent.click(screen.getByText('login'))

    await waitFor(() => {
      expect(screen.getByTestId('auth-state')).toHaveTextContent('yes')
    })

    expect(window.localStorage.getItem('codepattern.auth.token')).toBe('new-token')
    expect(screen.getByTestId('user-email')).toHaveTextContent('alpha@mail.com')
  })

  it('clears session on logout', async () => {
    loginMock.mockResolvedValue({
      accessToken: 'new-token',
      user: { name: 'Alpha', email: 'alpha@mail.com', roles: ['USER'] },
    })

    render(
      <AuthProvider>
        <TestHarness />
      </AuthProvider>,
    )

    fireEvent.click(screen.getByText('login'))

    await waitFor(() => {
      expect(screen.getByTestId('auth-state')).toHaveTextContent('yes')
    })

    fireEvent.click(screen.getByText('logout'))

    await waitFor(() => {
      expect(screen.getByTestId('auth-state')).toHaveTextContent('no')
    })

    expect(window.localStorage.getItem('codepattern.auth.token')).toBeNull()
  })
})
