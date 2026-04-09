import { Navigate, useLocation } from "react-router-dom";

function AuthRedirect({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));
  const location = useLocation();

  if (currentUser) {
    const redirectTo = location.state?.from || "/";

    if (currentUser.role === "admin") {
      return <Navigate to="/" replace />;
    }

    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export default AuthRedirect;