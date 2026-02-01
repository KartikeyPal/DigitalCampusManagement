import React, { useState, useEffect } from "react";
import calendarService from "../../../services/calendarService";
import { toast } from "react-hot-toast";

const AcademicCalendar = () => {
    const [year, setYear] = useState("2024-2025");
    const [calendarData, setCalendarData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "",
        eventType: "HOLIDAY",
        eventDate: "",
        colorCode: "#ef4444",
    });

    const fetchCalendar = async () => {
        setLoading(true);
        try {
            const data = await calendarService.getCalendar(year);
            setCalendarData(data);
        } catch (error) {
            console.error("Failed to fetch calendar", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCalendar();
    }, [year]);

    const handleAddEvent = async (e) => {
        e.preventDefault();
        try {
            await calendarService.addEvent(year, newEvent);
            toast.success("Event added successfully");
            setNewEvent({
                title: "",
                eventType: "HOLIDAY",
                eventDate: "",
                colorCode: "#ef4444",
            });
            fetchCalendar();
        } catch (error) {
            toast.error("Failed to add event");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Academic Calendar Management</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Add Event Form */}
                <div className="bg-[#18181b] p-6 rounded-lg border border-zinc-800 h-fit">
                    <h2 className="text-xl font-semibold mb-4 text-zinc-200">Add New Event</h2>
                    <form onSubmit={handleAddEvent} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">
                                Academic Year
                            </label>
                            <input
                                type="text"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:border-blue-500"
                                placeholder="e.g. 2024-2025"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">
                                Event Title
                            </label>
                            <input
                                type="text"
                                required
                                value={newEvent.title}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, title: e.target.value })
                                }
                                className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:border-blue-500"
                                placeholder="e.g. Semester Start"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">
                                Event Type
                            </label>
                            <select
                                value={newEvent.eventType}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, eventType: e.target.value })
                                }
                                className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:border-blue-500"
                            >
                                <option value="HOLIDAY">Holiday</option>
                                <option value="EXAM">Exam</option>
                                <option value="EVENT">Event</option>
                                <option value="DEADLINE">Deadline</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">
                                Date
                            </label>
                            <input
                                type="date"
                                required
                                value={newEvent.eventDate}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, eventDate: e.target.value })
                                }
                                className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">
                                Color Request
                            </label>
                            <div className="flex gap-2">
                                {["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"].map(
                                    (color) => (
                                        <button
                                            type="button"
                                            key={color}
                                            onClick={() => setNewEvent({ ...newEvent, colorCode: color })}
                                            className={`w-8 h-8 rounded-full border-2 ${newEvent.colorCode === color
                                                ? "border-white"
                                                : "border-transparent"
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    )
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors"
                        >
                            Add Event
                        </button>
                    </form>
                </div>

                {/* Calendar View */}
                <div className="lg:col-span-2 bg-[#18181b] p-6 rounded-lg border border-zinc-800">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-zinc-200">
                            Calendar Events ({year})
                        </h2>
                    </div>

                    {loading ? (
                        <div className="text-center py-8 text-zinc-500">Loading...</div>
                    ) : (
                        <div className="space-y-3">
                            {calendarData?.events?.length === 0 ? (
                                <p className="text-zinc-500 text-center py-8">
                                    No events found for this academic year.
                                </p>
                            ) : (
                                calendarData?.events?.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-center p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:bg-zinc-900 transition-colors"
                                    >
                                        <div
                                            className="w-1 h-12 rounded-full mr-4"
                                            style={{ backgroundColor: event.colorCode }}
                                        ></div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-white">{event.title}</h3>
                                            <p className="text-sm text-zinc-400">{event.eventType}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-mono">
                                                {new Date(event.eventDate).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                            {/* You could add delete button here later */}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AcademicCalendar;
