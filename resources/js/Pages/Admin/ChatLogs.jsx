import React, { useMemo, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";

export default function ChatLogs({ initialLogs = [] }) {
    const [logs, setLogs] = useState(initialLogs);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const fetchLogs = async () => {
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await axios.get("/admin/chat-logs/data");
            setLogs(response.data || []);
        } catch (error) {
            setLogs([]);
            if (error?.response?.status === 401 || error?.response?.status === 403) {
                setErrorMessage("Unable to load logs: admin API session is not authorized. Please sign out and sign in again.");
            } else {
                setErrorMessage("Unable to load logs right now. Please refresh and try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const filteredLogs = useMemo(() => {
        const term = query.trim().toLowerCase();

        if (!term) {
            return logs;
        }

        return logs.filter((log) =>
            [log.session_id, log.message, log.response]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(term)),
        );
    }, [logs, query]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-1 flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="tag-chip">Conversation Monitoring</p>
                        <h1 className="mt-2 font-display text-3xl font-bold text-slate-900">Interaction Logs</h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Track user prompts, assistant responses, and session behavior.
                        </p>
                    </div>
                    <button type="button" onClick={fetchLogs} className="btn-brand !py-2.5">
                        {loading ? "Refreshing..." : "Refresh Logs"}
                    </button>
                </div>
            }
        >
            <Head title="Admin - Chat Logs" />

            <section className="surface-card overflow-hidden">
                <div className="border-b border-slate-200 bg-white/75 px-5 py-4 sm:px-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="font-display text-2xl font-bold text-slate-900">Logged Sessions</h2>
                            <p className="text-sm text-slate-600">
                                Total records: <strong>{logs.length}</strong>
                            </p>
                        </div>
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search by session or message..."
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100 sm:w-80"
                        />
                    </div>
                </div>

                {errorMessage && (
                    <div className="border-b border-amber-200 bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-800 sm:px-6">
                        {errorMessage}
                    </div>
                )}

                {loading ? (
                    <div className="p-6 sm:p-8">
                        <div className="h-4 w-40 animate-pulse rounded-full bg-slate-200" />
                    </div>
                ) : filteredLogs.length === 0 ? (
                    <div className="p-10 text-center sm:p-16">
                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">No logs to display</p>
                    </div>
                ) : (
                    <div className="soft-scrollbar overflow-x-auto">
                        <table className="w-full min-w-[960px]">
                            <thead className="bg-slate-100/80 text-left">
                                <tr>
                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Session</th>
                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">User Message</th>
                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Assistant Response</th>
                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/70">
                                {filteredLogs.map((log) => (
                                    <tr key={log.id} className="align-top hover:bg-slate-50/70">
                                        <td className="px-5 py-4">
                                            <code className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                                                {log.session_id}
                                            </code>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-slate-700">{log.message}</td>
                                        <td className="px-5 py-4 text-sm text-slate-600">{log.response}</td>
                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {new Date(log.created_at).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </AuthenticatedLayout>
    );
}
