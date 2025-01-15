import BreadCrumb from "../../../components/Breadcrumb";
import { useState, useEffect, useCallback } from 'react';
import axiosInstance from "../../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../../../components/Loading";
const BASE_URL = 'http://localhost:9000/asset/bukti/';

export default function EditLate() {
    const [student, setStudent] = useState('');
    const [date, setDate] = useState(new Date());
    const [information, setInformation] = useState('');
    const [bukti, setBukti] = useState(null);
    const [currentBukti, setCurrentBukti] = useState('');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadInput, setLoadInput] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchStudents = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/student');
            setStudents(response.data.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }, []);

    const fetchLateData = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/late/${id}`);
            const data = response.data.data;
            setStudent(data.student_id);
            setDate(new Date(data.date_time_late));
            setInformation(data.information);
            setCurrentBukti(data.bukti);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching late data:', error);
            setLoading(false)
        }
    }, [id]);

    useEffect(() => {
        fetchStudents();
        fetchLateData();
    }, [fetchStudents, fetchLateData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadInput(true);
        setError({});
        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
        
        try {
            await axiosInstance.put(`/late/update/${id}`,{
                siswa: student,
                date: formattedDate,
                keterangan: information,
                bukti: bukti,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/keterlambatan');
        } catch (error) {
            console.error('Error updating late data:', error);
            if (error.response?.data?.errors) {
                setError(error.response.data.errors);
            }
        } finally {
            setLoadInput(false);
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : null
            }

            <div className="bg-gray-100">
                <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-blue-700">Edit Data Keterlambatan</h1>
                    <BreadCrumb />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Siswa</label>
                            <select
                                className={`w-full mt-1 p-2 border ${error.student_id ? 'border-red-500' : 'border-gray-300'} rounded`}
                                value={student}
                                onChange={(e) => setStudent(e.target.value)}
                            >
                                <option value="" selected disabled>Pilih Siswa</option>
                                {students.map((s) => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                            {error.student_id && <p className="text-red-500 text-sm mt-1">{error.student_id}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Tanggal</label>
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                className="w-full mt-1 p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Keterangan Keterlambatan</label>
                            <textarea
                                className={`w-full mt-1 p-2 border ${error.information ? 'border-red-500' : 'border-gray-300'} rounded`}
                                value={information}
                                onChange={(e) => setInformation(e.target.value)}
                            ></textarea>
                            {error.information && <p className="text-red-500 text-sm mt-1">{error.information}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Bukti</label>
                            {currentBukti && (
                                <div className="mb-2">
                                    <img src={`${BASE_URL}${currentBukti}`} alt="Bukti keterlambatan" className="max-w-xs" />
                                </div>
                            )}
                            <input
                                type="file"
                                className={`w-full mt-1 p-2 border ${error.bukti ? 'border-red-500' : 'border-gray-300'} rounded`}
                                onChange={(e) => setBukti(e.target.files[0])}
                            />
                            {error.bukti && <p className="text-red-500 text-sm mt-1">{error.bukti}</p>}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                disabled={loading}
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