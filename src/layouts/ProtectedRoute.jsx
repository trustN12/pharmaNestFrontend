import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = user.type?.trim().toLowerCase();

  // if admin page but user is not admin
  if (adminOnly && role !== "admin") {
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;