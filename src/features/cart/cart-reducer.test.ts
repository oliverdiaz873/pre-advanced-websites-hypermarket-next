import { describe, expect, it } from '@jest/globals'
import { cartReducer, initialCartState } from './cart-reducer'
import type { CartItem, ServerCart } from './cart-types'

const local: CartItem[] = [
    {
        id: 'prod_a',
        name: 'Arroz 1kg',
        precio: 80,
        img: 'x',
        unitLabel: 'kg',
        cantidad: 3,
        isOffer: true,
        oldPrice: '100',
    },
    {
        id: 'prod_ghost',
        name: 'Fantasma',
        precio: 5,
        img: 'g',
        unitLabel: 'unidad',
        cantidad: 2,
    },
]

const serverCart: ServerCart = {
    items: [
        { productId: 'prod_a', name: 'Arroz 1kg', price: 80, unitPrice: 80, originalPrice: 100, discountPercentage: 20, isOffer: true, quantity: 5, image: 'x' },
        { productId: 'prod_b', name: 'Leche', price: 89.5, unitPrice: 89.5, isOffer: false, quantity: 1, image: 'y' },
    ],
    totalItems: 6,
    subtotal: 489.5,
}

describe('cartReducer', () => {
    it('hidrata el carrito local al resolver sesión anónima', () => {
        let state = cartReducer(initialCartState, { type: 'HYDRATE_LOCAL', items: local })
        expect(state.mode).toBe('loading')
        expect(state.cart).toEqual([])

        state = cartReducer(state, { type: 'SESSION_RESOLVED', status: 'anonymous' })
        expect(state.mode).toBe('anonymous')
        expect(state.cart).toHaveLength(2)
    })

    it('anonimo: SET_CART mantiene el espejo local al día', () => {
        let state = cartReducer(initialCartState, { type: 'HYDRATE_LOCAL', items: local })
        state = cartReducer(state, { type: 'SESSION_RESOLVED', status: 'anonymous' })
        const next: CartItem[] = [{ ...local[0], cantidad: 4 }]
        state = cartReducer(state, { type: 'SET_CART', items: next })

        expect(state.cart).toEqual(next)
        expect(state.localCart).toEqual(next)
    })

    it('autenticado: conserva el local para el merge pero pinta carrito vacío', () => {
        let state = cartReducer(initialCartState, { type: 'HYDRATE_LOCAL', items: local })
        state = cartReducer(state, { type: 'SESSION_RESOLVED', status: 'authenticated' })

        expect(state.mode).toBe('authenticated')
        expect(state.cart).toEqual([])
        expect(state.localCart).toHaveLength(2)
        expect(state.mergedThisSession).toBe(false)
    })

    it('SYNC_OK: el carrito del servidor reemplaza el estado (server = fuente de verdad)', () => {
        let state = cartReducer(initialCartState, { type: 'SESSION_RESOLVED', status: 'authenticated' })
        state = cartReducer(state, { type: 'SYNC_OK', serverCart })

        expect(state.cart).toHaveLength(2)
        expect(state.cart[0]).toMatchObject({ id: 'prod_a', cantidad: 5, precio: 80, oldPrice: '100', isOffer: true })
        expect(state.serverCart).toEqual(serverCart)
    })

    it('MERGE_OK: server-wins (acumula), descarta ghost/unavailable y limpia el espejo local', () => {
        let state = cartReducer(initialCartState, { type: 'HYDRATE_LOCAL', items: local })
        state = cartReducer(state, { type: 'SESSION_RESOLVED', status: 'authenticated' })
        state = cartReducer(state, { type: 'MERGE_OK', serverCart })

        expect(state.cart.map((i) => i.id)).toEqual(['prod_a', 'prod_b'])
        expect(state.cart[0].cantidad).toBe(5) // local pedía 3, el servidor confirma 5 (A5)
        expect(state.cart.find((i) => i.id === 'prod_ghost')).toBeUndefined()
        expect(state.localCart).toEqual([])
        expect(state.pendingMerge).toBe(false)
        expect(state.mergedThisSession).toBe(true)
    })

    it('MERGE_FAIL: pendingMerge=true y el carrito local sigue funcionando (offline)', () => {
        let state = cartReducer(initialCartState, { type: 'HYDRATE_LOCAL', items: local })
        state = cartReducer(state, { type: 'SESSION_RESOLVED', status: 'authenticated' })
        state = cartReducer(state, { type: 'MERGE_FAIL' })

        expect(state.pendingMerge).toBe(true)
        expect(state.localCart).toHaveLength(2)
        expect(state.cart).toHaveLength(2)
        expect(state.mergedThisSession).toBe(false)
    })

    it('reintento: un segundo MERGE_OK tras fallo limpia el espejo y confirma', () => {
        let state = cartReducer(initialCartState, { type: 'HYDRATE_LOCAL', items: local })
        state = cartReducer(state, { type: 'SESSION_RESOLVED', status: 'authenticated' })
        state = cartReducer(state, { type: 'MERGE_FAIL' })
        state = cartReducer(state, { type: 'MERGE_OK', serverCart })

        expect(state.pendingMerge).toBe(false)
        expect(state.mergedThisSession).toBe(true)
        expect(state.localCart).toEqual([])
        expect(state.cart[0].cantidad).toBe(5)
    })

    it('ROLLBACK: revierte al último CartResponse confirmado', () => {
        let state = cartReducer(initialCartState, { type: 'SESSION_RESOLVED', status: 'authenticated' })
        state = cartReducer(state, { type: 'SYNC_OK', serverCart })
        const optimista: CartItem[] = [{ ...state.cart[0], cantidad: 6 }]
        state = cartReducer(state, { type: 'SET_CART', items: optimista })
        state = cartReducer(state, { type: 'ROLLBACK' })

        expect(state.cart[0].cantidad).toBe(5)
    })

    it('LOGOUT: limpia el espejo local y vacía el client, sin tocar el carrito server', () => {
        let state = cartReducer(initialCartState, { type: 'SESSION_RESOLVED', status: 'authenticated' })
        state = cartReducer(state, { type: 'SYNC_OK', serverCart })
        state = cartReducer(state, { type: 'LOGOUT' })

        expect(state.mode).toBe('anonymous')
        expect(state.cart).toEqual([])
        expect(state.localCart).toEqual([])
        expect(state.serverCart).toBeNull()
        expect(state.pendingMerge).toBe(false)
    })

    it('optimista anónimo: OPTIMISTIC_UPDATE resta, elimina en 0 y mantiene el espejo', () => {
        let state = cartReducer(initialCartState, { type: 'HYDRATE_LOCAL', items: local })
        state = cartReducer(state, { type: 'SESSION_RESOLVED', status: 'anonymous' })

        state = cartReducer(state, { type: 'OPTIMISTIC_UPDATE', id: 'prod_a', delta: -2 })
        expect(state.cart.find((i) => i.id === 'prod_a')?.cantidad).toBe(1)
        expect(state.localCart.find((i) => i.id === 'prod_a')?.cantidad).toBe(1)

        state = cartReducer(state, { type: 'OPTIMISTIC_UPDATE', id: 'prod_a', delta: -1 })
        expect(state.cart.find((i) => i.id === 'prod_a')).toBeUndefined()
    })

    it('optimista autenticado: SET_CART/OPTIMISTIC_* NO manchan el espejo local', () => {
        let state = cartReducer(initialCartState, { type: 'SESSION_RESOLVED', status: 'authenticated' })
        state = cartReducer(state, { type: 'SYNC_OK', serverCart })

        state = cartReducer(state, { type: 'OPTIMISTIC_UPDATE', id: 'prod_a', delta: 1 })
        expect(state.cart[0].cantidad).toBe(6)
        expect(state.localCart).toEqual([]) // el espejo solo se usa para merge/logout

        state = cartReducer(state, { type: 'OPTIMISTIC_REMOVE', id: 'prod_a' })
        expect(state.cart.map((i) => i.id)).toEqual(['prod_b'])
    })

    it('optimista: add/clear reflejan la UI al instante', () => {
        let state = cartReducer(initialCartState, { type: 'SESSION_RESOLVED', status: 'authenticated' })
        state = cartReducer(state, { type: 'SYNC_OK', serverCart })

        state = cartReducer(state, { type: 'OPTIMISTIC_ADD', product: { id: 'prod_c', name: 'Aceite', precio: 15, img: 'z' } })
        expect(state.cart).toHaveLength(3)

        state = cartReducer(state, { type: 'OPTIMISTIC_CLEAR' })
        expect(state.cart).toEqual([])
    })
})