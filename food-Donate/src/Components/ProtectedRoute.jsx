import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../auth/auth";

function ProtectedRoute({ children, allowedRole }) {
  const token = getToken();
  const role = getRole();

  
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  // SAFE CHECK: 
  const normalizedRole = typeof role === "string" ? role.trim().toLowerCase() : "";

  if (allowedRole) {
    const cleanAllowed = (Array.isArray(allowedRole) ? allowedRole : [allowedRole])
      .map((r) => (typeof r === "string" ? r.trim().toLowerCase() : ""));

    
    if (!cleanAllowed.includes(normalizedRole)) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;