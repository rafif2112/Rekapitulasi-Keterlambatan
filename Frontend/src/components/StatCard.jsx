/* eslint-disable react/prop-types */
function StatCard({ title, value, subtitle, icon: Icon }) {
    return (
        <div className="bg-white overflow-hidden shadow-md rounded-xl h-36 transition-all duration-300 transform">
            <div className="p-6 grid grid-cols-[auto,1fr] gap-4">
                <div className="flex items-center justify-center bg-indigo-100 rounded-lg p-3">
                    <Icon className="h-8 w-8 text-indigo-600" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 tracking-wide uppercase">
                        {title}
                    </h3>
                    <p className="text-sm font-bold text-gray-900 tracking-wide uppercase">{subtitle}</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default StatCard
