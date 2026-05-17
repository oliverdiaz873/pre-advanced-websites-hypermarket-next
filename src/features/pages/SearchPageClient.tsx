"use client";

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ProductGrid from '@/src/features/products/components/ProductGrid';
import { products } from '@/src/data/products';
import { normalizarTexto } from '@/src/shared/utils/searchUtils';

interface SearchPageClientProps {
    query: string;
}

export default function SearchPageClient({ query }: SearchPageClientProps) {
    const { t } = useTranslation(['search', 'products']);
    const normalizedQuery = normalizarTexto(query);

    const results = useMemo(() => {
        if (!normalizedQuery) return [];

        return products.filter((product) => {
            const translatedName = t(`products:${product.id}.name`, { defaultValue: product.nombre });

            return [
                product.nombre,
                translatedName,
            ].some((value) => value && normalizarTexto(value).includes(normalizedQuery));
        });
    }, [normalizedQuery, t]);

    return (
        <section className="mx-auto w-full max-w-7xl px-4 pt-4 pb-8 md:px-6 md:pt-6 min-h-[60vh] flex flex-col">
            <div className="mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-neutral-900 leading-tight">
                    {query
                        ? t('search:hero.title_query', { query })
                        : t('search:hero.title_empty')}
                </h1>
                <p className="mt-1.5 text-sm md:text-base text-neutral-600">
                    {query
                        ? t('search:hero.summary_query', { count: results.length })
                        : t('search:hero.summary_empty')}
                </p>
            </div>

            {results.length > 0 ? (
                <ProductGrid products={results} />
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full rounded border border-neutral-200 bg-white p-12 text-center shadow-sm">
                        <h2 className="text-xl font-semibold text-neutral-950">
                            {query
                                ? t('search:empty_state.no_results.title')
                                : t('search:empty_state.start_search.title')}
                        </h2>
                        <p className="mt-2 text-neutral-600">
                            {query
                                ? t('search:empty_state.no_results.desc')
                                : t('search:empty_state.start_search.desc')}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
