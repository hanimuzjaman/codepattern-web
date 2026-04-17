import { httpClient } from './httpClient'

export const aiMentorService = {
  async getHint(payload) {
    const response = await httpClient.post('/ai/hint', payload)
    return response.data
  },

  async explain(payload) {
    const response = await httpClient.post('/ai/explain', payload)
    return response.data
  },

  async analyze(payload) {
    const response = await httpClient.post('/ai/analyze', payload)
    return response.data
  },

  async getMistakes(payload) {
    const response = await httpClient.post('/ai/mistakes', payload)
    return response.data
  },

  async review(payload) {
    const response = await httpClient.post('/ai/review', payload)
    return response.data
  },
}
