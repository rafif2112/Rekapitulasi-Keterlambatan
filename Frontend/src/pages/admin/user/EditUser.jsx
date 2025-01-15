/* eslint-disable no-unused-vars */
import BreadCrumb from "../../../components/Breadcrumb";
import { useEffect, useState } from 'react';
import axiosInstance from "../../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadInput, setLoadInput] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axiosInstance.get(`/user/${id}`)
            .then((response) => {
                const data = response.data.data;
                setName(data.name);
                setEmail(data.email);
                setRole(data.role);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setLoadInput(true);
        setError('');

        const formData = {
            name,
            email,
            role,
            ...(password && { password })
        };

        axiosInstance.put(`/user/update/${id}`, formData)
            .then((response) => {
                setLoading(false);
                setLoadInput(false);
                navigate('/user');
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                setLoadInput(false);
                if (error.response?.data?.errors) {
                    setError(error.response.data.errors);
                }
            });
    };

    return (
        <>
            {loading && (
                <div className="absolute min-h-screen min-w-full cursor-wait" style={{zIndex: 99999}}></div>
            )}

            <div className="mx-auto">
                <h1 className="text-2xl font-bold text-blue-900">Edit Data User</h1>
                <BreadCrumb />
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Nama</label>
                            <input 
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input 
                                type="email" 
                                className="w-full p-2 border border-gray-300 rounded" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <input 
                                type="password" 
                                className="w-full p-2 border border-gray-300 rounded" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Leave blank to keep current password"
                            />
                            {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Role</label>
                            <select 
                                className="w-full p-2 border border-gray-300 rounded"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="" selected disabled>Pilih Role</option>
                                <option value="admin">Admin</option>
                                <option value="ps">Pembimbing Siswa</option>
                            </select>
                            {error.role && <p className="text-red-500 text-sm mt-1">{error.role}</p>}
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
                            >
                                {loadInput ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}