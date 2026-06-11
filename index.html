<!DOCTYPE html>
<html lang="uz">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<title>⚽ Futbol AI</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
body { background: #080f17; font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #fff; max-width: 430px; margin: 0 auto; min-height: 100vh; padding-bottom: 20px; }

/* HEADER */
.header { background: linear-gradient(180deg, #0a1628 0%, #080f17 100%); padding: 20px 16px 14px; border-bottom: 1px solid #1e2d3d; position: sticky; top: 0; z-index: 10; }
.header h1 { color: #00ff88; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
.header p { color: #445566; font-size: 12px; margin-top: 3px; }

/* LEAGUES */
.leagues { overflow-x: auto; padding: 12px 16px; display: flex; gap: 8px; scrollbar-width: none; }
.leagues::-webkit-scrollbar { display: none; }
.lg-btn { white-space: nowrap; padding: 7px 14px; border-radius: 20px; border: none; background: #1a2535; color: #667788; font-size: 12px; cursor: pointer; font-weight: 500; transition: all 0.2s; }
.lg-btn.active { background: #00ff88; color: #000; font-weight: 700; }

/* TABS */
.tabs { display: flex; padding: 0 16px; gap: 8px; margin-bottom: 12px; }
.tab-btn { flex: 1; padding: 8px 0; border-radius: 10px; border: none; background: #0f1923; color: #445566; font-size: 13px; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
.tab-btn.active { background: #1a3a2a; color: #00ff88; font-weight: 700; border-bottom: 2px solid #00ff88; }

/* MATCHES */
.matches { padding: 0 16px; }
.match-card { background: #0f1923; border: 1px solid #1e2d3d; border-radius: 14px; padding: 14px 16px; margin-bottom: 10px; }
.match-card.live { background: linear-gradient(135deg, #0f2027, #1a3a2a); border-color: #00ff88; }
.match-date { font-size: 11px; color: #445566; margin-bottom: 10px; letter-spacing: 0.5px; }
.match-date.live-text { color: #00ff88; font-weight: 600; }
.match-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.team { flex: 1; font-size: 13px; font-weight: 600; color: #ddeeff; line-height: 1.3; }
.team.away { text-align: right; }
.score-box { padding: 6px 12px; background: #ffffff0f; border-radius: 8px; color: #889; font-weight: 700; font-size: 17px; min-width: 58px; text-align: center; flex-shrink: 0; }
.score-box.live { background: #00ff8818; color: #00ff88; }
.analyze-btn { margin-top: 12px; width: 100%; padding: 9px 0; background: linear-gradient(90deg, #1a5e36, #0d3d22); color: #00ff88; border: 1px solid #00ff8830; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; transition: opacity 0.2s; }
.analyze-btn:active { opacity: 0.7; }

/* STATES */
.state { text-align: center; padding: 50px 20px; color: #334455; }
.state .icon { font-size: 36px; margin-bottom: 12px; }
.state p { font-size: 14px; }

/* MODAL */
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: flex-end; z-index: 100; backdrop-filter: blur(4px); }
.modal { background: #0d1a24; border-radius: 20px 20px 0 0; padding: 20px; width: 100%; max-height: 82vh; overflow-y: auto; border-top: 1px solid #1e2d3d; }
.modal-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
.modal-title { color: #00ff88; font-weight: 700; font-size: 16px; }
.modal-sub { color: #556677; font-size: 13px; margin-top: 3px; }
.close-btn { background: #1a2535; border: none; color: #667; font-size: 18px; cursor: pointer; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.modal-body { color: #ccddf0; font-size: 14px; line-height: 1.75; white-space: pre-wrap; }
.modal-loading { text-align: center; padding: 40px; color: #00ff88; font-size: 14px; }
</style>
</head>
<body>

<div class="header">
  <h1>⚽ Futbol AI</h1>
  <p>SofaScore Analyst uslubida real tahlil</p>
</div>

<div class="leagues" id="leagues"></div>

<div class="tabs">
  <button class="tab-btn active" onclick="setTab(0)">Bugun</button>
  <button class="tab-btn" onclick="setTab(1)">Ertaga</button>
  <button class="tab-btn" onclick="setTab(2)">Kecha</button>
</div>

<div class="matches" id="matches">
  <div class="state"><div class="icon">⚽</div><p>Yuklanmoqda...</p></div>
</div>

<div class="overlay" id="overlay" style="display:none" onclick="closeModal()">
  <div class="modal" onclick="event.stopPropagation()">
    <div class="modal-header">
      <div>
        <div class="modal-title">🤖 AI Tahlil</div>
        <div class="modal-sub" id="modal-teams"></div>
      </div>
      <button class="close-btn" onclick="closeModal()">✕</button>
    </div>
    <div id="modal-body" class="modal-loading">⚽ Tahlil qilinmoqda...</div>
  </div>
</div>

<script>
// CONFIG
const PROXY = "https://football-proxy-futboll-app.up.railway.app";

const LEAGUES = [
  { id: 17, name: "Premier League", flag: "🏴" },
  { id: 8,  name: "La Liga",        flag: "🇪🇸" },
  { id: 23, name: "Serie A",        flag: "🇮🇹" },
  { id: 35, name: "Bundesliga",     flag: "🇩🇪" },
  { id: 34, name: "Ligue 1",        flag: "🇫🇷" },
  { id: 7,  name: "UCL",            flag: "⭐" },
  { id: 16, name: "World Cup",      flag: "🌍" },
  { id: 679,name: "UPL (O'zbekiston)", flag: "🇺🇿" },
];

let currentLeague = LEAGUES[0];
let currentTab = 0;

// DATE HELPERS
function getDate(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
}

function formatTime(ts) {
  if (!ts) return "";
  const d = new Date(ts * 1000);
  return d.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" });
}

function formatDateTime(ts) {
  if (!ts) return "";
  const d = new Date(ts * 1000);
  return d.toLocaleDateString("uz-UZ", { day: "2-digit", month: "2-digit" }) +
    " " + d.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" });
}

// RENDER LEAGUES
function renderLeagues() {
  document.getElementById("leagues").innerHTML = LEAGUES.map(lg => `
    <button class="lg-btn${lg.id === currentLeague.id ? " active" : ""}" onclick="setLeague(${lg.id})">
      ${lg.flag} ${lg.name}
    </button>
  `).join("");
}

function setLeague(id) {
  currentLeague = LEAGUES.find(l => l.id === id);
  renderLeagues();
  fetchMatches();
}

function setTab(i) {
  currentTab = i;
  document.querySelectorAll(".tab-btn").forEach((b, j) => b.classList.toggle("active", i === j));
  fetchMatches();
}

// FETCH MATCHES
async function fetchMatches() {
  document.getElementById("matches").innerHTML = '<div class="state"><div class="icon">⚽</div><p>Yuklanmoqda...</p></div>';
  
  // Tab ga qarab sana
  const offsets = [0, 1, -1]; // Bugun, Ertaga, Kecha
  const date = getDate(offsets[currentTab]);

  try {
    const res = await fetch(`${PROXY}/matches/${date}`);
    if (!res.ok) throw new Error("Server xatosi");
    const data = await res.json();
    
    const events = (data.events || [])
      .filter(e => e.tournament?.uniqueTournament?.id === currentLeague.id)
      .slice(0, 50);

    renderMatches(events);
  } catch (e) {
    document.getElementById("matches").innerHTML = `
      <div class="state">
        <div class="icon">❌</div>
        <p>Ma'lumot olinmadi.<br>Internet yoki server xatosi.</p>
      </div>`;
  }
}

// RENDER MATCHES
function renderMatches(events) {
  if (!events.length) {
    document.getElementById("matches").innerHTML = `
      <div class="state">
        <div class="icon">📭</div>
        <p>Bu kunda ${currentLeague.name}da o'yin yo'q</p>
      </div>`;
    return;
  }

  document.getElementById("matches").innerHTML = events.map(m => {
    const home = (m.homeTeam?.name || "?").replace(/'/g, "\\'");
    const away = (m.awayTeam?.name || "?").replace(/'/g, "\\'");
    const hs = m.homeScore?.current ?? "-";
    const as_ = m.awayScore?.current ?? "-";
    const status = m.status?.type;
    const isLive = status === "inprogress";
    const isFinished = status === "finished";
    const ts = m.startTimestamp;

    let statusText = "";
    if (isLive) statusText = "🔴 JONLI";
    else if (isFinished) statusText = "✅ TUGADI";
    else statusText = "🕐 " + formatDateTime(ts);

    const scoreText = (isLive || isFinished) ? `${hs}:${as_}` : "vs";

    return `
      <div class="match-card${isLive ? " live" : ""}">
        <div class="match-date${isLive ? " live-text" : ""}">${statusText}</div>
        <div class="match-row">
          <div class="team">${m.homeTeam?.name || "?"}</div>
          <div class="score-box${isLive ? " live" : ""}">${scoreText}</div>
          <div class="team away">${m.awayTeam?.name || "?"}</div>
        </div>
        <button class="analyze-btn" onclick="openModal('${home}', '${away}')">
          🤖 AI Tahlil
        </button>
      </div>`;
  }).join("");
}

// MODAL
function openModal(home, away) {
  document.getElementById("overlay").style.display = "flex";
  document.getElementById("modal-teams").textContent = `${home} vs ${away}`;
  document.getElementById("modal-body").className = "modal-loading";
  document.getElementById("modal-body").textContent = "⚽ Tahlil qilinmoqda...";

  fetch(`${PROXY}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ home, away })
  })
  .then(r => r.json())
  .then(data => {
    document.getElementById("modal-body").className = "modal-body";
    document.getElementById("modal-body").textContent = data.result || "Tahlil olinmadi";
  })
  .catch(() => {
    document.getElementById("modal-body").className = "modal-body";
    document.getElementById("modal-body").textContent = "❌ Xatolik yuz berdi. Qayta urinib ko'ring.";
  });
}

function closeModal() {
  document.getElementById("overlay").style.display = "none";
}

// INIT
renderLeagues();
fetchMatches();
</script>
</body>
</html>
