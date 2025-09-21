import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Navbar from "./components/Navbar";
import VetPortal from "./components/VetPortal";
import ConsumerPortal from "./components/ConsumerPortal";
import GovPortal from "./components/GovPortal";

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Premium color scheme
const COLORS = {
  primary: "#1b4332", // Deep forest green
  secondary: "#d4af37", // Gold accent
  tertiary: "#2d545e", // Deep teal
  light: "#f8f9fa", // Light background
  dark: "#212529", // Dark text
  cream: "#f5f5f0", // Cream background
  parchment: "#f8f6f0", // Parchment paper color
};

// SVG Icons for each portal
const VetIcon = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill={color}>
    <path d="M19.5 3.09L15 7.59V4h-2v4.59l-3-3-3 3V4H5v4.59L.5 3.09 3.09.5 7.59 5H10v2H7.59l-3-3-3 3 3 3 3-3V10h2V7.59l3 3 3-3V10h2V7.59l3.91-3.91-3.41-3.5zM3.91 19.5l3-3H10v2H7.59l-3 3-3-3 3-3H5v-2h2.59l3 3 3-3H13v2h2.59l3 3-3 3-3-3V17h-2v2.59l-3 3z"/>
    <path d="M12 12h-2v2H8v2h2v2h2v-2h2v-2h-2v-2z"/>
  </svg>
);

const ConsumerIcon = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill={color}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.47c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
  </svg>
);

const GovernmentIcon = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill={color}>
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
  </svg>
);

// Extra portal content styles
const portalContentStyles = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');

