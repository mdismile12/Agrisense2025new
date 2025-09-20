import React, { useState } from "react";

function Navbar({ userType, onLogout }) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
<<<<<<< HEAD
	// No links or logout needed in new UI
		return (
			<header className="bg-white shadow sticky-top">
				<nav className="container d-flex align-items-center justify-content-between py-3">
					<div className="d-flex align-items-center gap-2">
						<img
							src="/argrilogo.png"
							alt="Agrisense logo"
							width="40"
							height="40"
							className="me-2 rounded"
						/>
						<span className="fs-4 fw-semibold text-primary">Agrisense Portal</span>
					</div>
				</nav>
			</header>
		);
=======
	const links = [];
	if (userType === 'vet') {
		links.push({ href: '#veterinarian', label: 'Veterinarian Portal' });
	} else if (userType === 'consumer') {
		links.push({ href: '#consumer', label: 'Consumer Portal' });
	} else if (userType === 'government') {
		links.push({ href: '#government', label: 'Government Dashboard' });
	}
	return (
		<header className="bg-white shadow sticky-top">
			<nav className="container d-flex align-items-center justify-content-between py-3">
				<div className="d-flex align-items-center gap-2">
					<img
						src="/argrilogo.png"
						alt="Agrisense logo"
						width="40"
						height="40"
						className="me-2 rounded"
					/>
					<span className="fs-4 fw-semibold text-primary">Agrisense Portal</span>
				</div>
				<ul className="d-none d-md-flex gap-4 mb-0 align-items-center">
					{links.map((link) => (
						<li key={link.href} className="nav-item">
							<a href={link.href} className="nav-link text-dark fw-medium">
								{link.label}
							</a>
						</li>
					))}
					{userType ? (
						<li>
							<button
								onClick={() => {
									onLogout();
									setMobileMenuOpen(false);
								}}
								className="btn btn-link text-danger fw-semibold"
							>
								Logout
							</button>
						</li>
					) : (
						<>
							
						</>
					)}
				</ul>
				<button
					aria-label="Toggle menu"
					className="d-md-none btn btn-outline-secondary"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				>
					<span className="fas fa-bars"></span>
				</button>
			</nav>
			{mobileMenuOpen && (
				<div className="bg-white border-top d-md-none">
					<ul className="flex-column gap-2 p-3 mb-0">
						{links.map((link) => (
							<li key={link.href} className="nav-item">
								<a
									href={link.href}
									className="nav-link text-dark fw-medium"
									onClick={() => setMobileMenuOpen(false)}
								>
									{link.label}
								</a>
							</li>
						))}
						{userType ? (
							<li>
								<button
									onClick={() => {
										onLogout();
										setMobileMenuOpen(false);
									}}
									className="btn btn-link text-danger fw-semibold"
								>
									Logout
								</button>
							</li>
						) : (
							<>
								<li>
									<a
										href="#login"
										className="nav-link text-dark fw-medium"
										onClick={() => setMobileMenuOpen(false)}
									>
										Login
									</a>
								</li>
								<li>
									<a
										href="#signup"
										className="nav-link text-dark fw-medium"
										onClick={() => setMobileMenuOpen(false)}
									>
										Signup
									</a>
								</li>
							</>
						)}
					</ul>
				</div>
			)}
		</header>
	);
>>>>>>> bf63d213a5009e3583e0edc37aab8490543c995a
}

export default Navbar;
