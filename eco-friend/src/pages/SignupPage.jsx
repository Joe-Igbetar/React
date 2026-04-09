import { Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import AuthCard from "../components/auth/AuthCard";
import SignupForm from "../components/auth/SignupForm";

function SignupPage() {
  return (
    <AppLayout>
      <AuthCard>
        <SignupForm />
        <p className="auth-switch-text">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </AuthCard>
    </AppLayout>
  );
}

export default SignupPage;