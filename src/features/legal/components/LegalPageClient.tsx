"use client";

import { useTranslations } from 'next-intl';
import LegalLayout from '@/features/layout/components/LegalLayout';

interface LegalPageClientProps {
    type: 'privacy' | 'terms';
}

export default function LegalPageClient({ type }: LegalPageClientProps) {
    const t = useTranslations('legal');
    const sections = type === 'terms'
        ? ['1', '2', '3', '4', '5', '6', '7', '8']
        : ['1', '2', '3', '4', '5', '6'];

    return (
        <LegalLayout title={t(`${type}.title`)} date={t(`${type}.date`)}>
            <p>{t(`${type}.intro`)}</p>
            {sections.map((section) => {
                const emailKey = `${type}.sections.${section}.email` as const;

                return (
                <section key={section}>
                    <h2>{t(`${type}.sections.${section}.title`)}</h2>
                    <p>
                        {t(`${type}.sections.${section}.content`)}
                        {t.has(emailKey) && (
                            <>
                                {' '}
                                <a href={`mailto:${t(emailKey)}`}>
                                    <strong>{t(emailKey)}</strong>
                                </a>
                            </>
                        )}
                    </p>
                </section>
                );
            })}
        </LegalLayout>
    );
}
