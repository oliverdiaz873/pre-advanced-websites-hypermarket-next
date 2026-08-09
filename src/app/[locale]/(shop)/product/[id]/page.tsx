import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ProductPageClient from '../../_components/ProductPageClient';
import { getProduct, getProducts, mapApiProductToProduct, mapApiProductsToProducts, fetchCategories } from '@/lib/api-client';
import type { Product } from '@/types/product';
import type { Category } from '@/types/category';

type ProductPageProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { id } = await params;
    
    try {
        const { data: product } = await getProduct(id);

        if (!product) {
            const t = await getTranslations('common.product');
            return {
                title: t('not_found'),
                description: t('not_found_description'),
                robots: { index: false, follow: false },
            };
        }

        const mappedProduct = mapApiProductToProduct(product);
        const t = await getTranslations('common.product');
        const description = product.description ?? t('fallback_description', { name: mappedProduct.name });

        return {
            title: mappedProduct.name,
            description,
            openGraph: {
                title: mappedProduct.name,
                description,
                url: `https://www.hipermercadosuperior.com/product/${mappedProduct.id}`,
                type: 'website',
                siteName: 'Hipermercado Superior',
                locale: 'es_DO',
                images: [
                    {
                        url: mappedProduct.imagen.startsWith('http') 
                            ? mappedProduct.imagen 
                            : `https://www.hipermercadosuperior.com${mappedProduct.imagen}`,
                        width: 1200,
                        height: 630,
                        alt: mappedProduct.name,
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: mappedProduct.name,
                description,
                images: [mappedProduct.imagen.startsWith('http') 
                    ? mappedProduct.imagen 
                    : `https://www.hipermercadosuperior.com${mappedProduct.imagen}`],
            },
        };
    } catch {
        const t = await getTranslations('common.product');
        return {
            title: t('not_found'),
            description: t('not_found_description'),
            robots: { index: false, follow: false },
        };
    }
}

/**
 * ProductPage - Server Component para la vista individual de un producto.
 * 
 * F5.2/F5.3: usa la API real (GET /products/:id?lang= y GET /categories).
 * Obtiene el producto, sus relacionados (misma categoría) y las categorías para el breadcrumb.
 * El fetch se envuelve en try/catch; el JSX se construye fuera para cumplir la regla de lint
 * react-hooks/error-boundaries (notFound() nunca retorna, por lo que no hay flujo no inicializado).
 */
export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;

    let mappedProduct: Product;
    let relatedProducts: Product[];
    let categories: Category[];
    let jsonLd: Record<string, unknown>;

    try {
        const { data: product } = await getProduct(id);

        if (!product) {
            notFound();
        }

        mappedProduct = mapApiProductToProduct(product);

        // F5.3: categorías reales para el breadcrumb (buscar la subcategoría que corresponde al producto)
        categories = await fetchCategories();

        // Obtener productos relacionados de la misma categoría (máx 8)
        const { data: relatedRaw } = await getProducts({ category: mappedProduct.categoria, limit: 50 });
        relatedProducts = mapApiProductsToProducts(relatedRaw)
            .filter((item) => item.id !== mappedProduct.id)
            .slice(0, 8);

        // Generar JSON-LD para SEO estructurado del producto
        jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: mappedProduct.name,
            description: product.description ?? `Compra ${mappedProduct.name} en Hipermercado Superior.`,
            image: mappedProduct.imagen.startsWith('http') 
                ? mappedProduct.imagen 
                : `https://www.hipermercadosuperior.com${mappedProduct.imagen}`,
            sku: mappedProduct.id,
            brand: {
                '@type': 'Brand',
                name: 'Hipermercado Superior',
            },
            offers: {
                '@type': 'Offer',
                url: `https://www.hipermercadosuperior.com/product/${mappedProduct.id}`,
                priceCurrency: 'DOP',
                price: mappedProduct.precio,
                itemCondition: 'https://schema.org/NewCondition',
                availability: 'https://schema.org/InStock',
            },
        };
    } catch {
        notFound();
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductPageClient product={mappedProduct} relatedProducts={relatedProducts} categories={categories} />
        </>
    );
}