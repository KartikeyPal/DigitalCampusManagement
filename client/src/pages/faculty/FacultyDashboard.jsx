import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import ConfirmationModal from "../../components/ConfirmationModal";
import api from "../../api/axios";

import FacultyLayout from "./FacultyLayout";
import StatCard from "./components/StatCard";
import ActivityRow from "./components/ActivityRow";
import ScheduleRow from "./components/ScheduleRow";
import EditFacultyProfileModal from "./components/EditFacultyProfileModal";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [faculty, setFaculty] = useState({
    name: "NA",
    email: "NA",
    designation: "NA",
    department: "NA",
  });

  /* ================= LOAD FROM AUTH CONTEXT ================= */
  useEffect(() => {
    if (user) {
      setFaculty((prev) => ({
        ...prev,
        name: user.name || "NA",
        email: user.email || "NA",
      }));
    }
  }, [user]);


  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Faculty Dashboard
          </h1>
          <p className="mt-2 text-zinc-400">
            Welcome back, {faculty.name}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => setShowEdit(true)}
            className="h-12 w-12 rounded-full bg-indigo-600 text-lg font-bold flex items-center justify-center"
            title="Edit Profile"
          >
            {faculty?.name?.[0] || "?"}
          </button>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Subjects" value="4" />
        <StatCard title="Assignments" value="12" />
        <StatCard title="Students" value="120" />
        <StatCard title="Notifications" value="5 New" />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-white">
            Recent Activity
          </h2>

          <div className="rounded-xl border border-zinc-800/50 bg-[#18181b]/30 p-4 space-y-3">
            <ActivityRow text="New assignment uploaded" time="1h ago" />
            <ActivityRow text="Notes shared" time="3h ago" />
            <ActivityRow text="Notification sent" time="Yesterday" />
          </div>
        </div>

        {/* Today's Classes */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">
            Today’s Classes
          </h2>

          <div className="rounded-xl border border-zinc-800/50 bg-[#18181b]/30 p-6 space-y-4">
            <ScheduleRow time="09:00 AM" subject="DBMS" className="SE-CS-A" />
            <ScheduleRow time="11:00 AM" subject="OS" className="TE-CS-B" />
          </div>
        </div>
      </div>

      {/* ================= EDIT PROFILE MODAL ================= */}
      {showEdit && (
        <EditFacultyProfileModal
          faculty={faculty}
          onClose={() => setShowEdit(false)}
          onSave={(updated) => {
            setFaculty((prev) => ({ ...prev, ...updated }));
            setShowEdit(false);
          }}
        />
      )}

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

export default FacultyDashboard;
