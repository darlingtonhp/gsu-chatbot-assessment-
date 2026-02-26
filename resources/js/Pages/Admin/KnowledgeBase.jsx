import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";

export default function KnowledgeBase({ auth }) {
    const [faqs, setFaqs] = useState([]);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({
        category: "",
        question: "",
        answer: "",
        keywords: "",
    });
    const [loading, setLoading] = useState(true);

    const fetchFaqs = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/faqs");
            setFaqs(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await axios.put(`/api/admin/faqs/${editing.id}`, formData);
            } else {
                await axios.post("/api/admin/faqs", formData);
            }
            setFormData({
                category: "",
                question: "",
                answer: "",
                keywords: "",
            });
            setEditing(null);
            fetchFaqs();
        } catch (err) {
            console.error("Save error:", err);
        }
    };

    const deleteFaq = async (id) => {
        if (!confirm("Are you sure you want to delete this FAQ?")) return;
        await axios.delete(`/api/admin/faqs/${id}`);
        fetchFaqs();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Knowledge Base
                    </h2>
                    <p className="text-slate-500 text-sm">
                        Manage the information repository that powers the
                        SmartAssist bot.
                    </p>
                </div>
            }
        >
            <Head title="Admin - Knowledge Base" />

            <div className="space-y-10 animate-fade-in">
                {/* Form Section */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50">
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xl shadow-lg ring-4 ring-blue-50">
                            {editing ? "✍️" : "✨"}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                {editing
                                    ? "Edit Entry"
                                    : "Create New Knowledge Entry"}
                            </h3>
                            <p className="text-sm text-slate-400 font-medium">
                                Add questions, answers, and keywords for the AI
                                to learn.
                            </p>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                                Category
                            </label>
                            <input
                                placeholder="e.g., Admissions, Fees"
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        category: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                                Keywords
                            </label>
                            <input
                                placeholder="comma separated search terms"
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                                value={formData.keywords}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        keywords: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="md:col-span-2 space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                                The Question
                            </label>
                            <input
                                placeholder="What is the user likely to ask?"
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                                value={formData.question}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        question: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="md:col-span-2 space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                                The Answer (AI Training)
                            </label>
                            <textarea
                                placeholder="Provide a detailed, accurate response..."
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 transition-all font-medium h-40 resize-none"
                                value={formData.answer}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        answer: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="md:col-span-2 flex items-center space-x-4 pt-4">
                            <button
                                type="submit"
                                className="flex-1 md:flex-none px-12 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95"
                            >
                                {editing ? "Save Changes" : "Publish to KB"}
                            </button>
                            {editing && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditing(null);
                                        setFormData({
                                            category: "",
                                            question: "",
                                            answer: "",
                                            keywords: "",
                                        });
                                    }}
                                    className="px-12 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* List Section */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/30 overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tighter">
                            Current Repository
                        </h3>
                        <div className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                            {faqs.length} ENTRIES LOADED
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        Context
                                    </th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        Content
                                    </th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {faqs.map((faq) => (
                                    <tr
                                        key={faq.id}
                                        className="group hover:bg-slate-50/50 transition-all"
                                    >
                                        <td className="px-8 py-6 align-top">
                                            <span className="px-4 py-1.5 bg-white border border-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                                                {faq.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 max-w-xl">
                                            <div className="font-bold text-slate-900 mb-2 leading-tight">
                                                {faq.question}
                                            </div>
                                            <div className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right align-top">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setEditing(faq);
                                                        setFormData(faq);
                                                    }}
                                                    className="p-3 bg-white border border-slate-100 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-90"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        deleteFaq(faq.id)
                                                    }
                                                    className="p-3 bg-white border border-slate-100 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
