import OpenAI from 'openai';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const openAi = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true
});

let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 5000; // 5 seconds between requests

export const generateLyrics = async (genre, tempo, baseWords) => {
  const now = Date.now();
  if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
    throw new Error("Please wait a few seconds before trying again.");
  }

  const prompt = `Generate song lyrics in the ${genre} genre, with a ${tempo} tempo. Include the following base words: ${baseWords}. Make the lyrics creative and meaningful.`;

  try {
    lastRequestTime = now;
    const response = await openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating lyrics:", error);
    if (error.response && error.response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    throw error;
  }
};