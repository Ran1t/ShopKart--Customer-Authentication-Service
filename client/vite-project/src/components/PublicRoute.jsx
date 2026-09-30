import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function PublicRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <p role="status" className="p-6 text-center text-[#6B7773]">Loading...</p>;
    }

    if (user) {
        return <Navigate to="/home" replace />;
    }

    return children;
}
