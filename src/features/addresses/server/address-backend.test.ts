import { afterEach, describe, expect, it } from '@jest/globals'
import { AUTH_COOKIE_NAME, API_URL } from '../../auth/config'
import {
  createAddressRequest,
  deleteAddressRequest,
  getAddressesRequest,
  getAddressRequest,
  updateAddressRequest,
  type AddressBackendResponse,
} from './address-backend'
import type { Address } from '@/types/address'

const TOKEN = 'jwt-secreto'

const address: Address = {
  id: 'addr_1',
  userId: 'user_1',
  label: 'Casa',
  street: 'Calle 1',
  city: 'Santo Domingo',
  state: 'DN',
  zipCode: '10101',
  country: 'DO',
  isDefault: true,
}

function fakeFetch(ok: boolean, status: number, body: unknown): typeof fetch {
  return (async (_input: RequestInfo | URL, init?: RequestInit) => {
    return {
      url: String(_input),
      method: init?.method ?? 'GET',
      headers: init?.headers,
      body: init?.body as string | undefined,
      ok,
      status,
      json: async () => body,
    } as unknown as Response
  }) as unknown as typeof fetch
}

const realFetch = globalThis.fetch

afterEach(() => {
  globalThis.fetch = realFetch
})

describe('getAddressesRequest', () => {
  it('GET /api/addresses con la cookie reenviada (JWT nunca en el cuerpo)', async () => {
    let seen: { url: string; headers?: HeadersInit; body?: string } | undefined
    const fetcher = (async (input: RequestInfo | URL, init?: RequestInit) => {
      seen = { url: String(input), headers: init?.headers, body: init?.body as string | undefined }
      return { ok: true, status: 200, json: async () => ({ success: true, data: [address] }) } as unknown as Response
    }) as unknown as typeof fetch

    const res = await getAddressesRequest(TOKEN, fetcher)

    expect(seen?.url).toBe(`${API_URL}/addresses`)
    expect(seen?.headers).toMatchObject({ Cookie: `${AUTH_COOKIE_NAME}=${TOKEN}` })
    expect(res).toEqual({ ok: true, status: 200, addresses: [address] })
    expect(JSON.stringify(seen?.body ?? '')).not.toContain(TOKEN)
  })

  it('401 → no autenticado sin direcciones', async () => {
    const res = await getAddressesRequest(TOKEN, fakeFetch(false, 401, { success: false, statusCode: 401 }))
    expect(res).toEqual({ ok: false, status: 401 })
  })

  it('backend caído (fetch rechazada) → status 0 sin lanzar', async () => {
    const fetcher = (async () => {
      throw new Error('ECONNREFUSED')
    }) as unknown as typeof fetch
    await expect(getAddressesRequest(TOKEN, fetcher)).resolves.toEqual({ ok: false, status: 0 })
  })

  it('respuesta ok sin array → lista vacía (nunca null)', async () => {
    const res = await getAddressesRequest(TOKEN, fakeFetch(true, 200, { success: true, data: null }))
    expect(res).toEqual({ ok: true, status: 200, addresses: [] })
  })
})

describe('createAddressRequest', () => {
  it('POST /api/addresses con el payload E3 completo', async () => {
    let sent!: { url: string; method?: string; body?: string }
    const fetcher = (async (_i: RequestInfo | URL, init?: RequestInit) => {
      sent = { url: String(_i), method: init?.method, body: init?.body as string | undefined }
      return { ok: true, status: 201, json: async () => ({ success: true, data: address }) } as unknown as Response
    }) as unknown as typeof fetch

    const res = await createAddressRequest(TOKEN, {
      label: 'Casa',
      street: 'Calle 1',
      city: 'Santo Domingo',
      state: 'DN',
      zipCode: '10101',
      country: 'DO',
    }, fetcher)

    expect(sent.method).toBe('POST')
    expect(sent.url).toBe(`${API_URL}/addresses`)
    expect(JSON.parse(sent.body!)).toMatchObject({
      label: 'Casa', street: 'Calle 1', city: 'Santo Domingo', state: 'DN', zipCode: '10101', country: 'DO',
    })
    expect(res).toEqual({ ok: true, status: 201, address })
  })

  it('400 VALIDATION → ok false con code', async () => {
    const res = await createAddressRequest(TOKEN, {
      label: 'Casa', street: 'x', city: 'x', state: 'x', zipCode: 'x', country: 'x',
    }, fakeFetch(false, 400, { success: false, statusCode: 400, code: 'VALIDATION_ERROR', message: 'Invalid data' }))
    expect(res).toEqual({ ok: false, status: 400, code: 'VALIDATION_ERROR', message: 'Invalid data' } satisfies AddressBackendResponse)
  })
})

describe('updateAddressRequest', () => {
  it('PATCH /api/addresses/:id encodea el id y manda el body parcial', async () => {
    let sent!: { url: string; method?: string; body?: string }
    const fetcher = (async (_i: RequestInfo | URL, init?: RequestInit) => {
      sent = { url: String(_i), method: init?.method, body: init?.body as string | undefined }
      return { ok: true, status: 200, json: async () => ({ success: true, data: address }) } as unknown as Response
    }) as unknown as typeof fetch

    await updateAddressRequest(TOKEN, 'addr_á', { isDefault: true }, fetcher)

    expect(sent.method).toBe('PATCH')
    expect(sent.url).toBe(`${API_URL}/addresses/addr_%C3%A1`)
    expect(JSON.parse(sent.body!)).toEqual({ isDefault: true })
  })
})

describe('deleteAddressRequest', () => {
  it('DELETE 204 → ok sin cuerpo', async () => {
    const res = await deleteAddressRequest(TOKEN, 'addr_1', fakeFetch(true, 204, null))
    expect(res).toEqual({ ok: true, status: 204 })
  })

  it('DELETE de dirección ajena → 404 ok false', async () => {
    const res = await deleteAddressRequest(TOKEN, 'addr_2', fakeFetch(false, 404, { success: false, statusCode: 404, code: 'NOT_FOUND' }))
    expect(res).toEqual({ ok: false, status: 404, code: 'NOT_FOUND' })
  })
})

describe('getAddressRequest', () => {
  it('GET /api/addresses/:id → dirección del owner', async () => {
    const res = await getAddressRequest(TOKEN, 'addr_1', fakeFetch(true, 200, { success: true, data: address }))
    expect(res).toEqual({ ok: true, status: 200, address })
  })

  it('404 → ok false', async () => {
    const res = await getAddressRequest(TOKEN, 'no_existe', fakeFetch(false, 404, { success: false, statusCode: 404, code: 'NOT_FOUND' }))
    expect(res.ok).toBe(false)
    expect(res.status).toBe(404)
  })
})
