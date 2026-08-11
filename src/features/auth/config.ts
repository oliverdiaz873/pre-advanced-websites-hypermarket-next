/**
 * Configuración de autenticación (server-only).
 *
 * - `AUTH_COOKIE_NAME`: nombre de la cookie httpOnly emitida por el backend B1
 *   y replicada por Next. El storefront jamás debe leerla desde el cliente.
 * - `API_URL`: base del backend para llamadas server-side (RSC, Server Actions,
 *   Route Handlers). NO se expone al cliente (no es `NEXT_PUBLIC_`).
 */
export const AUTH_COOKIE_NAME = 'hypermarket_auth'

export const API_URL = (process.env.API_URL ?? 'http://localhost:3000/api').replace(/\/$/, '')

export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 // 1 día (coincide con el backend)

export const isSecureProduction = process.env.NODE_ENV === 'production'

/** URL por defecto tras iniciar sesión (o registrar). */
export const DEFAULT_AUTH_REDIRECT = '/account'