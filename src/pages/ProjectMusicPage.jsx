import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight, faListOl, faListUl, faPalette } from '@fortawesome/free-solid-svg-icons';

const ProjectMusicPage = () => {
  const { projectId } = useParams(); // Get projectId from URL
  const navigate = useNavigate();
  const editorRef = useRef(null);
  
  const [project, setProject] = useState(null); // Store the project
  const [lyrics, setLyrics] = useState(''); // Editable lyrics content (HTML)
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  // Load the project from localStorage using the projectId
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const currentProject = savedProjects.find((proj) => proj.id === projectId);
    if (currentProject) {
      setProject(currentProject);
      setLyrics(currentProject.lyrics); // Set lyrics as HTML string for editing
    }
  }, [projectId]);

  // Update the editor content when lyrics change
  useEffect(() => {
    if (editorRef.current && lyrics) {
      editorRef.current.innerHTML = lyrics; // Set the editor content as HTML
      updateWordAndCharCount(); // Update word/char counts
    }
  }, [lyrics]);

  // Handle text formatting (bold, italic, underline, etc.)
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  // Update word and character count based on editable text
  const updateWordAndCharCount = () => {
    const text = editorRef.current?.innerText || "";
    setWordCount(text.split(/\s+/).filter((word) => word.length > 0).length);
    setCharCount(text.length);
  };

  // Handle content changes manually (without re-rendering on every keystroke)
  const handleContentChange = () => {
    updateWordAndCharCount();
  };

  // Save the project with updated lyrics
  const saveProject = () => {
    const updatedProject = {
      ...project,
      lyrics: editorRef.current.innerHTML, // Save the HTML content as a string
    };

    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const updatedProjects = savedProjects.map((proj) => (proj.id === project.id ? updatedProject : proj));
    localStorage.setItem('projects', JSON.stringify(updatedProjects));

    alert('Project saved successfully!');
    navigate('/profile'); // Redirect to profile
  };

  // Render content
  if (!project) {
    return <p>Loading project...</p>;
  }

  return (
    <div className="relative min-h-screen w-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] video"  // z-0 keeps it behind other elements without negative values
      >
        <source src="/public/videos/background-video3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h1 className="text-4xl font-bold text-purple-800 mb-6">Music Editor</h1>

      {/* Toolbar for text formatting */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 my-4 p-3 rounded-lg shadow-md backdrop-blur-lg bg-white bg-opacity-20">
        {/* First row for formatting buttons */}
        <div className="flex flex-wrap space-x-4 mb-4 sm:mb-0">
          <button className="p-2 hover:bg-gray-200 hover:bg-opacity-50 rounded" onClick={() => formatText('bold')}>
            <FontAwesomeIcon icon={faBold} size="lg" />
          </button>
          <button className="p-2 hover:bg-gray-200 hover:bg-opacity-50 rounded" onClick={() => formatText('italic')}>
            <FontAwesomeIcon icon={faItalic} size="lg" />
          </button>
          <button className="p-2 hover:bg-gray-200 hover:bg-opacity-50 rounded" onClick={() => formatText('underline')}>
            <FontAwesomeIcon icon={faUnderline} size="lg" />
          </button>
          <button className="p-2 hover:bg-gray-200 hover:bg-opacity-50 rounded" onClick={() => formatText('justifyLeft')}>
            <FontAwesomeIcon icon={faAlignLeft} size="lg" />
          </button>
          <button className="p-2 hover:bg-gray-200 hover:bg-opacity-50 rounded" onClick={() => formatText('justifyCenter')}>
            <FontAwesomeIcon icon={faAlignCenter} size="lg" />
          </button>
          <button className="p-2 hover:bg-gray-200 hover:bg-opacity-50 rounded" onClick={() => formatText('justifyRight')}>
            <FontAwesomeIcon icon={faAlignRight} size="lg" />
          </button>
        </div>

        {/* Second row for lists and color */}
        <div className="flex flex-wrap space-x-4">
          <button className="p-2 hover:bg-gray-200 hover:bg-opacity-50 rounded" onClick={() => formatText('insertOrderedList')}>
            <FontAwesomeIcon icon={faListOl} size="lg" />
          </button>
          <button className="p-2 hover:bg-gray-200 hover:bg-opacity-50 rounded" onClick={() => formatText('insertUnorderedList')}>
            <FontAwesomeIcon icon={faListUl} size="lg" />
          </button>
          <label className="p-2 hover:bg-gray-200 hover:bg-opacity-50 rounded cursor-pointer">
            <FontAwesomeIcon icon={faPalette} size="lg" />
            <input
              type="color"
              onChange={(e) => formatText('foreColor', e.target.value)}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Editable Text Area */}
      <div
        ref={editorRef}
        className="w-full sm:w-3/4 min-h-[400px] sm:min-h-[500px] p-6 bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg border border-gray-200 text-lg overflow-auto resize-none"
        contentEditable
        suppressContentEditableWarning={true}
        onInput={handleContentChange}
        style={{
          minHeight: '500px',
          width: '90%',
          maxWidth: '800px',
          lineHeight: '1.6',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          border: '2px solid #e5e7eb',
          backdropFilter: 'blur(10px)',
        }}
      >
        {lyrics}
      </div>

      {/* Word and Character Count */}
      <div className="flex justify-between w-full max-w-2xl mt-4 text-gray-500">
        <span>Word Count: {wordCount}</span>
        <span>Character Count: {charCount}</span>
      </div>

      {/* Save Project Button */}
      <div className="mt-6">
        <button
          onClick={saveProject}
          className="bg-blue-500 text-white px-6 mb-10 py-3 rounded-lg hover:bg-blue-600 transition-all shadow-md"
        >
          Save Project
        </button>
      </div>
    </div>
  );
};

export default ProjectMusicPage;
