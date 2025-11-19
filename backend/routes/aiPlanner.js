// routes/aiPlanner.js
const express = require("express");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const NodeCache = require("node-cache");

const router = express.Router();
const cache = new NodeCache({ stdTTL: 600 });

// Rate limit (10/min)
router.use(rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Too many requests. Try again later." }
}));

// -----------------------------------------
// MAIN ENDPOINT
// -----------------------------------------
router.post("/test", async (req, res) => {
  try {
    const { destination, days, budget, preferences } = req.body;

    if (!destination || !days) {
      return res.status(400).json({ error: "Destination and days are required!" });
    }

    const cacheKey = `${destination}-${days}-${budget}-${preferences}`;
    const cached = cache.get(cacheKey);
    if (cached) return res.json({ ...cached, cached: true });

    const prompt = buildPrompt({ destination, days, budget, preferences });

    // 🔥 We now call GROQ, NOT Gemini
    const responseText = await callGroq(prompt);

    const parsed = safeJsonParse(responseText);
    cache.set(cacheKey, parsed);

    res.json(parsed);

  } catch (err) {
    console.error("🔥 AI Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to generate trip itinerary",
      details: err.response?.data || err.message
    });
  }
});

// -----------------------------------------
// PROMPT BUILDER
// -----------------------------------------
function buildPrompt({ destination, days, budget, preferences }) {
  return `
Generate a detailed travel itinerary in VALID JSON ONLY.

{
  "summary": string,
  "itinerary": [
    {
      "day": number,
      "title": string,
      "morning": string,
      "afternoon": string,
      "evening": string,
      "estimatedCost": string
    }
  ],
  "top_attractions": [
    { "name": string, "why": string }
  ],
  "hotel_suggestions": [
    { "name": string, "priceRange": string, "notes": string }
  ],
  "budgetEstimate": string
}

User Input:
Destination: ${destination}
Total Days: ${days}
Budget: ${budget || "Not specified"}
Preferences: ${preferences || "None"}

Return ONLY valid JSON.
`;
}

// -----------------------------------------
// JSON PARSER
// -----------------------------------------
function safeJsonParse(text) {
  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start >= 0 && end > start) {
      return JSON.parse(text.slice(start, end + 1));
    }
  } catch (error) {
    console.log("⚠ JSON Parse Failed");
  }
  return { raw: text };
}

// -----------------------------------------
// GROQ API CALL (WORKING)
// -----------------------------------------
async function callGroq(prompt) {
  const apiKey = process.env.GROQ_API_KEY;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }]
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
}

module.exports = router;
