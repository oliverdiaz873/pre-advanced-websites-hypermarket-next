/**
 * HeroBannerSkeleton - Skeleton para el Hero Carousel/Banner
 * 
 * Replica exactamente el diseño real con:
 * - Aspect ratio 3/1.1 en mobile
 * - Aspect ratio 3/1 en desktop
 * - Box-shadow idéntica: 0 10px 30px rgba(0, 0, 0, 0.3)
 * - Padding y márgenes del contenedor
 * - Min-height: 200px mobile, 350px desktop
 */

export const HeroBannerSkeleton = () => {
    return (
        <section className="hero-carousel-section w-full bg-white px-2 py-1 mb-4 md:px-8 md:py-2 md:mb-4 md:max-w-[1400px] md:mx-auto">
            <div className="hero-carousel-container max-w-full bg-gray-300 rounded-[20px] overflow-hidden animate-pulse relative md:aspect-3/1 md:min-h-[350px]"
                style={{ 
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    aspectRatio: '3 / 1.1',
                    minHeight: '200px'
                }}
            >
                {/* Overlay gradient simulando contenido */}
                <div className="absolute inset-0 bg-linear-to-r from-gray-400 via-gray-300 to-gray-400" />
                
                {/* Controles simulados - dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="w-2 h-2 md:w-3 md:h-3 bg-gray-400 rounded-full animate-pulse"
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroBannerSkeleton
