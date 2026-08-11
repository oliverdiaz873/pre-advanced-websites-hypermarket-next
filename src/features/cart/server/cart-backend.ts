/**
 * Cliente backend del carrito (N2) — server-only.
 *
 * Reenvía la cookie `hypermarket_auth` al backend `/api/cart*` (mismo patrón
 * que `features/auth/session.ts`). El JWT jamás viaja al navegador: solo se
 * lee en el servidor vía `cookies()` y se manda como header `Cookie`.
 *
 * `fetcher` es inyectable para los unit tests.
 */
import { AUTH_COOKIE_NAME, API_URL } from '../../auth/config'
import type { MergePayloadItem, ServerCart } from '../cart-types'

export interface CartBackendResponse {
    ok: boolean
    status: number
    cart: ServerCart | null
    code?: string
}

export async function cartBackendRequest(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    path: string,
    opts: { token: string; body?: unknown; fetcher?: typeof fetch }
): Promise<CartBackendResponse> {
    const { token, body, fetcher = fetch } = opts
    try {
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

        if (res.status === 401 || res.status === 403) {
            return { ok: false, status: res.status, cart: null }
        }

        const payload = (await res.json().catch(() => null)) as { data?: unknown; code?: string } | null
        return {
            ok: res.ok,
            status: res.status,
            cart: res.ok && payload && payload.data ? (payload.data as ServerCart) : null,
            code: payload?.code,
        }
    } catch {
        // Backend caído / timeout / red: nunca se lanza, se señala sin carrito.
        return { ok: false, status: 0, cart: null }
    }
}

/** GET /api/cart */
export const getCartRequest = (token: string, fetcher?: typeof fetch) =>
    cartBackendRequest('GET', '/cart', { token, fetcher })

/** POST /api/cart/items — incrementa (server-side) la cantidad del item. */
export const addItemRequest = (token: string, productId: string, quantity: number, fetcher?: typeof fetch) =>
    cartBackendRequest('POST', '/cart/items', { token, body: { productId, quantity }, fetcher })

/** PATCH /api/cart/items/:productId — cantidad ABSOLUTA (set, no delta). */
export const updateItemRequest = (token: string, productId: string, quantity: number, fetcher?: typeof fetch) =>
    cartBackendRequest('PATCH', `/cart/items/${encodeURIComponent(productId)}`, { token, body: { quantity }, fetcher })

/** DELETE /api/cart/items/:productId */
export const removeItemRequest = (token: string, productId: string, fetcher?: typeof fetch) =>
    cartBackendRequest('DELETE', `/cart/items/${encodeURIComponent(productId)}`, { token, fetcher })

/** DELETE /api/cart */
export const clearCartRequest = (token: string, fetcher?: typeof fetch) =>
    cartBackendRequest('DELETE', '/cart', { token, fetcher })

/**
 * POST /api/cart/merge — única operación de merge (N2 §5). El payload lleva
 * SOLO { productId, quantity }; el precio/oferta los decide exclusivamente el
 * backend (server-wins, N2 §6).
 */
export const mergeCartRequest = (token: string, items: MergePayloadItem[], fetcher?: typeof fetch) =>
    cartBackendRequest('POST', '/cart/merge', { token, body: { items }, fetcher })