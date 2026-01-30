import React from "react";
import ecoImage from "../images/landing_page_image.png";
import DashboardCard from "../components/DashboardCard";
import ActivityRow from "../components/ActivityRow";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const CollegeSyncFinal = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-blue-500/30">

            <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
                            CS
                        </div>
                        <span className="text-lg font-bold tracking-tight text-white">
                            College Sync
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <a onClick={() => navigate('/about')} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            About
                        </a>
                        <Button variant="contained" onClick={() => navigate('/login')} >
                            Get Started
                        </Button>
                    </div>
                </div>
            </nav>

            <section className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40 text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-[100px] rounded-full mix-blend-screen"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-5xl px-6 flex flex-col items-center">

                    <div className="mb-8 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                        v2.0 Now Available
                    </div>

                    <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
                        <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                            The backbone of
                        </span>
                        <br />
                        <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                            digital campus ops.
                        </span>
                    </h1>

                    <p className="mb-10 max-w-2xl text-lg text-zinc-400 md:text-xl leading-relaxed">
                        Centralize communications, automate approvals, and manage roles
                        with a system designed for institutional scale.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <button className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-zinc-100 text-zinc-900 font-semibold hover:bg-white transition-all">
                            Get Started
                        </button>
                        <button className="w-full sm:w-auto px-8 py-3.5 rounded-lg border border-zinc-800 text-zinc-300 font-medium hover:bg-zinc-900 hover:text-white transition-all">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            <section className="w-full border-t border-zinc-800 bg-[#09090b] py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                                The College Sync ecosystem
                            </h2>

                            <div className="space-y-6 text-lg text-zinc-400 leading-relaxed">
                                <p>
                                    College Sync is not just a single application, but a complete
                                    digital campus ecosystem. It connects academics, communication,
                                    administration, and student life into one unified platform.
                                </p>
                                <p>
                                    From timetables and assignments to approvals, clubs, and audits,
                                    every module works together seamlessly — designed around
                                    institutional hierarchy and real academic workflows.
                                </p>
                            </div>
                        </div>

                        <div className="relative flex justify-center group">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-600 to-purple-600 opacity-40 blur-3xl -z-10 rounded-full group-hover:opacity-60 transition-opacity duration-500"></div>
                            <img
                                src={ecoImage}
                                alt="College Sync ecosystem"
                                className="w-full max-w-lg object-contain rounded-2xl relative z-10 drop-shadow-2xl"
                            />
                        </div>

                    </div>
                </div>
            </section>

            <section className="w-full border-t border-zinc-800 bg-[#0c0c0e] py-24">
                <div className="mx-auto max-w-7xl px-6 text-center">

                    <div className="mb-16">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                            A unified campus dashboard
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-zinc-400">
                            Assignments, approvals, notifications, and analytics —
                            everything in one place.
                        </p>
                    </div>

                    <div className="relative mx-auto rounded-xl border border-zinc-800 bg-[#18181b]/50 backdrop-blur-xl shadow-2xl overflow-hidden max-w-5xl">

                        <div className="flex items-center justify-between border-b border-zinc-800 bg-[#18181b]/80 px-4 py-3">
                            <div className="flex gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                                <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
                                <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <div className="text-xs font-medium text-zinc-500">dashboard.collegesync.com</div>
                            <div className="w-12"></div>
                        </div>

                        <div className="p-6 md:p-10 text-left">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                <DashboardCard
                                    title="Pending Approvals"
                                    value="12"
                                    subtitle="Clubs • Events • Requests"
                                />
                                <DashboardCard
                                    title="Active Classes"
                                    value="24"
                                    subtitle="Lectures & Labs"
                                />
                                <DashboardCard
                                    title="Notifications"
                                    value="8"
                                    subtitle="Unread updates"
                                />
                            </div>

                            <div className="border-t border-zinc-800 pt-8">
                                <h3 className="mb-4 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                    Recent Activity
                                </h3>
                                <div className="flex flex-col gap-3">
                                    <ActivityRow text="New event approval requested by Coding Club" time="2m ago" />
                                    <ActivityRow text="Assignment uploaded for SY IT – DBMS" time="1h ago" />
                                    <ActivityRow text="Timetable updated by HOD – CSE" time="4h ago" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
};



export default CollegeSyncFinal;
