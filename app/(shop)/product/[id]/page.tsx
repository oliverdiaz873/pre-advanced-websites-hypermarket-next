import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailSection from '@/src/features/products/components/ProductDetailSection';
import ProductCarouselSection from '@/src/features/products/components/ProductCarouselSection';
import { products } from '@/src/data/products';
import { productPageData } from '@/src/data/productPageData';

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

    return (
        <>
            <ProductDetailSection product={product} pageData={productPageData[product.id]} />
            {relatedProducts.length > 0 && (
                <ProductCarouselSection
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
