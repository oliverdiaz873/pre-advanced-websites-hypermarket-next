import type { Metadata } from 'next';
import OffersPageClient from '@/features/offers/components/OffersPageClient';
import { getTranslations } from 'next-intl/server';
import { fetchCategories } from '@/lib/api-client';

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
    return <OffersPageClient categories={categories} />;
}
