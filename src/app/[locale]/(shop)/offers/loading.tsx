/**
 * Loading Skeleton - Página de Ofertas
 * 
 * Muestra skeleton loadings mientras se carga la página de ofertas.
 * NOTA: El Header ya está en el layout global y no se incluye aquí.
 */

import { OffersGridSkeleton } from '@/ui/Skeleton'

export default function Loading() {
    return (
        <>
            {/* Encabezado de Página - Header ya está en el layout */}
            <div className="w-full bg-linear-to-r from-red-50 to-yellow-50 px-4 md:px-8 py-8 md:py-12">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse" />
                    </div>
                    <div className="h-10 md:h-12 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
                    <div className="h-5 w-96 bg-gray-200 rounded animate-pulse mx-auto" />
                </div>
            </div>

            {/* Filtros y Ofertas */}
            <div className="w-full bg-white py-8 md:py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Filtros */}
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="px-4 py-2 bg-gray-200 rounded-full h-10 w-24 animate-pulse"
                            />
                        ))}
                    </div>

                    {/* Grid de Ofertas */}
                    <OffersGridSkeleton count={12} />
                </div>
            </div>
        </>
    )
}
