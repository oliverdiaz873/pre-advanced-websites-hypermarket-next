import { cookies } from 'next/headers'
import { API_URL, AUTH_COOKIE_NAME } from './config'
import { mapSessionUser } from './session-user'
import type { AuthUser } from './types'

/**
 * Llama a `GET /auth/me` del backend reenviando la cookie `hypermarket_auth`.
 * Devuelve el usuario whitelisted o `null` (401, backend caído o cuerpo inválido).
 *
 * `fetcher` es inyectable para los unit tests (por defecto usa `fetch` global).
 */
export async function fetchSessionUser(
  cookieValue: string,
  fetcher: typeof fetch = fetch,
): Promise<AuthUser | null> {
  try {
    const res = await fetcher(`${API_URL}/auth/me`, {
      headers: {
        Accept: 'application/json',
        Cookie: `${AUTH_COOKIE_NAME}=${cookieValue}`,
      },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const body = (await res.json()) as { success?: boolean; data?: unknown }
    return mapSessionUser(body?.data)
  } catch {
    return null
  }
}

/**
 * Lee la cookie `hypermarket_auth` de la petición (RSC / Route Handler) y la
 * reenvía al backend. `null` si no hay cookie o la sesión no es válida.
 *
 * Diseñada para ejecutarse SOLO en el servidor; el root layout NO la usa para
 * preservar el catálogo estático.
 */
export async function getSession(): Promise<AuthUser | null> {
  const store = await cookies()
  const token = store.get(AUTH_COOKIE_NAME)?.value
  if (!token) return null
  return fetchSessionUser(token)
}