import { useEffect, useState, useMemo } from "react";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

const RegisterUser = () => {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [selectedRole, setSelectedRole] = useState("ROLE_STUDENT");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* ---------------- FETCH ALL DATA ---------------- */

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [usersRes, studentsRes, facultiesRes, departmentsRes] = await Promise.all([
        api.get("/users"),
        api.get("/students"),
        api.get("/faculties"),
        api.get("/departments"),
      ]);

      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
      setStudents(Array.isArray(studentsRes.data) ? studentsRes.data : []);
      setFaculties(Array.isArray(facultiesRes.data) ? facultiesRes.data : []);
      setDepartments(Array.isArray(departmentsRes.data) ? departmentsRes.data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    }
  };

  /* ---------------- ID SETS (O(1) LOOKUP) ---------------- */

  // Extract User IDs from the relation tables (Student/Faculty)
  // We check for 'userId' (flat) or 'user.id' (nested) depending on API response structure
  const studentIds = useMemo(
    () => new Set((students || []).map(s => s.userId || s.user?.id)),
    [students]
  );

  const facultyIds = useMemo(
    () => new Set((faculties || []).map(f => f.userId || f.user?.id)),
    [faculties]
  );

  /* ---------------- ROLE-BASED UNREGISTERED USERS ---------------- */

  const unregisteredStudents = useMemo(
    () =>
      (users || []).filter(
        u =>
          u?.roles?.some(r => r.name === "ROLE_STUDENT") &&
          !studentIds.has(u.id)
      ),
    [users, studentIds]
  );

  const unregisteredFaculties = useMemo(
    () =>
      (users || []).filter(
        u =>
          u?.roles?.some(r => r.name === "ROLE_FACULTY") &&
          !facultyIds.has(u.id)
      ),
    [users, facultyIds]
  );

  const unregisteredAdmins = useMemo(
    () =>
      (users || []).filter(
        u =>
          u?.roles?.some(r => r.name === "ROLE_ADMIN") &&
          !studentIds.has(u.id) &&
          !facultyIds.has(u.id)
      ),
    [users, studentIds, facultyIds]
  );

  const activeList = useMemo(() => {
    if (selectedRole === "ROLE_STUDENT") return unregisteredStudents;
    if (selectedRole === "ROLE_FACULTY") return unregisteredFaculties;
    return unregisteredAdmins;
  }, [
    selectedRole,
    unregisteredStudents,
    unregisteredFaculties,
    unregisteredAdmins,
  ]);

  /* ---------------- HANDLERS ---------------- */

  const handleUserSelect = (e) => {
    const id = e.target.value;
    setSelectedUserId(id);

    if (!id) {
      setFormData({ name: "", email: "", password: "" });
      return;
    }

    const user = activeList.find(u => u.id === id);
    if (!user) return;

    setFormData({
      name: user.name,
      email: user.email,
      password: "",
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    // ---------------- FACULTY REGISTRATION ----------------
    if (selectedRole === "ROLE_FACULTY") {
      if (!selectedUserId || !selectedDepartmentId) {
        toast.error("User and Department are required for Faculty");
        return;
      }

      try {
        await api.post("/faculties", {
          userId: selectedUserId,
          departmentId: selectedDepartmentId,
        });
        toast.success("Faculty registered successfully");
        setSelectedUserId("");
        setSelectedDepartmentId("");
        fetchAll();
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Registration failed");
      }
      return;
    }

    // ---------------- OTHER ROLES (STUDENT/ADMIN) ----------------
    // For now, keeping the generic registration as fallback or for other roles
    // The user specifically asked for Faculty logic first.
    // If we need student logic later, we can adapt this section.

    const { name, email, password } = formData;

    if (!selectedUserId || !name || !email || !password) {
      // If we are registering a NEW user vs linking existing, logic might differ.
      // But based on current code, it seems to imply updating/registering existing user with role?
      // Or maybe 'selectedUserId' implies we pick an existing user to give a role?
      // The original code used /auth/register with an ID... let's keep it for non-faculty for now to avoid breaking it.
      toast.error("All fields are required");
      return;
    }

    try {
      await api.post("/auth/register", {
        id: selectedUserId,
        name,
        email,
        password,
        roles: [selectedRole],
      });

      toast.success("User registered successfully");

      setSelectedUserId("");
      setFormData({ name: "", email: "", password: "" });
      fetchAll();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold text-white mb-6">
        Register User
      </h1>

      <div className="bg-[#18181b]/50 border border-zinc-800 rounded-xl p-6 space-y-4">

        {/* ROLE SELECT */}
        <div>
          <label className="text-sm text-zinc-400">Select Role</label>
          <select
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value);
              setSelectedUserId("");
              setSelectedDepartmentId("");
              setFormData({ name: "", email: "", password: "" });
            }}
            className="w-full bg-zinc-900 p-3 rounded border border-zinc-700 text-white"
          >
            <option value="ROLE_STUDENT">Student</option>
            <option value="ROLE_FACULTY">Faculty</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
        </div>

        {/* USER SELECT */}
        <div>
          <label className="text-sm text-zinc-400">Select User</label>
          <select
            value={selectedUserId}
            onChange={handleUserSelect}
            className="w-full bg-zinc-900 p-3 rounded border border-zinc-700 text-white"
          >
            <option value="">-- Select --</option>
            {activeList.map(u => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>

          {activeList.length === 0 && (
            <p className="text-xs text-yellow-500 mt-1">
              No unregistered users for this role
            </p>
          )}
        </div>

        {/* DEPARTMENT SELECT - ONLY FOR FACULTY */}
        {selectedRole === "ROLE_FACULTY" && (
          <div>
            <label className="text-sm text-zinc-400">Select Department</label>
            <select
              value={selectedDepartmentId}
              onChange={(e) => setSelectedDepartmentId(e.target.value)}
              className="w-full bg-zinc-900 p-3 rounded border border-zinc-700 text-white"
            >
              <option value="">-- Select Department --</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* FORM - HIDE FOR FACULTY (Since we are just linking an existing user) */}
        {selectedRole !== "ROLE_FACULTY" && (
          <>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full bg-zinc-900 p-3 rounded border border-zinc-700 text-white"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-zinc-900 p-3 rounded border border-zinc-700 text-white"
            />

            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-zinc-900 p-3 rounded border border-zinc-700 text-white"
            />
          </>
        )}

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-medium transition"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterUser;
