import { useEffect, useState, useMemo } from "react";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

const RegisterUser = () => {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);

  const [selectedRole, setSelectedRole] = useState("ROLE_STUDENT");
  const [selectedUserId, setSelectedUserId] = useState("");

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
      const [usersRes, studentsRes, facultiesRes] = await Promise.all([
        api.get("/users"),
        api.get("/students"),
        api.get("/faculties"),
      ]);

      setUsers(usersRes.data);
      setStudents(studentsRes.data);
      setFaculties(facultiesRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    }
  };

  /* ---------------- ID SETS (O(1) LOOKUP) ---------------- */

  const studentIds = useMemo(
    () => new Set(students.map(s => s.id)),
    [students]
  );

  const facultyIds = useMemo(
    () => new Set(faculties.map(f => f.id)),
    [faculties]
  );

  /* ---------------- ROLE-BASED UNREGISTERED USERS ---------------- */

  const unregisteredStudents = useMemo(
    () =>
      users.filter(
        u =>
          u.roles?.some(r => r.name === "ROLE_STUDENT") &&
          !studentIds.has(u.id)
      ),
    [users, studentIds]
  );

  const unregisteredFaculties = useMemo(
    () =>
      users.filter(
        u =>
          u.roles?.some(r => r.name === "ROLE_FACULTY") &&
          !facultyIds.has(u.id)
      ),
    [users, facultyIds]
  );

  const unregisteredAdmins = useMemo(
    () =>
      users.filter(
        u =>
          u.roles?.some(r => r.name === "ROLE_ADMIN") &&
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
    const { name, email, password } = formData;

    if (!selectedUserId || !name || !email || !password) {
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

        {/* FORM */}
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
