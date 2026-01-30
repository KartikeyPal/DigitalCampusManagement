import { useEffect, useState } from "react";
import api from "../../../api/axios";
import CreateAssignmentModal from "../components/CreateAssignmentModal";
import AssignmentCard from "../components/AssignmentCard";

const Assignments = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/assignments");
      setAssignments(res.data || []);
    } catch (err) {
      console.error("Failed to load assignments", err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const isFaculty = user?.roles?.some(role => role.name === "ROLE_FACULTY");

  //   if (!isFaculty) {
  //     console.error("Access denied: Not a faculty member");
  //     setLoading(false);
  //   } else {
  //     loadAssignments();
  //   }
  // }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Logged in user data:", user); // Debug: Check this in F12 console

    // Check if roles exist and if ANY role object has the name 'ROLE_FACULTY'
    const isFaculty = user?.roles?.some(role =>
      role.name === "ROLE_FACULTY" || role === "ROLE_FACULTY"
    );

    if (!isFaculty) {
      console.error("Access denied: Not a faculty member");
      setLoading(false);
    } else {
      loadAssignments();
    }
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default Assignments;
