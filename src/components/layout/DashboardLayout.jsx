// src/components/layout/DashboardLayout.jsx
//
// PLACEHOLDER — your real DashboardLayout.jsx wasn't in the files I
// received. Wraps Navbar + Sidebar + page content, matching what
// TPODashboard.jsx's header comment assumes routing already provides.

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
