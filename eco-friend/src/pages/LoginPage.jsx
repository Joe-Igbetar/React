import { Link, useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import AuthCard from "../components/auth/AuthCard";
import LoginForm from "../components/auth/LoginForm";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const redirectTo = location.state?.from || "/";

  function handleLoginSuccess(user) {
    if (user.role === "admin") {
      navigate("/", { replace: true });
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  return (
    <AppLayout>
      <AuthCard>
        <LoginForm onSuccess={handleLoginSuccess} />
        <p className="auth-switch-text">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </AuthCard>
    </AppLayout>
  );
}

export default LoginPage;