import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const StudentNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/student/dashboard",
    },
    {
      name: "Opportunities",
      path: "/student/opportunities",
    },
    {
      name: "Applications",
      path: "/student/applications",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#080d19]/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">

        {/* Logo */}
        <button
          onClick={() => navigate("/student/dashboard")}
          className="text-xl font-bold text-white"
        >
          TechCareerHub
        </button>

        {/* Center Navigation */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    active
                      ? "bg-purple-600 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Profile */}
          <button
            onClick={() => navigate("/student/profile")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              location.pathname === "/student/profile"
                ? "bg-purple-600 text-white"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            Profile
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
