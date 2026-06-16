import { useTranslations } from 'next-intl'
import { EmptyState } from '@/ui'
import { CartIcon } from '@/ui/Icons'

/**
 * EmptyCart - Componente de Carrito Vacío
 * 
 * Reutiliza el componente EmptyState para mostrar un mensaje
 * informativo cuando el carrito no tiene productos.
 */
const EmptyCart = () => {
    const t = useTranslations('common');
    
    return (
        <EmptyState
            title={t('cart.empty.title')}
            description={t('cart.empty.message')}
            actionLabel={t('cart.empty.button')}
            actionHref="/"
            icon={<CartIcon className="w-full h-full" />}
        />
    )
}

export default EmptyCart
