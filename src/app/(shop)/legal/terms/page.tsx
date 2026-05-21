import type { Metadata } from 'next';
import LegalPageClient from '@/features/legal/components/LegalPageClient';
import legalEs from '@/public/locales/es/legal.json';

export const metadata: Metadata = {
    title: `${legalEs.terms.seo.title} | Hipermercado Superior`,
    description: legalEs.terms.seo.description,
    keywords: legalEs.terms.seo.keywords,
};

export default function TermsPage() {
    return <LegalPageClient type="terms" />;
}
