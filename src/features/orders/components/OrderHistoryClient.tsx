'use client'

import { useFormatter, useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import type { Order } from '@/types/order'

interface OrderHistoryClientProps {
  orders: Order[]
}

/**
 * OrderHistoryClient - Historial de pedidos (E3, GET /orders plano).
 *
 * El backend devuelve la lista plana (sin paginación), ordenada por createdAt
 * desc. Cada pedido enlaza al detalle `/orders/[id]`.
 */
export default function OrderHistoryClient({ orders }: OrderHistoryClientProps) {
  const t = useTranslations('orders')
  const format = useFormatter()

  if (orders.length === 0) {
    return <p className="opacity-70">{t('empty')}</p>
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/orders/${order.id}`}
          className="rounded-xl border border-white/10 bg-black/5 dark:bg-black/30 p-4 text-sm flex flex-col gap-2 hover:border-orange-500/50 transition-colors"
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold">{order.orderNumber}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              order.status === 'cancelled'
                ? 'bg-red-500/15 text-red-600 dark:text-red-300'
                : order.paymentStatus === 'paid'
                  ? 'bg-green-500/15 text-green-600 dark:text-green-300'
                  : 'bg-orange-500/15 text-orange-600 dark:text-orange-300'
            }`}>
              {t(`status.${order.status}`)} · {t(`payment.${order.paymentStatus}`)}
            </span>
          </div>
          <div className="flex justify-between opacity-70">
            <span>{format.dateTime(new Date(order.createdAt), { dateStyle: 'medium', timeZone: 'America/Santo_Domingo' })}</span>
            <span>{t('total', { total: format.number(order.subtotal) })}</span>
          </div>
          <div className="text-xs opacity-60">
            {t('items_count', { count: order.totalItems })}
          </div>
        </Link>
      ))}
    </div>
  )
}
