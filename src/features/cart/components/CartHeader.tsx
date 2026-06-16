import { useTranslations } from 'next-intl'
import { CartIcon } from '@/ui/Icons'
import './CartHeader.css'

/**
 * CartHeader - Componente de Encabezado del Carrito
 * 
 * Muestra el título del carrito con el icono y el contador
 * de productos. Es reutilizable y accesible.
 */
interface CartHeaderProps {
    totalItems: number
}

const CartHeader = ({ totalItems }: CartHeaderProps) => {
    const t = useTranslations('common');
    return (
        <header className="cart-header">
            <CartIcon className="cart-header__icon" />
            <h2 className="cart-header__title">{t('cart.header_title')} ({totalItems})</h2>
        </header>
    )
}

export default CartHeader
