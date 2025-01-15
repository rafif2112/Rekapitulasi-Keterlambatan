import { Link } from "react-router-dom";
import BreadCrumb from "../../../components/Breadcrumb";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";

export default function Student() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('/student')
            .then((response) => {
                setStudents(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        axiosInstance.delete(`/student/delete/${id}`)
            .then((response) => {
                console.log(response);
                setStudents(students.filter(student => student.id !== id));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-blue-700">Data Siswa</h1>
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
                                <th className="py-2 px-4 border-b">NIS</th>
                                <th className="py-2 px-4 border-b">Rombel</th>
                                <th className="py-2 px-4 border-b">Rayon</th>
                                <th className="py-2 px-4 border-b">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">Loading...</td>
                                </tr>
                            ) : (
                                students.map((student, index) => (
                                    <tr key={student.id}>
                                        <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                        <td className="py-2 px-4 border-b text-center">{student.name}</td>
                                        <td className="py-2 px-4 border-b text-center">{student.nis}</td>
                                        <td className="py-2 px-4 border-b text-center">{student.rombel_id}</td>
                                        <td className="py-2 px-4 border-b text-center">{student.rayon_id}</td>
                                        <td className="py-2 px-4 border-b text-center">
                                            <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
                                                <Link to={`edit/${student.id}`}>Edit</Link>
                                            </button>
                                            <button className="bg-red-600 text-white px-4 py-2 rounded"
                                                onClick={() => handleDelete(student.id)}>Hapus
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
    )
}