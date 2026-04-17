export function getUserFacingError(error, fallbackMessage) {
  if (!error) {
    return fallbackMessage
  }

  const status = error?.status
  const message = error?.message

  if (status === 401) {
    return 'Invalid email or password.'
  }

  if (status === 409) {
    return message || 'This account already exists.'
  }

  if (status === 400) {
    return message || 'Please check your input and try again.'
  }

  if (status === 429) {
    return 'AI usage limit reached temporarily. Please wait and retry.'
  }

  if (status === 503) {
    return 'AI provider is currently unavailable. Please retry in a moment.'
  }

  if (status === 504) {
    return 'AI request timed out. Try a shorter prompt or retry.'
  }

  if (status >= 500) {
    return 'Server is temporarily unavailable. Please try again shortly.'
  }

  if (error?.isNetworkError) {
    return 'Network error. Please check your connection and try again.'
  }

  return message || fallbackMessage
}
