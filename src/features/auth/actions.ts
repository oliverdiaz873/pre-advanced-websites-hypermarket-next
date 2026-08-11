'use server'

import { cookies } from 'next/headers'
import { API_URL, AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME, isSecureProduction } from './config'
import { extractAuthCookieValue } from './cookie'
import { mapSessionUser } from './session-user'
import { normalizeAuthError, type AuthErrorResult } from './auth-errors'
import type { AuthUser } from './types'

export type AuthActionResult =
  | { ok: true; user: AuthUser | null }
  | ({ ok: false } & AuthErrorResult)

interface BackendResponse {
  status: number
  body: { success?: boolean; data?: unknown; code?: string; message?: string } | null
  setCookies: string[]
}

async function backendRequest(
  path: string,
  init: { method: string; body?: string; cookie?: string },
): Promise<BackendResponse> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  if (init.cookie) headers['Cookie'] = init.cookie

  const res = await fetch(`${API_URL}${path}`, {
    method: init.method,
    headers,
    body: init.body,
    cache: 'no-store',
  })

  const setCookies =
    typeof (res.headers as { getSetCookie?: () => string[] }).getSetCookie === 'function'
      ? (res.headers as { getSetCookie: () => string[] }).getSetCookie()
      : res.headers.get('set-cookie')
        ? [res.headers.get('set-cookie') as string]
        : []

  let body: BackendResponse['body'] = null
  try {
    body = (await res.json()) as BackendResponse['body']
  } catch {
    body = null
  }

  return { status: res.status, body, setCookies }
}

async function applyAuthCookie(setCookies: string[]): Promise<void> {
  const value = extractAuthCookieValue(setCookies)
  if (!value) return
  const store = await cookies()
  store.set(AUTH_COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isSecureProduction,
    path: '/',
    maxAge: AUTH_COOKIE_MAX_AGE,
  })
}

/**
 * Login server-side. La cookie `hypermarket_auth` se replica en el dominio de
 * Next con el valor del JWT que devuelve el backend, pero el JWT NUNCA se
 * serializa de vuelta al cliente: solo `{ ok, user }` (whitelist) o error.
 */
export async function loginAction(input: {
  email: string
  password: string
}): Promise<AuthActionResult> {
  if (!input.email || !input.password) {
    return { ok: false, errorKey: 'invalid_credentials' }
  }

  const { status, body, setCookies } = await backendRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: input.email, password: input.password }),
  })

  if (status !== 200) {
    return normalizeAuthError(status, body?.code)
  }

  await applyAuthCookie(setCookies)
  const user = mapSessionUser(body?.data && typeof body.data === 'object' ? (body.data as { user?: unknown }).user : undefined)
  return { ok: true, user }
}

/**
 * Registro con auto-login server-side (decisión A1): tras el 201 del backend se
 * hace login internamente y se replica la cookie. El JWT no se devuelve.
 */
export async function registerAction(input: {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}): Promise<AuthActionResult> {
  if (!input.name || !input.email || !input.password || !input.passwordConfirmation) {
    return { ok: false, errorKey: 'invalid_fields' }
  }

  const registerRes = await backendRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      password: input.password,
      passwordConfirmation: input.passwordConfirmation,
    }),
  })

  if (registerRes.status !== 201) {
    return normalizeAuthError(registerRes.status, registerRes.body?.code)
  }

  const loginRes = await backendRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: input.email, password: input.password }),
  })

  if (loginRes.status !== 200) {
    return normalizeAuthError(loginRes.status, loginRes.body?.code)
  }

  await applyAuthCookie(loginRes.setCookies)
  const user = mapSessionUser(loginRes.body?.data && typeof loginRes.body.data === 'object' ? (loginRes.body.data as { user?: unknown }).user : undefined)
  return { ok: true, user }
}

/**
 * Logout dual: se llama al backend `/auth/logout` por compatibilidad Y se borra
 * la cookie `hypermarket_auth` del dominio Next. Así funciona aunque el backend
 * sea stateless.
 */
export async function logoutAction(): Promise<{ ok: true }> {
  const store = await cookies()
  const token = store.get(AUTH_COOKIE_NAME)?.value

  if (token) {
    try {
      await backendRequest('/auth/logout', {
        method: 'POST',
        cookie: `${AUTH_COOKIE_NAME}=${token}`,
      })
    } catch {
      // Si el backend está caído, el borrado local igualmente cierra la sesión.
    }
  }

  store.delete(AUTH_COOKIE_NAME)
  return { ok: true }
}