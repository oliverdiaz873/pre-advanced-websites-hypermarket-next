import { afterEach, describe, expect, it } from '@jest/globals'
import { AUTH_COOKIE_NAME, API_URL } from '../../auth/config'
import {
    addItemRequest,
    cartBackendRequest,
    clearCartRequest,
    getCartRequest,
    mergeCartRequest,
    removeItemRequest,
    updateItemRequest,
    type CartBackendResponse,
} from './cart-backend'
import type { ServerCart } from '../cart-types'

const TOKEN = 'jwt-secreto'

const cartBody: ServerCart = {
    items: [
        { productId: 'a', name: 'Arroz', price: 80, unitPrice: 80, originalPrice: 100, discountPercentage: 20, isOffer: true, quantity: 5, image: 'x' },
    ],
    totalItems: 5,
    subtotal: 400,
}

function fakeFetch(ok: boolean, status: number, body: unknown): typeof fetch {
    return (async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input)
        return {
            url,
            method: init?.method ?? 'GET',
            headers: init?.headers,
            body: init?.body as string | undefined,
            ok,
            status,
            json: async () => body,
        } as unknown as Response
    }) as unknown as typeof fetch
}

const realFetch = globalThis.fetch

afterEach(() => {
    globalThis.fetch = realFetch
})

describe('cartBackendRequest', () => {
    it('envÃ­a GET con la cookie reenviada (JWT nunca en el cuerpo)', async () => {
        let seen: { url: string; headers?: HeadersInit; body?: string } | undefined
        const fetcher = (async (input: RequestInfo | URL, init?: RequestInit) => {
            seen = { url: String(input), headers: init?.headers, body: init?.body as string | undefined }
            return { ok: true, status: 200, json: async () => ({ success: true, data: cartBody }) } as unknown as Response
        }) as unknown as typeof fetch

        const res = await cartBackendRequest('GET', '/cart', { token: TOKEN, fetcher })

        expect(seen?.url).toBe(`${API_URL}/cart`)
        expect(seen?.headers).toMatchObject({ Cookie: `${AUTH_COOKIE_NAME}=${TOKEN}` })
        expect(res).toMatchObject({ ok: true, status: 200, cart: cartBody })
        expect(JSON.stringify(seen?.body ?? '')).not.toContain(TOKEN)
    })

    it('401 â†’ no autenticado sin carrito', async () => {
        const res = await cartBackendRequest('GET', '/cart', {
            token: TOKEN,
            fetcher: fakeFetch(false, 401, { success: false, statusCode: 401 }),
        })
        expect(res).toEqual({ ok: false, status: 401, cart: null } satisfies CartBackendResponse)
    })

    it('backend caÃ­do (fetch rechazada) â†’ status 0 sin carrito y sin lanzar', async () => {
        const fetcher = (async () => {
            throw new Error('ECONNREFUSED')
        }) as unknown as typeof fetch

        await expect(cartBackendRequest('GET', '/cart', { token: TOKEN, fetcher })).resolves.toEqual({
            ok: false,
            status: 0,
            cart: null,
        } satisfies CartBackendResponse)
    })

    it('respuesta ok sin data â†’ cart null', async () => {
        const res = await cartBackendRequest('GET', '/cart', {
            token: TOKEN,
            fetcher: fakeFetch(true, 200, { success: true, data: null }),
        })
        expect(res.cart).toBeNull()
    })
})

