import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Index() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        axios
            .get("/api/faqs")
            .then((res) => {
                setFaqs(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching FAQs:", err);
                setLoading(false);
            });
    }, []);

    const categories = ["All", ...new Set(faqs.map((f) => f.category))];

    const filteredFaqs = faqs.filter(
        (faq) =>
            (activeCategory === "All" || faq.category === activeCategory) &&
            (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                faq.category.toLowerCase().includes(searchTerm.toLowerCase())),
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] selection:bg-blue-600 selection:text-white">
            <Head title="GSU Help Center - FAQ" />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <ApplicationLogo className="h-8 w-auto text-blue-600" />
                    <span className="font-extrabold text-lg tracking-tighter text-slate-900 border-l border-slate-100 pl-3 ml-1 uppercase tracking-[0.2em] text-[10px] text-slate-400">
                        Knowledge
                    </span>
                </div>
                <Link
                    href={route("chat")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
                >
                    Chat with AI
                </Link>
            </nav>

            {/* Hero Header */}
            <div className="bg-white pt-32 pb-20 border-b border-slate-50 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-50/30 skew-x-12 translate-x-32"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
                    <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6">
                        How can we <br />
                        <span className="text-blue-600">assist you today?</span>
                    </h1>
                    <div className="relative max-w-2xl group">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none transition-transform group-focus-within:scale-110">
                            <svg
                                className="h-6 w-6 text-slate-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Ask about admissions, fees, or campus life..."
                            className="w-full bg-slate-50 border-none rounded-[2rem] pl-16 pr-8 py-6 font-bold text-slate-600 placeholder:text-slate-300 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-lg shadow-2xl shadow-slate-200/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto py-16 px-6">
                {/* Category Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                                activeCategory === cat
                                    ? "bg-slate-900 text-white shadow-xl"
                                    : "bg-white text-slate-400 border border-slate-100 hover:border-blue-200 hover:text-blue-600"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 space-y-4">
                        <div className="relative flex h-10 w-10">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-10 w-10 bg-blue-600"></span>
                        </div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                            Synchronizing Knowledge
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq) => (
                                <div
                                    key={faq.id}
                                    className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                                >
                                    <div className="mb-6">
                                        <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[9px] font-black rounded-xl uppercase tracking-widest ring-4 ring-blue-50/30">
                                            {faq.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors">
                                        {faq.question}
                                    </h3>
                                    <div className="h-px w-12 bg-slate-100 mb-6 group-hover:w-24 transition-all duration-500"></div>
                                    <p className="text-slate-500 leading-relaxed font-medium">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                                <span className="text-6xl mb-6 block">🔎</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    No results found
                                </h3>
                                <p className="text-slate-400 text-sm max-w-xs mx-auto">
                                    Try refining your search or{" "}
                                    <Link
                                        href={route("chat")}
                                        className="text-blue-600 underline font-bold"
                                    >
                                        chat with SmartAssist
                                    </Link>{" "}
                                    for complex queries.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="py-20 bg-slate-50 border-t border-slate-100 px-6 text-center">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="flex items-center justify-center space-x-2">
                        <ApplicationLogo className="h-6 w-auto text-slate-300" />
                        <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">
                            Gwanda State University
                        </span>
                    </div>
                    <div className="flex items-center justify-center space-x-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <Link href="/" className="hover:text-blue-600">
                            Home
                        </Link>
                        <Link
                            href={route("chat")}
                            className="hover:text-blue-600"
                        >
                            AI Support
                        </Link>
                        <Link
                            href={route("login")}
                            className="hover:text-blue-600"
                        >
                            Staff Portal
                        </Link>
                    </div>
                    <p className="text-[10px] text-slate-300">
                        &copy; {new Date().getFullYear()} GSU SmartAssist. Build
                        version 2.0_REDESIGNE
                    </p>
                </div>
            </footer>
        </div>
    );
}
