import { useState, useEffect } from "react";
import api from "../../../api/axios";
import { toast } from "react-hot-toast";

const AdminDepartment = () => {
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Fetch departments on mount
    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await api.get("/departments");
            // Assuming response.data is the list of departments based on standard axios usage
            setDepartments(response.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
            toast.error("Failed to load departments");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsLoading(true);
        try {
            await api.post("/departments", { name });
            toast.success("Department created successfully");
            setName("");
            fetchDepartments(); // Refresh list
        } catch (error) {
            console.error("Error creating department:", error);
            toast.error("Failed to create department");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="text-white p-6">
            <h1 className="text-3xl font-bold mb-8">Manage Departments</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Create Department Form */}
                <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800 h-fit">
                    <h2 className="text-xl font-semibold mb-4">Add New Department</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">
                                Department Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Computer Science"
                                className="w-full bg-[#27272a] border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {isLoading ? "Creating..." : "Add Department"}
                        </button>
                    </form>
                </div>

                {/* Departments List */}
                <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800">
                    <h2 className="text-xl font-semibold mb-4">Existing Departments</h2>
                    {departments.length === 0 ? (
                        <p className="text-zinc-500 text-center py-4">No departments found.</p>
                    ) : (
                        <div className="space-y-3">
                            {departments.map((dept, index) => (
                                <div
                                    key={dept.id || index}
                                    className="flex items-center justify-between p-3 bg-[#27272a] rounded-lg border border-zinc-700/50"
                                >
                                    <span className="font-medium">{dept.name}</span>
                                    {/* We can add delete/edit actions later if needed */}
                                    <span className="text-xs text-zinc-500">ID: {dept.id}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDepartment;
