"use client";

import AddToCartButton from '@/features/cart/components/AddToCartButton';
import { OfferBadge } from '@/features/offers/components';
import ProductCarouselSection from '@/features/products/components/ProductCarouselSection';
import { Product } from '@/types/product';

type CommerceProduct = Product & {
    oldPrice?: string;
    discountPercentage?: number;
};

interface ProductCarouselSectionWithActionsProps {
    title?: string;
    products: CommerceProduct[];
    id: string;
    idPrefix: string;
    isOffer?: boolean;
    className?: string;
}

export default function ProductCarouselSectionWithActions({
    isOffer = false,
    ...props
}: ProductCarouselSectionWithActionsProps) {
    return (
        <ProductCarouselSection
            {...props}
            isOffer={isOffer}
            renderBadge={(product) =>
                isOffer ? <OfferBadge discountPercentage={product.discountPercentage} /> : null
            }
            renderAction={(product) => <AddToCartButton product={product} />}
        />
    );
}
