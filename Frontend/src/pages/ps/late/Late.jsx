// /* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BreadCrumb from "../../../components/Breadcrumb";
import axiosInstance from "../../../utils/axios";

export default function LatePs() {
    const [lateRecords, setLateRecords] = useState([]);
    const [lateStudent, setLateStudent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("keseluruhan");

    const uniqueStudents = Object.values(lateStudent.reduce((acc, student) => {
        if (!acc[student.student_nis]) {
            acc[student.student_nis] = {
                ...student,
                jumlah_keterlambatan: parseInt(student.jumlah_keterlambatan)
            };
        } else {
            acc[student.student_nis].jumlah_keterlambatan;
        }
        return acc;
    }, {}));

    useEffect(() => {
        axiosInstance.get('pembimbing/late')
            .then((response) => {
                setLateRecords(response.data.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });

        axiosInstance.get('pembimbing/late/student')
            .then((response) => {
                setLateStudent(response.data.data);
                // console.log(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleExport = () => {
        setLoading(true);
        axiosInstance.get('/export-pembimbing', {
            responseType: 'blob'
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data-keterlambatan.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            setLoading(false);
        })
        .catch((error) => {
            console.error('Export failed:', error);
            setLoading(false);
        });
    };

    return (
        <>
            {loading ? (
                <div className={`absolute min-h-screen min-w-full ${loading ? 'cursor-wait' : ''}`} style={{zIndex: 99999}}></div>
            ) : ''}
            
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold text-blue-700 mb-4">Data Keterlambatan</h1>
                        <BreadCrumb />
                        <div className="mb-4 flex justify-start">
                            <button onClick={handleExport} className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition duration-300">
                                Export Data keterlambatan
                            </button>
                        </div>
                        <div className="border-b border-gray-200 mb-4">
                            <ul className="flex space-x-4">
                                <li className={`pb-2 ${activeTab === "keseluruhan" ? "border-b-2 border-blue-600" : ""}`}>
                                    <button onClick={() => setActiveTab("keseluruhan")}
                                        className={activeTab === "keseluruhan" ? "text-blue-600" : "text-gray-500"}>
                                        Keseluruhan Data
                                    </button>
                                </li>
                                <li className={`pb-2 ${activeTab === "rekapitulasi" ? "border-b-2 border-blue-600" : ""}`}>
                                    <button onClick={() => setActiveTab("rekapitulasi")}
                                        className={activeTab === "rekapitulasi" ? "text-blue-600" : "text-gray-500"}>
                                        Rekapitulasi Data
                                    </button>
                                </li>
                            </ul>
                        </div>
            
                        {activeTab === "keseluruhan" ? (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center space-x-2">
                                        <label htmlFor="entries" className="text-sm">Entries per page</label>
                                        <select id="entries" className="border border-gray-300 rounded p-1">
                                            <option>10</option>
                                            <option>25</option>
                                            <option>50</option>
                                            <option>100</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Search..." className="border border-gray-300 rounded p-1" />
                                    </div>
                                </div>
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className="py-4 px-4 border-b">No</th>
                                            <th className="py-4 px-4 border-b">Nama</th>
                                            <th className="py-4 px-4 border-b">Waktu</th>
                                            <th className="py-4 px-4 border-b">Informasi</th>
                                            <th className="py-4 px-4 border-b"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="5">
                                                    <div className="animate-pulse">
                                                        <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
                                                        <div className="space-y-3">
                                                            {[...Array(3)].map((_, index) => (
                                                                <div key={index} className="grid grid-cols-5 gap-4">
                                                                    <div className="h-10 bg-gray-200 rounded col-span-1"></div>
                                                                    <div className="h-10 bg-gray-200 rounded col-span-1"></div>
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
                                            lateRecords.map((lateRecord, index) => (
                                                <tr key={lateRecord.id}>
                                                    <td className="py-4 px-4 border-b text-center">{index + 1}</td>
                                                    <td className="py-4 px-4 border-b text-center">{lateRecord.student_id}</td>
                                                    <td className="py-4 px-4 border-b text-center">{lateRecord.date_time_late}</td>
                                                    <td className="py-4 px-4 border-b text-center">{lateRecord.information}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center space-x-2">
                                        <label htmlFor="entries" className="text-sm">Entries per page</label>
                                        <select id="entries" className="border border-gray-300 rounded p-1">
                                            <option>10</option>
                                            <option>25</option>
                                            <option>50</option>
                                            <option>100</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Search..." className="border border-gray-300 rounded p-1" />
                                    </div>
                                </div>
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className="py-4 px-4 border-b">No</th>
                                            <th className="py-4 px-4 border-b">NIS</th>
                                            <th className="py-4 px-4 border-b">Nama</th>
                                            <th className="py-4 px-4 border-b">Jumlah Keterlambatan</th>
                                            <th className="py-4 px-4 border-b"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {uniqueStudents.map((student, index) => (
                                            <tr key={student.id}>
                                                <td className="py-4 px-4 border-b text-center">{index + 1}</td>
                                                <td className="py-4 px-4 border-b text-center">{student.student_nis}</td>
                                                <td className="py-4 px-4 border-b text-center">{student.student_name}</td>
                                                <td className="py-4 px-4 border-b text-center">{student.jumlah_keterlambatan}</td>
                                                <td className="py-4 px-4 border-b text-center">
                                                    <div className="">
                                                        <Link className="underline mx-3 text-blue-600 hover:text-blue-800 transition duration-300"
                                                            to={`detail/${student.student_id}`}>Detail</Link>
                                                        {student.jumlah_keterlambatan >= 3 && (
                                                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                                                                Cetak Surat Pernyataan
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}