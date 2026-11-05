import Icon from "./Icon";
import HeroChart from "./HeroChart";
import { SITE, MAILTO } from "@/data/site";

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title">
      <div className="wrap hero">
        <div>
          <p className="label">Hello, I’m Syed Shayan</p>
          <h1 id="hero-title">Turning <span className="hl">Data</span> Into<br />Clearer Decisions.</h1>
          <p className="in">I’m a BS Data Science student at Dawood University of Engineering &amp; Technology, passionate about exploring data, understanding patterns, and building practical machine learning solutions.</p>
          <p>Currently developing my skills in Python, data analysis, statistical thinking, and machine learning through hands-on projects.</p>
          <div className="cta">
            <a className="btn p" href="#projects">Explore My Projects</a>
            <a className="btn" href="#contact">Let’s Connect</a>
            {SITE.resume && <a className="btn" href={SITE.resume} download><Icon name="dl" />Download CV</a>}
          </div>
          <div className="soc">
            <a href={SITE.github} target="_blank" rel="noopener noreferrer"><Icon name="gh" />GitHub <small>{SITE.githubUser}</small></a>
            {SITE.linkedin && <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="li" />LinkedIn</a>}
            {SITE.email && <a href={MAILTO}><Icon name="mail" />Email</a>}
          </div>
        </div>
        <HeroChart />
      </div>
      <a className="scroll" href="#about" aria-label="Scroll to the About section">SCROLL TO EXPLORE<i /></a>
    </section>
  );
}
