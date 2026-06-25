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
