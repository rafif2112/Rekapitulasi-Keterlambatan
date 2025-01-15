import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumb from "../../../components/Breadcrumb";
import axiosInstance from '../../../utils/axios';
import Loading from '../../../components/Loading';
// Add base URL constant
const BASE_URL = 'http://localhost:9000/asset/bukti/';

export default function DetailLate() {
    const [studentData, setStudentData] = useState(null);
    const [lateRecords, setLateRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/late/student/${id}`);
                if (response.data.data.length > 0) {
                    const firstRecord = response.data.data[0];
                    // console.log(firstRecord);
                    setStudentData({
                        name: firstRecord.student_name,
                        nis: firstRecord.student_nis,
                        class: firstRecord.student_rombel,
                        rayon: firstRecord.student_rayon
                    });
                    setLateRecords(response.data.data.map((record, index) => ({
                        number: index + 1,
                        date: record.date_time,
                        reason: record.information,
                        imageUrl: record.bukti
                    })));
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="font-roboto">
            <div className="container mx-auto p-4">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-blue-900">
                        Detail Data Keterlambatan
                    </h1>
                    <BreadCrumb />
                </div>
                
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-blue-900">
                        {studentData?.name} | {studentData?.nis} | {studentData?.class} | {studentData?.rayon}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lateRecords.map((record) => (
                        <div key={record.number} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
                            <h3 className="text-xl font-bold text-blue-900">
                                Keterlambatan Ke-{record.number}
                            </h3>
                            <p className="text-gray-600">
                                {record.date}
                            </p>
                            <p className="text-blue-600">
                                {record.reason}
                            </p>
                            {record.imageUrl && (
                                <div className="flex-grow mt-4 h-48">
                                    <img 
                                        src={`${BASE_URL}${record.imageUrl}`}
                                        alt={`Bukti keterlambatan ke-${record.number}`}
                                        className="rounded-lg w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}