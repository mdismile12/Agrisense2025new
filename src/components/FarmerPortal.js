import React, { useState } from "react";

function FarmerVoiceLogging() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callStatus, setCallStatus] = useState(null);
  function simulateCall() {
    if (!phoneNumber.match(/^\d{10}$/)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    setCallStatus("Calling...");
    setTimeout(() => {
      setCallStatus("Call connected. Your treatment data has been logged via IVR.");
    }, 2000);
  }
  return (
    <div className="card h-100 p-3 text-center">
      <img
        src="https://storage.googleapis.com/a1aa/image/f9fcc9fd-e193-4dc9-de8e-8fa0825e9759.jpg"
        alt="Farmer making a voice call"
        className="mb-3 rounded mx-auto"
        width="120"
        height="120"
      />
      <h5 className="fw-bold mb-2">Voice-First Data Logging (IVR)</h5>
      <p className="text-muted small">Log treatments by making a phone call in your local language. No smartphone needed.</p>
      <input
        type="tel"
        placeholder="Enter your phone number"
        className="form-control my-2 text-center"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
      />
      <button className="btn btn-primary w-100" onClick={simulateCall}>Simulate IVR Call</button>
      {callStatus && <div className="mt-2 text-primary fw-bold">{callStatus}</div>}
    </div>
  );
}

function FarmerRealTimeAlerts() {
  const [alerts] = useState([
    { id: 1, message: "🐄 Cow #102's milk is unsafe until September 10th. Do not sell.", date: "2024-09-01", type: "SMS" },
    { id: 2, message: "🐄 Cow #205's milk withdrawal period ends on September 15th.", date: "2024-09-05", type: "WhatsApp Voice" },
  ]);
  return (
    <div className="card h-100 p-3 text-center">
      <img
        src="https://storage.googleapis.com/a1aa/image/4fad3a0a-9409-46c3-2904-26065597cab4.jpg"
        alt="Mobile phone receiving alerts"
        className="mb-3 rounded mx-auto"
        width="120"
        height="120"
      />
      <h5 className="fw-bold mb-2">Real-time Alerts</h5>
      <p className="text-muted small mb-2">Receive SMS and WhatsApp voice alerts about withdrawal periods and milk safety.</p>
      <ul className="list-group small text-start mx-auto" style={{ maxWidth: 250 }}>
        {alerts.map(alert => (
          <li key={alert.id} className="list-group-item d-flex flex-column align-items-start">
            <span className="fw-bold">{alert.type}:</span> {alert.message}
            <span className="text-muted small">{alert.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FarmerIncentives() {
  const [badges] = useState([
    { id: 1, title: "Residue-Free Champion", date: "2024-05-01" },
    { id: 2, title: "Best Compliance April 2024", date: "2024-04-30" },
  ]);
  return (
    <div className="card h-100 p-3 text-center">
      <img
        src="https://storage.googleapis.com/a1aa/image/3b988118-4be7-4776-94b5-8974893b197e.jpg"
        alt="Farmer receiving badge"
        className="mb-3 rounded mx-auto"
        width="120"
        height="120"
      />
      <h5 className="fw-bold mb-2">Incentives & Gamification</h5>
      <p className="text-muted small mb-2">Earn badges and bonuses for consistent compliance and residue-free milk production.</p>
      <ul className="list-group small text-start mx-auto" style={{ maxWidth: 250 }}>
        {badges.map(badge => (
          <li key={badge.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{badge.title}</span>
            <span className="badge bg-primary rounded-pill">{badge.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FarmerPortal() {
  const [showLogin, setShowLogin] = useState(true);
  const [form, setForm] = useState({ phone: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleLogin(e) {
    e.preventDefault();
    setLoggedIn(true);
  }
  function handleSignup(e) {
    e.preventDefault();
    setLoggedIn(true);
  }

  if (!loggedIn) {
    return (
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <h2 className="mb-3 text-primary">Farmer Portal</h2>
        <div className="card p-4">
          <div className="mb-3 d-flex justify-content-center">
            <button className={`btn btn-link ${showLogin ? 'fw-bold' : ''}`} onClick={() => setShowLogin(true)}>Login</button>
            <span className="mx-2">|</span>
            <button className={`btn btn-link ${!showLogin ? 'fw-bold' : ''}`} onClick={() => setShowLogin(false)}>Sign Up</button>
          </div>
          <form onSubmit={showLogin ? handleLogin : handleSignup}>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input name="phone" className="form-control" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input name="password" type="password" className="form-control" value={form.password} onChange={handleChange} required />
            </div>
            <button className="btn btn-primary w-100" type="submit">{showLogin ? 'Login' : 'Sign Up'}</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary">Farmer Portal</h2>
      <div className="alert alert-success">Logged in as Farmer!</div>
      <div className="row g-4">
        <div className="col-12 col-md-4">
          <FarmerVoiceLogging />
        </div>
        <div className="col-12 col-md-4">
          <FarmerRealTimeAlerts />
        </div>
        <div className="col-12 col-md-4">
          <FarmerIncentives />
        </div>
      </div>
    </div>
  );
}

export default FarmerPortal;
