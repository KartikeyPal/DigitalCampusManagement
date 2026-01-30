import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-blue-600 text-white"
      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50";
  };

  return (
    <div className="h-screen w-64 bg-[#18181b] border-r border-zinc-800 fixed left-0 top-0">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
          CS
        </div>
        <h2 className="text-xl font-bold text-white">College Sync</h2>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        <Link
          to="/role_admin"
          className={`block px-3 py-2 rounded-md text-sm font-medium ${isActive(
            "/role_admin"
          )}`}
        >
          Dashboard
        </Link>

        <Link
          to="/role_admin/register"
          className={`block px-3 py-2 rounded-md text-sm font-medium ${isActive(
            "/role_admin/register"
          )}`}
        >
          Register User
        </Link>
        <Link
          to="/role_admin/notifications"
          className={`block px-3 py-2 rounded-md text-sm font-medium ${isActive(
            "/role_admin/notification"
          )}`}
        >
          Notification
        </Link>
        <Link
          to="/role_admin/department"
          className={`block px-3 py-2 rounded-md text-sm font-medium ${isActive(
            "/role_admin/department"
          )}`}
        >
          Department
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
