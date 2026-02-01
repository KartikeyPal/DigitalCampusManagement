import React, { useState, useEffect } from "react";
import calendarService from "../../services/calendarService";

const AcademicCalendar = () => {
    const [year, setYear] = useState("2024-2025");
    const [calendarData, setCalendarData] = useState(null);
    const [loading, setLoading] = useState(false);

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

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Academic Calendar</h1>
                <div className="w-48">
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:border-blue-500"
                    >
                        <option value="2024-2025">2024-2025</option>
                        <option value="2025-2026">2025-2026</option>
                        <option value="2026-2027">2026-2027</option>
                    </select>
                </div>
            </div>

            <div className="bg-[#18181b] p-6 rounded-lg border border-zinc-800">
                {loading ? (
                    <div className="text-center py-12 text-zinc-500">Loading calendar events...</div>
                ) : (
                    <div className="space-y-4">
                        {calendarData?.events?.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-zinc-500 text-lg">No events scheduled for this academic year.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {calendarData?.events?.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-center p-5 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition-all hover:border-zinc-700 hover:shadow-lg hover:shadow-black/20"
                                    >
                                        <div
                                            className="w-1.5 h-16 rounded-full mr-5 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                                            style={{ backgroundColor: event.colorCode }}
                                        ></div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-zinc-800 text-zinc-400 border border-zinc-700">
                                                    {event.eventType}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-white mb-1">{event.title}</h3>
                                        </div>
                                        <div className="text-right pl-4 border-l border-zinc-800 ml-4">
                                            <p className="text-2xl font-bold text-white tracking-tight">
                                                {new Date(event.eventDate).toLocaleDateString("en-US", { day: "numeric" })}
                                            </p>
                                            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                                                {new Date(event.eventDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AcademicCalendar;
