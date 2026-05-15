"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Drawer from '@/src/shared/components/Drawer/Drawer';
import ProductGrid from '@/src/features/products/components/ProductGrid';
import OfferFilters from '@/src/features/offers/components/OfferFilters';
import EmptyOffers from '@/src/features/offers/components/EmptyOffers';
import { useOfferFilters } from '@/src/features/offers/hooks/useOfferFilters';

export default function OffersPageClient() {
    const { t } = useTranslation('offers');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const {
        offerProducts,
        filteredProducts,
        sortedProducts,
        selectedCategory,
        onCategoryChange,
    } = useOfferFilters();

    const filters = (
        <OfferFilters
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            totalProducts={offerProducts.length}
            filteredProducts={filteredProducts.length}
        />
    );

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
            <div className="mb-6 flex items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-neutral-950">{t('header.title')}</h1>
                <button
                    className="rounded bg-neutral-950 px-4 py-2 text-sm font-semibold text-white lg:hidden"
                    type="button"
                    onClick={() => setIsDrawerOpen(true)}
                >
                    {t('header.filter_btn')}
                </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                <aside className="hidden lg:block">{filters}</aside>
                <div>
                    {sortedProducts.length > 0 ? (
                        <ProductGrid products={sortedProducts.map((product) => ({ ...product, isOffer: true }))} />
                    ) : (
                        <EmptyOffers />
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
                />
            </Drawer>
        </section>
    );
}
