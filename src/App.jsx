import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LyricPage from './pages/LyricPage';
import ProjectMusicPage from './pages/ProjectMusicPage';
import MagicPage from './pages/MagicPage';
import ProfilePage from './pages/ProfilePage';
import './App.css'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define routes for different pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/lyrics" element={<LyricPage />} />
        <Route path="/music/:projectId" element={<ProjectMusicPage />} />  {/* Project lyric editor */}
        <Route path="/magic" element={<MagicPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
