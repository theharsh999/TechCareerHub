import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          role: form.role,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      setMessage(
        "Account created successfully! Please check your email to verify your account."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-slate-400 mt-1">
            Join TechCareerHub
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 outline-none focus:border-indigo-500"
            />
          </div>

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
              placeholder="harsh@gamil.com"
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
              minLength={6}
              placeholder="Minimum 6 characters"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              I am a
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 outline-none focus:border-indigo-500"
            >
              <option value="student">Student</option>
              <option value="company">Company</option>
              <option value="tpo">TPO</option>
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          {message && (
            <p className="text-sm text-green-400">
              {message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

        </form>

        <p className="text-sm text-slate-400 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Signup;