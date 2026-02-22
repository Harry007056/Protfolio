import { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'

/* ─── ASCII Banner ────────────────────────────────────── */
const ASCII_ART = `
 ██╗  ██╗ █████╗ ██████╗ ███████╗██╗  ██╗ █████╗ ██╗     
 ██║  ██║██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██║     
 ███████║███████║██████╔╝███████╗███████║███████║██║     
 ██╔══██║██╔══██║██╔══██╗╚════██║██╔══██║██╔══██║██║     
 ██║  ██║██║  ██║██║  ██║███████║██║  ██║██║  ██║███████╗
 ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
`

/* ─── Portfolio Data ─────────────────────────────────── */
const ABOUT_DATA = {
  bio: [
    "Hello! I'm Harshal Thorat — a full-stack developer who loves",
    "turning complex problems into elegant, user-friendly solutions.",
    "",
    "My journey started with curiosity about how the web works,",
    "and has evolved into a deep passion for building performant,",
    "accessible applications that make a real impact.",
    "",
    "I focus on writing clean, maintainable code and continuously",
    "pushing my skills to stay on the cutting edge of technology.",
  ],
  details: [
    { label: '→  Name', value: 'Harshal Thorat' },
    { label: '→  Role', value: 'Full Stack Developer' },
    { label: '→  Location', value: 'India' },
    { label: '→  Education', value: 'Computer Science' },
    { label: '→  Focus', value: 'Web Development & Cloud' },
    { label: '→  Status', value: '🟢 Open to opportunities' },
  ],
}

const SKILLS_DATA = [
  {
    category: 'Frontend',
    items: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind', 'Next.js'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'Database',
    items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'Redis'],
  },
  {
    category: 'DevOps & Tools',
    items: ['Git', 'GitHub', 'Docker', 'Vercel', 'Figma', 'VS Code', 'Linux'],
  },
]

const PROJECTS_DATA = [
  {
    name: 'e-commerce-platform',
    desc: 'Full-stack e-commerce app with auth, product catalog, cart, and Stripe payment integration.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
  },
  {
    name: 'task-manager-pro',
    desc: 'Collaborative task management tool with real-time updates and drag-and-drop workflows.',
    tech: ['React', 'Firebase', 'DnD Kit', 'Tailwind'],
  },
  {
    name: 'weather-dashboard',
    desc: 'Responsive weather app with forecasts, interactive maps, and auto-location detection.',
    tech: ['JavaScript', 'REST API', 'Chart.js', 'CSS'],
  },
  {
    name: 'dev-console-portfolio',
    desc: 'This interactive terminal-style portfolio you are using right now!',
    tech: ['React', 'Vite', 'CSS', 'Vercel'],
  },
]

const CONTACT_DATA = [
  { icon: '✉', label: 'email', value: 'harshal@example.com', href: 'mailto:harshal@example.com' },
  { icon: '⌘', label: 'github', value: 'github.com/harshal', href: 'https://github.com/harshal' },
  { icon: '◉', label: 'linkedin', value: 'linkedin.com/in/harshal', href: 'https://linkedin.com/in/harshal' },
]

const COMMANDS = ['help', 'about', 'skills', 'projects', 'contact', 'clear', 'whoami', 'date', 'neofetch', 'sudo hire-me']
const SUGGESTIONS = ['help', 'about', 'skills', 'projects', 'contact', 'clear']
const VIEW_MODES = {
  coder: 'coder',
  nonCoder: 'nonCoder',
}

/* ─── Command Output Renderers ───────────────────────── */

