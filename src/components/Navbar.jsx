const Navbar = () => {
  return (
    <nav className="fixed z-20 top-0 left-0 w-full bg-inherit backdrop-blur-sm p-4" 
      style={{ background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))" }}>
      <div className="flex justify-between items-center">
        <h1 className="cursor-pointer text-2xl font-bold text-purple-400 hover:text-purple-600 transition-colors">
          LyriFusion
        </h1>
        <ul className="flex space-x-8 text-md text-purple-400">
          <li className="cursor-pointer hover:text-purple-600 transition-colors">Music</li>
          <li className="cursor-pointer hover:text-purple-600 transition-colors">Magic</li>
          <li className="cursor-pointer hover:text-purple-600 transition-colors">Assist</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
