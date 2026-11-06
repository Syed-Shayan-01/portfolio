"use client";
import { useEffect, useRef } from "react";
import Icon from "./Icon";

/* Reel-style demo tour. Trigger: floating "Tour" button, the T key, or ?agents=on in the URL.
   Page content is hidden, 2-3 robot cursors draw blue wireframe boxes over sections, the real content
   pops in / types in behind them, and the page auto-scrolls to the footer in one take. Esc or T stops it. */
const CFG = { introMs: 2600, scrollMs: 15500, endMs: 1400 }; // scroll phase = 15.5s, whole take about 20s
const COLORS = ["#6f6fff", "#3b9bff", "#2563eb"];
const ROBOT = '<svg viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4M9 13h.01M15 13h.01M9 17h6"/></svg>';
const PTR = '<svg class="ptr" viewBox="0 0 24 24"><path d="M3 2l7.5 19 2.6-7.9L21 10.5z" fill="currentColor" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>';

// [selector, label on the wireframe box, typed?]
const SEL = [
  [".label", "label", 1], ["h1,h2", "heading", 1], [".lead", "text", 1], [".hero p", "text", 1], [".about p", "text", 1],
  [".dash", "chart", 0], [".cta-card", "card", 0], [".cta", "buttons", 0], [".soc", "links", 0], [".tl li", "timeline", 0],
  [".card", "card", 0], [".tools", "tools", 0], [".det > div", "detail", 0], [".fg > *", "footer", 0], [".fb", "footer", 0],
];
const ALL = SEL.map((s) => s[0]).join(",");

function collect() {
  return [...document.querySelectorAll(ALL)]
    .filter((el) => !el.closest("dialog,header") && !(el.parentElement && el.parentElement.closest(ALL)))
    .map((el) => {
      const s = SEL.find(([q]) => el.matches(q));
      return { el, kind: s[1], typed: !!s[2], done: false, claimed: false };
    });
}

