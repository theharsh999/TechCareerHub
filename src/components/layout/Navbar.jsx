// src/components/layout/Navbar.jsx
//
// PLACEHOLDER — your real Navbar.jsx wasn't in the files I received.
// Includes a simple role switcher (TPO / Company) purely so both dashboards
// are reachable and "linked together" for demo purposes. Remove the
// switcher when merging into the real navbar (real app will route by
// authenticated user role instead).

import { useLocation, useNavigate } from "react-router-dom";
import { Briefcase, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="h-16 shrink-0 border-b border-slate-800/80 bg-[#0B0F19]/95 backdrop-blur flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
          <Briefcase size={18} />
        </div>
        <span className="text-white font-semibold text-sm">TechCareerHub</span>
      </div>

      <nav className="flex items-center gap-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </nav>
    </header>
  );
}
