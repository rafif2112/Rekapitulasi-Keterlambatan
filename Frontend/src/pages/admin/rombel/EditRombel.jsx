import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumb from "../../../components/Breadcrumb";
import axiosInstance from '../../../utils/axios';
// import Loading from '../../../components/Loading';

const EditRombel = () => {
    const { id } = useParams();
    const [rombel, setRombel] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadInput, setLoadInput] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch existing rombel data
        const fetchRombel = async () => {
            setLoadInput(true);
            try {
                // Replace with your actual API endpoint
                const response = await axiosInstance.get(`/rombel/${id}`);
                setRombel(response.data.data || ''); // Ensure rombel is always defined
                setLoadInput(false);
            } catch (error) {
                console.error('Error fetching rombel:', error);
                setLoadInput(false);
            }
        };
        fetchRombel();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Replace with your actual API endpoint
            await axiosInstance.put(`/rombel/update/${id}`, { rombel });
            setLoading(false);
            navigate('/rombel');
            // Add navigation or success message here
        } catch (error) {
            console.error('Error updating rombel:', error);
            setLoading(false);
            if (error.response && error.response.data && error.response.data.errors) {
                setError(error.response.data.errors.rombel[0]);
            }
        }
    };

    return (
        <>
            {loading ? (
                <div className={`absolute min-h-screen min-w-full ${loading ? 'cursor-wait' : ''}`} style={{zIndex: 99999}}></div>
            ) : ''}
            
            <div className="bg-gray-100">
                <div className="container mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold text-blue-700">Edit Rombel</h1>
                        <BreadCrumb />
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-4">
                                <label htmlFor="rombel" className="block text-gray-700 mb-2">
                                    Rombel
                                </label>
                                {loadInput ? (
                                    <div className="animate-pulse">
                                        <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        id="rombel"
                                        onChange={(e) => setRombel(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        placeholder={rombel.rombel}
                                        required
                                    />
                                )}
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditRombel;