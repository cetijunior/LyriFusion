import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Navbar() {
	const location = useLocation();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	function closeMenu() {
		setOpen(false);
	}

	return (
		<header className="sticky top-0 z-40 nav-surface">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
				{/* Brand */}
				<button
					onClick={() => {
						navigate("/");
						closeMenu();
					}}
					className="flex items-center gap-2 group"
					aria-label="Go to home"
				>
					<img
						src="/logo.png"
						alt="LyriFusion Logo"
						className="size-10 rounded-full"
					/>
					<span
						className="font-semibold tracking-tight"
						style={{ color: "var(--text)" }}
					>
						Lyri<span className="text-fuchsia-600">Fusion</span>
					</span>
				</button>

				{/* Desktop nav */}
				<nav className="hidden md:flex items-center gap-2 text-sm">
					<NavItem to="/" label="Generate" currentPath={location.pathname} />
					<NavItem
						to="/projects"
						label="Projects"
						currentPath={location.pathname}
					/>
					<NavItem
						to="/settings"
						label="Settings"
						currentPath={location.pathname}
					/>
					<ThemeToggle />
				</nav>

				{/* Mobile controls */}
				<div className="md:hidden flex items-center gap-2">
					<ThemeToggle />
					<button
						onClick={() => setOpen((v) => !v)}
						className="btn"
						aria-label="Open menu"
						aria-expanded={open}
						aria-controls="mobile-menu"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
							<path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
						</svg>
					</button>
				</div>
			</div>

			{/* Mobile dropdown */}
			{open && (
				<div id="mobile-menu" className="md:hidden px-4 sm:px-6 lg:px-8 pb-4">
					<div className="glass p-2">
						<MobileLink
							to="/"
							onClick={closeMenu}
							active={location.pathname === "/"}
						>
							Generate
						</MobileLink>
						<MobileLink
							to="/projects"
							onClick={closeMenu}
							active={location.pathname === "/projects"}
						>
							Projects
						</MobileLink>
						<MobileLink
							to="/settings"
							onClick={closeMenu}
							active={location.pathname === "/settings"}
						>
							Settings
						</MobileLink>
					</div>
				</div>
			)}
		</header>
	);
}

function NavItem({ to, label, currentPath }) {
	const active = currentPath === to;
	return (
		<NavLink
			to={to}
			className={`px-3 py-2 rounded-xl text-sm border transition`}
			style={{
				color: "var(--text)",
				background: active ? "var(--btn-surface)" : "transparent",
				borderColor: active ? "var(--btn-border)" : "transparent",
			}}
		>
			{label}
		</NavLink>
	);
}

function MobileLink({ to, children, active, onClick }) {
	return (
		<NavLink
			to={to}
			onClick={onClick}
			className="block px-3 py-2 rounded-xl border transition"
			style={{
				color: "var(--text)",
				background: active ? "var(--btn-surface)" : "transparent",
				borderColor: active ? "var(--btn-border)" : "transparent",
			}}
		>
			{children}
		</NavLink>
	);
}
