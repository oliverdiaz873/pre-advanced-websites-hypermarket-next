/**
 * Tipos de direcciones de envío (E3).
 *
 * Shape canónico del backend `/api/addresses` (snapshot sin userId en el
 * `shippingAddress` de las órdenes). El cliente jamás inventa campos: solo
 * mapea el contrato E3.
 */

/** Dirección de envío completa (respuesta del backend). */
export interface Address {
  id: string
  userId: string
  label: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  reference?: string
  isDefault: boolean
}

/** Payload para crear/editar una dirección (POST/PATCH /addresses). */
export interface AddressInput {
  label: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  reference?: string
  isDefault?: boolean
}

/** Snapshot de envío embebido en una orden (sin id/userId/isDefault). */
export interface ShippingAddressSnapshot {
  label?: string
  street?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  reference?: string
}

/** Resultado tipado de la capa server-only de direcciones. */
export type AddressResult =
  | { ok: true; address: Address }
  | { ok: false; status: number; code?: string; message?: string }
