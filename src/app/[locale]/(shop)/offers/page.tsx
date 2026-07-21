import type { Metadata } from 'next';
import OffersPageClient from '@/features/offers/components/OffersPageClient';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('offers');
    return {
        title: t('seo.title'),
        description: t('seo.description'),
        keywords: t('seo.keywords'),
    };
}

export default function OffersPage() {
    return <OffersPageClient />;
}
