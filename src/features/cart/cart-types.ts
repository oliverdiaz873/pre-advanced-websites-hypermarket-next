/**
 * Tipos del Carrito N2.
 *
 * `CartItem` es el modelo visual que ya consume la UI (API pública del
 * CartContext, NO cambiar). `ServerCartItem/ServerCart` es el `CartResponse`
 * canónico que devuelve el backend `/api/cart`. El cliente jamás recalcula
 * precios/ofertas: solo transforma ServerCart → CartItem via `cart-mapper.ts`.
 */

/** Item del carrito (modelo visual de la UI). */
export interface CartItem {
    id: string
    name: string
    precio: number
    precioTexto?: string
    img: string
    unidad?: string
    unitLabel: string
    cantidad: number
    isOffer?: boolean
    oldPrice?: string
    discountPercentage?: number
    unitQuantity?: number
}

/** Item canónico del backend (snapshot server-side de precio/oferta). */
export interface ServerCartItem {
    productId: string
    name: string
    price: number
    unitPrice: number
    originalPrice?: number
    discountPercentage?: number
    isOffer: boolean
    quantity: number
    image: string
    unit?: string
    unitQuantity?: number
}

/** `CartResponse` completo del backend `/api/cart`. */
export interface ServerCart {
    items: ServerCartItem[]
    totalItems: number
    subtotal: number
    createdAt?: string
    updatedAt?: string
}

/** Payload de merge guest→server: SOLO ids y cantidades, nunca precios locales. */
export interface MergePayloadItem {
    productId: string
    quantity: number
}

/** Estado de resolución del CartContext respecto a la sesión. */
export type CartMode = 'loading' | 'anonymous' | 'authenticated'