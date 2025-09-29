import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// Layout component to handle navigation
function Layout({ children }) {
  const location = useLocation();
  
  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="text-success mb-0">Veterinarian Portal</h2>
            <p className="text-muted small">Comprehensive animal health management system</p>
          </div>
          <div>
            {location.pathname !== "/dashboard" && (
              <Link to="/dashboard" className="btn btn-outline-success btn-sm me-2">
                Back to Dashboard
              </Link>
            )}
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={() => window.location.reload()} // Simple logout for demo
            >
              Logout
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function VetEPrescriptions({ isFullScreen = false }) {
  const [prescriptions, setPrescriptions] = React.useState([
    { id: 1, animalId: "Cow-102", drug: "Oxytetracycline", dosage: "10 mg/kg", date: "2024-06-10" },
    { id: 2, animalId: "Buffalo-205", drug: "Enrofloxacin", dosage: "5 mg/kg", date: "2024-06-12" },
  ]);
  const [formData, setFormData] = React.useState({ animalId: "", drug: "", dosage: "" });
  const [message, setMessage] = React.useState(null);
  
  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  function addPrescription(e) {
    e.preventDefault();
    if (!formData.animalId || !formData.drug || !formData.dosage) {
      alert("Please fill all fields.");
      return;
    }
    const newPrescription = {
      id: prescriptions.length + 1,
      animalId: formData.animalId,
      drug: formData.drug,
      dosage: formData.dosage,
      date: new Date().toISOString().slice(0, 10),
    };
    setPrescriptions([newPrescription, ...prescriptions]);
    setFormData({ animalId: "", drug: "", dosage: "" });
    setMessage("Prescription added successfully.");
    setTimeout(() => setMessage(null), 3000);
  }
  
  return (
    <div className={isFullScreen ? "p-4" : "card h-100 p-3 text-center border border-success shadow d-flex flex-column"}>
      <div className="mb-3">
        <img src="https://storage.googleapis.com/a1aa/image/4df8032d-ad58-4ed4-b811-9bef9b880275.jpg" alt="Vet issuing prescription" className="rounded mx-auto d-block" width="100" height="100" />
        <h5 className="fw-bold mt-2">Smart e-Prescriptions</h5>
        <p className="text-muted small">Issue secure digital prescriptions linked to animal IDs with QR-coded ear tags.</p>
      </div>
      
      <form onSubmit={addPrescription} className="mb-3">
        <div className="mb-2">
          <label className="form-label small fw-bold">Animal ID</label>
          <input name="animalId" className="form-control form-control-sm" value={formData.animalId} onChange={handleInputChange} />
        </div>
        <div className="mb-2">
          <label className="form-label small fw-bold">Drug</label>
          <input name="drug" className="form-control form-control-sm" value={formData.drug} onChange={handleInputChange} />
        </div>
        <div className="mb-2">
          <label className="form-label small fw-bold">Dosage</label>
          <input name="dosage" className="form-control form-control-sm" value={formData.dosage} onChange={handleInputChange} />
        </div>
        <button className="btn btn-success btn-sm w-100 mt-2" type="submit">Add Prescription</button>
      </form>
      
      {message && <div className="alert alert-success py-1 mb-3">{message}</div>}
      
      <div className={isFullScreen ? "" : "mt-auto"}>
        <h6 className="fw-bold text-start small">Recent Prescriptions</h6>
        <div className="scroll-container" style={{ maxHeight: isFullScreen ? '400px' : '150px', overflowY: 'auto' }}>
          {prescriptions.map((p) => (
            <div key={p.id} className="border-bottom py-2 small text-start">
              <strong>{p.animalId}</strong> - {p.drug} ({p.dosage})<br />
              <span className="text-muted">{p.date}</span>
            </div>
          ))}
        </div>
      </div>
      
      {!isFullScreen && (
        <div className="mt-2">
          <Link to="/eprescriptions" className="btn btn-outline-success btn-sm w-100">
            Open Full Screen
          </Link>
        </div>
      )}
    </div>
  );
}

function VetAIDecisionSupport({ isFullScreen = false }) {
  const [symptoms, setSymptoms] = React.useState("");
  const [history] = React.useState([
    { date: "2024-05-01", treatment: "Oxytetracycline 10 mg/kg" },
    { date: "2024-04-15", treatment: "No treatment" },
  ]);
  const [recommendation, setRecommendation] = React.useState(null);
  
  function analyze() {
    if (!symptoms.trim()) {
      alert("Please enter symptoms.");
      return;
    }
    let rec = "Recommended drug: Amoxicillin 7 mg/kg for 5 days.";
    if (symptoms.toLowerCase().includes("fever")) {
      rec = "Recommended drug: Paracetamol 15 mg/kg and Oxytetracycline 10 mg/kg.";
    }
    setRecommendation(rec);
  }
  
  return (
    <div className={isFullScreen ? "p-4" : "card h-100 p-3 text-center border border-success shadow d-flex flex-column"}>
      <div className="mb-3">
        <img src="https://storage.googleapis.com/a1aa/image/f1cc19fa-507e-4b51-76a4-4babfed7afd9.jpg" alt="AI analyzing animal health" className="rounded mx-auto d-block" width="100" height="100" />
        <h5 className="fw-bold mt-2">AI-Powered Decision Support</h5>
        <p className="text-muted small">Get AI suggestions for drugs and dosages based on animal history and symptoms.</p>
      </div>
      
      <div className="mb-3">
        <textarea
          rows={isFullScreen ? "5" : "3"}
          placeholder="Enter symptoms here..."
          className="form-control form-control-sm"
          value={symptoms}
          onChange={e => setSymptoms(e.target.value)}
        ></textarea>
        <button className="btn btn-success btn-sm w-100 mt-2" onClick={analyze}>Analyze Symptoms</button>
      </div>
      
      {recommendation && <div className="alert alert-success py-2 mb-3 small">{recommendation}</div>}
      
      <div className={isFullScreen ? "" : "mt-auto"}>
        <h6 className="fw-bold text-start small">Animal Treatment History</h6>
        <div className="scroll-container" style={{ maxHeight: isFullScreen ? '400px' : '120px', overflowY: 'auto' }}>
          {history.map((h, i) => (
            <div key={i} className="border-bottom py-2 small text-start">
              <strong>{h.date}:</strong> {h.treatment}
            </div>
          ))}
        </div>
      </div>
      
      {!isFullScreen && (
        <div className="mt-2">
          <Link to="/ai-support" className="btn btn-outline-success btn-sm w-100">
            Open Full Screen
          </Link>
        </div>
      )}
    </div>
  );
}

function VetHealthHistory({ isFullScreen = false }) {
  const [animalId, setAnimalId] = React.useState("");
  const [history, setHistory] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  
  function fetchHistory() {
    if (!animalId.trim()) {
      alert("Please enter an Animal ID.");
      return;
    }
    setLoading(true);
    setHistory(null);
    setTimeout(() => {
      setHistory([
        { date: "2024-06-01", treatment: "Oxytetracycline 10 mg/kg" },
        { date: "2024-05-15", treatment: "Vaccination" },
        { date: "2024-04-20", treatment: "No treatment" },
      ]);
      setLoading(false);
    }, 1500);
  }
  
  return (
    <div className={isFullScreen ? "p-4" : "card h-100 p-3 text-center border border-success shadow d-flex flex-column"}>
      <div className="mb-3">
        <img src="https://storage.googleapis.com/a1aa/image/f376ec18-28e3-43b7-b215-e18c3a8f6c41.jpg" alt="Animal health record" className="rounded mx-auto d-block" width="100" height="100" />
        <h5 className="fw-bold mt-2">Complete Health History</h5>
        <p className="text-muted small">Access full treatment history and health analytics for informed decisions.</p>
      </div>
      
      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter Animal ID (e.g. Cow-102)"
          className="form-control form-control-sm mb-2 text-center"
          value={animalId}
          onChange={e => setAnimalId(e.target.value)}
        />
        <button className="btn btn-success btn-sm w-100" onClick={fetchHistory}>Fetch History</button>
      </div>
      
      {loading && <div className="alert alert-info py-2 mb-3 small">Loading...</div>}
      
      <div className={isFullScreen ? "" : "mt-auto"}>
        {history && (
          <>
            <h6 className="fw-bold text-start small">Health Records</h6>
            <div className="scroll-container" style={{ maxHeight: isFullScreen ? '400px' : '150px', overflowY: 'auto' }}>
              {history.map((h, i) => (
                <div key={i} className="border-bottom py-2 small text-start">
                  <strong>{h.date}:</strong> {h.treatment}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      
      {!isFullScreen && (
        <div className="mt-2">
          <Link to="/health-history" className="btn btn-outline-success btn-sm w-100">
            Open Full Screen
          </Link>
        </div>
      )}
    </div>
  );
}

function VetTeleServices({ isFullScreen = false }) {
  const [callStatus, setCallStatus] = React.useState(null);
  const [farmerNumber, setFarmerNumber] = React.useState("");
  
  function startCall() {
    if (!farmerNumber.match(/^\d{10}$/)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    setCallStatus("Connecting call...");
    setTimeout(() => {
      setCallStatus("Call connected. You are now consulting with the farmer.");
    }, 2000);
  }
  
  return (
    <div className={isFullScreen ? "p-4" : "card h-100 p-3 text-center border border-success shadow d-flex flex-column"}>
      <div className="mb-3">
        <img src="https://storage.googleapis.com/a1aa/image/b75df67d-bcc2-4699-aafa-d6b97084d887.jpg" alt="Vet and farmer video calling" className="rounded mx-auto d-block" width="100" height="100" />
        <h5 className="fw-bold mt-2">Tele-Veterinary Services</h5>
        <p className="text-muted small">Connect with certified vets for consultations via app or IVR calls.</p>
      </div>
      
      <div className="mb-3">
        <input
          type="tel"
          placeholder="Enter farmer's phone number"
          className="form-control form-control-sm mb-2 text-center"
          value={farmerNumber}
          onChange={e => setFarmerNumber(e.target.value)}
        />
        <button className="btn btn-success btn-sm w-100" onClick={startCall}>Start Call</button>
      </div>
      
      {callStatus && <div className="alert alert-info py-2 small">{callStatus}</div>}
      
      <div className={isFullScreen ? "mt-3" : "mt-auto small text-muted"}>
        <p className="mb-0">Available 8AM - 8PM</p>
        <p className="mb-0">Emergency services: 24/7</p>
      </div>
      
      {!isFullScreen && (
        <div className="mt-2">
          <Link to="/tele-services" className="btn btn-outline-success btn-sm w-100">
            Open Full Screen
          </Link>
        </div>
      )}
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <div className="row g-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <VetEPrescriptions />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <VetAIDecisionSupport />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <VetHealthHistory />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <VetTeleServices />
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-top text-center">
        <p className="text-muted small mb-0">VetPortal &copy; {new Date().getFullYear()} - Advanced animal healthcare management</p>
      </div>
    </>
  );
}

// VetPortal function updated to always show the portal, no login/signup
function VetPortal() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/eprescriptions" element={
          <Layout>
            <VetEPrescriptions isFullScreen={true} />
          </Layout>
        } />
        <Route path="/ai-support" element={
          <Layout>
            <VetAIDecisionSupport isFullScreen={true} />
          </Layout>
        } />
        <Route path="/health-history" element={
          <Layout>
            <VetHealthHistory isFullScreen={true} />
          </Layout>
        } />
        <Route path="/tele-services" element={
          <Layout>
            <VetTeleServices isFullScreen={true} />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default VetPortal;
