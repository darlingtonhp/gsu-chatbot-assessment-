import React, { useEffect, useMemo, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Library() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchFaqs = async () => {
            try {
                const response = await axios.get("/api/faqs");
                if (isMounted) {
                    setFaqs(response.data || []);
                }
            } catch (error) {
                if (isMounted) {
                    setFaqs([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchFaqs();

        return () => {
            isMounted = false;
        };
    }, []);

    const categories = useMemo(
        () => ["All", ...new Set(faqs.map((faq) => faq.category).filter(Boolean))],
        [faqs],
    );

    const filteredFaqs = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return faqs.filter((faq) => {
            const categoryMatch = activeCategory === "All" || faq.category === activeCategory;
            const searchMatch =
                term === "" ||
                faq.question?.toLowerCase().includes(term) ||
                faq.answer?.toLowerCase().includes(term) ||
                faq.category?.toLowerCase().includes(term) ||
                faq.keywords?.toLowerCase().includes(term);

            return categoryMatch && searchMatch;
        });
    }, [activeCategory, faqs, searchTerm]);

    return (
        <div className="min-h-screen pb-10">
            <Head title="GSU SmartAssist - FAQ Library" />

            <div className="section-shell pt-6">
                <div className="surface-card flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6">
                    <Link href="/" className="flex items-center gap-3">
                        <ApplicationLogo className="h-10 w-10" />
                        <div>
                            <p className="font-display text-lg font-bold text-slate-900">GSU FAQ Library</p>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                                Verified University Responses
                            </p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link href={route("chat")} className="btn-brand !py-2.5">
                            Open Live Chat
                        </Link>
                    </div>
                </div>
            </div>

            <header className="section-shell mt-6">
                <div className="glass-panel overflow-hidden p-6 sm:p-8">
                    <div className="grid gap-6 lg:grid-cols-[1fr,0.46fr] lg:items-end">
                        <div>
                            <span className="tag-chip">Knowledge Base</span>
                            <h1 className="mt-4 font-display text-3xl font-bold text-slate-900 sm:text-5xl">
                                Find answers in seconds
                            </h1>
                            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
                                Search by topic, then refine by category. If you cannot find what you need, switch to
                                live chat for personalized support.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                                Knowledge Snapshot
                            </p>
                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <div className="rounded-xl bg-slate-100 px-3 py-2">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                                        Entries
                                    </p>
                                    <p className="font-display text-2xl font-bold text-slate-900">{faqs.length}</p>
                                </div>
                                <div className="rounded-xl bg-slate-100 px-3 py-2">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                                        Categories
                                    </p>
                                    <p className="font-display text-2xl font-bold text-slate-900">
                                        {Math.max(categories.length - 1, 0)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-7">
                        <label
                            htmlFor="faq-search"
                            className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500"
                        >
                            Search FAQ Content
                        </label>
                        <input
                            id="faq-search"
                            type="text"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Try: admissions requirements, tuition fees, ICT support..."
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100"
                        />
                    </div>
                </div>
            </header>

            <main className="section-shell mt-6 space-y-5">
                <div className="surface-card p-4 sm:p-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                        Filter by Category
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition ${
                                    activeCategory === category
                                        ? "border-slate-900 bg-slate-900 text-white"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="surface-card p-8 sm:p-10">
                        <div className="space-y-3">
                            <div className="h-4 w-40 animate-pulse rounded-full bg-slate-200" />
                            <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
                            <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-100" />
                        </div>
                    </div>
                ) : filteredFaqs.length === 0 ? (
                    <div className="surface-card p-10 text-center sm:p-16">
                        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
                            No matching FAQs
                        </p>
                        <h2 className="mt-2 font-display text-3xl font-bold text-slate-900">
                            Try a broader search
                        </h2>
                        <p className="mx-auto mt-3 max-w-md text-sm text-slate-600">
                            Refine your wording or open the live chat for contextual assistance on your specific
                            request.
                        </p>
                        <div className="mt-6">
                            <Link href={route("chat")} className="btn-brand">
                                Continue in Chat
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredFaqs.map((faq, index) => {
                            const isOpen = expandedId === faq.id;

                            return (
                                <article
                                    key={faq.id}
                                    className="surface-card overflow-hidden animate-fade-up"
                                    style={{ animationDelay: `${Math.min(index * 45, 260)}ms` }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setExpandedId(isOpen ? null : faq.id)}
                                        className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                                    >
                                        <div>
                                            <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-700">
                                                {faq.category}
                                            </span>
                                            <h3 className="mt-3 font-display text-xl font-semibold text-slate-900 sm:text-2xl">
                                                {faq.question}
                                            </h3>
                                        </div>
                                        <span className="mt-2 rounded-full border border-slate-200 p-2 text-slate-500">
                                            <svg
                                                className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="border-t border-slate-200 bg-white/80 px-5 py-5 sm:px-6">
                                            <p className="text-sm leading-relaxed text-slate-700">{faq.answer}</p>
                                            {faq.keywords && (
                                                <p className="mt-4 text-xs text-slate-500">
                                                    <span className="font-semibold uppercase tracking-[0.12em]">
                                                        Keywords:
                                                    </span>{" "}
                                                    {faq.keywords}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </main>

            <footer className="section-shell mt-10 border-t border-white/70 py-8 text-center sm:text-left">
                <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        © {new Date().getFullYear()} GSU SmartAssist Knowledge Base
                    </p>
                    <div className="flex gap-2">
                        <Link href="/" className="btn-muted !py-2">
                            Home
                        </Link>
                        <Link href={route("chat")} className="btn-brand !py-2">
                            Chat
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
