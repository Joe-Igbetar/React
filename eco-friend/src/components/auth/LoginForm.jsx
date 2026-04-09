import { useState } from "react";

function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const emailPattern = /^\S+@\S+\.\S+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 8 characters and include at least one letter and one number."
      );
      return;
    }

    const storedData = JSON.parse(localStorage.getItem("ecoUser"));

    if (!storedData) {
      setError("No account found. Please sign up first.");
      return;
    }

    const savedUsers = Array.isArray(storedData) ? storedData : [storedData];

    const matchedUser = savedUsers.find(
      (user) =>
        user.email?.toLowerCase().trim() === email.toLowerCase().trim() &&
        user.password === password
    );

    if (!matchedUser) {
      setError("Invalid email or password.");
      return;
    }

    setError("");
    localStorage.setItem("ecoCurrentUser", JSON.stringify(matchedUser));
    window.dispatchEvent(new Event("eco-auth-changed"));

    if (onSuccess) {
      onSuccess(matchedUser);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <p className="auth-subtext">
        Sign in to your Eco-Friend account to continue.
      </p>

      {error && <p className="form-error">{error}</p>}

      <div className="form-group full-width">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;