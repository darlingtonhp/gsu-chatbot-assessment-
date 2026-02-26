import React, { useEffect, useMemo, useRef, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import ApplicationLogo from "@/Components/ApplicationLogo";

const quickPrompts = [
    "What programmes are currently available at GSU?",
    "How do I apply for admission?",
    "Where can I find fee payment details?",
    "How do I contact ICT support?",
];

export default function Index() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "bot",
            text: "Welcome to GSU SmartAssist. Ask me about admissions, programmes, fees, library services, and ICT support.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const [sessionId] = useState(() => {
        if (typeof window === "undefined") {
            return Math.random().toString(36).slice(2, 10);
        }

        const existing = window.localStorage.getItem("gsu_chat_session");
        if (existing) {
            return existing;
        }

        const generated = `gsu_${Math.random().toString(36).slice(2, 10)}`;
        window.localStorage.setItem("gsu_chat_session", generated);
        return generated;
    });

    const conversationCount = useMemo(
        () => messages.filter((message) => message.sender === "user").length,
        [messages],
    );

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const appendMessage = (payload) => {
        setMessages((previous) => [
            ...previous,
            {
                id: Date.now() + Math.floor(Math.random() * 100),
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                ...payload,
            },
        ]);
    };

    const sendMessage = async (rawMessage) => {
        const message = rawMessage.trim();
        if (!message || loading) {
            return;
        }

        appendMessage({ sender: "user", text: message });
        setInput("");
        setLoading(true);

        try {
            const response = await axios.post("/api/chat", {
                message,
                session_id: sessionId,
            });

            appendMessage({
                sender: "bot",
                text:
                    response?.data?.response ||
                    "I could not process that request. Please try again.",
            });
        } catch (error) {
            appendMessage({
                sender: "bot",
                text: "I ran into a temporary issue. Please try again in a moment or check the FAQ library.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await sendMessage(input);
    };

    return (
        <div className="min-h-screen pb-8">
            <Head title="GSU SmartAssist - Live Chat" />

            <div className="section-shell pt-6">
                <div className="surface-card flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo className="h-10 w-10" />
                            <div>
                                <p className="font-display text-lg font-bold text-slate-900">GSU SmartAssist</p>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                                    Live Support Assistant
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route("faqs")} className="btn-muted !py-2.5">
                            FAQ Library
                        </Link>
                        <Link href={route("login")} className="btn-brand !py-2.5">
                            Admin Login
                        </Link>
                    </div>
                </div>
            </div>

            <main className="section-shell mt-6 grid gap-6 lg:grid-cols-[0.34fr,0.66fr]">
                <aside className="surface-card h-fit p-5 sm:p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="font-display text-2xl font-bold text-slate-900">Session Snapshot</h2>
                        <span className="tag-chip">Active</span>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">Session ID</p>
                            <p className="mt-2 truncate font-mono text-sm font-semibold text-slate-700">{sessionId}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">Questions Asked</p>
                            <p className="mt-2 text-2xl font-display font-bold text-slate-900">{conversationCount}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Quick Prompts</p>
                        <div className="mt-3 space-y-2">
                            {quickPrompts.map((prompt) => (
                                <button
                                    key={prompt}
                                    type="button"
                                    onClick={() => sendMessage(prompt)}
                                    disabled={loading}
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                <section className="glass-panel flex h-[74vh] min-h-[560px] flex-col overflow-hidden">
                    <div className="border-b border-slate-200/70 bg-white/75 px-5 py-4 sm:px-6">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="font-display text-xl font-bold text-slate-900">Conversation</p>
                                <p className="text-sm text-slate-600">Real-time AI-assisted support for GSU services.</p>
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">
                                <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                                Online
                            </div>
                        </div>
                    </div>

                    <div className="soft-scrollbar flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
                        {messages.map((message, index) => (
                            <article
                                key={message.id}
                                className={`flex animate-fade-up ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                style={{ animationDelay: `${Math.min(index * 40, 240)}ms` }}
                            >
                                <div className={`max-w-[82%] sm:max-w-[75%] ${message.sender === "user" ? "items-end" : "items-start"}`}>
                                    <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                                        <span>{message.sender === "user" ? "You" : "SmartAssist"}</span>
                                        <span>•</span>
                                        <span>{message.time}</span>
                                    </div>
                                    <div
                                        className={`rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
                                            message.sender === "user"
                                                ? "rounded-tr-md bg-slate-900 text-white shadow-slate-300/50"
                                                : "rounded-tl-md border border-slate-200 bg-white text-slate-700 shadow-slate-200/60"
                                        }`}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            </article>
                        ))}

                        {loading && (
                            <div className="flex justify-start animate-fade-up">
                                <div className="rounded-3xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 shadow-lg shadow-slate-200/60">
                                    <div className="flex gap-1.5">
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-500" />
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-500 [animation-delay:180ms]" />
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-500 [animation-delay:360ms]" />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t border-slate-200/70 bg-white/75 p-4 sm:p-5">
                        <form onSubmit={handleSubmit} className="flex items-center gap-3">
                            <input
                                type="text"
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                                placeholder="Ask about admissions, fees, programmes, or ICT support..."
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100"
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                disabled={loading || input.trim() === ""}
                                className="btn-brand min-w-[108px] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Send
                            </button>
                        </form>
                        <p className="mt-2 text-xs text-slate-500">
                            Messages are securely logged to help improve FAQ coverage and response quality.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
