import { describe, expect, it } from '@jest/globals'
import { isSafeReturnUrl, safeReturnUrl } from './safe-url'

describe('isSafeReturnUrl', () => {
  it('acepta rutas internas relativas', () => {
    expect(isSafeReturnUrl('/account')).toBe(true)
    expect(isSafeReturnUrl('/en/account')).toBe(true)
    expect(isSafeReturnUrl('/')).toBe(true)
  })

  it('rechaza URLs absolutas (open redirect)', () => {
    expect(isSafeReturnUrl('https://evil.com')).toBe(false)
    expect(isSafeReturnUrl('http://evil.com/path')).toBe(false)
  })

  it('rechaza protocol-relative //evil.com', () => {
    expect(isSafeReturnUrl('//evil.com')).toBe(false)
  })

  it('rechaza protocol-relative con backslash /\\evil.com', () => {
    expect(isSafeReturnUrl('/\\evil.com')).toBe(false)
  })

  it('rechaza vacío, nulo o rutas sin slash inicial', () => {
    expect(isSafeReturnUrl('')).toBe(false)
    expect(isSafeReturnUrl(undefined)).toBe(false)
    expect(isSafeReturnUrl(null)).toBe(false)
    expect(isSafeReturnUrl('account')).toBe(false)
  })
})

describe('safeReturnUrl', () => {
  it('usa el returnUrl seguro', () => {
    expect(safeReturnUrl('/account', '/fallback')).toBe('/account')
  })

  it('usa el fallback cuando el returnUrl es peligroso', () => {
    expect(safeReturnUrl('https://evil.com', '/fallback')).toBe('/fallback')
    expect(safeReturnUrl('//evil.com', '/fallback')).toBe('/fallback')
    expect(safeReturnUrl(undefined, '/fallback')).toBe('/fallback')
  })
})