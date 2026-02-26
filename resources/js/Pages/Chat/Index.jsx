import React, { useState, useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Index() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Welcome to Gwanda State University! I am SmartAssist. How can I help you today?",
            sender: "bot",
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        },
    ]);
    const [input, setInput] = useState("");
    const [sessionId] = useState(() => Math.random().toString(36).substring(7));
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = {
            id: Date.now(),
            text: input,
            sender: "user",
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const response = await axios.post("/api/chat", {
                message: input,
                session_id: sessionId,
            });

            const botMsg = {
                id: Date.now() + 1,
                text: response.data.response,
                sender: "bot",
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMsg = {
                id: Date.now() + 1,
                text: "I'm having a bit of a technical glitch. Could you please try again or check our FAQs?",
                sender: "bot",
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 selection:bg-blue-600 selection:text-white">
            <Head title="GSU SmartAssist - Chat Support" />

            <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden flex flex-col h-[85vh] relative animate-fade-in">
                {/* Header */}
                <header className="bg-white border-b border-slate-50 px-8 py-6 flex items-center justify-between z-10">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="hover:scale-105 transition-transform"
                        >
                            <ApplicationLogo className="h-10 w-auto text-blue-600" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 tracking-tight">
                                GSU{" "}
                                <span className="text-blue-600">
                                    SmartAssist
                                </span>
                            </h1>
                            <div className="flex items-center space-x-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    Online • Intelligent
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            href={route("faqs")}
                            className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
                        >
                            FAQs
                        </Link>
                        <div className="h-8 w-px bg-slate-100"></div>
                        <button className="text-slate-300 hover:text-slate-600">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-8 py-10 space-y-8 bg-[#FDFDFF] scroll-smooth">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
                        >
                            <div
                                className={`flex flex-col space-y-2 max-w-[75%] ${msg.sender === "user" ? "items-end" : "items-start"}`}
                            >
                                <div
                                    className={`p-5 rounded-[2rem] text-sm font-medium leading-relaxed ${
                                        msg.sender === "user"
                                            ? "bg-blue-600 text-white rounded-tr-none shadow-xl shadow-blue-100"
                                            : "bg-white border border-slate-100 shadow-sm text-slate-700 rounded-tl-none ring-4 ring-slate-50/50"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest px-2">
                                    {msg.time}
                                </span>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start animate-fade-in">
                            <div className="flex flex-col items-start space-y-2">
                                <div className="bg-white border border-slate-100 p-5 rounded-[2rem] rounded-tl-none shadow-sm flex space-x-1.5 ring-4 ring-slate-50/50">
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-duration:800ms]"></div>
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-duration:800ms] [animation-delay:200ms]"></div>
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-duration:800ms] [animation-delay:400ms]"></div>
                                </div>
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest px-2">
                                    Assistant is typing...
                                </span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-8 bg-white border-t border-slate-50">
                    <form
                        onSubmit={handleSend}
                        className="relative flex items-center"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type reaching for answers..."
                            className="w-full bg-slate-50 border-none rounded-[1.5rem] pl-6 pr-20 py-5 font-medium text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-600/20 transition-all outline-none"
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="absolute right-2 px-6 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-30 disabled:shadow-none active:scale-95"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                            </svg>
                        </button>
                    </form>
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                            GSU Unified Support Platform
                        </p>
                        <p className="text-[10px] text-slate-300 font-medium">
                            Messages are logged for quality assurance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
