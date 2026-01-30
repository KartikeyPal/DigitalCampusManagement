import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";

const RegisterFacultyModal = () => {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        designation: "",
        departmentId: "",
    });

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await api.get("/departments");
                setDepartments(res.data || []);
            } catch (err) {
                console.error("Failed to load departments", err);
            }
        };
        fetchDepartments();
    }, []);

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setForm({
            ...form,
            email: emailValue,
            password: emailValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/admin/faculty", form);
            alert("Faculty registered successfully!");
            navigate("/role_admin/faculty");
        } catch (err) {
            console.error("Registration Error:", err.response?.data);
            alert(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-4 min-h-[80vh]">
            <div className="bg-[#111827] border border-gray-800 p-8 rounded-2xl w-full max-w-lg shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-2">Register Faculty</h2>
                <p className="text-gray-400 text-sm mb-6">Create a new faculty account. Default password will match the email.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-xs text-gray-500 mb-1 ml-1">Full Name</label>
                            <input
                                required
                                type="text"
                                className="w-full p-3 rounded-lg bg-[#020617] border border-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs text-gray-500 mb-1 ml-1">Email (and Password)</label>
                            <input
                                required
                                type="email"
                                className="w-full p-3 rounded-lg bg-[#020617] border border-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                value={form.email}
                                onChange={handleEmailChange}
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-500 mb-1 ml-1">Designation</label>
                            <input
                                type="text"
                                placeholder="e.g. Asst. Professor"
                                className="w-full p-3 rounded-lg bg-[#020617] border border-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                value={form.designation}
                                onChange={e => setForm({ ...form, designation: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-500 mb-1 ml-1">Department</label>
                            <select
                                required
                                className="w-full p-3 rounded-lg bg-[#020617] border border-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                value={form.departmentId}
                                onChange={e => setForm({ ...form, departmentId: e.target.value })}
                            >
                                <option value="">Select Dept</option>
                                {departments.map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="text-gray-400 hover:text-white px-4"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-lg font-semibold transition-all disabled:opacity-50"
                        >
                            {loading ? "Registering..." : "Create Faculty Account"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterFacultyModal;