import { useState, useMemo } from 'react'
import { Product } from '@/types/product'
import { products } from '@/services/catalog/products'
import { calculateDiscountPercentage, offersData } from '@/features/offers'
import { categories } from '@/services/catalog/categories'

interface OfferProduct extends Product {
    oldPrice: string
    discountPercentage: number
}

interface UseOfferFiltersReturn {
    offerProducts: OfferProduct[]
    filteredProducts: OfferProduct[]
    sortedProducts: OfferProduct[]
    selectedCategory: string
    onCategoryChange: (categoryId: string) => void
}

/**
 * Hook para gestionar la lógica de filtrado y ordenamiento de ofertas
 * Encapsula:
 * - Mapeo de offersData a productos con información de descuento
 * - Filtrado por categoría (manejando la conversión de subcategorías)
 * - Ordenamiento por descuento (mayor a menor)
 *
 * @returns Objeto con productos filtrados, estado de categoría seleccionada y callbacks
 */
export const useOfferFilters = (): UseOfferFiltersReturn => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    // Mapeo estable de categorías a subcategorías para evitar re-cálculos innecesarios
    const categoryMap = useMemo(() => {
        const map = new Map<string, string[]>()
        categories.forEach(cat => {
            const subIds = cat.subcategories.map(sub => {
                const parts = sub.href.split('#')
                return parts[1] || ''
            })
            map.set(cat.id, subIds)
        })
        return map
    }, [])

    // Obtener productos en oferta con información de descuento (Base)
    const offerProducts: OfferProduct[] = useMemo(() => {
        return offersData
            .map((off) => {
                const product = products.find((p) => p.id === off.id)
                if (!product) return null
                
                return {
                    ...product,
                    oldPrice: off.oldPrice,
                    discountPercentage: calculateDiscountPercentage(product.precio, off.oldPrice),
                }
            })
            .filter((p): p is OfferProduct => p !== null)
    }, [])

    // Lógica de filtrado reactiva
    const filteredProducts: OfferProduct[] = useMemo(() => {
        if (selectedCategory === 'all') return offerProducts

        const allowedSubcategories = categoryMap.get(selectedCategory) || []
        
        return offerProducts.filter((p) => 
            allowedSubcategories.includes(p.categoria)
        )
    }, [offerProducts, selectedCategory, categoryMap])

    // Ordenamiento final por porcentaje de descuento
    const sortedProducts: OfferProduct[] = useMemo(() => {
        return [...filteredProducts].sort((a, b) => b.discountPercentage - a.discountPercentage)
    }, [filteredProducts])

    return {
        offerProducts,
        filteredProducts,
        sortedProducts,
        selectedCategory,
        onCategoryChange: setSelectedCategory,
    }
}
