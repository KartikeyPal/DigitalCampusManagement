import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import { toast } from "react-hot-toast";

const AdminClass = () => {
    const [classes, setClasses] = useState([]);
    const [name, setName] = useState("");
    const [departments, setDepartments] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [deptRes, facultyRes, classesRes] = await Promise.all([
                    api.get("/departments"),
                    api.get("/faculties"),
                    api.get("/classes")
                ]);
                setDepartments(deptRes.data);
                setFaculties(facultyRes.data);
                setClasses(classesRes.data);
                console.log("Classes fetched:", classesRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to load data");
            }
        };
        fetchData();
    }, []);

    // const filteredFaculties = selectedDepartmentId
    //     ? faculties.filter(f => {
    //         const isAssigned = classes.some(c => c.userId === f.userId);
    //         return f.departmentId === selectedDepartmentId && !isAssigned;
    //     })
    //     : [];

    const filteredFaculties = selectedDepartmentId
        ? faculties.filter(f => {
            const isFromDept = f.departmentId?.toString() === selectedDepartmentId.toString();
            const isAlreadyTeacher = classes.some(c => c.userId?.toString() === f.userId?.toString());

            return isFromDept && !isAlreadyTeacher;
        })
        : [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !selectedDepartmentId || !selectedUserId) {
            toast.error("Please fill all fields");
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                name,
                departmentId: selectedDepartmentId,
                userId: selectedUserId,
            };

            await api.post("/classes", payload);
            toast.success("Class created successfully");

            const classesRes = await api.get("/classes");
            setClasses(classesRes.data);

            setName("");
            setSelectedDepartmentId("");
            setSelectedUserId("");
        } catch (error) {
            console.error("Error creating class:", error);
            toast.error("Failed to create class");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 text-white text-left">
            <h1 className="text-3xl font-bold mb-8">Manage Classes</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 h-fit bg-[#18181b] border border-zinc-800 rounded-xl p-6 space-y-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-white">Create New Class</h2>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Class Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. First Year"
                            className="w-full bg-[#27272a] border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Department</label>
                        <select
                            value={selectedDepartmentId}
                            onChange={(e) => {
                                setSelectedDepartmentId(e.target.value);
                                setSelectedUserId("");
                            }}
                            className="w-full bg-[#27272a] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
                        >
                            <option value="">-- Select Department --</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Faculty (Class Teacher)</label>
                        <select
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            disabled={!selectedDepartmentId}
                            className={`w-full bg-[#27272a] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none ${!selectedDepartmentId ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <option value="">
                                {selectedDepartmentId ? "-- Select Faculty --" : "-- Select Department First --"}
                            </option>
                            {filteredFaculties.map((fac) => (
                                <option key={fac.id} value={fac.userId}>
                                    {fac.userName}
                                </option>
                            ))}
                        </select>
                        {selectedDepartmentId && filteredFaculties.length === 0 && (
                            <p className="text-xs text-yellow-500 mt-1">No faculty found in this department.</p>
                        )}
                    </div> */}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Faculty (Class Teacher)</label>
                        <select
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            disabled={!selectedDepartmentId}
                            className={`w-full bg-[#27272a] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none ${!selectedDepartmentId ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <option value="">
                                {selectedDepartmentId ? "-- Select Faculty --" : "-- Select Department First --"}
                            </option>
                            {filteredFaculties.map((fac) => (
                                <option key={fac.id} value={fac.userId}>
                                    {fac.userName}
                                </option>
                            ))}
                        </select>
                        {selectedDepartmentId && filteredFaculties.length === 0 && (
                            <p className="text-xs text-yellow-500 mt-1">
                                No unassigned faculty available for this department.
                            </p>
                        )}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !name || !selectedDepartmentId || !selectedUserId}
                        className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all transform active:scale-95 ${isLoading || !name || !selectedDepartmentId || !selectedUserId
                            ? "bg-zinc-700 cursor-not-allowed opacity-50"
                            : "bg-indigo-600 hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/20"
                            }`}
                    >
                        {isLoading ? "Creating Class..." : "Create Class"}
                    </button>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 shadow-lg overflow-hidden">
                        <h2 className="text-xl font-semibold mb-6 text-white">Existing Classes</h2>
                        {classes.length === 0 ? (
                            <p className="text-zinc-500 text-center py-8">No classes found.</p>
                        ) : (
                            <div className="grid gap-4">
                                {classes.map((cls) => (
                                    <div key={cls.id || cls.name} className="flex items-center justify-between p-4 bg-[#27272a]/50 rounded-lg border border-zinc-700/50 hover:border-zinc-600 transition-colors">
                                        <div>
                                            <h3 className="font-bold text-lg text-white">{cls.name}</h3>
                                            <div className="flex items-center gap-4 mt-1 text-sm text-zinc-400">
                                                <span className="flex items-center gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                    {cls.departmentName}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                    {cls.userName}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminClass;