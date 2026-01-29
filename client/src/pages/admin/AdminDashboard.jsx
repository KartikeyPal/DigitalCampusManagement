import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-zinc-400">Manage users and system</p>
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
    </div>
  );
};

export default AdminDashboard;
