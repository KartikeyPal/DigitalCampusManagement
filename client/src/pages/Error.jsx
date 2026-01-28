import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-[100px] rounded-full mix-blend-screen"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="mb-8 inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-400 backdrop-blur-sm">
                    <span className="flex h-2 w-2 rounded-full bg-orange-400 mr-2 animate-pulse"></span>
                    Page Not Found
                </div>

                <h1 className="mb-6 text-7xl font-bold tracking-tight md:text-9xl">
                    <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                        404
                    </span>
                </h1>

                <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
                    Lost in Space?
                </h2>

                <p className="mb-10 max-w-md text-lg text-zinc-400 leading-relaxed">
                    The page you are looking for doesn't exist or has been moved.
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="px-8 py-3.5 rounded-lg bg-zinc-100 text-zinc-900 font-semibold hover:bg-white transition-all shadow-lg hover:shadow-zinc-500/20"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    )
}

export default Error