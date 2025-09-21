import React, { useState, useEffect } from "react";

// FullScreenWrapper component to handle full-screen mode
function FullScreenWrapper({ children, isFullScreen, onClose, title }) {
  if (!isFullScreen) return children;
  
  return (
    <div className="fullscreen-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'white',
      zIndex: 1050,
      overflow: 'auto',
      padding: '20px'
    }}>
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <h2 className="text-danger">{title}</h2>
        <button 
          onClick={onClose} 
          className="btn btn-danger"
          aria-label="Close full screen"
        >
          &times; Close
        </button>
      </div>
      <div className="container-fluid">
        {children}
      </div>
    </div>
  );
}

function GovernmentHeatmaps({ isFullScreen, onExpand, onClose }) {
  const [timeFilter, setTimeFilter] = useState('30days');
  const [regionFilter, setRegionFilter] = useState('all');
  
  const content = (
    <>
      <div className="flex-grow-0 mb-3">
        <img 
          src="https://storage.googleapis.com/a1aa/image/fa3038a4-bbce-4dcb-5953-8554957e995c.jpg" 
          alt="Heatmap of India showing antimicrobial usage intensity by region with color gradients" 
          className="rounded img-fluid d-block mx-auto" 
          style={{maxWidth:'100%', height:'auto', objectFit:'contain'}} 
          width={isFullScreen ? "800" : "300"}
          height={isFullScreen ? "500" : "200"}
        />
      </div>
      
      {isFullScreen && (
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-light">
                <h6 className="mb-0">Filter Options</h6>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Time Period</label>
                  <select 
                    className="form-select"
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                  >
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="90days">Last 90 Days</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Region</label>
                  <select 
                    className="form-select"
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                  >
                    <option value="all">All India</option>
                    <option value="north">Northern Region</option>
                    <option value="south">Southern Region</option>
                    <option value="east">Eastern Region</option>
                    <option value="west">Western Region</option>
                    <option value="central">Central Region</option>
                  </select>
                </div>
                
                <button className="btn btn-sm btn-outline-primary">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-light">
                <h6 className="mb-0">Legend</h6>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <div style={{width: '20px', height: '20px', backgroundColor: '#ff0000', marginRight: '10px'}}></div>
                  <span>High Antimicrobial Usage</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div style={{width: '20px', height: '20px', backgroundColor: '#ff9900', marginRight: '10px'}}></div>
                  <span>Medium-High Usage</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div style={{width: '20px', height: '20px', backgroundColor: '#ffff00', marginRight: '10px'}}></div>
                  <span>Medium Usage</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div style={{width: '20px', height: '20px', backgroundColor: '#99ff00', marginRight: '10px'}}></div>
                  <span>Low-Medium Usage</span>
                </div>
                <div className="d-flex align-items-center">
                  <div style={{width: '20px', height: '20px', backgroundColor: '#00ff00', marginRight: '10px'}}></div>
                  <span>Low Usage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-grow-1 d-flex flex-column">
        <h5 className="fw-bold mb-2">National AMU Heatmaps</h5>
        <p className="text-muted small mb-3 flex-grow-0">Visualize antimicrobial usage patterns by region, species, and drug type.</p>
        
        {isFullScreen && (
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header bg-light">
                  <h6 className="mb-0">Regional Insights</h6>
                </div>
                <div className="card-body">
                  <p>Based on the current filters, the Northern Region shows the highest antimicrobial usage intensity, primarily in poultry farming. The Southern Region has moderate usage with a focus on dairy cattle.</p>
                  <p>Overall national usage has decreased by 12% compared to the previous period, indicating positive impact of regulatory measures.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-auto pt-2">
          <button 
            onClick={isFullScreen ? onClose : onExpand}
            className="btn btn-danger btn-sm w-100"
            aria-label={isFullScreen ? "Close heatmap" : "Learn more about heatmaps"}
          >
            {isFullScreen ? "Close Full Screen" : "View Full Screen"}
          </button>
        </div>
      </div>
    </>
  );

  if (isFullScreen) {
    return (
      <FullScreenWrapper 
        isFullScreen={isFullScreen} 
        onClose={onClose}
        title="National AMU Heatmaps - Full Screen View"
      >
        <div className="card p-3 border border-danger shadow">
          {content}
        </div>
      </FullScreenWrapper>
    );
  }

  return (
    <div className="card h-100 p-3 text-center border border-danger shadow d-flex flex-column">
      {content}
    </div>
  );
}

function GovernmentMRLGatekeeping({ isFullScreen, onExpand, onClose }) {
  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem('mrl_batches');
    return saved ? JSON.parse(saved) : [
      { id: 1, batchNumber: 'M20240615-102', status: 'Blocked', reason: 'Within withdrawal period', date: '2024-06-15' },
      { id: 2, batchNumber: 'M20240610-205', status: 'Approved', reason: '', date: '2024-06-10' },
      { id: 3, batchNumber: 'M20240618-307', status: 'Blocked', reason: 'Antibiotic residues detected', date: '2024-06-18' },
      { id: 4, batchNumber: 'M20240620-401', status: 'Approved', reason: '', date: '2024-06-20' },
    ];
  });
  
  const [newBatchNumber, setNewBatchNumber] = useState('');
  const [newStatus, setNewStatus] = useState('Approved');
  const [newReason, setNewReason] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    localStorage.setItem('mrl_batches', JSON.stringify(batches));
  }, [batches]);

  function addBatch() {
    if (!newBatchNumber.trim()) {
      alert('Please enter a batch number.');
      return;
    }
    
    if (batches.some(batch => batch.batchNumber === newBatchNumber.trim())) {
      alert('This batch number already exists.');
      return;
    }
    
    setBatches([
      ...batches,
      { 
        id: Date.now(), 
        batchNumber: newBatchNumber.trim(), 
        status: newStatus, 
        reason: newStatus === 'Blocked' ? newReason.trim() : '',
        date: new Date().toISOString().slice(0, 10)
      },
    ]);
    setNewBatchNumber('');
    setNewStatus('Approved');
    setNewReason('');
  }

  function toggleStatus(id) {
    setBatches((prev) => prev.map((b) => {
      if (b.id === id) {
        const newStat = b.status === 'Blocked' ? 'Approved' : 'Blocked';
        return { 
          ...b, 
          status: newStat, 
          reason: newStat === 'Blocked' ? (b.reason || 'Manually blocked') : '' 
        };
      }
      return b;
    }));
  }

  function removeBatch(id) {
    setBatches(prev => prev.filter(batch => batch.id !== id));
  }
  
  const filteredBatches = batches.filter(batch => 
    filterStatus === 'All' || batch.status === filterStatus
  );

  const content = (
    <>
      <div className="flex-grow-0 mb-3">
        <img 
          src="https://storage.googleapis.com/a1aa/image/d643d89a-2318-4519-f8a8-7edf030bff56.jpg" 
          alt="Illustration of milk collection center with digital system blocking contaminated batches" 
          className="rounded img-fluid d-block mx-auto" 
          style={{maxWidth:'100%', height:'auto', objectFit:'contain'}} 
          width={isFullScreen ? "600" : "300"}
          height={isFullScreen ? "400" : "200"}
        />
      </div>
      
      <div className="flex-grow-1 d-flex flex-column">
        <h5 className="fw-bold mb-2 text-center">MRL Gatekeeping</h5>
        <p className="text-muted small mb-3 text-center">Automatically block batches from animals within withdrawal periods.</p>
        
        {isFullScreen && (
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card bg-light">
                <div className="card-body py-2">
                  <div className="row">
                    <div className="col-md-3 border-end">
                      <div className="text-center">
                        <h4 className="text-danger mb-0">{batches.filter(b => b.status === 'Blocked').length}</h4>
                        <small className="text-muted">Blocked Batches</small>
                      </div>
                    </div>
                    <div className="col-md-3 border-end">
                      <div className="text-center">
                        <h4 className="text-success mb-0">{batches.filter(b => b.status === 'Approved').length}</h4>
                        <small className="text-muted">Approved Batches</small>
                      </div>
                    </div>
                    <div className="col-md-3 border-end">
                      <div className="text-center">
                        <h4 className="text-primary mb-0">{batches.length}</h4>
                        <small className="text-muted">Total Batches</small>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="text-center">
                        <h4 className="text-warning mb-0">2</h4>
                        <small className="text-muted">Pending Review</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {isFullScreen && (
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <label className="me-2">Filter by Status:</label>
                <select 
                  className="form-select form-select-sm w-auto" 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Approved">Approved</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 text-end">
              <button className="btn btn-sm btn-outline-primary">
                Export to CSV
              </button>
            </div>
          </div>
        )}
        
        <div className="table-responsive mb-3 flex-grow-0" style={{ maxHeight: isFullScreen ? 'none' : '200px' }}>
          <table className="table table-sm table-hover table-bordered mb-0">
            <thead className="table-danger">
              <tr>
                <th scope="col" className="px-2">Batch #</th>
                <th scope="col" className="px-2">Date</th>
                <th scope="col" className="px-2">Status</th>
                {isFullScreen && <th scope="col" className="px-2">Details</th>}
                <th scope="col" className="text-center px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatches.map((batch) => (
                <tr key={batch.id} className={batch.status === 'Blocked' ? 'table-warning' : ''}>
                  <td className="px-2 fw-bold">{batch.batchNumber}</td>
                  <td className="px-2 small">{batch.date}</td>
                  <td className="px-2">
                    <span className={`badge ${batch.status === 'Blocked' ? 'bg-danger' : 'bg-success'}`}>
                      {batch.status}
                    </span>
                  </td>
                  {isFullScreen && <td className="px-2 small">{batch.reason}</td>}
                  <td className="text-center px-2">
                    <button 
                      onClick={() => toggleStatus(batch.id)} 
                      className="btn btn-sm btn-outline-warning me-1"
                      aria-label={`Toggle status for batch ${batch.batchNumber}`}
                    >
                      Toggle
                    </button>
                    <button 
                      onClick={() => removeBatch(batch.id)} 
                      className="btn btn-sm btn-outline-danger"
                      aria-label={`Remove batch ${batch.batchNumber}`}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-auto pt-3 border-top">
          <h6 className="fw-bold mb-2">Add New Batch</h6>
          <div className="row g-2 mb-2">
            <div className={isFullScreen ? "col-md-4" : "col-md-6"}>
              <input 
                type="text" 
                placeholder="Batch Number" 
                className="form-control form-control-sm" 
                value={newBatchNumber} 
                onChange={(e) => setNewBatchNumber(e.target.value)} 
              />
            </div>
            <div className={isFullScreen ? "col-md-3" : "col-md-6"}>
              <select 
                className="form-select form-select-sm" 
                value={newStatus} 
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Approved">Approved</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
            {isFullScreen && (
              <div className="col-md-3">
                <input 
                  type="date" 
                  className="form-control form-control-sm" 
                  value={new Date().toISOString().slice(0, 10)} 
                  readOnly
                />
              </div>
            )}
          </div>
          {newStatus === 'Blocked' && (
            <div className="mb-2">
              <input 
                type="text" 
                placeholder="Reason for blocking" 
                className="form-control form-control-sm" 
                value={newReason} 
                onChange={(e) => setNewReason(e.target.value)} 
              />
            </div>
          )}
          <div className="d-grid gap-2">
            <button onClick={addBatch} className="btn btn-danger btn-sm">
              Add Batch
            </button>
            <button 
              onClick={isFullScreen ? onClose : onExpand}
              className="btn btn-outline-danger btn-sm"
            >
              {isFullScreen ? "Close Full Screen" : "View Full Screen"}
            </button>
          </div>
        </div>
      </div>
    </>
  );

  if (isFullScreen) {
    return (
      <FullScreenWrapper 
        isFullScreen={isFullScreen} 
        onClose={onClose}
        title="MRL Gatekeeping - Full Screen View"
      >
        <div className="card p-3 border border-danger shadow">
          {content}
        </div>
      </FullScreenWrapper>
    );
  }

  return (
    <div className="card h-100 p-3 border border-danger shadow d-flex flex-column">
      {content}
    </div>
  );
}

function GovernmentFraudDetection({ isFullScreen, onExpand, onClose }) {
  const [alerts, setAlerts] = useState(() => {
    try {
      const data = localStorage.getItem('Agrisense_gov_fraud_alerts');
      return data ? JSON.parse(data) : [
        { id: 1, description: 'Impossible milk yield detected for Farm #102', date: '2024-06-10', severity: 'High', resolved: false },
        { id: 2, description: 'Missing withdrawal logs for Batch M20240615-205', date: '2024-06-12', severity: 'Medium', resolved: false },
        { id: 3, description: 'Duplicate treatment records for Animal ID 4872', date: '2024-06-14', severity: 'Low', resolved: true },
        { id: 4, description: 'Suspicious antibiotic purchase pattern at Clinic C28', date: '2024-06-15', severity: 'High', resolved: false },
      ];
    } catch {
      return [];
    }
  });
  
  const [newDescription, setNewDescription] = useState('');
  const [newSeverity, setNewSeverity] = useState('Medium');
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [showResolved, setShowResolved] = useState(false);

  useEffect(() => {
    localStorage.setItem('Agrisense_gov_fraud_alerts', JSON.stringify(alerts));
  }, [alerts]);

  function addAlert() {
    if (!newDescription.trim()) {
      alert('Please enter an alert description.');
      return;
    }
    
    setAlerts([
      { 
        id: Date.now(), 
        description: newDescription.trim(), 
        date: new Date().toISOString().slice(0, 10), 
        severity: newSeverity,
        resolved: false
      },
      ...alerts,
    ]);
    setNewDescription('');
    setNewSeverity('Medium');
  }

  function removeAlert(id) {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }
  
  function toggleResolved(id) {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, resolved: !alert.resolved } : alert
    ));
  }

  function clearAllAlerts() {
    if (window.confirm('Are you sure you want to clear all resolved alerts?')) {
      setAlerts(prev => prev.filter(alert => !alert.resolved));
    }
  }
  
  const filteredAlerts = alerts.filter(alert => {
    if (filterSeverity !== 'All' && alert.severity !== filterSeverity) return false;
    if (!showResolved && alert.resolved) return false;
    return true;
  });

  const content = (
    <>
      <div className="flex-grow-0 mb-3">
        <img 
          src="https://storage.googleapis.com/a1aa/image/231ffe0b-1b25-4cd9-1c04-9d213e3ab0f7.jpg" 
          alt="Illustration of AI analyzing data streams to detect anomalies and fraud in antimicrobial usage" 
          className="rounded img-fluid d-block mx-auto" 
          style={{maxWidth:'100%', height:'auto', objectFit:'contain'}} 
          width={isFullScreen ? "600" : "300"}
          height={isFullScreen ? "400" : "200"}
        />
      </div>
      
      <div className="flex-grow-1 d-flex flex-column">
        <h5 className="fw-bold mb-2 text-center">AI-Powered Fraud Detection</h5>
        <p className="text-muted small mb-3 text-center">Detect anomalies like impossible milk yields or missing withdrawal logs.</p>
        
        {isFullScreen && (
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card bg-light">
                <div className="card-body py-2">
                  <div className="row">
                    <div className="col-md-2 border-end text-center">
                      <h4 className="text-danger mb-0">{alerts.filter(a => a.severity === 'High' && !a.resolved).length}</h4>
                      <small className="text-muted">High Priority</small>
                    </div>
                    <div className="col-md-2 border-end text-center">
                      <h4 className="text-warning mb-0">{alerts.filter(a => a.severity === 'Medium' && !a.resolved).length}</h4>
                      <small className="text-muted">Medium Priority</small>
                    </div>
                    <div className="col-md-2 border-end text-center">
                      <h4 className="text-info mb-0">{alerts.filter(a => a.severity === 'Low' && !a.resolved).length}</h4>
                      <small className="text-muted">Low Priority</small>
                    </div>
                    <div className="col-md-3 border-end text-center">
                      <h4 className="text-primary mb-0">{alerts.filter(a => !a.resolved).length}</h4>
                      <small className="text-muted">Total Active</small>
                    </div>
                    <div className="col-md-3 text-center">
                      <h4 className="text-success mb-0">{alerts.filter(a => a.resolved).length}</h4>
                      <small className="text-muted">Resolved</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {isFullScreen && (
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="d-flex align-items-center gap-2">
                <label>Filter by Severity:</label>
                <select 
                  className="form-select form-select-sm w-auto" 
                  value={filterSeverity} 
                  onChange={(e) => setFilterSeverity(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="showResolved" 
                    checked={showResolved}
                    onChange={() => setShowResolved(!showResolved)}
                  />
                  <label className="form-check-label" htmlFor="showResolved">
                    Show Resolved
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-end">
              <button onClick={clearAllAlerts} className="btn btn-sm btn-outline-danger me-2">
                Clear Resolved
              </button>
              <button className="btn btn-sm btn-outline-primary">
                Generate Report
              </button>
            </div>
          </div>
        )}
        
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-bold mb-0">Active Alerts</h6>
          {alerts.length > 0 && (
            <button onClick={clearAllAlerts} className="btn btn-sm btn-outline-danger">
              Clear All
            </button>
          )}
        </div>
        
        <div className="border rounded p-2 mb-3 flex-grow-1" style={{maxHeight: isFullScreen ? 'none' : '200px', overflowY: 'auto'}}>
          {filteredAlerts.length === 0 ? (
            <p className="text-muted text-center p-3 mb-0">No active alerts. Everything looks good!</p>
          ) : (
            <div className="list-group list-group-flush">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className={`list-group-item list-group-item-action p-2 ${alert.resolved ? 'opacity-75' : ''} ${alert.severity === 'High' ? 'list-group-item-danger' : alert.severity === 'Medium' ? 'list-group-item-warning' : 'list-group-item-info'}`}>
                  <div className="d-flex w-100 justify-content-between align-items-start">
                    <div className="flex-grow-1 me-2">
                      <span className="small">{alert.description}</span>
                      {alert.resolved && <span className="badge bg-success ms-2">Resolved</span>}
                    </div>
                    <small className="text-nowrap">{alert.date}</small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className={`badge ${alert.severity === 'High' ? 'bg-danger' : alert.severity === 'Medium' ? 'bg-warning' : 'bg-info'}`}>
                      {alert.severity}
                    </span>
                    <div>
                      <button 
                        onClick={() => toggleResolved(alert.id)} 
                        className="btn btn-sm btn-outline-success me-1"
                      >
                        {alert.resolved ? 'Reopen' : 'Resolve'}
                      </button>
                      <button 
                        onClick={() => removeAlert(alert.id)} 
                        className="btn btn-sm btn-outline-secondary py-0"
                        aria-label="Dismiss alert"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-auto pt-2 border-top">
          <h6 className="fw-bold mb-2">Add New Alert</h6>
          <textarea 
            rows={isFullScreen ? "3" : "2"}
            placeholder="Alert description" 
            className="form-control form-control-sm mb-2" 
            value={newDescription} 
            onChange={(e) => setNewDescription(e.target.value)} 
          />
          <div className="row g-2 align-items-center">
            <div className="col-md-8">
              <select 
                className="form-select form-select-sm" 
                value={newSeverity} 
                onChange={(e) => setNewSeverity(e.target.value)}
              >
                <option value="High">High Severity</option>
                <option value="Medium">Medium Severity</option>
                <option value="Low">Low Severity</option>
              </select>
            </div>
            <div className="col-md-4">
              <div className="d-grid gap-2">
                <button onClick={addAlert} className="btn btn-danger btn-sm">
                  Add Alert
                </button>
                <button 
                  onClick={isFullScreen ? onClose : onExpand}
                  className="btn btn-outline-danger btn-sm"
                >
                  {isFullScreen ? "Close Full Screen" : "View Full Screen"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (isFullScreen) {
    return (
      <FullScreenWrapper 
        isFullScreen={isFullScreen} 
        onClose={onClose}
        title="AI-Powered Fraud Detection - Full Screen View"
      >
        <div className="card p-3 border border-danger shadow">
          {content}
        </div>
      </FullScreenWrapper>
    );
  }

  return (
    <div className="card h-100 p-3 border border-danger shadow d-flex flex-column">
      {content}
    </div>
  );
}

function GovernmentAuditTrail({ isFullScreen, onExpand, onClose }) {
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, action: 'Batch Approval', user: 'Inspector Sharma', timestamp: '2024-06-15 14:30', details: 'Batch M20240615-102 approved', location: 'Punjab' },
    { id: 2, action: 'Batch Blocked', user: 'System Auto-Detect', timestamp: '2024-06-14 09:15', details: 'Batch M20240614-205 blocked - withdrawal period', location: 'Haryana' },
    { id: 3, action: 'Report Generated', user: 'Officer Gupta', timestamp: '2024-06-13 16:45', details: 'Monthly AMU report for Punjab', location: 'Delhi' },
    { id: 4, action: 'User Login', user: 'Admin Singh', timestamp: '2024-06-13 08:30', details: 'Successful login from registered device', location: 'Mumbai' },
    { id: 5, action: 'Data Export', user: 'Analyst Kumar', timestamp: '2024-06-12 11:20', details: 'Exported regional compliance data', location: 'Chennai' },
    { id: 6, action: 'Settings Updated', user: 'Admin Singh', timestamp: '2024-06-11 15:40', details: 'Updated notification thresholds', location: 'Delhi' },
  ]);
  
  const [filterAction, setFilterAction] = useState('All');
  const [filterUser, setFilterUser] = useState('All');

  const uniqueUsers = [...new Set(auditLogs.map(log => log.user))];
  const uniqueActions = [...new Set(auditLogs.map(log => log.action))];

  const filteredLogs = auditLogs.filter(log => {
    if (filterAction !== 'All' && log.action !== filterAction) return false;
    if (filterUser !== 'All' && log.user !== filterUser) return false;
    return true;
  });

  const content = (
    <>
      <div className="flex-grow-0 mb-3">
        <img 
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Faudit-trail-icon&psig=AOvVaw3HIw5g2nTzIv7kroGLBEgC&ust=1758554101556000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNCr1tqS6o8DFQAAAAAdAAAAABAE" 
          alt="Digital audit trail visualization showing transaction history and user actions" 
          className="rounded img-fluid d-block mx-auto" 
          style={{maxWidth:'100%', height:'auto', objectFit:'contain'}} 
          width={isFullScreen ? "600" : "300"}
          height={isFullScreen ? "400" : "200"}
        />
      </div>
      
      <div className="flex-grow-1 d-flex flex-column">
        <h5 className="fw-bold mb-2 text-center">Digital Audit Trail</h5>
        <p className="text-muted small mb-3 text-center">Track all system actions, approvals, and changes with timestamped records.</p>
        
        {isFullScreen && (
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card bg-light">
                <div className="card-body py-2">
                  <div className="row">
                    <div className="col-md-3 border-end text-center">
                      <h4 className="text-primary mb-0">{auditLogs.length}</h4>
                      <small className="text-muted">Total Logs</small>
                    </div>
                    <div className="col-md-3 border-end text-center">
                      <h4 className="text-info mb-0">{uniqueUsers.length}</h4>
                      <small className="text-muted">Active Users</small>
                    </div>
                    <div className="col-md-3 border-end text-center">
                      <h4 className="text-success mb-0">24</h4>
                      <small className="text-muted">Today's Activities</small>
                    </div>
                    <div className="col-md-3 text-center">
                      <h4 className="text-warning mb-0">3</h4>
                      <small className="text-muted">Pending Reviews</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {isFullScreen && (
          <div className="row mb-3">
            <div className="col-md-5">
              <div className="d-flex align-items-center">
                <label className="me-2">Filter by Action:</label>
                <select 
                  className="form-select form-select-sm" 
                  value={filterAction} 
                  onChange={(e) => setFilterAction(e.target.value)}
                >
                  <option value="All">All Actions</option>
                  {uniqueActions.map(action => (
                    <option key={action} value={action}>{action}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-5">
              <div className="d-flex align-items-center">
                <label className="me-2">Filter by User:</label>
                <select 
                  className="form-select form-select-sm" 
                  value={filterUser} 
                  onChange={(e) => setFilterUser(e.target.value)}
                >
                  <option value="All">All Users</option>
                  {uniqueUsers.map(user => (
                    <option key={user} value={user}>{user}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-2 text-end">
              <button className="btn btn-sm btn-outline-primary">
                Export Logs
              </button>
            </div>
          </div>
        )}
        
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-bold mb-0">Recent Activities</h6>
          <span className="badge bg-light text-dark">{filteredLogs.length} records</span>
        </div>
        
        <div className="border rounded p-2 mb-3 flex-grow-1" style={{maxHeight: isFullScreen ? 'none' : '200px', overflowY: 'auto'}}>
          {filteredLogs.length === 0 ? (
            <p className="text-muted text-center p-3 mb-0">No audit records found.</p>
          ) : (
            <div className="list-group list-group-flush">
              {filteredLogs.map((log) => (
                <div key={log.id} className="list-group-item list-group-item-action p-2">
                  <div className="d-flex w-100 justify-content-between align-items-start">
                    <div className="flex-grow-1 me-2">
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">{log.action}</span>
                        <small className="text-muted">{log.location}</small>
                      </div>
                      <div className="small text-muted">By: {log.user}</div>
                      <div className="small">{log.details}</div>
                    </div>
                    <small className="text-nowrap">{log.timestamp}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-auto pt-2">
          <button 
            onClick={isFullScreen ? onClose : onExpand}
            className="btn btn-danger btn-sm w-100"
          >
            {isFullScreen ? "Close Full Screen" : "View Full Screen"}
          </button>
        </div>
      </div>
    </>
  );

  if (isFullScreen) {
    return (
      <FullScreenWrapper 
        isFullScreen={isFullScreen} 
        onClose={onClose}
        title="Digital Audit Trail - Full Screen View"
      >
        <div className="card p-3 border border-danger shadow">
          {content}
        </div>
      </FullScreenWrapper>
    );
  }

  return (
    <div className="card h-100 p-3 border border-danger shadow d-flex flex-column">
      {content}
    </div>
  );
}

function GovPortal({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [fullScreenFeature, setFullScreenFeature] = useState(null);

  const handleExpand = (feature) => {
    setFullScreenFeature(feature);
  };

  const handleCloseFullScreen = () => {
    setFullScreenFeature(null);
  };

  // If a feature is in full screen mode, render only that feature
  if (fullScreenFeature) {
    switch (fullScreenFeature) {
      case 'heatmaps':
        return <GovernmentHeatmaps isFullScreen={true} onClose={handleCloseFullScreen} />;
      case 'mrl':
        return <GovernmentMRLGatekeeping isFullScreen={true} onClose={handleCloseFullScreen} />;
      case 'fraud':
        return <GovernmentFraudDetection isFullScreen={true} onClose={handleCloseFullScreen} />;
      case 'audit':
        return <GovernmentAuditTrail isFullScreen={true} onClose={handleCloseFullScreen} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="text-danger mb-0">Government Regulator Dashboard</h2>
            <p className="text-muted">Real-time monitoring, MRL gatekeeping, AI fraud detection, and digital audit tools for regulators.</p>
          </div>
          <button type="button" onClick={onLogout} className="btn btn-outline-danger">
            Logout
          </button>
        </div>
        
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <i className="bi bi-house me-1"></i> Overview
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              <i className="bi bi-bar-chart me-1"></i> Reports
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <i className="bi bi-gear me-1"></i> Settings
            </button>
          </li>
        </ul>
        
        {activeTab === 'overview' && (
          <>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card bg-light border-0">
                  <div className="card-body py-3">
                    <div className="row">
                      <div className="col-md-3 text-center border-end">
                        <h4 className="text-danger mb-0">128</h4>
                        <small className="text-muted">Active Alerts</small>
                      </div>
                      <div className="col-md-3 text-center border-end">
                        <h4 className="text-success mb-0">642</h4>
                        <small className="text-muted">Approved Batches</small>
                      </div>
                      <div className="col-md-3 text-center border-end">
                        <h4 className="text-warning mb-0">37</h4>
                        <small className="text-muted">Blocked Batches</small>
                      </div>
                      <div className="col-md-3 text-center">
                        <h4 className="text-primary mb-0">24</h4>
                        <small className="text-muted">Registered Facilities</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row g-4">
              <div className="col-xl-3 col-lg-6">
                <GovernmentHeatmaps 
                  onExpand={() => handleExpand('heatmaps')} 
                  onClose={handleCloseFullScreen} 
                />
              </div>
              <div className="col-xl-3 col-lg-6">
                <GovernmentMRLGatekeeping 
                  onExpand={() => handleExpand('mrl')} 
                  onClose={handleCloseFullScreen} 
                />
              </div>
              <div className="col-xl-3 col-lg-6">
                <GovernmentFraudDetection 
                  onExpand={() => handleExpand('fraud')} 
                  onClose={handleCloseFullScreen} 
                />
              </div>
              <div className="col-xl-3 col-lg-6">
                <GovernmentAuditTrail 
                  onExpand={() => handleExpand('audit')} 
                  onClose={handleCloseFullScreen} 
                />
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'reports' && (
          <div className="card p-4">
            <h3 className="text-danger mb-4">Reports & Analytics</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">Generate Custom Report</h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Report Type</label>
                      <select className="form-select">
                        <option>Antimicrobial Usage Summary</option>
                        <option>Compliance Report</option>
                        <option>Regional Analysis</option>
                        <option>Facility Comparison</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Time Period</label>
                      <select className="form-select">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last Quarter</option>
                        <option>Custom Range</option>
                      </select>
                    </div>
                    <button className="btn btn-danger">Generate Report</button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">Recent Reports</h6>
                  </div>
                  <div className="card-body">
                    <div className="list-group list-group-flush">
                      <a href="#" className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                          <h6 className="mb-1">Monthly AMU Summary - May 2024</h6>
                          <small>3 days ago</small>
                        </div>
                        <small className="text-muted">PDF, 1.2 MB</small>
                      </a>
                      <a href="#" className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                          <h6 className="mb-1">Northern Region Compliance Report</h6>
                          <small>1 week ago</small>
                        </div>
                        <small className="text-muted">Excel, 2.4 MB</small>
                      </a>
                      <a href="#" className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                          <h6 className="mb-1">Q1 2024 Antimicrobial Resistance Analysis</h6>
                          <small>2 weeks ago</small>
                        </div>
                        <small className="text-muted">PDF, 3.7 MB</small>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="card p-4">
            <h3 className="text-danger mb-4">Dashboard Settings</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">Notification Preferences</h6>
                  </div>
                  <div className="card-body">
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" id="notify1" defaultChecked />
                      <label className="form-check-label" htmlFor="notify1">
                        Email alerts for high priority issues
                      </label>
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" id="notify2" defaultChecked />
                      <label className="form-check-label" htmlFor="notify2">
                        SMS notifications for critical alerts
                      </label>
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" id="notify3" />
                      <label className="form-check-label" htmlFor="notify3">
                        Daily summary reports
                      </label>
                    </div>
                    <button className="btn btn-sm btn-danger">Save Preferences</button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">Dashboard Configuration</h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Default View</label>
                      <select className="form-select">
                        <option>Overview</option>
                        <option>Regional Focus</option>
                        <option>Compliance Status</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Refresh Interval</label>
                      <select className="form-select">
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>Manual refresh only</option>
                      </select>
                    </div>
                    <button className="btn btn-sm btn-danger">Save Configuration</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <footer className="mt-5 pt-4 border-top text-center">
          <p className="text-muted small">
            Government Regulatory Portal &copy; {new Date().getFullYear()} - Advanced monitoring and compliance system
          </p>
        </footer>
      </div>
    </div>
  );
}

export default GovPortal;
