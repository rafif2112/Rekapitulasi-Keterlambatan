import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import Loading from "../components/Loading";
import '../assets/css/layout.css';

export default function Layout() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [setIsOpen]);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await axiosInstance.post('/logout');
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            navigate("/login", { replace: true });
        } catch (err) {
            console.error("Logout failed:", err);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {isLoading && (
                <Loading />
            )}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className={`flex-1 flex flex-col transition-all duration-300 transform ease-in-out`}>
                <Navbar setIsOpen={setIsOpen} handleLogout={handleLogout} />
                <main className="p-6 transition-all duration-300 transform ease-in-out overflow-y-auto h-[calc(100vh-64px)]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}