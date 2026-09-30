import { useCallback, useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../axiosCalls/axios";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const refreshUser = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axiosInstance.get("/customers/me");
            setUser(response.data.customer);
        } catch (requestError) {
            if ([401, 403, 404].includes(requestError.response?.status)) {
                setUser(null);
            } else {
                console.error("Failed to verify customer session:", requestError);
                setError("Unable to verify your session. Check your connection and try again.");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let active = true;

        axiosInstance.get("/customers/me")
            .then((response) => {
                if (active) setUser(response.data.customer);
            })
            .catch((requestError) => {
                if (!active) return;
                if ([401, 403, 404].includes(requestError.response?.status)) {
                    setUser(null);
                } else {
                    console.error("Failed to verify customer session:", requestError);
                    setError("Unable to verify your session. Check your connection and try again.");
                }
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => { active = false; };
    }, []);

    const value = useMemo(() => ({
        user,
        setUser,
        loading,
        error,
        refreshUser,
    }), [user, loading, error, refreshUser]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
