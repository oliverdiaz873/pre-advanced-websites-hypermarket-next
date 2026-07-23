import { Product } from '@/types/product'
import { offersData } from '@/features/offers/data/offers'

export interface ProductWithOffer extends Product {
    oldPrice?: string
    discountPercentage?: number
}

const parseOfferPrice = (price: string): number => {
    const normalizedPrice = price.replace(/[^\d.]/g, '')
    return Number.parseFloat(normalizedPrice)
}

export const calculateDiscountPercentage = (currentPrice: number, oldPrice: string): number => {
    const previousPrice = parseOfferPrice(oldPrice)

    if (!Number.isFinite(previousPrice) || previousPrice <= currentPrice) {
        return 0
    }

    return Math.round(((previousPrice - currentPrice) / previousPrice) * 100)
}

export function enrichWithOffer(product: Product): ProductWithOffer {
    const offer = offersData.find(o => o.id === product.id)
    if (!offer) return { ...product }
    const discount = calculateDiscountPercentage(product.precio, offer.oldPrice)
    return {
        ...product,
        oldPrice: offer.oldPrice,
        discountPercentage: discount > 0 ? discount : undefined,
    }
}
