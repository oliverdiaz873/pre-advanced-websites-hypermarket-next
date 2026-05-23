import React from 'react';
import { Link } from '@/i18n/routing';

interface EmptyStateProps {
    /** Título principal del estado vacío */
    title: string;
    /** Descripción detallada o mensaje informativo */
    description?: string;
    /** Icono SVG o componente de icono */
    icon?: React.ReactNode;
    /** Texto del botón de acción */
    actionLabel?: string;
    /** URL para el botón de acción (usa Next.js Link) */
    actionHref?: string;
    /** Función a ejecutar al hacer clic en el botón de acción */
    onAction?: () => void;
    /** Clases CSS adicionales para personalización */
    className?: string;
}

/**
 * EmptyState - Componente compartido para estados vacíos
 * 
 * Proporciona una interfaz unificada para mostrar cuando no hay datos
 * en carritos, búsquedas, ofertas o cualquier lista.
 * 
 * Este componente es orquestado por componentes especializados como:
 * - EmptyCart: Estado vacío del carrito de compras.
 * - EmptyOffers: Estado cuando no hay ofertas disponibles.
 * - EmptySearchResults: Estado para resultados de búsqueda inexistentes.
 */
const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    icon,
    actionLabel,
    actionHref,
    onAction,
    className = "",
}) => {
    return (
        <div className={`flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-2xl border border-neutral-200 bg-white shadow-sm max-w-2xl mx-auto w-full transition-all duration-300 ${className}`}>
            {icon && (
                <div className="mb-6 flex items-center justify-center text-neutral-300 w-16 h-16 md:w-20 md:h-20">
                    {icon}
                </div>
            )}
            
            <h2 className="text-xl md:text-2xl font-bold text-neutral-950 mb-3 leading-tight">
                {title}
            </h2>
            
            {description && (
                <p className="text-sm md:text-base text-neutral-600 mb-8 max-w-md mx-auto leading-relaxed">
                    {description}
                </p>
            )}
            
            {actionLabel && (actionHref || onAction) && (
                <div className="mt-2">
                    {actionHref ? (
                        <Link 
                            href={actionHref}
                            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-neutral-950 text-white text-sm md:text-base font-semibold hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            {actionLabel}
                        </Link>
                    ) : (
                        <button
                            onClick={onAction}
                            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-neutral-950 text-white text-sm md:text-base font-semibold hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                        >
                            {actionLabel}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default EmptyState;
