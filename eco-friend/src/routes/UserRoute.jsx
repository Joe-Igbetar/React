import { Navigate } from "react-router-dom";

function UserRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role === "admin") {
    return <Navigate to="/admin/orders" replace />;
  }

  return children;
}

export default UserRoute;