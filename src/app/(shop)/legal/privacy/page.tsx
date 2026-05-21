import type { Metadata } from 'next';
import LegalPageClient from '@/features/legal/components/LegalPageClient';
import legalEs from '@/public/locales/es/legal.json';

export const metadata: Metadata = {
    title: `${legalEs.privacy.seo.title} | Hipermercado Superior`,
    description: legalEs.privacy.seo.description,
    keywords: legalEs.privacy.seo.keywords,
};

export default function PrivacyPage() {
    return <LegalPageClient type="privacy" />;
}
