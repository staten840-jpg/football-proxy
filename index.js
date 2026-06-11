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
    const r = await fetch(`https://sportapi7.p.rapidapi.com/api/v1/sport/football/scheduled-events/${req.params.date}`, {headers:{"X-RapidAPI-Key":RAPIDAPI_KEY,"X-RapidAPI-Host":"sportapi7.p.rapidapi.com"}});
    res.json(await r.json());
  } catch(e) { res.status(500).json({error:"Xatolik"}); }
});
app.post("/analyze", async (req, res) => {
  const {home, away} = req.body;
  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {method:"POST",headers:{"Authorization":`Bearer ${GROQ_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:"llama-3.3-70b-versatile",messages:[{role:"user",content:`${home} vs ${away} uchun SofaScore uslubida tahlil. Uzbek tilida. G'olib ehtimoli, natija, ikki jamoa gol uradi, xulosa.`}],max_tokens:800})});
    const d = await r.json();
    res.json({result:d.choices?.[0]?.message?.content||"Tahlil olinmadi"});
  } catch(e) { res.status(500).json({error:"Xatolik"}); }
});
app.listen(process.env.PORT||3000, ()=>console.log("Proxy ishga tushdi!"));

