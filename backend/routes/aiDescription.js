// backend/routes/aiDescription.js
const express = require("express");
const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");

const router = express.Router();

router.post("/describe-spot", async (req, res) => {
  try {
    const { location, days = 2, mood = "fun and adventurous" } = req.body;

    if (!location) {
      return res.status(400).json({ error: "Location is required" });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing GROQ_API_KEY" });
    }

    const llm = new ChatOpenAI({
      apiKey,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      configuration: {
        baseURL: "https://api.groq.com/openai/v1"
      }
    });

    const prompt = ChatPromptTemplate.fromTemplate(
      `Write a short travel description for {location}.
- Tone: {mood}
- Duration: {days} days
3–5 sentences. Plain text only.`
    );

    const chain = prompt.pipe(llm).pipe(new StringOutputParser());

    const description = await chain.invoke({
      location,
      days,
      mood
    });

    res.json({ success: true, description });
  } catch (err) {
    console.error("LangChain Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate description" });
  }
});

module.exports = router;
