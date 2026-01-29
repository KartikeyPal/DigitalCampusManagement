import { useState } from "react";

const FacultyProfileCard = ({ faculty, onEdit }) => {
  return (
    <div className="rounded-xl border border-zinc-800/50 bg-[#18181b]/40 p-6 flex items-center justify-between">
      
      <div className="flex items-center gap-5">
        {/* Avatar */}
        <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold">
          {faculty.name?.charAt(0)}
        </div>

        {/* Info */}
        <div>
          <h2 className="text-xl font-semibold text-white">
            {faculty.name}
          </h2>
          <p className="text-sm text-zinc-400">
            {faculty.designation} • {faculty.department}
          </p>
          <p className="text-sm text-zinc-500">
            {faculty.email}
          </p>
        </div>
      </div>

      {/* Edit button */}
      <button
        onClick={onEdit}
        className="text-sm px-4 py-2 rounded-lg border border-zinc-700 hover:bg-zinc-800"
      >
        Edit Profile
      </button>

    </div>
  );
};

export default FacultyProfileCard;
