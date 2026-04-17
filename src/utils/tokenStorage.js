const AUTH_TOKEN_KEY = 'codepattern.auth.token'

export const tokenStorage = {
  get() {
    return window.localStorage.getItem(AUTH_TOKEN_KEY)
  },
  set(token) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token)
  },
  clear() {
    window.localStorage.removeItem(AUTH_TOKEN_KEY)
  },
}

export { AUTH_TOKEN_KEY }
