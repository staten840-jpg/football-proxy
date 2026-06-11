const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const SPORT_HOST = "sportapi7.p.rapidapi.com";
const SPORT_BASE = "https://sportapi7.p.rapidapi.com/api/v1";

// Bugungi va kelgusi o'yinlarni olish
app.get("/matches/:date", async (req, res) => {
  try {
    const response = await fetch(
      `${SPORT_BASE}/sport/football/scheduled-events/${req.params.date}`,
      {
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": SPORT_HOST
        }
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.error("Matches error:", e);
    res.status(500).json({ error: "Ma'lumot olinmadi" });
  }
});

// AI tahlil
app.post("/analyze", async (req, res) => {
  const { home, away } = req.body;
  if (!home || !away) {
    return res.status(400).json({ error: "home va away kerak" });
  }
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{
          role: "user",
          content: `Siz professional futbol analitikiсиз. ${home} vs ${away} o'yini uchun SofaScore Analyst uslubida tahlil bering. O'zbek tilida javob bering.

⚽ G'olib ehtimoli: ${home} ?% | Durang ?% | ${away} ?%
📊 Eng ehtimoliy natija: ?-?
🎯 Ikki jamoa gol uradi: Ha/Yo'q (?%)
📈 Joriy forma tahlili
📝 Yakuniy xulosa (2-3 gap)`
        }],
        max_tokens: 800,
        temperature: 0.7
      })
    });
    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "Tahlil olinmadi";
    res.json({ result });
  } catch (e) {
    console.error("Analyze error:", e);
    res.status(500).json({ error: "Tahlil xatosi" });
  }
});

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Football proxy ishlayapti!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy ${PORT} portda ishga tushdi!`));



