import axios from 'axios'
import { tokenStorage } from '../utils/tokenStorage'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

let onUnauthorized = null

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.request.use((config) => {
  const token = tokenStorage.get()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Unexpected error'

    if (status === 401 && typeof onUnauthorized === 'function') {
      onUnauthorized()
    }

    return Promise.reject({
      status: status || 0,
      message,
      isNetworkError: !error.response,
      raw: error,
    })
  },
)

export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler
}
