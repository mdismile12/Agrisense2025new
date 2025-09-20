
import React, { useState, useEffect } from "react";

function GovernmentHeatmaps() {
  return (
    <div className="card h-100 p-3 text-center border border-danger shadow">
      <img src="https://storage.googleapis.com/a1aa/image/fa3038a4-bbce-4dcb-5953-8554957e995c.jpg" alt="Heatmap of India showing antimicrobial usage intensity by region with color gradients" className="mb-4 rounded img-fluid d-block mx-auto" style={{maxWidth:'100%',height:'auto',objectFit:'contain'}} width="300" height="200" />
      <h3 className="font-semibold text-lg mb-2">National AMU Heatmaps</h3>
      <p className="text-gray-600 text-sm">Visualize antimicrobial usage patterns by region, species, and drug type.</p>
      <button onClick={() => alert('Heatmaps update in real-time based on collected data.')} className="mt-4 btn btn-danger">Learn More</button>
    </div>
  );
}

function GovernmentMRLGatekeeping() {
  const [batches, setBatches] = useState([
    { id: 1, batchNumber: 'M20240615-102', status: 'Blocked', reason: 'Within withdrawal period' },
    { id: 2, batchNumber: 'M20240610-205', status: 'Approved', reason: '' },
  ]);
  const [newBatchNumber, setNewBatchNumber] = useState('');
  const [newStatus, setNewStatus] = useState('Approved');
  const [newReason, setNewReason] = useState('');
  function addBatch() {
    if (!newBatchNumber.trim()) {
      alert('Enter batch number.');
      return;
    }
    setBatches([
      ...batches,
      { id: Date.now(), batchNumber: newBatchNumber.trim(), status: newStatus, reason: newStatus === 'Blocked' ? newReason.trim() : '' },
    ]);
    setNewBatchNumber('');
    setNewStatus('Approved');
    setNewReason('');
  }
  function toggleStatus(id) {
    setBatches((prev) => prev.map((b) => {
      if (b.id === id) {
        const newStat = b.status === 'Blocked' ? 'Approved' : 'Blocked';
        return { ...b, status: newStat, reason: newStat === 'Blocked' ? 'Manually blocked' : '' };
      }
      return b;
    }));
  }
  return (
    <div className="card h-100 p-3 text-center border border-danger shadow">
      <img src="https://storage.googleapis.com/a1aa/image/d643d89a-2318-4519-f8a8-7edf030bff56.jpg" alt="Illustration of milk collection center with digital system blocking contaminated batches" className="mb-4 rounded img-fluid d-block mx-auto" style={{maxWidth:'100%',height:'auto',objectFit:'contain'}} width="300" height="200" />
      <h3 className="font-semibold text-lg mb-2">MRL Gatekeeping</h3>
      <p className="text-gray-600 text-sm mb-3">Automatically block batches from animals within withdrawal periods.</p>
      <table className="w-full max-w-md text-left border border-gray-300 rounded">
        <thead className="bg-red-100 text-red-800">
          <tr>
            <th className="px-3 py-2 border-r border-red-300">Batch Number</th>
            <th className="px-3 py-2 border-r border-red-300">Status</th>
            <th className="px-3 py-2 border-r border-red-300">Reason</th>
            <th className="px-3 py-2">Toggle Status</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => (
            <tr key={batch.id} className={batch.status === 'Blocked' ? 'bg-red-50' : ''}>
              <td className="px-3 py-2 border-t border-red-300">{batch.batchNumber}</td>
              <td className="px-3 py-2 border-t border-red-300 font-semibold">{batch.status}</td>
              <td className="px-3 py-2 border-t border-red-300">{batch.reason}</td>
              <td className="px-3 py-2 border-t border-red-300">
                <button onClick={() => toggleStatus(batch.id)} className="btn btn-warning btn-sm" aria-label={`Toggle status for batch ${batch.batchNumber}`}>Toggle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 w-full max-w-md text-left">
        <h4 className="font-semibold mb-2">Add New Batch</h4>
        <div className="flex flex-col space-y-2">
          <input type="text" placeholder="Batch Number" className="px-3 py-2 border rounded" value={newBatchNumber} onChange={(e) => setNewBatchNumber(e.target.value)} />
          <select className="px-3 py-2 border rounded" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            <option value="Approved">Approved</option>
            <option value="Blocked">Blocked</option>
          </select>
          {newStatus === 'Blocked' && (
            <input type="text" placeholder="Reason for blocking" className="px-3 py-2 border rounded" value={newReason} onChange={(e) => setNewReason(e.target.value)} />
          )}
          <button onClick={addBatch} className="btn btn-danger w-100">Add Batch</button>
        </div>
      </div>
    </div>
  );
}

function GovernmentFraudDetection() {
  const [alerts, setAlerts] = useState(() => {
    try {
      const data = localStorage.getItem('Agrisense_gov_fraud_alerts');
      return data ? JSON.parse(data) : [
        { id: 1, description: 'Impossible milk yield detected for Farm #102', date: '2024-06-10', severity: 'High' },
        { id: 2, description: 'Missing withdrawal logs for Batch M20240615-205', date: '2024-06-12', severity: 'Medium' },
      ];
    } catch {
      return [];
    }
  });
  const [newDescription, setNewDescription] = useState('');
  const [newSeverity, setNewSeverity] = useState('Medium');
  useEffect(() => {
    localStorage.setItem('Agrisense_gov_fraud_alerts', JSON.stringify(alerts));
  }, [alerts]);
  function addAlert() {
    if (!newDescription.trim()) {
      alert('Enter alert description.');
      return;
    }
    setAlerts([
      { id: Date.now(), description: newDescription.trim(), date: new Date().toISOString().slice(0, 10), severity: newSeverity },
      ...alerts,
    ]);
    setNewDescription('');
    setNewSeverity('Medium');
  }
  return (
    <div className="card h-100 p-3 text-center border border-danger shadow">
      <img src="https://storage.googleapis.com/a1aa/image/231ffe0b-1b25-4cd9-1c04-9d213e3ab0f7.jpg" alt="Illustration of AI analyzing data streams to detect anomalies and fraud in antimicrobial usage" className="mb-4 rounded img-fluid d-block mx-auto" style={{maxWidth:'100%',height:'auto',objectFit:'contain'}} width="300" height="200" />
      <h3 className="font-semibold text-lg mb-2">AI-Powered Fraud Detection</h3>
      <p className="text-gray-600 text-sm mb-3">Detect anomalies like impossible milk yields or missing withdrawal logs.</p>
      <ul className="max-w-md w-full text-left border border-gray-300 rounded p-3 max-h-48 overflow-y-auto space-y-2 mb-4">
        {alerts.length === 0 && <li className="text-gray-500">No alerts.</li>}
        {alerts.map((alert) => (
          <li key={alert.id} className={`border-l-4 pl-3 ${alert.severity === 'High' ? 'border-red-600 text-red-700' : alert.severity === 'Medium' ? 'border-yellow-500 text-yellow-700' : 'border-gray-400 text-gray-700'}`}>
            <strong>{alert.severity} Severity:</strong> {alert.description} <br />
            <small className="text-gray-500">{alert.date}</small>
          </li>
        ))}
      </ul>
      <div className="w-full max-w-md text-left">
        <h4 className="font-semibold mb-2">Add New Alert</h4>
        <textarea rows="3" placeholder="Alert description" className="w-full px-3 py-2 border rounded mb-2" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        <select className="w-full px-3 py-2 border rounded mb-2" value={newSeverity} onChange={(e) => setNewSeverity(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
  <button onClick={addAlert} className="btn btn-danger w-100">Add Alert</button>
      </div>
    </div>
  );
}

function GovPortal({ onLogout }) {
  return (
    <section id="government" className="bg-white rounded shadow p-4" tabIndex={-1}>
      <h2 className="fs-2 fw-bold text-danger mb-4 d-flex align-items-center gap-2">
        <i className="fas fa-landmark"></i>
        <span>Government Regulator Dashboard</span>
      </h2>
      <p className="mb-4 text-secondary">Real-time monitoring, MRL gatekeeping, AI fraud detection, and digital audit tools for regulators.</p>
      <div className="row g-4">
        <div className="col-md-4 mb-4"><GovernmentHeatmaps /></div>
        <div className="col-md-4 mb-4"><GovernmentMRLGatekeeping /></div>
        <div className="col-md-4 mb-4"><GovernmentFraudDetection /></div>
      </div>
      <div className="mt-4 text-center">
        <button type="button" onClick={onLogout} className="btn btn-danger px-4">Logout</button>
      </div>
    </section>
  );
}

export default GovPortal;
