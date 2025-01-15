/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { ChevronDown, LayoutDashboard, Database, ChartArea, CircleDot, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

function Sidebar({ isOpen, setIsOpen }) {
    const [isDataMasterOpen, setIsDataMasterOpen] = useState(false)
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <div
                className={`fixed inset-0 z-20 transition-opacity bg-black opacity-30 lg:hidden ${isOpen ? 'block' : 'hidden'
                    }`}
                onClick={() => setIsOpen(false)}
            ></div>

            <div
                className={`fixed inset-y-0 left-0 px-6 z-30 w-64 sm:w-80 overflow-y-auto transition duration-300 transform bg-white border-r lg:inset-0 ${isOpen ? 'translate-x-0 ease-out lg:static' : '-translate-x-full ease-in'
                    }`}
            >
                <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center">
                        <span className="text-2xl font-semibold text-gray-800">Rekam Keterlambatan</span>
                    </div>
                </div>

                <nav className="mt-10">
                    <Link
                        className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                        to={"/"}
                    >
                        <LayoutDashboard className="w-6 h-6" />
                        <span className="mx-3">Dashboard</span>
                    </Link>

                    {user.role === 'admin' ? (
                        <>
                            <div className="relative">
                                <button
                                    onClick={() => setIsDataMasterOpen(!isDataMasterOpen)}
                                    className="flex items-center w-full px-6 py-2 mt-4 text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none"
                                >
                                    <Database className="w-6 h-6" />
                                    <span className="mx-3">Data Master</span>
                                    <ChevronDown className={`w-5 h-5 ml-auto transform ${isDataMasterOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isDataMasterOpen && (
                                    <div className="mt-3 ml-2 space-y-3 px-7">
                                        <Link to={"/rombel"} className="flex items-center px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                                            <CircleDot className="w-2 h-2" />
                                            <span className="mx-3">Data Rombel</span>
                                        </Link>
                                        <Link to={"/rayon"} className="flex items-center px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                                            <CircleDot className="w-2 h-2" />
                                            <span className="mx-3">Data Rayon</span>
                                        </Link>
                                        <Link to={"/siswa"} className="flex items-center px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                                            <CircleDot className="w-2 h-2" />
                                            <span className="mx-3">Data Siswa</span>
                                        </Link>
                                        <Link to={"/user"} className="flex items-center px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                                            <CircleDot className="w-2 h-2" />
                                            <span className="mx-3">Data User</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <Link
                                className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                to={"/keterlambatan"}
                            >
                                <ChartArea className="w-6 h-6" />
                                <span className="mx-3">Data Keterlambatan</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                to={"/pembimbing/siswa"}
                            >
                                <Users className="w-6 h-6" />
                                <span className="mx-3">Data Siswa</span>
                            </Link>

                            <Link
                                className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                to={"/pembimbing/keterlambatan"}
                            >
                                <ChartArea className="w-6 h-6" />
                                <span className="mx-3">Data Keterlambatan</span>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </>
    )
}

export default Sidebar