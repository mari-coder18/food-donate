import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../auth/auth";

function ProtectedRoute({ children, allowedRole }) {
  const token = getToken();
  const role = getRole();

  // 🔥 IMPORTANT FIX: wait-safe check
  if (token === null || role === null) {
    return <Navigate to="/login" replace />;
  }

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  const normalizedRole = role.trim().toLowerCase();

  if (allowedRole) {
    const cleanAllowed = (Array.isArray(allowedRole)
      ? allowedRole
      : [allowedRole]
    ).map((r) => r.trim().toLowerCase());

    if (!cleanAllowed.includes(normalizedRole)) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;