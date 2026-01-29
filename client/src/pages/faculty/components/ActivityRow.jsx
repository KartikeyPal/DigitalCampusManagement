const ActivityRow = ({ text, time }) => {
  return (
    <div className="flex justify-between text-sm text-zinc-300">
      <span>{text}</span>
      <span className="text-zinc-500">{time}</span>
    </div>
  );
};

export default ActivityRow;
