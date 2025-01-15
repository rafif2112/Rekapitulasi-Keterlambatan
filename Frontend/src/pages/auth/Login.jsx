import { useState, useEffect } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import Loading from '../../components/Loading';
import image from '../../assets/images/asset.png';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // Check if already logged in
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('/login', formData);
            if (response.data?.access_token) {
                localStorage.setItem("access_token", response.data.access_token);
                if (response.data.user) {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                }
                navigate("/", { replace: true });
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "An error occurred during login"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : ''}

            <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4" >
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-6xl flex h-[80vh]">
                    <div className="w-1/2 p-8 flex flex-col justify-center">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Selamat Datang Kembali</h1>
                            <p className="text-gray-600 mt-2">Silakan masuk untuk memulai</p>
                        </div>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">
                                    Alamat Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                                        placeholder="Masukkan email anda"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2">
                                    Kata Sandi
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                                        placeholder="Masukkan kata sandi anda"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                            >
                                Masuk
                            </button>
                        </form>

                        <p className="text-center mt-6 text-sm text-gray-600">
                            Belum punya akun?{' '}
                            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                                Daftar
                            </a>
                        </p>
                    </div>

                    {/* Right side - Image */}
                    <div className="w-1/2 bg-blue-400 rounded-r-2xl flex items-center justify-center">
                        <img
                            src={image}
                            alt="Login"
                            className="object-cover h-full w-full rounded-r-2xl"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}