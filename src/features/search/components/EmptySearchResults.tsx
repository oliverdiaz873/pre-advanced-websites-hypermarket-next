import React from 'react';
import { useTranslations } from 'next-intl';
import { EmptyState } from '@/ui';

interface EmptySearchResultsProps {
    /** La consulta de búsqueda que no arrojó resultados */
    query?: string;
    /** La búsqueda falló (error del API) en lugar de no tener resultados */
    error?: boolean;
}

/**
 * EmptySearchResults - Componente para estados vacíos en la página de búsqueda
 * 
 * Se muestra cuando una búsqueda no tiene resultados, cuando el API falla
 * (variante `error`) o cuando la página se carga sin una consulta inicial.
 */
const EmptySearchResults: React.FC<EmptySearchResultsProps> = ({ query, error = false }) => {
    const t = useTranslations('search');

    const title = error
        ? t('empty_state.error.title')
        : query
            ? t('empty_state.no_results.title')
            : t('empty_state.start_search.title');

    const description = error
        ? t('empty_state.error.desc')
        : query
            ? t('empty_state.no_results.desc')
            : t('empty_state.start_search.desc');

    return (
        <div className="flex-1 flex items-center justify-center py-12">
            <EmptyState
                title={title}
                description={description}
                icon={
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                }
                className="bg-neutral-50 border-none shadow-none"
            />
        </div>
    );
};

export default EmptySearchResults;
