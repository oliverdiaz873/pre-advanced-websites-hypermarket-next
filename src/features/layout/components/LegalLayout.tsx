"use client";

import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import './LegalLayout.css'

interface LegalLayoutProps {
    title: string
    date: string
    children: React.ReactNode
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ title, date, children }) => {
    const t = useTranslations('legal');

    // Efecto para aplicar el fondo negro "profundo" solo en estas páginas
    useEffect(() => {
        document.body.classList.add('dark-theme-body')
        return () => {
            document.body.classList.remove('dark-theme-body')
        }
    }, [])

    return (
        <main className="politica-container reveal">
            <h1 className="main-title">{title}</h1>

            <p><small>{t('last_updated')}: {date}</small></p>

            {children}
        </main>
    )
}

export default LegalLayout
