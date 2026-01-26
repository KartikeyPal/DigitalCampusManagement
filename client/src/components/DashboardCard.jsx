

const DashboardCard = ({ title, value, subtitle }) => {
    return (
        <div className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 hover:border-blue-500/50 hover:bg-zinc-900/80 transition-all duration-300">
            <p className="mb-2 text-sm font-medium text-zinc-500 group-hover:text-blue-400 transition-colors">{title}</p>
            <p className="mb-1 text-3xl font-bold text-white">{value}</p>
            <p className="text-xs text-zinc-500">{subtitle}</p>
        </div>
    )
}       

export default DashboardCard