import type { Metadata } from 'next';
import ContactPageClient from '@/src/features/pages/ContactPageClient';
import contactEs from '@/public/locales/es/contact.json';

export const metadata: Metadata = {
    title: `${contactEs.seo.title} | Hipermercado Superior`,
    description: contactEs.seo.description,
    keywords: contactEs.seo.keywords,
};

export default function ContactPage() {
    return <ContactPageClient />;
}
