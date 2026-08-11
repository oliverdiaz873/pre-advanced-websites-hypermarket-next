import { describe, expect, it } from '@jest/globals'
import { authCookieOptions, extractAuthCookieValue } from './cookie'

describe('extractAuthCookieValue', () => {
  it('extrae el valor de hypermarket_auth de un Set-Cookie del backend', () => {
    const headers = ['hypermarket_auth=jwt.abc.def; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400']
    expect(extractAuthCookieValue(headers)).toBe('jwt.abc.def')
  })

  it('encuentra la cookie aunque vengan otros Set-Cookie antes', () => {
    const headers = [
      'language=es; Path=/',
      'hypermarket_auth=TOKEN_123; Path=/; HttpOnly',
      'session=x; Path=/',
    ]
    expect(extractAuthCookieValue(headers)).toBe('TOKEN_123')
  })

  it('devuelve null si no viene la cookie de sesión', () => {
    expect(extractAuthCookieValue([])).toBeNull()
    expect(extractAuthCookieValue(['language=es; Path=/'])).toBeNull()
    expect(extractAuthCookieValue(null)).toBeNull()
    expect(extractAuthCookieValue(undefined)).toBeNull()
  })

  it('trata el valor vacío como ausente', () => {
    expect(extractAuthCookieValue(['hypermarket_auth=; Path=/'])).toBeNull()
  })
})

describe('authCookieOptions · replicación sin exponer el JWT al cliente', () => {
  it('impone httpOnly=true para que el JWT nunca sea legible por JS', () => {
    expect(authCookieOptions(false).httpOnly).toBe(true)
    expect(authCookieOptions(true).httpOnly).toBe(true)
  })

  it('conserva los atributos necesarios (path /, SameSite Lax, maxAge 1d)', () => {
    const opts = authCookieOptions(false)
    expect(opts.path).toBe('/')
    expect(opts.sameSite).toBe('lax')
    expect(opts.maxAge).toBe(86400)
  })

  it('marca secure solo en producción', () => {
    expect(authCookieOptions(true).secure).toBe(true)
    expect(authCookieOptions(false).secure).toBe(false)
  })
})