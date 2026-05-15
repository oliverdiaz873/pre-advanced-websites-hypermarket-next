"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContactForm from '@/src/features/contact/components/ContactForm';
import Toast from '@/src/shared/components/Toast/Toast';

export default function ContactPageClient() {
    const { t } = useTranslation('contact');
    const [showToast, setShowToast] = useState(false);

    return (
        <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 md:grid-cols-[minmax(0,1fr)_320px] md:px-6">
            <ContactForm onSuccess={() => setShowToast(true)} />

            <aside className="h-fit rounded border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-neutral-950">{t('info.title')}</h2>
                <dl className="mt-4 space-y-3 text-neutral-700">
                    <div>
                        <dt className="font-semibold">{t('info.email_label')}</dt>
                        <dd>soporte@hipermercadosuperior.com</dd>
                    </div>
                    <div>
                        <dt className="font-semibold">{t('info.phone_label')}</dt>
                        <dd>+1 (809) 555-5555</dd>
                    </div>
                    <div>
                        <dt className="font-semibold">{t('info.hours_label')}</dt>
                        <dd>{t('info.hours_text')}</dd>
                    </div>
                </dl>
            </aside>

            {showToast && (
                <Toast
                    message={t('form.success_toast')}
                    show={showToast}
                    onClose={() => setShowToast(false)}
                />
            )}
        </section>
    );
}
