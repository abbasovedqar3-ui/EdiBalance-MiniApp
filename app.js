function go(id,b){document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));document.getElementById(id).classList.add('active');document.querySelectorAll('.nav button').forEach(x=>x.classList.remove('active'));if(b)b.classList.add('active');const nav=document.querySelector('.nav');if(nav)nav.style.display=id==='top100'?'none':'';scrollTo({top:0,behavior:'smooth'})}

// ---- extracted script block ----


const detailData = {
plans: {
title:"Тарифы", eyebrow:"ACCESS",
body:`<div class="detail-card card tariff-top">
  <div class="tariff-head">
    <div>
      <div class="eyebrow">ДОСТУП EDIBALANCE</div>
      <div class="tariff-subtitle">Выбери свой уровень</div>
    </div>
    <div class="stars-toggle">
      <button class="active" onclick="tariffCurrency('USD',this)">USD</button>
      <button onclick="tariffCurrency('STARS',this)">★</button>
    </div>
  </div>
</div>

<div class="detail-card card tariff-card">
  <div class="tariff-card-head"><div class="tariff-name">START</div><div class="charges">20 Charges</div></div>
  <div class="tariff-price">$4.99 <span>/ месяц</span></div>
  <div class="tariff-desc">Базовый контроль дисциплины и риска.</div>
  <div class="tariff-features">
    <span>✓ Trade Journal</span><span>✓ Risk Manager</span>
    <span>✓ 20 Charges</span><span>✓ Hard Stop</span>
    <span>✓ Basic Statistics</span><span>✓ Psychology SOS</span>
  </div>
  <button class="plan-btn" onclick="chooseTariffDetail('START')">Выбрать START</button>
</div>

<div class="detail-card card tariff-card tariff-pro">
  <div class="popular">MOST POPULAR</div>
  <div class="pro-underline"></div>
  <div class="tariff-card-head"><div class="tariff-name glowtext">PRO</div><div class="charges pro-charge">40 Charges</div></div>
  <div class="tariff-price">$6.99 <span>/ месяц</span></div>
  <div class="tariff-desc">Полный путь EdiBalance для системной работы.</div>
  <div class="promo"><b>Первый месяц $2</b><span>затем $6.99 / месяц</span></div>
  <div class="tariff-features">
    <span>✓ Всё из START</span><span>✓ EDI365 · 365 дней</span>
    <span>✓ 156 Voices</span><span>✓ Daily Goals</span>
    <span>✓ EDI Score + XP</span><span>✓ Hall of Fame</span>
  </div>
  <button class="plan-btn pro-btn" onclick="chooseTariffDetail('PRO')">Выбрать PRO</button>
</div>

<div class="detail-card card tariff-card">
  <div class="tariff-card-head"><div class="tariff-name">ELITE</div><div class="charges">60 Charges</div></div>
  <div class="tariff-price">$9.99 <span>/ месяц</span></div>
  <div class="tariff-desc">Максимальный уровень доступа и возможностей.</div>
  <div class="tariff-features">
    <span>✓ Всё из PRO</span><span>✓ 60 Charges</span>
    <span>✓ Расширенная аналитика</span><span>✓ Все достижения</span>
    <span>✓ Duels + Top 100</span><span>✓ Полный доступ</span>
  </div>
  <button class="plan-btn" onclick="chooseTariffDetail('ELITE')">Выбрать ELITE</button>
</div>

<div class="detail-card card tariff-payment">
  <div class="eyebrow">ОПЛАТА</div>
  <b>Telegram Stars</b>
  <p>После успешной оплаты доступ активируется автоматически.</p>
  <button class="big-action" onclick="toast('Переход к оплате')">Продолжить к оплате</button>
</div>`
},
journal:{
title:"Trade Journal",eyebrow:"JOURNAL",
body:`<div class="detail-card card"><div class="eyebrow">Новая запись</div><h2>Записать сделку</h2><p>Результат, сумма, прибыль, эмоция и дата сохраняются в журнал.</p><input class="input" placeholder="Результат: WIN / LOSS"><input class="input" placeholder="Сумма"><input class="input" placeholder="Прибыль"><input class="input" placeholder="Эмоция"><button class="big-action">Сохранить сделку</button></div><div class="detail-card card"><div class="eyebrow">История</div><h2>Последние сделки</h2><p>Пока записей нет.</p></div>`
},
risk:{
title:"Risk Manager",eyebrow:"RISK",
body:`<div class="detail-card card"><div class="eyebrow">Калькулятор</div><h2>Рассчитать позицию</h2><input class="input" placeholder="Баланс"><input class="input" placeholder="Риск %"><input class="input" placeholder="Цена входа"><input class="input" placeholder="Stop Loss"><button class="big-action">Рассчитать</button></div><div class="detail-card card"><div class="eyebrow">Правило</div><p>Risk Manager помогает соблюдать заданный риск и не подменяет решение трейдера.</p></div>`
},
stats:{
title:"Statistics",eyebrow:"ANALYTICS",
body:`<div class="detail-card card"><div class="metrics"><div class="metric"><label>Сделки</label><b>0</b></div><div class="metric"><label>Win rate</label><b>—</b></div><div class="metric"><label>Плюс</label><b>0</b></div><div class="metric"><label>Минус</label><b>0</b></div></div></div><div class="detail-card card"><div class="eyebrow">Анализ</div><h2>Динамика</h2><p>Графики будут строиться по реальным данным Trade Journal.</p></div>`
},
psych:{
title:"Psychology SOS",eyebrow:"SOS",
body:`<div class="detail-card card"><div class="eyebrow">Сейчас</div><h2 class="glowtext">Остановись на минуту.</h2><p>Перед следующим решением оцени состояние, импульс и желание отыграться.</p><button class="big-action">Запустить SOS</button></div><div class="detail-card card"><div class="choice"><span>Я спокоен</span><span>○</span></div><div class="choice"><span>Я хочу отыграться</span><span>○</span></div><div class="choice"><span>Я нарушаю план</span><span>○</span></div></div>`
},
human:{
title:"Human SOS",eyebrow:"HUMAN SUPPORT",
body:`<div class="detail-card card"><div class="eyebrow">Личный контакт</div><h2>Нужен человек?</h2><p>Human SOS — отдельный канал обращения. Лимит: до 3 обращений в месяц.</p><button class="big-action">Создать обращение</button></div><div class="detail-card card"><div class="eyebrow">Лимит</div><h2>3 / 3</h2><p>Доступные обращения обновляются по правилам тарифа.</p></div>`
},
edi:{
title:"EDI365",eyebrow:"365 DAYS",
body:`<div class="detail-card card"><div class="eyebrow">Сегодня</div><h2 class="glowtext">День 01 / 365</h2><p>Подтверждение дня выполняется через сервер. XP, Score и достижения рассчитываются сервером.</p><button class="big-action">Подтвердить DAY 01</button></div><div class="detail-card card"><div class="eyebrow">EDI Score</div><h2>31</h2><p>Текущий показатель дисциплины.</p></div>`
},
academy:{
title:"Academy",eyebrow:"LEARN",
body:`<div class="detail-card card"><div class="eyebrow">Курс 01</div><h2>Основа дисциплины</h2><p>Уроки, задания и материалы открываются постепенно.</p><button class="big-action">Продолжить обучение</button></div><div class="detail-card card"><div class="choice"><span>01 · Основы риска</span><span>✓</span></div><div class="choice"><span>02 · Эмоции</span><span>Locked</span></div><div class="choice"><span>03 · Дисциплина</span><span>Locked</span></div></div>`
},
voices:{
title:"156 Voices",eyebrow:"EDI365 VOICES",
body:`<div class="detail-card card"><div class="eyebrow">12 месяцев · 13 голосов</div><h2>Голосовой путь</h2><p>156 сообщений открываются постепенно вместе с EDI365.</p></div><div class="detail-card card" id="voiceList"></div>`
},
ach:{
title:"Achievements",eyebrow:"REWARDS",
body:`<div class="detail-card card"><div class="eyebrow">Прогресс</div><h2>0 / 24 открыто</h2><p>Достижения выдаются сервером за реальные действия.</p></div><div class="detail-card card"><div class="choice"><span>Первый день</span><span>Locked</span></div><div class="choice"><span>7 дней подряд</span><span>Locked</span></div><div class="choice"><span>30 дней</span><span>Locked</span></div><div class="choice"><span>100 дней</span><span>Locked</span></div></div>`
},
top:{
title:"Top 100",eyebrow:"RANKING",
body:`<div class="detail-card card"><div class="eyebrow">GLOBAL RANKING</div><h2 class="glowtext">Hall of Fame</h2><p>Живой рейтинг всех участников EDI365. В Top 100 попадают первые сто пользователей по выбранному показателю.</p><div class="choice"><span>Участников</span><b>10 428</b></div><div class="choice"><span>В Top 100</span><b>100</b></div></div><div class="detail-card card"><div class="eyebrow">Твой рейтинг</div><h2>#347</h2><p>Текущая позиция пользователя рассчитывается сервером среди всех участников.</p></div>`
},
hall:{
title:"Hall of Fame",eyebrow:"LEGENDS",
body:`<div class="detail-card card"><div class="eyebrow">Лучшие</div><h2>Hall of Fame</h2><p>Пользователи, которые достигли выдающихся результатов и серий.</p></div><div class="detail-card card"><div class="choice"><span>🥇 Alex · 98 Score</span><span>365d</span></div><div class="choice"><span>🥈 Mark · 94 Score</span><span>240d</span></div><div class="choice"><span>🥉 David · 92 Score</span><span>180d</span></div></div>`
},
duels:{
title:"Duels",eyebrow:"COMPETE",
body:`<div class="detail-card card"><div class="eyebrow">Соревнования</div><h2>Создать дуэль</h2><p>Соревнуйся по заранее определённым правилам EdiBalance.</p><button class="big-action">Создать дуэль</button></div><div class="detail-card card"><div class="choice"><span>Активные дуэли</span><b>0</b></div><div class="choice"><span>Победы</span><b>0</b></div></div>`
},
live:{
title:"LIVE",eyebrow:"COMMUNITY",
body:`<div class="detail-card card"><div class="eyebrow">Real DB</div><h2 class="glowtext">EdiBalance LIVE</h2><p>Живые данные сообщества: активность, события и рейтинговые изменения.</p></div><div class="detail-card card"><div class="choice"><span>Активных пользователей</span><b>—</b></div><div class="choice"><span>Сегодня завершено</span><b>—</b></div></div>`
},
creator:{
title:"Creator",eyebrow:"PARTNER",
body:`<div class="detail-card card"><div class="eyebrow">Creator Program</div><h2>Партнёрская программа</h2><p>Отдельный creator-контур для партнёров и авторов.</p><button class="big-action">Открыть Creator</button></div><div class="detail-card card"><div class="choice"><span>Комиссия 1-й месяц</span><b>30%</b></div><div class="choice"><span>Следующие месяцы</span><b>10%</b></div></div>`
},
payments:{
title:"Payments",eyebrow:"BILLING",
body:`<div class="detail-card card"><div class="eyebrow">Текущий доступ</div><h2>START · 20 Charges</h2><p>Оплата через Telegram Stars. Успешная оплата автоматически активирует доступ.</p><button class="big-action">Изменить тариф</button></div><div class="detail-card card"><div class="eyebrow">История</div><p>Платежей пока нет.</p></div>`
},
paySupport:{
title:"Payment Support",eyebrow:"SUPPORT",
body:`<div class="detail-card card"><div class="eyebrow">Помощь с оплатой</div><h2>Что случилось?</h2><div class="support-option"><b>Оплата не пришла</b><small>Проверить платеж и статус доступа</small></div><div class="support-option"><b>Заплатил, но доступ не активирован</b><small>Создать обращение</small></div><div class="support-option"><b>Запросить возврат</b><small>Отдельная процедура возврата</small></div><div class="support-option"><b>Отменить подписку</b><small>Остановить дальнейшее продление</small></div></div>`
},
documents:{
title:"Documents",eyebrow:"LEGAL",
body:`<div class="detail-card card"><div class="choice"><span>Условия использования</span><span>PDF ›</span></div><div class="choice"><span>Политика конфиденциальности</span><span>PDF ›</span></div><div class="choice"><span>Согласие на обработку данных</span><span>PDF ›</span></div><div class="choice"><span>Платежи и тарифы</span><span>PDF ›</span></div><div class="choice"><span>Мне исполнилось 18 лет</span><span>✓</span></div></div>`
},
support:{
title:"Поддержка",eyebrow:"HELP",
body:`<div class="detail-card card"><div class="eyebrow">EdiBalance Support</div><h2>Чем помочь?</h2><p>Выбери тему или отправь сообщение команде поддержки.</p><div class="support-option"><b>Техническая проблема</b></div><div class="support-option"><b>Доступ и тариф</b></div><div class="support-option"><b>Платёж</b></div><div class="support-option"><b>Другое</b></div><button class="big-action">Написать в поддержку</button></div>`
},
language:{
title:"Язык",eyebrow:"LANGUAGE",
body:`<div class="detail-card card"><div class="choice"><span>Русский</span><b>✓</b></div><div class="choice"><span>Azərbaycan</span><span>›</span></div><div class="choice"><span>English</span><span>›</span></div></div>`
},
notifications:{
title:"Уведомления",eyebrow:"NOTIFICATIONS",
body:`<div class="detail-card card"><div class="choice"><span>EDI365</span><div class="toggle on"><i></i></div></div><div class="choice"><span>Напоминания</span><div class="toggle on"><i></i></div></div><div class="choice"><span>Достижения</span><div class="toggle"><i></i></div></div><div class="choice"><span>Рейтинг</span><div class="toggle"><i></i></div></div></div>`
},
security:{
title:"Безопасность",eyebrow:"SECURITY",
body:`<div class="detail-card card"><div class="choice"><span>Telegram-сессия</span><b>Защищена</b></div><div class="choice"><span>WebApp initData</span><b>Verified</b></div><div class="choice"><span>Последняя активность</span><b>Сейчас</b></div></div><div class="detail-card card"><div class="eyebrow">Важно</div><p>Секретные ключи и токены не должны находиться в клиентском Mini App.</p></div>`
},
about:{
title:"О EdiBalance",eyebrow:"ABOUT",
body:`<div class="detail-card card"><div class="eyebrow">EDIBALANCE</div><h2 class="glowtext">Discipline over emotion.</h2><p>Версия Mini App · Premium UI Concept</p></div><div class="detail-card card"><div class="choice"><span>Условия</span><span>›</span></div><div class="choice"><span>Privacy</span><span>›</span></div><div class="choice"><span>Версия</span><span>3.x</span></div></div>`
},
logout:{
title:"Выход из аккаунта",eyebrow:"ACCOUNT",
body:`<div class="detail-card card"><div class="eyebrow">Завершение сессии</div><h2>Выйти из EdiBalance?</h2><p>Текущая сессия будет завершена. Данные аккаунта не удаляются.</p><button class="big-action">Выйти из аккаунта</button></div>`
}
};

