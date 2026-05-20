import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/src/shared/components'

/**
 * EmptyCart - Componente de Carrito Vacío
 * 
 * Reutiliza el componente EmptyState para mostrar un mensaje
 * informativo cuando el carrito no tiene productos.
 */
const EmptyCart = () => {
    const { t } = useTranslation('common')
    
    return (
        <EmptyState
            title={t('cart.empty.title')}
            description={t('cart.empty.message')}
            actionLabel={t('cart.empty.button')}
            actionHref="/"
            icon={
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                    <use href="#icon-cart"/>
                </svg>
            }
        />
    )
}

export default EmptyCart
