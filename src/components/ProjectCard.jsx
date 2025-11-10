import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project, onDelete }) {
	const navigate = useNavigate();
	const updated = new Date(project.updatedAt).toLocaleString();

	return (
		<div className="glass p-4 flex flex-col gap-3 hover:scale-[1.01] transition">
			<div className="flex items-center justify-between gap-2">
				<h3 className="font-semibold line-clamp-1">
					{project.title || "Untitled"}
				</h3>
				<div className="flex items-center gap-2">
					<button
						className="text-xs px-2 py-1 rounded-lg bg-white/10 border border-white/20"
						onClick={() => navigate(`/editor/${project.id}`)}
					>
						Open
					</button>
					<button
						className="text-xs px-2 py-1 rounded-lg bg-red-500/20 border border-red-400/30 hover:bg-red-500/30"
						onClick={() => onDelete(project.id)}
					>
						Delete
					</button>
				</div>
			</div>
			<p className="text-white/70 text-xs">Updated: {updated}</p>
			<p className="text-white/80 text-sm line-clamp-3 whitespace-pre-wrap">
				{project.content || "No content yet…"}
			</p>
		</div>
	);
}
