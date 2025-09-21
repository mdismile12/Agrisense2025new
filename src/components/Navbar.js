import React from "react";
import "./Navbar.css";
import shieldLogo from "../assets/shield-logo.png";

const Navbar = ({ userType, onLogout }) => {
  // Premium color scheme matching the main app
  const COLORS = {
    primary: "#1b4332", // Deep forest green
    secondary: "#d4af37", // Gold accent
    tertiary: "#2d545e", // Deep teal
    light: "#f8f9fa", // Light background
    dark: "#212529", // Dark text
    cream: "#f5f5f0", // Cream background
  };

  return (
    <nav 
      className="navbar navbar-expand-lg" 
      style={{ 
        backgroundColor: COLORS.primary,
        padding: "0.8rem 1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderBottom: `2px solid ${COLORS.secondary}`
      }}
    >
      <div className="container-fluid">
        <div className="navbar-brand d-flex align-items-center" style={{ fontFamily: "'Georgia', serif" }}>
          <img 
            src={shieldLogo} 
            alt="Agrisense Shield Logo" 
            style={{ 
              height: "40px", 
              marginRight: "12px",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
            }} 
          />
          <span style={{ 
            color: COLORS.secondary, 
            fontSize: "1.5rem",
            fontWeight: "bold",
            letterSpacing: "1px"
          }}>
            Agrisense
          </span>
        </div>
        
        <div className="d-flex">
          {userType && (
            <button 
              className="btn d-flex align-items-center" 
              onClick={onLogout}
              style={{
                color: COLORS.secondary,
                border: `1px solid ${COLORS.secondary}`,
                borderRadius: "2rem",
                padding: "0.5rem 1.2rem",
                fontWeight: "500",
                letterSpacing: "0.5px",
                transition: "all 0.3s ease",
                background: "transparent"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = COLORS.secondary;
                e.target.style.color = COLORS.primary;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = COLORS.secondary;
              }}
            >
              <i className="fas fa-sign-out-alt me-2"></i>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;