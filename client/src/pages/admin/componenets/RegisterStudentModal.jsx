import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";

const RegisterStudentModal = ({ onClose, onCreated }) => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        rollNumber: "",
        classId: "",
    });

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await api.get("/classes");
                setClasses(res.data || []);
            } catch (err) {
                console.error("Failed to load classes", err);
            }
        };
        fetchClasses();
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
            await api.post("/admin/students", form);
            alert("Student registered successfully!");

            if (onCreated) onCreated();
            if (!onClose) navigate("/role_admin/students");
            else onClose();

        } catch (err) {
            console.error("Registration Error:", err.response?.data);
            alert(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (onClose) onClose();
        else navigate(-1);
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="bg-[#111827] border border-gray-800 p-8 rounded-2xl w-full max-w-md shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-2">Register Student</h2>
                <p className="text-gray-400 text-sm mb-6">Password will be set to the student's email by default.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1 ml-1">Full Name</label>
                        <input
                            required
                            type="text"
                            placeholder="Om Chavan"
                            className="w-full p-3 rounded-lg bg-[#020617] border border-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1 ml-1">Email Address</label>
                        <input
                            required
                            type="email"
                            placeholder="student@example.com"
                            className="w-full p-3 rounded-lg bg-[#020617] border border-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                            value={form.email}
                            onChange={handleEmailChange}
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1 ml-1">Roll Number</label>
                        <input
                            required
                            type="text"
                            placeholder="Roll Number"
                            className="w-full p-3 rounded-lg bg-[#020617] border border-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                            value={form.rollNumber}
                            onChange={e => setForm({ ...form, rollNumber: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1 ml-1">Assign Class</label>
                        <select
                            required
                            className="w-full p-3 rounded-lg bg-[#020617] border border-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                            value={form.classId}
                            onChange={e => setForm({ ...form, classId: e.target.value })}
                        >
                            <option value="">Select Class</option>
                            {classes.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button type="button" onClick={handleCancel} className="text-gray-400 hover:text-white px-4">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
                        >
                            {loading ? "Registering..." : "Register Student"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterStudentModal;