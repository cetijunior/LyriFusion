import { useState } from "react";
import Navbar from "../components/Navbar";
import { generateLyrics } from "../api/api";

const HomePage = () => {
  const [genre, setGenre] = useState("");
  const [tempo, setTempo] = useState("");
  const [baseWords, setBaseWords] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Error state

  const handleGenerateLyrics = async () => {
    setIsLoading(true);
    setLyrics(""); // Clear previous lyrics
    setError(""); // Clear previous error
    try {
      const generatedLyrics = await generateLyrics(genre, tempo, baseWords);
      setLyrics(generatedLyrics);
    } catch (err) {
      console.error("Error generating lyrics:", err);
      setError(err.response?.data?.message || "An error occurred, please try again."); // Set the error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 pt-10"
      style={{
        backgroundImage: "url('./src/assets/designer (1).jpeg')",
        backgroundBlendMode: "overlay",
      }}
    >
      <Navbar />

      <div className="text-center lg:pt-0 pt-10 flex flex-col items-center w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-purple-800 mb-6 transition-all duration-500 ease-in-out">
          LyriFusion
        </h1>

        <div className="rounded-lg p-4 bg-white bg-opacity-10 backdrop-blur-lg mt-6 border border-gray-300 text-lg text-white w-full max-w-sm sm:max-w-3xl">
          <p className="text-xl text-gray-800 font-bold">Getting Started</p>
          <ul className="text-left text-md text-gray-600 mt-4 space-y-3">
            <li><span className="font-bold">1.</span> Select your genre.</li>
            <li><span className="font-bold">2.</span> Set the tempo of the lyrics.</li>
            <li><span className="font-bold">3.</span> Provide base words to generate personalized lyrics.</li>
          </ul>
        </div>
      </div>

      <div className="items-center w-full md:w-11/12 lg:w-full mx-auto mt-12">
        
        
        
        {/* Make the form a row on large screens (lg) and keep it stacked on smaller screens */}
        <div className="p-6 sm:p-8 rounded-xl backdrop-blur-lg bg-white bg-opacity-30 border border-gray-300 space-y-8 lg:space-x-8 lg:py-10 lg:space-y-0 lg:flex lg:justify-between lg:items-start shadow-lg">
          
          {/* Genre */}
          <div className="w-full lg:w-1/3 flex flex-col  space-y-3">
            <label className="block text-purple-800 text-lg font-medium mb-2">
              Genre
            </label>
            <input
              className="border-2 border-purple-400 bg-inherit text-gray-900 placeholder-gray-700 rounded-lg w-full py-3 px-5 text-base focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all duration-300"
              type="text"
              placeholder="e.g., Pop, Rock"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <div className="flex items-center justify-center">
              <button
                className="bg-purple-500 w-1/2 sm:w-1/2 items-center text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300"
                onClick={() => setGenre("Pop")} // Sample random genre logic
              >
                Random Genre
              </button>
            </div>
          </div>

          {/* Tempo */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-3">
            <label className="block text-purple-800 text-lg font-medium mb-2">
              Tempo
            </label>
            <input
              className="border-2 border-purple-400 bg-inherit text-gray-900 placeholder-gray-700 rounded-lg w-full py-3 px-5 text-base focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all duration-300"
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
              className="w-full transition-all duration-300 focus:outline-none focus:ring-transparent focus:ring-purple-400"
            />
          </div>

          {/* Base Words */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-3">
            <label className="block text-purple-800 text-lg font-medium mb-2">
              Base Words
            </label>
            <input
              className="border-2 border-purple-400 bg-inherit text-gray-900 placeholder-gray-700 rounded-lg w-full py-3 px-5 text-base focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all duration-300"
              type="text"
              placeholder="e.g., Love, Night, Dream"
              value={baseWords}
              onChange={(e) => setBaseWords(e.target.value)}
            />
            <div className="flex justify-evenly space-x-3">
              <button
                className="bg-purple-500 w-1/2 sm:w-1/3 items-center text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300"
                onClick={() => setBaseWords("Love")}
              >
                Word
              </button>
              <button
                className="bg-purple-500 w-1/2 sm:w-1/3 items-center text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300"
                onClick={() => setBaseWords("Night, Dream")}
              >
                Suggestions
              </button>
            </div>
          </div>
        </div>

        {/* Generate Lyrics Button */}
        <div className="flex items-center justify-center">
        <button
          className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold lg:py-4 py-3 rounded-lg lg:w-1/2 w-8/12 lg:text-xl text-lg transition-all duration-300 shadow-md hover:shadow-lg mt-8"
          onClick={handleGenerateLyrics}
          disabled={isLoading}
        >
          {isLoading ? "Generating Lyrics..." : "Generate Lyrics"}
        </button>
        </div>

        {/* Generated Lyrics or Error Message */}
        {lyrics ? (
          <div className="mt-8 p-6 bg-white bg-opacity-90 backdrop-blur-lg rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Generated Lyrics:</h2>
            <p className="text-gray-800 max-w-xs sm:max-w-md whitespace-pre-wrap mx-auto">{lyrics}</p>
          </div>
        ) : error && (
          <div className="mt-8 p-6 bg-red-100 bg-opacity-90 backdrop-blur-lg rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-red-800 mb-4">Error:</h2>
            <p className="text-red-600 max-w-xs sm:max-w-md whitespace-normal break-words mx-auto">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
