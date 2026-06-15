/* ============================================================
   ZERBITZUAK — Motor compartido
   PARA QUÉ: progreso entre temas, autoevaluación, utilidades.
   El estado vive en localStorage (funciona en GitHub Pages).
   ============================================================ */

const Z = (() => {
  const KEY = "zerbitzuak.progress.v1";

  // ---- Progreso (qué temas están completados) ----
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch { return {}; }
  }
  function save(p) { localStorage.setItem(KEY, JSON.stringify(p)); }
  function isDone(id) { return !!load()[id]; }
  function markDone(id) { const p = load(); p[id] = true; save(p); }
  function reset() { localStorage.removeItem(KEY); }

  // ---- Copiar comandos de los bloques .term ----
  function wireCopy() {
    document.querySelectorAll(".term").forEach(t => {
      const btn = t.querySelector(".copy");
      if (!btn) return;
      btn.addEventListener("click", () => {
        // copiamos solo las líneas de comando, sin el prompt ni los comentarios
        const lines = [...t.querySelectorAll("pre code .cmd")].map(c => c.textContent);
        const text = lines.length ? lines.join("\n") : t.querySelector("pre").innerText;
        navigator.clipboard.writeText(text).then(() => {
          const old = btn.textContent; btn.textContent = "copiado";
          setTimeout(() => btn.textContent = old, 1200);
        });
      });
    });
  }

  // ---- Checklist persistente (Tema 0) ----
  function wireChecklist() {
    const list = document.querySelector("[data-check]");
    if (!list) return;
    const ckey = "zerbitzuak.check." + list.dataset.check;
    const state = JSON.parse(localStorage.getItem(ckey) || "{}");
    list.querySelectorAll("li").forEach((li, i) => {
      if (state[i]) li.classList.add("done");
      li.addEventListener("click", () => {
        li.classList.toggle("done");
        state[i] = li.classList.contains("done");
        localStorage.setItem(ckey, JSON.stringify(state));
      });
    });
  }

  // ---- Motor de quiz ----
  // Espera: <div class="quiz" data-tema="N" data-pass="0.7"> con .q hijos.
  // Cada .q: data-correct="b". Opciones: <label class="opt"><input value="a">..</label>
  function wireQuiz() {
    document.querySelectorAll(".quiz").forEach(quiz => {
      const qs = [...quiz.querySelectorAll(".q")];
      const scoreEl = quiz.querySelector(".score");
      const resultEl = quiz.querySelector(".result");
      const pass = parseFloat(quiz.dataset.pass || "0.7");
      const temaId = quiz.dataset.tema;

      qs.forEach(q => {
        q.querySelectorAll(".opt").forEach(opt => {
          opt.addEventListener("click", () => {
            q.querySelectorAll(".opt").forEach(o => o.classList.remove("sel"));
            opt.classList.add("sel");
            opt.querySelector("input").checked = true;
          });
        });
      });

      quiz.querySelector("[data-grade]").addEventListener("click", () => {
        let ok = 0;
        qs.forEach(q => {
          const correct = q.dataset.correct;
          const chosen = q.querySelector("input:checked");
          const exp = q.querySelector(".explain");
          q.querySelectorAll(".opt").forEach(o => o.classList.remove("correct", "wrong"));
          if (chosen) {
            const val = chosen.value;
            const lbl = chosen.closest(".opt");
            if (val === correct) { lbl.classList.add("correct"); ok++; }
            else {
              lbl.classList.add("wrong");
              const good = q.querySelector(`input[value="${correct}"]`);
              if (good) good.closest(".opt").classList.add("correct");
            }
          } else {
            const good = q.querySelector(`input[value="${correct}"]`);
            if (good) good.closest(".opt").classList.add("correct");
          }
          if (exp) { exp.classList.add("show"); exp.classList.toggle("ok", chosen && chosen.value === correct); exp.classList.toggle("no", !(chosen && chosen.value === correct)); }
        });
        const ratio = ok / qs.length;
        if (scoreEl) scoreEl.textContent = `${ok}/${qs.length}`;
        if (resultEl) {
          resultEl.classList.add("show");
          if (ratio >= pass) {
            resultEl.innerHTML = `✅ ${ok}/${qs.length} — superado. Tema marcado como completado.`;
            resultEl.style.color = "var(--ok)";
            if (temaId) { markDone(temaId); }
          } else {
            resultEl.innerHTML = `❌ ${ok}/${qs.length} — necesitas ${Math.ceil(pass*qs.length)}/${qs.length}. Repasa las pistas y reintenta.`;
            resultEl.style.color = "var(--danger)";
          }
        }
      });
    });
  }

  // ---- Botón "marcar completado" manual ----
  function wireComplete() {
    document.querySelectorAll("[data-complete]").forEach(btn => {
      const id = btn.dataset.complete;
      const refresh = () => {
        if (isDone(id)) { btn.textContent = "Completado ✓"; btn.classList.add("ghost"); }
        else btn.textContent = "Marcar como completado";
      };
      refresh();
      btn.addEventListener("click", () => { isDone(id) ? unmark(id) : markDone(id); refresh(); });
    });
  }
  function unmark(id) { const p = load(); delete p[id]; save(p); }

  function init() {
    document.addEventListener("DOMContentLoaded", () => {
      wireCopy(); wireChecklist(); wireQuiz(); wireComplete();
    });
  }

  return { load, isDone, markDone, reset, init };
})();

Z.init();
