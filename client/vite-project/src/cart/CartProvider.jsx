import { useEffect, useState } from "react";
import { CartContext } from "./cartContext";

const STORAGE_KEY = "shopkart-cart";

function readCart() {
    try {
        const savedCart = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
        return Array.isArray(savedCart) ? savedCart : [];
    } catch {
        return [];
    }
}

export default function CartProvider({ children }) {
    const [items, setItems] = useState(readCart);

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addToCart = (product) => {
        if (!product || product.stock <= 0) return;

        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.product._id === product._id);

            if (!existingItem) return [...currentItems, { product, quantity: 1 }];

            return currentItems.map((item) => item.product._id === product._id
                ? { product, quantity: Math.min(item.quantity + 1, product.stock) }
                : item);
        });
    };

    const changeQuantity = (productId, quantity) => {
        setItems((currentItems) => currentItems.flatMap((item) => {
            if (item.product._id !== productId) return [item];
            if (quantity <= 0 || item.product.stock <= 0) return [];

            return [{ ...item, quantity: Math.min(quantity, item.product.stock) }];
        }));
    };

    const removeFromCart = (productId) => {
        setItems((currentItems) => currentItems.filter((item) => item.product._id !== productId));
    };

    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, itemCount, subtotal, addToCart, changeQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}