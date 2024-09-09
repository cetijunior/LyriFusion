import { useState } from "react";
import Navbar from '../components/Navbar'; // Assuming you have the Navbar component imported

const HomePage = () => {
  const [genre, setGenre] = useState("");
  const [tempo, setTempo] = useState("");
  const [baseWords, setBaseWords] = useState("");

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('./src/assets/designer (1).jpeg')", // Update with your image path
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="text-center flex flex-col items-center mt-12">
        {/* Logo/Title */}
        <h1 className="text-5xl md:text-7xl mt-6 font-extrabold text-violet-900 mb-4">
          LyriFusion
        </h1>

        {/* Tips */}
        <div className="flex flex-col rounded-lg p-4 bg-white bg-opacity-0 mt-4 backdrop-blur-2xl border-2 text-lg text-white">
          <p className="text-2xl text-black font-bold">Getting Started</p>
          <ul className="text-start text-md text-black mt-4">
            <li>1. Select your genre.</li>
            <li>2. Set the tempo of the lyrics.</li>
            <li>3. Provide base words to generate personalized lyrics.</li>
          </ul>
        </div>
      </div>

      {/* Interactive Form Section */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto z-20 mt-8">
        <div className="p-12 rounded-lg backdrop-blur-none w-full m-2 space-y-4 pb-8 bg-transparent">
          <p className="text-black text-xl mb-12">
            Create a <span className="font-semibold">personalized</span> lyric masterpiece by selecting your preferences below.
          </p>

          {/* Input Fields in Responsive Layout */}
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 w-full">
            {/* Genre Input with Button */}
            <div className="w-full md:flex-1">
              <label className="block text-black underline w-full text-xl font-medium mb-2">
                Genre
              </label>
              <div className="flex flex-col space-y-3 items-center space-x-4">
                <input
                  className="border border-gray-400 bg-transparent backdrop-blur-lg text-white placeholder-white rounded-full w-full py-4 px-6 text-lg leading-tight focus:outline-none focus:ring-4 focus:ring-purple-400"
                  type="text"
                  placeholder="e.g., Pop, Rock"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
                <button className="border border-gray-400 bg-transparent backdrop-blur-lg text-white placeholder-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400">
                  Random Genre
                </button>
              </div>
            </div>

            {/* Tempo Input with a Slider */}
            <div className="w-full md:flex-1">
              <label className="block text-black underline w-full text-xl font-medium mb-2">
                Tempo
              </label>
              <div className="flex flex-col space-y-7 items-center space-x-4">
                <input
                  className="border border-gray-400 bg-transparent backdrop-blur-lg text-white placeholder-white rounded-full w-full py-4 px-6 text-lg leading-tight focus:outline-none focus:ring-4 focus:ring-purple-400"
                  type="text"
                  placeholder="e.g., Slow, Fast"
                  value={tempo}
                  onChange={(e) => setTempo(e.target.value)}
                />
                <input
                  type="range"
                  min="60"
                  max="200"
                  value={tempo}
                  onChange={(e) => setTempo(e.target.value)}
                  className="w-full rounded-full focus:outline-none focus:ring-transparent focus:ring-purple-400"
                />
              </div>
            </div>

            {/* Base Words Input with Toggle */}
            <div className="w-full md:flex-1">
              <label className="block text-black underline w-full text-xl font-medium mb-2">
                Base Words
              </label>
              <div className="flex flex-col items-center justify-center space-x-4">
                <input
                  className="border border-gray-400 bg-transparent backdrop-blur-lg text-white placeholder-white rounded-full w-full py-4 px-6 text-lg leading-tight focus:outline-none focus:ring-4 focus:ring-purple-400"
                  type="text"
                  placeholder="e.g., Love, Night, Dream"
                  value={baseWords}
                  onChange={(e) => setBaseWords(e.target.value)}
                />
                <div className="flex items-center justify-evenly space-x-2 w-full pt-4">
                  <button className="border border-gray-400 bg-transparent backdrop-blur-lg text-white placeholder-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400">
                    Word
                  </button>
                  <button className="border border-gray-400 bg-transparent backdrop-blur-lg text-white placeholder-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400">
                    Suggestions
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Generate Lyrics Button */}
          <button className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-700 hover:to-purple-900 text-white font-bold py-3 px-6 rounded-full w-full text-xl transition-all duration-300 shadow-md hover:shadow-xl">
            Generate Lyrics
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
