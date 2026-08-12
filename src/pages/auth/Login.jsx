import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

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
        <div className="min-h-screen bg-[#0B0F19] text-slate-50 flex items-center justify-center p-6">
            <Card className="w-full max-w-md">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p className="text-slate-400 mt-1">
                        Login to your TechCareerHub account
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">

                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 outline-none focus:border-indigo-500"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-400">
                            {error}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>

                </form>

                <p className="text-sm text-slate-400 text-center mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-indigo-400 hover:text-indigo-300"
                    >
                        Create one
                    </Link>
                </p>

            </Card>
        </div>
    );
}

export default Login;