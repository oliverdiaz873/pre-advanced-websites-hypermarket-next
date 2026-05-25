/**
 * CategoriesSkeleton - Skeleton para la sección de Categorías
 * 
 * Replica el diseño real con:
 * - Grid responsive: 3-6 columnas según viewport
 * - Categorías con icono + nombre
 * - Padding y spacing idénticos al diseño real
 */

export const CategoriesSkeleton = () => {
    return (
        <section className="product-carousel-section bg-white px-2 md:px-8 py-3 md:py-6 mb-6 md:mb-6 w-full border-t border-gray-200">
            <div className="w-full">
                {/* Título */}
                <div className="mb-4 md:mb-6">
                    <div className="h-6 md:h-7 w-40 md:w-48 bg-gray-300 rounded-3xl animate-pulse inline-block" />
                </div>

                {/* Grid de categorías */}
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors animate-pulse"
                        >
                            {/* Icono/Imagen */}
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-lg" />
                            
                            {/* Nombre de categoría */}
                            <div className="w-full">
                                <div className="h-3 md:h-4 bg-gray-200 rounded w-5/6 mx-auto" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CategoriesSkeleton
