import type { Metadata } from 'next';
import OffersPageClient from '@/features/offers/components/OffersPageClient';
import offersEs from '@/public/locales/es/offers.json';

export const metadata: Metadata = {
    title: `${offersEs.seo.title} | Hipermercado Superior`,
    description: offersEs.seo.description,
    keywords: offersEs.seo.keywords,
};

export default function OffersPage() {
    return <OffersPageClient />;
}
