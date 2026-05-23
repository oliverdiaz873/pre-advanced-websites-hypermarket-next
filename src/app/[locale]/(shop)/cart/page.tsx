import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CartPageClient from '@/features/cart/components/CartPageClient';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('common');
    return {
        title: `${t('cart.seo.title')} | Hipermercado Superior`,
        description: t('cart.seo.description'),
    };
}

export default function CartPage() {
    return <CartPageClient />;
}
