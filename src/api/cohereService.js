import { CohereClient } from 'cohere-ai';

const apiKey = import.meta.env.VITE_COHERE_API_KEY;
const cohere = new CohereClient({ 
  token: apiKey,
});

export const generateLyricsWithCohere = async (genre, tempo, baseWords) => {
  try {
    const prompt = `Write a song in the ${genre} genre with a ${tempo} tempo using the following words: ${baseWords}`;

    const response = await cohere.generate({
      model: 'command-xlarge-nightly',
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.7,
      stop_sequences: ['\n\n']
    });

    console.log('Cohere API Response:', response);  // Log the full response for debugging

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