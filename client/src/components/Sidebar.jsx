import React from 'react'
import { Link } from 'react-router-dom'


const Sidebar = ({ role }) => {
    return (
        <div>
             <h2 className="text-xl font-bold mb-6">Campus Portal</h2>
             {role === "student" && (
                <nav>
                    <Link to="/student">Dashboard</Link>
                    <Link to="/student/Assignment">Assignment</Link>
                    <Link to="/student/notes" className="hover:text-blue-400">Notes</Link>
                    <Link to="/student/timetable" className="hover:text-blue-400">Timetable</Link>
                </nav>  
             )}
        </div >
    )
}

export default Sidebar