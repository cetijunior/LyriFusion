import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from "react";
import { v4 as uuid } from "uuid";

const ProjectContext = createContext();

const initialState = {
	projects: [],
};

function reducer(state, action) {
	switch (action.type) {
		case "LOAD":
			return { ...state, projects: action.payload || [] };
		case "CREATE": {
			const project = {
				id: uuid(),
				title: action.title || "Untitled",
				content: action.content || "",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			return { ...state, projects: [project, ...state.projects] };
		}
		case "UPDATE": {
			const { id, updates } = action;
			const projects = state.projects.map((p) =>
				p.id === id
					? { ...p, ...updates, updatedAt: new Date().toISOString() }
					: p
			);
			return { ...state, projects };
		}
		case "DELETE": {
			return {
				...state,
				projects: state.projects.filter((p) => p.id !== action.id),
			};
		}
		default:
			return state;
	}
}

export function ProjectProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	// Load from localStorage
	useEffect(() => {
		const raw = localStorage.getItem("lyrifusion_projects");
		if (raw) dispatch({ type: "LOAD", payload: JSON.parse(raw) });
	}, []);

	// Persist to localStorage
	useEffect(() => {
		localStorage.setItem("lyrifusion_projects", JSON.stringify(state.projects));
	}, [state.projects]);

	const actions = useMemo(
		() => ({
			create: ({ title, content }) =>
				dispatch({ type: "CREATE", title, content }),
			update: (id, updates) => dispatch({ type: "UPDATE", id, updates }),
			remove: (id) => dispatch({ type: "DELETE", id }),
		}),
		[]
	);

	return (
		<ProjectContext.Provider value={{ ...state, ...actions }}>
			{children}
		</ProjectContext.Provider>
	);
}

export function useProjects() {
	const ctx = useContext(ProjectContext);
	if (!ctx) throw new Error("useProjects must be used within ProjectProvider");
	return ctx;
}
