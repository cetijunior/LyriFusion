import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();  // Get current route

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      // If already on the homepage, just scroll to the top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If not on the homepage, navigate to it
      navigate("/");
    }
  };

  return (
    <nav className="fixed z-20 top-0 left-0 w-full bg-inherit backdrop-blur-sm p-4" 
      style={{ background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))" }}>
      <div className="flex justify-between items-center">
        <h1
          className="cursor-pointer text-2xl font-bold text-purple-800 hover:text-purple-900 transition-colors"
          onClick={handleLogoClick}
        >
          LyriFusion
        </h1>
        <ul className="flex space-x-8 text-md text-purple-600">
          <li>
            <Link to="/music" className="hover:text-purple-900 transition-colors">
              Music
            </Link>
          </li>
          <li>
            <Link to="/magic" className="hover:text-purple-900 transition-colors">
              Magic
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-purple-900 transition-colors">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
