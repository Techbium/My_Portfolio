import { useEffect, useRef, useState } from 'react'
import javascriptLogo from './assets/js.png'
import reactLogo from './assets/react.png'
import nodeLogo from './assets/node.png'
import techbiumLogo from '../LOGO.png'
import { projects } from './data/projects.js'
import './App.css'

const skillGroups = [
  { title: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Solidity'] },
  { title: 'Frontend', items: ['React', 'HTML', 'CSS', 'Tailwind'] },
  { title: 'Backend', items: ['Node.js', 'Django', 'REST APIs'] },
  { title: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { title: 'Tools & practices', items: ['Git', 'Linux', 'Prisma ORM', 'Drizzle ORM', 'Debugging', 'Testing fundamentals', 'Basic CI/CD'] },
  { title: 'Learning & exposure', items: ['Docker', 'AWS', 'Microservices', 'AI/ML concepts', 'Web3 fundamentals', 'Java', 'Golang'] },
]
const skillLogos = { JavaScript: javascriptLogo, React: reactLogo, 'Node.js': nodeLogo }

const experience = [
  {
    role: 'Software Developer',
    organization: 'Superverge tech',
    period: '2026 — PRESENT',
    summary: 'Building websites for technology events and teaching programming fundamentals to new learners.',
    responsibilities: [
      'Worked on multiple websites for technology events.',
      'Taught about five students HTML, CSS, JavaScript, React fundamentals, and how the web works.',
    ],
  },
  {
    role: 'Backend Developer',
    organization: 'The Relevant Woman',
    period: '2026',
    summary: 'Built the website backend and connected its API, database, and email service.',
    responsibilities: [
      'Built a backend for The Relevant Woman website.',
      'Integrated a REST API with the Next.js application.',
      'Connected Supabase for the database and Brevo for email.',
    ],
  },
  {
    role: 'Software Engineer',
    organization: 'Freelance / Personal Projects / Open Source Contributions',
    period: '2023 — 2025',
    summary: 'Built and deployed full-stack applications, REST APIs, and database-backed features with JavaScript technologies.',
    responsibilities: [
      'Built and deployed web applications using React, Node.js, and Django.',
      'Designed REST APIs for authentication, routing, and data persistence; implemented CRUD operations and protected routes.',
      'Developed responsive interfaces with attention to usability and performance.',
      'Modeled and queried relational databases with MySQL and PostgreSQL.',
      'Used Git and structured development workflows; continued improving debugging, testing, and code structure.',
      'Deployed applications to cloud environments and managed basic server configuration.',
      'Contributed to Engipay, a Web3-based fintech solution.',
    ],
    project: 'Zocial is described in the CV as a web application for social media influencers and managers to share work across multiple platforms from a single post. Project work also includes frontend/backend separation, authentication and protected routes, CRUD APIs, database schema design, and backend business logic.',
    technologies: 'JavaScript · React · Node.js · Django · MySQL / PostgreSQL · Git',
  },
]

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
        <a className="brand" href="#home" onClick={closeMenu}><img className="brand-logo" src={techbiumLogo} alt="" /><span>Olayiwola Olatunji Rauf</span></a>
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
          <p className="hero-summary">I build web applications, REST APIs, and database-backed systems with TypeScript, JavaScript, and modern frameworks. I’m growing toward backend engineering, system design, and dependable infrastructure.</p>
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
        <div className="about-copy"><p>I build full-stack web applications with TypeScript, JavaScript, and modern frameworks, with a strong foundation in backend development, REST API design, and database management. My freelance and personal projects span responsive interfaces, backend services, and application deployment.</p><p>I focus on solving problems with maintainable code and developing production-ready applications. I adapt quickly to new technologies and am growing my knowledge of cloud infrastructure, scalable system design, distributed systems, AI integration, and modern DevOps practices.</p><div className="about-facts"><span><b>Based in</b>Lagos, Nigeria</span><span><b>Education</b>Lagos State University</span><span><b>Language</b>English</span></div></div>
      </section>

      <section className="projects-section" id="projects"><div className="page-width">
        <div className="section-heading projects-heading"><div><p className="eyebrow">02 / SELECTED WORK</p><h2>Projects with a purpose.</h2></div><p>Applications and interfaces built to solve practical problems and strengthen the foundations behind them.</p></div>
        <div className="projects-grid">{projects.map((project, index) => <article className={`project-card${index < 2 ? ' project-card--featured' : ''}`} key={project.title}>
          <Gallery project={project} />
          <div className="project-content"><div className="project-meta"><span>{project.category}</span><span className="project-number">{String(index + 1).padStart(2, '0')}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-bottom"><div className="tech-tags">{project.tech.map(tag => <span key={tag}>{tag}</span>)}</div><a className="project-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title} live project`}>Visit project <span>↗</span></a></div></div>
        </article>)}</div>
      </div></section>

      <section className="section page-width skills-section" id="skills"><div className="section-heading"><p className="eyebrow">03 / TECH STACK</p><h2>Tools for building<br />end to end.</h2><p className="heading-detail">A growing toolkit, grounded in practical application.</p></div><div className="skills-grid">{skillGroups.map(group => <div className="skill-group" key={group.title}><h3>{group.title}</h3><div className="skill-list">{group.items.map(item => <span className="skill-chip" key={item}>{skillLogos[item] && <img className="skill-logo" src={skillLogos[item]} alt="" />}{item}</span>)}</div></div>)}</div></section>

      <section className="experience-section" id="experience"><div className="page-width experience-layout"><div className="section-heading"><p className="eyebrow">04 / EXPERIENCE</p><h2>Building,<br />integrating,<br />and teaching.</h2></div><div className="experience-list">{experience.map((entry) => <article className="experience-entry" key={`${entry.organization}-${entry.period}`}><div className="experience-top"><div><h3>{entry.role}</h3><p>{entry.organization}</p></div><span>{entry.period}</span></div><p className="experience-intro">{entry.summary}</p><details className="experience-details"><summary>{entry.project ? 'Responsibilities and project experience' : 'Responsibilities'} <span>+</span></summary><div className="experience-detail-content"><ul>{entry.responsibilities.map(item => <li key={item}>{item}</li>)}</ul>{entry.project && <p><b>Project experience:</b> {entry.project}</p>}</div></details>{entry.technologies && <div className="experience-tools">{entry.technologies}</div>}</article>)}</div></div></section>

      <section className="contact-section" id="contact"><div className="page-width contact-inner"><p className="eyebrow">05 / CONTACT</p><h2>Have something<br />good to build?</h2><p>I’m open to connecting with engineering teams, clients, and collaborators.</p><a className="button button-primary" href="mailto:raufolatunji2@gmail.com">Send me an email <span>↗</span></a><div className="contact-links"><a href="https://www.linkedin.com/in/olatunji-rauf-6960093b5/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://x.com/tech_bium" target="_blank" rel="noreferrer">X ↗</a><a href="https://github.com/techbium" target="_blank" rel="noreferrer">GitHub ↗</a><span>Lagos, Nigeria</span></div></div></section>
    </main>
    <footer className="site-footer"><div className="page-width footer-inner"><a className="brand" href="#home"><img className="brand-logo" src={techbiumLogo} alt="" /><span>Olayiwola Olatunji Rauf</span></a><span>© {new Date().getFullYear()} Olayiwola Olatunji Rauf. Built with care.</span><a href="#home">Back to top ↑</a></div></footer>
  </>
}

export default App
