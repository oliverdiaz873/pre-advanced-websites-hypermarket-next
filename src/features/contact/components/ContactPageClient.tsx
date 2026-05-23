"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ContactForm from '@/features/contact/components/ContactForm';
import Toast from '@/ui/Toast/Toast';

export default function ContactPageClient() {
    const t = useTranslations('contact');
    const [showToast, setShowToast] = useState(false);

    // Efecto para aplicar el fondo negro "profundo" solo en esta página
    useEffect(() => {
        document.body.classList.add('dark-theme-body');
        return () => {
            document.body.classList.remove('dark-theme-body');
        };
    }, []);

    return (
        <section id="contacto" className="w-full px-4 py-1 md:py-1 lg:py-1 flex justify-center">
            <main className="contacto-container w-full max-w-[550px] md:max-w-[700px] lg:max-w-[750px] xl:max-w-[800px] mx-auto my-3 md:my-10 lg:my-5 p-5 md:p-8 lg:p-9 xl:p-10 rounded-lg bg-[#1a1a1c] border border-white/10 text-white shadow-2xl">
                <ContactForm onSuccess={() => setShowToast(true)} />

                <section className="contacto-info mt-5 md:mt-5">
                    <h2 className="text-xl md:text-2xl text-center mb-6 md:mb-8 pt-4 md:pt-6">{t('info.title')}</h2>
                    <div className="info-item text-center mb-4">
                        <p><strong>{t('info.email_label')}</strong> soporte@hipermercadosuperior.com</p>
                    </div>
                    <div className="info-item text-center mb-4">
                        <p><strong>{t('info.phone_label')}</strong> +1 (809) 555-5555</p>
                    </div>
                    <div className="info-item text-center mb-4">
                        <p><strong>{t('info.hours_label')}</strong> {t('info.hours_text')}</p>
                    </div>
                </section>
            </main>

            {showToast && (
                <Toast
                    message={t('form.success_toast')}
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    type="success"
                />
            )}
        </section>
    );
}
