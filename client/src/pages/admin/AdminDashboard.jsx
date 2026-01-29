import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import ConfirmationModal from "../../components/ConfirmationModal";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login"); // or wherever you want to redirect after logout
  };

  return (
    <div>
      <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-zinc-400">Manage users and system</p>
        </div>
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-fit"
        >
          Logout
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* STUDENTS */}
        <div
          onClick={() => navigate("/role_admin/students")}
          className="cursor-pointer rounded-xl border border-zinc-800 bg-[#18181b]/50 p-6 hover:border-blue-500 transition"
        >
          <p className="text-sm text-zinc-400">Students</p>
          <h2 className="text-3xl font-bold text-white mt-2">120</h2>
          <p className="text-xs text-zinc-500 mt-1">Registered</p>
        </div>

        {/* TEACHERS */}
        <div
          onClick={() => navigate("/role_admin/teachers")}
          className="cursor-pointer rounded-xl border border-zinc-800 bg-[#18181b]/50 p-6 hover:border-blue-500 transition"
        >
          <p className="text-sm text-zinc-400">Teachers</p>
          <h2 className="text-3xl font-bold text-white mt-2">18</h2>
          <p className="text-xs text-zinc-500 mt-1">Active</p>
        </div>

        {/* NOTIFICATIONS */}
        <div
          onClick={() => navigate("/role_admin/notifications")}
          className="cursor-pointer rounded-xl border border-zinc-800 bg-[#18181b]/50 p-6 hover:border-blue-500 transition"
        >
          <p className="text-sm text-zinc-400">New Requests</p>
          <h2 className="text-3xl font-bold text-white mt-2">5</h2>
          <p className="text-xs text-zinc-500 mt-1">Pending</p>
        </div>

      </div>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out? You will be redirected to the login page."
      />
    </div>
  );
};

export default AdminDashboard;
