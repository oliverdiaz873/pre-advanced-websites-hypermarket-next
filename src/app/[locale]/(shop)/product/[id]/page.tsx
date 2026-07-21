import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ProductPageClient from '../../_components/ProductPageClient';
import { products } from '@/services/catalog/products';
import { productPageData } from '@/services/catalog/productPageData';

type ProductPageProps = {
    params: Promise<{ id: string }>;
};

function getProduct(id: string) {
    return products.find((product) => product.id === id);
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { id } = await params;
    const product = getProduct(id);

    if (!product) {
        const t = await getTranslations('common.product');
        return {
            title: t('not_found'),
            description: t('not_found_description'),
            robots: { index: false, follow: false },
        };
    }

    const pageData = productPageData[product.id];
    const t = await getTranslations('common.product');
    const description = pageData?.descripcion ?? t('fallback_description', { name: product.nombre });

    return {
        title: product.nombre,
        description,
        openGraph: {
            title: product.nombre,
            description,
            url: `https://www.hipermercadosuperior.com/product/${product.id}`,
            type: 'website',
            siteName: 'Hipermercado Superior',
            locale: 'es_DO',
            images: [
                {
                    url: `https://www.hipermercadosuperior.com${product.imagen}`,
                    width: 1200,
                    height: 630,
                    alt: product.nombre,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: product.nombre,
            description,
            images: [`https://www.hipermercadosuperior.com${product.imagen}`],
        },
    };
}

/**
 * ProductPage - Server Component para la vista individual de un producto.
 * 
 * Esta página es un "Server Component" por diseño. Su principal responsabilidad es:
 * 1. Obtener los datos del producto solicitado basándose en el ID de la URL.
 * 2. Generar el metadata (SEO) dinámico para buscadores (título y descripción).
 * 3. Construir la estructura de datos para Schema.org (JSON-LD) permitiendo "Rich Snippets" en Google.
 * 4. Delegar la UI y las traducciones a un componente de cliente (`ProductPageClient`) pasando
 *    los datos limpios y procesados.
 */
export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = getProduct(id);

    if (!product) {
        notFound();
    }

    const relatedProducts = products
        .filter((item) => item.categoria === product.categoria && item.id !== product.id)
        .slice(0, 8);

    // Generar JSON-LD para SEO estructurado del producto
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.nombre,
        description: productPageData[product.id]?.descripcion ?? `Compra ${product.nombre} en Hipermercado Superior.`,
        image: `https://www.hipermercadosuperior.com${product.imagen}`,
        sku: product.id,
        brand: {
            '@type': 'Brand',
            name: 'Hipermercado Superior',
        },
        offers: {
            '@type': 'Offer',
            url: `https://www.hipermercadosuperior.com/product/${product.id}`,
            priceCurrency: 'DOP',
            price: product.precio,
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductPageClient product={product} relatedProducts={relatedProducts} />
        </>
    );
}
