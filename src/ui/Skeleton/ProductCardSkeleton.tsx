/**
 * ProductCardSkeleton - Skeleton para una tarjeta de producto individual
 * 
 * Replica exactamente el diseño real de ProductCard.
 * Dimensiones: 160px ancho, 300px min-height en mobile
 *              220px ancho, 350px min-height en desktop
 * Padding: 12px (mobile) / 20px (desktop)
 * Border-radius: 12px
 */

export const ProductCardSkeleton = () => {
    return (
        <article className="producto product-card snap-start bg-white p-3 md:p-5 rounded-xl w-40 md:w-55 min-h-[300px] md:min-h-[350px] flex flex-col justify-start transition-all duration-400 relative overflow-hidden">
            {/* Imagen contenedor - 120px mobile, 150px desktop */}
            <div className="w-full h-[120px] md:h-[150px] bg-gray-300 rounded-lg mb-3 flex items-center justify-center animate-pulse" />

            {/* Bloque de precios */}
            <div className="flex flex-col w-full mb-2 animate-pulse">
                {/* Precio nuevo + viejo */}
                <div className="flex items-baseline gap-2 mb-1">
                    <div className="h-5 md:h-6 w-20 md:w-28 bg-gray-400 rounded" />
                    <div className="h-3 md:h-4 w-16 md:w-20 bg-gray-300 rounded" />
                </div>
                {/* Formato unitario */}
                <div className="h-3 w-24 bg-gray-200 rounded" />
            </div>

            {/* Título - 3 líneas de texto */}
            <div className="space-y-1.5 mb-3 animate-pulse">
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
                <div className="h-3 bg-gray-200 rounded w-4/5" />
            </div>

            {/* Botón Add to Cart - 32px alto como el real */}
            <div className="h-8 bg-gray-300 rounded-lg mt-auto animate-pulse" />
        </article>
    )
}

/**
 * ProductsGridSkeleton - Skeleton para una grilla de productos
 * 
 * Replica exactamente ProductCarouselSection con:
 * - Título con fondo gris claro (f8f9fa)
 * - Padding y márgenes idénticos al diseño real
 * - Border-top gris como separador
 */
export const ProductsGridSkeleton = ({ count = 8 }: { count?: number }) => {
    return (
        <section className="product-carousel-section bg-white px-2 md:px-8 py-2 md:py-6 mb-6 md:mb-6 w-full border-t border-gray-200">
            <div className="w-full">
                {/* Título con background gris claro - 20px mobile, 24px desktop */}
                <div className="mb-4 md:mb-6">
                    <div className="h-6 md:h-7 w-40 md:w-48 bg-gray-300 rounded-3xl inline-block animate-pulse" />
                </div>

                {/* Grid de productos con spacing correcto */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                    {[...Array(count)].map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProductCardSkeleton
