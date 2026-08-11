import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from './config'

export interface AuthCookieOptions {
  httpOnly: true
  sameSite: 'lax'
  secure: boolean
  path: '/'
  maxAge: number
}

/**
 * Extrae el valor de `hypermarket_auth` desde los headers `Set-Cookie` que
 * devuelve el backend al hacer login. Devuelve `null` si no viene la cookie.
 *
 * Pura y probable por unit test: no toca `next/headers`.
 */
export function extractAuthCookieValue(setCookieHeaders: string[] | undefined | null): string | null {
  if (!Array.isArray(setCookieHeaders)) return null

  for (const header of setCookieHeaders) {
    if (typeof header !== 'string') continue
    const prefix = `${AUTH_COOKIE_NAME}=`
    const start = header.indexOf(prefix)
    if (start === -1) continue
    const valueStart = start + prefix.length
    const valueEnd = header.indexOf(';', valueStart)
    const value = (valueEnd === -1 ? header.slice(valueStart) : header.slice(valueStart, valueEnd)).trim()
    if (value.length > 0) return value
  }

  return null
}

/**
 * Atributos con los que Next replica la cookie de sesión en su propio dominio.
 * Solo campos que Next puede aplicar vía `cookies().set`; los atributos
 * HttpOnly/SameSite/Secure se mantienen (el JWT nunca se expone al cliente).
 */
export function authCookieOptions(secure: boolean): AuthCookieOptions {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/',
    maxAge: AUTH_COOKIE_MAX_AGE,
  }
}