import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import CategoryPageClient from '../../_components/CategoryPageClient';
import { categories } from '@/services/catalog/categories';
import { getProducts, mapApiProductsToProducts } from '@/lib/api-client';
import { sectionSlugToProductCategoria, subcategorySlugFromHref } from '@/services/catalog/categorySectionMap';
import { getCategoryName, getSubcategoryName } from '@/lib';

/**
 * Hypermarket category page.
 * F5.2: products dentro de subcategorías se obtienen de la API real (GET /products?category=slug).
 * Categorías siguen en data layer mock hasta F5.3.
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

    const canonicalUrl = `https://www.hipermercadosuperior.com/category/${category.id}`;
    const t = await getTranslations('categories');
    const catName = getCategoryName(category, t);
    const subcategoryNames = category.subcategories.map(s => getSubcategoryName(s, t)).join(', ');
    const description = t('seo.description', { name: catName, subcategories: subcategoryNames });

    return {
        title: catName,
        description,
        keywords: [category.id.toLowerCase(), ...subcategoryNames.toLowerCase().split(', ')],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${catName} | Hipermercado Superior`,
            description,
            url: canonicalUrl,
            type: 'website',
            siteName: 'Hipermercado Superior',
            locale: 'es_DO',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${catName} | Hipermercado Superior`,
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
    const catName = getCategoryName(category, t);
    const description = t('seo.description', { name: catName, subcategories: category.subcategories.map((s) => getSubcategoryName(s, t)).join(', ') });

    // F5.2: obtener productos por subcategoría desde la API
    const sections = await Promise.all(
        category.subcategories.map(async (subcategory) => {
            const slug = subcategorySlugFromHref(subcategory.href);
            const productCategory = sectionSlugToProductCategoria(slug);
            const { data: rawProducts } = await getProducts({ category: productCategory, limit: 50 });
            const sectionProducts = mapApiProductsToProducts(rawProducts);

            return {
                slug,
                title: subcategory.name,
                products: sectionProducts,
            };
        })
    );

    const filteredSections = sections.filter((section) => section.products.length > 0);

    // Generar JSON-LD para SEO estructurado
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: catName,
        description,
        url: `https://www.hipermercadosuperior.com/category/${category.id}`,
        mainEntity: {
            '@type': 'ItemList',
            name: catName,
            numberOfItems: filteredSections.reduce((acc, s) => acc + s.products.length, 0),
            itemListElement: category.subcategories.map((subcategory, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: getSubcategoryName(subcategory, t),
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
            <CategoryPageClient category={category} sections={filteredSections} />
        </>
    );
}