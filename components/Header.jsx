"use client";
import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/data/site";
import Icon from "./Icon";

/* Sticky header + scroll progress + active link + eased smooth scroll.
   The active link is set at click time and locked during the glide, so it never flickers through the sections in between. */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [theme, setTheme] = useState("dark");
  const pg = useRef(null), burger = useRef(null);
  const lock = useRef(false), stop = useRef(false);

  useEffect(() => {
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const secs = [...document.querySelectorAll("main section")];
    let tk = 0;

    const sc = () => {
      setScrolled(scrollY > 12);
      const mx = document.documentElement.scrollHeight - innerHeight;
      if (pg.current) pg.current.style.transform = `scaleX(${mx > 0 ? Math.min(scrollY / mx, 1) : 0})`;
      if (lock.current) return;
      let cur = "home";
      const m = scrollY + innerHeight * 0.35;
      secs.forEach((s) => { if (s.offsetTop <= m) cur = s.id; });
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = "contact";
      setActive(cur);
    };
    const onScroll = () => { if (!tk) { tk = 1; requestAnimationFrame(() => { tk = 0; sc(); }); } };

    const goTo = (id) => {
      const el = document.querySelector(id);
      if (!el) return;
      const y = id === "#home" ? 0 : Math.max(0, el.getBoundingClientRect().top + scrollY - 10);
      const y0 = scrollY, d = y - y0;
      setActive(id.slice(1));
      if (RM || Math.abs(d) < 2) { scrollTo(0, y); return; }
      const T = Math.min(1100, Math.max(500, Math.abs(d) * 0.45)), t0 = performance.now();
      lock.current = true; stop.current = false;
      const f = (t) => {
        if (stop.current) { lock.current = false; return; }
        const k = Math.min((t - t0) / T, 1);
        const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        scrollTo(0, y0 + d * e);
        if (k < 1) requestAnimationFrame(f); else { lock.current = false; sc(); }
      };
      requestAnimationFrame(f);
    };

    const onClick = (e) => {
      const a = e.target.closest && e.target.closest("a[href^='#']");
      if (!a) return;
      const h = a.getAttribute("href");
      if (h.length < 2 || !document.querySelector(h)) return;
      e.preventDefault();
      goTo(h);
    };
    const halt = () => { if (lock.current) stop.current = true; };

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", sc);
    ["wheel", "touchstart", "keydown"].forEach((n) => addEventListener(n, halt, { passive: true }));
    document.addEventListener("click", onClick);
    sc();
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", sc);
      ["wheel", "touchstart", "keydown"].forEach((n) => removeEventListener(n, halt));
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && open) { setOpen(false); burger.current?.focus(); } };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => { setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark"); }, []);
  const toggleTheme = () => {
    const t = theme === "dark" ? "light" : "dark";
    setTheme(t);
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem("theme", t); } catch (e) {}
  };

  return (
    <>
      <div id="pg" ref={pg} aria-hidden="true" />
      <header id="hd" className={scrolled ? "s" : ""}>
        <div className="wrap nav">
          <a href="#home" className="logo" aria-label="Shayan, home">SHAYAN<span>.</span></a>
          <ul className={"links" + (open ? " open" : "")} id="menu">
            {NAV.map(([id, label]) => (
              <li key={id}>
                <a href={"#" + id} className={active === id ? "on" : ""} aria-current={active === id ? "true" : undefined} onClick={() => setOpen(false)}>{label}</a>
              </li>
            ))}
            {SITE.resume && <li className="rs"><a href={SITE.resume} download>Download Resume</a></li>}
          </ul>
          <div className="navr">
            {SITE.resume && <a className="btn sm" href={SITE.resume} download><Icon name="dl" />Download Resume</a>}
            <button className="theme" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
              <Icon name={theme === "dark" ? "sun" : "moon"} />
            </button>
            <button ref={burger} className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}