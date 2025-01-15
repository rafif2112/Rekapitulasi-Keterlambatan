import BreadCrumb from "../../../components/Breadcrumb";
import { useState } from 'react';
import axiosInstance from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";

const CreateRombel = () => {
    const [rombel, setRombel] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        axiosInstance.post('/rombel/store', {
            rombel: rombel
        })
            .then((response) => {
                console.log(response);
                setLoading(false);
                setRombel('');
                navigate('/rombel');
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                if (error.response && error.response.data && error.response.data.errors) {
                    setError(error.response.data.errors.rombel[0]);
                }
            })
    };

    return (
        <> 
            {loading ? (
                <Loading />
            ) : ''}
            
            <div className="bg-gray-100">
                <div className="container mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold text-blue-700">Tambah Rombel</h1>
                        <BreadCrumb />
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-4">
                                <label htmlFor="rombel" className="block text-gray-700 mb-2">
                                    Rombel
                                </label>
                                <input
                                    type="text"
                                    id="rombel"
                                    value={rombel}
                                    onChange={(e) => setRombel(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    placeholder="Masukkan nama rombel"
                                    required
                                />
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
                            >
                                Simpan
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateRombel;