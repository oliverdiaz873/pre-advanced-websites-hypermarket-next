'use server'

/**
 * Server Actions de Órdenes (E3).
 *
 * Todas las mutaciones autenticadas terminan en el backend `/api/orders*`,
 * reenviando la cookie `hypermarket_auth`. Devuelven resultados serializables
 * `{ ok, ... }` — el JWT jamás se serializa al navegador.
 *
 * `createOrderAction` recibe la `idempotencyKey` GENERADA EN EL SERVER
 * (`/checkout` RSC) y reutilizada por el cliente durante retries: reenviar la
 * misma key devuelve la misma orden (idempotencia E3), nunca una duplicada.
 */
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { AUTH_COOKIE_NAME } from '../auth/config'
import type { CreateOrderInput } from '@/types/order'
import {
  cancelOrderRequest,
  createOrderRequest,
  payOrderRequest,
  type OrderBackendResponse,
} from './server/order-backend'

export type OrderActionResult = OrderBackendResponse

async function requireToken(): Promise<string | null> {
  const store = await cookies()
  return store.get(AUTH_COOKIE_NAME)?.value ?? null
}

/**
 * POST /api/orders — checkout. `input.idempotencyKey` es obligatoria (E3):
 * 400 si falta. Si la clave ya se usó, el backend devuelve la misma orden.
 */
export async function createOrderAction(input: CreateOrderInput): Promise<OrderActionResult> {
  const token = await requireToken()
  if (!token) return { ok: false, status: 401 }
  if (!input.addressId || !input.idempotencyKey) {
    return { ok: false, status: 400, code: 'VALIDATION_ERROR' }
  }
  const result = await createOrderRequest(token, input)
  if (result.ok) {
    // El carrito se vacía server-side tras el checkout; refrescamos las páginas
    // que leen el carrito y el historial de órdenes.
    revalidatePath('/cart')
    revalidatePath('/orders')
    revalidatePath('/checkout')
  }
  return result
}

/** POST /api/orders/:id/pay — pay stub (pending → paid, una sola vez). */
export async function payOrderAction(id: string): Promise<OrderActionResult> {
  const token = await requireToken()
  if (!token) return { ok: false, status: 401 }
  if (!id) return { ok: false, status: 400, code: 'VALIDATION_ERROR' }
  const result = await payOrderRequest(token, id)
  if (result.ok) {
    revalidatePath(`/orders/${id}`)
    revalidatePath('/orders')
  }
  return result
}

/** PATCH /api/orders/:id/status { cancelled } — cancelar (customer). */
export async function cancelOrderAction(id: string): Promise<OrderActionResult> {
  const token = await requireToken()
  if (!token) return { ok: false, status: 401 }
  if (!id) return { ok: false, status: 400, code: 'VALIDATION_ERROR' }
  const result = await cancelOrderRequest(token, id)
  if (result.ok) {
    revalidatePath(`/orders/${id}`)
    revalidatePath('/orders')
  }
  return result
}
