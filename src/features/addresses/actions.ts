'use server'

/**
 * Server Actions de Direcciones (E3).
 *
 * Todas las mutaciones autenticadas terminan en el backend `/api/addresses*`,
 * reenviando la cookie `hypermarket_auth` (el cliente nunca gestiona el JWT).
 * Devuelven resultados serializables `{ ok, ... }` — el JWT jamás se serializa
 * al navegador.
 */
import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME } from '../auth/config'
import type { AddressInput } from '@/types/address'
import {
  createAddressRequest,
  deleteAddressRequest,
  updateAddressRequest,
  type AddressBackendResponse,
} from './server/address-backend'

export type AddressActionResult = AddressBackendResponse

async function requireToken(): Promise<string | null> {
  const store = await cookies()
  return store.get(AUTH_COOKIE_NAME)?.value ?? null
}

/** POST /api/addresses — crea una dirección. */
export async function createAddressAction(input: AddressInput): Promise<AddressActionResult> {
  const token = await requireToken()
  if (!token) return { ok: false, status: 401 }
  if (!input.label || !input.street || !input.city || !input.state || !input.zipCode || !input.country) {
    return { ok: false, status: 400, code: 'VALIDATION_ERROR' }
  }
  return createAddressRequest(token, input)
}

/** PATCH /api/addresses/:id — actualiza una dirección propia. */
export async function updateAddressAction(
  id: string,
  input: Partial<AddressInput>,
): Promise<AddressActionResult> {
  const token = await requireToken()
  if (!token) return { ok: false, status: 401 }
  if (!id) return { ok: false, status: 400, code: 'VALIDATION_ERROR' }
  return updateAddressRequest(token, id, input)
}

/** DELETE /api/addresses/:id — elimina una dirección propia. */
export async function deleteAddressAction(id: string): Promise<{ ok: boolean; status: number; code?: string; message?: string }> {
  const token = await requireToken()
  if (!token) return { ok: false, status: 401 }
  if (!id) return { ok: false, status: 400, code: 'VALIDATION_ERROR' }
  return deleteAddressRequest(token, id)
}
