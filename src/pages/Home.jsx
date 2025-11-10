import { useState } from "react";
import GlassPanel from "../components/GlassPanel.jsx";
import AIControls from "../components/AIControls.jsx";
import { useProjects } from "../context/ProjectContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();
	const { create } = useProjects();
	const [controls, setControls] = useState({
		genre: "Pop",
		bpm: 120,
		mood: "Upbeat",
		keywords: "",
	});

	const [lyrics, setLyrics] = useState("");
	const [generating, setGenerating] = useState(false);

	function updateControls(patch) {
		setControls((prev) => ({ ...prev, ...patch }));
	}

	async function handleGenerate() {
		// API will be wired next step — for now, stub a structured prompt result
		setGenerating(true);
		const stub = `[${controls.genre} • ${controls.mood} • ${controls.bpm} BPM]
Keywords: ${controls.keywords || "(none)"}

[Verse 1]
I’m chasing echoes in the afterglow,
…

[Chorus]
You’re my midnight sun, I can’t let go,
…`;
		await new Promise((r) => setTimeout(r, 600));
		setLyrics(stub);
		setGenerating(false);
	}

	function handleClear() {
		setLyrics("");
	}

	function handleSave() {
		const title = `${controls.genre} • ${controls.mood} • ${controls.bpm}bpm`;
		const content = lyrics || "(empty)";
		const newProjectTitle = title.trim() || "Untitled";
		// create then navigate to editor
		setTimeout(() => {
			// create returns nothing (local reducer), so navigate after next tick
		}, 0);
		const maybeId =
			crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
		// create real object so we know id after reducer? We'll create & then re-read list on projects page.
		// Simpler: create and navigate to /projects; user opens the last item.
		create({ title: newProjectTitle, content });
		navigate("/projects");
	}

	return (
		<div className="flex flex-col gap-6">
			<GlassPanel className="p-6">
				<h1 className="text-2xl font-semibold mb-2">Generate Lyrics</h1>
				<p className="text-white/70 text-sm">
					Pick your vibe, then generate. Save drafts to your Projects.
				</p>
			</GlassPanel>

			<AIControls
				values={controls}
				onChange={updateControls}
				onGenerate={handleGenerate}
				generating={generating}
			/>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<GlassPanel className="p-4">
					<h2 className="font-medium mb-2">Output</h2>
					<textarea
						className="w-full h-80 bg-black/30 border border-white/20 rounded-xl p-3 focus:outline-none resize-y"
						value={lyrics}
						onChange={(e) => setLyrics(e.target.value)}
						placeholder="Generated lyrics will appear here…"
					/>
					<div className="mt-3 flex flex-wrap gap-2">
						<button
							className="px-3 py-2 rounded-xl bg-white/15 border border-white/25 hover:bg-white/20"
							onClick={handleClear}
						>
							Clear
						</button>
						<button
							className="px-3 py-2 rounded-xl bg-fuchsia-500/30 border border-fuchsia-400/40 hover:bg-fuchsia-500/40"
							onClick={handleSave}
							disabled={!lyrics.trim()}
						>
							Save to Projects
						</button>
					</div>
				</GlassPanel>

				<GlassPanel className="p-4">
					<h2 className="font-medium mb-2">Prompt Preview</h2>
					<pre className="text-sm whitespace-pre-wrap bg-black/30 border border-white/20 rounded-xl p-3">
						{`Genre: ${controls.genre}
BPM: ${controls.bpm}
Mood: ${controls.mood}
Keywords: ${controls.keywords || "(none)"}

Task: Write well-structured song lyrics (Verse/Chorus/Bridge) that match the genre, BPM feel, and mood. Use the keywords naturally.`}
					</pre>
				</GlassPanel>
			</div>
		</div>
	);
}