function openDetail(key){
  const d=detailData[key]; if(!d)return;
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  const el=document.getElementById('details');
  el.classList.add('open');
  el.innerHTML=`<section class="detail-screen active"><div class="backbar"><button class="backbtn" onclick="closeDetail()">‹ Назад</button><span class="backtitle">${d.eyebrow}</span></div><h1 class="title glowtext">${d.title}</h1>${d.body}</section>`;
  if(key==='voices'){
    const list=document.getElementById('voiceList');
    list.innerHTML='<div class="eyebrow">Первые сообщения</div>'+Array.from({length:8},(_,i)=>`<div class="voice-row"><span class="vnum">${String(i+1).padStart(2,'0')}</span><div class="vplay">${i===0?'▶':'🔒'}</div><div><b>Голос ${i+1}</b><small>EDI365 · 04:00</small></div><span class="locked">${i===0?'OPEN':'LOCKED'}</span></div>`).join('');
  }
  scrollTo({top:0,behavior:'smooth'});
}
function closeDetail(){
  const el=document.getElementById('details');
  el.classList.remove('open');
  el.innerHTML='';
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  document.getElementById('home').classList.add('active');
  scrollTo({top:0,behavior:'smooth'});
}


// ---- extracted script block ----


window.tariffCurrency=function(c,b){
  const w=b.parentElement;
  w.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  if(typeof toast==='function') toast(c==='USD'?'USD выбран':'Telegram Stars выбран');
};
window.chooseTariffDetail=function(plan){
  document.querySelectorAll('.tariff-card').forEach(x=>x.classList.remove('selected'));
  const cards=document.querySelectorAll('.tariff-card');
  const idx={START:0,PRO:1,ELITE:2}[plan];
  if(cards[idx]) cards[idx].classList.add('selected');
  if(typeof toast==='function') toast(plan+' выбран');
};


