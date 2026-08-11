import type { AuthUser } from './types'

/**
 * Whitelist del payload de usuario devuelto por el backend (`/auth/me`,
 * `/auth/login`, `/auth/register`).
 *
 * N1: el storefront NUNCA propaga el JWT al cliente; solo serializa los campos
 * públicos de `AuthUser`. Cualquier campo extra que el backend envíe (token,
 * hash, fechas, etc.) queda fuera del modelo.
 */
export function mapSessionUser(payload: unknown): AuthUser | null {
  if (!payload || typeof payload !== 'object') return null

  const p = payload as Record<string, unknown>
  const id = p.id
  if (typeof id !== 'string' || id.length === 0) return null

  return {
    id,
    name: typeof p.name === 'string' ? p.name : '',
    email: typeof p.email === 'string' ? p.email : '',
    role: typeof p.role === 'string' ? p.role : 'customer',
  }
}