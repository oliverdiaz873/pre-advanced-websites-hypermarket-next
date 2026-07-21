import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CartPageClient from '@/features/cart/components/CartPageClient';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('common');
    return {
        title: t('cart.seo.title'),
        description: t('cart.seo.description'),
        robots: { index: false, follow: false },
    };
}

export default function CartPage() {
    return <CartPageClient />;
}
