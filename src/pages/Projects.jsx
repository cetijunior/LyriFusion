import { useMemo, useState } from "react";
import GlassPanel from "../components/GlassPanel.jsx";
import { useProjects } from "../context/ProjectContext.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { useNavigate } from "react-router-dom";

export default function Projects() {
	const { projects, create, remove } = useProjects();
	const [q, setQ] = useState("");
	const navigate = useNavigate();

	const filtered = useMemo(() => {
		const t = q.trim().toLowerCase();
		if (!t) return projects;
		return projects.filter(
			(p) =>
				(p.title || "").toLowerCase().includes(t) ||
				(p.content || "").toLowerCase().includes(t)
		);
	}, [q, projects]);

	function handleNew() {
		const id = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
		const title = "Untitled";
		create({ title, content: "" });
		// Navigate to the newest by going back to list—top item is newly created
		navigate(0);
	}

	return (
		<div className="flex flex-col gap-6">
			<GlassPanel className="p-6">
				<div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
					<div>
						<h1 className="text-2xl font-semibold">Projects</h1>
						<p className="text-white/70 text-sm">Your saved lyrics & drafts</p>
					</div>
					<div className="flex items-center gap-2">
						<input
							className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 w-56"
							placeholder="Search projects…"
							value={q}
							onChange={(e) => setQ(e.target.value)}
						/>
						<button
							className="px-4 py-2 rounded-xl bg-white/15 border border-white/25 hover:bg-white/20"
							onClick={handleNew}
						>
							New
						</button>
					</div>
				</div>
			</GlassPanel>

			{filtered.length === 0 ? (
				<GlassPanel className="p-8 text-center text-white/70">
					No projects yet. Create a new one or save from the Generator.
				</GlassPanel>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{filtered.map((p) => (
						<ProjectCard key={p.id} project={p} onDelete={remove} />
					))}
				</div>
			)}
		</div>
	);
}