// ---- extracted script block ----


/* EdiBalance v9.1 interaction reliability layer — visual design unchanged */
(function(){
  function safe(fn){
    try { fn(); } catch(e) {
      console.error('EdiBalance interaction:', e);
      if (typeof toast === 'function') toast('Раздел загружается…');
    }
  }

  // Make every element with onclick resilient to accidental event propagation.
  document.addEventListener('click', function(e){
    const el = e.target.closest('button,[role="button"],a');
    if(!el) return;
    // Do not interfere with links or buttons that already have explicit handlers.
    // The handler exists mainly to ensure dynamically-rendered buttons remain usable.
    if (el.disabled) e.preventDefault();
  }, true);

  // Re-bind after each render, if the original preview exposes render/show.
  const originalShow = window.show;
  if (typeof originalShow === 'function') {
    window.show = function(key){
      return safe(function(){ originalShow(key); });
    };
  }

  const originalOpenDetail = window.openDetail;
  if (typeof originalOpenDetail === 'function') {
    window.openDetail = function(key){
      return safe(function(){ originalOpenDetail(key); });
    };
  }

  // Ensure the fixed detail layer can always be closed.
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      const d=document.getElementById('details');
      if(d) d.classList.remove('open');
    }
  });

  // If a details screen contains a back button, make it reliably return.
  document.addEventListener('click', function(e){
    const b=e.target.closest('[data-back],.back-btn,.details-back');
    if(!b) return;
    e.preventDefault();
    safe(function(){
      const d=document.getElementById('details');
      if(d) d.classList.remove('open');
      if(typeof show==='function') show('home');
    });
  });

  // Telegram WebApp preview fallback: v9 remains fully usable in a normal browser.
  if(!window.Telegram || !window.Telegram.WebApp){
    window.__EDI_PREVIEW__=true;
  }
})();


