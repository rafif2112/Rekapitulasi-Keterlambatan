import { Link } from "react-router-dom";
import BreadCrumb from "../../../components/Breadcrumb";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";

export default function Rayon() {
    const [rayons, setRayons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadInput, setLoadInput] = useState(false);

    useEffect(() => {
        axiosInstance.get('/rayon')
            .then((response) => {
                setRayons(response.data.data);
                console.log(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        setLoadInput(true);
        axiosInstance.delete(`/rayon/delete/${id}`)
            .then((response) => {
                console.log(response);
                setLoadInput(false);
                setRayons(rayons.filter(rayon => rayon.id !== id));
            })
            .catch((error) => {
                setLoadInput(false);
                console.error(error);
            });
    }

    return (
        <>
            {loadInput ? (
                <div className={`absolute min-h-screen min-w-full ${loadInput ? 'cursor-wait' : ''}`} style={{ zIndex: 99999 }}></div>
            ) : ''}
            <div className="bg-gray-100">
                <div className="container mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold text-blue-700">Data Rayon</h1>
                        <BreadCrumb />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
                            <Link to={'create'}>Tambah</Link>
                        </button>
                        <div className="flex items-center mb-4">
                            <label htmlFor="entries" className="mr-2">Show</label>
                            <select id="entries" className="border border-gray-300 rounded p-2">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <span className="ml-2">entries per page</span>
                            <div className="ml-auto">
                                <input type="text" placeholder="Search..." className="border border-gray-300 rounded p-2" />
                            </div>
                        </div>
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">No</th>
                                    <th className="py-2 px-4 border-b">Rayon</th>
                                    <th className="py-2 px-4 border-b">Pembimbing Siswa</th>
                                    <th className="py-2 px-4 border-b">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4">Loading...</td>
                                    </tr>
                                ) : (
                                    rayons.map((rayon, index) => (
                                        <tr key={rayon.id}>
                                            <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                            <td className="py-2 px-4 border-b text-center">{rayon.rayon}</td>
                                            <td className="py-2 px-4 border-b text-center">{rayon.user_id}</td>
                                            <td className="py-2 px-4 border-b text-center">
                                                <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
                                                    <Link to={`edit/${rayon.id}`}>Edit</Link>
                                                </button>
                                                <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => handleDelete(rayon.id)}>
                                                    {loadInput ? 'Menghapus...' : 'Hapus'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}