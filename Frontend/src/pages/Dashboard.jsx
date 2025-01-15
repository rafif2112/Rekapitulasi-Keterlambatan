import { Users, UserCog, GraduationCap, BookOpen, MapPin, User } from 'lucide-react'
import StatCard from '../components/StatCard'
import BreadCrumb from '../components/Breadcrumb'
import { useState, useEffect } from 'react'
import axiosInstance from '../utils/axios'

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        siswa: 0,
        admin: 0,
        pembimbing: 0,
        rombel: 0,
        rayon: 0
    });
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/dashboard');
                setData(response.data);
                // console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        const fetchDataPs = async () => {
            try {
                const response = await axiosInstance.get('/dashboard-ps');
                setData(response.data);
                // console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }

        if (user.role === 'admin') {
            fetchData();
        } else {
            fetchDataPs();
        }
    }, [user.role]);
    return (
        <>
            {loading ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
                    <div className="h-32 bg-gray-200 rounded"></div>
                    <div className="h-32 bg-gray-200 rounded"></div>
                    <div className="h-32 bg-gray-200 rounded"></div>
                    <div className="h-32 bg-gray-200 rounded"></div>
                    <div className="h-32 bg-gray-200 rounded"></div>
                </div>
            ) : (
                <div className="bg-gray-100">
                    <main className="transition-all duration-300 transform ease-in-out">
                        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                        <BreadCrumb />
                        {user.role === 'admin' ? (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <StatCard title="Peserta Didik" value={data.siswa} icon={Users} />
                                <StatCard title="Administrator" value={data.admin} icon={UserCog} />
                                <StatCard title="Pembimbing Siswa" value={data.pembimbing} icon={GraduationCap} />
                                <StatCard title="Rombel" value={data.rombel} icon={BookOpen} />
                                <StatCard title="Rayon" value={data.rayon} icon={MapPin} />
                            </div>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                                <StatCard title={`Peserta Didik Rayon ${data.rayon}`} value={data.total_students} icon={User} />
                                <StatCard 
                                    title={`Keterlambatan ${data.rayon} Hari Ini`} 
                                    value={data.today_late}
                                    subtitle={new Date(data.today).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                    icon={User} 
                                />
                            </div>
                        )}
                    </main>
                </div>
            )}
        </>
    )
}

export default Dashboard