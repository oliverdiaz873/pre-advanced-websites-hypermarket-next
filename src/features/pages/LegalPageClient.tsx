"use client";

import { useTranslation } from 'react-i18next';
import LegalLayout from '@/src/features/layout/components/LegalLayout';

interface LegalPageClientProps {
    type: 'privacy' | 'terms';
}

export default function LegalPageClient({ type }: LegalPageClientProps) {
    const { t } = useTranslation('legal');
    const sections = type === 'terms'
        ? ['1', '2', '3', '4', '5', '6', '7', '8']
        : ['1', '2', '3', '4', '5', '6'];

    return (
        <LegalLayout title={t(`${type}.title`)} date={t(`${type}.date`)}>
            <p>{t(`${type}.intro`)}</p>
            {sections.map((section) => (
                <section key={section}>
                    <h2>{t(`${type}.sections.${section}.title`)}</h2>
                    <p>
                        {t(`${type}.sections.${section}.content`)}
                        {t(`${type}.sections.${section}.email`, { defaultValue: '' }) && (
                            <>
                                {' '}
                                <a href={`mailto:${t(`${type}.sections.${section}.email`)}`}>
                                    {t(`${type}.sections.${section}.email`)}
                                </a>
                            </>
                        )}
                    </p>
                </section>
            ))}
        </LegalLayout>
    );
}
