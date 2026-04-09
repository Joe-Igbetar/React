import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;