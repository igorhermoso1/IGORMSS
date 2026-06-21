/* ===================================================================
   ZERBITZUAK LAB — motorra
   Edukia datu hutsa da (edukiak.js). Hemen dago errendatzea,
   sari-sistema (txanponak, maila, racha, logroak) eta nabigazioa.
   =================================================================== */
(() => {
"use strict";
const KEY = "zlab.v1";
const day = () => new Date().toISOString().slice(0,10);

/* ---------- Egoera ---------- */
function load(){ try{ return JSON.parse(localStorage.getItem(KEY)) || {}; }catch{ return {}; } }
function save(s){ localStorage.setItem(KEY, JSON.stringify(s)); }
function state(){
  const s = load();
  s.done = s.done || {};        // {temaId:true}
  s.coins = s.coins || 0;
  s.streak = s.streak || 0;
  s.lastDay = s.lastDay || null;
  s.logros = s.logros || {};
  return s;
}

/* ---------- Hizkuntza (eu/es) ---------- */
function getLang(){ return load().lang === "es" ? "es" : "eu"; }
function setLang(l){ const s = load(); s.lang = (l==="es"?"es":"eu"); save(s); }
const T = v => v==null ? "" : (typeof v==="string" ? v : (v[getLang()] || v.eu || v.es || ""));
const I18N = {
  eu:{ dashboard:"Dashboard", logroak:"Logroak", reset:"Berrezarri aurrerapena", hasiera:"Hasiera",
    tema:"Tema", temaKop:"tema", ariketak:"Ariketak", autoeb:"Autoebaluazioa", egiaztatu:"Egiaztatu ikasitakoa",
    zuzendu:"Zuzendu", markatu:"Markatu osatuta", osatutaBtn:"Osatuta ✓", osatuta:"osatuta", irekita:"irekita",
    markatuAz:"Egin galdetegia gainditu eta tema osatzeko, edo markatu eskuz.",
    osatutaAz:"Tema hau osatuta daukazu. Errepasatu nahi duzunean.",
    aurrekoa:"Aurrekoa", hurrengoa:"Hurrengoa", itzuli:"Itzuli", bukaera:"Bukaera", itzuliMapara:"Itzuli mapara",
    maila:"Maila", txanpon:"txanpon", racha:"racha", aurrerapena:"Aurrerapena",
    mailaIzenak:["","Erreproduzitu","Aldatu","Sortu","Erronka"], ondoDagoela:"Ondo dagoela jakiteko:",
    ariketakIntro:"Ariketak zailtasunaren arabera daude (1→4). Ireki bakoitza, irakurri zer egin behar duzun eta egiaztatu 'Ondo dagoela jakiteko' irizpidearekin.",
    helburua:"Helburua", analogia:"Analogia", oharra:"Oharra", erroreak:"Ohiko erroreak", kopiatu:"kopiatu",
    bikain:"Bikain!", temaOsatuta:"Tema osatuta!", jarraitu:"Jarraitu", logroBerria:"Logro berria",
    gaindituta:"gaindituta", behar:"behar dituzu. Errepasatu eta saiatu berriz.",
    resetGald:"Aurrerapen guztia ezabatu?",
    heroEye:"Sareko zerbitzuak · Ubuntu eta Windows Server", heroAccent:"eskuekin",
    heroTitle1:"Ikasi sareko zerbitzuak ", heroTitle2:", zerotik adituraino.",
    heroText:"Instalatu eta konfiguratu zerbitzu bakoitza zure makina birtualetan. Teoria, komandoak pausoz pauso eta ariketa praktikoak. Osatu temak, irabazi txanponak eta igo maila." },
  es:{ dashboard:"Panel", logroak:"Logros", reset:"Reiniciar progreso", hasiera:"Inicio",
    tema:"Tema", temaKop:"temas", ariketak:"Ejercicios", autoeb:"Autoevaluación", egiaztatu:"Comprueba lo aprendido",
    zuzendu:"Corregir", markatu:"Marcar completado", osatutaBtn:"Completado ✓", osatuta:"completado", irekita:"abierto",
    markatuAz:"Aprueba el cuestionario para completar el tema, o márcalo manualmente.",
    osatutaAz:"Ya tienes este tema completado. Repásalo cuando quieras.",
    aurrekoa:"Anterior", hurrengoa:"Siguiente", itzuli:"Volver", bukaera:"Fin", itzuliMapara:"Volver al inicio",
    maila:"Nivel", txanpon:"monedas", racha:"racha", aurrerapena:"Progreso",
    mailaIzenak:["","Reproducir","Modificar","Crear","Reto"], ondoDagoela:"Cómo saber que está bien:",
    ariketakIntro:"Los ejercicios van por dificultad (1→4). Abre cada uno, lee qué debes hacer y compruébalo con el criterio 'Cómo saber que está bien'.",
    helburua:"Objetivo", analogia:"Analogía", oharra:"Nota", erroreak:"Errores comunes", kopiatu:"copiar",
    bikain:"¡Bien hecho!", temaOsatuta:"¡Tema completado!", jarraitu:"Continuar", logroBerria:"Nuevo logro",
    gaindituta:"aprobado", behar:"necesarias. Repasa e inténtalo de nuevo.",
    resetGald:"¿Borrar todo el progreso?",
    heroEye:"Servicios de red · Ubuntu y Windows Server", heroAccent:"con tus manos",
    heroTitle1:"Aprende servicios de red ", heroTitle2:", de cero a experto.",
    heroText:"Instala y configura cada servicio en tus máquinas virtuales. Teoría, comandos paso a paso y ejercicios prácticos. Completa temas, gana monedas y sube de nivel." }
};
const L = () => I18N[getLang()];
const COINS_PER_LEVEL = 300;
const levelOf = c => Math.floor(c / COINS_PER_LEVEL) + 1;
const levelProgress = c => (c % COINS_PER_LEVEL) / COINS_PER_LEVEL;
const totalTemas = () => CURSO.asignaturak.reduce((n,a)=>n+a.temak.length,0);
const doneCount = () => Object.keys(state().done).length;

/* ---------- Racha ---------- */
function touchStreak(s){
  const t = day();
  if(s.lastDay === t) return;
  const yest = new Date(Date.now()-864e5).toISOString().slice(0,10);
  s.streak = (s.lastDay === yest) ? s.streak+1 : 1;
  s.lastDay = t;
}

/* ---------- Logroak ---------- */
const LOGROAK = [
  { id:"lehena",  ic:"🌱", izen:{eu:"Lehen urratsa",es:"Primer paso"},   desk:{eu:"Osatu lehen tema bat.",es:"Completa tu primer tema."},        baldintza:s=>doneCount()>=1 },
  { id:"hirurak", ic:"⚙️", izen:{eu:"Errodaje",es:"Rodaje"},         desk:{eu:"Osatu 3 tema.",es:"Completa 3 temas."},                baldintza:s=>doneCount()>=3 },
  { id:"erdia",   ic:"🚀", izen:{eu:"Erdibidean",es:"A medio camino"},       desk:{eu:"Osatu 5 tema.",es:"Completa 5 temas."},                baldintza:s=>doneCount()>=5 },
  { id:"maisua",  ic:"🏆", izen:{eu:"Maisua",es:"Maestro"},  desk:{eu:"Osatu asignatura oso bat.",es:"Completa una asignatura entera."},     baldintza:s=>{return CURSO.asignaturak.some(a=>a.temak.every(t=>state().done[t.id]));} },
  { id:"diruzaina",ic:"💰",izen:{eu:"Diruzaina",es:"Tesorero"},        desk:{eu:"Lortu 500 txanpon.",es:"Consigue 500 monedas."},           baldintza:s=>s.coins>=500 },
  { id:"sutea",   ic:"🔥", izen:{eu:"Sutan",es:"En racha"},            desk:{eu:"Eduki 3 eguneko racha.",es:"Mantén una racha de 3 días."},       baldintza:s=>s.streak>=3 },
];
function checkLogroak(s){
  const nberri = [];
  LOGROAK.forEach(l=>{ if(!s.logros[l.id] && l.baldintza(s)){ s.logros[l.id]=true; nberri.push(l); } });
  return nberri;
}

/* ---------- Saria eman ---------- */
function award(coins, titleHtml){
  const s = state();
  s.coins += coins;
  touchStreak(s);
  const newLogros = checkLogroak(s);
  save(s);
  refreshPlayer();
  showModal("🎉", titleHtml || L().bikain, coins, newLogros);
}
function markTema(temaId, coins){
  const s = state();
  if(s.done[temaId]) return false;
  s.done[temaId] = true; save(s);
  award(coins, L().temaOsatuta);
  return true;
}

/* ---------- Modal ---------- */
function showModal(emoji, title, coins, logros){
  const m = document.getElementById("modal");
  let extra = "";
  if(logros && logros.length) extra = logros.map(l=>`<div class="reward">${l.ic} ${L().logroBerria}: ${esc(T(l.izen))}</div>`).join("");
  m.querySelector(".box").innerHTML =
    `<div class="emoji">${emoji}</div><h3>${title}</h3>`+
    (coins?`<div class="reward">+${coins} 🪙 ${L().txanpon}</div>`:"")+ extra +
    `<button class="btn" id="modal-ok">${L().jarraitu}</button>`;
  m.classList.add("show");
  document.getElementById("modal-ok").onclick = ()=>m.classList.remove("show");
}

/* ---------- Player panela ---------- */
function refreshPlayer(){
  const s = state();
  const lvl = levelOf(s.coins), prog = Math.round(levelProgress(s.coins)*100);
  const set = (id,v)=>{ const e=document.getElementById(id); if(e) e.textContent=v; };
  set("p-coins", s.coins); set("p-level", L().maila+" "+lvl);
  set("p-done", doneCount()+"/"+totalTemas()); set("p-streak", s.streak+" 🔥");
  const bar = document.getElementById("p-bar"); if(bar) bar.style.width = prog+"%";
  set("p-prog-l", prog+"%");
  set("tb-coins", s.coins+" 🪙");
  set("p-coins-l", L().txanpon);
  const total = Math.round(doneCount()/totalTemas()*100);
  set("p-totalprog", L().aurrerapena+" "+total+"%");
}

/* =====================================================================
   EDUKIA → HTML  (atal motak)
   ===================================================================== */
function esc(t){ return (t==null?"":String(t)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function inlineMd(t){ // `code` bakarrik
  return esc(t).replace(/`([^`]+)`/g, '<code class="inline">$1</code>');
}
function termBlock(host, lerroak){
  const body = lerroak.map(l=>{
    if(l.txt!==undefined) return `<span class="cmd">${esc(T(l.txt))}</span>`;
    const cmt = l.cmt ? `   <span class="cmt"># ${esc(T(l.cmt))}</span>` : "";
    const prompt = l.root ? "# " : "$ ";
    return `<span class="prompt">${prompt}</span><span class="cmd">${esc(l.cmd)}</span>${cmt}`;
  }).join("\n");
  return `<div class="term"><div class="bar"><span class="lights"><i></i><i></i><i></i></span>
    <span class="host">${esc(T(host)||"terminala")}</span><button class="copy" data-copy>${L().kopiatu}</button></div>
    <pre><code>${body}</code></pre></div>`;
}
function renderAtal(a){
  switch(a.mota){
    case "helburua": return `<div class="helburua"><span class="ic">🎯</span><div><span class="tag">${L().helburua}</span><div>${inlineMd(T(a.testua))}</div></div></div>`;
    case "analogia": return `<div class="callout analogia"><span class="tag">${L().analogia}</span><p>${inlineMd(T(a.testua))}</p></div>`;
    case "oharra":   return `<div class="callout"><span class="tag">${esc(T(a.izenburua)||L().oharra)}</span><p>${inlineMd(T(a.testua))}</p></div>`;
    case "errorea":  return `<div class="callout errorea"><span class="tag">${esc(T(a.izenburua)||L().erroreak)}</span><p>${inlineMd(T(a.testua))}</p></div>`;
    case "teoria":   return (a.izenburua?`<h3 class="blk">${esc(T(a.izenburua))}</h3>`:"")+`<p>${inlineMd(T(a.testua))}</p>`;
    case "izenburua":return `<h2 class="blk">${esc(T(a.testua))}</h2>`;
    case "taula":{
      const th = a.headers.map(h=>`<th>${esc(T(h))}</th>`).join("");
      const tr = a.rows.map(r=>"<tr>"+r.map(c=>`<td class="mono">${inlineMd(T(c))}</td>`).join("")+"</tr>").join("");
      return (a.izenburua?`<h3 class="blk">${esc(T(a.izenburua))}</h3>`:"")+`<table class="data"><tr>${th}</tr>${tr}</table>`;
    }
    case "terminala":return (a.izenburua?`<h3 class="blk">${esc(T(a.izenburua))}</h3>`:"")+termBlock(a.host, a.lerroak);
    case "fitxategia":return `<div class="term"><div class="bar"><span class="lights"><i></i><i></i><i></i></span><span class="host">${esc(T(a.izena))}</span><button class="copy" data-copy>${L().kopiatu}</button></div><pre><code><span class="cmd">${esc(a.edukia)}</span></code></pre></div>`;
    case "pausoak":{
      const items = a.items.map(it=>`<li><h4>${esc(T(it.izen))}</h4>${it.testua?`<p>${inlineMd(T(it.testua))}</p>`:""}${it.terminala?termBlock(it.host,it.terminala):""}</li>`).join("");
      return (a.izenburua?`<h3 class="blk">${esc(T(a.izenburua))}</h3>`:"")+`<ol class="steps">${items}</ol>`;
    }
    case "simuladorea": return (SIMS[a.id]?SIMS[a.id].html:"<!-- sim falta -->");
    default: return "";
  }
}

/* ---------- Ariketak ---------- */
function renderAriketak(ariketak){
  if(!ariketak||!ariketak.length) return "";
  const lvls = ariketak.map((e,i)=>`
    <details class="level" data-lv="${e.maila}"${i===0?" open":""}>
      <summary><span class="lv">${e.maila}. ${L().maila.toLowerCase()} · ${L().mailaIzenak[e.maila]}</span> ${esc(T(e.izenburua))} <span class="chev">›</span></summary>
      <div class="body"><p>${inlineMd(T(e.testua))}</p>${e.terminala?termBlock(e.host,e.terminala):""}${e.arrakasta?`<p class="arrakasta"><b>${L().ondoDagoela}</b> ${inlineMd(T(e.arrakasta))}</p>`:""}</div>
    </details>`).join("");
  return `<h2 class="blk">${L().ariketak}</h2><p style="color:var(--ink-dim);font-size:14px;margin:-4px 0 14px">${L().ariketakIntro}</p><div class="levels">${lvls}</div>`;
}

/* ---------- Galdetegia ---------- */
function renderQuiz(temaId, coins, galderak){
  if(!galderak||!galderak.length) return "";
  const qs = galderak.map((q,qi)=>{
    const opts = q.aukerak.map((o,oi)=>`<label class="opt"><input type="radio" name="q${temaId}_${qi}" value="${oi}">${inlineMd(T(o))}</label>`).join("");
    return `<div class="q" data-correct="${q.zuzena}"><p class="stem">${inlineMd(T(q.galdera))}</p>${opts}<p class="explain">${inlineMd(T(q.azalpena)||"")}</p></div>`;
  }).join("");
  return `<h2 class="blk">${L().autoeb}</h2>
    <div class="quiz" data-tema="${temaId}" data-coins="${coins}" data-pass="0.7">
      <div class="q-head"><h3>${L().egiaztatu}</h3><span class="score">—</span></div>
      ${qs}
      <div class="q-foot"><button class="btn" data-grade>${L().zuzendu}</button><div class="result"></div></div>
    </div>`;
}

/* =====================================================================
   ORRIAK
   ===================================================================== */
function temaById(id){
  for(const a of CURSO.asignaturak) for(const t of a.temak) if(t.id===id) return {asig:a,tema:t};
  return null;
}
function temaIndex(id){
  const flat=[]; CURSO.asignaturak.forEach(a=>a.temak.forEach(t=>flat.push(t)));
  return { flat, i: flat.findIndex(t=>t.id===id) };
}

function renderDashboard(){
  const s = state();
  const lvl = levelOf(s.coins);
  let html = `<div class="hero">
    <p class="eyebrow">${L().heroEye}</p>
    <h1>${L().heroTitle1}<span class="accent">${L().heroAccent}</span>${L().heroTitle2}</h1>
    <p>${L().heroText}</p>
    <div class="stat-row">
      <div class="stat coins"><div class="n" id="d-coins">${s.coins}</div><div class="l">🪙 ${L().txanpon}</div></div>
      <div class="stat lvl"><div class="n">${lvl}</div><div class="l">${L().maila.toLowerCase()}</div></div>
      <div class="stat done"><div class="n">${doneCount()}/${totalTemas()}</div><div class="l">${L().osatuta}</div></div>
      <div class="stat streak"><div class="n">${s.streak}</div><div class="l">🔥 ${L().racha}</div></div>
    </div>
  </div>`;

  CURSO.asignaturak.forEach(asig=>{
    html += `<div class="section-title"><h2>${asig.ikonoa} ${esc(asig.izena)}</h2><span class="sub">${asig.temak.length} ${L().temaKop}</span></div><div class="cards">`;
    asig.temak.forEach((t,i)=>{
      const done = !!s.done[t.id];
      html += `<button class="card" onclick="location.hash='#/tema/${t.id}'">
        <span class="tnum">${asig.izena.toUpperCase()} · ${L().tema.toUpperCase()} ${t.zenbakia}</span>
        <h3>${esc(T(t.izenburua))}</h3>
        <p>${esc(T(t.laburpena))}</p>
        <div class="foot"><span class="reward">${done?'✓ '+L().osatuta:'🪙 '+t.puntuak}</span>
          <span class="badge ${done?'done':''}">${done?L().osatuta:L().irekita}</span></div>
        <div class="pbar"><i style="width:${done?100:0}%"></i></div>
      </button>`;
    });
    html += `</div>`;
  });
  return html;
}

function renderTemaPage(id){
  const found = temaById(id); if(!found) return renderDashboard();
  const { asig, tema } = found;
  const s = state();
  let html = `<div class="crumb"><a href="#/">${L().hasiera}</a> › ${esc(asig.izena)} › ${L().tema} ${tema.zenbakia}</div>
    <div class="tema-head"><h1>${esc(T(tema.izenburua))}</h1><p class="lead">${esc(T(tema.laburpena))}</p></div>`;
  (tema.atalak||[]).forEach(a=>{ html += renderAtal(a); });
  html += renderAriketak(tema.ariketak);
  html += renderQuiz(tema.id, tema.puntuak, tema.galdetegia);

  const done = !!s.done[tema.id];
  html += `<div class="complete-bar"><p>${done?L().osatutaAz:L().markatuAz}</p>
    <button class="btn ghost" data-complete="${tema.id}" data-coins="${tema.puntuak}">${done?L().osatutaBtn:L().markatu}</button></div>`;

  const { flat, i } = temaIndex(id);
  const prev = flat[i-1], next = flat[i+1];
  html += `<div class="pager">
    ${prev?`<button onclick="location.hash='#/tema/${prev.id}'"><small>${L().aurrekoa}</small><span>‹ ${esc(T(prev.izenburua))}</span></button>`:`<button onclick="location.hash='#/'"><small>${L().itzuli}</small><span>${L().hasiera}</span></button>`}
    ${next?`<button class="next" onclick="location.hash='#/tema/${next.id}'"><small>${L().hurrengoa}</small><span>${esc(T(next.izenburua))} ›</span></button>`:`<button class="next" onclick="location.hash='#/'"><small>${L().bukaera}</small><span>${L().itzuliMapara} ›</span></button>`}
  </div>`;
  return html;
}

function renderLogroak(){
  const s = state();
  let html = `<div class="hero"><p class="eyebrow">${L().logroak}</p><h1>${L().logroak}</h1></div><div class="logros">`;
  LOGROAK.forEach(l=>{
    const on = !!s.logros[l.id];
    html += `<div class="logro ${on?'unlocked':'locked'}"><span class="ic">${on?l.ic:'🔒'}</span><div><h4>${esc(T(l.izen))}</h4><p>${esc(T(l.desk))}</p></div></div>`;
  });
  return html + `</div>`;
}

/* =====================================================================
   WIRING (kopiatu, quiz, complete)
   ===================================================================== */
function wirePage(){
  document.querySelectorAll("[data-copy]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const term = btn.closest(".term");
      const cmds=[...term.querySelectorAll("pre code .cmd")].map(c=>c.textContent);
      const text = cmds.length?cmds.join("\n"):term.querySelector("pre").innerText;
      navigator.clipboard.writeText(text).then(()=>{const o=btn.textContent;btn.textContent="kopiatuta";setTimeout(()=>btn.textContent=o,1200);});
    });
  });
  document.querySelectorAll(".quiz").forEach(quiz=>{
    const qs=[...quiz.querySelectorAll(".q")], pass=parseFloat(quiz.dataset.pass);
    const temaId=quiz.dataset.tema, coins=+quiz.dataset.coins;
    qs.forEach(q=>q.querySelectorAll(".opt").forEach(opt=>opt.addEventListener("click",()=>{
      q.querySelectorAll(".opt").forEach(o=>o.classList.remove("sel"));opt.classList.add("sel");opt.querySelector("input").checked=true;})));
    quiz.querySelector("[data-grade]").addEventListener("click",()=>{
      let ok=0;
      qs.forEach(q=>{
        const correct=q.dataset.correct, chosen=q.querySelector("input:checked"), exp=q.querySelector(".explain");
        q.querySelectorAll(".opt").forEach(o=>o.classList.remove("correct","wrong"));
        if(chosen){const lbl=chosen.closest(".opt");if(chosen.value===correct){lbl.classList.add("correct");ok++;}else{lbl.classList.add("wrong");q.querySelector(`input[value="${correct}"]`).closest(".opt").classList.add("correct");}}
        else{q.querySelector(`input[value="${correct}"]`).closest(".opt").classList.add("correct");}
        if(exp){exp.classList.add("show");const good=chosen&&chosen.value===correct;exp.classList.toggle("ok",good);exp.classList.toggle("no",!good);}
      });
      const ratio=ok/qs.length, res=quiz.querySelector(".result"), sc=quiz.querySelector(".score");
      sc.textContent=`${ok}/${qs.length}`; res.classList.add("show");
      if(ratio>=pass){
        res.style.color="var(--ok)";
        const was=state().done[temaId];
        res.innerHTML=`✅ ${ok}/${qs.length} — ${L().gaindituta}.`;
        if(!was) markTema(temaId, coins);
      }else{res.style.color="var(--red)";res.innerHTML=`❌ ${ok}/${qs.length} — ${Math.ceil(pass*qs.length)}/${qs.length} ${L().behar}`;}
    });
  });
  document.querySelectorAll("[data-complete]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const id=btn.dataset.complete;
      if(state().done[id]) return;
      markTema(id, +btn.dataset.coins);
      btn.textContent=L().osatutaBtn;
    });
  });
  // simuladoreak abiarazi
  Object.keys(SIMS).forEach(k=>{ if(document.getElementById(SIMS[k].root) && SIMS[k].init) SIMS[k].init(); });
}

