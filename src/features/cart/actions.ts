'use server'

/**
 * Server Actions del Carrito (N2 §2).
 *
 * Todas las mutaciones autenticadas terminan en el backend `/api/cart*`,
 * reenviando la cookie `hypermarket_auth` (el cliente nunca gestiona el JWT).
 * Devuelven el CartResponse canónico (`{ ok: true, cart }`) o un error
 * serializable (`{ ok: false, status }`).
 *
 * `mergeLocal` usa una SOLA llamada a `POST /api/cart/merge` (nunca N POST).
 */
import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME } from '../auth/config'
import {
    addItemRequest,
    clearCartRequest,
    mergeCartRequest,
    removeItemRequest,
    updateItemRequest,
    type CartBackendResponse,
} from './server/cart-backend'
import type { MergePayloadItem, ServerCart } from './cart-types'

export type CartActionResult = { ok: true; cart: ServerCart } | { ok: false; status: number; code?: string }

async function requireToken(): Promise<string | null> {
    const store = await cookies()
    return store.get(AUTH_COOKIE_NAME)?.value ?? null
}

async function resolve(request: Promise<CartBackendResponse>): Promise<CartActionResult> {
    const res = await request
    if (res.ok && res.cart) return { ok: true, cart: res.cart }
    return { ok: false, status: res.status, code: res.code }
}

/** POST /api/cart/items — agrega (incrementa) un item. */
export async function addItem(productId: string, quantity = 1): Promise<CartActionResult> {
    const token = await requireToken()
    if (!token) return { ok: false, status: 401 }
    return resolve(addItemRequest(token, productId, quantity))
}

/** PATCH /api/cart/items/:productId — cantidad ABSOLUTA (set, no delta). */
export async function updateQuantity(productId: string, quantity: number): Promise<CartActionResult> {
    const token = await requireToken()
    if (!token) return { ok: false, status: 401 }
    return resolve(updateItemRequest(token, productId, quantity))
}

/** DELETE /api/cart/items/:productId */
export async function removeItem(productId: string): Promise<CartActionResult> {
    const token = await requireToken()
    if (!token) return { ok: false, status: 401 }
    return resolve(removeItemRequest(token, productId))
}

/** DELETE /api/cart — vacía el carrito server-side. */
export async function clear(): Promise<CartActionResult> {
    const token = await requireToken()
    if (!token) return { ok: false, status: 401 }
    return resolve(clearCartRequest(token))
}

/**
 * POST /api/cart/merge — merge guest→server (server-wins). El payload lleva
 * SOLO { productId, quantity } (los precios/ofertas locales se descartan;
 * ver cart-mapper.localItemsToMergePayload).
 */
export async function mergeLocal(items: MergePayloadItem[]): Promise<CartActionResult> {
    const token = await requireToken()
    if (!token) return { ok: false, status: 401 }
    if (!Array.isArray(items)) return { ok: false, status: 400 }
    return resolve(mergeCartRequest(token, items))
}