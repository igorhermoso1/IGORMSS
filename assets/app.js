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
  { id:"lehena",  ic:"🌱", izen:"Lehen urratsa",   desk:"Osatu lehen tema bat.",        baldintza:s=>doneCount()>=1 },
  { id:"hirurak", ic:"⚙️", izen:"Errodaje",         desk:"Osatu 3 tema.",                baldintza:s=>doneCount()>=3 },
  { id:"erdia",   ic:"🚀", izen:"Erdibidean",       desk:"Osatu 5 tema.",                baldintza:s=>doneCount()>=5 },
  { id:"maisua",  ic:"🏆", izen:"Zerbitzu-maisua",  desk:"Osatu Zerbitzuak osorik.",     baldintza:s=>doneCount()>=totalTemas() },
  { id:"diruzaina",ic:"💰",izen:"Diruzaina",        desk:"Lortu 500 txanpon.",           baldintza:s=>s.coins>=500 },
  { id:"sutea",   ic:"🔥", izen:"Sutan",            desk:"Eduki 3 eguneko racha.",       baldintza:s=>s.streak>=3 },
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
  showModal("🎉", titleHtml || "Bikain!", coins, newLogros);
}
function markTema(temaId, coins){
  const s = state();
  if(s.done[temaId]) return false;
  s.done[temaId] = true; save(s);
  award(coins, "Tema osatuta!");
  return true;
}

/* ---------- Modal ---------- */
function showModal(emoji, title, coins, logros){
  const m = document.getElementById("modal");
  let extra = "";
  if(logros && logros.length) extra = logros.map(l=>`<div class="reward">${l.ic} Logro berria: ${l.izen}</div>`).join("");
  m.querySelector(".box").innerHTML =
    `<div class="emoji">${emoji}</div><h3>${title}</h3>`+
    (coins?`<div class="reward">+${coins} 🪙 txanpon</div>`:"")+ extra +
    `<button class="btn" id="modal-ok">Jarraitu</button>`;
  m.classList.add("show");
  document.getElementById("modal-ok").onclick = ()=>m.classList.remove("show");
}

