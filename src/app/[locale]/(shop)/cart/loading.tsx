/**
 * Loading Skeleton - Página del Carrito
 * 
 * Muestra skeleton loadings mientras se carga la página del carrito.
 * NOTA: El Header ya está en el layout global y no se incluye aquí.
 */


export default function Loading() {
    return (
        <>
            {/* Contenido Principal - Header ya está en el layout */}
            <div className="w-full bg-gray-50 min-h-screen px-4 md:px-8 py-6 md:py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Lista de Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Título */}
                            <div className="mb-6">
                                <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
                            </div>

                            {/* Items del Carrito */}
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white p-4 md:p-6 rounded-lg space-y-4"
                                >
                                    <div className="flex gap-4">
                                        {/* Imagen */}
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-lg animate-pulse shrink-0" />

                                        {/* Detalles */}
                                        <div className="flex-1 space-y-2">
                                            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
                                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                                            <div className="h-5 w-24 bg-gray-300 rounded animate-pulse" />
                                        </div>

                                        {/* Controles */}
                                        <div className="flex flex-col justify-between items-end">
                                            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
                                            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Resumen de Orden */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-lg space-y-4 sticky top-24">
                                {/* Título */}
                                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />

                                {/* Líneas */}
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex justify-between">
                                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                ))}

                                {/* Total */}
                                <div className="border-t border-gray-200 pt-4 space-y-2">
                                    <div className="flex justify-between">
                                        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-5 w-24 bg-gray-300 rounded animate-pulse" />
                                    </div>
                                </div>

                                {/* Botón de Pago */}
                                <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse mt-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
