import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GlassPanel from "../components/GlassPanel.jsx";
import { useProjects } from "../context/ProjectContext.jsx";

export default function Editor() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { projects, update, remove } = useProjects();
	const project = useMemo(
		() => projects.find((p) => p.id === id),
		[projects, id]
	);

	const [title, setTitle] = useState(project?.title || "");
	const [content, setContent] = useState(project?.content || "");
	const saveTimer = useRef();

	useEffect(() => {
		if (!project) return;
		setTitle(project.title || "");
		setContent(project.content || "");
	}, [project?.id]);

	useEffect(() => {
		if (!project) return;
		// debounce autosave
		clearTimeout(saveTimer.current);
		saveTimer.current = setTimeout(() => {
			update(project.id, { title, content });
		}, 400);
		return () => clearTimeout(saveTimer.current);
	}, [title, content]);

	if (!project) {
		return (
			<GlassPanel className="p-8">
				<p className="mb-4">Project not found.</p>
				<button
					className="px-3 py-2 rounded-xl bg-white/15 border border-white/25 hover:bg-white/20"
					onClick={() => navigate("/projects")}
				>
					Back to Projects
				</button>
			</GlassPanel>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<GlassPanel className="p-6">
				<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					<input
						className="w-full md:w-[48ch] bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-lg font-medium"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<div className="flex items-center gap-2">
						<button
							className="px-3 py-2 rounded-xl bg-white/15 border border-white/25 hover:bg-white/20"
							onClick={() => navigate("/projects")}
						>
							Back
						</button>
						<button
							className="px-3 py-2 rounded-xl bg-red-500/20 border border-red-400/30 hover:bg-red-500/30"
							onClick={() => {
								remove(project.id);
								navigate("/projects");
							}}
						>
							Delete
						</button>
					</div>
				</div>
			</GlassPanel>

			<GlassPanel className="p-4">
				<label className="text-sm text-white/80">Lyrics</label>
				<textarea
					className="mt-1 w-full min-h-[60vh] bg-black/30 border border-white/20 rounded-xl p-3 focus:outline-none resize-y"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Write or paste your lyrics here…"
				/>
				<p className="text-xs text-white/60 mt-2">Autosaving…</p>
			</GlassPanel>

			<GlassPanel className="p-4">
				<h3 className="font-medium mb-2">AI Improve (coming next)</h3>
				<div className="flex flex-wrap gap-2">
					<button className="px-3 py-2 rounded-xl bg-white/15 border border-white/25 opacity-60 cursor-not-allowed">
						Make more emotional
					</button>
					<button className="px-3 py-2 rounded-xl bg-white/15 border border-white/25 opacity-60 cursor-not-allowed">
						Fit 100 BPM trap flow
					</button>
					<button className="px-3 py-2 rounded-xl bg-white/15 border border-white/25 opacity-60 cursor-not-allowed">
						Add rhyme scheme AABB
					</button>
				</div>
			</GlassPanel>
		</div>
	);
}
