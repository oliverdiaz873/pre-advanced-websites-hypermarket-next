import { useTranslations } from 'next-intl'
import { FireIcon } from '@/ui/Icons'
import './OfferBadge.css'

interface OfferBadgeProps {
    discountPercentage?: number
}

/**
 * OfferBadge - Un badge visual para resaltar productos en oferta.
 * Incluye un icono de fuego y muestra el porcentaje de descuento.
 */
const OfferBadge = ({ discountPercentage }: OfferBadgeProps) => {
    const t = useTranslations('offers');
    return (
        <div className="offer-badge" aria-label={t('badge.aria_label', { discount: discountPercentage ? `-${discountPercentage}%` : '' })}>
            <FireIcon className="offer-badge__icon icon-fire" />
            {discountPercentage && (
                <span className="offer-badge__text">
                    -{discountPercentage}%
                </span>
            )}
        </div>
    )
}

export default OfferBadge
