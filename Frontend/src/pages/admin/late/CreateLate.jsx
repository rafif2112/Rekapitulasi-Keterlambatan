import BreadCrumb from "../../../components/Breadcrumb";
import { useState, useEffect } from 'react';
import axiosInstance from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateLate() {
    const [student, setStudent] = useState('');
    const [date, setDate] = useState(new Date());
    const [information, setInformation] = useState('');
    const [bukti, setBukti] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);
    
    const fetchStudents = async () => {
        try {
            const response = await axiosInstance.get('/student');
            setStudents(response.data.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError({});
    
        // Format date to MySQL datetime format (YYYY-MM-DD HH:MM:SS)
        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    
        const formData = new FormData();
        formData.append('siswa', student);
        formData.append('date', formattedDate); // Use formatted date
        formData.append('keterangan', information);
        formData.append('bukti', bukti);
    
        try {
            await axiosInstance.post('/late/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/keterlambatan');
        } catch (error) {
            console.error('Error creating late data:', error);
            if (error.response?.data?.errors) {
                setError(error.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100">
            <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-blue-700">Tambah Data Keterlambatan</h1>
                <BreadCrumb />
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Siswa</label>
                        <select 
                            className={`w-full mt-1 p-2 border ${error.student_id ? 'border-red-500' : 'border-gray-300'} rounded`}
                            value={student}
                            onChange={(e) => setStudent(e.target.value)}
                        >
                            <option value="">Pilih Siswa</option>
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
                        {error.date_time && <p className="text-red-500 text-sm mt-1">{error.date_time}</p>}
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
                            {loading ? 'Mengirim...' : 'Tambah'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}