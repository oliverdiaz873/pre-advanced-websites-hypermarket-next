'use client'

import { useState, useTransition } from 'react'
import { useRouter, Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { useSession } from '@/features/auth/SessionContext'
import { useCart } from '@/features/cart/hooks/useCart'
import { createOrderAction } from '@/features/orders/actions'
import type { Address } from '@/types/address'

interface CheckoutClientProps {
  addresses: Address[]
  idempotencyKey: string
  returnUrl: string
}

/**
 * CheckoutClient - Página única de checkout (E3).
 *
 * La `idempotencyKey` la genera la RSC de `/checkout` y se pasa como prop; se
 * conserva en estado y se REUTILIZA en reintentos (doble click / fallo de red)
 * → el backend devuelve la misma orden (idempotencia E3, nunca duplicada).
 *
 * Tras confirmar el pedido, refresca sesión/carrito (el backend vacía el
 * carrito) y redirige al detalle de la orden.
 */
export default function CheckoutClient({ addresses, idempotencyKey, returnUrl }: CheckoutClientProps) {
  const t = useTranslations('checkout')
  const router = useRouter()
  const { status } = useSession()
  const { cart, totalPrice } = useCart()
  const [pending, startTransition] = useTransition()
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id ?? null,
  )
  const [error, setError] = useState<string | null>(null)

  const handlePlaceOrder = () => {
    setError(null)
    if (!selectedAddressId) {
      setError('no_address')
      return
    }
    startTransition(async () => {
      const res = await createOrderAction({ addressId: selectedAddressId, idempotencyKey })
      if (res.ok) {
        router.replace(`/orders/${res.order.id}`)
        router.refresh()
      } else if (res.status === 401) {
        router.replace(returnUrl)
      } else if (res.status === 409) {
        setError('insufficient_stock')
      } else if (res.status === 400) {
        setError('cart_empty')
      } else {
        setError(res.message || 'generic')
      }
    })
  }

  if (status === 'loading') {
    return <p className="opacity-70">{t('loading')}</p>
  }

  if (cart.length === 0) {
    return <p className="opacity-70">{t('empty')}</p>
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/95 dark:bg-black/40 rounded-2xl p-6 md:p-8 shadow-2xl text-gray-900">
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">{t('shipping.title')}</h2>
        {addresses.length === 0 ? (
          <p className="text-sm opacity-70">
            {t('shipping.no_addresses')}{' '}
            <Link href="/addresses" className="text-orange-600 hover:underline font-medium">
              {t('shipping.go_addresses')}
            </Link>
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {addresses.map((address) => (
              <label
                key={address.id}
                className={`flex items-start gap-3 rounded-xl border p-4 text-sm cursor-pointer ${selectedAddressId === address.id ? 'border-orange-500 bg-orange-50/60 dark:bg-orange-500/10' : 'border-white/10 bg-black/5 dark:bg-black/30'}`}
              >
                <input
                  type="radio"
                  name="shipping-address"
                  checked={selectedAddressId === address.id}
                  onChange={() => setSelectedAddressId(address.id)}
                  className="mt-0.5 h-4 w-4 accent-orange-500"
                />
                <div>
                  <div className="font-semibold">
                    {address.label}
                    {address.isDefault && (
                      <span className="ml-2 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-300 px-2 py-0.5 text-xs">
                        {t('default_badge')}
                      </span>
                    )}
                  </div>
                  <div className="opacity-70 mt-1">
                    {address.street}, {address.city}, {address.state} {address.zipCode} · {address.country}
                  </div>
                </div>
              </label>
            ))}
            <Link href="/addresses" className="text-sm text-orange-600 hover:underline font-medium">
              {t('shipping.manage')}
            </Link>
          </div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">{t('summary.title')}</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between gap-3 border-b border-white/10 pb-2">
              <span className="opacity-80">
                {item.name} <span className="opacity-60">× {item.cantidad}</span>
              </span>
              <span className="font-medium">${(item.precio * item.cantidad).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mt-4 font-semibold">
          <span>{t('summary.total')}</span>
          <span>${totalPrice.toLocaleString()}</span>
        </div>
      </section>

      {error && (
        <p role="alert" className="text-sm text-red-600 mb-4">
          {t(`errors.${error}`)}
        </p>
      )}

      <button
        type="button"
        disabled={pending || addresses.length === 0}
        onClick={handlePlaceOrder}
        className="w-full rounded-lg bg-orange-500 text-white font-semibold py-3 text-sm transition-colors duration-200 hover:bg-orange-600 disabled:opacity-60"
      >
        {pending ? t('submitting') : t('submit')}
      </button>

      <div className="mt-6 text-center">
        <Link href="/cart" className="text-sm text-gray-500 hover:underline">
          {t('back_to_cart')}
        </Link>
      </div>
    </div>
  )
}
