import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MagicPage from './pages/MagicPage';
import './App.css';
import { Suspense, lazy } from 'react';

// Lazy load the pages
const LyricPage = lazy(() => import('./pages/LyricPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ProjectMusicPage = lazy(() => import('./pages/ProjectMusicPage'));

function App() {
  return (
    <Router>
      <Navbar />
      {/* Wrap the Routes with Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lyrics" element={<LyricPage />} />
          <Route path="/music/:projectId" element={<ProjectMusicPage />} />  {/* Project lyric editor */}
          <Route path="/magic" element={<MagicPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
