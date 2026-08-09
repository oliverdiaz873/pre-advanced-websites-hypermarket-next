import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import SearchPageClient from '@/features/search/components/SearchPageClient';
import { search, mapApiProductsToProducts, type ApiLang } from '@/lib/api-client';
import type { Product } from '@/types/product';

type SearchPageProps = {
    searchParams: Promise<{ q?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
    const params = await searchParams;
    const query = Array.isArray(params.q) ? params.q[0] : params.q;
    const t = await getTranslations('search');

    return {
        title: query
            ? t('seo.title_query', { query })
            : t('seo.title_empty'),
        description: query ? t('seo.desc_query', { query }) : t('seo.desc_empty'),
        keywords: t('seo.keywords'),
        robots: { index: false, follow: false },
    };
}

/**
 * SearchPage - Server Component de /search.
 *
 * F5.3.2: resultados desde la API real (GET /search?q=...&lang=...) en el
 * servidor. El guard de query vacía evita llamar al backend (que responde 400
 * cuando `q` llega vacío). El loading lo cubre el skeleton de la ruta
 * (`search/loading.tsx`) y el estado de error se propaga al cliente para
 * mostrar un empty-state de fallo sin tumbar la página.
 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = Array.isArray(params.q) ? params.q[0] ?? '' : params.q ?? '';
    const cleanQuery = query.trim();

    let results: Product[] = [];
    let error = false;

    if (cleanQuery) {
        const locale = (await getLocale()) as ApiLang;
        try {
            const { data } = await search({ q: cleanQuery }, locale);
            results = mapApiProductsToProducts(data);
        } catch {
            error = true;
        }
    }

    return <SearchPageClient query={query} results={results} error={error} />;
}