import { Head, Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden">
            <Head title="GSU SmartAssist - University Intelligence" />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <ApplicationLogo className="h-10 w-auto fill-current text-blue-600" />
                    <span className="font-extrabold text-xl tracking-tighter text-slate-900">
                        GSU <span className="text-blue-600">SmartAssist</span>
                    </span>
                </div>

                <div className="flex items-center space-x-6">
                    <Link
                        href={route("faqs")}
                        className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                    >
                        FAQs
                    </Link>
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                        >
                            Admin Dashboard
                        </Link>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link
                                href={route("login")}
                                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                Staff Login
                            </Link>
                            <Link
                                href={route("chat")}
                                className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                            >
                                Start Chatting
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 text-center lg:text-left space-y-8">
                    <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest animate-fade-in">
                        <span>✨ Powered by Advanced AI</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] animate-slide-up">
                        Your Personal <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            University Assistant
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-slide-up delay-100">
                        Get instant answers about GSU admissions, programmes,
                        fees, and more. SmartAssist is here to guide you through
                        your academic journey with Gwanda State University.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-slide-up delay-200">
                        <Link
                            href={route("chat")}
                            className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-3"
                        >
                            <span>Chat with SmartAssist</span>
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
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                        <Link
                            href={route("faqs")}
                            className="w-full sm:w-auto bg-white text-slate-900 border-2 border-slate-100 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center"
                        >
                            Explore FAQs
                        </Link>
                    </div>

                    <div className="pt-8 flex items-center justify-center lg:justify-start space-x-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                        <img
                            src="/images/Logo.png"
                            className="h-12 w-auto"
                            alt="GSU Logo"
                        />
                        <div className="h-8 w-px bg-slate-200"></div>
                        <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
                            Official GSU Platform
                        </span>
                    </div>
                </div>

                <div className="flex-1 relative animate-fade-in delay-300">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2rem] opacity-10 blur-2xl"></div>
                    <div className="relative bg-white border border-slate-100 rounded-[2rem] shadow-2xl p-4 overflow-hidden">
                        <div className="bg-slate-50 rounded-[1.5rem] p-8 space-y-6">
                            <div className="flex items-start space-x-3">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <svg
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-xs">
                                    <p className="text-sm text-slate-600 font-medium">
                                        Hi! I'm interested in the Engineering
                                        programmes. Can you help?
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start justify-end space-x-3">
                                <div className="bg-blue-600 p-4 rounded-2xl rounded-tr-none shadow-lg shadow-blue-100 max-w-xs">
                                    <p className="text-sm text-white font-medium">
                                        Absolutely! Gwanda State University
                                        offers a Bachelor of Science (Hons) in
                                        Mining and Geomatics. Would you like to
                                        see the entry requirements?
                                    </p>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                                    S
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <svg
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-xs animate-pulse">
                                    <div className="h-2 w-12 bg-slate-100 rounded mb-2"></div>
                                    <div className="h-2 w-full bg-slate-50 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Grid */}
            <section className="bg-slate-50 py-24 px-6">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                            Everything at your fingertips
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            SmartAssist is integrated across all university
                            platforms to provide you with the most accurate and
                            up-to-date information.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Instant FAQ Search",
                                desc: "Access a vast database of verified university information instantly.",
                                icon: "📚",
                            },
                            {
                                title: "24/7 AI Support",
                                desc: "Our intelligent bot handles complex queries when staff aren't available.",
                                icon: "🤖",
                            },
                            {
                                title: "Academic Registry",
                                desc: "Get information on registration, transcripts, and graduation requirements.",
                                icon: "🎓",
                            },
                        ].map((f, i) => (
                            <div
                                key={i}
                                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="text-4xl mb-6 group-hover:scale-125 transition-transform">
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {f.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-100 text-center space-y-4">
                <div className="flex items-center justify-center space-x-2">
                    <ApplicationLogo className="h-6 w-auto fill-current text-slate-300" />
                    <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">
                        Gwanda State University
                    </span>
                </div>
                <p className="text-xs text-slate-400">
                    &copy; {new Date().getFullYear()} GSU SmartAssist. For
                    academic excellence.{" "}
                </p>
            </footer>
        </div>
    );
}
