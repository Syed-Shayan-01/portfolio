"use client";
import { useEffect, useRef, useState } from "react";
import ProjectModal from "./ProjectModal";
import { PROJECTS, SITE } from "@/data/site";

/* metric value counts up once when its card scrolls into view */
function Metric({ v }) {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current, card = el.closest(".proj");
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const n = parseFloat(v), dec = (v.split(".")[1] || "").replace("%", "").length, suf = v.endsWith("%") ? "%" : "", t0 = performance.now();
      const f = (t) => { const k = Math.min((t - t0) / 900, 1); el.textContent = (n * k).toFixed(dec) + suf; if (k < 1) requestAnimationFrame(f); };
      requestAnimationFrame(f);
    }, { threshold: 0.3 });
    io.observe(card);
    return () => io.disconnect();
  }, [v]);
  return <b ref={ref}>{v}</b>;
}

function Preview({ p }) {
  if (p.m)
    return (
      <div className="mets">
        {p.m.map(([k, v, w]) => (
          <div key={k}><small>{k}</small><Metric v={v} /><i style={{ "--w": w / 100 }} /></div>
        ))}
      </div>
    );
  if (p.type === "sc")
    return (
      <>
        <svg className="sc" viewBox="0 0 320 170" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <circle key={i} cx={20 + i * 21} cy={(150 - i * 7 - Math.sin(i * 2.3) * 16).toFixed(1)} r="3" style={{ transitionDelay: `${i * 40}ms` }} />
          ))}
          <line x1="16" y1="150" x2="310" y2="58" />
        </svg>
        <small>Schematic — not project output</small>
      </>
    );
  return (
    <>
      <div className="pipe" aria-hidden="true">
        <div>Data cleaning &amp; preprocessing</div><div>Exploratory analysis</div><div>Segmentation &amp; churn model</div><div>Retention &amp; ROI analysis</div>
      </div>
      <small>Planned workflow</small>
    </>
  );
}

export default function Projects() {
  const [sel, setSel] = useState(null);
  return (
    <section id="projects" aria-labelledby="projects-title">
      <div className="wrap">
        <p className="label rv">Selected work</p>
        <h2 className="rv" id="projects-title">Projects Built Through <span className="hl">Curiosity.</span></h2>
        <p className="lead rv">Every project is an opportunity to understand a problem, investigate the data, experiment with different approaches, and build something meaningful.</p>
        <div className="projects">
          {PROJECTS.map((p) => (
            <article className="card proj rv" key={p.n}>
              <div className="prev"><Preview p={p} /></div>
              <div className="body">
                <span className="num">{p.n}{p.wip && <span className="badge">IN PROGRESS</span>}</span>
                <h3>{p.t}</h3>
                <p className="cat">{p.c}</p>
                <p>{p.d}</p>
                <div className="tg">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
                <div className="acts">
                  <a className="btn sm" href={p.repo || SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  {p.demo && <a className="btn sm" href={p.demo} target="_blank" rel="noopener noreferrer">Live Demo</a>}
                  <button className="btn sm p" onClick={() => setSel(p)}>Project Details</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <ProjectModal p={sel} onClose={() => setSel(null)} />
    </section>
  );
}
