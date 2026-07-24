import { GATEWAY_URL } from './constants'

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('gk_token')
}

export const setToken = (token: string): void => {
  localStorage.setItem('gk_token', token)
}

export const removeToken = (): void => {
  localStorage.removeItem('gk_token')
}

export const getUser = () => {
  const token = getToken()
  if (!token) return null
  try {
    // atop() decodes the base64 encoded string, and JSON.parse converts it to an object
    const payload = JSON.parse(atob(token.split('.')[1]))
    // JWT stores expiration (exp) in seconds.
    if (payload.exp * 1000 < Date.now()) {
      removeToken()
      return null
    }
    return payload
  } catch {
    return null
  }
}

export const isAuthenticated = (): boolean => {
  return getUser() !== null
}

export const logout = (): void => {
  removeToken()
  window.location.href = '/login'
}

export const apiRequest = async (
  path: string,
  options: RequestInit = {}
) => {
  const token = getToken()
  const res = await fetch(`${GATEWAY_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  })
  return res
}