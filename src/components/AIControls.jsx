export default function AIControls({
	values,
	onChange,
	onGenerate,
	generating = false,
	disabled = false,
}) {
	return (
		<div className="glass p-4 flex flex-col gap-4">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-3">
				<Field label="Genre">
					<select
						className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2"
						value={values.genre}
						onChange={(e) => onChange({ genre: e.target.value })}
					>
						<option>Pop</option>
						<option>Hip-Hop</option>
						<option>R&B</option>
						<option>Trap</option>
						<option>Country</option>
						<option>Rock</option>
						<option>Indie</option>
					</select>
				</Field>

				<Field label="Tempo (BPM)">
					<input
						type="number"
						min={60}
						max={200}
						className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2"
						value={values.bpm}
						onChange={(e) => onChange({ bpm: e.target.value })}
					/>
				</Field>

				<Field label="Mood">
					<select
						className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2"
						value={values.mood}
						onChange={(e) => onChange({ mood: e.target.value })}
					>
						<option>Emotional</option>
						<option>Upbeat</option>
						<option>Dark</option>
						<option>Chill</option>
						<option>Aggressive</option>
					</select>
				</Field>

				<Field label="Keywords">
					<input
						type="text"
						placeholder="base words, comma separated"
						className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2"
						value={values.keywords}
						onChange={(e) => onChange({ keywords: e.target.value })}
					/>
				</Field>
			</div>

			<div className="flex flex-wrap items-center gap-2">
				<button
					className="btn btn-primary"
					onClick={onGenerate}
					disabled={disabled || generating}
				>
					{generating ? "Generating…" : "Generate Lyrics"}
				</button>
			</div>
		</div>
	);
}

function Field({ label, children }) {
	return (
		<label className="flex flex-col gap-1 text-sm">
			<span className="text-white/80">{label}</span>
			{children}
		</label>
	);
}
