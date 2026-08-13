// src/components/layout/Navbar.jsx
//
// PLACEHOLDER — your real Navbar.jsx wasn't in the files I received.
// Includes a simple role switcher (TPO / Company) purely so both dashboards
// are reachable and "linked together" for demo purposes. Remove the
// switcher when merging into the real navbar (real app will route by
// authenticated user role instead).

import { Link, useLocation } from "react-router-dom";
import { Briefcase } from "lucide-react";

const LINKS = [
  { to: "/tpo", label: "TPO" },
  { to: "/company", label: "Company" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="h-16 shrink-0 border-b border-slate-800/80 bg-[#0B0F19]/95 backdrop-blur flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
          <Briefcase size={18} />
        </div>
        <span className="text-white font-semibold text-sm">TechCareerHub</span>
      </div>

      <nav className="flex items-center gap-1 bg-slate-900/60 border border-slate-800 rounded-lg p-1">
        {LINKS.map((link) => {
          const active = location.pathname.startsWith(link.to);
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                active
                  ? "bg-primary text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
