import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router

const ProfilePage = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate(); // Used for navigating to the Music page

  // Retrieve saved projects from local storage
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(savedProjects);
  }, []);


  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(savedProjects);
  }, []);

  // Function to delete a project
  const handleDeleteProject = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  return (
    <div className="min-h-screen mt-10 p-10">
      <h1 className="text-4xl font-bold text-purple-800 mb-8">Your Projects</h1>
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.id} className="p-4 mb-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">{project.name}</h2>
            <p className="text-gray-500">
              Created on: {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Unknown date'}
            </p>
            <div className="mt-4 flex space-x-4">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
                onClick={() => navigate(`/music/${project.id}`)} // Navigate to Music Page
              >
                Open in Music Page
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                onClick={() => handleDeleteProject(project.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No projects found.</p>
      )}
    </div>
  );
};

export default ProfilePage;