/* ---------- Sidebar ---------- */
function buildSidebar(active){
  const s=state(); const lang=getLang();
  let html = `<div class="nav-group">
    <div class="lang-switch">
      <button class="lang-btn ${lang==='eu'?'on':''}" data-lang="eu">EU</button>
      <button class="lang-btn ${lang==='es'?'on':''}" data-lang="es">ES</button>
    </div>
    <div class="nav-item ${active==='dash'?'active':''}" onclick="location.hash='#/'"><span class="ic">🏠</span> ${L().dashboard}</div>
    <div class="nav-item ${active==='logroak'?'active':''}" onclick="location.hash='#/logroak'"><span class="ic">🏅</span> ${L().logroak}</div></div>`;
  CURSO.asignaturak.forEach(asig=>{
    html += `<div class="nav-group"><div class="label">${asig.ikonoa} ${esc(asig.izena)}</div>`;
    asig.temak.forEach((t,i)=>{
      const done=!!s.done[t.id];
      const cls = active==='tema/'+t.id ? 'active':'';
      html += `<div class="nav-item ${cls}" onclick="location.hash='#/tema/${t.id}'"><span class="ic">${t.zenbakia}</span> ${esc(T(t.izenburua))} <span class="st ${done?'done':''}">${done?'✓':''}</span></div>`;
    });
    html += `</div>`;
  });
  html += `<div class="nav-group"><div class="nav-item" id="reset-btn"><span class="ic">🗑</span> ${L().reset}</div></div>`;
  document.getElementById("sidebar-nav").innerHTML = html;
  document.getElementById("reset-btn").onclick=()=>{ if(confirm(L().resetGald)){ const lg=getLang(); localStorage.removeItem(KEY); setLang(lg); location.hash='#/'; router(); } };
  document.querySelectorAll(".lang-btn").forEach(b=>b.onclick=()=>{ setLang(b.dataset.lang); router(); });
}

