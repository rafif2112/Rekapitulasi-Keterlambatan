import BreadCrumb from "../../../components/Breadcrumb";
import { useEffect, useState } from 'react';
import axiosInstance from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function CreateRayon() {
    const [rayon, setRayon] = useState('');
    const [dataPembimbing, setDataPembimbing] = useState([]);
    const [pembimbing, setPembimbing] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadInput, setLoadInput] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        try {
            axiosInstance.get('user/pembimbing')
                .then((response) => {
                    setDataPembimbing(response.data.data);
                    console.log(response.data.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }, []); // Removed extra parenthesis

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadInput(true);
        setError('');

        axiosInstance.post('/rayon/store', {
            rayon: rayon,
            pembimbing: pembimbing
        })
            .then((response) => {
                console.log(response);
                setLoadInput(false);
                setRayon('');
                setPembimbing('');
                navigate('/rayon');
            })
            .catch((error) => {
                console.error(error);
                setLoadInput(false);
                if (error.response && error.response.data && error.response.data.errors) {
                    setError(error.response.data.errors);
                    // console.log(error.response.data.errors);
                }
            });
    };

    return (
        <>
            {loading ? (
                <div className="absolute min-h-screen min-w-full cursor-wait" style={{zIndex: 99999}}></div>
            ) : null}

            <div className="bg-gray-100">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold text-blue-700 ">Tambah Data Rayon</h1>
                    <BreadCrumb />
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="rayon" className="block text-gray-700 font-bold mb-2">Rayon</label>
                                <input 
                                    type="text" 
                                    id="rayon" 
                                    name="rayon" 
                                    value={rayon}
                                    onChange={(e) => setRayon(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                                {error.rayon && <p className="text-red-500 text-sm mt-1">{error.rayon}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="pembimbing" className="block text-gray-700 font-bold mb-2">Pembimbing Siswa</label>
                                <select 
                                    id="pembimbing" 
                                    name="pembimbing" 
                                    value={pembimbing}
                                    onChange={(e) => setPembimbing(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                >
                                    <option value="" selected disabled>Pilih</option>
                                    {dataPembimbing.map((pembimbing, index) => (
                                        <option key={index} value={pembimbing.id}>
                                            {pembimbing.name}
                                        </option>
                                    ))}
                                </select>
                                {error.pembimbing && <p className="text-red-500 text-sm mt-1">{error.pembimbing}</p>}
                            </div>
                            <div className="mb-4">
                                <button 
                                    type="submit" 
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
                                    disabled={loadInput}
                                >
                                    {loadInput ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}