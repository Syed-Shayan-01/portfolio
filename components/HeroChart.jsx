"use client";
import { useEffect, useRef, useState } from "react";

/* Illustrative scatter + linear trend. Points fly out of the origin, the trend line grows to the last point.
   Replays whenever the chart scrolls back into view. Hover/focus on the labels highlights the matching part. */
const PTS = Array.from({ length: 24 }, (_, i) => {
  const x = 42 + i * 14;
  const y = 215 - (x - 30) * 0.52 + Math.sin(i * 1.9) * 15 + Math.cos(i * 0.7) * 7;
  const o = i % 9 === 4;
  return { i, x, o, y: +(o ? y - 24 : y).toFixed(1) };
});
const LX = PTS[PTS.length - 1].x;
const LY = +(215 - (LX - 30) * 0.52).toFixed(1);

const STATS = [["1", <>n = <b>24</b></>], ["2", <>trend: <b>linear fit</b></>], ["3", "illustrative data"]];
const TAGS = [["1", "01", "DATA ANALYSIS", ".4s"], ["2", "02", "MODEL EVALUATION", ".6s"], ["3", "03", "VISUALIZATION", ".8s"]];

export default function HeroChart() {
  const ref = useRef(null);
  const [f, setF] = useState();

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.remove("go"); void el.offsetWidth; el.classList.add("go"); }
      else el.classList.remove("go");
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hv = (v) => ({ tabIndex: 0, onMouseEnter: () => setF(v), onMouseLeave: () => setF(undefined), onFocus: () => setF(v), onBlur: () => setF(undefined) });

  return (
    <div className="dash" ref={ref} data-f={f}>
      <div className="bar"><span>REGRESSION · EXPLORATORY VIEW</span><span>x → y</span></div>
      <svg viewBox="0 0 400 250" role="img" aria-label="Animated scatter plot with a rising linear trend line (illustrative data)">
        <g id="gr">
          {Array.from({ length: 9 }, (_, i) => <line key={"v" + i} x1={30 + i * 43.75} y1="15" x2={30 + i * 43.75} y2="215" />)}
          {Array.from({ length: 5 }, (_, i) => <line key={"h" + i} x1="30" y1={15 + i * 50} x2="380" y2={15 + i * 50} />)}
        </g>
        <polygon className="band" points="30,235 376,55 376,15 30,195" />
        <line className="ax" pathLength="1" x1="30" y1="15" x2="30" y2="215" />
        <line className="ax" pathLength="1" x1="30" y1="215" x2="380" y2="215" />
        {PTS.map((p) => (
          <circle key={p.i} className={"pt" + (p.o ? " o" : "")} cx={p.x} cy={p.y} r={p.o ? 3.5 : 4}
            style={{ "--dx": `${30 - p.x}px`, "--dy": `${(215 - p.y).toFixed(1)}px`, animationDelay: `${(0.5 + p.i * 0.07).toFixed(2)}s` }} />
        ))}
        <line className="trend" pathLength="1" x1="30" y1="215" x2={LX} y2={LY} />
        <circle className="org" cx="30" cy="215" r="3.5" />
        <text className="axl" x="30" y="236" fontSize="9" fontFamily="Inter, sans-serif">feature (x)</text>
      </svg>
      <div className="stats">{STATS.map(([v, c]) => <span key={v} {...hv(v)}>{c}</span>)}</div>
      <div className="tags">{TAGS.map(([v, n, l, d]) => <div key={v} style={{ animationDelay: d }} {...hv(v)}>{n}<b>{l}</b></div>)}</div>
    </div>
  );
}