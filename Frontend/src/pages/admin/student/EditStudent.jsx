/* eslint-disable no-unused-vars */
import BreadCrumb from "../../../components/Breadcrumb";
import { useEffect, useState } from 'react';
import axiosInstance from "../../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditStudent() {
    const [nis, setNis] = useState('');
    const [nama, setName] = useState('');
    const [rombel, setRombel] = useState('');
    const [rayon, setRayon] = useState('');
    const [rayonList, setRayonList] = useState([]);
    const [rombelList, setRombelList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadInput, setLoadInput] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Fetch student data
        axiosInstance.get(`/student/${id}`)
            .then((response) => {
                const data = response.data.data;
                setNis(data.nis);
                setName(data.name);
                setRombel(data.rombel_id);
                setRayon(data.rayon_id);
                // setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                // setLoading(false);
            });

        // Fetch rayon list
        axiosInstance.get('/rayon')
            .then((response) => {
                setRayonList(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
        
        // Fetch rombel list
        axiosInstance.get('/rombel')
            .then((response) => {
                setRombelList(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setLoadInput(true);
        setError('');

        axiosInstance.put(`/student/update/${id}`, {
            nis,
            nama,
            rombel,
            rayon
        })
            .then((response) => {
                setLoading(false);
                setLoadInput(false);
                navigate('/siswa');
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                setLoadInput(false);
                if (error.response?.data?.errors) {
                    setError(error.response.data.errors);
                }
            });
    };

    return (
        <>
            {loading && (
                <div className="absolute min-h-screen min-w-full cursor-wait" style={{zIndex: 99999}}></div>
            )}

            {/* {console.log(rayon)} */}

            <div className="mx-auto">
                <h1 className="text-2xl font-bold text-blue-900">Edit Data Siswa</h1>
                <BreadCrumb />
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">NIS</label>
                            <input 
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded" 
                                value={nis}
                                onChange={(e) => setNis(e.target.value)}
                            />
                            {error.nis && <p className="text-red-500 text-sm mt-1">{error.nis}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Nama</label>
                            <input 
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded" 
                                value={nama}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Rombel</label>
                            <select 
                                className="w-full p-2 border border-gray-300 rounded"
                                value={rombel}
                                onChange={(e) => setRombel(e.target.value)}
                            >
                                <option value="" selected disabled>Pilih Rombel</option>
                                {rombelList.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.rombel}
                                    </option>
                                ))}
                            </select>
                            {error.rombel && <p className="text-red-500 text-sm mt-1">{error.rombel}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Rayon</label>
                            <select 
                                className="w-full p-2 border border-gray-300 rounded"
                                value={rayon}
                                onChange={(e) => setRayon(e.target.value)}
                            >
                                <option value="" selected disabled>Pilih Rayon</option>
                                {rayonList.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.rayon}
                                    </option>
                                ))}
                            </select>
                            {error.rayon && <p className="text-red-500 text-sm mt-1">{error.rayon}</p>}
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
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