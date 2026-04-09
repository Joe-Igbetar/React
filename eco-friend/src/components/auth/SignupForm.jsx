import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const emailPattern = /^\S+@\S+\.\S+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (phone.length < 10) {
      setError("Phone number must be at least 10 digits.");
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

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("ecoUser")) || [];
    const usersArray = Array.isArray(users) ? users : [users];

    const existingUser = usersArray.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      setError("An account with this email already exists.");
      return;
    }

    const user = {
      id: `USER-${Date.now()}`,
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
      email,
      password,
      role: email.toLowerCase() === "babyjojo47@outlook.com" ? "admin" : "user",
    };

    const updatedUsers = [...usersArray, user];

    localStorage.setItem("ecoUser", JSON.stringify(updatedUsers));
    localStorage.setItem("ecoCurrentUser", JSON.stringify(user));

    setError("");
    console.log("User saved:", user);

    navigate("/account");
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <p className="auth-subtext">
        Create your Eco-Friend account and save your delivery details.
      </p>

      {error && <p className="form-error">{error}</p>}

      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label>Address</label>
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label>State</label>
        <input
          type="text"
          placeholder="Enter your state"
          value={state}
          onChange={(event) => setState(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          placeholder="08001234567"
          value={phone}
          onChange={(event) => setPhone(event.target.value.replace(/\D/g, ""))}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </div>

      <button type="submit">Create Account</button>
    </form>
  );
}

export default SignupForm;