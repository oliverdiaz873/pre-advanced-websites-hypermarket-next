'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { cancelOrderAction, payOrderAction } from '@/features/orders/actions'
import type { Order } from '@/types/order'

interface OrderDetailClientProps {
  order: Order
}

/**
 * OrderDetailClient - Detalle de una orden (E3) con acciones.
 *
 * - Pay: habilitado solo si `paymentStatus === 'pending'` (pay stub
 *   `pending → paid`, una sola vez; el backend devuelve 400 si ya pagada).
 * - Cancel: habilitado solo si `status === 'pending' | 'confirmed'`; si estaba
 *   `paid`, el backend pasa a `refunded`.
 *
 * La orden se mantiene en estado local, actualizada con la orden que devuelve
 * el backend en cada mutación (sin depender de `router.refresh()`, que puede
 * perder la actualización cuando la RSC y la acción compiten). Al navegar a
 * otra orden, el estado se resincroniza con la prop del servidor.
 */
export default function OrderDetailClient({ order: initialOrder }: OrderDetailClientProps) {
  const t = useTranslations('orders')
  const [order, setOrder] = useState(initialOrder)
  const [loadedId, setLoadedId] = useState(initialOrder.id)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (loadedId !== initialOrder.id) {
    setLoadedId(initialOrder.id)
    setOrder(initialOrder)
  }

  const canPay = order.paymentStatus === 'pending'
  const canCancel = order.status === 'pending' || order.status === 'confirmed'

  const handlePay = async () => {
    setError(null)
    setPending(true)
    try {
      const res = await payOrderAction(order.id)
      if (res.ok) setOrder(res.order)
      else if (res.status === 400) setError('cannot_pay')
      else setError(res.message || 'generic')
    } finally {
      setPending(false)
    }
  }

  const handleCancel = async () => {
    setError(null)
    setPending(true)
    try {
      const res = await cancelOrderAction(order.id)
      if (res.ok) setOrder(res.order)
      else if (res.status === 400) setError('cannot_cancel')
      else setError(res.message || 'generic')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/95 dark:bg-black/40 rounded-2xl p-6 md:p-8 shadow-2xl text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('detail.title')}</h1>
        <span className="text-sm font-semibold">{order.orderNumber}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 text-sm">
        <span className="rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-300 px-3 py-1">
          {t(`status.${order.status}`)}
        </span>
        <span className="rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-300 px-3 py-1">
          {t(`payment.${order.paymentStatus}`)}
        </span>
        <span className="opacity-70 self-center">{new Date(order.createdAt).toLocaleString()}</span>
      </div>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3">{t('detail.shipping')}</h2>
        <p className="text-sm opacity-80">
          {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
          {order.shippingAddress.zipCode} · {order.shippingAddress.country}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3">{t('detail.items')}</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {order.items.map((item) => (
            <li key={item.productId} className="flex justify-between gap-3 border-b border-white/10 pb-2">
              <span className="opacity-80">
                {item.name} <span className="opacity-60">× {item.quantity}</span>
              </span>
              <span className="font-medium">${(item.price * item.quantity).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mt-4 font-semibold">
          <span>{t('detail.total')}</span>
          <span>${order.subtotal.toLocaleString()}</span>
        </div>
      </section>

      {error && (
        <p role="alert" className="text-sm text-red-600 mb-4">
          {t(`errors.${error}`)}
        </p>
      )}

      <div className="flex flex-col gap-3">
        {canPay && (
          <button
            type="button"
            disabled={pending}
            onClick={handlePay}
            className="w-full rounded-lg bg-orange-500 text-white font-semibold py-3 text-sm transition-colors duration-200 hover:bg-orange-600 disabled:opacity-60"
          >
            {pending ? t('actions.processing') : t('actions.pay')}
          </button>
        )}
        {canCancel && (
          <button
            type="button"
            disabled={pending}
            onClick={handleCancel}
            className="w-full rounded-lg border border-red-500 text-red-600 dark:text-red-300 font-semibold py-3 text-sm transition-colors duration-200 hover:bg-red-500 hover:text-white disabled:opacity-60"
          >
            {pending ? t('actions.processing') : t('actions.cancel')}
          </button>
        )}
      </div>
    </div>
  )
}
