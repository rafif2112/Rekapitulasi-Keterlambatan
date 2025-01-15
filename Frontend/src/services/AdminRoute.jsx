import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    // Check if user exists and access role from the user object
    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}