/**
 * Loading Skeleton - Página de Detalle de Producto
 * 
 * Muestra skeleton loadings mientras se carga los detalles de un producto.
 * NOTA: El Header ya está en el layout global y no se incluye aquí.
 */

import { ProductsGridSkeleton } from '@/ui/Skeleton'

export default function Loading() {
    return (
        <>
            {/* Breadcrumb - Header ya está en el layout */}
            <div className="w-full bg-white px-4 md:px-8 py-4">
                <div className="max-w-7xl mx-auto">
                    <div className="h-5 w-56 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="w-full bg-white px-4 md:px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
                        {/* Galería de Imágenes */}
                        <div className="space-y-4">
                            {/* Imagen Principal */}
                            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />

                            {/* Miniaturas */}
                            <div className="grid grid-cols-4 gap-2">
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Información del Producto */}
                        <div className="space-y-6">
                            {/* Nombre */}
                            <div className="space-y-2">
                                <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                            </div>

                            {/* Precios */}
                            <div className="space-y-2 py-4 border-y border-gray-200">
                                <div className="h-6 w-32 bg-gray-300 rounded animate-pulse" />
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                            </div>

                            {/* Descripción */}
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
                            </div>

                            {/* Controles de Cantidad y Botón */}
                            <div className="space-y-3 pt-4">
                                <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
                                <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Productos Relacionados */}
                    <div className="border-t border-gray-200 pt-8">
                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
                        <ProductsGridSkeleton count={6} />
                    </div>
                </div>
            </div>
        </>
    )
}
