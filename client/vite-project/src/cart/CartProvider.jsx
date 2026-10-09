import { useCallback, useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../axiosCalls/axios";
import { CartContext } from "./cartContext";
import { useAuth } from "../auth/authContext";

export default function CartProvider({ children }) {
    const { user, loading: authLoading } = useAuth();
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
        if (authLoading) return;
        if (user) {
            refreshCart();
        } else {
            setItems([]);
            setError(false);
            setLoading(false);
        }
    }, [authLoading, user, refreshCart]);

    const addToCart = useCallback(async (product) => {
        if (!product || product.stock <= 0) return;
        if (pendingProductIds.includes(product._id)) return;

        setPendingProductIds((current) => [...current, product._id]);
        setError(false);

        try {
            const response = await axiosInstance.post(`/cart/${product._id}`);
            setItems(response.data.cart ?? []);
        } catch (requestError) {
            console.error("Failed to add product to cart:", requestError);
            throw requestError;
        } finally {
            setPendingProductIds((current) => current.filter((id) => id !== product._id));
        }
    }, [pendingProductIds]);

    const changeQuantity = useCallback(async (productId, quantity) => {
        if (!productId || quantity < 1) return;
        if (pendingProductIds.includes(productId)) return;

        setPendingProductIds((current) => [...current, productId]);
        setError(false);

        try {
            const response = await axiosInstance.patch(`/cart/${productId}`, { quantity });
            setItems(response.data.cart ?? []);
        } catch (requestError) {
            console.error("Failed to update cart quantity:", requestError);
            throw requestError;
        } finally {
            setPendingProductIds((current) => current.filter((id) => id !== productId));
        }
    }, [pendingProductIds]);

    const removeFromCart = useCallback(async (productId) => {
        if (!productId) return;
        if (pendingProductIds.includes(productId)) return;

        setPendingProductIds((current) => [...current, productId]);
        setError(false);

        try {
            const response = await axiosInstance.delete(`/cart/${productId}`);
            setItems(response.data.cart ?? []);
        } catch (requestError) {
            console.error("Failed to remove product from cart:", requestError);
            throw requestError;
        } finally {
            setPendingProductIds((current) => current.filter((id) => id !== productId));
        }
    }, [pendingProductIds]);

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
