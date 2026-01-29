import { useState } from "react";
import api from "../../../api/axios";

const CreateAssignmentModal = ({ onClose, onCreated }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    totalMarks: "",
    marksDescription: "",
    allowedFileTypes: [],
    maxFileSize: "",
    subjectId: "",
  });

  const toggleFileType = (type) => {
    setForm(prev => ({
      ...prev,
      allowedFileTypes: prev.allowedFileTypes.includes(type)
        ? prev.allowedFileTypes.filter(t => t !== type)
        : [...prev.allowedFileTypes, type],
    }));
  };

  const handleCreate = async () => {
    try {
      await api.post("/faculty/assignments/create", {
        title: form.title,
        description: form.description,
        deadline: form.deadline,
        totalMarks: form.totalMarks,
        marksDescription: form.marksDescription,
        allowedFileTypes: form.allowedFileTypes.join(","),
        maxFileSize: form.maxFileSize,
        subjectId: form.subjectId,
      });

      onCreated(); 
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create assignment");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#111827] p-6 rounded-xl w-full max-w-xl">

        <h2 className="text-xl font-semibold mb-4">
          Create Assignment
        </h2>

        <div className="space-y-3">

          <input
            placeholder="Title"
            className="w-full p-2 rounded bg-[#020617]"
            onChange={e => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="w-full p-2 rounded bg-[#020617]"
            rows={3}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="datetime-local"
            className="w-full p-2 rounded bg-[#020617]"
            onChange={e => setForm({ ...form, deadline: e.target.value })}
          />

          <input
            placeholder="Total Marks"
            type="number"
            className="w-full p-2 rounded bg-[#020617]"
            onChange={e => setForm({ ...form, totalMarks: e.target.value })}
          />

          <textarea
            placeholder="Marks Description"
            className="w-full p-2 rounded bg-[#020617]"
            rows={2}
            onChange={e => setForm({ ...form, marksDescription: e.target.value })}
          />

          {/* File Types */}
          <div>
            <p className="text-sm text-zinc-400 mb-1">
              Allowed File Types
            </p>
            <div className="flex gap-2 flex-wrap">
              {["pdf", "doc", "image", "video", "text"].map(type => (
                <button
                  key={type}
                  onClick={() => toggleFileType(type)}
                  className={`px-3 py-1 rounded text-sm ${
                    form.allowedFileTypes.includes(type)
                      ? "bg-indigo-600"
                      : "bg-[#020617]"
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <input
            placeholder="Max File Size (MB)"
            type="number"
            className="w-full p-2 rounded bg-[#020617]"
            onChange={e => setForm({ ...form, maxFileSize: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-indigo-600 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignmentModal;
