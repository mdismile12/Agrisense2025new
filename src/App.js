import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// THIS FILE IS NOW A DIRECT TRANSLATION OF YOUR HTML FILE TO REACT
import Navbar from "./components/Navbar"; 
import VetPortal from "./components/VetPortal";
import ConsumerPortal from "./components/ConsumerPortal";
import GovPortal from "./components/GovPortal";
import GovernmentLogin from "./components/GovernmentLogin";
import Signup from "./components/Signup";
import Login from "./components/Login";

// LocalStorage keys
const LS_KEYS = {
  vets: 'Agrisense_vets',
  consumers: 'Agrisense_consumers',
  vetSession: 'Agrisense_vet_session',
  consumerSession: 'Agrisense_consumer_session',
  governmentSession: 'Agrisense_gov_session',
};
// GOV_CREDENTIALS is defined in GovernmentLogin.js only

function App() {
  const [userType, setUserType] = useState(null); // 'vet', 'consumer', 'government', or null
  const [user, setUser] = useState(null); // Used for session persistence
  const [authView, setAuthView] = useState("login"); // 'login' or 'signup' or 'government-login'
  const [authUserType, setAuthUserType] = useState("vets"); // 'vets' or 'consumers'

  useEffect(() => {
    const vetSession = localStorage.getItem(LS_KEYS.vetSession);
    const consumerSession = localStorage.getItem(LS_KEYS.consumerSession);
    const govSession = localStorage.getItem(LS_KEYS.governmentSession);
    if (vetSession) {
      setUserType("vet");
      setUser(JSON.parse(vetSession));
    } else if (consumerSession) {
      setUserType("consumer");
      setUser(JSON.parse(consumerSession));
    } else if (govSession) {
      setUserType("government");
      setUser(JSON.parse(govSession));
    }
  }, []);

  function handleVetLogin(user) {
    setUserType("vet");
    setUser(user);
    localStorage.setItem(LS_KEYS.vetSession, JSON.stringify(user));
  }
  function handleConsumerLogin(user) {
    setUserType("consumer");
    setUser(user);
    localStorage.setItem(LS_KEYS.consumerSession, JSON.stringify(user));
  }
  function handleGovernmentLogin(user) {
    setUserType("government");
    setUser(user);
    localStorage.setItem(LS_KEYS.governmentSession, JSON.stringify(user));
  }
  function logout() {
    setUserType(null);
    setUser(null);
    localStorage.removeItem(LS_KEYS.vetSession);
    localStorage.removeItem(LS_KEYS.consumerSession);
    localStorage.removeItem(LS_KEYS.governmentSession);
  }
  function switchToSignup() {
    setAuthView("signup");
  }
  function switchToLogin() {
    setAuthView("login");
  }
  function switchUserType(type) {
    setAuthUserType(type);
    setAuthView("login");
  }

  // Render logic
  if (userType === "vet") {
    return (
      <>
        <Navbar userType="vet" onLogout={logout} />
        <main className="container py-4">
          <VetPortal />
        </main>
        <footer className="bg-white border-top py-3 text-center text-muted mt-auto">
          © 2025 Agrisense. All rights reserved.
        </footer>
      </>
    );
  }
  if (userType === "consumer") {
    return (
      <>
        <Navbar userType="consumer" onLogout={logout} />
        <main className="container py-4">
          <ConsumerPortal />
        </main>
        <footer className="bg-white border-top py-3 text-center text-muted mt-auto">
          © 2025 Agrisense. All rights reserved.
        </footer>
      </>
    );
  }
  if (userType === "government") {
    return (
      <>
        <Navbar userType="government" onLogout={logout} />
        <main className="container py-4">
          <GovPortal />
        </main>
        <footer className="bg-white border-top py-3 text-center text-muted mt-auto">
          © 2025 Agrisense. All rights reserved.
        </footer>
      </>
    );
  }
  // Not logged in: show combined auth page with user type tabs and login/signup toggle
  return (
    <>
      <Navbar userType={null} onLogout={logout} />
      <main className="container py-4">
        <div className="mx-auto bg-white rounded shadow p-4" style={{ maxWidth: 400 }}>
          <h1 className="text-3xl fw-bold text-center mb-4 text-primary">Agrisense Portal</h1>
          <div className="d-flex justify-content-center mb-4 gap-2">
            <button
              onClick={() => switchUserType("vets")}
              className={`btn ${authUserType === "vets" ? "btn-primary" : "btn-outline-primary"}`}
              aria-pressed={authUserType === "vets"}
            >
              Veterinarian
            </button>
            <button
              onClick={() => switchUserType("consumers")}
              className={`btn ${authUserType === "consumers" ? "btn-info text-white" : "btn-outline-info"}`}
              aria-pressed={authUserType === "consumers"}
            >
              Consumer
            </button>
            <button
              onClick={() => setAuthView("government-login")}
              className={`btn ${authView === "government-login" ? "btn-danger" : "btn-outline-danger"}`}
              aria-pressed={authView === "government-login"}
            >
              Government
            </button>
          </div>
          {authView === "government-login" ? (
            <GovernmentLogin onLogin={handleGovernmentLogin} />
          ) : authView === "signup" ? (
            <Signup
              onSignup={authUserType === "vets" ? handleVetLogin : handleConsumerLogin}
              userType={authUserType}
              switchToLogin={switchToLogin}
            />
          ) : (
            <Login
              onLogin={authUserType === "vets" ? handleVetLogin : handleConsumerLogin}
              userType={authUserType}
              switchToSignup={switchToSignup}
            />
          )}
        </div>
      </main>
      <footer className="bg-white border-top py-3 text-center text-muted mt-auto">
        © 2025 Agrisense. All rights reserved.
      </footer>
    </>
  );
}
export default App;