import type { Metadata } from 'next';
import LegalPageClient from '@/features/legal/components/LegalPageClient';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('legal');
    return {
        title: t('privacy.seo.title'),
        description: t('privacy.seo.description'),
        keywords: t('privacy.seo.keywords'),
    };
}

export default function PrivacyPage() {
    return <LegalPageClient type="privacy" />;
}
