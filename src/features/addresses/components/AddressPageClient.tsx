'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { Address } from '@/types/address'
import AddressForm from './AddressForm'
import AddressList from './AddressList'

/**
 * AddressPageClient - Página de gestión de direcciones (E3).
 *
 * La lista se mantiene en estado local y se actualiza con la dirección que
 * devuelve el backend en cada mutación (sin depender de `router.refresh()`).
 * Al navegar, la página se remonta y se siembra con la lista fresca del server.
 */
export default function AddressPageClient({ addresses: initial }: { addresses: Address[] }) {
  const t = useTranslations('checkout')
  const [addresses, setAddresses] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Address | null>(null)

  const handleSaved = (saved: Address) => {
    setAddresses((prev) =>
      prev.some((a) => a.id === saved.id)
        ? prev.map((a) => (a.id === saved.id ? saved : a))
        : [...prev, saved],
    )
    setShowForm(false)
    setEditing(null)
  }

  const handleDeleted = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
  }

  const handleDefaultChanged = (updated: Address) => {
    setAddresses((prev) => prev.map((a) => (a.id === updated.id ? updated : a)))
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/95 dark:bg-black/40 rounded-2xl p-6 md:p-8 shadow-2xl text-gray-900">
      <h1 className="text-2xl font-bold mb-6">{t('addresses.title')}</h1>

      <div className="mb-6">
        <AddressList
          addresses={addresses}
          onDeleted={handleDeleted}
          onDefaultChanged={handleDefaultChanged}
        />
      </div>

      {showForm || editing ? (
        <div className="rounded-xl border border-white/10 p-5">
          <h2 className="text-lg font-semibold mb-4">
            {editing ? t('form.edit_title') : t('form.new_title')}
          </h2>
          <AddressForm
            initial={editing ?? undefined}
            onSuccess={handleSaved}
            submitLabelKey={editing ? 'form.update' : 'form.create'}
          />
          <button
            type="button"
            onClick={() => {
              setShowForm(false)
              setEditing(null)
            }}
            className="mt-3 text-sm text-gray-500 hover:underline"
          >
            {t('form.cancel')}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full rounded-lg border border-orange-500 text-orange-600 dark:text-orange-300 font-semibold py-3 text-sm transition-colors duration-200 hover:bg-orange-500 hover:text-white"
        >
          {t('actions.add')}
        </button>
      )}
    </div>
  )
}
