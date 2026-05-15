import type { Metadata } from 'next';
import CartPageClient from '@/src/features/pages/CartPageClient';

export const metadata: Metadata = {
    title: 'Carrito | Hipermercado Superior',
    description: 'Revisa los productos agregados a tu carrito de compras.',
};

export default function CartPage() {
    return <CartPageClient />;
}
