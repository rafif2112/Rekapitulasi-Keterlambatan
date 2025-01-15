export default function Loading() {
    return (
        <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center min-h-screen" style={{ backdropFilter: 'blur(1px)', zIndex: 9999 }}>
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mx-auto"></div>
            </div>
        </div>
    );
}