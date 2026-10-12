import { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'

const ASCII_ART = `
 ██╗  ██╗ █████╗ ██████╗ ███████╗██╗  ██╗ █████╗ ██╗     
 ██║  ██║██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██║     
 ███████║███████║██████╔╝███████╗███████║███████║██║     
 ██╔══██║██╔══██║██╔══██╗╚════██║██╔══██║██╔══██║██║     
 ██║  ██║██║  ██║██║  ██║███████║██║  ██║██║  ██║███████╗
 ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
`

const ABOUT_DATA = {
  intro: 'I craft fast, accessible, and conversion-focused web experiences that help teams ship with confidence.',
  bio: [
    'I’m Harshal Thorat, a full-stack developer focused on turning product ideas into polished digital experiences.',
    'My work blends thoughtful UX, high-performance engineering, and clean architecture to build tools that feel effortless for users.',
    'I enjoy partnering with founders, product teams, and recruiters who value measurable impact and dependable delivery.',
  ],
  details: [
    { label: 'Name', value: 'Harshal Thorat' },
    { label: 'Role', value: 'Full Stack Developer' },
    { label: 'Location', value: 'India' },
    { label: 'Experience', value: '2+ years building web products' },
    { label: 'Focus', value: 'React, Node.js, performance, accessibility' },
    { label: 'Status', value: 'Open to opportunities' },
  ],
}

const SKILLS_DATA = [
  {
    category: 'Frontend',
    items: ['React', 'JavaScript', 'TypeScript', 'Next.js', 'Tailwind', 'HTML5', 'CSS3'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'Python', 'GraphQL'],
  },
  {
    category: 'Data & Cloud',
    items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'Vercel'],
  },
  {
    category: 'Product & Workflow',
    items: ['Figma', 'GitHub', 'Docker', 'Accessibility', 'Performance'],
  },
]

const PROJECTS_DATA = [
  {
    name: 'CommerceFlow',
    short: 'A conversion-first commerce platform with secure checkout and dashboards for growth teams.',
    problem: 'Small businesses needed a reliable online store that could scale without sacrificing speed or trust.',
    solution: 'Built a full-stack commerce experience with Stripe payments, authentication, search, and inventory management.',
    impact: ['Reduced checkout failures by 35%', 'Processed 5,000+ test transactions', 'Raised Lighthouse score from 72 to 98'],
    role: 'Full-stack builder and UI engineer',
    dates: '2024 — Present',
    demo: 'https://example.com/commerceflow',
    github: 'https://github.com/Harry007056',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
  },
  {
    name: 'TaskForge',
    short: 'A collaborative planning tool for fast-moving teams with deadlines, board views, and live updates.',
    problem: 'Teams were juggling fragmented work across spreadsheets and chats.',
    solution: 'Created a real-time task manager with drag-and-drop boards, role-based permissions, and activity tracking.',
    impact: ['Cut planning overhead by 40%', 'Improved team visibility across workstreams', 'Saved 2+ hours per week per team'],
    role: 'Frontend lead and interaction designer',
    dates: '2023 — 2024',
    demo: 'https://example.com/taskforge',
    github: 'https://github.com/Harry007056',
    tech: ['React', 'Firebase', 'Tailwind', 'DnD Kit'],
  },
  {
    name: 'WeatherLens',
    short: 'A weather dashboard with forecasts, alerts, and an elegant responsive experience for daily use.',
    problem: 'Weather tools felt cluttered and hard to use on mobile devices.',
    solution: 'Designed and built a focused dashboard with auto-location, forecast views, and accessible data presentation.',
    impact: ['Improved mobile usability across key flows', 'Delivered a fast, lightweight experience', 'Designed around accessibility and clarity'],
    role: 'Independent product developer',
    dates: '2023',
    demo: 'https://example.com/weatherlens',
    github: 'https://github.com/Harry007056',
    tech: ['JavaScript', 'REST API', 'Chart.js', 'CSS'],
  },
]

const CONTACT_DATA = [
  { label: 'Email', value: 'thoratharshal04@gmail.com', href: 'mailto:thoratharshal04@gmail.com' },
  { label: 'GitHub', value: 'Harry007056', href: 'https://github.com/Harry007056' },
  { label: 'LinkedIn', value: 'Harshal Thorat', href: 'https://www.linkedin.com/in/harshal-thorat-431264281/' },
]

