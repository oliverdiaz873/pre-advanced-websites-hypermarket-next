'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const t = useTranslations('common')

    useEffect(() => {
        console.error('Error en la aplicación:', error)
    }, [error])

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-16">
            <div className="text-center max-w-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {t('error.title')}
                </h2>
                <p className="text-gray-600 mb-6">
                    {t('error.description')}
                </p>
                <button
                    onClick={reset}
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    {t('error.retry')}
                </button>
            </div>
        </div>
    )
}
