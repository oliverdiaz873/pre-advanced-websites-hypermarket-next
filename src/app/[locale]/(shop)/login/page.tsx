import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getSession } from '@/features/auth/session'
import { safeReturnUrl } from '@/features/auth/safe-url'
import LoginForm from './LoginForm'

interface LoginPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ returnUrl?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth')
  return {
    title: t('seo.login.title'),
    description: t('seo.login.description'),
    robots: { index: false, follow: false },
  }
}

export default async function LoginPage({ params, searchParams }: LoginPageProps) {
  const { locale } = await params
  const { returnUrl } = await searchParams
  setRequestLocale(locale)

  const user = await getSession()
  if (user) redirect(`/${locale}/account`)

  const safeReturn = safeReturnUrl(returnUrl ?? null, '/account')

  return <LoginForm returnUrl={safeReturn} />
}