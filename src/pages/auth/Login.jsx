import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        const { data, error } = await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        const user = data.user;

        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (profileError) {
            console.log("PROFILE ERROR:", profileError);
            setError(profileError.message);
            setLoading(false);
            return;
        }

        if (profile.role === "student") {
            navigate("/student/dashboard");
        } else if (profile.role === "company") {
            navigate("/company/dashboard");
        } else if (profile.role === "tpo") {
            navigate("/tpo/dashboard");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-[420px] relative z-10">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-text-main tracking-tight mb-2">Welcome back</h1>
                    <p className="text-text-muted text-sm">
                        Sign in to your TechCareerHub account
                    </p>
                </div>

                {/* Card Container */}
                <div className="bg-bg-card backdrop-blur-xl border border-border-subtle shadow-2xl rounded-2xl p-6 sm:p-8">
                    <form onSubmit={handleLogin} className="space-y-5">
                        
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1.5">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                placeholder="you@example.com"
                                className="w-full rounded-xl border border-border-subtle bg-bg-base px-4 py-3 text-text-main placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-medium text-text-muted">
                                    Password
                                </label>
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-border-subtle bg-bg-base px-4 py-3 text-text-main placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                <p className="text-sm text-red-400 text-center font-medium">
                                    {error}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/25 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-text-muted">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors underline decoration-indigo-400/30 underline-offset-4"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;