/* ---------- Player panela ---------- */
function refreshPlayer(){
  const s = state();
  const lvl = levelOf(s.coins), prog = Math.round(levelProgress(s.coins)*100);
  const set = (id,v)=>{ const e=document.getElementById(id); if(e) e.textContent=v; };
  set("p-coins", s.coins); set("p-level", "Maila "+lvl);
  set("p-done", doneCount()+"/"+totalTemas()); set("p-streak", s.streak+" 🔥");
  const bar = document.getElementById("p-bar"); if(bar) bar.style.width = prog+"%";
  set("p-prog-l", prog+"%");
  set("tb-coins", s.coins+" 🪙");
  const total = Math.round(doneCount()/totalTemas()*100);
  set("p-totalprog", "Aurrerapena "+total+"%");
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
    if(l.txt!==undefined) return `<span class="cmd">${esc(l.txt)}</span>`;
    const cmt = l.cmt ? `   <span class="cmt"># ${esc(l.cmt)}</span>` : "";
    const prompt = l.root ? "# " : "$ ";
    return `<span class="prompt">${prompt}</span><span class="cmd">${esc(l.cmd)}</span>${cmt}`;
  }).join("\n");
  return `<div class="term"><div class="bar"><span class="lights"><i></i><i></i><i></i></span>
    <span class="host">${esc(host||"terminala")}</span><button class="copy" data-copy>kopiatu</button></div>
    <pre><code>${body}</code></pre></div>`;
}
function renderAtal(a){
  switch(a.mota){
    case "helburua": return `<div class="helburua"><span class="ic">🎯</span><div><span class="tag">Helburua</span><div>${inlineMd(a.testua)}</div></div></div>`;
    case "analogia": return `<div class="callout analogia"><span class="tag">Analogia</span><p>${inlineMd(a.testua)}</p></div>`;
    case "oharra":   return `<div class="callout"><span class="tag">${esc(a.izenburua||"Oharra")}</span><p>${inlineMd(a.testua)}</p></div>`;
    case "errorea":  return `<div class="callout errorea"><span class="tag">${esc(a.izenburua||"Ohiko erroreak")}</span><p>${inlineMd(a.testua)}</p></div>`;
    case "teoria":   return (a.izenburua?`<h3 class="blk">${esc(a.izenburua)}</h3>`:"")+`<p>${inlineMd(a.testua)}</p>`;
    case "izenburua":return `<h2 class="blk">${esc(a.testua)}</h2>`;
    case "taula":{
      const th = a.headers.map(h=>`<th>${esc(h)}</th>`).join("");
      const tr = a.rows.map(r=>"<tr>"+r.map(c=>`<td class="mono">${inlineMd(c)}</td>`).join("")+"</tr>").join("");
      return (a.izenburua?`<h3 class="blk">${esc(a.izenburua)}</h3>`:"")+`<table class="data"><tr>${th}</tr>${tr}</table>`;
    }
    case "terminala":return (a.izenburua?`<h3 class="blk">${esc(a.izenburua)}</h3>`:"")+termBlock(a.host, a.lerroak);
    case "fitxategia":return `<div class="term"><div class="bar"><span class="lights"><i></i><i></i><i></i></span><span class="host">${esc(a.izena)}</span><button class="copy" data-copy>kopiatu</button></div><pre><code><span class="cmd">${esc(a.edukia)}</span></code></pre></div>`;
    case "pausoak":{
      const items = a.items.map(it=>`<li><h4>${esc(it.izen)}</h4>${it.testua?`<p>${inlineMd(it.testua)}</p>`:""}${it.terminala?termBlock(it.host,it.terminala):""}</li>`).join("");
      return (a.izenburua?`<h3 class="blk">${esc(a.izenburua)}</h3>`:"")+`<ol class="steps">${items}</ol>`;
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
      <summary><span class="lv">${e.maila}. maila · ${["","Erreproduzitu","Aldatu","Sortu","Erronka"][e.maila]}</span> ${esc(e.izenburua)} <span class="chev">›</span></summary>
      <div class="body"><p>${inlineMd(e.testua)}</p>${e.terminala?termBlock(e.host,e.terminala):""}${e.arrakasta?`<p class="arrakasta"><b>Ondo dagoela jakiteko:</b> ${inlineMd(e.arrakasta)}</p>`:""}</div>
    </details>`).join("");
  return `<h2 class="blk">Ariketak</h2><div class="levels">${lvls}</div>`;
}

/* ---------- Galdetegia ---------- */
function renderQuiz(temaId, coins, galderak){
  if(!galderak||!galderak.length) return "";
  const qs = galderak.map((q,qi)=>{
    const opts = q.aukerak.map((o,oi)=>`<label class="opt"><input type="radio" name="q${temaId}_${qi}" value="${oi}">${inlineMd(o)}</label>`).join("");
    return `<div class="q" data-correct="${q.zuzena}"><p class="stem">${inlineMd(q.galdera)}</p>${opts}<p class="explain">${inlineMd(q.azalpena||"")}</p></div>`;
  }).join("");
  return `<h2 class="blk">Autoebaluazioa</h2>
    <div class="quiz" data-tema="${temaId}" data-coins="${coins}" data-pass="0.7">
      <div class="q-head"><h3>Egiaztatu ikasitakoa</h3><span class="score">—</span></div>
      ${qs}
      <div class="q-foot"><button class="btn" data-grade>Zuzendu</button><div class="result"></div></div>
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
    <p class="eyebrow">Sareko Zerbitzuak · Ubuntu GNU/Linux</p>
    <h1>Ikasi zerbitzuak <span class="accent">eskuekin</span>, zerotik adituraino.</h1>
    <p>Instalatu eta konfiguratu zerbitzu bakoitza zure aldeko makina birtualetan. Teoria, komandoak pausoz pauso eta ariketa praktikoak. Osatu temak, irabazi txanponak eta igo maila.</p>
    <div class="stat-row">
      <div class="stat coins"><div class="n" id="d-coins">${s.coins}</div><div class="l">🪙 txanpon</div></div>
      <div class="stat lvl"><div class="n">${lvl}</div><div class="l">maila</div></div>
      <div class="stat done"><div class="n">${doneCount()}/${totalTemas()}</div><div class="l">osatuta</div></div>
      <div class="stat streak"><div class="n">${s.streak}</div><div class="l">🔥 racha</div></div>
    </div>
  </div>`;

  CURSO.asignaturak.forEach(asig=>{
    html += `<div class="section-title"><h2>${asig.ikonoa} ${esc(asig.izena)}</h2><span class="sub">${asig.temak.length} tema</span></div><div class="cards">`;
    asig.temak.forEach((t,i)=>{
      const done = !!s.done[t.id];
      const prevId = asig.temak[i-1]?.id;
      const locked = i>0 && !s.done[prevId];   // progresiboa
      const onclick = locked ? "" : `onclick="location.hash='#/tema/${t.id}'"`;
      html += `<button class="card ${locked?'locked':''}" ${onclick}>
        <span class="tnum">${asig.izena.toUpperCase()} · TEMA ${t.zenbakia}</span>
        <h3>${esc(t.izenburua)}</h3>
        <p>${esc(t.laburpena)}</p>
        <div class="foot"><span class="reward">${done?'✓ osatuta':'🪙 '+t.puntuak}</span>
          <span class="badge ${done?'done':''}">${done?'hecho':(locked?'🔒 blokeatuta':'irekita')}</span></div>
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
  let html = `<div class="crumb"><a href="#/">Hasiera</a> › ${esc(asig.izena)} › Tema ${tema.zenbakia}</div>
    <div class="tema-head"><h1>${esc(tema.izenburua)}</h1><p class="lead">${esc(tema.laburpena)}</p></div>`;
  (tema.atalak||[]).forEach(a=>{ html += renderAtal(a); });
  html += renderAriketak(tema.ariketak);
  html += renderQuiz(tema.id, tema.puntuak, tema.galdetegia);

  const done = !!s.done[tema.id];
  html += `<div class="complete-bar"><p>${done?'Tema hau osatuta daukazu. Errepasatu nahi duzunean.':'Egin galdetegia gainditu eta tema osatzeko, edo markatu eskuz.'}</p>
    <button class="btn ghost" data-complete="${tema.id}" data-coins="${tema.puntuak}">${done?'Osatuta ✓':'Markatu osatuta'}</button></div>`;

  const { flat, i } = temaIndex(id);
  const prev = flat[i-1], next = flat[i+1];
  html += `<div class="pager">
    ${prev?`<button onclick="location.hash='#/tema/${prev.id}'"><small>Aurrekoa</small><span>‹ ${esc(prev.izenburua)}</span></button>`:`<button onclick="location.hash='#/'"><small>Itzuli</small><span>Hasiera</span></button>`}
    ${next?`<button class="next" onclick="location.hash='#/tema/${next.id}'"><small>Hurrengoa</small><span>${esc(next.izenburua)} ›</span></button>`:`<button class="next" onclick="location.hash='#/'"><small>Bukaera</small><span>Itzuli mapara ›</span></button>`}
  </div>`;
  return html;
}

function renderLogroak(){
  const s = state();
  let html = `<div class="hero"><p class="eyebrow">Saria</p><h1>Logroak</h1><p>Osatu temak eta mantendu racha logro guztiak desblokeatzeko.</p></div><div class="logros">`;
  LOGROAK.forEach(l=>{
    const on = !!s.logros[l.id];
    html += `<div class="logro ${on?'unlocked':'locked'}"><span class="ic">${on?l.ic:'🔒'}</span><div><h4>${esc(l.izen)}</h4><p>${esc(l.desk)}</p></div></div>`;
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
        res.innerHTML=`✅ ${ok}/${qs.length} — gaindituta.`;
        if(!was) markTema(temaId, coins);
      }else{res.style.color="var(--danger)";res.innerHTML=`❌ ${ok}/${qs.length} — ${Math.ceil(pass*qs.length)}/${qs.length} behar dituzu. Errepasatu eta saiatu berriz.`;}
    });
  });
  document.querySelectorAll("[data-complete]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const id=btn.dataset.complete;
      if(state().done[id]) return;
      markTema(id, +btn.dataset.coins);
      btn.textContent="Osatuta ✓";
    });
  });
  // simuladoreak abiarazi
  Object.keys(SIMS).forEach(k=>{ if(document.getElementById(SIMS[k].root) && SIMS[k].init) SIMS[k].init(); });
}

