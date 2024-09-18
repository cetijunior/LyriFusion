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
    <div className="min-h-screen mt-20 flex flex-col items-center justify-start p-6">
      <h1 className="text-4xl font-bold text-purple-800 mb-6">{project.name}</h1>

      {/* Toolbar for text formatting */}
      <div className="flex space-x-4 my-4 bg-gray-100 p-3 rounded-lg shadow-md">
        <button className="p-2 hover:bg-gray-200 rounded" onClick={() => formatText('bold')}>
          <FontAwesomeIcon icon={faBold} size="lg" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" onClick={() => formatText('italic')}>
          <FontAwesomeIcon icon={faItalic} size="lg" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" onClick={() => formatText('underline')}>
          <FontAwesomeIcon icon={faUnderline} size="lg" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" onClick={() => formatText('justifyLeft')}>
          <FontAwesomeIcon icon={faAlignLeft} size="lg" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" onClick={() => formatText('justifyCenter')}>
          <FontAwesomeIcon icon={faAlignCenter} size="lg" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" onClick={() => formatText('justifyRight')}>
          <FontAwesomeIcon icon={faAlignRight} size="lg" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" onClick={() => formatText('insertOrderedList')}>
          <FontAwesomeIcon icon={faListOl} size="lg" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" onClick={() => formatText('insertUnorderedList')}>
          <FontAwesomeIcon icon={faListUl} size="lg" />
        </button>
        <label className="p-2 hover:bg-gray-200 rounded cursor-pointer">
          <FontAwesomeIcon icon={faPalette} size="lg" />
          <input
            type="color"
            onChange={(e) => formatText('foreColor', e.target.value)}
            className="hidden"
          />
        </label>
      </div>

      {/* Editable Text Area */}
      <div
        ref={editorRef}
        className="w-3/4 min-h-[500px] p-6 bg-white shadow-lg rounded-lg border border-gray-200 text-lg overflow-auto resize-none"
        contentEditable
        suppressContentEditableWarning={true}
        onInput={handleContentChange}
        style={{
          minHeight: '500px',
          width: '70%',
          maxWidth: '800px',
          lineHeight: '1.6',
          padding: '20px',
          backgroundColor: '#fafafa',
          border: '2px solid #e5e7eb',
        }}
      />

      {/* Word and Character Count */}
      <div className="flex justify-between w-full max-w-2xl mt-4 text-gray-500">
        <span>Word Count: {wordCount}</span>
        <span>Character Count: {charCount}</span>
      </div>

      {/* Save Project Button */}
      <div className="mt-6">
        <button
          onClick={saveProject}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all shadow-md"
        >
          Save Project
        </button>
      </div>
    </div>
  );
};

export default ProjectMusicPage;
