import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
    const [stats, setStats] = useState({
        faqs: 0,
        chats: 0,
        active_sessions: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch stats from API
        const fetchStats = async () => {
            try {
                const faqsRes = await axios.get("/api/faqs");
                const logsRes = await axios.get("/api/admin/chat-logs");

                const uniqueSessions = new Set(
                    logsRes.data.map((log) => log.session_id),
                ).size;

                setStats({
                    faqs: faqsRes.data.length,
                    chats: logsRes.data.length,
                    active_sessions: uniqueSessions,
                });
            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        System Overview
                    </h2>
                    <p className="text-slate-500 text-sm">
                        Welcome back! Here is what's happening with GSU
                        SmartAssist.
                    </p>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="space-y-8 animate-fade-in">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            label: "Knowledge Base",
                            value: stats.faqs,
                            icon: "📚",
                            color: "bg-blue-600",
                            trend: "+4 this week",
                        },
                        {
                            label: "Total Interactions",
                            value: stats.chats,
                            icon: "💬",
                            color: "bg-indigo-600",
                            trend: "12% increase",
                        },
                        {
                            label: "Unique Users",
                            value: stats.active_sessions,
                            icon: "👤",
                            color: "bg-emerald-600",
                            trend: "Growing steady",
                        },
                    ].map((s, i) => (
                        <div
                            key={i}
                            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative"
                        >
                            <div
                                className={`absolute top-0 right-0 w-32 h-32 ${s.color} opacity-[0.03] rounded-bl-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700`}
                            ></div>
                            <div className="flex items-center justify-between mb-6">
                                <div
                                    className={`h-14 w-14 rounded-2xl ${s.color} flex items-center justify-center text-2xl shadow-lg shadow-blue-100`}
                                >
                                    {s.icon}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                                    {s.trend}
                                </span>
                            </div>
                            <h3 className="text-slate-500 text-sm font-semibold mb-1">
                                {s.label}
                            </h3>
                            <div className="flex items-baseline space-x-2">
                                <span className="text-4xl font-black text-slate-900 tracking-tighter">
                                    {loading ? "..." : s.value}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Quick Actions */}
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                        <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center space-x-2">
                            <span>⚡ Quick Actions</span>
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Link
                                href={route("admin.faqs")}
                                className="flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-blue-600 hover:text-white transition-all group active:scale-95"
                            >
                                <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                                    ➕
                                </span>
                                <span className="font-bold text-sm">
                                    Add New FAQ
                                </span>
                            </Link>
                            <Link
                                href={route("admin.logs")}
                                className="flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-indigo-600 hover:text-white transition-all group active:scale-95"
                            >
                                <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                                    📋
                                </span>
                                <span className="font-bold text-sm">
                                    Review Logs
                                </span>
                            </Link>
                            <Link
                                href={route("profile.edit")}
                                className="flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-slate-900 hover:text-white transition-all group active:scale-95"
                            >
                                <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                                    ⚙️
                                </span>
                                <span className="font-bold text-sm">
                                    Settings
                                </span>
                            </Link>
                            <Link
                                href={route("chat")}
                                className="flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-emerald-600 hover:text-white transition-all group active:scale-95"
                            >
                                <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                                    🤖
                                </span>
                                <span className="font-bold text-sm">
                                    Test Chatbot
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <svg
                                className="w-40 h-40"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                            <span className="h-2 w-2 rounded-full bg-green-400 animate-ping"></span>
                            <span>System Status</span>
                        </h3>
                        <div className="space-y-6 relative z-10">
                            <div className="flex items-center justify-between p-4 bg-slate-800 rounded-2xl">
                                <span className="text-slate-400 text-sm">
                                    OpenAI API
                                </span>
                                <span className="text-green-400 font-bold text-xs uppercase tracking-widest">
                                    Operational
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-800 rounded-2xl">
                                <span className="text-slate-400 text-sm">
                                    Database Clusters
                                </span>
                                <span className="text-green-400 font-bold text-xs uppercase tracking-widest">
                                    Healthy
                                </span>
                            </div>

                            <div className="pt-4">
                                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">
                                    Resource Usage
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[34%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
