"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import AddToCartButton from '@/features/cart/components/AddToCartButton';
import Drawer from '@/ui/Drawer/Drawer';
import ProductGrid from '@/features/products/components/ProductGrid';
import { FireIcon, SlidersIcon } from '@/ui/Icons';
import { OfferBadge } from '@/features/offers/components';
import { EmptyState } from '@/ui';
import OfferFilters from '@/features/offers/components/OfferFilters';
import EmptyOffers from '@/features/offers/components/EmptyOffers';
import { useOfferFilters } from '@/features/offers/hooks/useOfferFilters';
import type { Category } from '@/types/category';
import type { OfferProduct } from '@/lib/api-client';
import './OffersPageClient.css';

interface OffersPageClientProps {
    categories: Category[]
    offers: OfferProduct[]
    error: boolean
}

export default function OffersPageClient({ categories, offers, error }: OffersPageClientProps) {
    const t = useTranslations('offers');
    const tCategories = useTranslations('categories');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const {
        offerProducts,
        filteredProducts,
        sortedProducts,
        selectedCategory,
        onCategoryChange,
    } = useOfferFilters(offers, categories);

    const filters = (
        <OfferFilters
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            totalProducts={offerProducts.length}
            filteredProducts={filteredProducts.length}
            categories={categories}
        />
    );

    if (error) {
        return (
            <div className="offers-page-wrapper">
                <section className="mx-auto w-full max-w-7xl px-2 pt-1 pb-8 md:px-6 min-h-[60vh] flex flex-col">
                    <div className="offers-header-container flex items-center justify-between gap-4">
                        <h1 className="text-3xl md:text-4xl offers-header__title gap-1">
                            <FireIcon className="offers-header__icon" />
                            {t('header.title')}
                        </h1>
                    </div>
                    <div className="flex-1 flex items-start justify-center">
                        <EmptyState
                            title={t('error_state.title')}
                            description={t('error_state.message')}
                        />
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="offers-page-wrapper">
            <section className="mx-auto w-full max-w-7xl px-2 pt-1 pb-8 md:px-6 min-h-[60vh] flex flex-col">
                <div className="offers-header-container flex items-center justify-between gap-4">
                    <h1 className="text-3xl md:text-4xl offers-header__title gap-1">
                        <FireIcon className="offers-header__icon" />
                        {t('header.title')}
                    </h1>
                    <button
                        className="offers-mobile-filters-btn lg:hidden"
                        type="button"
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <SlidersIcon className="offers-mobile-filters-btn__icon" />
                        <span>{t('header.filter_btn')}</span>
                        {selectedCategory !== 'all' && (
                            <span className="offers-mobile-filters-active-chip">
                                {tCategories(selectedCategory)}
                            </span>
                        )}
                    </button>
                </div>

                <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] flex-1">
                    <aside className="hidden lg:block">{filters}</aside>
                    <div className="flex flex-col">
                        {sortedProducts.length > 0 ? (
                            <ProductGrid
                                className="offers-grid"
                                products={sortedProducts}
                                renderBadge={(product) => (
                                    <OfferBadge
                                        discountPercentage={(product as OfferProduct).discountPercentage}
                                    />
                                )}
                                renderAction={(product) => <AddToCartButton product={product} />}
                            />
                        ) : (
                            <div className="flex-1 flex items-start justify-center">
                                <EmptyOffers />
                            </div>
                        )}
                    </div>
                </div>

                <Drawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    title={t('filters.title')}
                >
                    <OfferFilters
                        selectedCategory={selectedCategory}
                        onCategoryChange={(category) => {
                            onCategoryChange(category);
                            setIsDrawerOpen(false);
                        }}
                        totalProducts={offerProducts.length}
                        filteredProducts={filteredProducts.length}
                        isDrawer
                        categories={categories}
                    />
                </Drawer>
            </section>
        </div>
    );
}