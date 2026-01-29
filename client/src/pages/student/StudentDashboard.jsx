import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import ConfirmationModal from '../../components/ConfirmationModal'

const StudentDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans">
      <Sidebar role={user.roles[0].name} />
      <main className="ml-64 p-8">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>
        <Outlet />
      </main>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out? You will be redirected to the login page."
      />
    </div>
  )
}

export default StudentDashboard