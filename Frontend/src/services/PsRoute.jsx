import { Navigate, Outlet } from "react-router-dom";

export default function PSRoute() {
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    const userRole = userData.role;
    
    if (userRole !== 'ps') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}