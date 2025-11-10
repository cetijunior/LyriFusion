import GlassPanel from "../components/GlassPanel.jsx";
import { useProjects } from "../context/ProjectContext.jsx";

export default function Settings() {
	const { projects } = useProjects();

	function handleExport() {
		const blob = new Blob([JSON.stringify(projects, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const a = Object.assign(document.createElement("a"), {
			href: url,
			download: "lyrifusion-projects.json",
		});
		a.click();
		URL.revokeObjectURL(url);
	}

	return (
		<div className="flex flex-col gap-6">
			<GlassPanel className="p-6">
				<h1 className="text-2xl font-semibold mb-2">Settings</h1>
				<p className="text-white/70 text-sm">
					Basic controls for your workspace.
				</p>
			</GlassPanel>

			<GlassPanel className="p-6 flex flex-col gap-3">
				<h2 className="font-medium">Data</h2>
				<div className="flex flex-wrap gap-2">
					<button
						className="px-3 py-2 rounded-xl bg-white/15 border border-white/25 hover:bg-white/20"
						onClick={handleExport}
					>
						Export Projects (JSON)
					</button>
				</div>
				<p className="text-xs text-white/60">
					Import will be added later (after Supabase schema).
				</p>
			</GlassPanel>
		</div>
	);
}
