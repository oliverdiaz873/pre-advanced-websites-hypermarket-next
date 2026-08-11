import { afterEach, describe, expect, it, jest } from '@jest/globals'
import { cookies } from 'next/headers'
import { fetchSessionUser, getSession } from './session'

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}))

const mockedCookies = cookies as unknown as {
  mockResolvedValueOnce: (v: unknown) => void
  mockReset: () => void
}

function storeWith(value: string | null) {
  return {
    get: (name: string) => (value ? { name, value } : undefined),
  }
}

function fakeFetch(ok: boolean, status: number, body: unknown): typeof fetch {
  return (async () =>
    ({
      ok,
      status,
      json: async () => body,
    }) as Response) as unknown as typeof fetch
}

const realFetch = globalThis.fetch

afterEach(() => {
  globalThis.fetch = realFetch
  mockedCookies.mockReset()
})

describe('fetchSessionUser', () => {
  it('200 → mapea el usuario a solo campos públicos (JWT excluido)', async () => {
    const fetcher = fakeFetch(true, 200, {
      success: true,
      data: { id: 'u1', name: 'Ana', email: 'ana@x.dev', role: 'customer', token: 'jwt-secreto', passwordHash: 'x' },
    })
    const user = await fetchSessionUser('tok', fetcher)
    expect(user).toEqual({ id: 'u1', name: 'Ana', email: 'ana@x.dev', role: 'customer' })
    expect(JSON.stringify(user)).not.toContain('jwt-secreto')
  })

  it('401 → null', async () => {
    const fetcher = fakeFetch(false, 401, { success: false, statusCode: 401 })
    expect(await fetchSessionUser('tok', fetcher)).toBeNull()
  })

  it('backend caído (fetch rechazada) → null', async () => {
    const fetcher = (async () => {
      throw new Error('ECONNREFUSED')
    }) as unknown as typeof fetch
    expect(await fetchSessionUser('tok', fetcher)).toBeNull()
  })

  it('cuerpo sin data → null', async () => {
    const fetcher = fakeFetch(true, 200, { success: true, data: null })
    expect(await fetchSessionUser('tok', fetcher)).toBeNull()
  })
})

describe('getSession (RSC lee hypermarket_auth y la reenvía)', () => {
  it('sin cookie → null sin llamar al backend', async () => {
    const fetchSpy = jest.fn()
    globalThis.fetch = fetchSpy as unknown as typeof fetch
    mockedCookies.mockResolvedValueOnce(storeWith(null))

    expect(await getSession()).toBeNull()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('cookie válida + /auth/me 200 → usuario whitelisted', async () => {
    globalThis.fetch = fakeFetch(true, 200, {
      success: true,
      data: { id: 'u2', name: 'Luis', email: 'luis@x.dev', role: 'admin', token: 'jwt' },
    })
    mockedCookies.mockResolvedValueOnce(storeWith('tok'))

    const user = await getSession()
    expect(user).toEqual({ id: 'u2', name: 'Luis', email: 'luis@x.dev', role: 'admin' })
    expect(JSON.stringify(user)).not.toContain('jwt')
  })

  it('cookie presente pero backend devuelve 401 → null', async () => {
    globalThis.fetch = fakeFetch(false, 401, { success: false, statusCode: 401 })
    mockedCookies.mockResolvedValueOnce(storeWith('tok'))

    expect(await getSession()).toBeNull()
  })

  it('cookie presente pero backend caído → null', async () => {
    globalThis.fetch = (async () => {
      throw new Error('down')
    }) as unknown as typeof fetch
    mockedCookies.mockResolvedValueOnce(storeWith('tok'))

    expect(await getSession()).toBeNull()
  })
})