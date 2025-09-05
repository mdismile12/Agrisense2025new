import React, { useState } from "react";
import { LS_KEYS } from "../utils/localStorageKeys";
import { simpleHash, getUsers } from "../utils/userUtils";

function Login({ onLogin, userType, switchToSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!username.trim() || !password.trim()) {
      setError("Please fill all fields.");
      return;
    }
    const users = getUsers(userType);
    const hashedPass = simpleHash(password);
    const user = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === hashedPass
    );
    if (user) {
      onLogin(user);
    } else {
      setError("Invalid credentials or user not found.");
    }
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
      {error && <div className="alert alert-danger py-1">{error}</div>}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button type="submit" className="btn btn-primary">Login</button>
        <button type="button" className="btn btn-link" onClick={switchToSignup}>
          Signup
        </button>
      </div>
    </form>
  );
}
export default Login;
