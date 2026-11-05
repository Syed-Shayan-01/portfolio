"use client";
import { useEffect, useRef } from "react";

/* DATA → ANALYSIS → INSIGHTS → SOLUTIONS: three dots travel along a line in their own strip below the buttons */
export default function ContactFlow() {
  const box = useRef(null), svg = useRef(null), path = useRef(null), dots = useRef([]);

  useEffect(() => {
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let L = 1, vis = true, raf = 0;
    const place = (k) => dots.current.forEach((d, i) => {
      const p = path.current.getPointAtLength(((k + i / 3) % 1) * L);
      d.setAttribute("cx", p.x); d.setAttribute("cy", p.y);
    });
    const build = () => {
      const W = Math.max(box.current.clientWidth, 280);
      svg.current.setAttribute("viewBox", `0 0 ${W} 60`);
      path.current.setAttribute("d", `M0 44 C${W * 0.15} 44 ${W * 0.18} 12 ${W * 0.33} 18 S${W * 0.52} 46 ${W * 0.67} 28 S${W * 0.88} 8 ${W} 12`);
      L = path.current.getTotalLength();
      place(0.1);
    };
    build();
    addEventListener("resize", build);
    let io;
    if (!RM) {
      io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; });
      io.observe(svg.current);
      const f = (t) => { if (vis) place(t / 9000); raf = requestAnimationFrame(f); };
      raf = requestAnimationFrame(f);
    }
    return () => { removeEventListener("resize", build); cancelAnimationFrame(raf); io && io.disconnect(); };
  }, []);

  return (
    <div className="flowbox" aria-hidden="true" ref={box}>
      <svg className="flow" viewBox="0 0 800 60" ref={svg}>
        <path d="M0 44 L800 12" ref={path} />
        {[0, 1, 2].map((i) => <circle key={i} r="4.5" ref={(el) => (dots.current[i] = el)} />)}
      </svg>
      <div className="fl"><span>DATA</span><span>ANALYSIS</span><span>INSIGHTS</span><span>SOLUTIONS</span></div>
    </div>
  );
}
