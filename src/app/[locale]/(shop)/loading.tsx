/**
 * Loading Skeleton - Página de inicio (Home)
 * 
 * Muestra skeleton loadings mientras se carga el contenido de la página de inicio.
 * Incluye banner, categorías, productos y ofertas.
 * NOTA: El Header ya está en el layout global y no se incluye aquí.
 */

import { 
    HeroBannerSkeleton, 
    CategoriesSkeleton, 
    ProductsGridSkeleton, 
    OffersGridSkeleton 
} from '@/ui/Skeleton'

export default function Loading() {
    return (
        <div className="w-full">
            {/* Main content - Header ya está en el layout */}
            <main className="flex-1 pt-0 pb-4 md:pt-0 md:pb-8">
                {/* Hero Banner Skeleton */}
                <HeroBannerSkeleton />

                {/* Categorías Skeleton */}
                <CategoriesSkeleton />

                {/* Productos Destacados Skeleton */}
                <ProductsGridSkeleton count={8} />

                {/* Ofertas Skeleton */}
                <OffersGridSkeleton count={8} />

                {/* Espaciador */}
                <div className="h-6 md:h-8" />
            </main>
        </div>
    )
}
