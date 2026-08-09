import type { Metadata } from 'next';
import OffersPageClient from '@/features/offers/components/OffersPageClient';
import { getTranslations, getLocale } from 'next-intl/server';
import { fetchCategories, getOffers, mapApiOfferToOfferProduct, type ApiLang, type OfferProduct } from '@/lib/api-client';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('offers');
    return {
        title: t('seo.title'),
        description: t('seo.description'),
        keywords: t('seo.keywords'),
    };
}

export default async function OffersPage() {
    // F5.3: categorías reales desde el backend para el filtro de ofertas
    const categories = await fetchCategories();

    // F5.4: ofertas reales desde GET /offers (única fuente de verdad del badge).
    const locale = (await getLocale()) as ApiLang;
    let offers: OfferProduct[] = [];
    let error = false;
    try {
        const { data } = await getOffers(locale);
        offers = data.map(mapApiOfferToOfferProduct);
    } catch {
        error = true;
    }

    return <OffersPageClient categories={categories} offers={offers} error={error} />;
}
