import React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { authService } from '../services/authService'
import { setUnauthorizedHandler } from '../services/httpClient'
import { tokenStorage } from '../utils/tokenStorage'
import { AuthContext } from './AuthContextInstance'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => tokenStorage.get())
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    tokenStorage.clear()
    setToken(null)
    setUser(null)
  }, [])

  const fetchCurrentUser = useCallback(async () => {
    const storedToken = tokenStorage.get()
    if (!storedToken) {
      setUser(null)
      setIsLoading(false)
      return null
    }

    try {
      const profile = await authService.me()
      setUser(profile)
      return profile
    } catch {
      logout()
      return null
    } finally {
      setIsLoading(false)
    }
  }, [logout])

  const login = useCallback(async (credentials) => {
    const data = await authService.login(credentials)
    tokenStorage.set(data.accessToken)
    setToken(data.accessToken)
    setUser(data.user)
    return data
  }, [])

  const register = useCallback(async (payload) => {
    return authService.register(payload)
  }, [])

  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout()
    })
  }, [logout])

  const value = useMemo(
    () => ({
      token,
      user,
      isLoading,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
      fetchCurrentUser,
    }),
    [token, user, isLoading, login, register, logout, fetchCurrentUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
