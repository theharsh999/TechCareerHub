import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children, allowedRole }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base text-text-muted flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && profile?.role !== allowedRole) {
    return <Navigate to={`/${profile?.role}/dashboard`} replace />;
  }

  return children;
}

export default ProtectedRoute;