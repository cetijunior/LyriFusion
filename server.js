import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { Configuration, OpenAIApi } from "openai";


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

app.post("/generate-lyrics", async (req, res) => {
  const { genre, tempo, baseWords } = req.body;
  const prompt = `Generate song lyrics in the ${genre} genre, with a ${tempo} tempo. Include the following base words: ${baseWords}.`;

  try {
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    res.json({ lyrics: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error generating lyrics:", error);
    res.status(500).json({ error: "Error generating lyrics" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
