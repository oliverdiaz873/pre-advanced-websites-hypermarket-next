"use client";

import { useCart } from '@/features/cart/hooks/useCart';
import CartHeader from '@/features/cart/components/CartHeader';
import CartItemsList from '@/features/cart/components/CartItemsList';
import CartLayout from '@/features/cart/components/CartLayout';
import CartSummary from '@/features/cart/components/CartSummary';
import EmptyCart from '@/features/cart/components/EmptyCart';

/**
 * CartPageClient - Cart Page Client Component
 *
 * Renders the main cart page view.
 * Displays the cart items list and summary,
 * or an empty cart message when there are no items.
 */
export default function CartPageClient() {
    const { cart, totalItems, updateQuantity, removeFromCart } = useCart();

    if (totalItems === 0) {
        return <EmptyCart />;
    }

    return (
        <CartLayout>
            <CartHeader totalItems={totalItems} />
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <CartItemsList
                    cart={cart}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                />
                <CartSummary />
            </div>
        </CartLayout>
    );
}
