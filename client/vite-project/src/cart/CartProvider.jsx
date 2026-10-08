import { useCallback, useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../axiosCalls/axios";
import { CartContext } from "./cartContext";

export default function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pendingProductIds, setPendingProductIds] = useState([]);

    const refreshCart = useCallback(async () => {
        setLoading(true);
        setError(false);

        try {
            const response = await axiosInstance.get("/cart");
            setItems(response.data.cart ?? []);
        } catch (requestError) {
            console.error("Failed to load cart:", requestError);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    const addToCart = useCallback(async (product) => {
        if (!product || product.stock <= 0) return;

        setPendingProductIds((current) => [...current, product._id]);
        setError(false);

        try {
            const response = await axiosInstance.post(`/cart/${product._id}`);
            setItems(response.data.cart ?? []);
        } catch (requestError) {
            console.error("Failed to add product to cart:", requestError);
            setError(true);
            throw requestError;
        } finally {
            setPendingProductIds((current) => current.filter((id) => id !== product._id));
        }
    }, []);

    const changeQuantity = useCallback(async (productId, quantity) => {
        if (!productId || quantity < 1) return;

        setPendingProductIds((current) => [...current, productId]);
        setError(false);

        try {
            const response = await axiosInstance.patch(`/cart/${productId}`, { quantity });
            setItems(response.data.cart ?? []);
        } catch (requestError) {
            console.error("Failed to update cart quantity:", requestError);
            setError(true);
            throw requestError;
        } finally {
            setPendingProductIds((current) => current.filter((id) => id !== productId));
        }
    }, []);

    const removeFromCart = useCallback(async (productId) => {
        if (!productId) return;

        setPendingProductIds((current) => [...current, productId]);
        setError(false);

        try {
            const response = await axiosInstance.delete(`/cart/${productId}`);
            setItems(response.data.cart ?? []);
        } catch (requestError) {
            console.error("Failed to remove product from cart:", requestError);
            setError(true);
            throw requestError;
        } finally {
            setPendingProductIds((current) => current.filter((id) => id !== productId));
        }
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const itemCount = useMemo(
        () => items.reduce((count, item) => count + (item.quantity || 0), 0),
        [items]
    );

    const subtotal = useMemo(
        () => items.reduce((total, item) => total + ((item.product?.price ?? 0) * (item.quantity || 0)), 0),
        [items]
    );

    return (
        <CartContext.Provider value={{
            items,
            itemCount,
            subtotal,
            loading,
            error,
            pendingProductIds,
            refreshCart,
            addToCart,
            changeQuantity,
            removeFromCart,
            clearCart,
        }}>
            {children}
        </CartContext.Provider>
    );
}
