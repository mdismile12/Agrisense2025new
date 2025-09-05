import React, { useState } from "react";

const GOV_CREDENTIALS = {
  username: "govadmin",
  password: "GovPass@2024",
};

function GovernmentLogin({ onLogin }) {
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
    if (
      username === GOV_CREDENTIALS.username &&
      password === GOV_CREDENTIALS.password
    ) {
      onLogin({ username });
    } else {
      setError("Invalid government credentials.");
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
      <div className="d-flex justify-content-end mt-3">
        <button type="submit" className="btn btn-danger">Login</button>
      </div>
    </form>
  );
}
export default GovernmentLogin;
