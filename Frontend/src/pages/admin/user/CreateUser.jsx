import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/Breadcrumb";
import { useState } from "react";
import axiosInstance from "../../../utils/axios";

export default function CreateUser() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        axiosInstance.post('/user/store', formData)
            .then((response) => {
                console.log(response);
                setLoading(false);
                navigate('/user');
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                if (error.response?.data?.errors) {
                    setError(Object.values(error.response.data.errors)[0][0]);
                }
            });
    };

    return (
        <>
            <div className="mx-auto">
                <h1 className="text-2xl font-bold text-blue-900">Tambah Data User</h1>
                <BreadCrumb />
                <div className="bg-white p-8 rounded-lg shadow-md">
                    {error && <div className="mb-4 text-red-500">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Nama</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Role</label>
                            <select
                                name="role"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="" selected disabled>Pilih Role</option>
                                <option value={'admin'}>Admin</option>
                                <option value={'ps'}>Pembimbing Siswa</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}