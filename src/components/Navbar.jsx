import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();  // Get current route
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to control the mobile menu

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate("/");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle the menu state
  };

  return (
    <nav className="fixed z-20 top-0 left-0 w-full bg-gray-800 bg-opacity-20 backdrop-blur-sm p-4 border-b border-violet-800 transition-transform duration-500 ">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <img
          src="/images/LyriFusion.png"
          alt="LyriFusion Logo"
          className="h-8 w-24 md:w-32 cursor-pointer hover:scale-105 transform-all duration-500"
          onClick={handleLogoClick}
        />

        {/* Navigation links */}
        <ul className="hidden sm:flex space-x-4 md:space-x-8 items-center text-sm md:text-md lg:text-lg text-purple-500">
          <li>
            <Link to="/lyrics" className="hover:text-purple-600 hover:shadow-2xl hover:shadow-violet-400 rounded-full px-2 font-bold hover:scale-110 duration-500 transition-all">
             Lyrics
            </Link>
          </li>
          <li>
            <Link to="/magic" className="hover:text-purple-600 hover:shadow-2xl hover:shadow-violet-400 rounded-full px-2 font-bold hover:scale-110 duration-500 transition-all">
              Magic
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <img
                src="https://scontent-fra5-1.xx.fbcdn.net/v/t39.30808-1/374158312_2250670441781657_1884538649749263171_n.jpg?stp=dst-jpg_s200x200&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=K_30wo7BfQoQ7kNvgGKDE5R&_nc_ht=scontent-fra5-1.xx&_nc_gid=AC-uLAX9AkBQHuf-WBe_LJB&oh=00_AYD6Ssvg72nfM0uY8sVV4UrDD46TGT2a58Fm_MJIZ4bdTg&oe=66F0AD70"
                alt="user Picture"
                className='h-10 w-10 md:h-10 md:w-10 hover:shadow-2xl hover:shadow-violet-400 rounded-full  border-2 border-opacity-90 border-transparent backdrop-blur-lg hover:scale-110 duration-500 transition-all'
              />
            </Link>
          </li>
        </ul>

        {/* Mobile Menu button for smaller screens */}
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-purple-500 hover:text-purple-600 hover:scale-110 duration-500 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden flex flex-col items-center mt-4 space-y-4 text-purple-500 transition-all duration-500">
          <Link
            to="/lyrics"
            className="hover:text-purple-600 hover:shadow-2xl hover:shadow-violet-400 rounded-full px-2 font-bold hover:scale-110 duration-500 transition-all"
            onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
          >
            Lyrics
          </Link>
          <Link
            to="/magic"
            className="hover:text-purple-600 hover:shadow-2xl hover:shadow-violet-400 rounded-full px-2 font-bold hover:scale-110 duration-500 transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Magic
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img
              src="https://scontent-fra5-1.xx.fbcdn.net/v/t39.30808-1/374158312_2250670441781657_1884538649749263171_n.jpg?stp=dst-jpg_s200x200&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=K_30wo7BfQoQ7kNvgGKDE5R&_nc_ht=scontent-fra5-1.xx&_nc_gid=AC-uLAX9AkBQHuf-WBe_LJB&oh=00_AYD6Ssvg72nfM0uY8sVV4UrDD46TGT2a58Fm_MJIZ4bdTg&oe=66F0AD70"
              alt="user Picture"
              className='h-10 w-10 hover:shadow-2xl hover:shadow-violet-400 rounded-full border-2 border-opacity-90 border-transparent backdrop-blur-lg hover:scale-110 duration-500 transition-all'
            />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
