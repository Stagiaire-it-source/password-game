import '../assets/landing.css'

const people = [
  {
    id: 'lynn',
    name: 'Lynn Fisher',
    role: 'Independent designer & front-end developer',
    site: 'lynnandtonic.com',
    url: 'https://lynnandtonic.com',
    blurb:
      "Lynn redesigns her own homepage every year, on her birthday, as a tiny CSS playground with no client and no brief. It's proof that a portfolio can be a sketchbook instead of a résumé — playful, hand-built, and completely hers.",
    tag: '01 · Playful & hand-built',
  },
  {
    id: 'josh',
    name: 'Josh Comeau',
    role: 'Software engineer, teacher & writer',
    site: 'joshwcomeau.com',
    url: 'https://www.joshwcomeau.com',
    blurb:
      'Josh writes about CSS and React the way a good teacher explains anything hard: patiently, warmly, and with a squishy custom cursor along the way. He makes learning front-end feel like play, not homework.',
    tag: '02 · Warm & teacherly',
  },
  {
    id: 'brittany',
    name: 'Brittany Chiang',
    role: 'Front-end engineer',
    site: 'brittanychiang.com',
    url: 'https://brittanychiang.com',
    blurb:
      "Brittany's portfolio is one of the most referenced developer sites of the last decade — dark, monospace, and precise, where every glowing accent earns its place. Nothing decorative, everything intentional.",
    tag: '03 · Dark & disciplined',
  },
  {
    id: 'lee',
    name: 'Lee Robinson',
    role: 'VP of Product, Vercel',
    site: 'leerob.com',
    url: 'https://leerob.com',
    blurb:
      "Lee's site is almost aggressively plain — black text, white background, no ornament — because the writing carries all the weight. A good reminder that clarity beats decoration when you actually have something to say.",
    tag: '04 · Radically minimal',
  },
  {
    id: 'daniel',
    name: 'Daniel Spatzek',
    role: 'Designer & developer',
    site: 'danielspatzek.com',
    url: 'https://danielspatzek.com',
    blurb:
      'Daniel treats type itself as the interface — big, confident, grid-driven layouts where headlines move and breathe. It reads like a Swiss poster that learned to scroll.',
    tag: '05 · Swiss & type-driven',
  },
  {
    id: 'tobias',
    name: 'Tobias van Schneider',
    role: 'Designer, musician & entrepreneur',
    site: 'vanschneider.com',
    url: 'https://vanschneider.com',
    blurb:
      "Tobias built a personal brand as distinctive as anything he's shipped as a product — bold color, illustration, and a point of view you can spot from across the room.",
    tag: '06 · Bold & illustrated',
  },
  {
    id: 'bruno',
    name: 'Bruno Simon',
    role: 'Creative developer',
    site: 'bruno-simon.com',
    url: 'https://bruno-simon.com',
    blurb:
      "Bruno's portfolio isn't a page you scroll, it's a tiny 3D world you drive a toy car through to find each project. It's the boldest answer I know to the question: does a portfolio have to look like every other portfolio?",
    tag: '07 · Interactive & three-dimensional',
  },
]

function Landing() {
  return (
    <div className="landing">
      <header className="landing-hero">
        <p className="landing-eyebrow">Welcome back</p>
        <h1>People whose portfolios I keep coming back to</h1>
        <p className="landing-sub">
          Seven designers and developers who treat their own site as the best project in their
          portfolio. Each section below is styled as a small tribute to how their site actually feels.
        </p>
      </header>

      <main>
        {people.map((p) => (
          <section key={p.id} className={`showcase showcase-${p.id}`}>
            <div className="showcase-inner">
              <span className="showcase-tag">{p.tag}</span>
              <h2>{p.name}</h2>
              <p className="showcase-role">{p.role}</p>
              <p className="showcase-blurb">{p.blurb}</p>
              <a className="showcase-link" href={p.url} target="_blank" rel="noreferrer">
                Visit {p.site} →
              </a>

              <div className="showcase-mock" aria-hidden="true">
                <div className={`mock mock-${p.id}`}>
                  {p.id === 'lynn' && (
                    <>
                      <span className="mock-blob mock-blob-1" />
                      <span className="mock-blob mock-blob-2" />
                      <span className="mock-blob mock-blob-3" />
                    </>
                  )}
                  {p.id === 'josh' && (
                    <>
                      <span className="mock-cursor" />
                      <span className="mock-pill">const joy = true</span>
                    </>
                  )}
                  {p.id === 'brittany' && (
                    <div className="mock-terminal">
                      <span className="mock-dot" />
                      <span className="mock-dot" />
                      <span className="mock-dot" />
                      <div className="mock-lines">
                        <span>01 const engineer = &#123;</span>
                        <span className="mock-accent">02 &nbsp;&nbsp;focus: 'craft',</span>
                        <span>03 &#125;</span>
                      </div>
                    </div>
                  )}
                  {p.id === 'lee' && <div className="mock-rule" />}
                  {p.id === 'daniel' && (
                    <div className="mock-grid">
                      <span>SPATZEK</span>
                      <span>—</span>
                      <span>DESIGN</span>
                    </div>
                  )}
                  {p.id === 'tobias' && (
                    <>
                      <span className="mock-shape mock-shape-circle" />
                      <span className="mock-shape mock-shape-square" />
                    </>
                  )}
                  {p.id === 'bruno' && (
                    <div className="mock-scene">
                      <span className="mock-ground" />
                      <span className="mock-car" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer className="landing-footer">
        <p>Built with a lot of admiration, and a login form.</p>
      </footer>
    </div>
  )
}

export default Landing
