'use client'

import { useState, type FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { createAddressAction, updateAddressAction } from '@/features/addresses/actions'
import type { Address, AddressInput } from '@/types/address'

interface AddressFormProps {
  initial?: Address
  onSuccess?: (address: Address) => void
  submitLabelKey: string
}

/**
 * AddressForm - Formulario de dirección (crear/editar) E3.
 *
 * Usa Server Actions (`createAddressAction`/`updateAddressAction`); el JWT
 * jamás viaja al cliente. Notifica errores del backend (400 VALIDATION) con la
 * clave de mensaje i18n o el `message` del contrato.
 */
export default function AddressForm({ initial, onSuccess, submitLabelKey }: AddressFormProps) {
  const t = useTranslations('checkout')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<AddressInput>({
    label: initial?.label ?? '',
    street: initial?.street ?? '',
    city: initial?.city ?? '',
    state: initial?.state ?? '',
    zipCode: initial?.zipCode ?? '',
    country: initial?.country ?? '',
    reference: initial?.reference ?? '',
    isDefault: initial?.isDefault ?? false,
  })

  const update = (key: keyof AddressInput, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setPending(true)
    try {
      const res = initial
        ? await updateAddressAction(initial.id, form)
        : await createAddressAction(form)
      if (res.ok) {
        onSuccess?.(res.address)
      } else if (res.status === 401) {
        setError('unauthenticated')
      } else if (res.status === 400) {
        setError('validation')
      } else {
        setError(res.message || 'generic')
      }
    } finally {
      setPending(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-white/10 bg-black/40 text-white px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder:text-white/40'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-gray-900" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          {t('form.label')}
          <input
            type="text"
            value={form.label}
            onChange={(e) => update('label', e.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          {t('form.country')}
          <input
            type="text"
            value={form.country}
            onChange={(e) => update('country', e.target.value)}
            required
            className={inputClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        {t('form.street')}
        <input
          type="text"
          value={form.street}
          onChange={(e) => update('street', e.target.value)}
          required
          className={inputClass}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          {t('form.city')}
          <input
            type="text"
            value={form.city}
            onChange={(e) => update('city', e.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          {t('form.state')}
          <input
            type="text"
            value={form.state}
            onChange={(e) => update('state', e.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          {t('form.zip')}
          <input
            type="text"
            value={form.zipCode}
            onChange={(e) => update('zipCode', e.target.value)}
            required
            className={inputClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        {t('form.reference')}
        <input
          type="text"
          value={form.reference ?? ''}
          onChange={(e) => update('reference', e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={form.isDefault ?? false}
          onChange={(e) => update('isDefault', e.target.checked)}
          className="h-4 w-4 accent-orange-500"
        />
        {t('form.default')}
      </label>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {t(`errors.${error}`)}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-lg bg-orange-500 text-white font-semibold py-3 text-sm transition-colors duration-200 hover:bg-orange-600 disabled:opacity-60"
      >
        {pending ? t('form.submitting') : t(submitLabelKey)}
      </button>
    </form>
  )
}
