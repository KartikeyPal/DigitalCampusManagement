const ScheduleRow = ({ time, subject, className }) => {
  return (
    <div className="flex gap-4 items-start pb-4 border-b border-zinc-800/50 last:border-0 last:pb-0">
      <div className="text-sm font-medium text-zinc-400 w-20">
        {time}
      </div>
      <div>
        <h4 className="font-semibold text-zinc-200">{subject}</h4>
        <p className="text-xs text-zinc-500">{className}</p>
      </div>
    </div>
  );
};

export default ScheduleRow;
