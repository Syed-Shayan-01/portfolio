"use client";
import { useEffect } from "react";

/* Animated cursor: a dot plus a trailing ring. Only created on devices with a precise hover pointer
   (mouse / trackpad); touch devices never get it. */
export default function Cursor() {
  useEffect(() => {
    if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const d = document.createElement("div"), r = document.createElement("div");
    d.className = "cur d hide"; r.className = "cur r hide";
    d.setAttribute("aria-hidden", "true"); r.setAttribute("aria-hidden", "true");
    document.body.append(d, r);
    root.classList.add("cc");
    let x = 0, y = 0, rx = 0, ry = 0, on = false, raf = 0;

    const move = (e) => {
      x = e.clientX; y = e.clientY;
      if (!on) { on = true; rx = x; ry = y; d.classList.remove("hide"); r.classList.remove("hide"); }
      d.style.transform = `translate(${x}px,${y}px)`;
      r.classList.toggle("h", !!(e.target.closest && e.target.closest("a,button,[tabindex]")));
    };
    const leave = () => { on = false; d.classList.add("hide"); r.classList.add("hide"); };
    const down = () => r.classList.add("p");
    const up = () => r.classList.remove("p");
    const tick = () => {
      rx += (x - rx) * (RM ? 1 : 0.18); ry += (y - ry) * (RM ? 1 : 0.18);
      r.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    addEventListener("mousedown", down);
    addEventListener("mouseup", up);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      removeEventListener("mousedown", down);
      removeEventListener("mouseup", up);
      d.remove(); r.remove(); root.classList.remove("cc");
    };
  }, []);
  return null;
}
