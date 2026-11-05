import ContactFlow from "./ContactFlow";
import { SITE, MAILTO } from "@/data/site";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" style={{ paddingBottom: 56 }}>
      <div className="wrap">
        <p className="label rv">Let’s connect</p>
        <h2 className="rv" id="contact-title">Have an Idea? <span className="hl">Let’s Talk.</span></h2>
        <p className="lead rv">I’m always interested in connecting with people who share an interest in data science, analytics, technology, and building meaningful solutions.</p>
        <div className="cta-card rv">
          <h3>Let’s build something useful.</h3>
          <p>Reach out about internships, collaborations, or data science conversations.</p>
          <div className="cta">
            {SITE.email && <a className="btn p" href={MAILTO}>Get In Touch</a>}
            {SITE.linkedin && <a className="btn" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>}
            <a className="btn" href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <ContactFlow />
        </div>
        <div className="det">
          <div><small>Name</small>Syed Shayan</div>
          <div><small>Location</small>Karachi, Pakistan</div>
          {SITE.email && <div><small>Email</small><a href={MAILTO}>{SITE.email}</a></div>}
          <div><small>GitHub</small><a href={SITE.github} target="_blank" rel="noopener noreferrer">{SITE.githubUser}</a></div>
        </div>
      </div>
    </section>
  );
}
