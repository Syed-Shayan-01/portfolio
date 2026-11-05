"use client";
import { useEffect, useRef } from "react";
import Icon from "./Icon";
import { SECTIONS, ND, SITE } from "@/data/site";

export default function ProjectModal({ p, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (p && !d.open) d.showModal();
    if (!p && d.open) d.close();
  }, [p]);

  const repo = p && (p.repo || SITE.github);

  return (
    <dialog ref={ref} aria-labelledby="dt" onClose={onClose} onClick={(e) => { if (e.target === ref.current) ref.current.close(); }}>
      <div className="mh">
        <div>
          <div className="label" style={{ margin: "0 0 6px" }}>{p && p.c + (p.wip ? " · In Progress" : "")}</div>
          <h3 id="dt">{p && p.t}</h3>
        </div>
        <button className="x" aria-label="Close details" onClick={() => ref.current.close()}><Icon name="close" /></button>
      </div>
      <div className="mb">
        {p && (
          <>
            {SECTIONS.map((s) => (
              <div key={s}>
                <h4>{s}</h4>
                {p.info[s] ? <p>{p.info[s]}</p> : <p className="nd">{ND}</p>}
              </div>
            ))}
            <h4>GitHub Repository / Live Demo</h4>
            <p>
              <a className="hl" href={repo} target="_blank" rel="noopener noreferrer">GitHub{p.repo ? "" : " profile"}</a>
              {p.demo && <> · <a className="hl" href={p.demo} target="_blank" rel="noopener noreferrer">Live Demo</a></>}
            </p>
          </>
        )}
      </div>
    </dialog>
  );
}
