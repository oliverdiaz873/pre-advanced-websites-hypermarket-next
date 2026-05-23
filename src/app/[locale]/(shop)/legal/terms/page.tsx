import type { Metadata } from 'next';
import LegalPageClient from '@/features/legal/components/LegalPageClient';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('legal');
    return {
        title: `${t('terms.seo.title')} | Hipermercado Superior`,
        description: t('terms.seo.description'),
        keywords: t('terms.seo.keywords'),
    };
}

export default function TermsPage() {
    return <LegalPageClient type="terms" />;
}
