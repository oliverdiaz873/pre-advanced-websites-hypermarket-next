import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import CategoryPageClient from '../../_components/CategoryPageClient';
import { categories } from '@/services/catalog/categories';
import { products } from '@/services/catalog/products';
import { sectionSlugToProductCategoria, subcategorySlugFromHref } from '@/services/catalog/categorySectionMap';

/**
 * Hypermarket category page.
 * Displays all products organized by subcategories within a main category.
 * Includes SEO metadata, JSON-LD for structured data, and client-side rendering.
 */
type CategoryPageProps = {
    params: Promise<{ id: string }>;
};

function getCategory(id: string) {
    return categories.find((category) => category.id === id);
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { id } = await params;
    const category = getCategory(id);

    if (!category) {
        const t = await getTranslations('categories');
        return {
            title: t('not_found'),
            description: t('not_found_description'),
            robots: { index: false, follow: false },
        };
    }

    const subcategories = category.subcategories.map((subcategory) => subcategory.name).join(', ');
    const canonicalUrl = `https://www.hipermercadosuperior.com/category/${category.id}`;
    const t = await getTranslations('categories');
    const description = t('seo.description', { name: category.name, subcategories });

    return {
        title: category.name,
        description,
        keywords: [category.id.toLowerCase(), ...subcategories.toLowerCase().split(', ')],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${category.name} | Hipermercado Superior`,
            description,
            url: canonicalUrl,
            type: 'website',
            siteName: 'Hipermercado Superior',
            locale: 'es_DO',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${category.name} | Hipermercado Superior`,
            description,
        },
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { id } = await params;
    const category = getCategory(id);

    if (!category) {
        notFound();
    }

    const t = await getTranslations('categories');
    const description = t('seo.description', { name: category.name, subcategories: category.subcategories.map((s) => s.name).join(', ') });

    const sections = category.subcategories
        .map((subcategory) => {
            const slug = subcategorySlugFromHref(subcategory.href);
            const productCategory = sectionSlugToProductCategoria(slug);
            const sectionProducts = products.filter((product) => product.categoria === productCategory);

            return {
                slug,
                title: subcategory.name,
                products: sectionProducts,
            };
        })
        .filter((section) => section.products.length > 0);

    // Generar JSON-LD para SEO estructurado
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: category.name,
        description,
        url: `https://www.hipermercadosuperior.com/category/${category.id}`,
        mainEntity: {
            '@type': 'ItemList',
            name: category.name,
            numberOfItems: sections.reduce((acc, s) => acc + s.products.length, 0),
            itemListElement: category.subcategories.map((subcategory, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: subcategory.name,
                url: `https://www.hipermercadosuperior.com/category/${category.id}#${subcategorySlugFromHref(subcategory.href)}`,
            })),
        },
        provider: {
            '@type': 'Organization',
            name: 'Hipermercado Superior',
            url: 'https://www.hipermercadosuperior.com',
        },
    };

    return (
        <>
            {/* JSON-LD para Google Search Console */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CategoryPageClient category={category} sections={sections} />
        </>
    );
}
