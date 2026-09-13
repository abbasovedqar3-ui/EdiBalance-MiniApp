const tg=window.Telegram?.WebApp;
if(tg){tg.ready();tg.expand();try{tg.setHeaderColor("#f4f5f7");tg.setBackgroundColor("#f4f5f7")}catch(e){}}

/*
  EdiBalance Mini App 2.3
  API_BASE_URL must point to the HTTPS backend running next to trading_bot.db.
  Example: https://api.example.com
  Do NOT put the Telegram bot token here.
*/
const API_BASE_URL = "https://expenditure-pair-pam-inclusive.trycloudflare.com";

const state={
  day:1,streak:1,score:0,trades:0,wins:0,losses:0,goalDone:false,
  username:"Трейдер",charges:0,status:"guest",loading:true,apiConnected:false
};

const goals=[
"Сделать сегодняшнее решение осознанно, а не на автомате.",
"Не входить только потому, что хочется действия.",
"После минуса не пытаться отбиться.",
"Замечать эмоцию до принятия решения.",
"Уметь остановиться, когда это действительно нужно."
];

const voices=[
["Начало пути",0],["Не думай сначала о прибыли",1],["Не входи просто потому, что скучно",3],["Когда начинают мешать эмоции",5],
["Получил минус — спокойно",7],["Не пытайся отбиться",9],["Даже после плюса можно накосячить",11],["Умей ждать",14],
["Не смотри на чужие деньги",16],["Записывай сделки",19],["Иногда надо просто остановиться",22],["Вот зачем нужны 365 дней",26],["Первый месяц",30]
];

const titles={home:"Твой путь",edi365:"EDI365",voices:"Голосовой путь",trades:"Сделки",stats:"Статистика",psychology:"Психология",calculator:"Калькулятор",profile:"Профиль",plans:"Тариф",settings:"Настройки"};

function render(){
  const pct=Math.round(state.day/365*100);
  ["mainProgress","ediProgress"].forEach(id=>document.getElementById(id).style.width=pct+"%");
  ["dayNumber","ediDay","todayDay"].forEach(id=>document.getElementById(id).textContent=state.day);
  ["streak","ediStreak"].forEach(id=>document.getElementById(id).textContent=state.streak);
  ["score","ediScore","ringValue"].forEach(id=>document.getElementById(id).textContent=Math.round(state.score)+"%");
  document.getElementById("todayGoal").textContent=goals[(Math.max(1,state.day)-1)%goals.length];
  document.getElementById("goalStatus").textContent=state.goalDone?"Цель выполнена. Завтра будет новая.":"Нажми после выполнения цели.";
  document.getElementById("statTrades").textContent=state.trades;
  document.getElementById("statWins").textContent=state.wins;
  document.getElementById("statLosses").textContent=state.losses;
  document.getElementById("statWin").textContent=state.trades?Math.round(state.wins/state.trades*100)+"%":"—";
  const name=document.getElementById("profileName");
  if(name) name.textContent=state.username||"Трейдер";
  renderTimeline(); renderVoices();
}

function renderTimeline(){
  const el=document.getElementById("monthTimeline");el.innerHTML="";
  voices.forEach((v,i)=>{
    const unlocked=state.day>=v[1]+1;
    el.innerHTML+=`<div class="timeline-item ${unlocked?"":"locked"}"><div class="num">${i+1}</div><div><b>${v[0]}</b><div class="muted">${unlocked?"Открыт":"Откроется на дне "+(v[1]+1)}</div></div></div>`;
  });
}

function renderVoices(){
  const el=document.getElementById("voiceList");el.innerHTML="";
  voices.forEach((v,i)=>{
    const unlocked=state.day>=v[1]+1;
    el.innerHTML+=`<div class="voice-item ${unlocked?"":"locked"}"><div class="num">${i+1}</div><div><b>${v[0]}</b><div class="muted">${unlocked?"Доступен":"🔒 День "+(v[1]+1)}</div></div>${unlocked?'<button onclick="playVoice('+i+')">▶</button>':""}</div>`;
  });
}

function playVoice(i){
  alert("Голос #"+(i+1)+" будет подключён после размещения Telegram voice file_id на сервере.");
}

function openPage(page){
  document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
  document.getElementById(page)?.classList.add("active");
  document.getElementById("pageTitle").textContent=titles[page]||"EdiBalance";
  document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.page===page));
  window.scrollTo({top:0,behavior:"smooth"});
}

async function apiRequest(path, options={}){
  if(!API_BASE_URL) throw new Error("API_BASE_URL is empty");
  const initData=tg?.initData||"";
  if(!initData) throw new Error("Mini App opened outside Telegram or initData is unavailable");
  const headers={"Content-Type":"application/json","X-Telegram-Init-Data":initData};
  const res=await fetch(API_BASE_URL.replace(/\/$/,"")+path,{...options,headers:{...headers,...(options.headers||{})}});
  const data=await res.json().catch(()=>({}));
  if(!res.ok) throw new Error(data.error||("HTTP "+res.status));
  return data;
}

function applyServerData(data){
  state.apiConnected=true;
  state.loading=false;
  state.username=data.user?.username||data.user?.first_name||"Трейдер";
  state.status=data.user?.status||"guest";
  state.charges=Number(data.user?.charges||0);

  const p=data.edi365||{};
  state.day=Math.max(1,Math.min(365,Number(p.current_day||1)));
  state.streak=Number(p.streak_days||0);
  state.score=Number(p.monthly_score||0);
  state.goalDone=Boolean(data.today_goal?.completed);

  const s=data.stats||{};
  state.trades=Number(s.trades||0);
  state.wins=Number(s.wins||0);
  state.losses=Number(s.losses||0);
  render();
}

async function loadRealData(){
  try{
    const data=await apiRequest("/api/me");
    applyServerData(data);
  }catch(err){
    state.loading=false;
    state.apiConnected=false;
    render();
    console.warn("EdiBalance API:",err.message);
  }
}

document.addEventListener("click",e=>{
  const b=e.target.closest("[data-page]");
  if(b)openPage(b.dataset.page);
});

document.getElementById("completeGoal").onclick=async()=>{
  if(state.goalDone) return;
  try{
    if(!state.apiConnected) throw new Error("API not connected");
    const data=await apiRequest("/api/goal/complete",{method:"POST",body:JSON.stringify({})});
    applyServerData(data);
  }catch(err){
    alert("Пока не удалось сохранить цель на сервере.\n"+err.message);
  }
};

document.getElementById("addDemoTrade").onclick=()=>{
  alert("Тестовые сделки отключены в подключённой версии. Здесь будут реальные сделки из базы EdiBalance.");
};

document.getElementById("sosBtn").onclick=()=>document.getElementById("sosText").classList.toggle("hidden");
document.getElementById("calcBtn").onclick=()=>{
  const b=Number(document.getElementById("balance").value)||0;
  const r=Number(document.getElementById("risk").value)||0;
  document.getElementById("calcResult").textContent="$"+(b*r/100).toFixed(2);
};

render();
loadRealData();
