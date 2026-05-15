"use client";
import { createContext, useState, useCallback, useEffect, ReactNode } from 'react'

export interface CartItem {
    id: string
    nombre: string
    precio: number
    precioTexto?: string
    img: string
    unidad?: string
    cantidad: number
    isOffer?: boolean
    oldPrice?: string
    discountPercentage?: number
}

interface CartContextType {
    cart: CartItem[]
    totalItems: number
    totalPrice: number
    addToCart: (product: Omit<CartItem, 'cantidad'>) => void
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
 * CartProvider - Proveedor de estado global del carrito
 */
export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Cargar desde localStorage SOLO después del montaje (Client-side)
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setCart(JSON.parse(saved));
            }
        } catch (error) {
            console.error('Error loading cart from storage:', error);
        } finally {
            setIsInitialized(true);
        }
    }, []);

    // Guardar en localStorage cuando cambien los items
    useEffect(() => {
        if (!isInitialized) return;

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch (error) {
            console.error('Error saving cart to storage:', error);
        }
    }, [cart, isInitialized]);

    const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    const addToCart = useCallback((product: Omit<CartItem, 'cantidad'>) => {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item.id === product.id);
            if (existing) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            
            const discountPercentage = calculateDiscountPercentage(product.oldPrice, product.precio);
            return [...prevCart, { ...product, cantidad: 1, discountPercentage }];
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
