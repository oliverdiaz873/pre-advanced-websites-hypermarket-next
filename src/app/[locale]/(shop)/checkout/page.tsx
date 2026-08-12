import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { randomUUID } from 'crypto'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getSession } from '@/features/auth/session'
import { getServerAddresses } from '@/features/addresses/server/get-server-addresses'
import CheckoutClient from '@/features/orders/components/CheckoutClient'

interface CheckoutPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('checkout')
  return {
    title: t('seo.checkout.title'),
    description: t('seo.checkout.description'),
    robots: { index: false, follow: false },
  }
}

/**
 * /checkout — página única de checkout (E3).
 *
 * RSC: exige sesión (redirect login+returnUrl) y genera la `idempotencyKey`
 * AQUÍ, en el servidor, para pasarla al cliente. El cliente la conserva en
 * estado y la REUTILIZA en reintentos → el backend devuelve la misma orden
 * (idempotencia E3). La key jamás se regenera por cliente.
 */
export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const user = await getSession()
  if (!user) {
    redirect(`/${locale}/login?returnUrl=${encodeURIComponent(`/${locale}/checkout`)}`)
  }

  const [addresses] = await Promise.all([getServerAddresses()])

  return (
    <CheckoutClient
      addresses={addresses}
      idempotencyKey={randomUUID()}
      returnUrl={`/${locale}/login?returnUrl=${encodeURIComponent(`/${locale}/checkout`)}`}
    />
  )
}
