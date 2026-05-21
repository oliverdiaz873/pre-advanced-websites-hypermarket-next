import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailSectionWithActions from '../../_components/ProductDetailSectionWithActions';
import ProductCarouselSectionWithActions from '../../_components/ProductCarouselSectionWithActions';
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
        return {
            title: 'Producto no encontrado | Hipermercado Superior',
        };
    }

    const pageData = productPageData[product.id];

    return {
        title: `${product.nombre} | Hipermercado Superior`,
        description: pageData?.descripcion ?? `Compra ${product.nombre} en Hipermercado Superior.`,
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = getProduct(id);

    if (!product) {
        notFound();
    }

    const relatedProducts = products
        .filter((item) => item.categoria === product.categoria && item.id !== product.id)
        .slice(0, 12);

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
            <ProductDetailSectionWithActions product={product} pageData={productPageData[product.id]} />
            {relatedProducts.length > 0 && (
                <ProductCarouselSectionWithActions
                    title="Productos similares"
                    products={relatedProducts}
                    id="productos-similares"
                    idPrefix="related"
                    className="mt-6 md:mt-8"
                />
            )}
        </>
    );
}