export default function Tour() {
  const api = useRef({});

  useEffect(() => {
    const html = document.documentElement;
    let run = null;

    const start = () => {
      if (run) return;
      const units = collect();
      if (!units.length) { html.classList.remove("tour-pre"); return; }
      scrollTo(0, 0);
      document.querySelectorAll(".rv").forEach((e) => e.classList.add("in"));
      html.classList.add("tour", "tr-ran");
      units.forEach((u) => u.el.classList.add("tr-u"));
      html.classList.remove("tour-pre");

      const layer = document.createElement("div");
      layer.className = "tour-layer";
      layer.setAttribute("aria-hidden", "true");
      document.body.append(layer);

      const vw = innerWidth, vh = innerHeight;
      const starts = [[-70, 90], [vw + 70, vh * 0.35], [vw * 0.5, vh + 70]];
      const agents = Array.from({ length: vw < 700 ? 2 : 3 }, (_, i) => {
        const el = document.createElement("div");
        el.className = "ag";
        el.style.setProperty("--c", COLORS[i]);
        el.innerHTML = `${PTR}<div class="tag">${ROBOT}AGENT 0${i + 1}</div>`;
        layer.append(el);
        return { i, el, x: starts[i][0], y: starts[i][1], state: "idle", u: null, t0: 0, dur: 1, fx: 0, fy: 0, box: null };
      });

      const max = Math.max(0, html.scrollHeight - vh);
      const typing = [];
      const timers = [];
      const T0 = performance.now();
      let raf = 0, ending = false;

      const block = (e) => {
        if (e.type === "keydown") {
          if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"].includes(e.key)) e.preventDefault();
          return;
        }
        e.preventDefault();
      };
      addEventListener("wheel", block, { passive: false });
      addEventListener("touchmove", block, { passive: false });
      addEventListener("keydown", block);

      /* ---- typing ---- */
      const setText = (ty, shown) => {
        let rem = shown;
        ty.nodes.forEach(([n, v]) => { n.nodeValue = v.slice(0, Math.max(0, Math.min(v.length, rem))); rem -= v.length; });
      };
      const finishType = (ty) => { setText(ty, ty.total); ty.u.el.classList.remove("tr-typing"); ty.u.el.style.minHeight = ""; };
      const startType = (u) => {
        const w = document.createTreeWalker(u.el, NodeFilter.SHOW_TEXT), nodes = [];
        let n;
        while ((n = w.nextNode())) if (n.nodeValue.trim()) nodes.push([n, n.nodeValue]);
        const total = nodes.reduce((s, x) => s + x[1].length, 0);
        if (!total) return;
        u.el.style.minHeight = u.el.offsetHeight + "px"; // keep the layout from jumping while text is empty
        u.el.classList.add("tr-typing");
        nodes.forEach((x) => (x[0].nodeValue = ""));
        typing.push({ u, nodes, total, t0: performance.now(), dur: Math.min(1100, Math.max(280, total * 4.2)) });
      };
      const stepType = (ty) => {
        const k = Math.min((performance.now() - ty.t0) / ty.dur, 1);
        setText(ty, Math.floor(ty.total * k));
        if (k >= 1) { finishType(ty); typing.splice(typing.indexOf(ty), 1); }
      };

      /* ---- reveal + boxes ---- */
      const reveal = (u, instant) => {
        if (u.done) return;
        u.done = true;
        u.el.classList.add("tr-in");
        if (instant) return;
        if (u.kind === "chart") { u.el.classList.remove("go"); void u.el.offsetWidth; u.el.classList.add("go"); } // replay the regression animation
        if (u.typed) startType(u);
      };
      const mkBox = (a) => {
        const b = document.createElement("div");
        b.className = "tbox";
        b.style.setProperty("--c", COLORS[a.i]);
        b.innerHTML = `<em>${a.u.kind}</em>`;
        layer.append(b);
        return b;
      };
      const place = (b, l, t, w, h) => { b.style.left = l + "px"; b.style.top = t + "px"; b.style.width = w + "px"; b.style.height = h + "px"; };

      /* ---- one agent: idle -> travel -> draw box -> reveal -> hold -> idle ---- */
      const step = (a, t, f, visible) => {
        if (a.state === "idle") {
          const u = visible.find((v) => !v.claimed && !v.done);
          if (u) { u.claimed = true; a.u = u; a.state = "travel"; a.t0 = t; a.fx = a.x; a.fy = a.y; a.dur = 380 * f; }
          else a.y += Math.sin(t / 380 + a.i * 2) * 0.18;
        }
        if (a.state !== "idle") {
          const r = a.u.el.getBoundingClientRect();
          const L = Math.max(r.left, 6), Tp = Math.max(r.top, 6);
          const w = Math.max(Math.min(r.right, innerWidth - 6) - L, 0), h = Math.max(Math.min(r.bottom, innerHeight - 6) - Tp, 0);
          const k = Math.min((t - a.t0) / a.dur, 1);
          if (a.state === "travel") {
            const e = 1 - Math.pow(1 - k, 3);
            a.x = a.fx + (L - a.fx) * e; a.y = a.fy + (Tp - a.fy) * e;
            if (k >= 1) { a.state = "draw"; a.t0 = t; a.dur = 520 * f; a.box = mkBox(a); }
          } else if (a.state === "draw") {
            const e = 1 - Math.pow(1 - k, 2);
            place(a.box, L, Tp, w * e, h * e);
            a.x = L + w * e; a.y = Tp + h * e;
            if (k >= 1) { reveal(a.u); a.state = "hold"; a.t0 = t; a.dur = 300 * f; }
          } else if (a.state === "hold") {
            place(a.box, L, Tp, w, h);
            if (k >= 1) {
              const b = a.box;
              b.classList.add("out");
              timers.push(setTimeout(() => b.remove(), 350));
              a.box = null; a.u = null; a.state = "idle";
            }
          }
        }
        a.el.style.transform = `translate3d(${a.x - 3}px,${a.y - 2}px,0)`;
      };

      const cleanup = () => {
        cancelAnimationFrame(raf);
        timers.forEach(clearTimeout);
        removeEventListener("wheel", block);
        removeEventListener("touchmove", block);
        removeEventListener("keydown", block);
        typing.forEach(finishType);
        typing.length = 0;
        units.forEach((u) => { u.el.classList.remove("tr-u", "tr-in", "tr-typing"); u.el.style.minHeight = ""; });
        layer.remove();
        html.classList.remove("tour");
        run = null;
      };

      const finish = () => {
        units.filter((u) => !u.done).forEach((u, i) => timers.push(setTimeout(() => reveal(u), i * 70)));
        timers.push(setTimeout(() => agents.forEach((a) => (a.el.style.opacity = "0")), CFG.endMs));
        timers.push(setTimeout(cleanup, CFG.endMs + 600));
      };

      const frame = (t) => {
        const now = t - T0;
        if (now > CFG.introMs) {
          const k = Math.min((now - CFG.introMs) / CFG.scrollMs, 1);
          scrollTo(0, (max * (1 - Math.cos(Math.PI * k))) / 2); // ease in-out over the scroll phase
        }
        const pending = units.filter((u) => !u.done && !u.claimed);
        pending.forEach((u) => { if (u.el.getBoundingClientRect().bottom < 20) reveal(u, true); }); // scrolled past: show it silently
        const visible = pending.filter((u) => {
          if (u.done) return false;
          const r = u.el.getBoundingClientRect();
          return r.top < innerHeight * 0.9 && r.bottom > 0;
        });
        const f = Math.max(0.4, 1 - 0.08 * Math.max(visible.length - agents.length, 0)); // speed up when there is a backlog
        agents.forEach((a) => step(a, t, f, visible));
        typing.slice().forEach(stepType);
        if (!ending && now > CFG.introMs + CFG.scrollMs) { ending = true; finish(); }
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
      run = { stop: cleanup };
    };

    api.current.toggle = () => (run ? run.stop() : start());

    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tg = e.target;
      if (tg && (/^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName) || tg.isContentEditable)) return;
      if (document.querySelector("dialog[open]")) return;
      if (e.key === "t" || e.key === "T") { e.preventDefault(); api.current.toggle(); }
      else if (e.key === "Escape" && run) run.stop();
    };
    addEventListener("keydown", onKey);

    let auto;
    if (/[?&]agents=on/.test(location.search)) {
      const ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      ready.then(() => { auto = setTimeout(start, 500); });
      setTimeout(() => html.classList.remove("tour-pre"), 4000); // safety: never leave the page hidden
    }
    return () => { removeEventListener("keydown", onKey); clearTimeout(auto); if (run) run.stop(); };
  }, []);

  return (
    <button type="button" className="tour-btn" onClick={() => api.current.toggle && api.current.toggle()} aria-label="Start the animated portfolio tour (shortcut: T)">
      <Icon name="play" /><span>Tour</span><kbd>T</kbd>
    </button>
  );
}