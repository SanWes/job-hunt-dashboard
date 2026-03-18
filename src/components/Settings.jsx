import React, { useState } from "react";
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import "../styles/Settings.css";

const Settings = ({ user }) => {
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isGuest = user?.email === "guest@theledger.com";

  const handleUsernameUpdate = async () => {
    if (newUsername.length < 3 || newUsername.length > 15) {
      setError("Username must be 3-15 characters long.");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(newUsername)) {
      setError("Username can only contain letters, numbers, and underscores.");
      return;
    }

    try {
      await updateProfile(user, { displayName: newUsername });
      setSuccess("Username updated successfully!");
      setIsEditingUsername(false);
      setNewUsername("");
      setError("");
    } catch (err) {
      setError("Error updating username: " + err.message);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please enter all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!/\d/.test(newPassword)) {
      setError("Password must contain at least one number.");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      setError("Password must contain at least one special character.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setSuccess("Password updated successfully!");
      setIsEditingPassword(false);
      setNewPassword("");
      setCurrentPassword("");
      setConfirmPassword("");
      setError("");
    } catch (err) {
      setError("Error updating password: " + err.message);
    }
  };

  // Only show settings for non-guest users
  if (isGuest) {
    return (
      <div className="settings-wrapper">
        <h2>Settings</h2>
        <div className="guest-notice">
          <p>Profile modifications restricted in Protocol Demo.</p>
        </div>
        
        <div className="settings-section">
          <h3>Username</h3>
          <div className="display-value">
            <span>{user?.displayName || "Guest"}</span>
            <button className="edit-btn" disabled>
              Change Username
            </button>
          </div>
        </div>
        
        <div className="settings-section">
          <h3>Password</h3>
          <div className="display-value">
            <span>••••••••••</span>
            <button className="edit-btn" disabled>
              Change Password
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-wrapper">
      <h2>Settings</h2>
      
      {!isGuest && (
        <div className="settings-section">
          <h3>Username</h3>
          {isEditingUsername ? (
            <div className="edit-form">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter new username"
                className="settings-input"
              />
              <div className="button-group">
                <button onClick={handleUsernameUpdate} className="save-btn">
                  Update Username
                </button>
                <button onClick={() => {
                  setIsEditingUsername(false);
                  setNewUsername("");
                  setError("");
                  setSuccess("");
                }} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="display-value">
              <span>{user?.displayName || "No username"}</span>
              <button onClick={() => setIsEditingUsername(true)} className="edit-btn">
                Change Username
              </button>
            </div>
          )}
        </div>
      )}

      {!isGuest && (
        <div className="settings-section">
          <h3>Password</h3>
          {isEditingPassword ? (
            <div className="edit-form">
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="settings-input"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="settings-input"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="settings-input"
              />
              <div className="button-group">
                <button onClick={handlePasswordUpdate} className="save-btn">
                  Update Password
                </button>
                <button onClick={() => {
                  setIsEditingPassword(false);
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setError("");
                  setSuccess("");
                }} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="display-value">
              <span>••••••••</span>
              <button onClick={() => setIsEditingPassword(true)} className="edit-btn">
                Change Password
              </button>
            </div>
          )}
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default Settings;
