"use client";
import { useEffect } from "react";

/* Scroll reveal for every .rv element (staggered inside grids). Reduced motion shows everything immediately. */
export default function RevealObserver() {
  useEffect(() => {
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelectorAll(".grid>.rv,.projects>.rv,.edu>.rv").forEach((e, i) => e.style.setProperty("--d", (i % 3) * 0.1 + "s"));
    const els = [...document.querySelectorAll(".rv")];
    if (RM) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    }), { threshold: 0.15 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}
