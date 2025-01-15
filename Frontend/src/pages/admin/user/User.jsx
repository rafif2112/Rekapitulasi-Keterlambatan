import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BreadCrumb from "../../../components/Breadcrumb";
import axiosInstance from "../../../utils/axios";

export default function User() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadInput, setLoadInput] = useState(false);

    useEffect(() => {
        axiosInstance.get('/user')
            .then((response) => {
                setUsers(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        setLoadInput(true);
        axiosInstance.delete(`/user/delete/${id}`)
            .then((response) => {
                console.log(response);
                setLoadInput(false);
                setUsers(users.filter(user => user.id !== id));
            })
            .catch((error) => {
                console.error(error);
                setLoadInput(false);
            });
    }

    return (
        <>
            {loadInput && (
                <div className="absolute min-h-screen min-w-full cursor-wait" style={{zIndex: 99999}}></div>
            )}

            <div className="bg-gray-100">
                <div className="container mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold text-blue-700">Data User</h1>
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
                                    <th className="py-2 px-4 border-b">Nama</th>
                                    <th className="py-2 px-4 border-b">Email</th>
                                    <th className="py-2 px-4 border-b">Role</th>
                                    <th className="py-2 px-4 border-b">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">Loading...</td>
                                    </tr>
                                ) : (
                                    users.map((user, index) => (
                                        <tr key={user.id}>
                                            <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                            <td className="py-2 px-4 border-b text-center">{user.name}</td>
                                            <td className="py-2 px-4 border-b text-center">{user.email}</td>
                                            <td className="py-2 px-4 border-b text-center">{user.role}</td>
                                            <td className="py-2 px-4 border-b text-center">
                                                <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
                                                    <Link to={`edit/${user.id}`}>Edit</Link>
                                                </button>
                                                <button className="bg-red-600 text-white px-4 py-2 rounded"
                                                    onClick={() => handleDelete(user.id)}>
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
    )
}