import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import Opportunities from "./pages/student/Opportunities";
import OpportunityDetails from "./pages/student/OpportunityDetails";

import CompanyDashboard from "./pages/company/CompanyDashboard";

import TPODashboard from "./pages/tpo/TPODashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Student */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
          <Route
            path="/student/profile"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentProfile />
              </ProtectedRoute>
            } />
          <Route
            path="/student/opportunities"
            element={
              <ProtectedRoute allowedRole="student">
                <Opportunities />
              </ProtectedRoute>
            } />
          <Route
            path="/student/opportunities/:id"
            element={
              <ProtectedRoute allowedRole="student">
                <OpportunityDetails />
              </ProtectedRoute>
            } />

          {/* Company */}
          <Route
            path="/company/dashboard"
            element={
              <ProtectedRoute allowedRole="company">
                <CompanyDashboard />
              </ProtectedRoute>
            } />

          {/* TPO */}
          <Route
            path="/tpo/dashboard"
            element={
              <ProtectedRoute allowedRole="tpo">
                <TPODashboard />
              </ProtectedRoute>
            } />

          {/* Default */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;