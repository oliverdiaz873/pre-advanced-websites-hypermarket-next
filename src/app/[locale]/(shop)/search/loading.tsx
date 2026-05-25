/**
 * Loading Skeleton - Página de Búsqueda
 * 
 * Muestra skeleton loadings mientras se carga los resultados de búsqueda.
 * NOTA: El Header ya está en el layout global y no se incluye aquí.
 */

import { ProductsGridSkeleton } from '@/ui/Skeleton'

export default function Loading() {
    return (
        <>
            {/* Información de Búsqueda - Header ya está en el layout */}
            <div className="w-full bg-white px-4 md:px-8 py-4 md:py-6 border-b border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-2">
                        <div className="h-6 w-80 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Filtros y Resultados */}
            <div className="w-full bg-gray-50 py-6 md:py-8">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Filtros Sidebar */}
                        <div className="hidden lg:block space-y-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-white p-4 rounded-lg">
                                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-3" />
                                    <div className="space-y-2">
                                        {[...Array(5)].map((_, j) => (
                                            <div key={j} className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Resultados */}
                        <div className="lg:col-span-3">
                            <ProductsGridSkeleton count={12} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
