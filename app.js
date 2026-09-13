const tg=window.Telegram?.WebApp;
if(tg){tg.ready();tg.expand();try{tg.setHeaderColor("#f4f5f7");tg.setBackgroundColor("#f4f5f7")}catch(e){}}

const state={day:1,streak:1,score:0,trades:0,wins:0,losses:0,goalDone:false};
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
  ["score","ediScore","ringValue"].forEach(id=>document.getElementById(id).textContent=state.score+"%");
  document.getElementById("todayGoal").textContent=goals[(state.day-1)%goals.length];
  document.getElementById("goalStatus").textContent=state.goalDone?"Цель выполнена. Завтра будет новая.":"Нажми после выполнения цели.";
  document.getElementById("statTrades").textContent=state.trades;
  document.getElementById("statWins").textContent=state.wins;
  document.getElementById("statLosses").textContent=state.losses;
  document.getElementById("statWin").textContent=state.trades?Math.round(state.wins/state.trades*100)+"%":"—";
  renderTimeline(); renderVoices();
}
function renderTimeline(){
  const el=document.getElementById("monthTimeline");el.innerHTML="";
  voices.forEach((v,i)=>{const unlocked=state.day>=v[1]+1;el.innerHTML+=`<div class="timeline-item ${unlocked?"":"locked"}"><div class="num">${i+1}</div><div><b>${v[0]}</b><div class="muted">${unlocked?"Открыт":"Откроется на дне "+(v[1]+1)}</div></div></div>`});
}
function renderVoices(){
  const el=document.getElementById("voiceList");el.innerHTML="";
  voices.forEach((v,i)=>{const unlocked=state.day>=v[1]+1;el.innerHTML+=`<div class="voice-item ${unlocked?"":"locked"}"><div class="num">${i+1}</div><div><b>${v[0]}</b><div class="muted">${unlocked?"Доступен":"🔒 День "+(v[1]+1)}</div></div>${unlocked?'<button onclick="playVoice('+i+')">▶</button>':""}</div>`});
}
function playVoice(i){alert("Здесь будет воспроизводиться реальный Telegram voice #"+(i+1)+".");}
function openPage(page){
  document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
  document.getElementById(page)?.classList.add("active");
  document.getElementById("pageTitle").textContent=titles[page]||"EdiBalance";
  document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.page===page));
  window.scrollTo({top:0,behavior:"smooth"});
}
document.addEventListener("click",e=>{const b=e.target.closest("[data-page]");if(b)openPage(b.dataset.page)});
document.getElementById("completeGoal").onclick=()=>{if(!state.goalDone){state.goalDone=true;state.score=Math.min(100,state.score+1);render()}};
document.getElementById("addDemoTrade").onclick=()=>{state.trades++;state.wins++;render();alert("Тестовая сделка добавлена. В реальной версии она будет записываться в базу бота.")};
document.getElementById("sosBtn").onclick=()=>document.getElementById("sosText").classList.toggle("hidden");
document.getElementById("calcBtn").onclick=()=>{const b=Number(document.getElementById("balance").value)||0;const r=Number(document.getElementById("risk").value)||0;document.getElementById("calcResult").textContent="$"+(b*r/100).toFixed(2)};
render();