import { useEffect, useState } from "react";
import api from "../../../api/axios";

import FacultyLayout from "../FacultyLayout";
import CreateAssignmentModal from "../components/CreateAssignmentModal";
import AssignmentCard from "../components/AssignmentCard";

const Assignments = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/faculty/assignments");
      setAssignments(res.data || []);
    } catch (err) {
      console.error("Failed to load assignments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.roles.includes("ROLE_FACULTY")) {
      console.error("Access denied: Not a faculty member");
    } else {
      loadAssignments();
    }
  }, []);

  return (
    <FacultyLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">
          Assignments
        </h1>

        <button
          onClick={() => setShowCreate(true)}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
        >
          + Create Assignment
        </button>
      </div>

      {/* Content */}
      {loading && <p className="text-gray-400">Loading...</p>}

      {!loading && assignments.length === 0 && (
        <p className="text-gray-400">No assignments yet.</p>
      )}

      <div className="grid gap-4">
        {assignments.map((a) => (
          <AssignmentCard key={a.id} assignment={a} />
        ))}
      </div>

      {showCreate && (
        <CreateAssignmentModal
          onClose={() => setShowCreate(false)}
          onCreated={loadAssignments}
        />
      )}
    </FacultyLayout>
  );
};

export default Assignments;
