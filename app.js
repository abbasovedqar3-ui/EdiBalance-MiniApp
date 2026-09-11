const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  try { tg.setHeaderColor("#eef0f3"); tg.setBackgroundColor("#eef0f3"); } catch(e) {}
}

const state = { day: 1, streak: 0, score: 0, voice: 1 };

function render(){
  const pct = Math.round((state.day-1)/365*100);
  document.querySelector("#day").textContent = state.day;
  document.querySelector("#todayDay").textContent = state.day;
  document.querySelector("#progress").textContent = pct + "%";
  document.querySelector("#progressBar").style.width = Math.max(pct,1) + "%";
  document.querySelector("#streak").textContent = state.streak;
  document.querySelector("#score").textContent = state.score;
}
document.querySelector("#goalBtn").addEventListener("click",()=>{
  state.day = Math.min(365,state.day+1);
  state.streak += 1;
  state.score = Math.min(100,Math.round((state.day-1)/365*100));
  render();
});
document.querySelector("#voicePlay").addEventListener("click",()=>{
  const el=document.querySelector("#voicePlay");
  el.textContent = el.textContent==="▶" ? "Ⅱ" : "▶";
});
render();