// ---- extracted script block ----


(function(){
  window.__ediTariff = window.__ediTariff || {plan:'PRO',currency:'USD'};
  window.setCurrency=function(currency,btn){
    window.__ediTariff.currency=currency;
    const wrap=btn.closest('.stars-toggle');
    if(wrap) wrap.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    if(typeof toast==='function') toast(currency==='USD'?'USD выбран':'Telegram Stars выбран');
  };
  window.selectTariff=function(plan){
    window.__ediTariff.plan=plan;
    document.querySelectorAll('.plan-card').forEach(x=>x.classList.remove('selected'));
    const cards=document.querySelectorAll('.plan-card');
    const map={START:0,PRO:1,ELITE:2};
    if(cards[map[plan]]) cards[map[plan]].classList.add('selected');
    if(typeof toast==='function') toast(plan+' выбран');
  };
})();


// ---- extracted script block ----


/* v9.5: activate every remaining demo control without changing v9 visuals */
(function(){
 document.addEventListener('click',function(e){
   const b=e.target.closest('button');
   if(!b || b.disabled) return;
   if(b.getAttribute('onclick')) return;
   const t=(b.textContent||'').trim();
   if(t.includes('Сохранить сделку')) return toast('Демо: сделка сохранена ✓');
   if(t.includes('Рассчитать')) return toast('Демо: расчёт выполнен ✓');
   if(t.includes('Запустить SOS')) return toast('Psychology SOS запущен');
   if(t.includes('Создать обращение')) return toast('Human SOS: обращение создано ✓');
   if(t.includes('Подтвердить DAY')) return toast('DAY COMPLETED ✓ • XP начислен');
   if(t.includes('Продолжить обучение')) return toast('Урок открыт ✓');
   if(t.includes('Продолжить к оплате')) return toast('Открыта оплата в Telegram Stars');
   if(t.includes('Выйти из аккаунта')) return toast('Демо: выход выполнен');
   if(t==='USD'||t==='★') return;
   toast(t ? t+' — открыто' : 'Открыто');
 });
 document.addEventListener('click',function(e){
   const row=e.target.closest('.choice');
   if(row && !e.target.closest('button')) toast((row.textContent||'Раздел') .trim()+' — открыто');
 });
})();


