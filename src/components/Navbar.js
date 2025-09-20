import React, { useState } from "react";

function Navbar({ userType, onLogout }) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
}

export default Navbar;