describe('helpers tipados', () => {
    it('addItemRequest: POST /api/cart/items con { productId, quantity }', async () => {
        let sent!: { url: string; method?: string; body?: string }
        const fetcher = (async (_i: RequestInfo | URL, init?: RequestInit) => {
            sent = { url: String(_i), method: init?.method, body: init?.body as string | undefined }
            return { ok: true, status: 200, json: async () => ({ success: true, data: cartBody }) } as unknown as Response
        }) as unknown as typeof fetch

        await addItemRequest('t', 'prod_1', 2, fetcher)

        expect(sent.method).toBe('POST')
        expect(sent.url).toBe(`${API_URL}/cart/items`)
        expect(JSON.parse(sent.body!)).toEqual({ productId: 'prod_1', quantity: 2 })
    })

    it('updateItemRequest: PATCH con cantidad ABSOLUTA (no delta)', async () => {
        let sent!: { url: string; method?: string; body?: string }
        const fetcher = (async (_i: RequestInfo | URL, init?: RequestInit) => {
            sent = { url: String(_i), method: init?.method, body: init?.body as string | undefined }
            return { ok: true, status: 200, json: async () => ({ success: true, data: cartBody }) } as unknown as Response
        }) as unknown as typeof fetch

        await updateItemRequest('t', 'prod_á', 4, fetcher)

        expect(sent.method).toBe('PATCH')
        expect(sent.url).toBe(`${API_URL}/cart/items/prod_%C3%A1`)
        expect(JSON.parse(sent.body!)).toEqual({ quantity: 4 })
    })

    it('removeItemRequest: DELETE del item', async () => {
        let method!: string | undefined
        const fetcher = (async (_i: RequestInfo | URL, init?: RequestInit) => {
            method = init?.method
            return { ok: true, status: 200, json: async () => ({ success: true, data: cartBody }) } as unknown as Response
        }) as unknown as typeof fetch

        await removeItemRequest('t', 'prod_1', fetcher)
        expect(method).toBe('DELETE')
    })

    it('clearCartRequest: DELETE /api/cart', async () => {
        let url1!: string
        const fetcher = (async (i: RequestInfo | URL) => {
            url1 = String(i)
            return { ok: true, status: 200, json: async () => ({ success: true, data: cartBody }) } as unknown as Response
        }) as unknown as typeof fetch

        await clearCartRequest('t', fetcher)
        expect(url1).toBe(`${API_URL}/cart`)
    })

    it('getCartRequest: GET /api/cart', async () => {
        let url1!: string
        const fetcher = (async (i: RequestInfo | URL) => {
            url1 = String(i)
            return { ok: true, status: 200, json: async () => ({ success: true, data: cartBody }) } as unknown as Response
        }) as unknown as typeof fetch

        await getCartRequest('t', fetcher)
        expect(url1).toBe(`${API_URL}/cart`)
    })
})

describe('mergeCartRequest (N2 Â§5/Â§6)', () => {
    it('POST /api/cart/merge con SOLO { productId, quantity } â€” sin precios locales', async () => {
        let sent!: { url: string; body?: string }
        const fetcher = (async (_i: RequestInfo | URL, init?: RequestInit) => {
            sent = { url: String(_i), body: init?.body as string | undefined }
            return { ok: true, status: 200, json: async () => ({ success: true, data: cartBody }) } as unknown as Response
        }) as unknown as typeof fetch

        await mergeCartRequest('t', [{ productId: 'a', quantity: 3 }], fetcher)

        expect(sent.url).toBe(`${API_URL}/cart/merge`)
        expect(JSON.parse(sent.body!)).toEqual({ items: [{ productId: 'a', quantity: 3 }] })
    })

    it('la respuesta canÃ³nica (server-wins, ghost descartados) se devuelve tal cual', async () => {
        const serverWins: ServerCart = {
            items: [
                { productId: 'a', name: 'Arroz', price: 80, unitPrice: 80, originalPrice: 100, discountPercentage: 20, isOffer: true, quantity: 5, image: 'x' },
            ],
            totalItems: 5,
            subtotal: 400,
        }
        const res = await mergeCartRequest('t', [{ productId: 'a', quantity: 3 }], fakeFetch(true, 200, { success: true, data: serverWins }))

        expect(res.ok).toBe(true)
        expect(res.cart).toEqual(serverWins)
        expect(res.cart?.items.map((i) => i.productId)).toEqual(['a'])
    })
})
