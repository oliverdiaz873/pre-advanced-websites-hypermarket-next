import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getSession } from '@/features/auth/session'
import AccountPageClient from './AccountPageClient'

interface AccountPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth')
  return {
    title: t('seo.account.title'),
    description: t('seo.account.description'),
    robots: { index: false, follow: false },
  }
}

export default async function AccountPage({ params }: AccountPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const user = await getSession()
  if (!user) {
    redirect(`/${locale}/login?returnUrl=${encodeURIComponent(`/${locale}/account`)}`)
  }

  return <AccountPageClient user={user} />
}