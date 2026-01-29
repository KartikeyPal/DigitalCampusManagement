import { useState } from "react";

const EditFacultyProfileModal = ({ faculty, onClose, onSave }) => {
  const [designation, setDesignation] = useState(faculty.designation);

  const handleSubmit = () => {
    onSave({ designation });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#111827] rounded-xl p-6 w-full max-w-md">

        <h2 className="text-xl font-semibold text-white mb-4">
          Edit Profile
        </h2>

        {/* Name (readonly) */}
        <div className="mb-3">
          <label className="text-sm text-zinc-400">Name</label>
          <input
            value={faculty.name}
            disabled
            className="w-full p-2 mt-1 rounded bg-[#020617] border border-zinc-700 text-zinc-500"
          />
        </div>

        {/* Email (readonly) */}
        <div className="mb-3">
          <label className="text-sm text-zinc-400">Email</label>
          <input
            value={faculty.email}
            disabled
            className="w-full p-2 mt-1 rounded bg-[#020617] border border-zinc-700 text-zinc-500"
          />
        </div>

        {/* Department (readonly) */}
        <div className="mb-3">
          <label className="text-sm text-zinc-400">Department</label>
          <input
            value={faculty.department}
            disabled
            className="w-full p-2 mt-1 rounded bg-[#020617] border border-zinc-700 text-zinc-500"
          />
        </div>

        {/* Designation (editable) */}
        <div className="mb-4">
          <label className="text-sm text-zinc-400">Designation</label>
          <input
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-[#020617] border border-zinc-700"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-zinc-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditFacultyProfileModal;
