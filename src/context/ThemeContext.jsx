import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(() => {
		const saved = localStorage.getItem("lyrifusion_theme");
		if (saved) return saved;
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	});

	useEffect(() => {
		const root = document.documentElement; // <html>
		if (theme === "dark") root.setAttribute("data-theme", "dark");
		else root.removeAttribute("data-theme");
		localStorage.setItem("lyrifusion_theme", theme);
	}, [theme]);

	const value = useMemo(
		() => ({
			theme,
			isDark: theme === "dark",
			toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
			setLight: () => setTheme("light"),
			setDark: () => setTheme("dark"),
		}),
		[theme]
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
	return ctx;
}
