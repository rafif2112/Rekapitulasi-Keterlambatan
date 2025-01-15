/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react'
import axiosInstance from '../utils/axios';

const Navbar = ({ setIsOpen, handleLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <>
            <header className="bg-white border-b">
                <div className="flex h-16 items-center justify-between px-4">
                    <button
                        className="text-gray-500 hover:text-gray-600"
                        onClick={() => setIsOpen(prev => !prev)}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="relative">
                        <button
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <User className="h-5 w-5 mr-1" />
                            {localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role === 'admin' ? 'Administrator' : 'Pembimbing Siswa'}
                            <svg className="ml-1 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a 1 1 0 01-1.414 0l-4-4a 1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;