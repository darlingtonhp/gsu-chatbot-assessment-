import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ stats }) {
    const state = {
        loading: false,
        faqs: Number(stats?.faqs ?? 0),
        chats: Number(stats?.chats ?? 0),
        sessions: Number(stats?.sessions ?? 0),
        categories: Number(stats?.categories ?? 0),
        latestActivity: stats?.latestActivity ?? null,
    };

    const metricCards = [
        {
            title: "Knowledge Entries",
            value: state.faqs,
            helper: "Total FAQ records available to SmartAssist",
        },
        {
            title: "Chat Interactions",
            value: state.chats,
            helper: "Logged conversations across all sessions",
        },
        {
            title: "Active Sessions",
            value: state.sessions,
            helper: "Unique web session IDs in the logs",
        },
        {
            title: "Coverage Categories",
            value: state.categories,
            helper: "Distinct FAQ categories currently maintained",
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-1 flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="tag-chip">Admin Dashboard</p>
                        <h1 className="mt-2 font-display text-3xl font-bold text-slate-900">System Overview</h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Monitor platform health, content readiness, and interaction activity.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route("admin.faqs")} className="btn-muted !py-2.5">
                            Manage Knowledge Base
                        </Link>
                        <Link href={route("chat")} className="btn-brand !py-2.5">
                            Test Live Chat
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="space-y-5">
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {metricCards.map((metric) => (
                        <article key={metric.title} className="surface-card p-5 sm:p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">{metric.title}</p>
                            <p className="mt-2 font-display text-4xl font-bold text-slate-900">
                                {state.loading ? "--" : metric.value}
                            </p>
                            <p className="mt-2 text-sm text-slate-600">{metric.helper}</p>
                        </article>
                    ))}
                </section>

                <section className="grid gap-5 xl:grid-cols-[1.1fr,0.9fr]">
                    <article className="surface-card p-6 sm:p-7">
                        <h2 className="font-display text-2xl font-bold text-slate-900">Operational Checklist</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Focus areas to keep chatbot quality and coverage aligned with student support needs.
                        </p>

                        <div className="mt-5 space-y-3">
                            {[
                                "Review top unresolved chat intents from interaction logs.",
                                "Expand FAQ categories for admissions, programmes, and support workflows.",
                                "Validate admin-only access to knowledge and monitoring endpoints.",
                                "Confirm rate limiting and API key handling in production environment.",
                            ].map((item) => (
                                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                                    <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                                        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.414 0l-3.2-3.2a1 1 0 011.414-1.42l2.493 2.494 6.493-6.494a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                    <p className="text-sm leading-relaxed text-slate-700">{item}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="glass-panel p-6 sm:p-7">
                        <h2 className="font-display text-2xl font-bold text-slate-900">Platform Status</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Snapshot generated from current API data and admin session activity.
                        </p>

                        <div className="mt-5 space-y-3">
                            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">API Health</p>
                                <p className="mt-1 text-sm font-semibold text-emerald-700">Operational</p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Security Layer</p>
                                <p className="mt-1 text-sm font-semibold text-emerald-700">Admin Route Guard Active</p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Latest Activity</p>
                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                    {state.latestActivity
                                        ? new Date(state.latestActivity).toLocaleString()
                                        : "No chat activity recorded yet."}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-2 sm:grid-cols-2">
                            <Link href={route("admin.logs")} className="btn-muted !py-2.5 text-center">
                                View Logs
                            </Link>
                            <Link href={route("admin.faqs")} className="btn-brand !py-2.5 text-center">
                                Add FAQ Entry
                            </Link>
                        </div>
                    </article>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
