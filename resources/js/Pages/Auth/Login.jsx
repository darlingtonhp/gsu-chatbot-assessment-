import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (event) => {
        event.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Admin Login" />

            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Admin Sign In</p>
                <h2 className="mt-2 font-display text-3xl font-bold text-slate-900">Welcome back</h2>
                <p className="mt-2 text-sm text-slate-600">
                    Use your administrator credentials to access the SmartAssist management console.
                </p>
            </div>

            {status && (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={(event) => setData("email", event.target.value)}
                        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100"
                        placeholder="admin@gsu.ac.zw"
                        required
                    />
                    {errors.email && <p className="mt-1 text-xs font-semibold text-red-600">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(event) => setData("password", event.target.value)}
                        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100"
                        placeholder="••••••••"
                        required
                    />
                    {errors.password && <p className="mt-1 text-xs font-semibold text-red-600">{errors.password}</p>}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(event) => setData("remember", event.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-cyan-200"
                        />
                        Remember me
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm font-semibold text-slate-600 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-900"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                <button type="submit" disabled={processing} className="btn-brand w-full justify-center disabled:cursor-not-allowed disabled:opacity-60">
                    {processing ? "Signing in..." : "Sign In to Admin Console"}
                </button>
            </form>
        </GuestLayout>
    );
}
