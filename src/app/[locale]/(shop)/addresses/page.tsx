import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getSession } from '@/features/auth/session'
import { getServerAddresses } from '@/features/addresses/server/get-server-addresses'
import AddressPageClient from '@/features/addresses/components/AddressPageClient'

interface AddressesPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('checkout')
  return {
    title: t('seo.addresses.title'),
    description: t('seo.addresses.description'),
    robots: { index: false, follow: false },
  }
}

export default async function AddressesPage({ params }: AddressesPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const user = await getSession()
  if (!user) {
    redirect(`/${locale}/login?returnUrl=${encodeURIComponent(`/${locale}/addresses`)}`)
  }

  const addresses = await getServerAddresses()

  return <AddressPageClient addresses={addresses} />
}
