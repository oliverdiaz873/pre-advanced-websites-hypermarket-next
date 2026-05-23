"use client";

import AddToCartButton from '@/features/cart/components/AddToCartButton';
import ProductDetailSection from '@/features/products/components/ProductDetailSection';
import { ProductPageData } from '@/services/catalog/productPageData';
import { Product } from '@/types/product';

interface ProductDetailSectionWithActionsProps {
    product: Product;
    pageData?: ProductPageData;
}

export default function ProductDetailSectionWithActions({
    product,
    pageData,
}: ProductDetailSectionWithActionsProps) {
    return (
        <ProductDetailSection
            product={product}
            pageData={pageData}
            action={<AddToCartButton product={product} />}
        />
    );
}
