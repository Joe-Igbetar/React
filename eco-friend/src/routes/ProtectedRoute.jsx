import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));
  const location = useLocation();

  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

export default ProtectedRoute;