import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { generateLyricsWithCohere } from '../api/cohereService';
import {FiTrash2, FiClipboard, FiPlus  } from 'react-icons/fi';


import CustomSliderWithTicks from '../components/CustomSlider';
import CustomButton from '../components/CustomButton';



const genres = [
  "Pop", "Rock", "Hip-Hop", "Jazz", "Classical", "Blues", "Country",
  "Reggae", "R&B", "Electronic", "Folk", "Metal", "Soul", "Punk", "Latin",
  "Dance", "Indie", "Gospel", "Funk", "Disco", "Grunge", "Alternative",
  "Trap", "EDM", "House", "Drum & Bass", "Synthwave", "Lo-Fi", "Acoustic", 
  "Experimental", "Chillwave", "Folk-Pop", "Neo-Soul", "Psychedelic", "Ambient"
];


const commonWords = [
  "Love", "Heartbreak", "Dream", "Memories", "Moon", "Flame", "Shadow", 
  "Fire", "Rain", "Tears", "Sky", "Loneliness", "Hope", "Stars", "Echo", 
  "Light", "Waves", "Dust", "Sunset", "Storm", "Whisper", "Pain", "Ghost", 
  "Silence", "Fate", "Freedom", "Rebellion", "Passion", "Fear"
];
const wordCombinations = [
  // Love and Emotions
  "Broken heart, Sadness, Lost love",
  "Eternal love, Soulmates, Forever together",
  "First love, Innocence, Butterflies",
  "Unrequited love, Loneliness, Yearning",
  
  // Hope and Dreams
  "Dreams, Hope, Future",
  "Chasing dreams, Stars, Endless night",
  "New beginnings, Rising sun, Dawn",
  "Faith, Overcoming, Light in darkness",
  
  // Power and Ambition
  "Money, Power, Fame",
  "Ambition, Success, Fortune",
  "Victory, Leadership, Conquer",
  "Empire, Glory, Wealth",
  
  // Betrayal and Anger
  "Anger, Betrayal, Snakes",
  "Lies, Backstab, Deceit",
  "Trust, Broken, False friends",
  "Revenge, Karma, Justice",
  
  // Struggle and Perseverance
  "Struggle, Survival, Hardship",
  "Fighting, Resilience, Strength",
  "Rising again, Phoenix, Triumph",
  "Warrior, Determination, Battle scars",
  
  // Loneliness and Reflection
  "Lonely night, Silent moon, Solitude",
  "Reflection, Self-discovery, Inner thoughts",
  "Isolation, Lost, Empty roads",
  "Whispers in the dark, Forgotten, Ghosts",
  
  // Freedom and Rebellion
  "Freedom, Rebellion, Breaking chains",
  "Independence, No regrets, Free spirit",
  "Running wild, No rules, Outlaws",
  "Chasing freedom, Boundless, Open road",
  
  // Darkness and Mystery
  "Shadows, Secrets, Mystery",
  "Night, Moonlight, Dark forest",
  "Whispering winds, Hidden paths, Unknown",
  "Fog, Mist, Lost in time",
  
  // Nature and Elements
  "Ocean, Waves, Infinite horizon",
  "Fire, Flame, Burning desire",
  "Storm, Thunder, Chaos",
  "Rain, Falling leaves, Autumn breeze",
  
  // Life and Death
  "Life, Death, Circle of existence",
  "Immortality, Soul, Eternal sleep",
  "Grief, Loss, Memories",
  "Final goodbye, Rebirth, Afterlife"
];


