import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { createAddressAction, deleteAddressAction, updateAddressAction } from './actions'
import { AUTH_COOKIE_NAME } from '../auth/config'
import * as backend from './server/address-backend'
import type { Address } from '@/types/address'

const TOKEN = 'jwt-secreto'

const address: Address = {
  id: 'addr_1', userId: 'u1', label: 'Casa', street: 'Calle 1', city: 'SD', state: 'DN', zipCode: '10101', country: 'DO', isDefault: true,
}

const mockCookie = (value: string | undefined) => ({
  get: jest.fn((name: string) => (name === AUTH_COOKIE_NAME && value ? { name, value } : undefined)),
  set: jest.fn(),
  delete: jest.fn(),
}) as unknown as ReadonlyRequestCookies

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}))

jest.mock('./server/address-backend', () => ({
  createAddressRequest: jest.fn(),
  updateAddressRequest: jest.fn(),
  deleteAddressRequest: jest.fn(),
}))

import { cookies } from 'next/headers'
const mockedCookies = cookies as jest.MockedFunction<typeof cookies>

beforeEach(() => {
  jest.clearAllMocks()
})

describe('createAddressAction', () => {
  it('sin cookie → 401 sin llamar al backend', async () => {
    mockedCookies.mockReturnValue(mockCookie(undefined) as never)
    const res = await createAddressAction({ label: 'a', street: 'b', city: 'c', state: 'd', zipCode: 'e', country: 'f' })
    expect(res).toEqual({ ok: false, status: 401 })
    expect(backend.createAddressRequest).not.toHaveBeenCalled()
  })

  it('campos obligatorios faltantes → 400 VALIDATION sin llamar al backend', async () => {
    mockedCookies.mockReturnValue(mockCookie(TOKEN) as never)
    const res = await createAddressAction({ label: 'a', street: '', city: 'c', state: 'd', zipCode: 'e', country: 'f' })
    expect(res).toEqual({ ok: false, status: 400, code: 'VALIDATION_ERROR' })
    expect(backend.createAddressRequest).not.toHaveBeenCalled()
  })

  it('con token → reenvía al backend y NO serializa el JWT', async () => {
    mockedCookies.mockReturnValue(mockCookie(TOKEN) as never)
    ;(backend.createAddressRequest as jest.MockedFunction<any>).mockResolvedValue({ ok: true, status: 201, address })
    const res = await createAddressAction({ label: 'Casa', street: 'Calle 1', city: 'SD', state: 'DN', zipCode: '10101', country: 'DO' })
    expect(backend.createAddressRequest).toHaveBeenCalledWith(TOKEN, expect.objectContaining({ label: 'Casa' }))
    expect(JSON.stringify(res)).not.toContain(TOKEN)
    expect(res.ok).toBe(true)
  })
})

describe('updateAddressAction', () => {
  it('sin id → 400 VALIDATION', async () => {
    mockedCookies.mockReturnValue(mockCookie(TOKEN) as never)
    const res = await updateAddressAction('', { isDefault: true })
    expect(res).toEqual({ ok: false, status: 400, code: 'VALIDATION_ERROR' })
  })

  it('con token e id → PATCH parcial al backend', async () => {
    mockedCookies.mockReturnValue(mockCookie(TOKEN) as never)
    ;(backend.updateAddressRequest as jest.MockedFunction<any>).mockResolvedValue({ ok: true, status: 200, address })
    const res = await updateAddressAction('addr_1', { isDefault: false })
    expect(backend.updateAddressRequest).toHaveBeenCalledWith(TOKEN, 'addr_1', { isDefault: false })
    expect(res.ok).toBe(true)
  })
})

describe('deleteAddressAction', () => {
  it('con token e id → DELETE al backend', async () => {
    mockedCookies.mockReturnValue(mockCookie(TOKEN) as never)
    ;(backend.deleteAddressRequest as jest.MockedFunction<any>).mockResolvedValue({ ok: true, status: 204 })
    const res = await deleteAddressAction('addr_1')
    expect(backend.deleteAddressRequest).toHaveBeenCalledWith(TOKEN, 'addr_1')
    expect(res).toEqual({ ok: true, status: 204 })
  })

  it('sin cookie → 401', async () => {
    mockedCookies.mockReturnValue(mockCookie(undefined) as never)
    const res = await deleteAddressAction('addr_1')
    expect(res).toEqual({ ok: false, status: 401 })
  })
})
