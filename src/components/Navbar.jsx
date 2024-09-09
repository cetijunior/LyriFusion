const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-sm p-5">
      <div className="flex justify-between items-center">
        <h1 className="cursor-pointer text-2xl font-bold text-gray-500 hover:text-black transition-colors">LyriFusion</h1>
        <ul className="flex space-x-8 text-md text-gray-500">
          <li className="cursor-pointer hover:text-black transition-colors">Music</li>
          <li className="cursor-pointer hover:text-black transition-colors">Magic</li>
          <li className="cursor-pointer hover:text-black transition-colors">Assist</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
