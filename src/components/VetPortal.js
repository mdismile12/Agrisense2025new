import React, { useState } from "react";

function VetEPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, animalId: "Cow-102", drug: "Oxytetracycline", dosage: "10 mg/kg", date: "2024-06-10" },
    { id: 2, animalId: "Buffalo-205", drug: "Enrofloxacin", dosage: "5 mg/kg", date: "2024-06-12" },
  ]);
  const [formData, setFormData] = useState({ animalId: "", drug: "", dosage: "" });
  const [message, setMessage] = useState(null);
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
  <div className="card h-100 p-3 text-center border border-success shadow">
      <img src="https://storage.googleapis.com/a1aa/image/4df8032d-ad58-4ed4-b811-9bef9b880275.jpg" alt="Vet issuing prescription" className="mb-3 rounded mx-auto" width="120" height="120" />
      <h5 className="fw-bold mb-2">Smart e-Prescriptions</h5>
      <p className="text-muted small mb-2">Issue secure digital prescriptions linked to animal IDs with QR-coded ear tags.</p>
      <form onSubmit={addPrescription} className="text-start mx-auto" style={{ maxWidth: 250 }}>
        <div className="mb-2">
          <label className="form-label">Animal ID</label>
          <input name="animalId" className="form-control" value={formData.animalId} onChange={handleInputChange} />
        </div>
        <div className="mb-2">
          <label className="form-label">Drug</label>
          <input name="drug" className="form-control" value={formData.drug} onChange={handleInputChange} />
        </div>
        <div className="mb-2">
          <label className="form-label">Dosage</label>
          <input name="dosage" className="form-control" value={formData.dosage} onChange={handleInputChange} />
        </div>
        <button className="btn btn-success w-100" type="submit">Add Prescription</button>
      </form>
      {message && <div className="mt-2 text-success fw-bold">{message}</div>}
      <div className="mt-3 text-start mx-auto" style={{ maxWidth: 250 }}>
        <h6 className="fw-bold">Recent Prescriptions</h6>
        <ul className="list-group small">
          {prescriptions.map((p) => (
            <li key={p.id} className="list-group-item">
              <strong>{p.animalId}</strong> - {p.drug} ({p.dosage}) <br />
              <span className="text-muted small">{p.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function VetAIDecisionSupport() {
  const [symptoms, setSymptoms] = useState("");
  const [history] = useState([
    { date: "2024-05-01", treatment: "Oxytetracycline 10 mg/kg" },
    { date: "2024-04-15", treatment: "No treatment" },
  ]);
  const [recommendation, setRecommendation] = useState(null);
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
  <div className="card h-100 p-3 text-center border border-success shadow">
      <img src="https://storage.googleapis.com/a1aa/image/f1cc19fa-507e-4b51-76a4-4babfed7afd9.jpg" alt="AI analyzing animal health" className="mb-3 rounded mx-auto" width="120" height="120" />
      <h5 className="fw-bold mb-2">AI-Powered Decision Support</h5>
      <p className="text-muted small mb-2">Get AI suggestions for drugs and dosages based on animal history and symptoms.</p>
      <textarea
        rows="3"
        placeholder="Enter symptoms here..."
        className="form-control mb-2"
        value={symptoms}
        onChange={e => setSymptoms(e.target.value)}
      ></textarea>
      <button className="btn btn-success w-100" onClick={analyze}>Analyze Symptoms</button>
      {recommendation && <div className="mt-2 alert alert-success">{recommendation}</div>}
      <div className="mt-3 text-start mx-auto" style={{ maxWidth: 250 }}>
        <h6 className="fw-bold">Animal Treatment History</h6>
        <ul className="list-group small">
          {history.map((h, i) => (
            <li key={i} className="list-group-item">
              <strong>{h.date}:</strong> {h.treatment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function VetHealthHistory() {
  const [animalId, setAnimalId] = useState("");
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
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
  <div className="card h-100 p-3 text-center border border-success shadow">
      <img src="https://storage.googleapis.com/a1aa/image/f376ec18-28e3-43b7-b215-e18c3a8f6c41.jpg" alt="Animal health record" className="mb-3 rounded mx-auto" width="120" height="120" />
      <h5 className="fw-bold mb-2">Complete Health History</h5>
      <p className="text-muted small mb-2">Access full treatment history and health analytics for informed decisions.</p>
      <input
        type="text"
        placeholder="Enter Animal ID (e.g. Cow-102)"
        className="form-control mb-2 text-center"
        value={animalId}
        onChange={e => setAnimalId(e.target.value)}
      />
      <button className="btn btn-success w-100" onClick={fetchHistory}>Fetch History</button>
      {loading && <div className="mt-2 text-success fw-bold">Loading...</div>}
      {history && (
        <ul className="list-group mt-3 small text-start mx-auto" style={{ maxWidth: 250 }}>
          {history.map((h, i) => (
            <li key={i} className="list-group-item">
              <strong>{h.date}:</strong> {h.treatment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function VetTeleServices() {
  const [callStatus, setCallStatus] = useState(null);
  const [farmerNumber, setFarmerNumber] = useState("");
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
  <div className="card h-100 p-3 text-center border border-success shadow">
      <img src="https://storage.googleapis.com/a1aa/image/b75df67d-bcc2-4699-aafa-d6b97084d887.jpg" alt="Vet and farmer video calling" className="mb-3 rounded mx-auto" width="120" height="120" />
      <h5 className="fw-bold mb-2">Tele-Veterinary Services</h5>
      <p className="text-muted small mb-2">Connect with certified vets for consultations via app or IVR calls.</p>
      <input
        type="tel"
        placeholder="Enter farmer's phone number"
        className="form-control mb-2 text-center"
        value={farmerNumber}
        onChange={e => setFarmerNumber(e.target.value)}
      />
      <button className="btn btn-success w-100" onClick={startCall}>Start Call</button>
      {callStatus && <div className="mt-2 text-success fw-bold">{callStatus}</div>}
    </div>
  );
}

function VetPortal() {
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

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-success">Veterinarian Portal</h2>
      <div className="row g-4">
        <div className="col-md-6 col-lg-3 mb-4">
          <VetEPrescriptions />
        </div>
        <div className="col-md-6 col-lg-3 mb-4">
          <VetAIDecisionSupport />
        </div>
        <div className="col-md-6 col-lg-3 mb-4">
          <VetHealthHistory />
        </div>
        <div className="col-md-6 col-lg-3 mb-4">
          <VetTeleServices />
        </div>
      </div>
    </div>
  );
}

export default VetPortal;
