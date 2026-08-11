import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import { cookies } from 'next/headers'
import {
    addItem,
    clear,
    mergeLocal,
    removeItem,
    updateQuantity,
    type CartActionResult,
} from './actions'
import { addItemRequest, clearCartRequest, mergeCartRequest, removeItemRequest, updateItemRequest } from './server/cart-backend'
import type { ServerCart } from './cart-types'

jest.mock('next/headers', () => ({
    cookies: jest.fn(),
}))

jest.mock('./server/cart-backend', () => ({
    addItemRequest: jest.fn(),
    updateItemRequest: jest.fn(),
    removeItemRequest: jest.fn(),
    clearCartRequest: jest.fn(),
    mergeCartRequest: jest.fn(),
}))

const mockedCookies = cookies as unknown as {
    mockResolvedValueOnce: (v: unknown) => void
    mockReset: () => void
    mockResolvedValue: (v: unknown) => void
}

const mockAdd: jest.MockedFunction<typeof addItemRequest> = addItemRequest as jest.MockedFunction<typeof addItemRequest>
const mockUpdate: jest.MockedFunction<typeof updateItemRequest> = updateItemRequest as jest.MockedFunction<typeof updateItemRequest>
const mockRemove: jest.MockedFunction<typeof removeItemRequest> = removeItemRequest as jest.MockedFunction<typeof removeItemRequest>
const mockClear: jest.MockedFunction<typeof clearCartRequest> = clearCartRequest as jest.MockedFunction<typeof clearCartRequest>
const mockMerge: jest.MockedFunction<typeof mergeCartRequest> = mergeCartRequest as jest.MockedFunction<typeof mergeCartRequest>

const serverCart: ServerCart = {
    items: [
        { productId: 'a', name: 'Arroz', price: 80, unitPrice: 80, originalPrice: 100, discountPercentage: 20, isOffer: true, quantity: 5, image: 'x' },
    ],
    totalItems: 5,
    subtotal: 400,
}

function storeWith(token: string | null) {
    return { get: (name: string) => (token ? { name, value: token } : undefined) }
}

beforeEach(() => {
    jest.clearAllMocks()
})

afterEach(() => {
    mockedCookies.mockReset()
})

describe('autenticación (cookie mockeada)', () => {
    it('sin cookie → 401 y NO llama al backend', async () => {
        mockedCookies.mockResolvedValue(storeWith(null))

        await expect(addItem('p', 1)).resolves.toEqual({ ok: false, status: 401 })
        await expect(mergeLocal([])).resolves.toEqual({ ok: false, status: 401 })
        expect(mockAdd).not.toHaveBeenCalled()
        expect(mockMerge).not.toHaveBeenCalled()
    })
})

describe('addItem', () => {
    it('reenvía la cookie y delega en el backend con { productId, quantity }', async () => {
        mockedCookies.mockResolvedValue(storeWith('tok-secreto'))
        mockAdd.mockResolvedValue({ ok: true, status: 200, cart: serverCart })

        const res = await addItem('prod_a', 2)

        expect(mockAdd).toHaveBeenCalledWith('tok-secreto', 'prod_a', 2)
        expect(res).toEqual({ ok: true, cart: serverCart })
        expect(JSON.stringify(res)).not.toContain('tok-secreto')
    })

    it('fallo del backend → { ok: false }', async () => {
        mockedCookies.mockResolvedValue(storeWith('t'))
        mockAdd.mockResolvedValue({ ok: false, status: 500, cart: null })

        await expect(addItem('p', 1)).resolves.toEqual({ ok: false, status: 500 })
    })
})

describe('updateQuantity', () => {
    it('envía la cantidad ABSOLUTA (no un delta)', async () => {
        mockedCookies.mockResolvedValue(storeWith('t'))
        mockUpdate.mockResolvedValue({ ok: true, status: 200, cart: serverCart })

        const res = await updateQuantity('prod_a', 5)

        expect(mockUpdate).toHaveBeenCalledWith('t', 'prod_a', 5)
        expect(res.ok).toBe(true)
    })
})

describe('removeItem / clear', () => {
    it('removeItem delega DELETE', async () => {
        mockedCookies.mockResolvedValue(storeWith('t'))
        mockRemove.mockResolvedValue({ ok: true, status: 200, cart: serverCart })

        await removeItem('prod_a')
        expect(mockRemove).toHaveBeenCalledWith('t', 'prod_a')
    })

    it('clear delega DELETE /api/cart', async () => {
        mockedCookies.mockResolvedValue(storeWith('t'))
        mockClear.mockResolvedValue({ ok: true, status: 200, cart: serverCart })

        await clear()
        expect(mockClear).toHaveBeenCalledWith('t')
    })
})

describe('mergeLocal (N2 §5/§6)', () => {
    it('usa UNA sola llamada a POST /api/cart/merge (nunca N POST por item)', async () => {
        mockedCookies.mockResolvedValue(storeWith('t'))
        mockMerge.mockResolvedValue({ ok: true, status: 200, cart: serverCart })

        const res = await mergeLocal([
            { productId: 'a', quantity: 3 },
            { productId: 'b', quantity: 2 },
        ])

        expect(mockMerge).toHaveBeenCalledTimes(1)
        expect(mockMerge).toHaveBeenCalledWith('t', [
            { productId: 'a', quantity: 3 },
            { productId: 'b', quantity: 2 },
        ])
        expect(res).toEqual({ ok: true, cart: serverCart })
    })

    it('server-wins: el cart canónico del merge (cantidades acumuladas) ES el estado', async () => {
        mockedCookies.mockResolvedValue(storeWith('t'))
        const serverWins: ServerCart = {
            items: [{ productId: 'a', name: 'Arroz', price: 80, unitPrice: 80, originalPrice: 100, discountPercentage: 20, isOffer: true, quantity: 5, image: 'x' }],
            totalItems: 5,
            subtotal: 400,
        }
        mockMerge.mockResolvedValue({ ok: true, status: 200, cart: serverWins })

        const res = (await mergeLocal([{ productId: 'a', quantity: 3 }])) as Extract<CartActionResult, { ok: true }>

        expect(res.cart.items[0].quantity).toBe(5) // server acumula 3 local + 2 server = 5
        expect(res.cart.items).toHaveLength(1) // ghost/unavailable ya no existen
    })

    it('items inválidos → 400 sin llamar al backend', async () => {
        mockedCookies.mockResolvedValue(storeWith('t'))
        // @ts-expect-error: probando entrada inválida de cliente
        await expect(mergeLocal('nope')).resolves.toEqual({ ok: false, status: 400 })
        expect(mockMerge).not.toHaveBeenCalled()
    })

    it('backend caído → { ok: false } (el cliente conserva pendingMerge)', async () => {
        mockedCookies.mockResolvedValue(storeWith('t'))
        mockMerge.mockResolvedValue({ ok: false, status: 0, cart: null })

        await expect(mergeLocal([{ productId: 'a', quantity: 1 }])).resolves.toEqual({ ok: false, status: 0 })
    })
})