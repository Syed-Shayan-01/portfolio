import Icon from "./Icon";
import { NAV, SITE, MAILTO } from "@/data/site";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fg">
          <div className="fbrand">
            <a href="#home" className="logo">SHAYAN<span>.</span></a>
            <p>Building, Learning &amp; Exploring Data.</p>
            <p className="fs">BS Data Science student at DUET, Karachi, exploring data, statistics and machine learning through hands-on projects.</p>
          </div>
          <nav aria-label="Footer navigation">
            <h5>Navigate</h5>
            {NAV.map(([id, l]) => <a key={id} href={"#" + id}>{l}</a>)}
          </nav>
          <div>
            <h5>Connect</h5>
            <div className="fi">
              <a className="ic" href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon name="gh" /></a>
              {SITE.linkedin && <a className="ic" href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="li" /></a>}
              {SITE.email && <a className="ic" href={MAILTO} aria-label="Email"><Icon name="mail" /></a>}
            </div>
            <p className="fs">Karachi, Pakistan</p>
          </div>
        </div>
        <div className="fb">
          <span>© {new Date().getFullYear()} Syed Shayan. All rights reserved.</span>
          <span>Designed with curiosity and built with code.</span>
          <a href="#home" className="top">↑ Back to top</a>
        </div>
      </div>
    </footer>
  );
}
