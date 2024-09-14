import { Configuration, OpenAIApi } from "openai";

// Load your API key from environment variables (using Vite syntax)
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Set up OpenAI configuration
const configuration = new Configuration({
  apiKey: API_KEY,
});

const openAi = new OpenAIApi(configuration);

// Function to generate lyrics
export const generateLyrics = async (genre, tempo, baseWords) => {
  const prompt = `Generate song lyrics in the ${genre} genre, with a ${tempo} tempo. Include the following base words: ${baseWords}. Make the lyrics creative and meaningful.`;

  try {
    // Call OpenAI's Chat Completion endpoint
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    // Return the generated lyrics
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating lyrics:", error);
    throw error;
  }
};
