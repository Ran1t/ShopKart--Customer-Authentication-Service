import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function ProtectedRoutes({ children }) {
    const { user, loading, error, refreshUser } = useAuth();
    const location = useLocation();

    if (loading) {
        return <p role="status" className="p-6 text-center text-[#6B7773]">Loading...</p>;
    }

    if (error) {
        return (
            <div role="alert" className="mx-auto mt-12 max-w-md px-6 text-center">
                <p className="text-sm text-[#B03A2E]">{error}</p>
                <button type="button" onClick={refreshUser} className="mt-3 text-sm font-semibold text-[#D84F38] underline underline-offset-4">Try again</button>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}
