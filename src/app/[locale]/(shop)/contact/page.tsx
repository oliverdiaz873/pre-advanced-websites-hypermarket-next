import type { Metadata } from 'next';
import ContactPageClient from '@/features/contact/components/ContactPageClient';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('contact');
    return {
        title: t('seo.title'),
        description: t('seo.description'),
        keywords: t('seo.keywords'),
    };
}

export default function ContactPage() {
    return <ContactPageClient />;
}
