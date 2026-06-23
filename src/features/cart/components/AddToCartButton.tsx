"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import { useCart } from '../hooks/useCart';
import { Product } from '@/types/product';
import './AddToCartButton.css';

interface AddToCartButtonProps {
    product: Product;
}

/**
 * AddToCartButton - Add to Cart Button Component
 *
 * Displays an add-to-cart button or quantity controls
 * depending on whether the product is already in the cart.
 * Shows "Add" button when quantity is 0,
 * and increment/decrement controls when quantity > 0.
 */
const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
    const t = useTranslations('common');
    const { cart, addToCart, updateQuantity } = useCart();
    
    // Buscar si el producto ya está en el carrito para obtener la cantidad
    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.cantidad : 0;

    const handleInitialAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            precioTexto: product.precioTexto,
            img: product.imagen,
            unidad: product.unidad,
        });
    };

    const handleIncrement = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        updateQuantity(product.id, 1);
    };

    const handleDecrement = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        updateQuantity(product.id, -1);
    };

    if (quantity === 0) {
        return (
            <button
                onClick={handleInitialAdd}
                className="btn-agregar"
                aria-label={`${t('cart.add_button')} ${product.nombre} ${t('product.add_to_cart')}`}
            >
                {t('cart.add_button')}
            </button>
        );
    }

    return (
        <div className="cart-counter-container">
            <button 
                onClick={handleDecrement} 
                className="counter-btn minus"
                aria-label={t('cart.decrease_qty')}
            >
                -
            </button>
            <span className="counter-value">{quantity}</span>
            <button 
                onClick={handleIncrement} 
                className="counter-btn plus"
                aria-label={t('cart.increase_qty')}
            >
                +
            </button>
        </div>
    );
};

export default AddToCartButton;

