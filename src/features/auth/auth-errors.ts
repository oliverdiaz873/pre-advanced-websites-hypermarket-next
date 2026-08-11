export type AuthErrorKey =
  | 'invalid_credentials'
  | 'invalid_fields'
  | 'email_in_use'
  | 'rate_limited'
  | 'not_found'
  | 'internal'

export interface AuthErrorResult {
  ok: false
  errorKey: AuthErrorKey
}

/**
 * Normaliza la respuesta de error del backend (B1):
 * `{ success: false, statusCode, code, message }` → clave i18n `auth.errors.*`.
 * Por status/`code`: RATE_LIMITED/429, CONFLICT/409, UNAUTHORIZED/401,
 * VALIDATION_ERROR/400, NOT_FOUND/404; resto → internal.
 */
export function normalizeAuthError(status: number, code?: string | null): AuthErrorResult {
  let key: AuthErrorKey = 'internal'

  if (status === 429 || code === 'RATE_LIMITED') key = 'rate_limited'
  else if (status === 409 || code === 'CONFLICT') key = 'email_in_use'
  else if (status === 401 || code === 'UNAUTHORIZED') key = 'invalid_credentials'
  else if (status === 400 || code === 'VALIDATION_ERROR') key = 'invalid_fields'
  else if (status === 404 || code === 'NOT_FOUND') key = 'not_found'

  return { ok: false, errorKey: key }
}