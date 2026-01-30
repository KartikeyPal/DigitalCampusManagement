import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import { toast } from "react-hot-toast";

const AdminSubject = () => {
    const [name, setName] = useState("");
    const [classes, setClasses] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState("");
    const [selectedFacultyId, setSelectedFacultyId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [classesRes, facultiesRes, subjectsRes] = await Promise.all([
                    api.get("/classes"),
                    api.get("/faculties"),
                    api.get("/subjects"),
                ]);
                setClasses(classesRes.data);
                setFaculties(facultiesRes.data);
                setSubjects(subjectsRes.data);
                console.log("Subjects fetched:", subjectsRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to load data");
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !selectedClassId || !selectedFacultyId) {
            toast.error("Please fill all fields");
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                name,
                classId: selectedClassId,
                facultyId: selectedFacultyId,
            };

            await api.post("/subjects", payload);
            toast.success("Subject created successfully");

            // Refresh subjects
            const subjectsRes = await api.get("/subjects");
            setSubjects(subjectsRes.data);

            // Reset form
            setName("");
            setSelectedClassId("");
            setSelectedFacultyId("");
        } catch (error) {
            console.error("Error creating subject:", error);
            toast.error("Failed to create subject");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 text-white text-left">
            <h1 className="text-3xl font-bold mb-8">Manage Subjects</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT COLUMN: CREATE SUBJECT FORM */}
                <div className="lg:col-span-1 h-fit bg-[#18181b] border border-zinc-800 rounded-xl p-6 space-y-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-white">Create New Subject</h2>

                    {/* SUBJECT NAME */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Subject Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. DataScience"
                            className="w-full bg-[#27272a] border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>

                    {/* CLASS DROPDOWN */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Class</label>
                        <select
                            value={selectedClassId}
                            onChange={(e) => setSelectedClassId(e.target.value)}
                            className="w-full bg-[#27272a] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
                        >
                            <option value="">-- Select Class --</option>
                            {classes.map((cls) => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* FACULTY DROPDOWN */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Faculty</label>
                        <select
                            value={selectedFacultyId}
                            onChange={(e) => setSelectedFacultyId(e.target.value)}
                            className="w-full bg-[#27272a] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
                        >
                            <option value="">-- Select Faculty --</option>
                            {faculties.map((fac) => (
                                <option key={fac.id} value={fac.userId}>
                                    {fac.userName || fac.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !name || !selectedClassId || !selectedFacultyId}
                        className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all transform active:scale-95 ${isLoading || !name || !selectedClassId || !selectedFacultyId
                            ? "bg-zinc-700 cursor-not-allowed opacity-50"
                            : "bg-indigo-600 hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/20"
                            }`}
                    >
                        {isLoading ? "Creating Subject..." : "Create Subject"}
                    </button>
                </div>

                {/* RIGHT COLUMN: SUBJECT LIST */}
                <div className="lg:col-span-2">
                    <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 shadow-lg overflow-hidden">
                        <h2 className="text-xl font-semibold mb-6 text-white">Existing Subjects</h2>
                        {subjects.length === 0 ? (
                            <p className="text-zinc-500 text-center py-8">No subjects found.</p>
                        ) : (
                            <div className="grid gap-4">
                                {subjects.map((sub) => (
                                    <div key={sub.id} className="flex items-center justify-between p-4 bg-[#27272a]/50 rounded-lg border border-zinc-700/50 hover:border-zinc-600 transition-colors">
                                        <div>
                                            <h3 className="font-bold text-lg text-white">{sub.name}</h3>
                                            <div className="flex items-center gap-4 mt-1 text-sm text-zinc-400">
                                                <span className="flex items-center gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                    {sub.className || "Unknown Class"}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                    {sub.facultyName || "Unknown Faculty"}
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

export default AdminSubject;