/* ---------- Router ---------- */
function router(){
  const h = location.hash || "#/";
  const main = document.getElementById("main-content");
  let active="dash";
  if(h.startsWith("#/tema/")){ const id=h.slice(7); main.innerHTML=renderTemaPage(id); active="tema/"+id; }
  else if(h==="#/logroak"){ main.innerHTML=renderLogroak(); active="logroak"; }
  else { main.innerHTML=renderDashboard(); active="dash"; }
  buildSidebar(active); refreshPlayer(); wirePage();
  document.querySelector(".sidebar").classList.remove("open");
  document.querySelector(".scrim").classList.remove("show");
  window.scrollTo(0,0);
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("burger").onclick=()=>{document.querySelector(".sidebar").classList.toggle("open");document.querySelector(".scrim").classList.toggle("show");};
  document.querySelector(".scrim").onclick=()=>{document.querySelector(".sidebar").classList.remove("open");document.querySelector(".scrim").classList.remove("show");};
  router();
});

/* =====================================================================
   SIMULADOREAK (registry). Edukiak {mota:"simuladorea", id:"..."} deitzen ditu.
   ===================================================================== */
const ipToInt=s=>{const p=s.trim().split(".");if(p.length!==4)return null;let n=0;for(const o of p){if(!/^\d+$/.test(o))return null;const v=+o;if(v<0||v>255)return null;n=n*256+v;}return n>>>0;};
const intToIp=n=>[24,16,8,0].map(s=>(n>>>s)&255).join(".");
const SIMS = {
  ip:{ root:"sim-ip", html:`<div class="sim" id="sim-ip"><div class="sim-head"><span class="dot"></span><h3>Simuladorea · IP eta maskara aztertu</h3></div><div class="sim-body"><div class="field"><label>IP helbidea</label><input id="ip-in" value="192.168.4.101"></div><div class="field"><label>Maskara (/24 edo 255.255.255.0)</label><input id="mask-in" value="/24"></div><div class="btn-row"><button class="btn" id="ip-go">Aztertu</button><button class="btn ghost" id="ip-rst">Reset</button></div><div class="out" id="ip-out" style="display:none"></div></div></div>`,
    init(){const out=document.getElementById("ip-out");const r=(k,v)=>`<div class="row"><span class="k">${k}</span><span class="v">${v}</span></div>`;
      const go=()=>{const ip=ipToInt(document.getElementById("ip-in").value);let m=document.getElementById("mask-in").value.trim().replace(/^\//,"");let pfx;if(/^\d+$/.test(m))pfx=+m;else{const mi=ipToInt(m);pfx=mi===null?null:(mi.toString(2).match(/1/g)||[]).length;}out.style.display="block";if(ip===null||pfx==null||pfx<0||pfx>32){out.innerHTML='<span style="color:var(--danger)">Daturen bat ez da zuzena.</span>';return;}const mask=pfx===0?0:(0xFFFFFFFF<<(32-pfx))>>>0;const net=(ip&mask)>>>0,bc=(net|(~mask>>>0))>>>0;const fo=(ip>>>24)&255;const kl=fo<=126?"A":fo<=191?"B":fo<=223?"C":"D/E";const a=(ip>>>24)&255,b=(ip>>>16)&255;const pr=(a===10||(a===172&&b>=16&&b<=31)||(a===192&&b===168))?"pribatua":"publikoa";out.innerHTML=r("Klasea",kl)+r("Mota",pr)+r("Sarea",intToIp(net))+(pfx<=30?r("Lehen host",intToIp((net+1)>>>0))+r("Azken host",intToIp((bc-1)>>>0))+r("Broadcast",intToIp(bc)):"")+r("Host kopurua",pfx>=31?0:Math.pow(2,32-pfx)-2);};
      document.getElementById("ip-go").onclick=go;document.getElementById("ip-rst").onclick=()=>{document.getElementById("ip-in").value="192.168.4.101";document.getElementById("mask-in").value="/24";out.style.display="none";};}
  },
  dns:{ root:"sim-dns", html:`<div class="sim" id="sim-dns"><div class="sim-head"><span class="dot"></span><h3>Simuladorea · DNS zonaren ebazlea</h3></div><div class="sim-body"><div class="field"><label>Domeinua (origin)</label><input id="dz-origin" value="josebabilbao.net"></div><div class="field"><label>Zona fitxategia</label><textarea id="dz-zone" spellcheck="false" style="width:100%;min-height:140px;font-family:var(--mono);font-size:13px;color:var(--ink);background:#07101e;border:1px solid var(--line);border-radius:8px;padding:11px;line-height:1.6">@               IN  A   192.168.4.101
u18zerbitzaria  IN  A   192.168.4.101
w10zer          IN  A   192.168.4.111
u20zer          IN  A   192.168.4.112
www             IN  CNAME u18zerbitzaria</textarea></div><div class="field"><label>Kontsulta (izena edo IP)</label><input id="dz-q" value="www.josebabilbao.net"></div><div class="btn-row"><button class="btn" id="dz-go">Ebatzi</button></div><div class="out" id="dz-out" style="display:none"></div></div></div>`,
    init(){const out=document.getElementById("dz-out");const fq=(n,o)=>{n=n.trim().replace(/\.$/,"");o=o.replace(/\.$/,"");if(n==="@")return o+".";if(n===o||n.endsWith("."+o))return n+".";return n+"."+o+".";};
      const go=()=>{const o=document.getElementById("dz-origin").value.trim();const A={},C={},P={};document.getElementById("dz-zone").value.split("\n").forEach(l=>{l=l.split(";")[0].trim();if(!l)return;const t=l.split(/\s+/),ii=t.indexOf("IN");if(ii<0)return;const ty=t[ii+1],ow=fq(t[0],o),rd=t.slice(ii+2);if(ty==="A"){A[ow]=rd[0];if(!P[rd[0]])P[rd[0]]=ow;}else if(ty==="CNAME")C[ow]=fq(rd[0],o);});const q=document.getElementById("dz-q").value.trim();out.style.display="block";const r=(k,v)=>`<div class="row"><span class="k">${k}</span><span class="v">${v}</span></div>`;
        if(/^\d{1,3}(\.\d{1,3}){3}$/.test(q)){out.innerHTML=r("PTR kontsulta",q)+(P[q]?r("Izena",P[q].replace(/\.$/,"")):'<span style="color:var(--danger)">PTR-rik ez</span>');return;}
        let cur=fq(q,o),chain=[];while(C[cur]&&chain.length<10){chain.push(C[cur].replace(/\.$/,""));cur=C[cur];}const ip=A[cur];out.innerHTML=r("Kontsulta",q)+(chain.length?r("CNAME katea",chain.join(" → ")):"")+(ip?r("Emaitza",ip):'<span style="color:var(--danger)">NXDOMAIN</span>');};
      document.getElementById("dz-go").onclick=go;}
  },
  dhcp:{ root:"sim-dhcp", html:`<div class="sim" id="sim-dhcp"><div class="sim-head"><span class="dot"></span><h3>Simuladorea · DHCP lease banatzailea</h3></div><div class="sim-body"><div style="display:flex;gap:12px;flex-wrap:wrap"><div class="field" style="flex:1;min-width:130px"><label>range hasiera</label><input id="dh-s" value="192.168.4.171"></div><div class="field" style="flex:1;min-width:130px"><label>range bukaera</label><input id="dh-e" value="192.168.4.175"></div></div><div class="btn-row"><button class="btn" id="dh-c">Bezeroa konektatu</button><button class="btn ghost" id="dh-r">Reset</button></div><div class="out" id="dh-out" style="display:none;margin-bottom:12px"></div><table class="data" id="dh-t" style="display:none"><thead><tr><th>MAC</th><th>IP</th></tr></thead><tbody></tbody></table></div></div>`,
    init(){let leases={};const out=document.getElementById("dh-out"),t=document.getElementById("dh-t"),tb=t.querySelector("tbody");
      const mac=()=>{const h=()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0");return "08:00:27:"+h()+":"+h()+":"+h();};
      const conn=()=>{const s=ipToInt(document.getElementById("dh-s").value),e=ipToInt(document.getElementById("dh-e").value);const m=mac();out.style.display="block";const used=new Set(Object.values(leases));let ip=null;for(let n=s;n<=e;n++){const c=intToIp(n);if(!used.has(c)){ip=c;break;}}if(!ip){out.innerHTML='<span style="color:var(--danger)">Ez dago IP librerik range-an (DHCP exhaustion)</span>';return;}leases[m]=ip;out.innerHTML=`<div class="row"><span class="k">DORA</span><span class="v">Discover→Offer→Request→Ack ✓</span></div><div class="row"><span class="k">${m}</span><span class="v" style="color:var(--ok)">${ip}</span></div>`;t.style.display="table";tb.innerHTML=Object.entries(leases).map(([k,v])=>`<tr><td class="mono">${k}</td><td class="mono">${v}</td></tr>`).join("");};
      document.getElementById("dh-c").onclick=conn;document.getElementById("dh-r").onclick=()=>{leases={};out.style.display="none";t.style.display="none";};}
  },
  squid:{ root:"sim-squid", html:`<div class="sim" id="sim-squid"><div class="sim-head"><span class="dot"></span><h3>Simuladorea · Squid ACL ebaluatzailea</h3></div><div class="sim-body"><div class="field"><label>squid.conf (acl + http_access)</label><textarea id="sq-r" spellcheck="false" style="width:100%;min-height:130px;font-family:var(--mono);font-size:13px;color:var(--ink);background:#07101e;border:1px solid var(--line);border-radius:8px;padding:11px;line-height:1.6">acl localnet src 192.168.4.0/24
acl bloketuak dstdomain .facebook.com .youtube.com
http_access deny bloketuak
http_access allow localnet
http_access deny all</textarea></div><div style="display:flex;gap:12px;flex-wrap:wrap"><div class="field" style="flex:1;min-width:130px"><label>Bezeroaren IP</label><input id="sq-ip" value="192.168.4.50"></div><div class="field" style="flex:1;min-width:150px"><label>Domeinua</label><input id="sq-d" value="www.google.com"></div></div><div class="btn-row"><button class="btn" id="sq-go">Ebaluatu</button></div><div class="out" id="sq-out" style="display:none"></div></div></div>`,
    init(){const out=document.getElementById("sq-out");const inC=(ip,c)=>{const[net,p]=c.split("/");const ii=ipToInt(ip),ni=ipToInt(net),pf=+(p??32);const m=pf===0?0:(0xFFFFFFFF<<(32-pf))>>>0;return((ii&m)>>>0)===((ni&m)>>>0);};
      const go=()=>{const acls={},acc=[];document.getElementById("sq-r").value.split("\n").forEach(l=>{l=l.split("#")[0].trim();if(!l)return;const t=l.split(/\s+/);if(t[0]==="acl")acls[t[1]]={type:t[2],vals:t.slice(3)};else if(t[0]==="http_access")acc.push({a:t[1],acl:t[2]});});const ip=document.getElementById("sq-ip").value.trim(),dom=document.getElementById("sq-d").value.trim().toLowerCase();out.style.display="block";const r=(k,v,c)=>`<div class="row"><span class="k">${k}</span><span class="v" ${c?`style="color:${c}"`:""}>${v}</span></div>`;
        const match=(acl)=>{if(!acl)return false;if(acl.type==="src")return acl.vals.some(c=>inC(ip,c));if(acl.type==="dstdomain")return acl.vals.some(d=>{d=d.toLowerCase();return d.startsWith(".")?(dom===d.slice(1)||dom.endsWith(d)):dom===d;});return false;};
        for(let i=0;i<acc.length;i++){const m=acc[i].acl==="all"||match(acls[acc[i].acl]);if(m){const ok=acc[i].a==="allow";out.innerHTML=r("Eskaera",ip+" → "+dom)+r("Erabakia",`lerroa ${i+1}: http_access ${acc[i].a} ${acc[i].acl}`)+r("Emaitza",ok?"BAIMENDUA ✓":"UKATUA ✗",ok?"var(--ok)":"var(--danger)");return;}}out.innerHTML=r("Emaitza","UKATUA ✗ (defektuz)","var(--danger)");};
      document.getElementById("sq-go").onclick=go;}
  },
  mail:{ root:"sim-mail", html:`<div class="sim" id="sim-mail"><div class="sim-head"><span class="dot"></span><h3>Simuladorea · Postaren bidea</h3></div><div class="sim-body"><div style="display:flex;gap:12px;flex-wrap:wrap"><div class="field" style="flex:1;min-width:150px"><label>Ekintza</label><select id="ma-a"><option value="bidali">Posta bidali</option><option value="jaso">Postontzitik jaso</option></select></div><div class="field" style="flex:1;min-width:150px"><label>Protokoloa</label><select id="ma-p"><option>SMTP</option><option>POP3</option><option>IMAP</option></select></div></div><div class="btn-row"><button class="btn" id="ma-go">Egiaztatu</button></div><div class="out" id="ma-out" style="display:none"></div></div></div>`,
    init(){const out=document.getElementById("ma-out");const ports={SMTP:"25 / 587",POP3:"110",IMAP:"143"};const r=(k,v,c)=>`<div class="row"><span class="k">${k}</span><span class="v" ${c?`style="color:${c}"`:""}>${v}</span></div>`;
      const go=()=>{const a=document.getElementById("ma-a").value,p=document.getElementById("ma-p").value;out.style.display="block";const okSend=(a==="bidali"&&p==="SMTP"),okRecv=(a==="jaso"&&(p==="POP3"||p==="IMAP")),ok=okSend||okRecv;let role=p==="SMTP"?"garraioa/bidalketa":p==="POP3"?"jasotzea (jaitsi eta ezabatu)":"jasotzea (zerbitzarian sinkronizatu)";out.innerHTML=r("Ekintza",a==="bidali"?"Posta bidali":"Postontzitik jaso")+r("Protokoloa",p+" (portua "+ports[p]+")")+r("Papera",role)+r("Baliozkoa?",ok?"BAI ✓":"EZ ✗ — "+(a==="bidali"?"bidaltzeko SMTP erabiltzen da":"jasotzeko POP3 edo IMAP"),ok?"var(--ok)":"var(--danger)");};
      document.getElementById("ma-go").onclick=go;}
  },
  http:{ root:"sim-http", html:`<div class="sim" id="sim-http"><div class="sim-head"><span class="dot"></span><h3>Simuladorea · HTTP eskaera</h3></div><div class="sim-body"><div style="display:flex;gap:12px;flex-wrap:wrap"><div class="field" style="flex:0 0 120px"><label>Metodoa</label><select id="ht-m"><option>GET</option><option>POST</option><option>HEAD</option></select></div><div class="field" style="flex:1;min-width:170px"><label>Bidea</label><input id="ht-p" value="/index.html"></div></div><div class="btn-row"><button class="btn" id="ht-go">Bidali</button></div><div class="out" id="ht-out" style="display:none"></div></div></div>`,
    init(){const out=document.getElementById("ht-out");const SRV={"/index.html":200,"/":200,"/about.html":200,"/admin":403,"/wordpress":200};
      const go=()=>{const me=document.getElementById("ht-m").value,pa=document.getElementById("ht-p").value.trim()||"/";const st=SRV.hasOwnProperty(pa)?SRV[pa]:404;const tx={200:"OK",403:"Forbidden",404:"Not Found"};out.style.display="block";const r=(k,v,c)=>`<div class="row"><span class="k">${k}</span><span class="v" ${c?`style="color:${c}"`:""}>${v}</span></div>`;out.innerHTML=r("Eskaera",`${me} ${pa} HTTP/1.1`)+r("Erantzuna",`${st} ${tx[st]}`,st===200?"var(--ok)":"var(--danger)")+r("Familia",st<300?"2xx arrakasta":st<500?"4xx bezero-errorea":"5xx zerbitzari-errorea")+r("Gorputza",me==="HEAD"?"(HEAD: goiburuak soilik)":(st===200?"<html>…</html>":"errore-orria"));};
      document.getElementById("ht-go").onclick=go;}
  },
  routing:{ root:"sim-routing", html:`<div class="sim" id="sim-routing"><div class="sim-head"><span class="dot"></span><h3>Simuladorea · Bideratze-taula</h3></div><div class="sim-body"><p style="margin-top:0;color:var(--ink-dim);font-size:14px">Sartu taula (sarea/prefixa eta <code class="inline">local</code> edo <code class="inline">via IP</code>) eta helmuga bat. Aurrizki luzeena duen bideak irabazten du.</p><div class="field"><label>Bideratze-taula</label><textarea id="rt-t" spellcheck="false" style="width:100%;min-height:110px;font-family:var(--mono);font-size:13px;color:var(--ink);background:#07101e;border:1px solid var(--line);border-radius:8px;padding:11px;line-height:1.6">192.168.4.0/24 local
172.16.0.0/16 via 192.168.4.2
0.0.0.0/0 via 192.168.4.1</textarea></div><div class="field"><label>Helmuga IP</label><input id="rt-d" value="172.16.5.20"></div><div class="btn-row"><button class="btn" id="rt-go">Bideratu</button></div><div class="out" id="rt-out" style="display:none"></div></div></div>`,
    init(){const out=document.getElementById("rt-out");const r=(k,v,c)=>`<div class="row"><span class="k">${k}</span><span class="v" ${c?`style="color:${c}"`:""}>${v}</span></div>`;
      const go=()=>{const dest=ipToInt(document.getElementById("rt-d").value);out.style.display="block";if(dest===null){out.innerHTML='<span style="color:var(--danger)">Helmuga IP okerra.</span>';return;}
        const routes=document.getElementById("rt-t").value.split("\n").map(l=>l.split("#")[0].trim()).filter(Boolean).map(l=>{const t=l.split(/\s+/);const seg=t[0].split("/");return{net:ipToInt(seg[0]),pfx:+seg[1],via:(t[1]==="via"?t[2]:"local"),raw:l};}).filter(x=>x.net!==null&&!isNaN(x.pfx));
        let best=null;for(const rt of routes){const m=rt.pfx===0?0:(0xFFFFFFFF<<(32-rt.pfx))>>>0;if(((dest&m)>>>0)===((rt.net&m)>>>0)){if(!best||rt.pfx>best.pfx)best=rt;}}
        if(!best){out.innerHTML=r("Emaitza","Ez dago biderik (eta lehenetsitakorik ez)","var(--danger)");return;}
        out.innerHTML=r("Helmuga",intToIp(dest))+r("Bat datorren bidea","<b>"+best.raw+"</b>")+r("Aurrizkia","/"+best.pfx+(best.pfx===0?" (lehenetsia)":""))+r("Hurrengo saltoa",best.via==="local"?'<span class="okbox">zuzenean entregatu (local)</span>':'<span class="hot">'+best.via+'</span>');};
      document.getElementById("rt-go").onclick=go;}
  },
  sshcmd:{ root:"sim-sshcmd", html:`<div class="sim" id="sim-sshcmd"><div class="sim-head"><span class="dot"></span><h3>Simuladorea · ssh / scp komandoa eraiki</h3></div><div class="sim-body"><div style="display:flex;gap:12px;flex-wrap:wrap"><div class="field" style="flex:1;min-width:120px"><label>Erabiltzailea</label><input id="sc-u" value="mss2"></div><div class="field" style="flex:1;min-width:140px"><label>Host (IP)</label><input id="sc-h" value="192.168.4.101"></div><div class="field" style="flex:0 0 90px"><label>Portua</label><input id="sc-p" value="22"></div></div><div style="display:flex;gap:12px;flex-wrap:wrap"><div class="field" style="flex:1;min-width:160px"><label>Ekintza</label><select id="sc-a"><option value="ssh">Saioa ireki (ssh)</option><option value="igo">Fitxategia igo (scp)</option><option value="jaitsi">Fitxategia jaitsi (scp)</option></select></div><div class="field" style="flex:1;min-width:140px"><label>Fitxategia</label><input id="sc-f" value="txostena.txt"></div></div><div class="btn-row"><button class="btn" id="sc-go">Eraiki</button></div><div class="out" id="sc-out" style="display:none"></div></div></div>`,
    init(){const out=document.getElementById("sc-out");const v=id=>document.getElementById(id).value.trim();const r=(k,val,c)=>`<div class="row"><span class="k">${k}</span><span class="v" ${c?`style="color:${c}"`:""}>${val}</span></div>`;
      const go=()=>{const u=v("sc-u"),h=v("sc-h"),p=v("sc-p")||"22",a=v("sc-a"),f=v("sc-f");let cmd,desc;
        if(a==="ssh"){cmd=`ssh ${p!=="22"?"-p "+p+" ":""}${u}@${h}`;desc="Urruneko terminal-saio zifratua";}
        else if(a==="igo"){cmd=`scp ${p!=="22"?"-P "+p+" ":""}${f} ${u}@${h}:/home/${u}/`;desc="Fitxategia zerbitzarira igo (lokala → urrunekoa)";}
        else{cmd=`scp ${p!=="22"?"-P "+p+" ":""}${u}@${h}:/home/${u}/${f} .`;desc="Fitxategia zerbitzaritik jaitsi (urrunekoa → lokala)";}
        out.style.display="block";out.innerHTML=r("Komandoa",cmd,"var(--link)")+r("Egiten du",desc)+(p!=="22"?r("Oharra","ssh-k -p erabiltzen du; scp-k -P (larriz)","var(--amber)"):"");};
      document.getElementById("sc-go").onclick=go;}
  },
  ftpmode:{ root:"sim-ftpmode", html:`<div class="sim" id="sim-ftpmode"><div class="sim-head"><span class="dot"></span><h3>Simuladorea · FTP aktiboa vs pasiboa</h3></div><div class="sim-body"><div class="btn-row" style="margin-bottom:8px"><button class="btn" id="fm-a">Aktiboa (PORT)</button><button class="btn ghost" id="fm-p">Pasiboa (PASV)</button></div><div class="out" id="fm-out"></div></div></div>`,
    init(){const out=document.getElementById("fm-out");
      const ACT=`<div class="row"><span class="k">Modua</span><span class="v" style="color:var(--link)">AKTIBOA (PORT)</span></div><div class="row"><span class="k">Kontrola</span><span class="v">bezeroa:1035 → zerbitzaria:21</span></div><div class="row"><span class="k">Datuak</span><span class="v">zerbitzaria:20 → bezeroa:1036 (ZERBITZARIAK irekitzen du)</span></div><div class="row"><span class="k">Arazoa</span><span class="v" style="color:var(--amber)">bezeroa NAT/suebaki atzean badago, huts egiten du</span></div>`;
      const PAS=`<div class="row"><span class="k">Modua</span><span class="v" style="color:var(--link)">PASIBOA (PASV)</span></div><div class="row"><span class="k">Kontrola</span><span class="v">bezeroa:1035 → zerbitzaria:21</span></div><div class="row"><span class="k">Datuak</span><span class="v">bezeroa:1036 → zerbitzaria:portu-altua (BEZEROAK irekitzen du)</span></div><div class="row"><span class="k">Abantaila</span><span class="v" style="color:var(--ok)">NAT/suebaki atzean dabil: bezeroak beti irteten du</span></div>`;
      const show=m=>{out.innerHTML=m==="a"?ACT:PAS;document.getElementById("fm-a").className=m==="a"?"btn":"btn ghost";document.getElementById("fm-p").className=m==="p"?"btn":"btn ghost";};
      document.getElementById("fm-a").onclick=()=>show("a");document.getElementById("fm-p").onclick=()=>show("p");show("a");}
  },
  ercard:{ root:"sim-ercard", html:`<div class="sim" id="sim-ercard"><div class="sim-head"><span class="dot"></span><h3>Simuladorea · E/R → eredu erlazionala</h3></div><div class="sim-body"><p style="margin-top:0;color:var(--ink-dim);font-size:14px">Aukeratu bi entitate eta haien arteko kardinalitatea. Simuladoreak esaten dizu nola bihurtzen den taula eta gako bihurtzen.</p><div style="display:flex;gap:12px;flex-wrap:wrap"><div class="field" style="flex:1;min-width:120px"><label>A entitatea</label><input id="er-a" value="IKASLEA"></div><div class="field" style="flex:0 0 110px"><label>Kardinalitatea</label><select id="er-c"><option>1:1</option><option>1:N</option><option>N:M</option></select></div><div class="field" style="flex:1;min-width:120px"><label>B entitatea</label><input id="er-b" value="IRAKASGAIA"></div></div><div class="btn-row"><button class="btn" id="er-go">Bihurtu</button></div><div class="out" id="er-out" style="display:none"></div></div></div>`,
    init(){const out=document.getElementById("er-out");const v=id=>document.getElementById(id).value.trim()||"?";const r=(k,val,c)=>`<div class="row"><span class="k">${k}</span><span class="v" ${c?`style="color:${c}"`:""}>${val}</span></div>`;
      const go=()=>{const a=v("er-a"),b=v("er-b"),c=document.getElementById("er-c").value;out.style.display="block";let sol;
        if(c==="1:1")sol=r("Araua","Bi taula; gako arrotza edozeinetan (edo bat egin)")+r("Taulak",`${a}(...), ${b}(..., ${a}_id FK)`)+r("Gakoa",`${b}-n ${a}-ren gako nagusia FK gisa, UNIQUE`,"var(--link)");
        else if(c==="1:N")sol=r("Araua","Gako arrotza N aldean")+r("Taulak",`${a}(...), ${b}(..., ${a}_id FK)`)+r("Gakoa",`${b} (N aldea) eramaten du ${a}-ren gako nagusia FK gisa`,"var(--link)");
        else sol=r("Araua","Hirugarren taula bat (lotura-taula)")+r("Taulak",`${a}(...), ${b}(...), ${a}_${b}(${a}_id, ${b}_id)`)+r("Gakoa",`lotura-taularen gako nagusia konposatua: (${a}_id, ${b}_id), biak FK`,"var(--ok)");
        out.innerHTML=r("Erlazioa",`${a} ${c} ${b}`)+sol;};
      document.getElementById("er-go").onclick=go;}
  },
  sql:{ root:"sim-sql", html:`<div class="sim" id="sim-sql"><div class="sim-head"><span class="dot"></span><h3>Simuladorea · SQL · CREATE / INSERT / SELECT</h3></div><div class="sim-body"><p style="margin-top:0;color:var(--ink-dim);font-size:14px">Idatzi SQL eta sakatu Exekutatu. Onartzen ditu CREATE TABLE, INSERT, SELECT (WHERE / ORDER BY), UPDATE, DELETE eta DROP. · Escribe SQL y pulsa Ejecutar.</p><div class="field"><label>SQL</label><textarea id="sql-in" spellcheck="false" style="width:100%;min-height:150px;line-height:1.6">CREATE TABLE IKASLEA (NAN CHAR(9) PRIMARY KEY, IZENA VARCHAR(15), NOTA DOUBLE(3,1));
INSERT INTO IKASLEA VALUES ('111','Ainhoa',8.5);
INSERT INTO IKASLEA VALUES ('222','Jon',4);
INSERT INTO IKASLEA VALUES ('333','Maddi',9.2);
SELECT IZENA, NOTA FROM IKASLEA WHERE NOTA >= 5 ORDER BY NOTA DESC;</textarea></div><div class="btn-row"><button class="btn" id="sql-go">Exekutatu · Ejecutar</button><button class="btn ghost" id="sql-rst">Reset</button></div><div id="sql-out" style="margin-top:14px"></div></div></div>`,
    init(){
      const ta=document.getElementById("sql-in"), out=document.getElementById("sql-out"); if(!ta) return;
      const def=ta.value;
      const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
      const ok=t=>`<div style="color:var(--blue);font-family:var(--mono);font-size:13px;margin:4px 0">✓ ${t}</div>`;
      const ko=t=>`<div style="color:var(--red);font-family:var(--mono);font-size:13px;margin:4px 0">✗ ${t}</div>`;
      function splitTop(s,sep){const r=[];let d=0,q=null,cur="";for(const ch of s){if(q){cur+=ch;if(ch===q)q=null;continue;}if(ch==="'"||ch==='"'){q=ch;cur+=ch;continue;}if(ch==='(')d++;if(ch===')')d--;if(ch===sep&&d===0){r.push(cur);cur="";}else cur+=ch;}if(cur.trim()!=="")r.push(cur);return r;}
      function pval(v){v=v.trim();if((v[0]==="'"&&v.slice(-1)==="'")||(v[0]==='"'&&v.slice(-1)==='"'))return v.slice(1,-1);if(v.toUpperCase()==="NULL")return null;const n=Number(v);return isNaN(n)||v===""?v:n;}
      function cmp(a,op,b){const na=Number(a),nb=Number(b);const bothNum=!isNaN(na)&&!isNaN(nb)&&a!==null&&a!==""&&b!=="";const x=bothNum?na:String(a===null?"":a),y=bothNum?nb:String(b);switch(op){case"=":case"==":return x==y;case"!=":case"<>":return x!=y;case">":return x>y;case"<":return x<y;case">=":return x>=y;case"<=":return x<=y;}return false;}
      function where(rows,cols,cond){if(!cond)return rows;const m=cond.match(/^\s*(\w+)\s*(>=|<=|<>|!=|>|<|=)\s*([\s\S]+?)\s*$/);if(!m)return rows;const ci=cols.indexOf(m[1].toUpperCase());const op=m[2],val=pval(m[3]);return rows.filter(r=>cmp(r[ci],op,val));}
      const db={};
      function run(){
        const sqls=splitTop(ta.value,';').map(s=>s.trim()).filter(Boolean);
        let html="";
        for(const stmt of sqls){
          try{
            let m;
            if(m=stmt.match(/^CREATE\s+TABLE\s+(\w+)\s*\(([\s\S]*)\)\s*$/i)){
              const name=m[1].toUpperCase();const cols=[];
              for(let p of splitTop(m[2],',')){p=p.trim();const w=p.split(/\s+/)[0].toUpperCase();if(["PRIMARY","FOREIGN","UNIQUE","KEY","CONSTRAINT","INDEX","CHECK"].includes(w))continue;cols.push(p.split(/\s+/)[0].toUpperCase());}
              db[name]={cols,rows:[]};html+=ok(`${esc(name)} taula sortuta (${cols.length} zutabe) · tabla creada`);
            } else if(m=stmt.match(/^INSERT\s+INTO\s+(\w+)\s*(?:\(([^)]*)\))?\s*VALUES\s*\(([\s\S]*)\)\s*$/i)){
              const name=m[1].toUpperCase();const t=db[name];if(!t)throw`Ez dago ${name} taula · no existe la tabla ${name}`;
              const tcols=m[2]?m[2].split(',').map(c=>c.trim().toUpperCase()):t.cols;
              const vals=splitTop(m[3],',').map(pval);const row=t.cols.map(c=>{const i=tcols.indexOf(c);return i>=0?vals[i]:null;});t.rows.push(row);
              html+=ok(`errenkada bat sartuta ${esc(name)}-n · 1 fila insertada`);
            } else if(m=stmt.match(/^SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+?))?(?:\s+ORDER\s+BY\s+(\w+)(?:\s+(ASC|DESC))?)?\s*$/i)){
              const name=m[2].toUpperCase();const t=db[name];if(!t)throw`Ez dago ${name} taula · no existe la tabla ${name}`;
              let rows=where(t.rows.slice(),t.cols,m[3]);
              if(m[4]){const ci=t.cols.indexOf(m[4].toUpperCase());const dir=(m[5]||"ASC").toUpperCase()==="DESC"?-1:1;rows.sort((a,b)=>{const x=a[ci],y=b[ci];const nx=Number(x),ny=Number(y);if(!isNaN(nx)&&!isNaN(ny))return(nx-ny)*dir;return String(x).localeCompare(String(y))*dir;});}
              const cspec=m[1].trim();let selCols=cspec==="*"?t.cols:splitTop(cspec,',').map(c=>c.trim().replace(/\s+AS\s+\w+$/i,'').toUpperCase());
              const idx=selCols.map(c=>t.cols.indexOf(c));
              const th=selCols.map(c=>`<th>${esc(c)}</th>`).join("");
              const tr=rows.map(r=>"<tr>"+idx.map(i=>`<td class="mono">${esc(i>=0?(r[i]===null?"NULL":r[i]):"?")}</td>`).join("")+"</tr>").join("");
              html+=`<table class="data" style="margin:8px 0"><tr>${th}</tr>${tr||`<tr><td colspan="${selCols.length}" style="color:var(--ink-faint)">(0 errenkada · 0 filas)</td></tr>`}</table>`;
            } else if(m=stmt.match(/^UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?$/i)){
              const name=m[1].toUpperCase();const t=db[name];if(!t)throw`Ez dago ${name} taula · no existe la tabla ${name}`;
              const sets=splitTop(m[2],',').map(a=>{const mm=a.match(/^\s*(\w+)\s*=\s*([\s\S]+)$/);return{ci:t.cols.indexOf(mm[1].toUpperCase()),v:pval(mm[2])};});
              let n=0;where(t.rows,t.cols,m[3]).forEach(r=>{sets.forEach(s=>{if(s.ci>=0)r[s.ci]=s.v;});n++;});
              html+=ok(`${n} errenkada eguneratuta · ${n} filas actualizadas`);
            } else if(m=stmt.match(/^DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?$/i)){
              const name=m[1].toUpperCase();const t=db[name];if(!t)throw`Ez dago ${name} taula · no existe la tabla ${name}`;
              const before=t.rows.length;t.rows=m[2]?t.rows.filter(r=>!where([r],t.cols,m[2]).length):[];
              html+=ko(`${before-t.rows.length} errenkada ezabatuta · ${before-t.rows.length} filas borradas`);
            } else if(m=stmt.match(/^DROP\s+TABLE\s+(\w+)\s*$/i)){
              const name=m[1].toUpperCase();delete db[name];html+=ko(`${esc(name)} taula ezabatuta · tabla eliminada`);
            } else {
              html+=ko(`ulertu gabe · no entendido: ${esc(stmt.slice(0,40))}…`);
            }
          }catch(e){html+=ko(esc(e));}
        }
        out.innerHTML=html||`<div style="color:var(--ink-faint)">—</div>`;
      }
      document.getElementById("sql-go").onclick=run;
      document.getElementById("sql-rst").onclick=()=>{ta.value=def;out.innerHTML="";};
      run();
    }
  },
  normgame:{ root:"sim-normgame", html:`<div class="sim" id="sim-normgame"><div class="sim-head"><span class="dot"></span><h3>Erronka · Normalizazioa · Reto de normalización</h3></div><div class="sim-body"><div id="ng-area"></div></div></div>`,
    init(){
      const lang=(typeof getLang==='function'?getLang():'eu');
      const tr=(o)=>(o&&typeof o==='object')?(o[lang]||o.eu):o;
      const es=lang==='es';
      const area=document.getElementById("ng-area"); if(!area) return;
      const OPTS=["1FN","2FN","3FN","4FN"];
      const rounds=[
        { correct:0,
          t:{eu:`<table class="data"><tr><th>izena</th><th>telefonoa</th></tr><tr><td class="mono">Ainhoa</td><td class="mono">600111 / 666222</td></tr></table><p style="color:var(--ink-dim);font-size:13px">Eremu batek bi balio ditu errenkada batean.</p>`,
              es:`<table class="data"><tr><th>nombre</th><th>teléfono</th></tr><tr><td class="mono">Ainhoa</td><td class="mono">600111 / 666222</td></tr></table><p style="color:var(--ink-dim);font-size:13px">Un campo contiene dos valores en una fila.</p>`},
          exp:{eu:"Eremu batean bi balio (ez atomikoa) → 1FN hausten du.",es:"Dos valores en un campo (no atómico) → incumple 1FN."} },
        { correct:1,
          t:{eu:`<table class="data"><tr><th>ikaslea (PK)</th><th>irakasgaia (PK)</th><th>nota</th><th>ikasle_izena</th></tr><tr><td class="mono">111</td><td class="mono">Sareak</td><td class="mono">8</td><td class="mono">Ainhoa</td></tr><tr><td class="mono">111</td><td class="mono">DB</td><td class="mono">9</td><td class="mono">Ainhoa</td></tr></table><p style="color:var(--ink-dim);font-size:13px">Gako konposatua. <code class="inline">ikasle_izena</code> <b>ikaslea</b>-ren mende soilik dago.</p>`,
              es:`<table class="data"><tr><th>alumno (PK)</th><th>asignatura (PK)</th><th>nota</th><th>nombre_alumno</th></tr><tr><td class="mono">111</td><td class="mono">Redes</td><td class="mono">8</td><td class="mono">Ainhoa</td></tr><tr><td class="mono">111</td><td class="mono">BBDD</td><td class="mono">9</td><td class="mono">Ainhoa</td></tr></table><p style="color:var(--ink-dim);font-size:13px">Clave compuesta. <code class="inline">nombre_alumno</code> depende solo de <b>alumno</b>.</p>`},
          exp:{eu:"Atributua gako-zati baten mende (osoaren ez) → 2FN hausten du.",es:"El atributo depende de parte de la clave (no de la completa) → incumple 2FN."} },
        { correct:2,
          t:{eu:`<table class="data"><tr><th>id (PK)</th><th>saila</th><th>sailaren_hiria</th></tr><tr><td class="mono">1</td><td class="mono">Informatika</td><td class="mono">Bilbo</td></tr><tr><td class="mono">2</td><td class="mono">Informatika</td><td class="mono">Bilbo</td></tr></table><p style="color:var(--ink-dim);font-size:13px"><code class="inline">sailaren_hiria</code> <b>sailaren</b> mende dago, ez id-ren.</p>`,
              es:`<table class="data"><tr><th>id (PK)</th><th>depto</th><th>ciudad_depto</th></tr><tr><td class="mono">1</td><td class="mono">Informática</td><td class="mono">Bilbao</td></tr><tr><td class="mono">2</td><td class="mono">Informática</td><td class="mono">Bilbao</td></tr></table><p style="color:var(--ink-dim);font-size:13px"><code class="inline">ciudad_depto</code> depende de <b>depto</b>, no de id.</p>`},
          exp:{eu:"Mendekotasun iragankorra (PK→saila→hiria) → 3FN hausten du.",es:"Dependencia transitiva (PK→depto→ciudad) → incumple 3FN."} },
        { correct:3,
          t:{eu:`<table class="data"><tr><th>izena</th><th>irakasgaia</th><th>telefonoa</th></tr><tr><td class="mono">Joseba</td><td class="mono">Sareak</td><td class="mono">600111</td></tr><tr><td class="mono">Joseba</td><td class="mono">Sareak</td><td class="mono">600222</td></tr><tr><td class="mono">Joseba</td><td class="mono">DB</td><td class="mono">600111</td></tr><tr><td class="mono">Joseba</td><td class="mono">DB</td><td class="mono">600222</td></tr></table><p style="color:var(--ink-dim);font-size:13px">Irakasgaia eta telefonoa <b>independenteak</b>: errenkadak biderkatu egiten dira.</p>`,
              es:`<table class="data"><tr><th>nombre</th><th>asignatura</th><th>teléfono</th></tr><tr><td class="mono">Joseba</td><td class="mono">Redes</td><td class="mono">600111</td></tr><tr><td class="mono">Joseba</td><td class="mono">Redes</td><td class="mono">600222</td></tr><tr><td class="mono">Joseba</td><td class="mono">BBDD</td><td class="mono">600111</td></tr><tr><td class="mono">Joseba</td><td class="mono">BBDD</td><td class="mono">600222</td></tr></table><p style="color:var(--ink-dim);font-size:13px">Asignatura y teléfono <b>independientes</b>: las filas se multiplican.</p>`},
          exp:{eu:"Bi mendekotasun anitzkoitz independente taula berean → 4FN hausten du.",es:"Dos dependencias multivaluadas independientes en la misma tabla → incumple 4FN."} },
        { correct:0,
          t:{eu:`<table class="data"><tr><th>eskaera</th><th>produktua1</th><th>produktua2</th><th>produktua3</th></tr><tr><td class="mono">E1</td><td class="mono">Arkatza</td><td class="mono">Papera</td><td class="mono">Borragoma</td></tr></table><p style="color:var(--ink-dim);font-size:13px">Zutabe errepikatuak (produktua1, 2, 3): talde errepikakorra.</p>`,
              es:`<table class="data"><tr><th>pedido</th><th>producto1</th><th>producto2</th><th>producto3</th></tr><tr><td class="mono">E1</td><td class="mono">Lápiz</td><td class="mono">Papel</td><td class="mono">Goma</td></tr></table><p style="color:var(--ink-dim);font-size:13px">Columnas repetidas (producto1, 2, 3): grupo repetitivo.</p>`},
          exp:{eu:"Talde errepikakorra (zutabeak errepikatuta) → 1FN hausten du.",es:"Grupo repetitivo (columnas repetidas) → incumple 1FN."} },
        { correct:2,
          t:{eu:`<table class="data"><tr><th>isbn (PK)</th><th>izenburua</th><th>argitaletxea</th><th>argitaletxe_hiria</th></tr><tr><td class="mono">978-1</td><td class="mono">SQL</td><td class="mono">Anaya</td><td class="mono">Madril</td></tr></table><p style="color:var(--ink-dim);font-size:13px"><code class="inline">argitaletxe_hiria</code> <b>argitaletxearen</b> mende dago.</p>`,
              es:`<table class="data"><tr><th>isbn (PK)</th><th>título</th><th>editorial</th><th>ciudad_editorial</th></tr><tr><td class="mono">978-1</td><td class="mono">SQL</td><td class="mono">Anaya</td><td class="mono">Madrid</td></tr></table><p style="color:var(--ink-dim);font-size:13px"><code class="inline">ciudad_editorial</code> depende de <b>editorial</b>.</p>`},
          exp:{eu:"PK→argitaletxea→hiria iragankorra → 3FN hausten du.",es:"PK→editorial→ciudad transitiva → incumple 3FN."} }
      ];
      let order, idx, score;
      function shuffle(){order=rounds.map((_,i)=>i);for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}}
      function render(){
        if(idx>=order.length){win();return;}
        const r=rounds[order[idx]];
        const q=es?"¿Qué forma normal INCUMPLE esta tabla?":"Zein forma normal HAUSTEN du taula honek?";
        area.innerHTML=`<div style="display:flex;justify-content:space-between;font-family:var(--mono);font-size:12px;color:var(--ink-dim);margin-bottom:8px"><span>${es?'Ronda':'Txanda'} ${idx+1}/${order.length}</span><span>${es?'Puntos':'Puntuak'}: ${score}</span></div>${tr(r.t)}<p style="font-weight:600;color:var(--navy);margin:10px 0 8px">${q}</p><div class="btn-row" id="ng-opts">${OPTS.map((o,i)=>`<button class="btn ghost" data-i="${i}">${o}</button>`).join("")}</div><div id="ng-fb" style="margin-top:10px"></div>`;
        area.querySelectorAll("#ng-opts button").forEach(b=>b.onclick=()=>answer(+b.dataset.i));
      }
      function answer(i){
        const r=rounds[order[idx]];
        area.querySelectorAll("#ng-opts button").forEach(b=>{b.disabled=true;const bi=+b.dataset.i;if(bi===r.correct){b.style.borderColor="var(--ok)";b.style.color="var(--ok)";}if(bi===i&&i!==r.correct){b.style.borderColor="var(--red)";b.style.color="var(--red)";}});
        const good=i===r.correct; if(good)score++;
        const last=idx+1>=order.length;
        document.getElementById("ng-fb").innerHTML=`<div style="color:${good?'var(--ok)':'var(--red)'};font-weight:600">${good?(es?'¡Correcto!':'Zuzena!'):(es?'Incorrecto':'Oker')} — ${OPTS[r.correct]}</div><div style="color:var(--ink-dim);font-size:14px;margin-top:4px">${tr(r.exp)}</div><div class="btn-row" style="margin-top:10px"><button class="btn" id="ng-next">${last?(es?'Ver resultado':'Emaitza ikusi'):(es?'Siguiente':'Hurrengoa')}</button></div>`;
        document.getElementById("ng-next").onclick=()=>{idx++;render();};
      }
      function win(){
        const pct=Math.round(score/order.length*100);
        const ico=pct===100?'🏆':pct>=60?'👍':'📚';
        const msg=pct===100?(es?'¡Perfecto! Dominas la normalización.':'Bikain! Normalizazioa menderatzen duzu.'):pct>=60?(es?'¡Bien! Repasa los fallos.':'Ondo! Errepasatu hutsak.'):(es?'Repasa la teoría e inténtalo de nuevo.':'Errepasatu teoria eta saiatu berriz.');
        area.innerHTML=`<div style="text-align:center;padding:10px"><div style="font-size:40px">${ico}</div><h3 style="color:var(--navy);margin:6px 0">${score}/${order.length}</h3><p style="color:var(--ink-dim)">${msg}</p><div class="btn-row" style="justify-content:center"><button class="btn" id="ng-rst">${es?'Jugar otra vez':'Berriz jolastu'}</button></div></div>`;
        document.getElementById("ng-rst").onclick=()=>{shuffle();idx=0;score=0;render();};
      }
      shuffle();idx=0;score=0;render();
    }
  },
  chmod:{ root:"sim-chmod", html:`<div class="sim" id="sim-chmod"><div class="sim-head"><span class="dot"></span><h3>Simuladorea · chmod baimenak · permisos</h3></div><div class="sim-body"><div id="cm-grid"></div><div class="out" id="cm-out" style="margin-top:14px"></div></div></div>`,
    init(){
      const lang=(typeof getLang==='function'?getLang():'eu'); const es=lang==='es';
      const grid=document.getElementById("cm-grid"); if(!grid) return;
      const who=es?["Propietario","Grupo","Otros"]:["Jabea","Taldea","Besteak"];
      const perms=["r","w","x"];
      const state={o:[true,true,true],g:[true,false,true],t:[true,false,false]};
      const keys=["o","g","t"];
      function build(){
        grid.innerHTML=`<table class="data"><tr><th></th><th>r (4)</th><th>w (2)</th><th>x (1)</th></tr>`+
          keys.map((k,ki)=>`<tr><td><b>${who[ki]}</b></td>`+perms.map((p,pi)=>`<td style="text-align:center"><input type="checkbox" data-k="${k}" data-i="${pi}" ${state[k][pi]?"checked":""} style="width:18px;height:18px;accent-color:var(--blue)"></td>`).join("")+`</tr>`).join("")+`</table>`;
        grid.querySelectorAll("input").forEach(c=>c.onchange=()=>{state[c.dataset.k][+c.dataset.i]=c.checked;calc();});
        calc();
      }
      function calc(){
        const out=document.getElementById("cm-out");
        const oct=keys.map(k=>(state[k][0]?4:0)+(state[k][1]?2:0)+(state[k][2]?1:0)).join("");
        const sym=keys.map(k=>perms.map((p,i)=>state[k][i]?p:"-").join("")).join("");
        out.innerHTML=`<div class="row"><span class="k">${es?"Simbólico":"Sinbolikoa"}</span><span class="v">-${sym}</span></div>`+
          `<div class="row"><span class="k">${es?"Octal":"Zortzitarra"}</span><span class="v">${oct}</span></div>`+
          `<div class="row"><span class="k">${es?"Comando":"Komandoa"}</span><span class="v"><b>chmod ${oct} fitxategia</b></span></div>`;
      }
      build();
    }
  }
};
window.SIMS = SIMS;
})();
