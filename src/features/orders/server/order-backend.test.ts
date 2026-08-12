import { afterEach, describe, expect, it } from '@jest/globals'
import { AUTH_COOKIE_NAME, API_URL } from '../../auth/config'
import {
  cancelOrderRequest,
  createOrderRequest,
  getOrderRequest,
  getOrdersRequest,
  payOrderRequest,
  type OrderBackendResponse,
} from './order-backend'
import type { Order } from '@/types/order'

const TOKEN = 'jwt-secreto'

const order: Order = {
  id: 'order_1',
  userId: 'user_1',
  orderNumber: 'HM-20260811-ABC123',
  idempotencyKey: 'key-1',
  items: [{ productId: 'p1', name: 'Arroz', price: 100, image: 'x', quantity: 2 }],
  shippingAddress: { street: 'Calle 1', city: 'Santo Domingo', state: 'DN', zipCode: '10101', country: 'DO' },
  totalItems: 2,
  subtotal: 200,
  status: 'pending',
  paymentStatus: 'pending',
  statusHistory: [{ status: 'pending', changedAt: new Date().toISOString() }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
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

describe('createOrderRequest (checkout E3)', () => {
  it('POST /api/orders con { addressId, idempotencyKey } y cookie reenviada', async () => {
    let seen: { url: string; headers?: HeadersInit; body?: string } | undefined
    const fetcher = (async (input: RequestInfo | URL, init?: RequestInit) => {
      seen = { url: String(input), headers: init?.headers, body: init?.body as string | undefined }
      return { ok: true, status: 201, json: async () => ({ success: true, data: order }) } as unknown as Response
    }) as unknown as typeof fetch

    const res = await createOrderRequest(TOKEN, { addressId: 'addr_1', idempotencyKey: 'key-1' }, fetcher)

    expect(seen?.url).toBe(`${API_URL}/orders`)
    expect(seen?.headers).toMatchObject({ Cookie: `${AUTH_COOKIE_NAME}=${TOKEN}` })
    expect(seen && JSON.parse(seen.body ?? '')).toEqual({ addressId: 'addr_1', idempotencyKey: 'key-1' })
    expect(JSON.stringify(seen?.body)).not.toContain(TOKEN)
    expect(res).toEqual({ ok: true, status: 201, order })
  })

  it('IDEMPOTENCIA: misma key devuelve la misma orden (no duplica)', async () => {
    const fetcher = fakeFetch(true, 201, { success: true, data: order })
    const first = await createOrderRequest(TOKEN, { addressId: 'addr_1', idempotencyKey: 'key-1' }, fetcher)
    const second = await createOrderRequest(TOKEN, { addressId: 'addr_1', idempotencyKey: 'key-1' }, fetcher)
    expect(first.ok && second.ok && first.order.id === second.order.id).toBe(true)
  })

  it('409 stock insuficiente (all-or-nothing) → ok false con code CONFLICT', async () => {
    const res = await createOrderRequest(TOKEN, { addressId: 'addr_1', idempotencyKey: 'key-2' },
      fakeFetch(false, 409, { success: false, statusCode: 409, code: 'CONFLICT', message: 'Insufficient stock' }))
    expect(res).toEqual({ ok: false, status: 409, code: 'CONFLICT', message: 'Insufficient stock' } satisfies OrderBackendResponse)
  })

  it('400 carrito vacío → ok false sin orden', async () => {
    const res = await createOrderRequest(TOKEN, { addressId: 'addr_1', idempotencyKey: 'key-3' },
      fakeFetch(false, 400, { success: false, statusCode: 400, code: 'VALIDATION_ERROR', message: 'Cart is empty' }))
    expect(res).toEqual({ ok: false, status: 400, code: 'VALIDATION_ERROR', message: 'Cart is empty' })
  })

  it('backend caído → status 0 sin lanzar', async () => {
    const fetcher = (async () => { throw new Error('ECONNREFUSED') }) as unknown as typeof fetch
    await expect(createOrderRequest(TOKEN, { addressId: 'a', idempotencyKey: 'k' }, fetcher)).resolves.toEqual({ ok: false, status: 0 })
  })
})

describe('getOrdersRequest / getOrderRequest', () => {
  it('GET /api/orders → lista plana (sin paginar)', async () => {
    const res = await getOrdersRequest(TOKEN, fakeFetch(true, 200, { success: true, data: [order] }))
    expect(res).toEqual({ ok: true, status: 200, orders: [order] })
  })

  it('GET /api/orders 401 → ok false', async () => {
    const res = await getOrdersRequest(TOKEN, fakeFetch(false, 401, { success: false, statusCode: 401 }))
    expect(res).toEqual({ ok: false, status: 401 })
  })

  it('GET /api/orders/:id → orden del owner; 404 → ok false', async () => {
    const okRes = await getOrderRequest(TOKEN, 'order_1', fakeFetch(true, 200, { success: true, data: order }))
    expect(okRes).toEqual({ ok: true, status: 200, order })
    const notFound = await getOrderRequest(TOKEN, 'order_x', fakeFetch(false, 404, { success: false, statusCode: 404, code: 'NOT_FOUND' }))
    expect(notFound.ok).toBe(false)
    expect(notFound.status).toBe(404)
  })
})

describe('payOrderRequest (pay stub E3)', () => {
  const paidOrder: Order = { ...order, paymentStatus: 'paid' }

  it('POST /api/orders/:id/pay → pending → paid', async () => {
    let sent!: { url: string; method?: string }
    const fetcher = (async (_i: RequestInfo | URL, init?: RequestInit) => {
      sent = { url: String(_i), method: init?.method }
      return { ok: true, status: 200, json: async () => ({ success: true, data: paidOrder }) } as unknown as Response
    }) as unknown as typeof fetch

    const res = await payOrderRequest(TOKEN, 'order_1', fetcher)
    expect(sent.method).toBe('POST')
    expect(sent.url).toBe(`${API_URL}/orders/order_1/pay`)
    expect(res).toEqual({ ok: true, status: 200, order: paidOrder })
  })

  it('pagar una orden YA pagada → 400 (pay una sola vez)', async () => {
    const res = await payOrderRequest(TOKEN, 'order_1',
      fakeFetch(false, 400, { success: false, statusCode: 400, code: 'VALIDATION_ERROR', message: 'Cannot pay order from payment status paid' }))
    expect(res).toEqual({ ok: false, status: 400, code: 'VALIDATION_ERROR', message: 'Cannot pay order from payment status paid' })
  })
})

describe('cancelOrderRequest (customer)', () => {
  const cancelledRefunded: Order = { ...order, status: 'cancelled', paymentStatus: 'refunded' }

  it('PATCH status cancelled; paid → refunded', async () => {
    let sent!: { url: string; body?: string }
    const fetcher = (async (_i: RequestInfo | URL, init?: RequestInit) => {
      sent = { url: String(_i), body: init?.body as string | undefined }
      return { ok: true, status: 200, json: async () => ({ success: true, data: cancelledRefunded }) } as unknown as Response
    }) as unknown as typeof fetch

    const res = await cancelOrderRequest(TOKEN, 'order_1', fetcher)
    expect(sent.url).toBe(`${API_URL}/orders/order_1/status`)
    expect(JSON.parse(sent.body!)).toEqual({ status: 'cancelled' })
    expect(res).toEqual({ ok: true, status: 200, order: cancelledRefunded })
    expect(res.ok && res.order.paymentStatus).toBe('refunded')
  })

  it('cancelar una orden en estado no permitido → 400', async () => {
    const res = await cancelOrderRequest(TOKEN, 'order_1',
      fakeFetch(false, 400, { success: false, statusCode: 400, code: 'VALIDATION_ERROR', message: 'Invalid status transition' }))
    expect(res.ok).toBe(false)
    expect(res.status).toBe(400)
  })
})
