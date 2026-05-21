import type { Metadata } from 'next';
import SearchPageClient from '@/features/search/components/SearchPageClient';
import searchEs from '@/public/locales/es/search.json';

type SearchPageProps = {
    searchParams: Promise<{ q?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
    const params = await searchParams;
    const query = Array.isArray(params.q) ? params.q[0] : params.q;

    return {
        title: query
            ? `${searchEs.seo.title_query.replace('{{query}}', query)} | Hipermercado Superior`
            : `${searchEs.seo.title_empty} | Hipermercado Superior`,
        description: query ? searchEs.seo.desc_empty : searchEs.seo.desc_empty,
        keywords: searchEs.seo.keywords,
    };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = Array.isArray(params.q) ? params.q[0] ?? '' : params.q ?? '';

    return <SearchPageClient query={query} />;
}
