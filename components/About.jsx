const TIMELINE = [
  ["BS Data Science", "Dawood University of Engineering & Technology · 2025 – Present", "Developing a foundation in programming, mathematics, statistics, data structures, and data science."],
  ["Data Science Learning Journey", "Self-Learning & Practical Projects · Present", "Exploring Python, data analysis, data visualization, statistical concepts, and machine learning through practical projects."],
  ["Data Quest Hackathon", "Team: The Outliers · 2026", "Participated in a competitive data science hackathon, reached the final round after finishing in the top five during Round 1, and gained valuable experience working under time constraints.", "TOP 5 · ROUND 1"],
];
const STEPS = ["Understand the Problem", "Explore the Data", "Build & Evaluate Solutions"];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title">
      <div className="wrap">
        <p className="label rv">Get to know me</p>
        <h2 className="rv" id="about-title">Beyond the <span className="hl">Data.</span></h2>
        <div className="about">
          <div className="rv l">
            <h3>A little about me</h3>
            <p>I’m pursuing a Bachelor’s degree in <strong>Data Science</strong> at Dawood University of Engineering &amp; Technology (DUET), Karachi, and I’m on the path to becoming a Data Scientist.</p>
            <p>My interest lies in <strong>data analysis, statistics, machine learning</strong>, and understanding the mathematics behind predictive models.</p>
            <p>Data science, to me, is not just about using libraries or algorithms. It’s about <strong>understanding the problem, exploring the data, selecting the right approach, and explaining the results.</strong></p>
            <p>I also have a background in <strong>web development</strong>, which helps me think about how analytical solutions can become useful applications.</p>
            {/* <p className="quote">Learning continuously. Building practically. Thinking analytically.</p> */}
          </div>
          <div className="rv r">
            <ol className="tl">
              {TIMELINE.map(([t, m, d, b]) => (
                <li key={t}>
                  <h4>{t}{b && <span className="badge">{b}</span>}</h4>
                  <div className="m">{m}</div>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
            <div className="card">
              <div className="label" style={{ margin: 0 }}>My Approach</div>
              <div className="steps3">
                {STEPS.map((s, i) => <div key={s}><span>{"0" + (i + 1)}</span>{s}</div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}