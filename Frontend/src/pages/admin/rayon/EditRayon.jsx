import BreadCrumb from "../../../components/Breadcrumb";
import { useEffect, useState } from 'react';
import axiosInstance from "../../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditRayon() {
    const [rayon, setRayon] = useState('');
    const [dataPembimbing, setDataPembimbing] = useState([]);
    const [pembimbing, setPembimbing] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadInput, setLoadInput] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Fetch rayon data
        axiosInstance.get(`/rayon/${id}`)
            .then((response) => {
                const data = response.data.data;
                setRayon(data.rayon);
                setPembimbing(data.user_id);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });

        // Fetch pembimbing data
        axiosInstance.get('user/pembimbing')
            .then((response) => {
                setDataPembimbing(response.data.data);
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

        axiosInstance.put(`/rayon/update/${id}`, {
            rayon: rayon,
            pembimbing: pembimbing
        })
            .then((response) => {
                console.log(response);
                setLoading(false);
                setLoadInput(false);
                navigate('/rayon');
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
            {/* {console.log(rayon)} */}
            {loading ? (
                <div className={`absolute min-h-screen min-w-full ${loading ? 'cursor-wait' : ''}`} style={{zIndex: 99999}}></div>
            ) : ''}

            <div className="bg-gray-100">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold text-blue-700 ">Edit Data Rayon</h1>
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
                                    // disabled={loading}
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