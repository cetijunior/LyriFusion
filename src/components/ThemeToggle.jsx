import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle({ className = "" }) {
	const { isDark, toggle } = useTheme();

	return (
		<button
			onClick={toggle}
			className={`px-3 py-2 rounded-xl border transition
        bg-[rgba(255,255,255,0.6)] border-[color:var(--panel-border)] hover:bg-white
        text-[color:var(--text)] ${className}`}
			aria-label="Toggle light/dark theme"
			title={`Switch to ${isDark ? "light" : "dark"} mode`}
		>
			<span className="inline-flex items-center gap-2">
				{isDark ? (
					<>
						{/* Sun icon */}
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="opacity-90"
						>
							<path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.79-1.8 1.41 1.41-1.8 1.79-1.4-1.4zM12 4V1h-0v3h0zm0 19h0v-3h0v3zM4 13H1v-0h3v0zm22 0v0h-3v0h3zM6.76 19.16l-1.42 1.42-1.79-1.8 1.41-1.41 1.8 1.79zm13.89-0.38l-1.41 1.41-1.8-1.79 1.42-1.42 1.79 1.8zM12 8a4 4 0 100 8 4 4 0 000-8z" />
						</svg>
						Light
					</>
				) : (
					<>
						{/* Moon icon */}
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="opacity-90"
						>
							<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
						</svg>
						Dark
					</>
				)}
			</span>
		</button>
	);
}
