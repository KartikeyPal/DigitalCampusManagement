import { NavLink } from "react-router-dom";

const FacultySidebar = () => {
  return (
    <aside className="w-64 bg-[#111827] p-6">
      <h1 className="text-xl font-bold mb-8 text-indigo-400">
        Faculty Panel
      </h1>

      <nav className="space-y-4">
        <NavLink to="/role_faculty" className="block hover:text-indigo-400">
          Dashboard
        </NavLink>

        <NavLink to="/faculty/#" className="block hover:text-indigo-400">
          People
        </NavLink>

        <NavLink to="/faculty/#" className="block hover:text-indigo-400">
          Faculty Timetable
        </NavLink>

        <NavLink to="/faculty/assignments" className="block hover:text-indigo-400">
          Assignments
        </NavLink>

        <NavLink to="/faculty/notes" className="block hover:text-indigo-400">
          Upload Notes
        </NavLink>

        <NavLink to="/faculty/#" className="block hover:text-indigo-400">
          Notify Students
        </NavLink>
      </nav>
    </aside>
  );
};

export default FacultySidebar;
