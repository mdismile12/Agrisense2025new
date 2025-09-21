import React, { useState } from "react";

function ConsumerQRVerification() {
  const [qrScanned, setQrScanned] = useState(false);
  
  function simulateScan() {
    setQrScanned(true);
  }
  
  function resetScan() {
    setQrScanned(false);
  }

  return (
    <div className="mx-auto p-3" style={{ maxWidth: '600px' }}>
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        <div className="card-header bg-primary text-white text-center py-4">
          <h3 className="fw-bold mb-1">Scan for Safety</h3>
          <p className="mb-0 opacity-75">Verify product authenticity and safety information</p>
        </div>
        
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <img
              src="https://storage.googleapis.com/a1aa/image/4e5d96b8-9765-4507-0b08-2f7bc6724720.jpg"
              alt="Close-up of a hand holding a smartphone scanning a QR code on a milk packet in a grocery store"
              className="rounded-3 img-fluid shadow-sm"
              style={{maxWidth: '100%', height: 'auto', objectFit: 'contain'}}
              width="300"
              height="300"
            />
          </div>
          
          <p className="text-center text-muted mb-4">
            Scan the QR code on your product to view residue-free status, farm compliance rating, and withdrawal adherence.
          </p>
          
          <div className="text-center mb-4">
            <button
              onClick={simulateScan}
              disabled={qrScanned}
              className={`btn btn-lg px-4 py-3 fw-bold ${qrScanned ? 'btn-success disabled' : 'btn-primary'}`}
              style={{ borderRadius: '50px', minWidth: '200px' }}
            >
              {qrScanned ? (
                <>
                  <i className="fas fa-check-circle me-2"></i>QR Code Scanned
                </>
              ) : (
                <>
                  <i className="fas fa-qrcode me-2"></i>Simulate QR Scan
                </>
              )}
            </button>
          </div>
          
          {qrScanned && (
            <>
              <div className="alert alert-success text-center mb-4" role="alert">
                <i className="fas fa-shield-check me-2"></i>
                Product verified successfully! This product is safe for consumption.
              </div>
              
              <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                <div className="card-header bg-light py-3">
                  <h4 className="fw-bold text-primary mb-0">
                    <i className="fas fa-certificate me-2"></i>
                    Traceability Certificate
                  </h4>
                </div>
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-md-6">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span className="fw-bold">Product:</span>
                          <span>Organic A2 Cow Milk</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span className="fw-bold">Farm Rating:</span>
                          <span className="badge bg-success">98.7%</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span className="fw-bold">Residue Status:</span>
                          <span className="badge bg-success">Confirmed</span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span className="fw-bold">Withdrawal Adherence:</span>
                          <span className="badge bg-success">No violations</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span className="fw-bold">Farm Location:</span>
                          <span>Maharashtra, India</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span className="fw-bold">Batch Number:</span>
                          <span>M20240615-102</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-4">
                <button 
                  onClick={resetScan}
                  className="btn btn-outline-primary"
                >
                  <i className="fas fa-redo-alt me-2"></i>Scan Another Product
                </button>
              </div>
              
              <div className="mt-4 p-3 bg-light rounded-3">
                <h5 className="fw-bold mb-2">
                  <i className="fas fa-info-circle me-2 text-primary"></i>
                  What This Means For You
                </h5>
                <p className="small mb-0">
                  This verification ensures that your product comes from a farm with the highest safety standards, 
                  with no antibiotic residues, and full compliance with withdrawal periods to prevent antimicrobial resistance.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ConsumerPortal() {
  return (
    <section id="consumer" className="container py-5" tabIndex={-1}>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3">
              <i className="fas fa-qrcode me-3"></i>
              Consumer & Exporter QR Verification Portal
            </h2>
            <p className="lead text-muted">
              Empowering consumers and exporters with transparent product safety and traceability information
            </p>
          </div>
          
          <ConsumerQRVerification />
          
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="text-center p-4 h-100">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                  <i className="fas fa-shield-alt text-primary fs-3"></i>
                </div>
                <h5 className="fw-bold">Product Safety</h5>
                <p className="text-muted small">Verify that your products are free from harmful residues and antibiotics</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-4 h-100">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                  <i className="fas fa-tractor text-primary fs-3"></i>
                </div>
                <h5 className="fw-bold">Farm Transparency</h5>
                <p className="text-muted small">Access information about the farm where your product originated</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-4 h-100">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                  <i className="fas fa-globe text-primary fs-3"></i>
                </div>
                <h5 className="fw-bold">Export Compliance</h5>
                <p className="text-muted small">Ensure products meet international standards for export markets</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConsumerPortal;