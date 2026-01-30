import React, { useEffect, useEffectEvent, useState } from "react";
// import api from "../../../api/axios";
import api from '../../api/axios'
import toast from "react-hot-toast";

const AssignmentSubmissionModal = ({ assignmentId, onClose, onSubmitted }) => {
    const [fileUrl, setFileUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [student, setStudent] = useState([]);

    useEffect(()=>{
        api.get('/students')
        .then((res)=>{
            console.log(res.data)
            setStudent(res.data)
        })
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user
        if (!user || !user.id) {
            toast.error("User session invalid. Please log in again.");
            return;
        }

        if (!fileUrl.trim()) {
            toast.error("Please enter a file URL.");
            return;
        }

        setLoading(true);
        try {
            let studentId = null;
            student.forEach((student) => {
                console.log(student.userId)
                console.log(user.id)
                if (student.userId === user.id) {
                    
                    studentId = student.id;
                }
            });
            const payload = {
                fileUrl: fileUrl,
                assignmentId: assignmentId,
                studentId: studentId
            };

            await api.post("/submissions/submit", payload);

            toast.success("Assignment submitted successfully!");
            if (onSubmitted) onSubmitted();
            onClose();
        } catch (err) {
            console.error("Submission failed", err);
            // Try to extract a useful error message from the response, if available
            const errMsg = err.response?.data?.message || err.response?.data || "Failed to submit assignment. Please try again.";
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#111827] border border-gray-800 p-8 rounded-2xl w-full max-w-lg shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-white mb-6">Submit Assignment</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Assignment Link / File URL
                        </label>
                        <input
                            type="url"
                            placeholder="https://drive.google.com/..."
                            required
                            className="w-full p-3 rounded-lg bg-[#020617] border border-gray-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-600"
                            value={fileUrl}
                            onChange={(e) => setFileUrl(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Please paste the link to your assignment (e.g., Google Drive, GitHub).
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition-all ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? "Submitting..." : "Submit Assignment"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignmentSubmissionModal;