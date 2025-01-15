import BreadCrumb from "../../../components/Breadcrumb";
import { useEffect, useState } from 'react';
import axiosInstance from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function CreateStudent() {
    const [student, setStudent] = useState({
        nis: '',
        nama: '',
        rombel: '',
        rayon: ''
    });
    const [dataRombel, setDataRombel] = useState([]);
    const [dataRayon, setDataRayon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadInput, setLoadInput] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axiosInstance.get('/rombel')
            .then((response) => {
                setDataRombel(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });

        axiosInstance.get('/rayon')
            .then((response) => {
                setDataRayon(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadInput(true);
        setLoading(true);
        setError({});

        axiosInstance.post('/student/store', student)
            .then(() => {
                setLoadInput(false);
                setLoading(false);
                navigate('/siswa');
            })
            .catch((error) => {
                setLoadInput(false);
                setLoading(false);
                if (error.response && error.response.data && error.response.data.errors) {
                    setError(error.response.data.errors);
                    console.log(error.response.data.errors);
                } else {
                    console.error(error);
                }
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({
            ...student,
            [name]: value
        });
    };

    return (
        <>
            {loading ? (
                <div className="absolute min-h-screen min-w-full cursor-wait" style={{zIndex: 99999}}></div>
            ) : ''}

            <div className="mx-auto">
                <h1 className="text-2xl font-bold text-blue-900">Tambah Data Siswa</h1>
                <BreadCrumb />
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">NIS</label>
                            <input 
                                type="text" 
                                name="nis"
                                className="w-full p-2 border border-gray-300 rounded" 
                                value={student.nis} 
                                onChange={handleChange} 
                            />
                            {error.nis && <p className="text-red-500 text-sm mt-2">{error.nis[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Nama</label>
                            <input 
                                type="text" 
                                name="nama"
                                className="w-full p-2 border border-gray-300 rounded" 
                                value={student.nama} 
                                onChange={handleChange} 
                            />
                            {error.nama && <p className="text-red-500 text-sm mt-2">{error.nama[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Rombel</label>
                            <select 
                                name="rombel"
                                className="w-full p-2 border border-gray-300 rounded" 
                                value={student.rombel} 
                                onChange={handleChange}
                            >
                                <option value="">Pilih</option>
                                {dataRombel.map((rombel) => (
                                    <option key={rombel.id} value={rombel.id}>{rombel.rombel}</option>
                                ))}
                            </select>
                            {error.rombel && <p className="text-red-500 text-sm mt-2">{error.rombel[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Rayon</label>
                            <select 
                                name="rayon"
                                className="w-full p-2 border border-gray-300 rounded" 
                                value={student.rayon} 
                                onChange={handleChange}
                            >
                                <option value="">Pilih</option>
                                {dataRayon.map((rayon) => (
                                    <option key={rayon.id} value={rayon.id}>{rayon.rayon}</option>
                                ))}
                            </select>
                            {error.rayon && <p className="text-red-500 text-sm mt-2">{error.rayon[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <button 
                                type="submit" 
                                className="w-full p-2 bg-blue-500 text-white rounded"
                                disabled={loadInput}
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