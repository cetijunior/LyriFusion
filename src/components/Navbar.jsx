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
        className="h-8 w-38 cursor-pointer hover:scale-105 transform-all duration-500  "  // No height/width restriction, logo will take its original dimensions
        onClick={handleLogoClick}
      />
       
        <ul className="flex space-x-8 items-center text-md text-purple-500">
          <li>
            <Link to="/lyrics" className="hover:text-purple-600 hover:shadow-2xl hover:shadow-violet-400 rounded-full px-2 font-bold hover:scale-110 duration-500 transition-all">
             Lyric
            </Link>
          </li>
          <li>
            <Link to="/magic" className="hover:text-purple-600 hover:shadow-2xl hover:shadow-violet-400 rounded-full px-2 font-bold hover:scale-110 duration-500 transition-all">
              Magic
            </Link>
          </li>
            <Link to="/profile">
              <img
                src="https://scontent-fra5-1.xx.fbcdn.net/v/t39.30808-1/374158312_2250670441781657_1884538649749263171_n.jpg?stp=dst-jpg_s200x200&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=K_30wo7BfQoQ7kNvgGKDE5R&_nc_ht=scontent-fra5-1.xx&_nc_gid=AC-uLAX9AkBQHuf-WBe_LJB&oh=00_AYD6Ssvg72nfM0uY8sVV4UrDD46TGT2a58Fm_MJIZ4bdTg&oe=66F0AD70" // Ensure this path is correct
                alt="user Picture"
                className='h-10 w-10 hover:shadow-2xl hover:shadow-violet-400 rounded-full ppx-2 border-2 border-opacity-90 border-transparent backdrop-blur-lg hover:scale-110 duration-500 transition-all'
              />
            </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
