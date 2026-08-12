/**
 * Cliente backend de direcciones (E3) — server-only.
 *
 * Reenvía la cookie `hypermarket_auth` al backend `/api/addresses*` (mismo
 * patrón que `features/auth/session.ts` y `features/cart/server/cart-backend.ts`).
 * El JWT jamás viaja al navegador: solo se lee server-side vía `cookies()`.
 *
 * `fetcher` es inyectable para los unit tests.
 */
import { AUTH_COOKIE_NAME, API_URL } from '../../auth/config'
import type { Address, AddressInput } from '@/types/address'

export type AddressesBackendResponse =
  | { ok: true; status: number; addresses: Address[] }
  | { ok: false; status: number; code?: string; message?: string }

export type AddressBackendResponse =
  | { ok: true; status: number; address: Address }
  | { ok: false; status: number; code?: string; message?: string }

async function addressBackendRequest(
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
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

/** GET /api/addresses — lista las direcciones del usuario autenticado. */
export async function getAddressesRequest(
  token: string,
  fetcher?: typeof fetch
): Promise<AddressesBackendResponse> {
  try {
    const res = await addressBackendRequest('GET', '/addresses', { token, fetcher })
    if (res.status === 401 || res.status === 403) {
      return { ok: false, status: res.status }
    }
    if (res.status >= 200 && res.status < 300) {
      return { ok: true, status: res.status, addresses: Array.isArray(res.data) ? (res.data as Address[]) : [] }
    }
    return { ok: false, status: res.status, code: res.code, message: res.message }
  } catch {
    return { ok: false, status: 0 }
  }
}

/** POST /api/addresses — crea una dirección. */
export async function createAddressRequest(
  token: string,
  input: AddressInput,
  fetcher?: typeof fetch
): Promise<AddressBackendResponse> {
  try {
    const res = await addressBackendRequest('POST', '/addresses', { token, body: input, fetcher })
    if (res.status === 401 || res.status === 403) {
      return { ok: false, status: res.status }
    }
    if (res.status >= 200 && res.status < 300 && res.data) {
      return { ok: true, status: res.status, address: res.data as Address }
    }
    return { ok: false, status: res.status, code: res.code, message: res.message }
  } catch {
    return { ok: false, status: 0 }
  }
}

/** PATCH /api/addresses/:id — actualiza una dirección propia. */
export async function updateAddressRequest(
  token: string,
  id: string,
  input: Partial<AddressInput>,
  fetcher?: typeof fetch
): Promise<AddressBackendResponse> {
  try {
    const res = await addressBackendRequest('PATCH', `/addresses/${encodeURIComponent(id)}`, { token, body: input, fetcher })
    if (res.status === 401 || res.status === 403) {
      return { ok: false, status: res.status }
    }
    if (res.status >= 200 && res.status < 300 && res.data) {
      return { ok: true, status: res.status, address: res.data as Address }
    }
    return { ok: false, status: res.status, code: res.code, message: res.message }
  } catch {
    return { ok: false, status: 0 }
  }
}

/** DELETE /api/addresses/:id — elimina una dirección propia (204 sin cuerpo). */
export async function deleteAddressRequest(
  token: string,
  id: string,
  fetcher?: typeof fetch
): Promise<{ ok: boolean; status: number; code?: string; message?: string }> {
  try {
    const res = await addressBackendRequest('DELETE', `/addresses/${encodeURIComponent(id)}`, { token, fetcher })
    if (res.status === 204 || res.status === 200) return { ok: true, status: res.status }
    if (res.status === 401 || res.status === 403) return { ok: false, status: res.status }
    return { ok: false, status: res.status, code: res.code, message: res.message }
  } catch {
    return { ok: false, status: 0 }
  }
}

/** Obtiene una dirección concreta vía GET /api/addresses/:id (owner-only). */
export async function getAddressRequest(
  token: string,
  id: string,
  fetcher?: typeof fetch
): Promise<AddressBackendResponse> {
  try {
    const res = await addressBackendRequest('GET', `/addresses/${encodeURIComponent(id)}`, { token, fetcher })
    if (res.status === 401 || res.status === 403) return { ok: false, status: res.status }
    if (res.status >= 200 && res.status < 300 && res.data) {
      return { ok: true, status: res.status, address: res.data as Address }
    }
    return { ok: false, status: res.status, code: res.code, message: res.message }
  } catch {
    return { ok: false, status: 0 }
  }
}
