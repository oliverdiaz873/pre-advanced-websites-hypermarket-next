'use client'

import { useTransition, useState, type FormEvent } from 'react'
import { Link, useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { loginAction } from '@/features/auth/actions'
import { useSession } from '@/features/auth/SessionContext'

export default function LoginForm({ returnUrl }: { returnUrl: string }) {
  const t = useTranslations('auth')
  const router = useRouter()
  const { refresh } = useSession()
  const [pending, startTransition] = useTransition()
  const [errorKey, setErrorKey] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorKey(null)
    startTransition(async () => {
      const res = await loginAction({ email: email.trim(), password })
      if (res.ok) {
        await refresh()
        router.replace(returnUrl)
        router.refresh()
      } else {
        setErrorKey(res.errorKey)
      }
    })
  }

  const inputClass =
    'w-full rounded-lg border border-white/10 bg-black/40 text-white px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder:text-white/40'

  return (
    <div className="w-full max-w-md mx-auto bg-white/95 dark:bg-black/40 rounded-2xl p-6 md:p-8 shadow-2xl text-gray-900">
      <h1 className="text-2xl font-bold mb-1">{t('login.title')}</h1>
      <p className="text-sm opacity-70 mb-6">{t('login.subtitle')}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          {t('login.email')}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
            autoComplete="email"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          {t('login.password')}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputClass}
            autoComplete="current-password"
          />
        </label>

        {errorKey && (
          <p role="alert" className="text-sm text-red-600">
            {t(`errors.${errorKey}`)}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 rounded-lg bg-orange-500 text-white font-semibold py-3 text-sm transition-colors duration-200 hover:bg-orange-600 disabled:opacity-60"
        >
          {pending ? t('login.submitting') : t('login.submit')}
        </button>
      </form>

      <p className="text-sm text-center mt-6">
        {t('login.no_account')}{' '}
        <Link href="/register" className="text-orange-600 hover:underline font-medium">
          {t('login.go_register')}
        </Link>
      </p>
    </div>
  )
}