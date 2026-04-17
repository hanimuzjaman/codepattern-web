import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextInstance'
import { ProtectedRoute } from '../routes/ProtectedRoute'
import { PublicOnlyRoute } from '../routes/PublicOnlyRoute'

function renderWithAuth(ui, authValue, initialEntries = ['/dashboard']) {
  return render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
    </AuthContext.Provider>,
  )
}

describe('Route guards', () => {
  it('redirects guests away from protected route', () => {
    renderWithAuth(
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<div>dashboard</div>} />
        </Route>
        <Route path="/login" element={<div>login-page</div>} />
      </Routes>,
      {
        isAuthenticated: false,
        isLoading: false,
      },
      ['/dashboard'],
    )

    expect(screen.getByText('login-page')).toBeInTheDocument()
  })

  it('allows authenticated users into protected route', () => {
    renderWithAuth(
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<div>dashboard</div>} />
        </Route>
      </Routes>,
      {
        isAuthenticated: true,
        isLoading: false,
      },
      ['/dashboard'],
    )

    expect(screen.getByText('dashboard')).toBeInTheDocument()
  })

  it('redirects authenticated users away from public auth pages', () => {
    renderWithAuth(
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<div>login-page</div>} />
        </Route>
        <Route path="/dashboard" element={<div>dashboard</div>} />
      </Routes>,
      {
        isAuthenticated: true,
        isLoading: false,
      },
      ['/login'],
    )

    expect(screen.getByText('dashboard')).toBeInTheDocument()
  })
})
