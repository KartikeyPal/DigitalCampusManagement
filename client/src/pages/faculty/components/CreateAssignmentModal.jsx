import { useState, useEffect } from "react";
import api from "../../../api/axios";

const CreateAssignmentModal = ({ onClose, onCreated }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingSubjects, setFetchingSubjects] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    subjectId: "",
  });

  // Fetch subjects on mount so the dropdown is populated
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const res = await api.get("/subjects");
        setSubjects(res.data || []);
      } catch (err) {
        console.error("Failed to fetch subjects", err);
      } finally {
        setFetchingSubjects(false);
      }
    };
    loadSubjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    // Safety check for the 500 error: ensure subjectId and facultyId exist
    if (!form.subjectId) return alert("Please select a subject");
    if (!user?.id) return alert("User session not found. Please re-login.");

    setLoading(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        deadline: form.deadline, // HTML5 datetime-local matches LocalDateTime well
        subjectId: form.subjectId,
        facultyId: user.id, // Injected from localStorage
      };

      await api.post("/assignments/create", payload);

      onCreated(); // Refresh the list
      onClose();   // Close modal
    } catch (err) {
      console.error("Creation Error:", err.response?.data || err);
      alert(err.response?.data?.message || "Internal Server Error (500). Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] border border-gray-800 p-8 rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">New Assignment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            ✕
          </button>
        </div>

        <form onSubmit={handleCreate} className="space-y-5">
          {/* Subject Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Subject</label>
            <select
              required
              className="w-full p-3 rounded-lg bg-[#020617] border border-gray-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={form.subjectId}
              onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
            >
              <option value="">{fetchingSubjects ? "Loading..." : "Select a Subject"}</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Assignment Title</label>
            <input
              required
              placeholder="e.g. Database Normalization Quiz"
              className="w-full p-3 rounded-lg bg-[#020617] border border-gray-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Description</label>
            <textarea
              required
              placeholder="Provide clear instructions..."
              className="w-full p-3 rounded-lg bg-[#020617] border border-gray-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Submission Deadline</label>
            <input
              required
              type="datetime-local"
              className="w-full p-3 rounded-lg bg-[#020617] border border-gray-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition-all ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {loading ? "Creating..." : "Create Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignmentModal;