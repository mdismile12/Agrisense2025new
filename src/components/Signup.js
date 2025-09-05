import React, { useState } from "react";
import { getUsers, saveUsers, simpleHash } from "../utils/userUtils";

function Signup({ onSignup, userType, switchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const users = getUsers(userType);
    if (users.find((u) => u.username.toLowerCase() === username.toLowerCase())) {
      setError("Username already exists.");
      return;
    }
    const newUser = {
      username,
      password: simpleHash(password),
    };
    users.push(newUser);
    saveUsers(userType, users);
    setSuccess("Signup successful! You can now login.");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <div className="alert alert-danger py-1">{error}</div>}
      {success && <div className="alert alert-success py-1">{success}</div>}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button type="submit" className="btn btn-success">Signup</button>
        <button type="button" className="btn btn-link" onClick={switchToLogin}>
          Login
        </button>
      </div>
    </form>
  );
}
export default Signup;
