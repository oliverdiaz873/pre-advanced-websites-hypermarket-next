import { useTranslations } from 'next-intl'
import { ApiRequestError, sendContactMessage } from '@/lib/api-client'
import { useFormValidation } from '../hooks/useFormValidation'
import './ContactForm.css'

interface ContactFormProps {
    onSuccess?: () => void
}

const ContactForm = ({ onSuccess }: ContactFormProps) => {
    const t = useTranslations('contact');
    const { formData, errors, submitError, isSubmitting, handleInputChange, handleSubmit } = useFormValidation(async (data) => {
        try {
            // E4.5: envío real al backend (POST /api/contact), sin simulación.
            await sendContactMessage({
                name: data.nombre.trim(),
                email: data.email.trim(),
                phone: data.telefono.trim() || undefined,
                message: data.mensaje.trim()
            })
        } catch (err) {
            if (err instanceof ApiRequestError && err.status === 429) {
                throw new Error(t('form.error.rate_limited'))
            }
            if (err instanceof ApiRequestError && err.message) {
                throw new Error(err.message)
            }
            throw new Error(t('form.error.submit_failed'))
        }

        if (onSuccess) {
            onSuccess()
        }
    }, { resetOnSuccess: true })

    return (
        <form onSubmit={handleSubmit} className="contacto-form" noValidate>
            <h1>{t('form.title')}</h1>

            <div className="input-box mb-5 md:mb-6">
                <label htmlFor="nombre">{t('form.labels.name')}</label>
                <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder={t('form.placeholders.name')}
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className={`w-full ${
                        errors.nombre 
                            ? 'invalid-value' 
                            : ''
                    }`}
                    required
                />
                {errors.nombre && (
                    <div className="error-message text-red-400 text-sm mt-1 ml-2 min-h-[16px]">
                        {errors.nombre}
                    </div>
                )}
            </div>
            
            <div className="input-box mb-5 md:mb-6">
                <label htmlFor="email">{t('form.labels.email')}</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('form.placeholders.email')}
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full ${
                        errors.email 
                            ? 'invalid-value' 
                            : ''
                    }`}
                    required
                />
                {errors.email && (
                    <div className="error-message text-red-400 text-sm mt-1 ml-2 min-h-[16px]">
                        {errors.email}
                    </div>
                )}
            </div>
            
            <div className="input-box mb-5 md:mb-6">
                <label htmlFor="telefono">{t('form.labels.phone')}</label>
                <input
                    id="telefono"
                    name="telefono"
                    type="text"
                    placeholder={t('form.placeholders.phone')}
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className={`w-full ${
                        errors.telefono 
                            ? 'invalid-value' 
                            : ''
                    }`}
                />
                {errors.telefono && (
                    <div className="error-message text-red-400 text-sm mt-1 ml-2 min-h-[16px]">
                        {errors.telefono}
                    </div>
                )}
            </div>

            <div className="input-box mb-5 md:mb-6">
                <label htmlFor="mensaje">{t('form.labels.message')}</label>
                <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={6}
                    placeholder={t('form.placeholders.message')}
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    className={`w-full ${
                        errors.mensaje 
                            ? 'invalid-value' 
                            : ''
                    }`}
                    required
                />
                {errors.mensaje && (
                    <div className="error-message text-red-400 text-sm mt-1 ml-2 min-h-[16px]">
                        {errors.mensaje}
                    </div>
                )}
            </div>

            {submitError && (
                <div className="error-message text-red-400 text-sm mt-1 mb-4">
                    {submitError}
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
            >
                {isSubmitting ? t('form.buttons.submitting') : t('form.buttons.submit')}
            </button>
        </form>
    )
}

export default ContactForm
