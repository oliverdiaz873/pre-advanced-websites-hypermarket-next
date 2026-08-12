import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { cancelOrderAction, createOrderAction, payOrderAction } from './actions'
import { AUTH_COOKIE_NAME } from '../auth/config'
import * as backend from './server/order-backend'
import { revalidatePath } from 'next/cache'
import type { Order } from '@/types/order'

const TOKEN = 'jwt-secreto'

const order: Order = {
  id: 'order_1', userId: 'u1', orderNumber: 'HM-20260811-ABC', items: [], shippingAddress: {},
  totalItems: 0, subtotal: 0, status: 'pending', paymentStatus: 'pending', statusHistory: [],
  createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
}

const mockCookie = (value: string | undefined) => ({
  get: jest.fn((name: string) => (name === AUTH_COOKIE_NAME && value ? { name, value } : undefined)),
  set: jest.fn(),
  delete: jest.fn(),
}) as unknown as ReadonlyRequestCookies

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}))

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}))

jest.mock('./server/order-backend', () => ({
  createOrderRequest: jest.fn(),
  payOrderRequest: jest.fn(),
  cancelOrderRequest: jest.fn(),
}))

import { cookies } from 'next/headers'
const mockedCookies = cookies as jest.MockedFunction<typeof cookies>
const mockRevalidate = revalidatePath as jest.MockedFunction<typeof revalidatePath>

beforeEach(() => {
  jest.clearAllMocks()
})

describe('createOrderAction (idempotencia E3)', () => {
  it('sin idempotencyKey → 400 VALIDATION sin llamar al backend', async () => {
    mockedCookies.mockReturnValue(mockCookie(TOKEN) as never)
    const res = await createOrderAction({ addressId: 'addr_1', idempotencyKey: '' })
    expect(res).toEqual({ ok: false, status: 400, code: 'VALIDATION_ERROR' })
    expect(backend.createOrderRequest).not.toHaveBeenCalled()
  })

  it('sin cookie → 401', async () => {
    mockedCookies.mockReturnValue(mockCookie(undefined) as never)
    const res = await createOrderAction({ addressId: 'a', idempotencyKey: 'k' })
    expect(res).toEqual({ ok: false, status: 401 })
    expect(backend.createOrderRequest).not.toHaveBeenCalled()
  })

  it('reutiliza la key recibida (nunca la regenera) y no serializa el JWT', async () => {
    mockedCookies.mockReturnValue(mockCookie(TOKEN) as never)
    ;(backend.createOrderRequest as jest.Mock).mockResolvedValue({ ok: true, status: 201, order })
    const res = await createOrderAction({ addressId: 'addr_1', idempotencyKey: 'key-abc' })
    expect(backend.createOrderRequest).toHaveBeenCalledWith(TOKEN, { addressId: 'addr_1', idempotencyKey: 'key-abc' })
    expect(JSON.stringify(res)).not.toContain(TOKEN)
    expect(res.ok).toBe(true)
  })

  it('409 stock → ok false CONFLICT y SIN revalidate (no hubo orden)', async () => {
    mockedCookies.mockReturnValue(mockCookie(TOKEN) as never)
    ;(backend.createOrderRequest as jest.Mock).mockResolvedValue({ ok: false, status: 409, code: 'CONFLICT', message: 'Insufficient stock' })
    const res = await createOrderAction({ addressId: 'a', idempotencyKey: 'k' })
    expect(res).toEqual({ ok: false, status: 409, code: 'CONFLICT', message: 'Insufficient stock' })
    expect(mockRevalidate).not.toHaveBeenCalled()
  })

  it('éxito → revalida /cart, /orders y /checkout (carrito se vacía server-side)', async () => {
    mockedCookies.mockReturnValue(mockCookie(TOKEN) as never)
    ;(backend.createOrderRequest as jest.Mock).mockResolvedValue({ ok: true, status: 201, order })
    await createOrderAction({ addressId: 'a', idempotencyKey: 'k' })
    expect(mockRevalidate).toHaveBeenCalledWith('/cart')
    expect(mockRevalidate).toHaveBeenCalledWith('/orders')
    expect(mockRevalidate).toHaveBeenCalledWith('/checkout')
  })
})

describe('payOrderAction / cancelOrderAction', () => {
  it('pay → revalida /orders/:id y /orders', async () => {
    mockedCookies.mockReturnValue(mockCookie(TOKEN) as never)
    ;(backend.payOrderRequest as jest.Mock).mockResolvedValue({ ok: true, status: 200, order: { ...order, paymentStatus: 'paid' } })
    await payOrderAction('order_1')
    expect(backend.payOrderRequest).toHaveBeenCalledWith(TOKEN, 'order_1')
    expect(mockRevalidate).toHaveBeenCalledWith('/orders/order_1')
    expect(mockRevalidate).toHaveBeenCalledWith('/orders')
  })

  it('pay ya pagada (400) → error y sin revalidate', async () => {
    mockedCookies.mockReturnValue(mockCookie(TOKEN) as never)
    ;(backend.payOrderRequest as jest.Mock).mockResolvedValue({ ok: false, status: 400, message: 'Cannot pay order from payment status paid' })
    const res = await payOrderAction('order_1')
    expect(res).toEqual({ ok: false, status: 400, message: 'Cannot pay order from payment status paid' })
    expect(mockRevalidate).not.toHaveBeenCalled()
  })

  it('cancel → revalida /orders/:id y /orders', async () => {
    mockedCookies.mockReturnValue(mockCookie(TOKEN) as never)
    ;(backend.cancelOrderRequest as jest.Mock).mockResolvedValue({ ok: true, status: 200, order: { ...order, status: 'cancelled', paymentStatus: 'refunded' } })
    await cancelOrderAction('order_1')
    expect(backend.cancelOrderRequest).toHaveBeenCalledWith(TOKEN, 'order_1')
    expect(mockRevalidate).toHaveBeenCalledWith('/orders/order_1')
  })

  it('sin cookie → 401', async () => {
    mockedCookies.mockReturnValue(mockCookie(undefined) as never)
    expect(await payOrderAction('x')).toEqual({ ok: false, status: 401 })
    expect(await cancelOrderAction('x')).toEqual({ ok: false, status: 401 })
  })
})