/* ---------- Sidebar ---------- */
function buildSidebar(active){
  const s=state();
  let html = `<div class="nav-group"><div class="nav-item ${active==='dash'?'active':''}" onclick="location.hash='#/'"><span class="ic">🏠</span> Dashboard</div>
    <div class="nav-item ${active==='logroak'?'active':''}" onclick="location.hash='#/logroak'"><span class="ic">🏅</span> Logroak</div></div>`;
  CURSO.asignaturak.forEach(asig=>{
    html += `<div class="nav-group"><div class="label">${asig.ikonoa} ${esc(asig.izena)}</div>`;
    asig.temak.forEach((t,i)=>{
      const done=!!s.done[t.id], locked=i>0&&!s.done[asig.temak[i-1].id];
      const cls = active==='tema/'+t.id ? 'active':'';
      const click = locked ? '' : `onclick="location.hash='#/tema/${t.id}'"`;
      html += `<div class="nav-item ${cls} ${locked?'locked':''}" ${click}><span class="ic">${t.zenbakia}</span> ${esc(t.izenburua)} <span class="st ${done?'done':(locked?'lock':'')}">${done?'✓':(locked?'🔒':'')}</span></div>`;
    });
    html += `</div>`;
  });
  html += `<div class="nav-group"><div class="nav-item" id="reset-btn"><span class="ic">🗑</span> Berrezarri aurrerapena</div></div>`;
  document.getElementById("sidebar-nav").innerHTML = html;
  document.getElementById("reset-btn").onclick=()=>{ if(confirm("Aurrerapen guztia ezabatu?")){ localStorage.removeItem(KEY); location.hash='#/'; router(); } };
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
        out.innerHTML=r("Helmuga",intToIp(dest))+r("Bat datorren bidea",best.raw)+r("Aurrizkia","/"+best.pfx+(best.pfx===0?" (lehenetsia)":""))+r("Hurrengo saltoa",best.via==="local"?"zuzenean entregatu (local)":best.via,best.via==="local"?"var(--ok)":"var(--link)");};
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
  }
};
window.SIMS = SIMS;
})();
