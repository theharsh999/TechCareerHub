// src/components/layout/Sidebar.jsx

import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Bell,
  Building2,
  FileText,
  AlertTriangle,
} from "lucide-react";

const SECTIONS = {
  tpo: [
    { to: "/tpo/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/tpo/students", label: "Students", icon: Users },
    { to: "/tpo/notifications", label: "Notifications", icon: Bell },
    { to: "/tpo/risk-alerts", label: "Risk Alerts", icon: AlertTriangle },
  ],
  company: [
    { to: "/company/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/company/opportunities", label: "Opportunities", icon: FileText },
    { to: "/company/applicants", label: "Applicants", icon: Users },
    { to: "/company/profile", label: "Profile", icon: Building2 },
  ],
};

export default function Sidebar() {
  const location = useLocation();
  const section = location.pathname.startsWith("/company") ? "company" : "tpo";
  const items = SECTIONS[section];

  return (
    <aside className="w-56 shrink-0 border-r border-border-subtle bg-bg-base px-3 py-4 hidden md:flex md:flex-col gap-1">
      {items.map((item, i) => (
        <Link
          key={item.label + i}
          to={item.to}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
            location.pathname === item.to
              ? "bg-primary/10 text-primary font-medium"
              : "text-text-muted hover:text-text-main hover:bg-bg-hover/50"
          }`}
        >
          <item.icon size={16} />
          {item.label}
        </Link>
      ))}
    </aside>
  );
}