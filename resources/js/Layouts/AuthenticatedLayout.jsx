import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 z-50 transition-all duration-300">
                <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
                    <Link href="/">
                        <ApplicationLogo className="h-8 w-auto fill-current text-blue-400" />
                    </Link>
                    <span className="font-bold text-lg tracking-tight">
                        SmartAssist
                    </span>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 mb-4">
                        Main Menu
                    </div>

                    <NavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all hover:bg-slate-800 group"
                    >
                        <svg
                            className={`h-5 w-5 ${route().current("dashboard") ? "text-blue-400" : "text-slate-400 group-hover:text-white"}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        <span
                            className={
                                route().current("dashboard")
                                    ? "text-white font-semibold"
                                    : "text-slate-300 group-hover:text-white"
                            }
                        >
                            Dashboard
                        </span>
                    </NavLink>

                    <NavLink
                        href={route("admin.faqs")}
                        active={route().current("admin.faqs")}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all hover:bg-slate-800 group"
                    >
                        <svg
                            className={`h-5 w-5 ${route().current("admin.faqs") ? "text-blue-400" : "text-slate-400 group-hover:text-white"}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                        </svg>
                        <span
                            className={
                                route().current("admin.faqs")
                                    ? "text-white font-semibold"
                                    : "text-slate-300 group-hover:text-white"
                            }
                        >
                            Knowledge Base
                        </span>
                    </NavLink>

                    <NavLink
                        href={route("admin.logs")}
                        active={route().current("admin.logs")}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all hover:bg-slate-800 group"
                    >
                        <svg
                            className={`h-5 w-5 ${route().current("admin.logs") ? "text-blue-400" : "text-slate-400 group-hover:text-white"}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                        </svg>
                        <span
                            className={
                                route().current("admin.logs")
                                    ? "text-white font-semibold"
                                    : "text-slate-300 group-hover:text-white"
                            }
                        >
                            Interaction Logs
                        </span>
                    </NavLink>

                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 mt-8 mb-4">
                        System
                    </div>

                    <NavLink
                        href={route("profile.edit")}
                        active={route().current("profile.edit")}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all hover:bg-slate-800 group"
                    >
                        <svg
                            className={`h-5 w-5 ${route().current("profile.edit") ? "text-blue-400" : "text-slate-400 group-hover:text-white"}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                        <span
                            className={
                                route().current("profile.edit")
                                    ? "text-white font-semibold"
                                    : "text-slate-300 group-hover:text-white"
                            }
                        >
                            Profile
                        </span>
                    </NavLink>
                </nav>

                <div className="p-4 bg-slate-800/50">
                    <div className="flex items-center space-x-3 mb-4 px-2">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white shadow-lg">
                            {user.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate">
                                {user.name}
                            </p>
                            <p className="text-xs text-slate-400 truncate uppercase tracking-tighter">
                                {user.role || "Administrator"}
                            </p>
                        </div>
                    </div>
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full flex items-center justify-center space-x-2 bg-slate-800 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all text-slate-400 text-sm font-semibold"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden w-full bg-white border-b p-4 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center space-x-2">
                    <ApplicationLogo className="h-8 w-auto fill-current text-blue-600" />
                    <span className="font-bold text-lg text-slate-900">
                        GSU Admin
                    </span>
                </div>
                <button
                    onClick={() =>
                        setShowingNavigationDropdown(!showingNavigationDropdown)
                    }
                    className="p-2 text-slate-600"
                >
                    <svg
                        className={`h-6 w-6 transition-transform duration-300 ${showingNavigationDropdown ? "rotate-90" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Nav Dropdown */}
            <div
                className={`md:hidden fixed inset-x-0 bg-white border-b z-30 transition-all duration-300 ease-in-out ${showingNavigationDropdown ? "top-16 opacity-100" : "-top-full opacity-0"}`}
            >
                <div className="p-4 space-y-2">
                    <ResponsiveNavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        Dashboard
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route("admin.faqs")}
                        active={route().current("admin.faqs")}
                    >
                        Knowledge Base
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route("admin.logs")}
                        active={route().current("admin.logs")}
                    >
                        Interaction Logs
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route("profile.edit")}
                        active={route().current("profile.edit")}
                    >
                        Profile
                    </ResponsiveNavLink>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 md:ms-64 transition-all duration-300 min-h-screen flex flex-col">
                {header && (
                    <header className="bg-white border-b border-gray-100 flex items-center justify-between px-8 py-6 sticky top-0 z-30">
                        <div>{header}</div>
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-bold text-slate-900">
                                    {user.name}
                                </span>
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest leading-none">
                                    {user.role || "Admin"}
                                </span>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                                {user.name.charAt(0)}
                            </div>
                        </div>
                    </header>
                )}

                <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                    {children}
                </main>

                <footer className="p-8 text-center text-xs text-slate-400 border-t border-gray-100">
                    &copy; {new Date().getFullYear()} Gwanda State University
                    SmartAssist. Built with ❤️ for GSU.
                </footer>
            </div>
        </div>
    );
}
