
import React, { useState } from "react";

function ConsumerQRVerification() {
  const [qrScanned, setQrScanned] = useState(false);
  function simulateScan() {
    setQrScanned(true);
  }
  return (
    <div className="mx-auto" style={{ maxWidth: 500 }}>
      <img
        src="https://storage.googleapis.com/a1aa/image/4e5d96b8-9765-4507-0b08-2f7bc6724720.jpg"
        alt="Close-up of a hand holding a smartphone scanning a QR code on a milk packet in a grocery store"
<<<<<<< HEAD
        className="mb-4 rounded img-fluid d-block mx-auto"
        style={{maxWidth:'100%',height:'auto',objectFit:'contain'}}
=======
        className="mx-auto mb-4 rounded"
>>>>>>> bf63d213a5009e3583e0edc37aab8490543c995a
        width="300"
        height="300"
      />
      <div className="card border border-primary shadow p-4 text-center">
        <h3 className="fs-4 fw-bold text-primary mb-3">Scan for Safety</h3>
        <p className="text-secondary mb-3">
          Scan the QR code on your product to view residue-free status, farm compliance rating, and withdrawal adherence.
        </p>
        <button
          onClick={simulateScan}
          disabled={qrScanned}
          className={`btn btn-primary px-4 py-2 ${qrScanned ? 'disabled' : ''}`}
        >
          {qrScanned ? 'QR Code Scanned' : 'Simulate QR Scan'}
        </button>
        {qrScanned && (
          <div className="mt-4 card border border-primary p-3 text-start">
            <h4 className="fw-bold text-primary mb-2">Traceability Certificate</h4>
            <ul className="list-group">
              <li className="list-group-item"><strong>Product:</strong> Organic A2 Cow Milk</li>
              <li className="list-group-item"><strong>Farm Compliance Rating:</strong> 98.7%</li>
              <li className="list-group-item"><strong>Residue-Free Status:</strong> Confirmed</li>
              <li className="list-group-item"><strong>Withdrawal Adherence:</strong> No violations in last 6 months</li>
              <li className="list-group-item"><strong>Farm Location:</strong> Maharashtra, India</li>
              <li className="list-group-item"><strong>Batch Number:</strong> M20240615-102</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function ConsumerPortal() {
  return (
    <section id="consumer" className="bg-white rounded shadow p-4" tabIndex={-1}>
      <h2 className="fs-2 fw-bold text-primary mb-4 d-flex align-items-center gap-2">
        <i className="fas fa-shopping-cart"></i>
        <span>Consumer & Exporter QR Verification Portal</span>
      </h2>
      <p className="mb-4 text-secondary">Empower consumers and exporters with transparent product safety and traceability.</p>
      <ConsumerQRVerification />
    </section>
  );
}

export default ConsumerPortal;
