"use client";

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import AddToCartButton from '@/features/cart/components/AddToCartButton';
import ProductGrid from '@/features/products/components/ProductGrid';
import EmptySearchResults from '@/features/search/components/EmptySearchResults';
import { products } from '@/services/catalog/products';
import { normalizarTexto } from '@/lib/searchUtils';

interface SearchPageClientProps {
    query: string;
}

export default function SearchPageClient({ query }: SearchPageClientProps) {
    const t = useTranslations('search');
    const tProducts = useTranslations('products');
    const normalizedQuery = normalizarTexto(query);

    const results = useMemo(() => {
        if (!normalizedQuery) return [];

        return products.filter((product) => {
            const translationKey = `${product.id}.name`;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const translatedName = tProducts.has(translationKey as any) ? tProducts(translationKey as any) : product.name;

            return [
                product.name,
                translatedName,
            ].some((value) => value && normalizarTexto(value).includes(normalizedQuery));
        });
    }, [normalizedQuery, tProducts]);

    return (
        <section className="mx-auto w-full max-w-7xl px-4 pt-4 pb-8 md:px-6 md:pt-6 min-h-[60vh] flex flex-col">
            <div className="mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-neutral-900 leading-tight">
                    {query
                        ? t('hero.title_query', { query })
                        : t('hero.title_empty')}
                </h1>
                <p className="mt-1.5 text-sm md:text-base text-neutral-600">
                    {query
                        ? t('hero.summary_query', { count: results.length })
                        : t('hero.summary_empty')}
                </p>
            </div>

            {results.length > 0 ? (
                <ProductGrid
                    products={results}
                    renderAction={(product) => <AddToCartButton product={product} />}
                />
            ) : (
                <EmptySearchResults query={query} />
            )}
        </section>
    );
}
