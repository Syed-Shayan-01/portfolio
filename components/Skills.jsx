import Icon from "./Icon";
import { SKILLS, TOOLS } from "@/data/site";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title">
      <div className="wrap">
        <p className="label rv">My technical toolkit</p>
        <h2 className="rv" id="skills-title">Tools I Use to <span className="hl">Explore Data.</span></h2>
        <p className="lead rv">From manipulating datasets to evaluating machine learning models, these are the technologies and concepts I’m learning and applying through practical work.</p>
        <div className="grid">
          {SKILLS.map(([h, d, list]) => (
            <div className="card skill rv" key={h}>
              <h3><Icon d={d} />{h}</h3>
              <ul>{list.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="tools rv">
          <span className="t">TOOLS &amp; WORKFLOW</span>
          {TOOLS.map((t) => <span className="chip" key={t}>{t}</span>)}
        </div>
      </div>
    </section>
  );
}
