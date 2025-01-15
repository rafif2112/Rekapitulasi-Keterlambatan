import Breadcrumb from "../../../components/Breadcrumb";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";

export default function StudentPs() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('/pembimbing/student')
            .then((response) => {
                setStudents(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);
    return (
        <div className="bg-gray-100">
            <div className="container mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-blue-700">Data Siswa</h1>
                    <Breadcrumb />
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
                                <th className="py-4 px-4 border-b">No</th>
                                <th className="py-4 px-4 border-b">Nama</th>
                                <th className="py-4 px-4 border-b">NIS</th>
                                <th className="py-4 px-4 border-b">Rombel</th>
                                <th className="py-4 px-4 border-b">Rayon</th>
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
                                        <td className="py-4 px-4 border-b text-center">{index + 1}</td>
                                        <td className="py-4 px-4 border-b text-center">{student.name}</td>
                                        <td className="py-4 px-4 border-b text-center">{student.nis}</td>
                                        <td className="py-4 px-4 border-b text-center">{student.rombel_name}</td>
                                        <td className="py-4 px-4 border-b text-center">{student.rayon_name}</td>
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