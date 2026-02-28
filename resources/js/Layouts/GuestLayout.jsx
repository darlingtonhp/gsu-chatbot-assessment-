import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="relative min-h-screen overflow-hidden py-10">
            <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />

            <div className="section-shell relative grid gap-6 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
                <section className="surface-card p-6 sm:p-8">
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                        <ApplicationLogo className="h-12 w-auto max-w-full" />
                        <div>
                            <p className="font-display text-2xl font-bold text-slate-900">GSU SmartAssist</p>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                                Administration Access
                            </p>
                        </div>
                    </div>

                    <h1 className="mt-8 font-display text-4xl font-bold text-slate-900 sm:text-5xl">
                        Secure control center
                    </h1>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                        Sign in to manage the knowledge base, review chat quality, and keep student support accurate.
                    </p>

                    <div className="mt-7 space-y-3">
                        {[
                            "Manage FAQ categories and responses",
                            "Monitor session logs and trends",
                            "Maintain secure admin-only operations",
                        ].map((item) => (
                            <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.414 0l-3.2-3.2a1 1 0 011.414-1.42l2.493 2.494 6.493-6.494a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                                <p className="text-sm text-slate-700">{item}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-7">
                        <Link href="/" className="btn-muted">
                            Back to Public Site
                        </Link>
                    </div>
                </section>

                <section className="glass-panel p-6 sm:p-8">{children}</section>
            </div>
        </div>
    );
}
