import { httpClient } from './httpClient'

export const authService = {
  async register(payload) {
    const response = await httpClient.post('/auth/register', payload)
    return response.data
  },

  async login(payload) {
    const response = await httpClient.post('/auth/login', payload)
    return response.data
  },

  async me() {
    const response = await httpClient.get('/auth/me')
    return response.data
  },
}
