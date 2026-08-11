/**
 * Máquina de estados pura del CartContext (N2).
 *
 * Centraliza las transiciones relevantes para los criterios de aceptación:
 *  - hidratación anónima desde localStorage;
 *  - pasaje anonymous → authenticated con merge (server-wins);
 *  - `pendingMerge` y reintento si el merge falla;
 *  - limpieza del espejo local tras merge exitoso;
 *  - logout que limpia el espejo local conservando el carrito server-side;
 *  - rollback optimista al último CartResponse confirmado.
 *
 * Es un reducer puro (sin IO): localStorage, fetch y la cola de mutaciones se
 * orquestan en `CartProvider`, que despacha estos eventos.
 */
import { createCartItem, uiCartFromServer, type CartItemInput } from './cart-mapper'
import type { CartItem, CartMode, ServerCart } from './cart-types'

export interface CartState {
    mode: CartMode
    /** Vista actual de la UI (fuente: localStorage si anonymous, si no servidor). */
    cart: CartItem[]
    /** Último CartResponse confirmado por el backend (autoritativo para rollback). */
    serverCart: ServerCart | null
    /** Espejo local/anónimo (origen del merge; se limpia tras merge exitoso o logout). */
    localCart: CartItem[]
    /** merge en curso/fallido pendiente de reintento. */
    pendingMerge: boolean
    /** La sesión ya se sincronizó con el servidor (evita loops de sync/merge). */
    serverSynced: boolean
    /** El carrito local de esta sesión ya fue mergeado. */
    mergedThisSession: boolean
}

export type CartAction =
    | { type: 'SESSION_RESOLVED'; status: 'anonymous' | 'authenticated' }
    | { type: 'HYDRATE_LOCAL'; items: CartItem[] }
    | { type: 'SET_CART'; items: CartItem[] }
    | { type: 'SYNC_OK'; serverCart: ServerCart }
    | { type: 'MERGE_OK'; serverCart: ServerCart }
    | { type: 'MERGE_FAIL' }
    | { type: 'ROLLBACK' }
    | { type: 'LOGOUT' }
    | { type: 'OPTIMISTIC_ADD'; product: CartItemInput }
    | { type: 'OPTIMISTIC_UPDATE'; id: string; delta: number }
    | { type: 'OPTIMISTIC_REMOVE'; id: string }
    | { type: 'OPTIMISTIC_CLEAR' }

export const initialCartState: CartState = {
    mode: 'loading',
    cart: [],
    serverCart: null,
    localCart: [],
    pendingMerge: false,
    serverSynced: false,
    mergedThisSession: false,
}

/** Aplica un cambio visual y lo refleja en el espejo local cuando corresponde. */
function withMirror(state: CartState, cart: CartItem[]): CartState {
    const keepsMirror = state.mode === 'anonymous' || state.pendingMerge
    return { ...state, cart, localCart: keepsMirror ? cart : state.localCart }
}

export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'HYDRATE_LOCAL':
            return { ...state, localCart: action.items, cart: state.mode === 'anonymous' ? action.items : state.cart }

        case 'SESSION_RESOLVED':
            if (action.status === 'anonymous') {
                return { ...state, mode: 'anonymous', cart: state.localCart }
            }
            return { ...state, mode: 'authenticated', serverSynced: false }

        case 'SET_CART':
            return withMirror(state, action.items)

        case 'SYNC_OK':
            return {
                ...state,
                serverCart: action.serverCart,
                cart: uiCartFromServer(action.serverCart),
                serverSynced: true,
            }

        case 'MERGE_OK':
            return {
                ...state,
                mode: 'authenticated',
                serverCart: action.serverCart,
                cart: uiCartFromServer(action.serverCart),
                localCart: [],
                pendingMerge: false,
                serverSynced: true,
                mergedThisSession: true,
            }

        case 'MERGE_FAIL':
            // Sin merge confirmado → el carrito local sigue funcionando (fallback offline).
            return { ...state, pendingMerge: true, cart: state.localCart }

        case 'ROLLBACK':
            return {
                ...state,
                cart: state.serverCart ? uiCartFromServer(state.serverCart) : state.cart,
                serverSynced: state.serverCart !== null,
            }

        case 'LOGOUT':
            return {
                ...state,
                mode: 'anonymous',
                cart: [],
                localCart: [],
                serverCart: null,
                pendingMerge: false,
                serverSynced: false,
                mergedThisSession: false,
            }

        case 'OPTIMISTIC_ADD':
            return withMirror(state, [...state.cart, createCartItem(action.product)])

        case 'OPTIMISTIC_UPDATE':
            return withMirror(
                state,
                state.cart
                    .map((item) => (item.id === action.id ? { ...item, cantidad: item.cantidad + action.delta } : item))
                    .filter((item) => item.cantidad > 0)
            )

        case 'OPTIMISTIC_REMOVE':
            return withMirror(state, state.cart.filter((item) => item.id !== action.id))

        case 'OPTIMISTIC_CLEAR':
            return withMirror(state, [])

        default:
            return state
    }
}