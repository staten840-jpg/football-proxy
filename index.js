const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";
const HOST = "sportapi7.p.rapidapi.com";

app.get("/matches/:date", async (req, res) => {
  try {
    const response = await fetch(
      `https://sportapi7.p.rapidapi.com/api/v1/sport/football/scheduled-events/${req.params.date}`,
      { headers: { "X-RapidAPI-Key": RAPIDAPI_KEY, "X-RapidAPI-Host": HOST } }
    );
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Xatolik" });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Proxy ishga tushdi!"));
