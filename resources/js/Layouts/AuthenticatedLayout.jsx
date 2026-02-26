import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

const navItems = [
    {
        group: "Operations",
        links: [
            {
                label: "Dashboard",
                routeName: "dashboard",
                icon: (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M3 10.75 12 3l9 7.75v8a1.75 1.75 0 0 1-1.75 1.75h-3.5A1.75 1.75 0 0 1 14 18.75V15a2 2 0 0 0-4 0v3.75a1.75 1.75 0 0 1-1.75 1.75h-3.5A1.75 1.75 0 0 1 3 18.75z"
                    />
                ),
            },
            {
                label: "Knowledge Base",
                routeName: "admin.faqs",
                icon: (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5m0-15v15m0-15A2.5 2.5 0 0 1 6.5 3"
                    />
                ),
            },
            {
                label: "Interaction Logs",
                routeName: "admin.logs",
                icon: (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M4 5h16M4 12h16M4 19h10"
                    />
                ),
            },
        ],
    },
    {
        group: "Account",
        links: [
            {
                label: "Profile",
                routeName: "profile.edit",
                icon: (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm5 14a8.5 8.5 0 0 0-16.99 0"
                    />
                ),
            },
        ],
    },
];

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    const initials = useMemo(() => {
        if (!user?.name) {
            return "A";
        }

        const parts = user.name.trim().split(" ").filter(Boolean);
        return `${parts[0][0]}${parts[1] ? parts[1][0] : ""}`.toUpperCase();
    }, [user?.name]);

    return (
        <div className="min-h-screen">
            <div className="pointer-events-none fixed right-0 top-0 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
            <div className="pointer-events-none fixed -left-20 bottom-0 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl" />

            <div className="relative flex min-h-screen">
                <aside className="hidden w-[290px] shrink-0 border-r border-white/80 bg-white/80 px-5 py-6 backdrop-blur-xl lg:flex lg:flex-col">
                    <Link href="/" className="flex items-center gap-3 rounded-2xl px-2 py-2">
                        <ApplicationLogo className="h-11 w-11" />
                        <div>
                            <p className="font-display text-lg font-bold text-slate-900">GSU Admin</p>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                                SmartAssist Console
                            </p>
                        </div>
                    </Link>

                    <nav className="mt-8 flex-1 space-y-6 overflow-y-auto pr-1 soft-scrollbar">
                        {navItems.map((section) => (
                            <div key={section.group}>
                                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                    {section.group}
                                </p>
                                <div className="space-y-1">
                                    {section.links.map((item) => {
                                        const active = route().current(item.routeName);

                                        return (
                                            <Link
                                                key={item.routeName}
                                                href={route(item.routeName)}
                                                className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${
                                                    active
                                                        ? "bg-slate-900 text-white shadow-lg shadow-slate-300/40"
                                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                                }`}
                                            >
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    {item.icon}
                                                </svg>
                                                <span>{item.label}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>

                    <div className="mt-6 space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                                {initials}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                                    {user.role || "Admin"}
                                </p>
                            </div>
                        </div>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                            Sign Out
                        </Link>
                    </div>
                </aside>

                <div className="flex min-h-screen w-full flex-col">
                    <div className="sticky top-0 z-40 border-b border-white/80 bg-white/80 backdrop-blur-xl lg:hidden">
                        <div className="section-shell flex items-center justify-between py-3">
                            <Link href="/" className="flex items-center gap-2">
                                <ApplicationLogo className="h-9 w-9" />
                                <span className="font-display text-lg font-bold text-slate-900">GSU Admin</span>
                            </Link>
                            <button
                                type="button"
                                onClick={() => setOpenMobileMenu((current) => !current)}
                                className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        {openMobileMenu && (
                            <div className="section-shell pb-4">
                                <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-3">
                                    {navItems.flatMap((section) => section.links).map((item) => (
                                        <Link
                                            key={item.routeName}
                                            href={route(item.routeName)}
                                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${
                                                route().current(item.routeName)
                                                    ? "bg-slate-900 text-white"
                                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                            }`}
                                            onClick={() => setOpenMobileMenu(false)}
                                        >
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                {item.icon}
                                            </svg>
                                            <span>{item.label}</span>
                                        </Link>
                                    ))}
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-600"
                                    >
                                        Sign Out
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {header && (
                        <header className="section-shell mt-5 lg:mt-7">
                            <div className="surface-card flex items-center justify-between gap-4 px-5 py-5 sm:px-6">{header}</div>
                        </header>
                    )}

                    <main className="section-shell my-5 flex-1 lg:my-7">{children}</main>

                    <footer className="section-shell pb-7">
                        <div className="flex flex-col items-center justify-between gap-2 rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-center sm:flex-row sm:text-left">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                                © {new Date().getFullYear()} GSU SmartAssist Admin
                            </p>
                            <p className="text-xs text-slate-500">Secure knowledge management and chatbot monitoring.</p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
