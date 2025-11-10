import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Editor from "./pages/Editor.jsx";
import Settings from "./pages/Settings.jsx";

export default function App() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/editor/:id" element={<Editor />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</main>
			<footer className="py-8 text-center text-xs text-white/50">
				LyriFusion • v0.1 MVP
			</footer>
		</div>
	);
}
