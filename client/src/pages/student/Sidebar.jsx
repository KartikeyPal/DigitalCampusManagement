import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ role }) => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50";
    }

    return (
        <div className="h-screen w-64 border-r border-zinc-800 bg-[#18181b] flex flex-col fixed left-0 top-0 overflow-y-auto">
            <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
                    CS
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">Campus Portal</h2>
            </div>

            <div className="flex-1 py-6 px-3">
                {role === "student" && (
                    <nav className="space-y-1">
                        <Link
                            to="/student"
                            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all ${isActive('/student')}`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/student/Assignment"
                            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all ${isActive('/student/Assignment')}`}
                        >
                            Assignments
                        </Link>
                        <Link
                            to="/student/notes"
                            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all ${isActive('/student/notes')}`}
                        >
                            Notes
                        </Link>
                        <Link
                            to="/student/timetable"
                            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all ${isActive('/student/timetable')}`}
                        >
                            Timetable
                        </Link>
                    </nav>
                )}
            </div>

            <div className="p-4 border-t border-zinc-800">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-300">
                        S
                    </div>
                    <div className="text-sm">
                        <p className="font-medium text-zinc-200">Student Account</p>
                        <p className="text-xs text-zinc-500">student@collegesync.com</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Sidebar