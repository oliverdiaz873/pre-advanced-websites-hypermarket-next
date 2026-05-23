import { useTranslations } from 'next-intl'
import { EmptyState } from '@/ui'

/**
 * EmptyOffers - Componente de Ofertas Vacías
 * 
 * Reutiliza el componente EmptyState para mostrar un mensaje
 * cuando no hay ofertas disponibles.
 */
const EmptyOffers = () => {
    const t = useTranslations('offers');
    
    return (
        <EmptyState
            title={t('empty.title')}
            description={t('empty.message')}
            icon={
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
            }
        />
    )
}

export default EmptyOffers
