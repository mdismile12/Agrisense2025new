import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import VetPortal from "./components/VetPortal";
import ConsumerPortal from "./components/ConsumerPortal";
import GovPortal from "./components/GovPortal";

// Extra modern styles for portal content and back button
const portalContentStyles = `
.portal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 60vh;
  width: 100%;
  animation: fadeIn 0.7s;
}
.portal-inner {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  padding: 2rem 1rem 2rem 1rem;
  margin-bottom: 2rem;
}
.back-btn {
  align-self: flex-start;
  font-weight: 600;
  border-radius: 2rem;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.07);
  transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s;
  letter-spacing: 0.5px;
}
.back-btn:hover {
  background: #e9ecef;
  color: #007bff;
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 4px 16px 0 rgba(0,0,0,0.13);
}
`;

// Inject extra styles for portal content and back button
if (typeof window !== 'undefined') {
  if (!document.getElementById('portal-content-styles')) {
    const style = document.createElement('style');
    style.id = 'portal-content-styles';
    style.innerHTML = portalContentStyles;
    document.head.appendChild(style);
  }
}


// Modern portal switcher styles and animation
const portalCardStyles = `
.portal-card {
  transition: transform 0.25s cubic-bezier(.4,2,.3,1), box-shadow 0.25s;
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  background: linear-gradient(135deg, #f8fafc 60%, #e9ecef 100%);
}
.portal-card:hover {
  transform: translateY(-8px) scale(1.04) rotate(-1deg);
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.15);
  z-index: 2;
}
.animate-portal {
  animation: portalPop 0.7s cubic-bezier(.4,2,.3,1);
}
@keyframes portalPop {
  0% { opacity: 0; transform: scale(0.8) translateY(40px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
.animated-fadein {
  animation: fadeIn 0.7s;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;
function App() {
  // Inject modern styles for portal switcher
  React.useEffect(() => {
    if (!document.getElementById('portal-card-styles')) {
      const style = document.createElement('style');
      style.id = 'portal-card-styles';
      style.innerHTML = portalCardStyles;
      document.head.appendChild(style);
    }
  }, []);
  const [portal, setPortal] = useState(null); // null, 'vet', 'consumer', 'government'
  // On first load, show government heatmap (default)
  // On first load, show portal switcher (no portal selected)
  // Render logic
  return (
    <>
      <Navbar userType={portal} onLogout={() => setPortal(null)} />
      <main className="container py-4">
        {!portal && (
          <div className="row justify-content-center g-4 animated-fadein">
            <div className="col-12 mb-4 text-center">
              <h1 className="fw-bold text-primary mb-4" style={{letterSpacing: '2px'}}>Agrisense Portal</h1>
              <p className="text-secondary mb-4">Choose a portal to explore features:</p>
            </div>
            <div className="col-12 col-md-4">
              <div className="portal-card card shadow-lg border-0 h-100 text-center portal-vet animate-portal" style={{cursor:'pointer'}} onClick={() => setPortal('vet')}>
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <i className="fas fa-user-md fa-3x mb-3" style={{color:'#28a745'}}></i>
                  <h5 className="card-title fw-bold mb-2">Veterinarian Portal</h5>
                  <p className="card-text text-muted">Smart e-prescriptions, AI support, health history, and tele-vet services.</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="portal-card card shadow-lg border-0 h-100 text-center portal-consumer animate-portal" style={{cursor:'pointer'}} onClick={() => setPortal('consumer')}>
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <i className="fas fa-shopping-cart fa-3x mb-3" style={{color:'#007bff'}}></i>
                  <h5 className="card-title fw-bold mb-2">Consumer Portal</h5>
                  <p className="card-text text-muted">QR verification, traceability, and product safety for consumers/exporters.</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="portal-card card shadow-lg border-0 h-100 text-center portal-gov animate-portal" style={{cursor:'pointer'}} onClick={() => setPortal('government')}>
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <i className="fas fa-landmark fa-3x mb-3" style={{color:'#dc3545'}}></i>
                  <h5 className="card-title fw-bold mb-2">Government Portal</h5>
                  <p className="card-text text-muted">Heatmaps, MRL gatekeeping, fraud detection, and digital audit tools.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {portal === 'vet' && (
          <div className="portal-content animated-fadein">
            <button className="btn btn-outline-secondary mb-4 back-btn" onClick={() => setPortal(null)}>
              <span className="fas fa-arrow-left me-2"></span>Back to Main Screen
            </button>
            <div className="portal-inner"><VetPortal /></div>
          </div>
        )}
        {portal === 'consumer' && (
          <div className="portal-content animated-fadein">
            <button className="btn btn-outline-secondary mb-4 back-btn" onClick={() => setPortal(null)}>
              <span className="fas fa-arrow-left me-2"></span>Back to Main Screen
            </button>
            <div className="portal-inner"><ConsumerPortal /></div>
          </div>
        )}
        {portal === 'government' && (
          <div className="portal-content animated-fadein">
            <button className="btn btn-outline-secondary mb-4 back-btn" onClick={() => setPortal(null)}>
              <span className="fas fa-arrow-left me-2"></span>Back to Main Screen
            </button>
            <div className="portal-inner"><GovPortal /></div>
          </div>
        )}

      </main>
      <footer className="bg-white border-top py-3 text-center text-muted mt-auto">
        © 2025 Agrisense. All rights reserved.
      </footer>
    </>
  );
}
export default App;