import { Link } from "react-router-dom";
import BreadCrumb from "../../../components/Breadcrumb";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";

export default function Rombel() {

    const [rombels, setRombels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('/rombel')
            .then((response) => {
                setRombels(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);;

    const handleDelete = (id) => {
        axiosInstance.delete(`/rombel/delete/${id}`)
            .then((response) => {
                console.log(response);
                setRombels(rombels.filter(rombel => rombel.id !== id));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <div className="bg-gray-100">
                <div className="container mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold text-blue-700">Data Rombel</h1>
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
                                    <th className="py-2 px-4 border-b">Rombel</th>
                                    <th className="py-2 px-4 border-b">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="3">
                                            <div className="animate-pulse">
                                                <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
                                                <div className="space-y-3">
                                                    {[...Array(3)].map((_, index) => (
                                                        <div key={index} className="grid grid-cols-3 gap-4">
                                                            <div className="h-10 bg-gray-200 rounded col-span-1"></div>
                                                            <div className="h-10 bg-gray-200 rounded col-span-1"></div>
                                                            <div className="h-10 bg-gray-200 rounded col-span-1"></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    rombels.map((rombel, index) => (
                                        <tr key={rombel.id}>
                                            <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                            <td className="py-2 px-4 border-b text-center">{rombel.rombel}</td>
                                            <td className="py-2 px-4 border-b text-center">
                                                <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
                                                    <Link to={`edit/${rombel.id}`}>Edit</Link>
                                                </button>
                                                <button className="bg-red-600 text-white px-4 py-2 rounded"
                                                    onClick={() => handleDelete(rombel.id)}> Hapus
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