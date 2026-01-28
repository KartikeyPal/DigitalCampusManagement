import React from 'react'
import Sidebar from './Sidebar'
import { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { Outlet } from 'react-router-dom'

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans">
      <Sidebar role={user.roles[0]} />
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default StudentDashboard