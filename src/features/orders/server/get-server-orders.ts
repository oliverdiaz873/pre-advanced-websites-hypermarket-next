/**
 * Resolución de órdenes server-side para RSC (páginas `/orders` y
 * `/orders/[id]`). Patrón análogo a `features/auth/session.ts`: se lee la
 * cookie en el servidor, se reenvía al backend y se devuelve solo el modelo
 * tipado. El JWT jamás viaja al navegador.
 */
import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME } from '../../auth/config'
import { getOrderRequest, getOrdersRequest } from './order-backend'
import type { Order } from '@/types/order'

/** GET /api/orders reenviando la cookie. `[]` si anónimo, 401 o backend caído. */
export async function fetchServerOrders(token: string, fetcher?: typeof fetch): Promise<Order[]> {
  const res = await getOrdersRequest(token, fetcher)
  return res.ok ? res.orders : []
}

/** GET /api/orders/:id reenviando la cookie. `null` si no encontrada o sin sesión. */
export async function fetchServerOrder(token: string, id: string, fetcher?: typeof fetch): Promise<Order | null> {
  const res = await getOrderRequest(token, id, fetcher)
  return res.ok ? res.order : null
}

/** Para RSC: lee la cookie y devuelve el historial del usuario autenticado. */
export async function getServerOrders(fetcher?: typeof fetch): Promise<Order[]> {
  const store = await cookies()
  const token = store.get(AUTH_COOKIE_NAME)?.value
  if (!token) return []
  return fetchServerOrders(token, fetcher)
}

/** Para RSC: lee la cookie y devuelve una orden concreta (owner-only). */
export async function getServerOrder(id: string, fetcher?: typeof fetch): Promise<Order | null> {
  const store = await cookies()
  const token = store.get(AUTH_COOKIE_NAME)?.value
  if (!token) return null
  return fetchServerOrder(token, id, fetcher)
}