.portal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 60vh;
  width: 100%;
  animation: fadeIn 0.8s ease-in-out;
  background: ${COLORS.parchment};
  padding: 2rem 0;
}
.portal-inner {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  background: #fffefc;
  border-radius: 1rem;
  box-shadow: 0 12px 40px rgba(0,0,0,0.1);
  padding: 3rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;
}
.portal-inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary}, ${COLORS.tertiary});
}
.back-btn {
  align-self: flex-start;
  font-weight: 600;
  border-radius: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  letter-spacing: 0.8px;
  color: ${COLORS.primary};
  border: 1px solid ${COLORS.primary};
  background: #fefefc;
  padding: 0.7rem 1.8rem;
  margin-bottom: 2rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  position: relative;
  overflow: hidden;
}
.back-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
  transition: left 0.7s ease;
}
.back-btn:hover {
  background: ${COLORS.primary};
  color: ${COLORS.secondary};
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
}
.back-btn:hover::before {
  left: 100%;
}
.map-container {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0,0,0,0.15);
  height: 500px;
  width: 100%;
  max-width: 1000px;
  margin: auto;
  border: 1px solid rgba(0,0,0,0.08);
}
.portal-card {
  transition: all 0.4s ease;
  border-radius: 1rem;
  overflow: hidden;
  border: none;
  background: linear-gradient(145deg, #ffffff, #f5f5f0);
  box-shadow: 0 8px 24px rgba(0,0,0,0.09);
  height: 100%;
  position: relative;
}
.portal-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary});
  opacity: 0;
  transition: opacity 0.3s ease;
}
.portal-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 36px rgba(0,0,0,0.12);
}
.portal-card:hover::before {
  opacity: 1;
}
.portal-card .card-body {
  padding: 2.5rem 2rem;
}
.portal-vet {
  border-top: 4px solid ${COLORS.primary};
}
.portal-consumer {
  border-top: 4px solid ${COLORS.tertiary};
}
.portal-government {
  border-top: 4px solid #4b2e83;
}
.fade-in {
  animation: fadeIn 1s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.leaflet-popup-content-wrapper {
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}
.leaflet-popup-content {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  text-align: center;
}
`;

if (typeof window !== "undefined" && !document.getElementById("portal-content-styles")) {
  const style = document.createElement("style");
  style.id = "portal-content-styles";
  style.innerHTML = portalContentStyles;
  document.head.appendChild(style);
}

function App() {
  const [portal, setPortal] = useState(null);

  const livestockLocations = [
    { lat: 26.8467, lng: 80.9462, title: "Uttar Pradesh" },
    { lat: 23.0225, lng: 72.5714, title: "Gujarat" },
    { lat: 20.5937, lng: 78.9629, title: "Maharashtra" },
    { lat: 10.7905, lng: 78.6569, title: "Tamil Nadu" },
    { lat: 29.0588, lng: 75.8573, title: "Haryana" },
  ];

  return (
    <>
      <Navbar userType={portal} onLogout={() => setPortal(null)} />

      <main className="container py-4" style={{ backgroundColor: COLORS.parchment, minHeight: "100vh" }}>
        {!portal ? (
          <>
            <div className="row justify-content-center g-4 fade-in">
              <div className="col-12 mb-4 text-center py-5">
                <h1 className="fw-bold mb-3" style={{ 
                  color: COLORS.primary, 
                  letterSpacing: "3px",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "3rem",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
                }}>
                  Agrisense Portal
                </h1>
                <p className="mb-4" style={{ 
                  fontSize: "1.3rem", 
                  fontStyle: "italic",
                  color: COLORS.tertiary,
                  fontFamily: "'Cormorant Garamond', serif"
                }}>
                Livestock management and traceability platform
                </p>
              </div>

              {/* Portal Cards */}
              {[
                {
                  type: "vet",
                  icon: <VetIcon color={COLORS.primary} />,
                  color: COLORS.primary,
                  title: "Veterinarian Portal",
                  description: "Smart e-prescriptions, AI support, health history, and tele-vet services.",
                },
                {
                  type: "consumer",
                  icon: <ConsumerIcon color={COLORS.tertiary} />,
                  color: COLORS.tertiary,
                  title: "Consumer Portal",
                  description: "QR verification, traceability, and product safety for consumers/exporters.",
                },
                {
                  type: "government",
                  icon: <GovernmentIcon color="#4b2e83" />,
                  color: "#4b2e83",
                  title: "Government Portal",
                  description: "Heatmaps, MRL gatekeeping, fraud detection, and digital audit tools.",
                },
              ].map((p) => (
                <div className="col-12 col-md-4 mb-4" key={p.type}>
                  <div
                    className={`portal-card card h-100 text-center portal-${p.type}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setPortal(p.type)}
                  >
                    <div className="card-body d-flex flex-column align-items-center justify-content-center">
                      <div className="icon-container mb-4" style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(135deg, ${p.color}20, ${p.color}40)`,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease"
                      }}>
                        {p.icon}
                      </div>
                      <h5 className="card-title fw-bold mb-3" style={{ 
                        color: p.color,
                        fontFamily: "'Cinzel', serif",
                        fontSize: "1.4rem"
                      }}>
                        {p.title}
                      </h5>
                      <p className="card-text" style={{ 
                        color: "#555",
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.1rem",
                        lineHeight: "1.6"
                      }}>
                        {p.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Section */}
            <div className="mt-5 text-center py-5">
              <h2 className="fw-bold mb-4" style={{ 
                color: COLORS.primary, 
                fontFamily: "'Cinzel', serif",
                fontSize: "2.2rem",
                letterSpacing: "1.5px"
              }}>
                Livestock Farming Locations in India
              </h2>
              <p className="mb-4" style={{
                color: COLORS.tertiary,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.2rem",
                maxWidth: "800px",
                margin: "0 auto"
              }}>
                Explore the major livestock farming regions across India with our interactive map
              </p>
              <MapContainer center={[22.5937, 78.9629]} zoom={5} className="map-container">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {livestockLocations.map((loc, idx) => (
                  <Marker key={idx} position={[loc.lat, loc.lng]}>
                    <Popup>{loc.title}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </>
        ) : (
          <div className="portal-content fade-in">
            <button className="btn mb-4 back-btn" onClick={() => setPortal(null)}>
              <span className="fas fa-arrow-left me-2"></span>Back to Main Screen
            </button>
            <div className="portal-inner">
              {portal === "vet" && <VetPortal />}
              {portal === "consumer" && <ConsumerPortal />}
              {portal === "government" && <GovPortal />}
            </div>
          </div>
        )}
      </main>

      <footer className="py-4 text-center mt-auto" style={{ 
        backgroundColor: COLORS.primary, 
        color: COLORS.secondary,
        fontFamily: "'Cinzel', serif",
        borderTop: `3px solid ${COLORS.secondary}`
      }}>
        <div className="container">
          <p className="mb-1" style={{ fontSize: "1.1rem" }}>© 2025 Agrisense. All rights reserved.</p>
          <p className="mb-0 small" style={{ opacity: 0.9, fontFamily: "'Cormorant Garamond', serif" }}>
            Premium livestock management platform
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;