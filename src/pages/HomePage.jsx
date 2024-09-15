import { useState } from "react";
import Navbar from "../components/Navbar";
import { generateLyricsWithCohere } from '../api/cohereService';
import { FiClipboard } from 'react-icons/fi';

const HomePage = () => {
  const [genre, setGenre] = useState("");
  const [tempo, setTempo] = useState("");
  const [baseWords, setBaseWords] = useState("");
  const [lyrics, setLyrics] = useState([]); // Save generated lyrics as an array of sections
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Error state
  const [sectionCount, setSectionCount] = useState({ verse: 1, chorus: 1, hook: 1 }); // Track verse/chorus/hook counts
  const [hasGenerated, setHasGenerated] = useState(false); // Track if lyrics have been generated yet

  // Function to copy all lyrics to clipboard
  const handleCopyAllToClipboard = () => {
    const allLyricsText = lyrics.map(section => section.text).join('\n\n');
    navigator.clipboard.writeText(allLyricsText).then(() => {
      alert("All lyrics copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy lyrics: ", err);
    });
  };

  // Function to generate lyrics for different sections
  const handleGenerateLyrics = async (sectionType = "verse") => {
    setIsLoading(true);
    setError(""); // Clear previous error
    try {
      let prompt = `You are a songwriter creating emotionally resonant and creative lyrics for a song. The genre is ${genre}, and the lyrics should reflect this style with depth and artistic expression. The tempo is ${tempo} but should not be mentioned in the lyrics.\n\nTake inspiration from ${baseWords}, and weave them into the lyrics naturally. Avoid directly mentioning numbers like BPM or overt references to fame, drugs, or money unless they serve a deeper metaphorical purpose. Focus on conveying emotions, telling a story, and painting vivid imagery. Be poetic, heartfelt, and human-like, and avoid clichés.\n\nWrite a ${sectionType} that feels authentic, with a rich sense of emotion and rhythm. The song should feel like it comes from the heart, capturing the listener’s attention with thought-provoking language, original metaphors, and creative wordplay.`;

      // If there are existing lyrics, modify the prompt to take inspiration without repeating them
      if (lyrics.length > 0) {
        const previousSection = lyrics[lyrics.length - 1].text;
        prompt = `Write a ${sectionType} inspired by the following content without repeating it:\n\n"${previousSection}". Ensure it adds to the story of the song.`;
      }

      // Call Cohere to generate the lyrics
      const generatedLyrics = await generateLyricsWithCohere(genre, tempo, baseWords, sectionType);

      // Add the new section with a label
      const newSection = {
        type: sectionType,
        text: generatedLyrics,
        count: sectionCount[sectionType], // Use the current count for the section
      };

      // Append the new section to the lyrics array
      setLyrics((prevLyrics) => [...prevLyrics, newSection]);

      // Increment the section count for that specific section type
      setSectionCount((prevCount) => ({
        ...prevCount,
        [sectionType]: prevCount[sectionType] + 1,
      }));

      setHasGenerated(true); // Indicate that lyrics have been generated
    } catch (err) {
      console.error("Error generating lyrics:", err);
      setError(err.message || "An error occurred, please try again."); // Set the error message
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get the label for the section
  const getSectionLabel = (type, count) => {
    const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
    return `${typeCapitalized} ${count}`;
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 pt-10"
      style={{
        backgroundImage: "url('src/assets/designer (1).jpeg')", // Adjust the background image path
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
        
        {/* Form for genre, tempo, and base words */}
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
            className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold lg:py-4 py-3  rounded-lg lg:w-1/2 w-8/12 lg:text-xl text-lg transition-all duration-300 shadow-md hover:shadow-lg mt-8"
            onClick={() => handleGenerateLyrics('verse')}
            disabled={isLoading}
          >
            {isLoading ? "Generating Lyrics..." : "Generate Lyrics"}
          </button>
        </div>

        {/* Generated Lyrics or Error Message */}
        <div className="flex flex-col justify-center mt-8 p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-md">
         
        {hasGenerated && (
            <div className="flex justify-end ">
              <button
                className=" text-purple-500 -mt-2 hover:scale-125 hover:text-purple-700 transition-all duration-300"
                onClick={handleCopyAllToClipboard}
              >
                <FiClipboard size={28} />
              </button>
            </div>
          )}
         
          {lyrics.map((section, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-2xl font-bold text-purple-800  mb-2">
                {getSectionLabel(section.type, section.count)}
              </h2>
              <p className="text-gray-800 whitespace-pre-wrap">{section.text}</p>
            </div>
          ))}

          {/* Error Message */}
          {error && (
            <div className="mt-8 p-6 bg-red-100 bg-opacity-90 backdrop-blur-lg rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-red-800 mb-4">Error:</h2>
              <p className="text-red-600 max-w-xs sm:max-w-md whitespace-normal break-words mx-auto">{error}</p>
            </div>
          )}

          {/* Buttons for adding more sections */}
          {hasGenerated && (
            <div className="flex flex-col lg:space-x-20 lg:flex-row lg:justify-evenly mt-8">
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg w-full lg:w-1/3 mb-4 lg:mb-0"
                onClick={() => handleGenerateLyrics('verse')}
              >
                Add Verse
              </button>
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg w-full lg:w-1/3 mb-4 lg:mb-0"
                onClick={() => handleGenerateLyrics('chorus')}
              >
                Add Chorus
              </button>
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg w-full lg:w-1/3"
                onClick={() => handleGenerateLyrics('hook')}
              >
                Add Hook
              </button>
            </div>
          )}

          {/* Single Copy All Button */}
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
