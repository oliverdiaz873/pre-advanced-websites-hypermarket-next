import { describe, expect, it } from '@jest/globals'
import { fetchServerCart, resolveCartPayload } from './get-server-cart'
import type { ServerCart } from '../cart-types'

const TOKEN = 'jwt-secreto'

const cart: ServerCart = {
    items: [
        { productId: 'a', name: 'Arroz', price: 80, unitPrice: 80, originalPrice: 100, discountPercentage: 20, isOffer: true, quantity: 5, image: 'x' },
    ],
    totalItems: 5,
    subtotal: 400,
}

function fakeFetch(ok: boolean, status: number, body: unknown): typeof fetch {
    return (async () =>
        ({
            ok,
            status,
            json: async () => body,
        }) as Response) as unknown as typeof fetch
}

describe('fetchServerCart', () => {
    it('200 → devuelve el CartResponse canónico', async () => {
        const serverCart = await fetchServerCart(TOKEN, fakeFetch(true, 200, { success: true, data: cart }))
        expect(serverCart).toEqual(cart)
    })

    it('401 → null (sesión inválida)', async () => {
        expect(await fetchServerCart(TOKEN, fakeFetch(false, 401, { success: false, statusCode: 401 }))).toBeNull()
    })

    it('backend caído → null', async () => {
        const fetcher = (async () => {
            throw new Error('down')
        }) as unknown as typeof fetch
        expect(await fetchServerCart(TOKEN, fetcher)).toBeNull()
    })

    it('cuerpo ok sin data → null', async () => {
        expect(await fetchServerCart(TOKEN, fakeFetch(true, 200, { success: true, data: null }))).toBeNull()
    })
})

describe('resolveCartPayload (Route Handler: cookies mockeadas)', () => {
    it('sin cookie → anónimo silencioso { user: false, cart: null }', async () => {
        expect(await resolveCartPayload(undefined)).toEqual({ user: false, cart: null })
    })

    it('cookie + backend 200 → { user: true, cart }', async () => {
        const payload = await resolveCartPayload(TOKEN, fakeFetch(true, 200, { success: true, data: cart }))
        expect(payload).toEqual({ user: true, cart })
    })

    it('cookie pero backend caído/401 → anónimo { user: false, cart: null }', async () => {
        expect(await resolveCartPayload(TOKEN, fakeFetch(false, 401, { success: false }))).toEqual({ user: false, cart: null })
        const down = (async () => {
            throw new Error('x')
        }) as unknown as typeof fetch
        expect(await resolveCartPayload(TOKEN, down)).toEqual({ user: false, cart: null })
    })
})