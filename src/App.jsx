import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import Opportunities from "./pages/student/Opportunities";
import OpportunityDetails from "./pages/student/OpportunityDetails";

import CompanyDashboard from "./pages/company/CompanyDashboard";

import TPODashboard from "./pages/tpo/TPODashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Student */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/opportunities" element={<Opportunities />} />
        <Route
          path="/student/opportunities/:id"
          element={<OpportunityDetails />}
        />

        {/* Company */}
        <Route path="/company/dashboard" element={<CompanyDashboard />} />

        {/* TPO */}
        <Route path="/tpo/dashboard" element={<TPODashboard />} />

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;