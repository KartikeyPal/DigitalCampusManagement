const SubmissionRow = ({ submission }) => {
  return (
    <div className="bg-[#111827] p-4 rounded-lg flex justify-between items-center">
      <div>
        <p className="font-medium">{submission.name}</p>
        <p className="text-sm text-zinc-400">
          Submitted at {submission.time}
        </p>
      </div>

      <div className="flex gap-3 items-center">
        <a
          href="#"
          className="text-indigo-400 underline"
        >
          View File
        </a>

        <input
          type="number"
          placeholder="Marks"
          className="w-20 p-1 rounded bg-[#020617]"
        />
      </div>
    </div>
  );
};

export default SubmissionRow;
