/**
 * OfferCardSkeleton - Skeleton para una tarjeta de oferta
 * 
 * Replica exactamente el diseño real con:
 * - Badge de oferta en posición absolute esquina superior izquierda
 * - Gradiente de fuego: #ff6b35 a #ffcc00
 * - Badge: 10px top, 12px left en mobile / 12px top, 14px left desktop
 * - Estructura idéntica a ProductCard pero con badge
 */

export const OfferCardSkeleton = () => {
    return (
        <article className="producto product-card offer-card snap-start bg-white p-3 md:p-5 rounded-xl w-40 md:w-55 min-h-[300px] md:min-h-[350px] flex flex-col justify-start transition-all duration-400 relative overflow-hidden">
            {/* Badge de oferta - posición absolute */}
            <div className="absolute top-2.5 left-3 md:top-3 md:left-3.5 z-10 bg-linear-to-r from-orange-500 to-yellow-400 text-white px-2 py-1 md:px-2.5 md:py-1 rounded-full flex items-center gap-1 animate-pulse">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-yellow-300 rounded-full" />
                <span className="text-xs md:text-sm font-bold">OFERTA</span>
            </div>

            {/* Imagen contenedor - 120px mobile, 150px desktop */}
            <div className="w-full h-[120px] md:h-[150px] bg-gray-300 rounded-lg mb-3 flex items-center justify-center animate-pulse" />

            {/* Bloque de precios */}
            <div className="flex flex-col w-full mb-2 animate-pulse">
                {/* Precio nuevo (rojo) + viejo (tachado) */}
                <div className="flex items-baseline gap-2 mb-1">
                    <div className="h-5 md:h-6 w-20 md:w-28 bg-red-400 rounded" />
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

            {/* Botón Add to Cart */}
            <div className="h-8 bg-gray-300 rounded-lg mt-auto animate-pulse" />
        </article>
    )
}

/**
 * OffersGridSkeleton - Skeleton para la sección de ofertas
 * 
 * Replica exactamente la estructura de OfferBadge y sección.
 * - Título con ícono de fuego
 * - Grid con mismo spacing que ProductCarouselSection
 */
export const OffersGridSkeleton = ({ count = 8 }: { count?: number }) => {
    return (
        <section className="product-carousel-section bg-white px-2 md:px-8 py-2 md:py-6 mb-6 md:mb-6 w-full border-t border-gray-200">
            <div className="w-full">
                {/* Encabezado con ícono + título */}
                <div className="mb-4 md:mb-6 flex items-center gap-3">
                    {/* Icono de fuego simulado */}
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-linear-to-br from-orange-500 to-yellow-400 rounded-full animate-pulse" />
                    {/* Título */}
                    <div className="h-6 md:h-7 w-40 md:w-48 bg-gray-300 rounded-3xl animate-pulse" />
                </div>

                {/* Grid de ofertas */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                    {[...Array(count)].map((_, i) => (
                        <OfferCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OfferCardSkeleton
