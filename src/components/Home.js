import React from "react";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="text-center py-5">
			<h1 className="display-4 fw-bold text-primary mb-4">Welcome to AMR360</h1>
			<p className="lead mb-4">The ecosystem of trust for safe food and smart antimicrobial use.</p>
			<div className="row justify-content-center g-4 mb-5">
				<div className="col-12 col-md-6 col-lg-3">
					<div className="card h-100 shadow-sm">
						<div className="card-body">
							<h5 className="card-title text-primary">Farmer Portal</h5>
							<p className="card-text">Log treatments, get alerts, and earn incentives.</p>
							<Link to="/farmer" className="btn btn-primary w-100">Go to Farmer Portal</Link>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-3">
					<div className="card h-100 shadow-sm">
						<div className="card-body">
							<h5 className="card-title text-success">Veterinarian Portal</h5>
							<p className="card-text">e-Prescriptions, AI support, and tele-vet services.</p>
							<Link to="/vet" className="btn btn-success w-100">Go to Vet Portal</Link>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-3">
					<div className="card h-100 shadow-sm">
						<div className="card-body">
							<h5 className="card-title text-danger">Government Portal</h5>
							<p className="card-text">Monitor, gatekeep, and detect fraud in real time.</p>
							<Link to="/gov" className="btn btn-danger w-100">Go to Government Portal</Link>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-3">
					<div className="card h-100 shadow-sm">
						<div className="card-body">
							<h5 className="card-title text-primary">Consumer Portal</h5>
							<p className="card-text">Scan QR, verify safety, and trace products.</p>
							<Link to="/consumer" className="btn btn-primary w-100">Go to Consumer Portal</Link>
						</div>
					</div>
				</div>
			</div>
			<p className="text-muted">© 2025 AMR360. All rights reserved.</p>
		</div>
	);
}

export default Home;
