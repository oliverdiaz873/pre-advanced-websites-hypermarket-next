import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME } from '@/features/auth/config'
import { resolveCartPayload } from '@/features/cart/server/get-server-cart'

/**
 * Tunnel del Carrito backend → cliente (N2 §1).
 *
 * - GET /api/cart: reenvía la cookie `hypermarket_auth` al backend y devuelve
 *   el carrito canónico (`CartResponse`). Sin cookie, 401 o backend caído →
 *   `{ user: false, cart: null }` (modo anónimo silencioso).
 * - El JWT nunca llega al navegador: solo se lee server-side y se reenvía.
 *
 * Las mutaciones NO pasan por aquí: se resuelven vía Server Actions
 * (`features/cart/actions.ts`), como el resto del flujo autenticado.
 */
export async function GET() {
    const store = await cookies()
    const token = store.get(AUTH_COOKIE_NAME)?.value
    const payload = await resolveCartPayload(token)
    return NextResponse.json(payload)
}