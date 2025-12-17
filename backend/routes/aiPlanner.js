const express = require("express");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const NodeCache = require("node-cache");

const router = express.Router();
const cache = new NodeCache({ stdTTL: 600 });

// --------------------
// RATE LIMIT
// --------------------
router.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: { error: "Too many requests. Try again later." }
  })
);

// --------------------
// MAIN ENDPOINT
// --------------------
router.post("/test", async (req, res) => {
  try {
    const { destination, days, budget, preferences } = req.body;

    // ✅ STRICT INPUT VALIDATION
    if (!destination || typeof destination !== "string") {
      return res.status(400).json({ error: "Destination is required" });
    }

    if (!days || isNaN(days) || Number(days) <= 0) {
      return res.status(400).json({ error: "Days must be a positive number" });
    }

    // ✅ NORMALIZE INPUT
    const normalized = {
      destination: destination.trim(),
      days: Number(days),
      budget: budget ? Number(budget) : undefined,
      preferences: preferences?.trim()
    };

    // ✅ SAFE CACHE KEY
    const cacheKey = JSON.stringify(normalized);
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    const prompt = buildPrompt(normalized);

    // ✅ CALL GROQ
    const responseText = await callGroq(prompt);

    const parsed = safeJsonParse(responseText);

    // ❌ IF AI BREAKS JSON → FAIL FAST
    if (!parsed.itinerary || !Array.isArray(parsed.itinerary)) {
      console.error("❌ INVALID AI OUTPUT:", responseText);
      return res.status(500).json({
        error: "AI returned invalid format"
      });
    }

    cache.set(cacheKey, parsed);
    res.json(parsed);

  } catch (err) {
    console.error("🔥 AI ERROR:", err.response?.data || err.message);

    res.status(500).json({
      error: "Failed to generate trip itinerary",
      details: err.response?.data || err.message
    });
  }
});

// --------------------
// PROMPT BUILDER
// --------------------
function buildPrompt({ destination, days, budget, preferences }) {
  return `
You are a STRICT JSON API.
Output ONLY valid JSON.
NO explanations.
NO markdown.

Schema:
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

Input:
Destination: ${destination}
Days: ${days}
Budget: ${budget || "Not specified"}
Preferences: ${preferences || "None"}

Return ONLY JSON.
`;
}

// --------------------
// SAFE JSON PARSER
// --------------------
function safeJsonParse(text) {
  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end !== -1) {
      return JSON.parse(text.slice(start, end + 1));
    }
  } catch (err) {
    console.error("⚠ JSON PARSE FAILED");
  }
  return {};
}

// --------------------
// GROQ API CALL
// --------------------
async function callGroq(prompt) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY not set");
  }

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: "You are a JSON-only response generator."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      timeout: 20000
    }
  );

  return response.data.choices[0].message.content;
}

module.exports = router;
