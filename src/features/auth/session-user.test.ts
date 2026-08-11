import { describe, expect, it } from '@jest/globals'
import { mapSessionUser } from './session-user'

describe('mapSessionUser (whitelist)', () => {
  it('mapea solo los campos públicos del usuario', () => {
    const api = {
      _id: '66x',
      id: '66x',
      name: 'Ana Pérez',
      email: 'ana@test.dev',
      role: 'customer',
      // campos que NUNCA deben propagarse al cliente:
      token: 'jwt-secreto',
      passwordHash: '$2b$10$abc',
      createdAt: '2026-01-01',
      __v: 0,
    }
    const user = mapSessionUser(api)
    expect(user).toEqual({ id: '66x', name: 'Ana Pérez', email: 'ana@test.dev', role: 'customer' })
    expect(JSON.stringify(user)).not.toContain('jwt-secreto')
    expect(JSON.stringify(user)).not.toContain('passwordHash')
  })

  it('devuelve null con payload no-objeto', () => {
    expect(mapSessionUser(null)).toBeNull()
    expect(mapSessionUser(undefined)).toBeNull()
    expect(mapSessionUser('x')).toBeNull()
    expect(mapSessionUser(42)).toBeNull()
  })

  it('devuelve null si falta el id', () => {
    expect(mapSessionUser({ name: 'Sin id' })).toBeNull()
    expect(mapSessionUser({ id: 5 })).toBeNull()
  })

  it('rellena campos opcionales ausentes con vacío/role por defecto', () => {
    expect(mapSessionUser({ id: '1' })).toEqual({ id: '1', name: '', email: '', role: 'customer' })
  })
})