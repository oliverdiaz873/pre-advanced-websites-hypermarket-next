import './CartItemsList.css'
import CartItem from './CartItem'
import type { CartItem as CartItemType } from '../CartContext'

/**
 * CartItemsList - Componente de Lista de Items del Carrito
 * 
 * Renderiza la lista de productos usando el componente CartItem.
 * Actúa como un contenedor que mapea los datos del carrito
 * a componentes individuales reutilizables.
 * 
 * F5.4: los datos de oferta (isOffer/oldPrice/discountPercentage) se leen
 * directamente del item del carrito, sin mock.
 */
interface CartItemsListProps {
    cart: CartItemType[]
    updateQuantity: (id: string, change: number) => void
    removeFromCart: (id: string) => void
}

const CartItemsList = ({ cart, updateQuantity, removeFromCart }: CartItemsListProps) => {
    return (
        <div className="cart-items-list">
            {cart.map((item) => (
                <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    precio={item.precio}
                    cantidad={item.cantidad}
                    img={item.img}
                    unitLabel={item.unitLabel}
                    unitQuantity={item.unitQuantity}
                    isOffer={item.isOffer}
                    oldPrice={item.oldPrice}
                    discountPercentage={item.discountPercentage}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                />
            ))}
        </div>
    )
}

export default CartItemsList
