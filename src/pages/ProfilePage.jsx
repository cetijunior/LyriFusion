import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  // Retrieve saved projects from local storage
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
    <div className="relative min-h-screen w-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"  // z-0 keeps it behind other elements without negative values
      >
        <source src="/public/videos/background-video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h1 className="text-5xl font-bold text-white mb-12 text-center">Your Projects</h1>

      <div className="max-w-4xl mx-auto">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              className="p-6 mb-6 bg-white bg-opacity-10 backdrop-blur-md shadow-2xl rounded-xl"
            >
              <h2 className="text-3xl font-semibold text-purple-700">{project.name}</h2>
              <p className="text-gray-300 mt-2">
                Created on: {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Unknown date'}
              </p>
              <div className="mt-6 flex justify-between items-center">
                <button
                  className="bg-violet-500 hover:bg-violet-600 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
                  onClick={() => navigate(`/music/${project.id}`)}
                >
                  Open in Music Page
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-300 text-center text-lg">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