const HomePage = () => {
  const [genre, setGenre] = useState("");
  const [tempo, setTempo] = useState("");
  const [baseWords, setBaseWords] = useState("");
  const [lyrics, setLyrics] = useState([]); // Save generated lyrics as an array of sections
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Error state
  const [sectionCount, setSectionCount] = useState({ verse: 1, chorus: 1, hook: 1 }); // Track verse/chorus/hook counts
  const [hasGenerated, setHasGenerated] = useState(false); // Track if lyrics have been generated yet
  const [showAddButtons, setShowAddButtons] = useState(false); // Control the visibility of buttons on small screens

  const handleToggleAddButtons = () => {
    setShowAddButtons(!showAddButtons); // Toggle visibility on click for small screens
  };

  const bottomRef = useRef(null);

    // Retrieve saved lyrics from localStorage when the component loads
    useEffect(() => {
      const savedLyrics = localStorage.getItem('savedLyrics');
      if (savedLyrics) {
        setLyrics(JSON.parse(savedLyrics));
        setHasGenerated(true);  // Set hasGenerated to true if there are saved lyrics
      }
    }, []);

    // Function to generate lyrics for different sections
      const handleGenerateLyrics = async (sectionType ) => {
        // Validation checks
      if (!genre || !tempo || !baseWords) {
        setError("Please fill out all fields before generating lyrics.");
        return;
      }

      if (isNaN(tempo) || tempo < 60 || tempo > 200) {
        setError("Please provide a valid tempo between 60 and 200.");
        return;
      }

      setIsLoading(true);
      setError(""); // Clear previous error
      try {
      let prompt = `You are a songwriter creating emotionally resonant and creative lyrics for a song. The genre is ${genre}, and the lyrics should reflect this style with depth and artistic expression. The tempo is ${tempo} but should not be mentioned in the lyrics.
      \n\nTake inspiration from ${baseWords}, and weave them into the lyrics naturally. Avoid directly mentioning numbers like BPM or overt references to fame, drugs, or money unless they serve a deeper metaphorical purpose. Focus on conveying emotions, telling a story, 
      and painting vivid imagery. Be poetic, heartfelt, and human-like, and avoid clichés.\n\nWrite a ${sectionType} that feels authentic, with a rich sense of emotion and rhythm. The song should feel like it comes from the heart, capturing the listener’s attention with 
      thought-provoking language, original metaphors, and creative wordplay.`;

      // If there are existing lyrics, modify the prompt to take inspiration without repeating them
      if (lyrics.length > 0) {
        const previousSection = lyrics[lyrics.length - 1].text;
        // eslint-disable-next-line no-unused-vars
        prompt = `Write a ${sectionType} inspired by the following content without repeating it:\n\n"${previousSection}". Ensure it adds to the story of the song. The ${sectionType} should seamlessly follow this content while adding a new perspective.`;
      }

      // Call Cohere to generate the lyrics
      const generatedLyrics = await generateLyricsWithCohere(genre, tempo, baseWords, sectionType);
      const newSection = {
        type: sectionType,
        text: generatedLyrics,
        count: sectionCount[sectionType],
      };

      const updatedLyrics = [...lyrics, newSection];
      setLyrics(updatedLyrics);

      // Increment the section count for that specific section type
      setSectionCount((prevCount) => ({
        ...prevCount,
        [sectionType]: prevCount[sectionType] + 1,
      }));


      localStorage.setItem('savedLyrics', JSON.stringify(updatedLyrics));

      setHasGenerated(true); // Indicate that lyrics have been generated
      } catch (err) {
      console.error("Error generating lyrics:", err);
      setError(err.message || "An error occurred, please try again."); // Set the error message
      } finally {
      setIsLoading(false);
      }
      };
  
  // Function to copy all lyrics to clipboard
  const handleCopyAllToClipboard = () => {
    const allLyricsText = lyrics.map(section => section.text).join('\n\n');
    navigator.clipboard.writeText(allLyricsText).then(() => {
      alert("All lyrics copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy lyrics: ", err);
    });
  };
  
  
  const clearSavedLyrics = () => {
    localStorage.removeItem('savedLyrics');
    setLyrics([]);
    setSectionCount({ verse: 1, chorus: 1, hook: 1 }); // Reset section counts
    setHasGenerated(false); // Reset the hasGenerated state
  };

    // Scroll to the bottom when hasGenerated is true
    useEffect(() => {
      if (hasGenerated && bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [hasGenerated]);
  
  // Helper function to get the label for the section
  const getSectionLabel = (type, count) => {
    const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
    return `${typeCapitalized} ${count}`;
  };
  
  
    // Function to handle random genre
    const handleRandomGenre = () => {
      const randomGenre = genres[Math.floor(Math.random() * genres.length)];
      setGenre(randomGenre);
    };
  
    // Function to handle Word button
    const handleWord = () => {
      const randomWord = commonWords[Math.floor(Math.random() * commonWords.length)];
      setBaseWords(randomWord);
    };
  
    // Function to handle Suggestions button
    const handleSuggestions = () => {
      const randomSuggestion = wordCombinations[Math.floor(Math.random() * wordCombinations.length)];
      setBaseWords(randomSuggestion);
    };
  
  return (
    
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-10">
      
    {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"  // z-0 keeps it behind other elements without negative values
        >
          <source src="/videos/background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

    
    {/* <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 pt-10"
      style={{
        backgroundImage: "url('/images/designer-1.jpeg')", // Ensure the correct path to the image
        backgroundSize: "cover",           // Ensures the image covers the container without stretching
        backgroundRepeat: "no-repeat",     // Prevents the image from repeating
        backgroundAttachment: "fixed",     // Keeps the background fixed during scrolling
        backgroundPosition: "center",      // Centers the background image
        backgroundBlendMode: "overlay",
      }}
    >
    */} 

      <Navbar />

      <div className="text-center pt-10 flex flex-col items-center w-full">
      {/*}
      <img
        src="/images/LyriMP.png" // Ensure this path is correct
        alt="LyriFusion Logo"
        className=""  // No height/width restriction, logo will take its original dimensions
      />
     
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-purple-800 hover:text-purple-600 mb-6 transition-all duration-500 ease-in-out">
          LyriFusion
        </h1>

         */}

        <div className="rounded-lg p-4 bg-gray-800 border-transparent lg:bg-opacity-50 bg-opacity-20 backdrop-blur-sm mt-6 border hover:scale-105 transition-transform duration-500 text-lg text-violet-700 w-full max-w-sm sm:max-w-3xl">
          <p className="text-xl font-bold ">Getting Started</p>
          <ul className="text-left text-md  mt-4 space-y-3">
            <li><span className="font-bold">1.</span> Select your genre.</li>
            <li><span className="font-bold">2.</span> Set the tempo of the lyrics.</li>
            <li><span className="font-bold">3.</span> Provide base words to generate personalized lyrics.</li>
          </ul>
        </div>
      </div>

      <div className="items-center w-full md:w-11/12 lg:w-full mx-auto mt-12">
        
        {/* Form for genre, tempo, and base words */}
        <div className="p-6 sm:p-8 rounded-xl backdrop-blur-sm bg-gray-800 lg:bg-opacity-50 bg-opacity-30 border-2 border-transparent space-y-8  lg:space-x-8 lg:py-10 lg:space-y-0 lg:flex lg:justify-between lg:items-start shadow-lg lg:hover:scale-105 lg:hover:px-16 transition-all duration-500">
          
          {/* Genre */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-3">
          <label className="block text-purple-600 lg:text-2xl md:text-xl text-lg font-Bold mb-2">
              Genre
            </label>
            <input
              className="border-2 border-transparent bg-opacity-60 backdrop-blur-sm bg-gray-800 text-white placeholder-gray-300 rounded-lg w-full py-3 px-5 text-base focus:outline-none focus:ring-2 focus:ring-purple-900 transition-all duration-300"
              type="text"
              placeholder="e.g., Pop, Rock"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />          
            <div className="flex items-center justify-center">
              <CustomButton label="Random Genre" onClick={handleRandomGenre} />
            </div>
          </div>


          {/* Tempo */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-3">
          <label className="block text-purple-600 lg:text-2xl md:text-xl text-lg font-Bold mb-2">
              Tempo
            </label>
            <input
              className="border-2 border-transparent bg-opacity-60 backdrop-blur-sm bg-gray-800 text-white placeholder-gray-300 rounded-lg w-full py-3 px-5 text-base focus:outline-none focus:ring-2 focus:ring-purple-900 transition-all duration-300"
              type="text"
              placeholder="e.g., Slow, Fast"
              value={tempo}
              onChange={(e) => setTempo(e.target.value)}
            />
            <div className="p-2">
            <CustomSliderWithTicks
              min={60}
              max={200}
              value={130}
              step={1}
              tickCount={14} // Number of tick marks
              onChange={(newValue) => setTempo(newValue)}
            />
            </div>
          </div>

          {/* Base Words */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-3">
          <label className="block text-purple-600 lg:text-2xl md:text-xl text-lg font-Bold mb-2">
              Base Words
            </label>
            <input
              className="border-2 border-transparent bg-opacity-60 backdrop-blur-sm bg-gray-800 text-white placeholder-gray-300 rounded-lg w-full py-3 px-5 text-base focus:outline-none focus:ring-2 focus:ring-purple-900 transition-all duration-300"
              type="text"
              placeholder="e.g., Love, Night, Dream"
              value={baseWords}
              onChange={(e) => setBaseWords(e.target.value)}
            />
            <div className="flex justify-evenly space-x-3">
              <CustomButton label="Word" onClick={handleWord} />
              <CustomButton label="Suggestions" onClick={handleSuggestions} />
            </div>
          </div>
        </div>



      {/* Generate Lyrics Button */}
        <div className="relative w-full flex justify-center mt-8 group">
          <button
            className="relative lg:w-1/3 md:w-1/2 sm:w-1/2 px-12 sm:px-0 h-14 flex justify-center items-center rounded-full bg-gray-800 backdrop-blur-sm bg-opacity-5 border border-gray-500 text-white font-semibold text-lg transition-all duration-500 shadow-lg hover:shadow-2xl hover:scale-105 hover:tracking-wider overflow-hidden"
            onClick={() => handleGenerateLyrics('verse')}
            disabled={isLoading}
          >
            {isLoading ? "Generating Lyrics..." : "Generate Lyrics"}

            {/* Shine effect - constrained within button */}
            <div className="absolute inset-0 z-[-1] transition-transform duration-500 overflow-hidden">
              <div className="absolute w-full h-full bg-violet-700 bg-gradient-to-r from-white/10 to-violet-900 transform -translate-x-full transition-transform duration-500 group-hover:translate-x-full"></div>
            </div>
          </button>
        </div>





        {/* Generated Lyrics or Error Message */}
        <div className="flex flex-col justify-center mt-8 p-6 mb-10 lg:hover:scale-105 lg:hover:px-16 transform-all duration-500 bg-gray-800 bg-opacity-20 backdrop-blur-sm rounded-lg shadow-md">
         
                   {/* Single Copy All Button */}

        {hasGenerated && (
            <div className="flex flex-row items-center -mt-2 justify-end space-x-3 mb-2">
              <button
                aria-label="Copy all lyrics to clipboard"
                className="text-purple-500 hover:scale-125 hover:text-purple-700 transition-all duration-300"
                onClick={handleCopyAllToClipboard}
              >
                <FiClipboard size={28} />
              </button>


                {/* Clear Lyrics Button */}
                <button
                aria-label="Clear all lyrics"
                className="text-red-500 hover:scale-125 hover:text-red-600 transition-all duration-300"
                onClick={clearSavedLyrics}
              >
                <FiTrash2 size={28} />
              </button>
              
            </div>
          )}
         
          {lyrics.map((section, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-2xl font-bold text-purple-600  mb-2">
                {getSectionLabel(section.type, section.count)}
              </h2>
              <p className="text-gray-300 whitespace-pre-wrap">{section.text}</p>
            </div>
          ))}

          {/* Error Message */}
          {error && (
            <div className="mb-8 mt-2 p-6 bg-red-100 bg-opacity-90 backdrop-blur-lg rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-red-800 mb-4">Error:</h2>
              <p className="text-red-600 max-w-xs sm:max-w-md whitespace-normal break-words mx-auto">{error}</p>
            </div>
          )}

          

    {/* Add Buttons Group */}
    {hasGenerated && (
        <div className="relative flex justify-start mt-4 group">
        <div className="relative">
          {/* Plus Icon Button */}
          <button
            className="flex items-center justify-center w-12 h-12 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-all duration-300"
            onClick={handleToggleAddButtons}
          >
            <FiPlus size={24} />
          </button>
  
          {/* Buttons for large screens (hover-based) */}
          <div className="absolute hidden lg:flex w-screen ml-10 items-center space-x-4 left-full -translate-y-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100 top-1/2">
            <div className="flex flex-row w-scree space-x-10 ">
            <CustomButton
              label="Add Verse"
              className="w-32"
              onClick={() => handleGenerateLyrics("verse")}
            />
            <CustomButton
              label="Add Chorus"
              className="w-32"
              onClick={() => handleGenerateLyrics("chorus")}
            />
            <CustomButton
              label="Add Hook"
              className="w-32"
              onClick={() => handleGenerateLyrics("hook")}
            />
            </div>
          </div>
  
           {/* Buttons for small and medium screens (click-based) */}
        <div className={`lg:hidden flex flex-col space-y-2 w-screen md:px-32 sm:px-16 md:-ml-16 sm:-ml-10 mt-4 transition-all duration-500 ${showAddButtons ? 'opacity-100 visible' : 'opacity-0 invisible h-0'}`}>
          <CustomButton
            label="Add Verse"
            className="w-full"
            onClick={() => handleGenerateLyrics("verse")}
          />
          <CustomButton
            label="Add Chorus"
            className="w-full"
            onClick={() => handleGenerateLyrics("chorus")}
          />
          <CustomButton
            label="Add Hook"
            className="w-full"
            onClick={() => handleGenerateLyrics("hook")}
          />
          </div>
        </div>
      </div>
      )}

          <div ref={bottomRef}></div>
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
