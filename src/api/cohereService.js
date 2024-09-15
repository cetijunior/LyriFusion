import { CohereClient } from 'cohere-ai';

// Use the Cohere API key from your environment variables
const apiKey = import.meta.env.VITE_COHERE_API_KEY;
const cohere = new CohereClient({ 
  token: apiKey,
});

/**
 * Function to generate lyrics with Cohere's API
 * @param {string} genre - The genre of the song.
 * @param {string} tempo - The tempo of the song.
 * @param {string} baseWords - Base words to be included in the lyrics.
 * @param {string} sectionType - The part of the song to generate (verse, chorus, or hook).
 * @param {string} previousLyrics - The previous part of the song to build upon, if any.
 */
export const generateLyricsWithCohere = async (genre, tempo, baseWords, sectionType, previousLyrics = "") => {
  try {
    // Enhanced prompt to generate better lyrics
    let prompt = `You are a songwriter creating emotionally resonant and creative lyrics for a ${genre} song with a ${tempo} tempo. Incorporate the following words naturally: ${baseWords}. The section should be a ${sectionType} that feels authentic, poetic, and emotionally resonant. Do not mention the tempo explicitly. Be creative, avoid clichés, and create vivid imagery with metaphors.`;

    // If previous lyrics exist, ask the model to take inspiration from them without copying directly
    if (previousLyrics) {
      prompt += ` Build on the following lyrics without repeating them:\n\n"${previousLyrics}".`;
    }

    // Make the API request to Cohere
    const response = await cohere.generate({
      model: 'command-xlarge-nightly',
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.7,
      stop_sequences: ['\n\n'],
    });

    console.log('Cohere API Response:', response);  // Log the full response for debugging

    // Extract the generated lyrics text from the response
    if (response.generations && response.generations.length > 0) {
      const generatedText = response.generations[0].text;
      return generatedText.trim();
    } else {
      throw new Error('Unexpected response format from Cohere');
    }

  } catch (error) {
    console.error('Error generating lyrics with Cohere:', error);
    throw new Error('Failed to generate lyrics. Please try again.');
  }
};
