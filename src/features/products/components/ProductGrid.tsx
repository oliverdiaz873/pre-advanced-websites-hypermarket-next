/**
 * Componente reutilizable para mostrar una cuadrícula de productos.
 * Utilizado en páginas como Búsqueda y Ofertas para mantener la consistencia visual.
 */
import ProductCard from './ProductCard'
import { ReactNode } from 'react'
import { Product } from '@/types/product'
import './ProductGrid.css'

interface ProductGridProps {
    products: Product[]
    className?: string
    renderBadge?: (product: Product) => ReactNode
    renderAction?: (product: Product) => ReactNode
}

const ProductGrid = ({ products, className = '', renderBadge, renderAction }: ProductGridProps) => {
    return (
        <div className={`product-grid ${className}`}>
            {products.map((product) => {
                const badge = renderBadge?.(product)

                return (
                    <ProductCard
                        key={product.id}
                        product={product}
                        isOffer={Boolean(badge)}
                        oldPrice={'oldPrice' in product ? product.oldPrice as string | undefined : undefined}
                        badge={badge}
                        action={renderAction?.(product)}
                    />
                )
            })}
        </div>
    )
}

export default ProductGrid
