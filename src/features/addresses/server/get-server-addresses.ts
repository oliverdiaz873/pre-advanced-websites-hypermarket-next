/**
 * Resolución de direcciones server-side para RSC (página `/addresses` y
 * `/checkout`). Patrón análogo a `features/auth/session.ts` y
 * `features/cart/server/get-server-cart.ts`: se lee la cookie en el servidor,
 * se reenvía al backend y se devuelve solo el modelo tipado. El JWT jamás
 * viaja al navegador.
 */
import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME } from '../../auth/config'
import { getAddressesRequest } from './address-backend'
import type { Address } from '@/types/address'

/** GET /api/addresses reenviando la cookie. `[]` si anónimo, 401 o backend caído. */
export async function fetchServerAddresses(token: string, fetcher?: typeof fetch): Promise<Address[]> {
  const res = await getAddressesRequest(token, fetcher)
  return res.ok ? res.addresses : []
}

/** Para RSC: lee la cookie y devuelve las direcciones del usuario autenticado. */
export async function getServerAddresses(fetcher?: typeof fetch): Promise<Address[]> {
  const store = await cookies()
  const token = store.get(AUTH_COOKIE_NAME)?.value
  if (!token) return []
  return fetchServerAddresses(token, fetcher)
}
