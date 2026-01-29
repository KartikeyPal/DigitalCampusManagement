const StatCard = ({ title, value }) => {
  return (
    <div className="bg-[#111827] p-6 rounded-lg">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default StatCard;
