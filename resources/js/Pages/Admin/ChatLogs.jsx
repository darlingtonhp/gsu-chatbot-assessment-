import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";

export default function ChatLogs({ auth }) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/admin/chat-logs");
            setLogs(res.data);
        } catch (err) {
            console.error("Error fetching logs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Interaction Logs
                    </h2>
                    <p className="text-slate-500 text-sm">
                        Monitor system conversations and identify areas for KB
                        improvement.
                    </p>
                </div>
            }
        >
            <Head title="Admin - Chat Logs" />

            <div className="space-y-8 animate-fade-in">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/30 overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tighter">
                            Live Sessions
                        </h3>
                        <button
                            onClick={fetchLogs}
                            className="bg-slate-50 text-slate-600 px-6 py-2.5 rounded-full text-xs font-bold hover:bg-slate-100 transition-all flex items-center space-x-2 border border-slate-100 active:scale-95"
                        >
                            <svg
                                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            <span>REFRESH DATA</span>
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        Identity / Session
                                    </th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        Interaction
                                    </th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        Time
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {logs.map((log) => (
                                    <tr
                                        key={log.id}
                                        className="group hover:bg-slate-50/20 transition-all"
                                    >
                                        <td className="px-8 py-6 align-top">
                                            <div className="flex flex-col space-y-1">
                                                <code
                                                    className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded truncate max-w-[120px]"
                                                    title={log.session_id}
                                                >
                                                    {log.session_id.substring(
                                                        0,
                                                        8,
                                                    )}
                                                    ...
                                                </code>
                                                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                                                    Web Client
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 max-w-2xl">
                                            <div className="space-y-4">
                                                <div className="flex items-start space-x-3">
                                                    <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                                        U
                                                    </div>
                                                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl rounded-tl-none text-slate-700 text-sm font-medium">
                                                        {log.message}
                                                    </div>
                                                </div>
                                                <div className="flex items-start justify-end space-x-3">
                                                    <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none text-white text-sm font-medium shadow-md">
                                                        {log.response}
                                                    </div>
                                                    <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                                                        S
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right align-top">
                                            <div className="text-[11px] font-black text-slate-400 uppercase tracking-tighter whitespace-nowrap">
                                                {new Date(
                                                    log.created_at,
                                                ).toLocaleDateString()}
                                            </div>
                                            <div className="text-[10px] text-slate-300 font-bold">
                                                {new Date(
                                                    log.created_at,
                                                ).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {logs.length === 0 && !loading && (
                            <div className="p-20 text-center space-y-4">
                                <div className="text-4xl">📭</div>
                                <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                                    No activity detected yet
                                </div>
                            </div>
                        )}
                        {loading && (
                            <div className="p-20 text-center space-y-4 animate-pulse">
                                <div className="h-4 w-48 bg-slate-100 mx-auto rounded-full"></div>
                                <div className="text-slate-300 font-bold uppercase tracking-widest text-[10px]">
                                    Synchronizing with server...
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
