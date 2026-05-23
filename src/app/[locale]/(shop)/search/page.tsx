import type { Metadata } from 'next';
import SearchPageClient from '@/features/search/components/SearchPageClient';
import { getTranslations } from 'next-intl/server';

type SearchPageProps = {
    searchParams: Promise<{ q?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
    const params = await searchParams;
    const query = Array.isArray(params.q) ? params.q[0] : params.q;
    const t = await getTranslations('search');

    return {
        title: query
            ? `${t('seo.title_query', { query })} | Hipermercado Superior`
            : `${t('seo.title_empty')} | Hipermercado Superior`,
        description: query ? t('seo.desc_query', { query }) : t('seo.desc_empty'),
        keywords: t('seo.keywords'),
    };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = Array.isArray(params.q) ? params.q[0] ?? '' : params.q ?? '';

    return <SearchPageClient query={query} />;
}
