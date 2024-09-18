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
    <nav className="fixed z-20 top-0 left-0 w-full bg-gray-800 bg-opacity-20 backdrop-blur-sm p-4 border-b border-violet-800 transition-transform duration-500 ">
      <div className="flex justify-between items-center">
      <img
        src="/images/LyriFusion.png" // Ensure this path is correct
        alt="LyriFusion Logo"
        className="h-8 w-38 hover:scale-105 transform-all duration-500  "  // No height/width restriction, logo will take its original dimensions
        onClick={handleLogoClick}
      />
       
        <ul className="flex space-x-8 text-md text-purple-800">
          <li>
            <Link to="/music" className="hover:text-purple-600 duration-500 transition-colors">
              Music
            </Link>
          </li>
          <li>
            <Link to="/magic" className="hover:text-purple-600 duration-500 transition-colors">
              Magic
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-purple-600 duration-500 transition-all">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
