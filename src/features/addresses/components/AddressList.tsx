'use client'

import { useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { deleteAddressAction, updateAddressAction } from '@/features/addresses/actions'
import type { Address } from '@/types/address'

interface AddressListProps {
  addresses: Address[]
  selectedId?: string | null
  onSelect?: (id: string) => void
  onDeleted?: (id: string) => void
  onDefaultChanged?: (address: Address) => void
  selectable?: boolean
}

/**
 * AddressList - Lista de direcciones del usuario con acciones E3.
 *
 * `selectable` activa la selección (usado en checkout). Las mutaciones
 * (delete / set-default) usan Server Actions; los callbacks `onDeleted` /
 * `onDefaultChanged` permiten a la página actualizar su estado local con el
 * resultado del backend (sin depender de `router.refresh()`).
 */
export default function AddressList({
  addresses,
  selectedId,
  onSelect,
  onDeleted,
  onDefaultChanged,
  selectable = false,
}: AddressListProps) {
  const t = useTranslations('checkout')
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setError(null)
    startTransition(async () => {
      const res = await deleteAddressAction(id)
      if (res.ok) onDeleted?.(id)
      else if (res.status === 401) setError('unauthenticated')
      else setError(res.message || 'generic')
    })
  }

  const handleSetDefault = (address: Address) => {
    setError(null)
    startTransition(async () => {
      const res = await updateAddressAction(address.id, { isDefault: true })
      if (res.ok) onDefaultChanged?.(res.address)
      else if (res.status === 401) setError('unauthenticated')
      else setError(res.message || 'generic')
    })
  }

  if (addresses.length === 0) {
    return <p className="text-sm opacity-70">{t('empty')}</p>
  }

  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {t(`errors.${error}`)}
        </p>
      )}

      {addresses.map((address) => {
        const isSelected = selectable && selectedId === address.id
        return (
          <div
            key={address.id}
            className={`rounded-xl border p-4 text-sm ${isSelected ? 'border-orange-500 bg-orange-50/60 dark:bg-orange-500/10' : 'border-white/10 bg-black/5 dark:bg-black/30'}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                {selectable && (
                  <input
                    type="radio"
                    name="shipping-address"
                    checked={isSelected}
                    onChange={() => onSelect?.(address.id)}
                    className="mt-0.5 h-4 w-4 accent-orange-500"
                    aria-label={address.label}
                  />
                )}
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    {address.label}
                    {address.isDefault && (
                      <span className="rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-300 px-2 py-0.5 text-xs">
                        {t('default_badge')}
                      </span>
                    )}
                  </div>
                  <div className="opacity-70 mt-1">
                    {address.street}, {address.city}, {address.state} {address.zipCode} · {address.country}
                    {address.reference ? ` · ${address.reference}` : ''}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                {!address.isDefault && (
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => handleSetDefault(address)}
                    className="text-xs text-orange-600 hover:underline disabled:opacity-50"
                  >
                    {t('actions.set_default')}
                  </button>
                )}
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => handleDelete(address.id)}
                  className="text-xs text-red-600 hover:underline disabled:opacity-50"
                >
                  {t('actions.delete')}
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
