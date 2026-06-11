const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

app.get("/", (req, res) => res.json({status:"ok"}));

app.get("/matches/:date", async (req, res) => {
  try {
    const r = await fetch(`https://sportapi7.p.rapidapi.com/api/v1/sport/football/scheduled-events/${req.params.date}`,
      {headers:{"X-RapidAPI-Key":RAPIDAPI_KEY,"X-RapidAPI-Host":"sportapi7.p.rapidapi.com"}});
    res.json(await r.json());
  } catch(e) { res.status(500).json({error:"Xatolik"}); }
});

app.post("/analyze", async (req, res) => {
  const {home, away} = req.body;
  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method:"POST",
      headers:{
        "Authorization":"Bearer " + GROQ_API_KEY,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        model:"llama3-70b-8192",
        messages:[{role:"user",content:`${home} vs ${away} uchun futbol tahlili. Uzbek tilida. G'olib ehtimoli foizda, eng ehtimoliy natija, ikki jamoa gol uradi ha yoki yoq, qisqa xulosa.`}],
        max_tokens:500
      })
    });
    const d = await r.json();
    console.log("Groq response:", JSON.stringify(d));
    if(d.choices && d.choices[0]) {
      res.json({result: d.choices[0].message.content});
    } else {
      res.json({result: "Tahlil olinmadi: " + JSON.stringify(d)});
    }
  } catch(e) {
    console.error("Analyze error:", e);
    res.status(500).json({error: e.message});
  }
});

app.listen(process.env.PORT||3000, ()=>console.log("Proxy ishga tushdi!"));


