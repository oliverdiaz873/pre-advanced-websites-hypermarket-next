"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Drawer from '@/src/shared/components/Drawer/Drawer';
import ProductGrid from '@/src/features/products/components/ProductGrid';
import OfferFilters from '@/src/features/offers/components/OfferFilters';
import EmptyOffers from '@/src/features/offers/components/EmptyOffers';
import { useOfferFilters } from '@/src/features/offers/hooks/useOfferFilters';
import './OffersPageClient.css';

export default function OffersPageClient() {
    const { t } = useTranslation(['offers', 'categories']);
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
        <div className="offers-page-wrapper">
            <section className="mx-auto w-full max-w-7xl px-2 pt-1 pb-8 md:px-6">
                <div className="offers-header-container flex items-center justify-between gap-4">
                    <h1 className="text-3xl md:text-4xl offers-header__title gap-1">
                        <svg className="offers-header__icon">
                            <use href="#icon-fire" />
                        </svg>
                        {t('header.title')}
                    </h1>
                    <button
                        className="offers-mobile-filters-btn lg:hidden"
                        type="button"
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <svg className="offers-mobile-filters-btn__icon">
                            <use href="#icon-sliders" />
                        </svg>
                        <span>{t('header.filter_btn')}</span>
                        {selectedCategory !== 'all' && (
                            <span className="offers-mobile-filters-active-chip">
                                {t(`categories:${selectedCategory}`)}
                            </span>
                        )}
                    </button>
                </div>

                <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                    <aside className="hidden lg:block">{filters}</aside>
                    <div>
                        {sortedProducts.length > 0 ? (
                            <ProductGrid
                                className="offers-grid"
                                products={sortedProducts.map((product) => ({ ...product, isOffer: true }))}
                            />
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
        </div>
    );
}
