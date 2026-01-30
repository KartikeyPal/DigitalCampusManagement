import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-hot-toast";

const ViewAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await api.get("/assignments");
                setAssignments(response.data);
                console.log("Assignments fetched:", response.data);
            } catch (error) {
                console.error("Error fetching assignments:", error);
                toast.error("Failed to load assignments");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "No deadline";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="max-w-7xl mx-auto p-6 text-white text-left">
            <h1 className="text-3xl font-bold mb-8">Assignments</h1>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            ) : assignments.length === 0 ? (
                <div className="text-center py-12 bg-[#18181b] rounded-xl border border-zinc-800">
                    <p className="text-zinc-500 text-lg">No assignments found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assignments.map((assignment) => (
                        <div
                            key={assignment.id}
                            className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 shadow-lg hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-bold text-white line-clamp-2">
                                        {assignment.title}
                                    </h2>
                                    <span className="bg-indigo-500/10 text-indigo-400 text-xs px-2 py-1 rounded-full border border-indigo-500/20 whitespace-nowrap">
                                        {assignment.subjectName}
                                    </span>
                                </div>

                                <p className="text-zinc-400 text-sm mb-6 line-clamp-3">
                                    {assignment.description}
                                </p>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-zinc-800/50">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-zinc-500">Deadline:</span>
                                    <span className="text-zinc-300 font-medium">
                                        {formatDate(assignment.deadline)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-zinc-500">Faculty:</span>
                                    <span className="text-zinc-300">{assignment.facultyName}</span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewAssignments;
