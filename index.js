<!DOCTYPE html>
<html lang="uz">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Futbol AI Analitika</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #080f17; font-family: -apple-system, sans-serif; color: #fff; max-width: 430px; margin: 0 auto; padding-bottom: 80px; }
.header { background: linear-gradient(180deg,#0a1628,#080f17); padding: 20px 16px 12px; border-bottom: 1px solid #1e2d3d; }
.header h1 { color: #00ff88; font-size: 22px; font-weight: 800; }
.header p { color: #445; font-size: 12px; margin-top: 2px; }
.leagues { overflow-x: auto; padding: 12px 16px; display: flex; gap: 8px; scrollbar-width: none; }
.leagues::-webkit-scrollbar { display: none; }
.league-btn { white-space: nowrap; padding: 7px 14px; border-radius: 20px; border: none; background: #1a2535; color: #778; font-size: 13px; cursor: pointer; font-weight: 500; }
.league-btn.active { background: #00ff88; color: #000; font-weight: 700; }
.tabs { display: flex; padding: 0 16px; gap: 8px; margin-bottom: 12px; }
.tab-btn { flex: 1; padding: 8px 0; border-radius: 10px; border: none; background: #0f1923; color: #445; font-size: 13px; cursor: pointer; border-bottom: 2px solid transparent; }
.tab-btn.active { background: #1a3a2a; color: #00ff88; font-weight: 700; border-bottom: 2px solid #00ff88; }
.matches { padding: 0 16px; }
.match-card { background: #0f1923; border: 1px solid #1e2d3d; border-radius: 12px; padding: 14px 16px; margin-bottom: 10px; }
.match-card.live { background: linear-gradient(135deg,#0f2027,#1a3a2a); border-color: #00ff88; }
.match-meta { display: flex; justify-content: space-between; font-size: 11px; color: #556; letter-spacing: 1px; margin-bottom: 8px; }
.live-badge { color: #00ff88; }
.match-row { display: flex; align-items: center; justify-content: space-between; }
.team-name { font-size: 14px; font-weight: 600; color: #fff; }
.home-name { text-align: left; flex: 1; }
.away-name { text-align: right; flex: 1; }
.score { padding: 6px 14px; background: #ffffff10; border-radius: 8px; color: #aaa; font-weight: 700; font-size: 18px; min-width: 60px; text-align: center; }
.score.live { background: #00ff8820; color: #00ff88; }
.analyze-btn { margin-top: 10px; width: 100%; padding: 8px 0; background: linear-gradient(90deg,#1a6b3a,#0d4a28); color: #00ff88; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }
.empty { text-align: center; padding: 40px; color: #334; }
.loading { text-align: center; padding: 40px; color: #00ff88; }
.modal-overlay { position: fixed; inset: 0; background: #000000cc; display: flex; align-items: flex-end; z-index: 100; }
.modal { background: #0f1923; border-radius: 20px 20px 0 0; padding: 20px; width: 100%; max-height: 80vh; overflow-y: auto; border: 1px solid #1e2d3d; }
.modal-header { display: flex; justify-content: space-between; margin-bottom: 16px; }
.modal-title { color: #00ff88; font-weight: 700; font-size: 16px; }
.modal-sub { color: #556; font-size: 13px; }
.close-btn { background: none; border: none; color: #556; font-size: 22px; cursor: pointer; }
.modal-content { color: #ccd; font-size: 14px; line-height: 1.7; white-space: pre-wrap; }
.modal-loading { text-align: center; padding: 40px; color: #00ff88; }
</style>
</head>
<body>
<div class="header">
  <h1>⚽ Futbol AI</h1>
  <p>SofaScore Analyst uslubida tahlil</p>
</div>
<div class="leagues" id="leagues"></div>
<div class="tabs">
  <button class="tab-btn active" onclick="setTab('today')">Bugun</button>
  <button class="tab-btn" onclick="setTab('week')">Hafta</button>
  <button class="tab-btn" onclick="setTab('month')">Oy</button>
</div>
<div class="matches" id="matches">
  <div class="loading"><div style="font-size:30px">⚽</div><div>Yuklanmoqda...</div></div>
</div>
<div class="modal-overlay" id="modal" style="display:none">
  <div class="modal">
    <div class="modal-header">
      <div>
        <div class="modal-title">🤖 AI Tahlil</div>
        <div class="modal-sub" id="modal-teams"></div>
      </div>
      <button class="close-btn" onclick="closeModal()">✕</button>
    </div>
    <div id="modal-content" class="modal-loading">
      <div style="font-size:30px">⚽</div>
      <div style="margin-top:10px">Tahlil qilinmoqda...</div>
    </div>
  </div>
</div>
<script>
const PROXY = "https://football-proxy-futboll-app.up.railway.app";
const LEAGUES = [
  {id:17, name:"Premier League", flag:"🏴"},
  {id:8, name:"La Liga", flag:"🇪🇸"},
  {id:23, name:"Serie A", flag:"🇮🇹"},
  {id:35, name:"Bundesliga", flag:"🇩🇪"},
  {id:34, name:"Ligue 1", flag:"🇫🇷"},
  {id:7, name:"Champions League", flag:"⭐"},
  {id:16, name:"World Cup", flag:"🌍"},
];
let currentLeague = LEAGUES[0];
function renderLeagues() {
  document.getElementById("leagues").innerHTML = LEAGUES.map(lg =>
    `<button class="league-btn ${lg.id===currentLeague.id?'active':''}" onclick="setLeague(${lg.id})">${lg.flag} ${lg.name}</button>`
  ).join("");
}
function setLeague(id) { currentLeague = LEAGUES.find(l=>l.id===id); renderLeagues(); fetchMatches(); }
function setTab(tab) {
  document.querySelectorAll(".tab-btn").forEach((b,i)=>b.classList.toggle("active",["today","week","month"][i]===tab));
  fetchMatches();
}
function formatDate(ts) {
  const d = new Date(ts*1000);
  return d.toLocaleDateString("uz-UZ",{day:"2-digit",month:"2-digit"})+" "+d.toLocaleTimeString("uz-UZ",{hour:"2-digit",minute:"2-digit"});
}
async function fetchMatches() {
  document.getElementById("matches").innerHTML = '<div class="loading"><div style="font-size:30px">⚽</div><div>Yuklanmoqda...</div></div>';
  const dateStr = new Date().toISOString().split("T")[0];
  try {
    const res = await fetch(`${PROXY}/matches/${dateStr}`);
    const data = await res.json();
    const events = (data.events||[]).filter(e=>e.tournament?.uniqueTournament?.id===currentLeague.id);
    renderMatches(events.slice(0,30));
  } catch(e) {
    document.getElementById("matches").innerHTML = '<div class="empty"><div style="font-size:30px">❌</div><div style="margin-top:10px">Xatolik yuz berdi</div></div>';
  }
}
function renderMatches(matches) {
  if (!matches.length) {
    document.getElementById("matches").innerHTML='<div class="empty"><div style="font-size:30px">📭</div><div style="margin-top:10px">Bu kunda o\'yin yo\'q</div></div>';
    return;
  }
  document.getElementById("matches").innerHTML = matches.map(m => {
    const home=m.homeTeam?.name||"?", away=m.awayTeam?.name||"?";
    const hs=m.homeScore?.current??"-", as_=m.awayScore?.current??"-";
    const isLive=m.status?.type==="inprogress", isFinished=m.status?.type==="finished";
    const time=m.startTimestamp?formatDate(m.startTimestamp):"";
    const scoreText=(isLive||isFinished)?`${hs}:${as_}`:"vs";
    return `<div class="match-card ${isLive?'live':''}">
      <div class="match-meta"><span class="${isLive?'live-badge':''}">${isLive?'🔴 JONLI':isFinished?'✅ TUGADI':'🕐 '+time}</span></div>
      <div class="match-row">
        <div class="home-name team-name">${home}</div>
        <div class="score ${isLive?'live':''}">${scoreText}</div>
        <div class="away-name team-name">${away}</div>
      </div>
      <button class="analyze-btn" onclick="openModal('${home.replace(/'/g,"\\'")}','${away.replace(/'/g,"\\'")}')">🤖 AI Tahlil</button>
    </div>`;
  }).join("");
}
function openModal(home, away) {
  document.getElementById("modal").style.display="flex";
  document.getElementById("modal-teams").textContent=`${home} vs ${away}`;
  document.getElementById("modal-content").innerHTML='<div style="font-size:30px">⚽</div><div style="margin-top:10px">Tahlil qilinmoqda...</div>';
  fetch(`${PROXY}/analyze`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({home,away})
  }).then(r=>r.json()).then(data=>{
    document.getElementById("modal-content").className="modal-content";
    document.getElementById("modal-content").textContent=data.result||"Tahlil olinmadi";
  }).catch(()=>{
    document.getElementById("modal-content").className="modal-content";
    document.getElementById("modal-content").textContent="Xatolik yuz berdi.";
  });
}
function closeModal() { document.getElementById("modal").style.display="none"; }
renderLeagues(); fetchMatches();
</script>
</body>
</html>

