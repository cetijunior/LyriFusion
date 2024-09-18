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
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/public/videos/background-video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Profile Page Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-12">
        {/* Your Projects Section */}
        <section className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-xl">
          <h2 className="text-4xl font-bold text-purple-700 mb-4 text-center">Your Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="p-6 bg-white bg-opacity-20 backdrop-blur-md shadow-md rounded-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-2xl font-semibold text-purple-600">{project.name}</h3>
                  <p className="text-gray-300 mt-2">
                    Created on: {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Unknown date'}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      className="bg-violet-500 hover:bg-violet-600 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
                      onClick={() => navigate(`/music/${project.id}`)}
                    >
                      Open
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-300 text-center col-span-full text-lg">No projects found.</p>
            )}
          </div>
        </section>

        {/* Subscription Section */}
        <section className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-xl">
          <h2 className="text-4xl font-bold text-purple-700 mb-4 text-center">Subscription</h2>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-purple-600">Current Plan: Free</h3>
              <p className="text-gray-300 mt-2">Upgrade to Premium to unlock more features.</p>
            </div>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg shadow-md mt-4 md:mt-0">
              Upgrade to Premium
            </button>
          </div>
        </section>

        {/* Account Settings Section */}
        <section className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-xl">
          <h2 className="text-4xl font-bold text-purple-700 mb-4 text-center">Account Settings</h2>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <p className="text-gray-300">Manage your account settings and preferences.</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md mt-4 md:mt-0">
              Go to Settings
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
