import { EDU } from "@/data/site";

function EduCard({ label, e, missing }) {
  return (
    <div className="card rv">
      <div className="label" style={{ margin: 0 }}>{label}</div>
      {e.t ? (
        <>
          <h3>{e.t}</h3>
          <div className="s">{e.s}</div>
          {e.y ? <div className="y">{e.y}</div> : <div style={{ height: 10 }} />}
          {e.d && <p>{e.d}</p>}
          {e.tags && <div className="tg" style={{ margin: "14px 0 0" }}>{e.tags.map((t) => <span key={t}>{t}</span>)}</div>}
        </>
      ) : (
        <>
          <h3>{missing[0]}</h3>
          <p className="nd">{missing[1]}</p>
        </>
      )}
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" aria-labelledby="edu-title" style={{ background: "var(--bg2)", borderBlock: "1px solid var(--bd)" }}>
      <div className="wrap">
        <p className="label rv">Academic background</p>
        <h2 className="rv" id="edu-title">Education &amp; <span className="hl">Certifications.</span></h2>
        <div className="edu">
          <EduCard label="University" e={EDU.university} />
          <EduCard label="Intermediate" e={EDU.intermediate} missing={["Intermediate (HSSC)", "Details will be added soon."]} />
          <div className="card rv wide">
            <div className="label" style={{ margin: 0 }}>Certifications</div>
            {EDU.certs.length ? (
              <div className="cl">
                {EDU.certs.map((c) => (
                  <div className="ci" key={c.t}>
                    <b>{c.t}</b>
                    <span>{c.s}{c.y ? " · " + c.y : ""}</span>
                    {c.d && <p>{c.d}</p>}
                    {c.link && <a className="btn sm" style={{ alignSelf: "flex-start", width: "auto", marginTop: 8 }} href={c.link} target="_blank" rel="noopener noreferrer">View Certificate ↗</a>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="nd">Certifications will be listed here as I complete them.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
