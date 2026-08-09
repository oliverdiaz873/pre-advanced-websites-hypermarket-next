"use client";

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import AddToCartButton from '@/features/cart/components/AddToCartButton';
import ProductGrid from '@/features/products/components/ProductGrid';
import EmptySearchResults from '@/features/search/components/EmptySearchResults';
import { enrichWithOffer, OfferBadge } from '@/features/offers';
import type { ProductWithOffer } from '@/features/offers';
import type { Product } from '@/types/product';

interface SearchPageClientProps {
    query: string;
    results: Product[];
    error: boolean;
}

export default function SearchPageClient({ query, results, error }: SearchPageClientProps) {
    const t = useTranslations('search');

    const enrichedResults: ProductWithOffer[] = useMemo(() => {
        return results.map(enrichWithOffer);
    }, [results]);

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
                        ? t('hero.summary_query', { count: enrichedResults.length })
                        : t('hero.summary_empty')}
                </p>
            </div>

            {error ? (
                <EmptySearchResults query={query} error />
            ) : enrichedResults.length > 0 ? (
                <ProductGrid
                    products={enrichedResults}
                    renderBadge={(product) => {
                        const enriched = product as ProductWithOffer
                        return enriched.discountPercentage ? (
                            <OfferBadge discountPercentage={enriched.discountPercentage} />
                        ) : null
                    }}
                    renderAction={(product) => <AddToCartButton product={product} />}
                />
            ) : (
                <EmptySearchResults query={query} />
            )}
        </section>
    );
}