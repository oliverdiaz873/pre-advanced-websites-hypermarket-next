"use client";

import { useTranslations } from 'next-intl';
import LegalLayout from '@/features/layout/components/LegalLayout';
import { CONTACT_EMAIL } from '@/lib/constants';

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
                const hasEmail = ['6', '8'].includes(section);

                return (
                <section key={section}>
                    <h2>{t(`${type}.sections.${section}.title`)}</h2>
                    <p>
                        {t(`${type}.sections.${section}.content`)}
                        {hasEmail && (
                            <>
                                {' '}
                                <a href={`mailto:${CONTACT_EMAIL}`}>
                                    <strong>{CONTACT_EMAIL}</strong>
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
