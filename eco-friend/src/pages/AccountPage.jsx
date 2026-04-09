import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";

function AccountPage() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName || "");
      setLastName(currentUser.lastName || "");
      setPhone(currentUser.phone || "");
      setAddress(currentUser.address || "");
      setCity(currentUser.city || "");
      setState(currentUser.state || "");
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const roleLabel =
    currentUser.role === "admin" ? "Administrator" : "Customer";

  function handleSaveProfile(event) {
    event.preventDefault();

    const updatedUser = {
      ...currentUser,
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
    };

    localStorage.setItem("ecoCurrentUser", JSON.stringify(updatedUser));

    const storedUsers = JSON.parse(localStorage.getItem("ecoUser")) || [];
    const usersArray = Array.isArray(storedUsers) ? storedUsers : [storedUsers];

    const updatedUsers = usersArray.map((user) =>
      user.email === currentUser.email ? updatedUser : user
    );

    localStorage.setItem("ecoUser", JSON.stringify(updatedUsers));

    setMessage("Profile updated successfully.");
    setIsEditing(false);
  }

  function handleCancelEdit() {
    setFirstName(currentUser.firstName || "");
    setLastName(currentUser.lastName || "");
    setPhone(currentUser.phone || "");
    setAddress(currentUser.address || "");
    setCity(currentUser.city || "");
    setState(currentUser.state || "");
    setMessage("");
    setIsEditing(false);
  }

  function handleDeleteAccount() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    const storedUsers = JSON.parse(localStorage.getItem("ecoUser")) || [];
    const usersArray = Array.isArray(storedUsers) ? storedUsers : [storedUsers];

    const updatedUsers = usersArray.filter(
      (user) => user.email !== currentUser.email
    );

    localStorage.setItem("ecoUser", JSON.stringify(updatedUsers));
    localStorage.removeItem("ecoCurrentUser");

    navigate("/");
    window.location.reload();
  }

  function handleLogout() {
    localStorage.removeItem("ecoCurrentUser");
    navigate("/");
    window.location.reload();
  }

  function handleChangePassword(event) {
    event.preventDefault();

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    setPasswordError("");
    setPasswordMessage("");

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError("Please fill in all password fields.");
      return;
    }

    if (currentPassword !== currentUser.password) {
      setPasswordError("Current password is incorrect.");
      return;
    }

    if (!passwordPattern.test(newPassword)) {
      setPasswordError(
        "New password must be at least 8 characters and include at least one letter and one number."
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    const updatedUser = {
      ...currentUser,
      password: newPassword,
    };

    localStorage.setItem("ecoCurrentUser", JSON.stringify(updatedUser));

    const storedUsers = JSON.parse(localStorage.getItem("ecoUser")) || [];
    const usersArray = Array.isArray(storedUsers) ? storedUsers : [storedUsers];

    const updatedUsers = usersArray.map((user) =>
      user.email === currentUser.email ? updatedUser : user
    );

    localStorage.setItem("ecoUser", JSON.stringify(updatedUsers));

    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordMessage("Password changed successfully.");
  }

  function handleDeleteAccount(event) {
    event.preventDefault();

    setDeleteError("");

    if (!deletePassword) {
      setDeleteError("Please enter your password to delete your account.");
      return;
    }

    if (deletePassword !== currentUser.password) {
      setDeleteError("Password is incorrect.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    const storedUsers = JSON.parse(localStorage.getItem("ecoUser")) || [];
    const usersArray = Array.isArray(storedUsers) ? storedUsers : [storedUsers];

    const updatedUsers = usersArray.filter(
      (user) => user.email !== currentUser.email
    );

    localStorage.setItem("ecoUser", JSON.stringify(updatedUsers));
    localStorage.removeItem("ecoCurrentUser");

    navigate("/");
    window.location.reload();
  }

  return (
    <AppLayout>
      <div className="account-page">
        <div className="account-header">
          <div>
            <h1>My Account</h1>
            <p>Welcome back, {currentUser.firstName || "User"}.</p>
          </div>

          <span className="account-role-badge">{roleLabel}</span>
        </div>

        {message && <p className="account-success-message">{message}</p>}

        <div className="account-layout">
          <section className="account-card">
            <div className="account-card-header">
              <h2>Profile Information</h2>

              {!isEditing && (
                <button
                  type="button"
                  className="account-edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="account-form">
              <div className="account-info-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={currentUser.email || ""} disabled />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="account-form-actions">
                  <button type="submit" className="account-save-btn">
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="account-cancel-btn"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </section>

          <section className="account-card">
            <h2>Security</h2>

            <form className="account-password-form" onSubmit={handleChangePassword}>
              {passwordError && <p className="account-password-error">{passwordError}</p>}
              {passwordMessage && (
                <p className="account-password-success">{passwordMessage}</p>
              )}

              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>

              <button type="submit" className="account-save-btn">
                Change Password
              </button>
            </form>
          </section>
        </div>

        <section className="account-card">
          <h2>Quick Actions</h2>

          <div className="account-actions">
            {currentUser.role !== "admin" && (
              <Link to="/orders" className="account-action-btn">
                View My Orders
              </Link>
            )}

            <Link to="/cart" className="account-action-btn">
              View Cart
            </Link>

            <Link to="/shop" className="account-action-btn">
              Continue Shopping
            </Link>

            {currentUser.role === "admin" && (
              <Link to="/admin/orders" className="account-action-btn admin">
                Open Admin Dashboard
              </Link>
            )}

            <button
              type="button"
              className="account-action-btn logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </section>

        <section className="account-card danger-zone">
          <h2>Danger Zone</h2>
          <p className="danger-zone-text">
            Enter your password to permanently delete your account.
          </p>

          <form className="delete-account-form" onSubmit={handleDeleteAccount}>
            {deleteError && <p className="account-password-error">{deleteError}</p>}

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="delete-account-btn">
              Delete My Account
            </button>
          </form>
        </section>
      </div>
    </AppLayout>
  );
}

export default AccountPage;