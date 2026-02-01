import React, { useState } from "react";
import calendarService from "../../../services/calendarService";
import { toast } from "react-hot-toast";

const CreateAcademicCalendar = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        academicYear: "",
        startDate: "",
        endDate: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await calendarService.createCalendar(formData);
            toast.success("Academic Calendar created successfully!");
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Error creating calendar:", error);
            toast.error("Failed to create Academic Calendar.");
        }
    };

    return (
        <div className="bg-[#18181b] p-6 rounded-lg border border-zinc-800">
            <h2 className="text-xl font-semibold mb-4 text-zinc-200">
                Create Academic Calendar
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">
                        Academic Year
                    </label>
                    <input
                        type="text"
                        name="academicYear"
                        value={formData.academicYear}
                        onChange={handleChange}
                        placeholder="e.g. 2024-2025"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors"
                >
                    Create Calendar
                </button>
            </form>
        </div>
    );
};

export default CreateAcademicCalendar;
