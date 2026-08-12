import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getSession } from '@/features/auth/session'
import { getServerOrder } from '@/features/orders/server/get-server-orders'
import OrderDetailClient from '@/features/orders/components/OrderDetailClient'

interface OrderDetailPageProps {
  params: Promise<{ locale: string; id: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('orders')
  return {
    title: t('seo.detail.title'),
    description: t('seo.detail.description'),
    robots: { index: false, follow: false },
  }
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { locale, id } = await params
  setRequestLocale(locale)

  const user = await getSession()
  if (!user) {
    redirect(`/${locale}/login?returnUrl=${encodeURIComponent(`/${locale}/orders/${id}`)}`)
  }

  const order = await getServerOrder(id)
  if (!order) {
    notFound()
  }

  return <OrderDetailClient order={order} />
}
