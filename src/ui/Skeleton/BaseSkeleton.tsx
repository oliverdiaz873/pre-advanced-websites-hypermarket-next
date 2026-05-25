/**
 * BaseSkeleton - Componente base para crear skeletons
 * 
 * Proporciona un skeleton simple con animación de pulse.
 * Reutilizable para diferentes formas y tamaños.
 */

interface BaseSkeletonProps {
    className?: string
    shape?: 'rectangle' | 'circle'
}

export const BaseSkeleton = ({ 
    className = 'w-full h-10', 
    shape = 'rectangle' 
}: BaseSkeletonProps) => {
    const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-lg'
    
    return (
        <div 
            className={`${className} ${shapeClass} bg-gray-200 animate-pulse`}
            role="status"
            aria-label="Loading"
        />
    )
}

export default BaseSkeleton
