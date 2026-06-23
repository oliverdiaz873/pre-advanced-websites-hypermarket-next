"use client";
/**
 * @fileoverview Contexto Global del Carrito de Compras
 * 
 * Este módulo proporciona la gestión del estado global para el carrito, incluyendo:
 * - Persistencia automática en localStorage ('carrito').
 * - Cálculos dinámicos de totales (items y precio).
 * - Lógica de normalización de unidades y cálculo de descuentos.
 * - Acciones para agregar, eliminar y actualizar cantidades.
 */
import { createContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react'
import { unitLabel } from '@/lib/priceUtils'
import type { Product } from '@/types/product'

export interface CartItem {
    id: string
    nombre: string
    precio: number
    precioTexto?: string
    img: string
    unidad?: string
    unitLabel: string
    cantidad: number
    isOffer?: boolean
    oldPrice?: string
    discountPercentage?: number
}

interface CartContextType {
    cart: CartItem[]
    totalItems: number
    totalPrice: number
    addToCart: (product: Omit<CartItem, 'cantidad' | 'unitLabel'>) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, delta: number) => void
    clearCart: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'carrito'

/**
 * Calcula el porcentaje de descuento basado en el precio anterior y actual
 */
const calculateDiscountPercentage = (oldPrice?: string, currentPrice?: number): number | undefined => {
    if (!oldPrice || !currentPrice) return undefined
    const numericOldPrice = parseFloat(oldPrice.replace(/[^\d.-]/g, ''))
    if (isNaN(numericOldPrice) || numericOldPrice <= 0) return undefined
    const discount = ((numericOldPrice - currentPrice) / numericOldPrice) * 100
    return Math.round(discount)
}

/**
 * CartProvider - Componente proveedor que envuelve la aplicación
 * Maneja la hidratación del estado desde localStorage y la sincronización.
 */
export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const hasHydratedRef = useRef(false);

    // Cargar desde localStorage después de la hidratación (solo una vez)
    useEffect(() => {
        if (hasHydratedRef.current) return;
        hasHydratedRef.current = true;

        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved) as CartItem[];
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setCart(parsed.map(item => ({
                    ...item,
                    unitLabel: item.unitLabel || unitLabel({ unidad: item.unidad, precioTexto: item.precioTexto } as Product)
                })));
            }
        } catch {
            // Silently fail — localStorage errors are non-critical
        } finally {
            setIsInitialized(true);
        }
    }, []);


    // Guardar en localStorage cuando cambien los items
    useEffect(() => {
        if (!isInitialized) return;

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch {
            // Silently fail — localStorage errors are non-critical
        }
    }, [cart, isInitialized]);

    const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    const addToCart = useCallback((product: Omit<CartItem, 'cantidad' | 'unitLabel'>) => {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item.id === product.id);
            if (existing) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            
            const finalUnidad = product.unidad || (product.precioTexto ? product.precioTexto.split('/').pop()?.trim() : undefined);
            const finalUnitLabel = unitLabel({ unidad: product.unidad, precioTexto: product.precioTexto } as Product);
            
            const discountPercentage = calculateDiscountPercentage(product.oldPrice, product.precio);
            return [...prevCart, { ...product, unidad: finalUnidad, unitLabel: finalUnitLabel, cantidad: 1, discountPercentage }];
        });
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, delta: number) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === id ? { ...item, cantidad: item.cantidad + delta } : item
                )
                .filter((item) => item.cantidad > 0)
        );
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    const value: CartContextType = {
        cart,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