const COMMANDS = ['help', 'about', 'skills', 'projects', 'contact', 'resume', 'clear', 'whoami', 'date', 'neofetch', 'sudo hire-me']
const SUGGESTIONS = ['help', 'about', 'skills', 'projects', 'contact', 'resume']
const VIEW_MODES = {
  terminal: 'terminal',
  portfolio: 'portfolio',
}

function HelpOutput() {
  const cmds = [
    { cmd: 'about', desc: 'Who I am and what I build' },
    { cmd: 'skills', desc: 'The technologies I work with' },
    { cmd: 'projects', desc: 'Selected work and outcomes' },
    { cmd: 'resume', desc: 'Open my resume download link' },
    { cmd: 'contact', desc: 'Reach out directly' },
    { cmd: 'whoami', desc: 'Quick introduction' },
    { cmd: 'neofetch', desc: 'System info in portfolio style' },
    { cmd: 'date', desc: 'Current date and time' },
    { cmd: 'sudo hire-me', desc: 'Request a conversation' },
    { cmd: 'clear', desc: 'Clear the terminal screen' },
    { cmd: 'help', desc: 'Show this help menu' },
  ]

  return (
    <div className="output-content">
      <div className="output-section-title">📋 Available Commands</div>
      <div className="output-divider">{'─'.repeat(40)}</div>
      <div className="help-table">
        {cmds.map((entry) => (
          <div className="help-row" key={entry.cmd}>
            <span className="help-cmd">{entry.cmd}</span>
            <span className="help-desc">{entry.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AboutOutput() {
  return (
    <div className="output-content">
      <div className="output-section-title">👤 About Me</div>
      <div className="output-divider">{'─'.repeat(40)}</div>
      {ABOUT_DATA.bio.map((line, index) => (
        <div className="output-paragraph" key={index}>{line}</div>
      ))}
      <br />
      {ABOUT_DATA.details.map((detail) => (
        <div className="output-detail" key={detail.label}>
          <span className="output-detail-label">{detail.label}</span>
          <span className="output-detail-value">{detail.value}</span>
        </div>
      ))}
    </div>
  )
}

function SkillsOutput() {
  return (
    <div className="output-content">
      <div className="output-section-title">🛠  Tech Stack</div>
      <div className="output-divider">{'─'.repeat(40)}</div>
      {SKILLS_DATA.map((category) => (
        <div className="skill-category" key={category.category}>
          <div className="skill-category-label">// {category.category}</div>
          <div className="skill-tags">
            {category.items.map((skill) => (
              <span className="skill-tag" key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ProjectsOutput() {
  return (
    <div className="output-content">
      <div className="output-section-title">📂 Featured Projects</div>
      <div className="output-divider">{'─'.repeat(40)}</div>
      {PROJECTS_DATA.map((project) => (
        <div className="project-item" key={project.name}>
          <div className="project-name">📦 {project.name}</div>
          <div className="project-desc">{project.short}</div>
          <div className="project-meta">
            {project.tech.map((tech) => (
              <span className="project-meta-tag" key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ContactOutput() {
  return (
    <div className="output-content">
      <div className="output-section-title">📬 Contact</div>
      <div className="output-divider">{'─'.repeat(40)}</div>
      <div className="output-paragraph">I’m always open to new opportunities and collaborations.</div>
      <div className="output-paragraph">Reach out through any of the channels below:</div>
      {CONTACT_DATA.map((contact) => (
        <a key={contact.label} href={contact.href} target="_blank" rel="noreferrer noopener" className="contact-item">
          <span className="contact-icon">↗</span>
          <span className="contact-label">{contact.label}</span>
          <span className="contact-value">{contact.value}</span>
        </a>
      ))}
    </div>
  )
}

function ResumeOutput() {
  return (
    <div className="output-content">
      <div className="output-section-title">📄 Resume</div>
      <div className="output-divider">{'─'.repeat(40)}</div>
      <div className="output-paragraph">Resume download is available in the standard portfolio view.</div>
      <div className="output-paragraph">Use the navigation above or type <span style={{ color: 'var(--yellow)' }}>contact</span> to start a conversation.</div>
    </div>
  )
}

function WhoamiOutput() {
  return (
    <div className="output-content">
      <div className="output-paragraph">
        <span style={{ color: 'var(--green)' }}>harshal-thorat</span>
        <span style={{ color: 'var(--text-muted)' }}> — </span>
        <span style={{ color: 'var(--text-dim)' }}>Full Stack Developer | Product-minded engineer | Problem solver</span>
      </div>
    </div>
  )
}

function DateOutput() {
  return (
    <div className="output-content">
      <div className="output-paragraph" style={{ color: 'var(--cyan)' }}>
        {new Date().toString()}
      </div>
    </div>
  )
}

function NeofetchOutput() {
  return (
    <div className="output-content">
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <pre style={{ color: 'var(--green)', fontSize: '0.55rem', lineHeight: 1.2 }}>{`
    ╱╲
   ╱  ╲
  ╱    ╲
 ╱  ╱╲  ╲
╱  ╱  ╲  ╲
╲  ╲  ╱  ╱
 ╲  ╲╱  ╱
  ╲    ╱
   ╲  ╱
    ╲╱`}</pre>
        <div>
          {[
            { label: 'OS', value: 'Developer Portfolio v3.0' },
            { label: 'Host', value: 'harshal-thorat' },
            { label: 'Kernel', value: 'React 19 + Vite 8' },
            { label: 'Shell', value: 'interactive-console' },
            { label: 'Theme', value: 'Recruiter Ready' },
            { label: 'Terminal', value: 'Web Browser' },
            { label: 'CPU', value: 'Creative Problem Solving Unit' },
            { label: 'Memory', value: 'Infinite Learning Capacity' },
            { label: 'Uptime', value: 'Since curiosity began ∞' },
          ].map((row) => (
            <div className="output-detail" key={row.label} style={{ marginBottom: '2px' }}>
              <span style={{ color: 'var(--cyan)', minWidth: '100px', display: 'inline-block' }}>{row.label}</span>
              <span style={{ color: 'var(--text-dim)' }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="global-loader">
      <div className="world-globe">
        <div className="globe-orbit">
          <div className="globe">
            <div className="continents" />
            <div className="atmosphere" />
          </div>
        </div>
      </div>
      <div className="loader-text">
        <span>harshal@portfolio</span>
        <span className="loader-dots">loading</span>
      </div>
      <div className="loader-ascii">~</div>
    </div>
  )
}

function HireMeOutput() {
  return (
    <div className="output-content">
      <div className="output-success">✅ Request granted! Harshal would love to work with you.</div>
      <div className="output-paragraph" style={{ marginTop: '8px' }}>
        <span style={{ color: 'var(--green)' }}>→</span> Run <span style={{ color: 'var(--yellow)' }}>contact</span> to start the conversation.
      </div>
    </div>
  )
}

function PromptLine({ command }) {
  return (
    <div className="prompt-line">
      <span className="prompt-user">harshal</span>
      <span className="prompt-separator">@</span>
      <span className="prompt-user">portfolio</span>
      <span className="prompt-separator">:</span>
      <span className="prompt-path">~</span>
      <span className="prompt-symbol">$</span>
      <span className="prompt-command">{command}</span>
    </div>
  )
}

function ThemeSwitcher({ viewMode, onChange }) {
  return (
    <div className="theme-switcher" role="toolbar" aria-label="Portfolio mode switcher">
      <button
        type="button"
        className={`theme-btn ${viewMode === VIEW_MODES.terminal ? 'active' : ''}`}
        onClick={() => onChange(VIEW_MODES.terminal)}
        aria-pressed={viewMode === VIEW_MODES.terminal}
      >
        Terminal Mode
      </button>
      <button
        type="button"
        className={`theme-btn ${viewMode === VIEW_MODES.portfolio ? 'active' : ''}`}
        onClick={() => onChange(VIEW_MODES.portfolio)}
        aria-pressed={viewMode === VIEW_MODES.portfolio}
      >
        Standard Portfolio Mode
      </button>
    </div>
  )
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  )
}

function PortfolioLayout({ onSwitchToTerminal }) {
  return (
    <main className="portfolio-shell">
      <section id="hero" className="hero-section">
        <div className="hero-copy">
          <p className="hero-kicker">Full Stack Developer · Product-minded engineer</p>
          <h1>Harshal Thorat</h1>
          <p className="hero-summary">
            Building fast, scalable web applications with React, Node.js, and a strong focus on UX, accessibility, and measurable results.
          </p>
          <div className="hero-tech">
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB'].map((tech) => (
              <span className="tech-pill" key={tech}>{tech}</span>
            ))}
          </div>
          <div className="hero-actions">
            <a className="action-btn primary" href="mailto:thoratharshal04@gmail.com">Hire Me</a>
            <a className="action-btn secondary" href="/Harshal thorat.pdf" download>Download Resume</a>
            <a className="action-btn secondary" href="#projects">View Projects</a>
            <a className="action-btn secondary" href="#contact">Contact</a>
          </div>
          <p className="hero-footnote">Prefer the terminal? Type help.</p>
        </div>
        <div className="hero-card">
          <div className="hero-card-label">Why recruiters notice this profile</div>
          <ul className="hero-card-list">
            <li>Conversion-oriented product thinking</li>
            <li>Accessible and performant interfaces</li>
            <li>Clear ownership across frontend and backend</li>
            <li>Polished, brand-forward presentation</li>
          </ul>
        </div>
      </section>

      <section id="about" className="content-section">
        <SectionHeading
          eyebrow="About"
          title="I design and build experiences that feel effortless"
          description="My approach pairs crisp UI, reliable engineering, and product awareness to turn complex ideas into dependable software."
        />
        <div className="about-grid">
          <div className="about-card">
            <h3>What I bring</h3>
            <p>{ABOUT_DATA.intro}</p>
          </div>
          <div className="about-card">
            <h3>Selected highlights</h3>
            <ul className="check-list">
              <li>2+ years building production-ready web applications</li>
              <li>Strong focus on accessibility and Lighthouse performance</li>
              <li>Comfortable collaborating across design, product, and engineering</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="skills" className="content-section">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I use to ship quickly and thoughtfully"
          description="I work across the full stack, with an emphasis on modern frontend architecture and maintainable backend systems."
        />
        <div className="skill-grid">
          {SKILLS_DATA.map((skillGroup) => (
            <article className="info-card" key={skillGroup.category}>
              <h3>{skillGroup.category}</h3>
              <div className="tag-row">
                {skillGroup.items.map((skill) => (
                  <span className="tag" key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="content-section">
        <SectionHeading
          eyebrow="Projects"
          title="Recruiter-friendly case studies with outcomes"
          description="Each project highlights the problem, the solution, and the impact so the value is obvious at a glance."
        />
        <div className="project-grid">
          {PROJECTS_DATA.map((project) => (
            <article className="project-card" key={project.name}>
              <div className="project-card-top">
                <div>
                  <h3>{project.name}</h3>
                  <p className="project-card-short">{project.short}</p>
                </div>
                <span className="project-date">{project.dates}</span>
              </div>
              <div className="project-details">
                <div>
                  <span className="detail-label">Problem</span>
                  <p>{project.problem}</p>
                </div>
                <div>
                  <span className="detail-label">Solution</span>
                  <p>{project.solution}</p>
                </div>
                <div>
                  <span className="detail-label">Impact</span>
                  <ul>
                    {project.impact.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="project-meta-row">
                  <div>
                    <span className="detail-label">Role</span>
                    <p>{project.role}</p>
                  </div>
                  <div>
                    <span className="detail-label">Tech</span>
                    <p>{project.tech.join(' • ')}</p>
                  </div>
                </div>
              </div>
              <div className="project-links">
                <a href={project.demo} target="_blank" rel="noreferrer noopener">Live Demo</a>
                <a href={project.github} target="_blank" rel="noreferrer noopener">GitHub</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="resume" className="content-section">
        <SectionHeading
          eyebrow="Resume"
          title="A concise snapshot built for recruiters"
          description="Highlights, experience, education, and credentials are all in one place for easy review."
        />
        <div className="resume-card">
          <div className="resume-card-main">
            <div>
              <h3>Selected highlights</h3>
              <ul className="check-list">
                <li><strong>2+ years</strong> of hands-on web development experience</li>
                <li>Built products with a focus on conversion, clarity, and performance</li>
                <li>Experienced in modern frontend frameworks and API-driven architecture</li>
              </ul>
            </div>
            <a className="action-btn primary" href="/resume.pdf" download>Download Resume</a>
          </div>
          <div className="resume-grid">
            <div className="resume-block">
              <h4>Top skills</h4>
              <p>React, Next.js, Node.js, TypeScript, MongoDB, UX, accessibility</p>
            </div>
            <div className="resume-block">
              <h4>Education</h4>
              <p>Bachelor of Computer Science / Software Engineering foundation</p>
            </div>
            <div className="resume-block">
              <h4>Certifications</h4>
              <p>Frontend engineering, modern JavaScript, UI/UX fundamentals</p>
            </div>
            <div className="resume-block">
              <h4>Notable strengths</h4>
              <p>Communication, ownership, rapid iteration, and polished delivery</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="Terminal"
          title="The terminal stays, but the experience now feels premium"
          description="Use the interactive terminal below for a playful brand experience or switch back to the standard portfolio mode."
        />
        <div className="terminal-preview-card">
          <div className="terminal-preview-copy">
            <p>Type help to explore the site, or open terminal mode for the full command-line experience.</p>
            <button className="action-btn secondary" type="button" onClick={onSwitchToTerminal}>Open Terminal Mode</button>
          </div>
          <div className="terminal-preview-window" aria-label="Terminal preview">
            <div className="terminal-preview-header">
              <span className="terminal-dot" />
              <span className="terminal-dot" />
              <span className="terminal-dot" />
            </div>
            <div className="terminal-preview-body">
              <p>$ help</p>
              <p>about  ·  skills  ·  projects  ·  contact</p>
              <p className="terminal-cursor">_</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="content-section">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build something meaningful"
          description="I’m open to freelance work, product collaborations, and full-time opportunities that value quality and momentum."
        />
        <div className="contact-card">
          <div className="contact-card-main">
            <h3>Ready to connect?</h3>
            <p>Whether you need a fast frontend, a polished product experience, or a dependable full-stack partner, I’d love to hear about it.</p>
          </div>
          <div className="contact-actions">
            {CONTACT_DATA.map((contact) => (
              <a key={contact.label} href={contact.href} target="_blank" rel="noreferrer noopener">
                {contact.label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function App() {
  const [viewMode, setViewMode] = useState(VIEW_MODES.portfolio)
  const [history, setHistory] = useState(() => [
    { command: 'about', output: <AboutOutput /> },
    { command: 'skills', output: <SkillsOutput /> },
    { command: 'projects', output: <ProjectsOutput /> },
    { command: 'contact', output: <ContactOutput /> },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState(['about', 'skills', 'projects', 'contact'])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isGlobalLoading, setIsGlobalLoading] = useState(true)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsGlobalLoading(false)
    }, 1200)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (viewMode === VIEW_MODES.terminal) {
      inputRef.current?.focus()
    }
  }, [viewMode])

  useEffect(() => {
    document.body.classList.toggle('theme-noncoder', viewMode === VIEW_MODES.portfolio)
    document.documentElement.style.setProperty('--app-accent', viewMode === VIEW_MODES.portfolio ? '#2563eb' : '#4ade80')
    return () => {
      document.body.classList.remove('theme-noncoder')
      document.documentElement.style.removeProperty('--app-accent')
    }
  }, [viewMode])

  useEffect(() => {
    document.title = viewMode === VIEW_MODES.terminal
      ? 'Harshal Thorat | Interactive Terminal Portfolio'
      : 'Harshal Thorat | Full Stack Developer'
  }, [viewMode])

  const processCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase()

    if (!trimmed) return

    let output = null

    switch (trimmed) {
      case 'help':
        output = <HelpOutput />
        break
      case 'about':
        output = <AboutOutput />
        break
      case 'skills':
        output = <SkillsOutput />
        break
      case 'projects':
        output = <ProjectsOutput />
        break
      case 'contact':
        output = <ContactOutput />
        break
      case 'resume':
        output = <ResumeOutput />
        break
      case 'whoami':
        output = <WhoamiOutput />
        break
      case 'date':
        output = <DateOutput />
        break
      case 'neofetch':
        output = <NeofetchOutput />
        break
      case 'sudo hire-me':
        output = <HireMeOutput />
        break
      case 'clear':
        setHistory([])
        setInput('')
        setCmdHistory((prev) => [...prev, trimmed])
        setHistoryIndex(-1)
        return
      default:
        output = (
          <div className="output-error">
            bash: {trimmed}: command not found. Type <span style={{ color: 'var(--yellow)' }}>help</span> for available commands.
          </div>
        )
    }

    setHistory((prev) => [...prev, { command: cmd.trim(), output }])
    setCmdHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)
    setInput('')
  }, [])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      processCommand(input)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (cmdHistory.length > 0) {
        const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(cmdHistory[newIndex])
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= cmdHistory.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(cmdHistory[newIndex])
        }
      }
    } else if (event.key === 'Tab') {
      event.preventDefault()
      const match = COMMANDS.find((command) => command.startsWith(input.toLowerCase()) && command !== input.toLowerCase())
      if (match) {
        setInput(match)
      }
    } else if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault()
      setHistory([])
    }
  }

  const handleBodyClick = () => {
    inputRef.current?.focus()
  }

  const handleSuggestion = (command) => {
    processCommand(command)
    inputRef.current?.focus()
  }

  if (isGlobalLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className={`page-shell ${viewMode === VIEW_MODES.portfolio ? 'theme-noncoder' : 'theme-coder'}`}>
      <header className="top-bar">
        <a className="brand" href="#hero" aria-label="Harshal Thorat home">Harshal Thorat</a>
        <nav className="top-nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="top-bar-actions">
          <a className="mini-link" href="https://github.com/Harry007056" target="_blank" rel="noreferrer noopener">GitHub</a>
          <a className="mini-link" href="https://www.linkedin.com/in/harshal-thorat-431264281/" target="_blank" rel="noreferrer noopener">LinkedIn</a>
          <a className="mini-link" href="mailto:thoratharshal04@gmail.com">Email</a>
          <a className="mini-link" href="/resume.pdf" download>Resume</a>
          <ThemeSwitcher viewMode={viewMode} onChange={setViewMode} />
        </div>
      </header>

      {viewMode === VIEW_MODES.terminal ? (
        <div className="terminal-wrapper">
          <div className="terminal">
            <div className="terminal-titlebar">
              <div className="titlebar-dots">
                <div className="titlebar-dot red" />
                <div className="titlebar-dot yellow" />
                <div className="titlebar-dot green" />
              </div>
              <div className="titlebar-title">harshal@portfolio: ~</div>
              <div className="titlebar-tabs">
                <button type="button" className="titlebar-tab active">bash</button>
                <button type="button" className="titlebar-tab" onClick={() => handleSuggestion('neofetch')}>neofetch</button>
              </div>
            </div>

            <div className="terminal-body" ref={bodyRef} onClick={handleBodyClick}>
              <pre className="ascii-banner">{ASCII_ART}</pre>
              <div className="welcome-text">Welcome to Harshal Thorat&apos;s interactive portfolio terminal.</div>
              <div className="welcome-hint">Type <span>help</span> to see available commands, or use the navigation above.</div>

              {history.map((entry, index) => (
                <div className="output-block" key={`${entry.command}-${index}`}>
                  <PromptLine command={entry.command} />
                  {entry.output}
                </div>
              ))}
            </div>

            <div className="suggestion-bar">
              {SUGGESTIONS.map((suggestion) => (
                <button key={suggestion} className="suggestion-chip" type="button" onClick={() => handleSuggestion(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="input-area">
              <div className="input-line">
                <span className="prompt-user">harshal</span>
                <span className="prompt-separator">@</span>
                <span className="prompt-user">portfolio</span>
                <span className="prompt-separator">:</span>
                <span className="prompt-path">~</span>
                <span className="prompt-symbol">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  className="input-field"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type a command..."
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="terminal-statusbar">
              <div className="statusbar-left">
                <div className="statusbar-indicator">
                  <div className="statusbar-dot" />
                  <span>ready</span>
                </div>
                <span>bash</span>
                <span>utf-8</span>
              </div>
              <div>
                <span>commands: {cmdHistory.length}</span>
                <span style={{ margin: '0 8px' }}>|</span>
                <span>v3.0.0</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PortfolioLayout onSwitchToTerminal={() => setViewMode(VIEW_MODES.terminal)} />
      )}
    </div>
  )
}

export default App

