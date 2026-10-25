import { useEffect, useRef, useState } from 'react'
import javascriptLogo from './assets/js.png'
import reactLogo from './assets/react.png'
import nodeLogo from './assets/node.png'
import { projects } from './data/projects.js'
import './App.css'

const skillGroups = [
  { title: 'Languages', items: ['JavaScript', 'TypeScript', 'Python'] },
  { title: 'Frontend', items: ['React'] },
  { title: 'Backend', items: ['Node.js', 'Django', 'REST APIs'] },
  { title: 'Databases', items: ['PostgreSQL', 'MySQL', 'Prisma'] },
  { title: 'Tools & practices', items: ['Git', 'Linux', 'Debugging', 'Testing fundamentals', 'Basic CI/CD'] },
  { title: 'Learning & exposure', items: ['Docker', 'AWS', 'Microservices', 'AI/ML concepts', 'Web3 fundamentals', 'Java'] },
]
const skillLogos = { JavaScript: javascriptLogo, React: reactLogo, 'Node.js': nodeLogo }

function Gallery({ project }) {
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const galleryRef = useRef(null)
  const paused = hovered || focused

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '100px' })
    if (galleryRef.current) observer.observe(galleryRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    if (project.images.length < 2 || !visible || paused || reducedMotion) return undefined
    const timer = window.setInterval(() => setActive(index => (index + 1) % project.images.length), 4000)
    return () => window.clearInterval(timer)
  }, [project.images.length, visible, paused, reducedMotion])

  const change = (step) => {
    setActive(index => (index + step + project.images.length) % project.images.length)
    setFailed(false)
  }

  return <div className={`project-gallery${project.images.length ? '' : ' project-gallery--empty'}`} ref={galleryRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>
    {project.images.length > 0 && !failed ? <img key={project.images[active].src} className="gallery-image" src={project.images[active].src} alt={project.images[active].alt} loading="lazy" onError={() => setFailed(true)} /> : <div className="image-placeholder"><span className="placeholder-mark">&lt;/&gt;</span><span>{failed ? 'Preview unavailable' : 'Project preview'}</span></div>}
    {project.images.length > 1 && !failed && <>
      <div className="gallery-controls">
        <button type="button" aria-label={`Previous ${project.title} screenshot`} onClick={() => change(-1)}>‹</button>
        <button type="button" aria-label={`Next ${project.title} screenshot`} onClick={() => change(1)}>›</button>
      </div>
      <div className="gallery-dots" aria-label={`Screenshot ${active + 1} of ${project.images.length}`}>
        {project.images.map((image, index) => <button key={image.src} type="button" aria-label={`Show screenshot ${index + 1}`} aria-current={active === index ? 'true' : undefined} onClick={() => { setActive(index); setFailed(false) }} />)}
      </div>
    </>}
    {project.images.length > 1 && <span className="gallery-count" aria-live="polite">{active + 1} / {project.images.length}</span>}
  </div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return <>
    <header className="site-header">
      <nav className="nav-wrap" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">T</span><span>Olatunji Rauf</span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="nav-links" onClick={() => setMenuOpen(open => !open)}>{menuOpen ? 'Close' : 'Menu'}</button>
        <div id="nav-links" className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}>
          {[['About', '#about'], ['Projects', '#projects'], ['Tech stack', '#skills'], ['Experience', '#experience'], ['Contact', '#contact']].map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
          <a className="nav-social" href="https://github.com/techbium" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </nav>
    </header>
    <main id="home">
      <section className="hero page-width">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER · LAGOS, NIGERIA</p>
          <h1>Building reliable backend systems and practical software.</h1>
          <p className="hero-summary">I build web applications, REST APIs, and database-backed systems with JavaScript and Python technologies. I’m growing toward backend engineering, system design, and dependable infrastructure.</p>
          <div className="hero-actions"><a className="button button-primary" href="#projects">Explore projects <span>↘</span></a><a className="button button-secondary" href="#contact">Contact me</a><a className="text-link hero-github" href="https://github.com/techbium" target="_blank" rel="noreferrer">GitHub ↗</a></div>
        </div>
        <aside className="hero-note" aria-label="Engineering focus">
          <div className="note-top"><span>ENGINEERING FOCUS</span><span className="note-symbol">↗</span></div>
          <div className="focus-item"><span className="focus-index">01</span><span>API design</span><span className="focus-line" /></div>
          <div className="focus-item"><span className="focus-index">02</span><span>Relational data</span><span className="focus-line" /></div>
          <div className="focus-item"><span className="focus-index">03</span><span>Maintainable systems</span><span className="focus-line" /></div>
          <p>Thoughtful foundations for useful software.</p>
        </aside>
        <div className="hero-bottom"><span>BACKEND-ORIENTED DEVELOPMENT</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="section page-width about-section" id="about">
        <div className="section-heading"><p className="eyebrow">01 / ABOUT</p><h2>Practical software,<br />built with care.</h2></div>
        <div className="about-copy"><p>I’m a junior software engineer with hands-on experience building full-stack web applications, implementing APIs, and working with relational databases. My work spans personal and freelance projects, from responsive interfaces to backend services.</p><p>I care about solving the right problem, shaping clear data models, and keeping code understandable as an application grows. I’m continuing to develop my skills in system design, infrastructure, debugging, and testing.</p><div className="about-facts"><span><b>Based in</b>Lagos, Nigeria</span><span><b>Education</b>Lagos State University</span></div></div>
      </section>

      <section className="projects-section" id="projects"><div className="page-width">
        <div className="section-heading projects-heading"><div><p className="eyebrow">02 / SELECTED WORK</p><h2>Projects with a purpose.</h2></div><p>Applications and interfaces built to solve practical problems and strengthen the foundations behind them.</p></div>
        <div className="projects-grid">{projects.map((project, index) => <article className={`project-card${index < 2 ? ' project-card--featured' : ''}`} key={project.title}>
          <Gallery project={project} />
          <div className="project-content"><div className="project-meta"><span>{project.category}</span><span className="project-number">{String(index + 1).padStart(2, '0')}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-bottom"><div className="tech-tags">{project.tech.map(tag => <span key={tag}>{tag}</span>)}</div><a className="project-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title} live project`}>Visit project <span>↗</span></a></div></div>
        </article>)}</div>
      </div></section>

      <section className="section page-width skills-section" id="skills"><div className="section-heading"><p className="eyebrow">03 / TECH STACK</p><h2>Tools for building<br />end to end.</h2><p className="heading-detail">A growing toolkit, grounded in practical application.</p></div><div className="skills-grid">{skillGroups.map(group => <div className="skill-group" key={group.title}><h3>{group.title}</h3><div className="skill-list">{group.items.map(item => <span className="skill-chip" key={item}>{skillLogos[item] && <img className="skill-logo" src={skillLogos[item]} alt="" />}{item}</span>)}</div></div>)}</div></section>

      <section className="experience-section" id="experience"><div className="page-width experience-layout"><div className="section-heading"><p className="eyebrow">04 / EXPERIENCE</p><h2>Learning by<br />building.</h2></div><div className="experience-entry"><div className="experience-top"><div><h3>Junior Software Engineer</h3><p>Freelance / Personal Projects</p></div><span>2024 — PRESENT</span></div><p className="experience-intro">Building and deploying full-stack applications while developing a solid backend engineering practice.</p><ul><li>Build web applications with React, Node.js, and Django.</li><li>Design REST APIs with authentication, routing, and CRUD operations.</li><li>Model and query relational data with MySQL and PostgreSQL.</li><li>Use Git workflows, debug and test applications, and deploy to cloud environments with basic server configuration.</li></ul><div className="experience-tools">JavaScript <i>·</i> React <i>·</i> Node.js <i>·</i> Django <i>·</i> MySQL / PostgreSQL <i>·</i> Git</div></div></div></section>

      <section className="contact-section" id="contact"><div className="page-width contact-inner"><p className="eyebrow">05 / CONTACT</p><h2>Have something<br />good to build?</h2><p>I’m open to connecting with engineering teams, clients, and collaborators.</p><a className="button button-primary" href="mailto:raufolatunji2@gmail.com">Send me an email <span>↗</span></a><div className="contact-links"><a href="https://www.linkedin.com/in/olatunji-rauf-6960093b5/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/techbium" target="_blank" rel="noreferrer">GitHub ↗</a><span>Lagos, Nigeria</span></div></div></section>
    </main>
    <footer className="site-footer"><div className="page-width footer-inner"><a className="brand" href="#home"><span className="brand-mark">T</span><span>Olatunji Rauf</span></a><span>© {new Date().getFullYear()} Olatunji Rauf. Built with care.</span><a href="#home">Back to top ↑</a></div></footer>
  </>
}

export default App
