import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getSession } from '@/features/auth/session'
import { getServerOrders } from '@/features/orders/server/get-server-orders'
import OrderHistoryClient from '@/features/orders/components/OrderHistoryClient'

interface OrdersPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('orders')
  return {
    title: t('seo.list.title'),
    description: t('seo.list.description'),
    robots: { index: false, follow: false },
  }
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const user = await getSession()
  if (!user) {
    redirect(`/${locale}/login?returnUrl=${encodeURIComponent(`/${locale}/orders`)}`)
  }

  const orders = await getServerOrders()
  const t = await getTranslations('orders')

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/95 dark:bg-black/40 rounded-2xl p-6 md:p-8 shadow-2xl text-gray-900">
      <h1 className="text-2xl font-bold mb-6">{t('list.title')}</h1>
      <OrderHistoryClient orders={orders} />
    </div>
  )
}
