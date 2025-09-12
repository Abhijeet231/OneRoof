import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/components/provider/AuthProvider";

export default function ProtectedRoute() {
    const {token} = useAuth();

    if(!token) {
        return <Navigate to="/login" replace />
    }
    return <Outlet/>
}