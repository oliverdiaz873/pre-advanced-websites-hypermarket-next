/**
 * Resolución del carrito server-side para el Route Handler `src/app/api/cart`
 * (N2 §1). Patrón análogo a `features/auth/session.ts`: se lee la cookie en el
 * servidor, se reenvía al backend y se devuelve solo el Carrito canónico.
 * Sin cookie, 401 o backend caído → carrito `null` (anónimo silencioso).
 */
import { getCartRequest } from './cart-backend'
import type { ServerCart } from '../cart-types'

/** GET /api/cart reenviando la cookie. `null` si anónimo, 401 o backend caído. */
export async function fetchServerCart(token: string, fetcher?: typeof fetch): Promise<ServerCart | null> {
    const res = await getCartRequest(token, fetcher)
    return res.ok ? res.cart : null
}

/**
 * Payload del Route Handler. `cart === null` significa "no autenticado" o
 * "backend no disponible" → el cliente cae al modo anónimo/localStorage.
 */
export async function resolveCartPayload(
    token: string | undefined,
    fetcher?: typeof fetch
): Promise<{ user: boolean; cart: ServerCart | null }> {
    if (!token) return { user: false, cart: null }
    const cart = await fetchServerCart(token, fetcher)
    return { user: cart !== null, cart }
}