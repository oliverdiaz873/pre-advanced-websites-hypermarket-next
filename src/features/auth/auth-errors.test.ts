import { describe, expect, it } from '@jest/globals'
import { normalizeAuthError } from './auth-errors'

describe('normalizeAuthError (códigos B1 → claves i18n)', () => {
  it('429 / RATE_LIMITED → rate_limited', () => {
    expect(normalizeAuthError(429, 'RATE_LIMITED').errorKey).toBe('rate_limited')
    expect(normalizeAuthError(429).errorKey).toBe('rate_limited')
  })

  it('409 / CONFLICT → email_in_use', () => {
    expect(normalizeAuthError(409, 'CONFLICT').errorKey).toBe('email_in_use')
  })

  it('401 / UNAUTHORIZED → invalid_credentials', () => {
    expect(normalizeAuthError(401, 'UNAUTHORIZED').errorKey).toBe('invalid_credentials')
    expect(normalizeAuthError(401).errorKey).toBe('invalid_credentials')
  })

  it('400 / VALIDATION_ERROR → invalid_fields', () => {
    expect(normalizeAuthError(400, 'VALIDATION_ERROR').errorKey).toBe('invalid_fields')
  })

  it('404 / NOT_FOUND → not_found', () => {
    expect(normalizeAuthError(404, 'NOT_FOUND').errorKey).toBe('not_found')
  })

  it('desconocido/5xx → internal', () => {
    expect(normalizeAuthError(500, 'INTERNAL_ERROR').errorKey).toBe('internal')
    expect(normalizeAuthError(503).errorKey).toBe('internal')
    expect(normalizeAuthError(418).errorKey).toBe('internal')
  })

  it('siempre devuelve ok=false', () => {
    expect(normalizeAuthError(500).ok).toBe(false)
  })
})