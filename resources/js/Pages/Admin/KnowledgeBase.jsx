import React, { useEffect, useMemo, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";

const initialForm = {
    category: "",
    question: "",
    answer: "",
    keywords: "",
};

export default function KnowledgeBase() {
    const [faqs, setFaqs] = useState([]);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fetchFaqs = async () => {
        setLoading(true);

        try {
            const response = await axios.get("/api/faqs");
            setFaqs(response.data || []);
        } catch (error) {
            setFaqs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const filteredFaqs = useMemo(() => {
        const term = query.trim().toLowerCase();

        if (!term) {
            return faqs;
        }

        return faqs.filter((faq) =>
            [faq.category, faq.question, faq.answer, faq.keywords]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(term)),
        );
    }, [faqs, query]);

    const updateField = (name, value) => {
        setFormData((previous) => ({ ...previous, [name]: value }));
        setErrors((previous) => ({ ...previous, [name]: undefined }));
    };

    const resetEditor = () => {
        setEditing(null);
        setFormData(initialForm);
        setErrors({});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setErrors({});

        try {
            if (editing) {
                await axios.put(`/api/admin/faqs/${editing.id}`, formData);
            } else {
                await axios.post("/api/admin/faqs", formData);
            }

            resetEditor();
            await fetchFaqs();
        } catch (error) {
            setErrors(error?.response?.data?.errors || { form: ["Could not save this entry."] });
        } finally {
            setSaving(false);
        }
    };

    const editFaq = (faq) => {
        setEditing(faq);
        setFormData({
            category: faq.category || "",
            question: faq.question || "",
            answer: faq.answer || "",
            keywords: faq.keywords || "",
        });
        setErrors({});
    };

    const deleteFaq = async (id) => {
        if (!window.confirm("Delete this FAQ entry?")) {
            return;
        }

        try {
            await axios.delete(`/api/admin/faqs/${id}`);
            await fetchFaqs();
        } catch (error) {
            // Keep the UI stable if deletion fails.
        }
    };

    const renderFieldError = (field) => {
        if (!errors[field]) {
            return null;
        }

        return <p className="mt-1 text-xs font-semibold text-red-600">{errors[field][0]}</p>;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-1 flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="tag-chip">Knowledge Management</p>
                        <h1 className="mt-2 font-display text-3xl font-bold text-slate-900">Knowledge Base</h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Curate the verified responses that power SmartAssist.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-500">Total Entries</p>
                        <p className="font-display text-3xl font-bold text-slate-900">{faqs.length}</p>
                    </div>
                </div>
            }
        >
            <Head title="Admin - Knowledge Base" />

            <div className="space-y-5">
                <section className="surface-card p-5 sm:p-7">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="font-display text-2xl font-bold text-slate-900">
                                {editing ? "Edit FAQ Entry" : "Create FAQ Entry"}
                            </h2>
                            <p className="mt-1 text-sm text-slate-600">
                                Add structured answers with clear categories and search keywords.
                            </p>
                        </div>
                        {editing && (
                            <button type="button" onClick={resetEditor} className="btn-muted !py-2.5">
                                Cancel Editing
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">Category</label>
                            <input
                                value={formData.category}
                                onChange={(event) => updateField("category", event.target.value)}
                                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100"
                                placeholder="Admissions, Fees, Support..."
                                required
                            />
                            {renderFieldError("category")}
                        </div>

                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">Keywords</label>
                            <input
                                value={formData.keywords}
                                onChange={(event) => updateField("keywords", event.target.value)}
                                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100"
                                placeholder="comma separated terms"
                            />
                            {renderFieldError("keywords")}
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">Question</label>
                            <input
                                value={formData.question}
                                onChange={(event) => updateField("question", event.target.value)}
                                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100"
                                placeholder="What is the user likely to ask?"
                                required
                            />
                            {renderFieldError("question")}
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">Answer</label>
                            <textarea
                                value={formData.answer}
                                onChange={(event) => updateField("answer", event.target.value)}
                                className="mt-1 h-36 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100"
                                placeholder="Provide an accurate and concise response."
                                required
                            />
                            {renderFieldError("answer")}
                        </div>

                        {errors.form && <p className="md:col-span-2 text-sm font-semibold text-red-600">{errors.form[0]}</p>}

                        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
                            <button type="submit" disabled={saving} className="btn-brand disabled:cursor-not-allowed disabled:opacity-60">
                                {saving ? "Saving..." : editing ? "Save Changes" : "Publish Entry"}
                            </button>
                            {editing && (
                                <button type="button" onClick={resetEditor} className="btn-muted">
                                    Reset Form
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                <section className="surface-card overflow-hidden">
                    <div className="border-b border-slate-200 bg-white/70 px-5 py-4 sm:px-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="font-display text-2xl font-bold text-slate-900">Current Entries</h2>
                                <p className="text-sm text-slate-600">Search and maintain existing FAQ records.</p>
                            </div>
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Filter entries..."
                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100 sm:w-72"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="p-6">
                            <div className="h-4 w-48 animate-pulse rounded-full bg-slate-200" />
                        </div>
                    ) : filteredFaqs.length === 0 ? (
                        <div className="p-8 text-center sm:p-10">
                            <p className="text-sm font-semibold uppercase tracking-[0.13em] text-slate-500">No entries found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto soft-scrollbar">
                            <table className="w-full min-w-[860px]">
                                <thead className="bg-slate-100/80 text-left">
                                    <tr>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">Category</th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">Question</th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">Answer</th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200/70">
                                    {filteredFaqs.map((faq) => (
                                        <tr key={faq.id} className="align-top hover:bg-slate-50/70">
                                            <td className="px-5 py-4">
                                                <span className="rounded-full bg-cyan-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.13em] text-cyan-700">
                                                    {faq.category}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-sm font-semibold text-slate-800">{faq.question}</td>
                                            <td className="px-5 py-4 text-sm text-slate-600">{faq.answer}</td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => editFaq(faq)}
                                                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-cyan-300 hover:text-cyan-700"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteFaq(faq.id)}
                                                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-red-300 hover:text-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
