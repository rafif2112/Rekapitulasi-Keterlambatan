import { Link } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
export default function NotFound() {
    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-blue-600">
                    404
                </h1>
                <p className="text-xl text-gray-700 mt-4">
                    The page you are looking for doesn't exist.
                </p>
                <button className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-md">
                    <Link to={'/'}>Back to home</Link>
                </button>
            </div>
        </div>
    )
}