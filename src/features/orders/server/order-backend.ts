/**
 * Cliente backend de órdenes (E3) — server-only.
 *
 * Reenvía la cookie `hypermarket_auth` al backend `/api/orders*` (mismo patrón
 * que `features/cart/server/cart-backend.ts`). El JWT jamás viaja al navegador.
 *
 * Errores E3 mapeados: 409 stock all-or-nothing, 400 transiciones inválidas,
 * 404 orden/dirección, 400 `Cart is empty`. El `message` del body de error se
 * conserva para la UI.
 *
 * `fetcher` es inyectable para los unit tests.
 */
import { AUTH_COOKIE_NAME, API_URL } from '../../auth/config'
import type { CreateOrderInput, Order } from '@/types/order'

export type OrderBackendResponse =
  | { ok: true; status: number; order: Order }
  | { ok: false; status: number; code?: string; message?: string }

export type OrdersBackendResponse =
  | { ok: true; status: number; orders: Order[] }
  | { ok: false; status: number; code?: string; message?: string }

async function orderBackendRequest(
  method: 'GET' | 'POST' | 'PATCH',
  path: string,
  opts: { token: string; body?: unknown; fetcher?: typeof fetch }
): Promise<{ status: number; data: unknown; code?: string; message?: string }> {
  const { token, body, fetcher = fetch } = opts
  const res = await fetcher(`${API_URL}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cookie: `${AUTH_COOKIE_NAME}=${token}`,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })
  const payload = (await res.json().catch(() => null)) as {
    data?: unknown
    code?: string
    message?: string
  } | null
  return {
    status: res.status,
    data: payload?.data,
    code: payload?.code,
    message: payload?.message,
  }
}

/** POST /api/orders — checkout con idempotencyKey obligatoria. */
export async function createOrderRequest(
  token: string,
  input: CreateOrderInput,
  fetcher?: typeof fetch
): Promise<OrderBackendResponse> {
  try {
    const res = await orderBackendRequest('POST', '/orders', { token, body: input, fetcher })
    if (res.status === 401 || res.status === 403) return { ok: false, status: res.status }
    if (res.status === 201 && res.data) {
      return { ok: true, status: res.status, order: res.data as Order }
    }
    return { ok: false, status: res.status, code: res.code, message: res.message }
  } catch {
    return { ok: false, status: 0 }
  }
}

/** GET /api/orders — historial plano (sin paginación) del usuario. */
export async function getOrdersRequest(
  token: string,
  fetcher?: typeof fetch
): Promise<OrdersBackendResponse> {
  try {
    const res = await orderBackendRequest('GET', '/orders', { token, fetcher })
    if (res.status === 401 || res.status === 403) return { ok: false, status: res.status }
    if (res.status >= 200 && res.status < 300) {
      return { ok: true, status: res.status, orders: Array.isArray(res.data) ? (res.data as Order[]) : [] }
    }
    return { ok: false, status: res.status, code: res.code, message: res.message }
  } catch {
    return { ok: false, status: 0 }
  }
}

/** GET /api/orders/:id — detalle de una orden propia. */
export async function getOrderRequest(
  token: string,
  id: string,
  fetcher?: typeof fetch
): Promise<OrderBackendResponse> {
  try {
    const res = await orderBackendRequest('GET', `/orders/${encodeURIComponent(id)}`, { token, fetcher })
    if (res.status === 401 || res.status === 403) return { ok: false, status: res.status }
    if (res.status >= 200 && res.status < 300 && res.data) {
      return { ok: true, status: res.status, order: res.data as Order }
    }
    return { ok: false, status: res.status, code: res.code, message: res.message }
  } catch {
    return { ok: false, status: 0 }
  }
}

/** POST /api/orders/:id/pay — pay stub (pending → paid, una sola vez). */
export async function payOrderRequest(
  token: string,
  id: string,
  fetcher?: typeof fetch
): Promise<OrderBackendResponse> {
  try {
    const res = await orderBackendRequest('POST', `/orders/${encodeURIComponent(id)}/pay`, { token, fetcher })
    if (res.status === 401 || res.status === 403) return { ok: false, status: res.status }
    if (res.status >= 200 && res.status < 300 && res.data) {
      return { ok: true, status: res.status, order: res.data as Order }
    }
    return { ok: false, status: res.status, code: res.code, message: res.message }
  } catch {
    return { ok: false, status: 0 }
  }
}

/** PATCH /api/orders/:id/status { status: 'cancelled' } — cancelar (customer). */
export async function cancelOrderRequest(
  token: string,
  id: string,
  fetcher?: typeof fetch
): Promise<OrderBackendResponse> {
  try {
    const res = await orderBackendRequest('PATCH', `/orders/${encodeURIComponent(id)}/status`, {
      token,
      body: { status: 'cancelled' },
      fetcher,
    })
    if (res.status === 401 || res.status === 403) return { ok: false, status: res.status }
    if (res.status >= 200 && res.status < 300 && res.data) {
      return { ok: true, status: res.status, order: res.data as Order }
    }
    return { ok: false, status: res.status, code: res.code, message: res.message }
  } catch {
    return { ok: false, status: 0 }
  }
}
