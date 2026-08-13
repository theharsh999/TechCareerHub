// src/App.jsx
//
// Minimal routing so /tpo and /company are both reachable and linked via
// the Navbar switcher. Your real App.jsx likely adds auth-protected
// routes and role-based redirects — this is just enough to demo both
// dashboards side by side.

import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import TPODashboard from "./pages/tpo/TPODashboard";
import CompanyDashboard from "./pages/company/CompanyDashboard";

export default function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/tpo" replace />} />
        <Route path="/tpo" element={<TPODashboard />} />
        <Route path="/company" element={<CompanyDashboard />} />
        <Route path="*" element={<Navigate to="/tpo" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