function HelpOutput() {
  const cmds = [
    { cmd: 'about', desc: 'Who am I and what I do' },
    { cmd: 'skills', desc: 'Technologies & tools I work with' },
    { cmd: 'projects', desc: 'Featured projects I\'ve built' },
    { cmd: 'contact', desc: 'Get in touch with me' },
    { cmd: 'whoami', desc: 'Quick introduction' },
    { cmd: 'neofetch', desc: 'System info (portfolio style)' },
    { cmd: 'date', desc: 'Current date and time' },
    { cmd: 'sudo hire-me', desc: '🤫' },
    { cmd: 'clear', desc: 'Clear the terminal screen' },
    { cmd: 'help', desc: 'Show this help menu' },
  ]

  return (
    <div className="output-content">
      <div className="output-section-title">📋 Available Commands</div>
      <div className="output-divider">{'─'.repeat(40)}</div>
      <div className="help-table">
        {cmds.map((c) => (
          <div className="help-row" key={c.cmd}>
            <span className="help-cmd">{c.cmd}</span>
            <span className="help-desc">{c.desc}</span>
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
      {ABOUT_DATA.bio.map((line, i) => (
        <div className="output-paragraph" key={i}>{line || '\u00A0'}</div>
      ))}
      <br />
      {ABOUT_DATA.details.map((d, i) => (
        <div className="output-detail" key={i}>
          <span className="output-detail-label">{d.label}</span>
          <span className="output-detail-value">{d.value}</span>
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
      {SKILLS_DATA.map((cat) => (
        <div className="skill-category" key={cat.category}>
          <div className="skill-category-label">// {cat.category}</div>
          <div className="skill-tags">
            {cat.items.map((s) => (
              <span className="skill-tag" key={s}>{s}</span>
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
      {PROJECTS_DATA.map((p) => (
        <div className="project-item" key={p.name}>
          <div className="project-name">📦 {p.name}</div>
          <div className="project-desc">{p.desc}</div>
          <div className="project-meta">
            {p.tech.map((t) => (
              <span className="project-meta-tag" key={t}>{t}</span>
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
      <div className="output-paragraph">
        I'm always open to new opportunities and collaborations.
      </div>
      <div className="output-paragraph" style={{ marginBottom: '16px' }}>
        Feel free to reach out through any of the channels below:
      </div>
      {CONTACT_DATA.map((c) => (
        <a
          key={c.label}
          href={c.href}
          target="_blank"
          rel="noreferrer"
          className="contact-item"
        >
          <span className="contact-icon">{c.icon}</span>
          <span className="contact-label">{c.label}</span>
          <span className="contact-value">{c.value}</span>
        </a>
      ))}
    </div>
  )
}

function WhoamiOutput() {
  return (
    <div className="output-content">
      <div className="output-paragraph">
        <span style={{ color: 'var(--green)' }}>harshal-thorat</span>
        <span style={{ color: 'var(--text-muted)' }}> — </span>
        <span style={{ color: 'var(--text-dim)' }}>Full Stack Developer | Problem Solver | Tech Enthusiast</span>
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
            { l: 'OS', v: 'Developer Portfolio v2.0' },
            { l: 'Host', v: 'harshal-thorat' },
            { l: 'Kernel', v: 'React 19 + Vite 8' },
            { l: 'Shell', v: 'interactive-console' },
            { l: 'Theme', v: 'Cyberpunk Dark' },
            { l: 'Terminal', v: 'Web Browser' },
            { l: 'CPU', v: 'Creative Problem Solving Unit' },
            { l: 'Memory', v: 'Infinite Learning Capacity' },
            { l: 'Uptime', v: 'Since curiosity began ∞' },
          ].map((r) => (
            <div className="output-detail" key={r.l} style={{ marginBottom: '2px' }}>
              <span style={{ color: 'var(--cyan)', minWidth: '100px', display: 'inline-block' }}>{r.l}</span>
              <span style={{ color: 'var(--text-dim)' }}>{r.v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
            {['#ff5f57', '#febc2e', '#28c840', '#3b82f6', '#a78bfa', '#22d3ee', '#f87171', '#fb923c'].map((c) => (
              <div key={c} style={{ width: '16px', height: '16px', borderRadius: '3px', background: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function HireMeOutput() {
  return (
    <div className="output-content">
      <div className="output-success">
        ✅ Request granted! Harshal would love to work with you.
      </div>
      <div className="output-paragraph" style={{ marginTop: '8px' }}>
        <span style={{ color: 'var(--green)' }}>→</span> Run{' '}
        <span style={{ color: 'var(--yellow)' }}>contact</span> to get in touch!
      </div>
    </div>
  )
}

/* ─── PROMPT COMPONENT ───────────────────────────────── */

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
    <div className="theme-switcher">
      <button
        type="button"
        className={`theme-btn ${viewMode === VIEW_MODES.coder ? 'active' : ''}`}
        onClick={() => onChange(VIEW_MODES.coder)}
      >
        Coder Theme
      </button>
      <button
        type="button"
        className={`theme-btn ${viewMode === VIEW_MODES.nonCoder ? 'active' : ''}`}
        onClick={() => onChange(VIEW_MODES.nonCoder)}
      >
        Non-Coder Theme
      </button>
    </div>
  )
}

function NonCoderTheme() {
  return (
    <div className="non-coder-wrapper">
      <section className="non-coder-hero">
        <p className="non-coder-kicker">Full Stack Developer</p>
        <h1>Harshal Thorat</h1>
        <p>I build modern web products that are fast, accessible, and easy to use.</p>
      </section>

      <section className="non-coder-section">
        <h2>About</h2>
        {ABOUT_DATA.bio.filter(Boolean).slice(0, 3).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </section>

      <section className="non-coder-section">
        <h2>Skills</h2>
        <div className="non-coder-grid">
          {SKILLS_DATA.map((cat) => (
            <article className="non-coder-card" key={cat.category}>
              <h3>{cat.category}</h3>
              <p>{cat.items.join(', ')}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="non-coder-section">
        <h2>Projects</h2>
        <div className="non-coder-grid">
          {PROJECTS_DATA.map((project) => (
            <article className="non-coder-card" key={project.name}>
              <h3>{project.name}</h3>
              <p>{project.desc}</p>
              <small>{project.tech.join(' • ')}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="non-coder-section">
        <h2>Contact</h2>
        <div className="non-coder-contact">
          {CONTACT_DATA.map((contact) => (
            <a key={contact.label} href={contact.href} target="_blank" rel="noreferrer">
              {contact.label}: {contact.value}
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ─── MAIN APP ───────────────────────────────────────── */

function App() {
  const [viewMode, setViewMode] = useState(VIEW_MODES.coder)
  const [history, setHistory] = useState(() => [
    { command: 'about', output: <AboutOutput /> },
    { command: 'skills', output: <SkillsOutput /> },
    { command: 'projects', output: <ProjectsOutput /> },
    { command: 'contact', output: <ContactOutput /> },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState(['about', 'skills', 'projects', 'contact'])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history])

  // Auto-focus input
  useEffect(() => {
    if (viewMode === VIEW_MODES.coder) {
      inputRef.current?.focus()
    }
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? cmdHistory.length - 1
          : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(cmdHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
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
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const match = COMMANDS.find((c) => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase())
      if (match) setInput(match)
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setHistory([])
    }
  }

  const handleBodyClick = () => {
    inputRef.current?.focus()
  }

  const handleSuggestion = (cmd) => {
    processCommand(cmd)
    inputRef.current?.focus()
  }

  return (
    <div className="page-shell">
      <ThemeSwitcher viewMode={viewMode} onChange={setViewMode} />

      {viewMode === VIEW_MODES.coder ? (
        <div className="terminal-wrapper">
          <div className="terminal">
            {/* Title Bar */}
            <div className="terminal-titlebar">
              <div className="titlebar-dots">
                <div className="titlebar-dot red" />
                <div className="titlebar-dot yellow" />
                <div className="titlebar-dot green" />
              </div>
              <div className="titlebar-title">harshal@portfolio: ~</div>
              <div className="titlebar-tabs">
                <button className="titlebar-tab active">bash</button>
                <button className="titlebar-tab" onClick={() => handleSuggestion('neofetch')}>neofetch</button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="terminal-body" ref={bodyRef} onClick={handleBodyClick}>
              {/* Welcome Banner */}
              <pre className="ascii-banner">{ASCII_ART}</pre>
              <div className="welcome-text">
                Welcome to Harshal Thorat's interactive portfolio terminal.
              </div>
              <div className="welcome-hint">
                Type <span>help</span> to see available commands, or click the suggestions below.
              </div>

              {/* Command History */}
              {history.map((entry, i) => (
                <div className="output-block" key={i}>
                  <PromptLine command={entry.command} />
                  {entry.output}
                </div>
              ))}
            </div>

            {/* Suggestion Bar */}
            <div className="suggestion-bar">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="suggestion-chip"
                  onClick={() => handleSuggestion(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input Area */}
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
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type a command..."
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Status Bar */}
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
                <span>v2.0.0</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NonCoderTheme />
      )}
    </div>
  )
}

export default App

