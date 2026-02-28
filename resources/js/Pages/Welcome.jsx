import { Head, Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

const capabilityCards = [
    {
        title: "Context-aware Chat API",
        detail: "Answers combine FAQ grounding with session-aware context for better follow-up responses.",
    },
    {
        title: "Admin Knowledge Console",
        detail: "Manage FAQs, monitor interaction logs, and continuously improve response quality.",
    },
    {
        title: "Responsive Student Experience",
        detail: "Chat and FAQ interfaces are optimized for phone, tablet, and desktop workflows.",
    },
];

const journeySteps = [
    {
        id: "01",
        title: "Ask anything",
        detail: "Students can ask about admissions, fees, programmes, support, and campus services.",
    },
    {
        id: "02",
        title: "Get guided answers",
        detail: "SmartAssist returns direct answers from the knowledge base, then escalates with AI context.",
    },
    {
        id: "03",
        title: "Improve continuously",
        detail: "Admins review logs and update entries so the assistant gets better over time.",
    },
];

export default function Welcome({ auth }) {
    const isAdmin = auth?.user?.role === "admin";

    return (
        <div className="relative min-h-screen overflow-hidden">
            <Head title="GSU SmartAssist" />

            <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />

            <nav className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
                <div className="section-shell flex items-center justify-between py-4">
                    <Link href="/" className="flex items-center gap-3">
                        <ApplicationLogo className="h-10 w-auto" />
                        <div>
                            <p className="font-display text-base font-bold text-slate-900">
                                GSU SmartAssist
                            </p>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                Intelligent Support Hub
                            </p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link href={route("faqs")} className="btn-muted hidden sm:inline-flex">
                            FAQ Library
                        </Link>
                    {auth?.user ? (
                        <Link href={isAdmin ? route("dashboard") : route("chat")} className="btn-brand">
                            {isAdmin ? "Admin Console" : "Open Chat"}
                        </Link>
                    ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
                                >
                                    Staff Login
                                </Link>
                                <Link href={route("chat")} className="btn-brand">
                                    Start Chat
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <header className="section-shell pb-14 pt-12 md:pb-20 md:pt-20">
                <div className="grid items-center gap-10 lg:grid-cols-[1.15fr,0.85fr]">
                    <div className="space-y-8">
                        <span className="tag-chip animate-fade-up">
                            University Intelligent Chatbot Platform
                        </span>
                        <div className="space-y-5">
                            <h1 className="font-display text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl lg:text-7xl animate-fade-up animate-delay-100">
                                Campus help, <span className="text-gradient">instantly accessible</span>
                            </h1>
                            <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg animate-fade-up animate-delay-200">
                                GSU SmartAssist gives students, applicants, and staff fast answers on admissions,
                                programmes, fees, academic calendar, library services, and ICT support.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 animate-fade-up animate-delay-300">
                            <Link href={route("chat")} className="btn-brand">
                                Open Live Chat
                            </Link>
                            <Link href={route("faqs")} className="btn-muted">
                                Browse FAQs
                            </Link>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3 animate-fade-up animate-delay-500">
                            <div className="surface-card p-4">
                                <p className="text-2xl font-display font-bold text-slate-900">24/7</p>
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                                    Availability
                                </p>
                            </div>
                            <div className="surface-card p-4">
                                <p className="text-2xl font-display font-bold text-slate-900">API + UI</p>
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                                    Full Stack Delivery
                                </p>
                            </div>
                            <div className="surface-card p-4">
                                <p className="text-2xl font-display font-bold text-slate-900">Secure</p>
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                                    Admin Controls
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel relative overflow-hidden p-6 sm:p-8 animate-fade-up animate-delay-200">
                        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-200/70 blur-2xl" />
                        <div className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-orange-200/70 blur-2xl" />
                        <div className="relative space-y-5">
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                                SmartAssist Preview
                            </p>
                            <div className="space-y-4">
                                <div className="max-w-xs rounded-2xl rounded-bl-none bg-white p-4 text-sm text-slate-700 shadow-lg shadow-slate-200/50">
                                    What are the admission requirements for undergraduate programmes?
                                </div>
                                <div className="ml-auto max-w-xs rounded-2xl rounded-tr-none bg-slate-900 p-4 text-sm text-white shadow-lg shadow-slate-300/40">
                                    You will need ordinary level passes plus programme-specific entry criteria. I can show the latest admissions guidance by faculty.
                                </div>
                                <div className="max-w-[11rem] rounded-2xl rounded-bl-none border border-slate-200 bg-white p-3 text-sm text-slate-500">
                                    Would you like fees and application dates too?
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white/95 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                                    Coverage Areas
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {[
                                        "Admissions",
                                        "Fees",
                                        "Programmes",
                                        "Academic Calendar",
                                        "Library",
                                        "ICT Support",
                                    ].map((item) => (
                                        <span key={item} className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="section-shell pb-12 md:pb-16">
                <div className="surface-card p-6 sm:p-8 lg:p-10">
                    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="tag-chip">Assessment Alignment</p>
                            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 md:text-4xl">
                                Built around the practical brief
                            </h2>
                        </div>
                        <Link href={route("chat")} className="btn-muted">
                            Try the Assistant
                        </Link>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {capabilityCards.map((card) => (
                            <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                                <h3 className="font-display text-xl font-semibold text-slate-900">{card.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.detail}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-shell pb-20">
                <div className="grid gap-5 lg:grid-cols-3">
                    {journeySteps.map((step) => (
                        <article key={step.id} className="surface-card p-6">
                            <p className="text-sm font-bold text-cyan-700">Step {step.id}</p>
                            <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">{step.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.detail}</p>
                        </article>
                    ))}
                </div>
            </section>

            <footer className="border-t border-white/80 bg-white/70 py-8">
                <div className="section-shell flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                    <div className="flex items-center gap-2">
                        <ApplicationLogo className="h-8 w-auto" />
                        <p className="text-sm font-semibold text-slate-700">GSU SmartAssist</p>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                        © {new Date().getFullYear()} Gwanda State University
                    </p>
                </div>
            </footer>
        </div>
    );
}