// ---- extracted script block ----

/* v9.11: Top 100 visual ranking — v9.10 style matched to the reference. */
(function(){
  const total=10428;
  const seed=[
    ['Alex',98,15320,120],['Mark',94,12480,72],['David',92,11950,68],
    ['Sergei',90,11420,56],['Elena',88,10980,54],['Ruslan',87,10540,49],['Anastasia',85,10120,47],
    ['Timur',83,9860,44],['Karina',82,9420,42],['Islam',80,9010,40],['Nikita',79,8760,38],['Victoria',78,8420,36],
    ['Denis',77,8150,34],['Lika',76,7980,32],['Arsen',75,7640,30]
  ];
  const names=['Maksim','Daniil','Roman','Samir','Amir','Tural','Elvin','Murad','Rauf','Farid','Kamran','Said','Rashad','Nurlan','Ilkin','Orkhan','Anar','Ali','Yusuf','Ayan'];
  const users=Array.from({length:total},(_,i)=>{
    if(i<seed.length){const x=seed[i];return {id:i+1,name:x[0],score:x[1],xp:x[2],streak:x[3],initial:x[0][0]};}
    const score=Math.max(38,74-Math.floor((i-seed.length)*0.018)-(i%9===0?1:0));
    const xp=Math.max(620,7600-Math.floor((i-seed.length)*0.72));
    const streak=Math.max(1,29-Math.floor((i-seed.length)*0.002)-(i%7===0?1:0));
    const name=names[(i-seed.length)%names.length]+' '+(Math.floor((i-seed.length)/names.length)+2);
    return {id:i+1,name,score,xp,streak,initial:name[0]};
  });
  const me={name:'Edgar',score:71,xp:6420,streak:12};
  function sorted(){return users.slice().sort((a,b)=>b.score-a.score||b.xp-a.xp||a.id-b.id)}
  function podiumCard(u,rank){
    const cls=rank===1?'first':rank===2?'second':'third';
    const crown=rank===1?'♛':rank===2?'♛':'♛';
    return `<div class="pod-card ${cls}"><div class="crown">${crown}</div><div class="pod-num">${rank}</div><div class="pod-avatar">${u.initial}</div><div class="pod-name">${u.name}</div><div class="pod-score"><span>★</span>${u.score}</div><div class="pod-meta">XP ${u.xp.toLocaleString('en-US')}</div><div class="pod-meta">🔥 ${u.streak} дней</div></div>`;
  }
  function render(){
    const top=sorted().slice(0,100);
    const pod=document.getElementById('rankingPodium');
    const rows=document.getElementById('rankingList');
    if(!pod||!rows)return;
    pod.innerHTML=podiumCard(top[1],2)+podiumCard(top[0],1)+podiumCard(top[2],3);
    rows.innerHTML=top.slice(3).map((u,idx)=>{const rank=idx+4;return `<div class="ranking-row"><span class="rank">${rank}</span><div class="rank-user"><div class="rank-avatar small">${u.initial}</div><b>${u.name}</b></div><span class="score-pill">${u.score}</span><span class="rank-xp">${u.xp.toLocaleString('en-US')}</span><span class="rank-streak">🔥 ${u.streak} дней</span></div>`}).join('');
    const count=document.getElementById('rankingCount'); if(count)count.textContent=total.toLocaleString('ru-RU');
    const mr=document.getElementById('myRankMeta'); if(mr)mr.textContent='#347';
    const mv=document.getElementById('myRankValue'); if(mv)mv.textContent=me.score;
  }
  window.renderFullRanking=render;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();