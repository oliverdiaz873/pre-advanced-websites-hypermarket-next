/**
 * Loading Skeleton - Página de Contacto
 * 
 * Muestra skeleton loadings mientras se carga la página de contacto.
 * NOTA: El Header ya está en el layout global y no se incluye aquí.
 */

export default function Loading() {
    return (
        <div className="w-full">
            <main className="flex-1 pt-0 pb-4 md:pt-0 md:pb-8">
                <div className="mx-auto w-full max-w-7xl px-4 pt-4 pb-8 md:px-6 md:pt-6 min-h-[60vh] flex flex-col">
                    {/* Título */}
                    <div className="mb-6">
                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-4 w-full max-w-2xl bg-gray-200 rounded animate-pulse" />
                    </div>

                    {/* Formulario */}
                    <div className="max-w-2xl mx-auto w-full space-y-6">
                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-4" />
                        
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
                            </div>
                        ))}

                        <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
            </main>
        </div>
    )
}
