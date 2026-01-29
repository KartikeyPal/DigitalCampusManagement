const AssignmentCard = ({ assignment }) => {
  return (
    <div className="bg-[#111827] p-4 rounded-lg border border-zinc-800">
      <h3 className="text-lg font-semibold text-white">
        {assignment.title}
      </h3>

      <p className="text-sm text-zinc-400 mt-1">
        {assignment.description || "No description"}
      </p>

      <div className="flex justify-between mt-3 text-sm text-zinc-500">
        <span>
          Deadline: {new Date(assignment.deadline).toLocaleString()}
        </span>
        <span className="text-indigo-400 cursor-pointer">
          View Submissions →
        </span>
      </div>
    </div>
  );
};

export default AssignmentCard; // ✅ REQUIRED
