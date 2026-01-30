import { useState, useEffect } from "react";
import api from "../../api/axios";

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/students");

        if (Array.isArray(res.data)) {
          setStudents(res.data);
        } else {
          console.error("Backend did not return an array:", res.data);
          setStudents([]);
        }
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleRemoveStudent = async (studentId, studentName) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${studentName}?`
    );

    if (!confirmed) return;

    try {
      await api.delete(`/students/${studentId}`);
      setStudents((prev) => prev.filter((s) => s.id !== studentId));
    } catch (err) {
      console.error("Failed to remove student:", err);
    }
  };

  return (
    <div className="p-6 bg-[#020617] min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Student Directory</h1>
          <p className="text-zinc-400 text-sm">View and manage all enrolled students.</p>
        </div>
        <div className="text-sm bg-zinc-800 px-3 py-1 rounded-full text-zinc-300 border border-zinc-700">
          Total: {students.length}
        </div>
      </div>

      <div className="bg-[#111827] border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1f2937] text-zinc-400 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Student Details</th>
              <th className="p-4 font-semibold">Roll Number</th>
              <th className="p-4 font-semibold">Class</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {loading ? (
              <tr>
                <td colSpan="4" className="p-10 text-center text-zinc-500 animate-pulse">
                  Loading student records...
                </td>
              </tr>
            ) : students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student.id || index} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="font-medium text-white group-hover:text-indigo-400 transition-colors">
                      {student.name || "N/A"}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {student.email}
                    </div>
                  </td>
                  <td className="p-4 text-zinc-300 font-mono text-sm">
                    {student.rollNumber}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-indigo-900/30 text-indigo-400 rounded text-xs border border-indigo-500/20">
                      {student.className || "General"}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-red-500/70 hover:text-red-500 text-xs font-bold uppercase transition-colors" onClick={() => handleRemoveStudent(student.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-10 text-center text-zinc-500 italic">
                  No student records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStudents;