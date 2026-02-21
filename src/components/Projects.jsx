import '../styles/Projects.css'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Star } from 'lucide-react'

const filters = ['All', 'Full-Stack', 'Frontend', 'Backend']

const projects = [
  {
    title: 'ShopFlow E-Commerce',
    desc: 'A full-featured e-commerce platform with real-time inventory, Stripe payments, admin dashboard, and order tracking. Built for high-traffic volumes.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    category: 'Full-Stack',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
    color: '#6c63ff',
    emoji: '🛒',
    stars: 128,
  },
  {
    title: 'TaskFlow — Project Manager',
    desc: 'Real-time collaborative project management tool with drag-and-drop boards, team chat via Socket.io, role-based permissions, and Gantt chart views.',
    tags: ['React', 'Socket.io', 'Express', 'MongoDB', 'JWT'],
    category: 'Full-Stack',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
    color: '#00d9ff',
    emoji: '📋',
    stars: 94,
  },
  {
    title: 'DevBlog CMS',
    desc: 'A modern headless CMS and blogging platform with Markdown support, syntax highlighting, SEO optimization, and an intuitive content editor.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'GraphQL'],
    category: 'Full-Stack',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false,
    color: '#ff6584',
    emoji: '✍️',
    stars: 76,
  },
  {
    title: 'AI Chat Interface',
    desc: 'A beautiful, responsive chat interface integrated with OpenAI GPT-4, with conversation history, code highlighting, and streaming responses.',
    tags: ['React', 'OpenAI API', 'Tailwind', 'Framer Motion'],
    category: 'Frontend',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false,
    color: '#00ff88',
    emoji: '🤖',
    stars: 215,
  },
  {
    title: 'Auth Microservice',
    desc: 'Production-ready authentication microservice featuring OAuth2, MFA, refresh tokens, rate limiting, and comprehensive API documentation.',
    tags: ['Node.js', 'JWT', 'Redis', 'PostgreSQL', 'Docker'],
    category: 'Backend',
    github: 'https://github.com',
    live: null,
    featured: false,
    color: '#ffd700',
    emoji: '🔐',
    stars: 58,
  },
  {
    title: 'Portfolio Dashboard',
    desc: 'A stunning analytics dashboard with D3.js charts, real-time WebSocket data feeds, dark theme, and a fully responsive grid layout.',
    tags: ['React', 'D3.js', 'WebSockets', 'SCSS'],
    category: 'Frontend',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false,
    color: '#ff9900',
    emoji: '📊',
    stars: 42,
  },
]

function ProjectCard({ project, index, inView }) {
  return (
    <motion.div
      className={`project-card glass-card ${project.featured ? 'project-card--featured' : ''}`}
      style={{ '--card-color': project.color }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      layout
    >
      {project.featured && (
        <span className="project-card__featured-badge">⭐ Featured</span>
      )}

      <div className="project-card__header">
        <div className="project-card__emoji" style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}>
          {project.emoji}
        </div>
        <div className="project-card__stars">
          <Star size={13} fill="currentColor" />
          <span>{project.stars}</span>
        </div>
      </div>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.desc}</p>

      <div className="project-card__tags">
        {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>

      <div className="project-card__actions">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card__btn project-card__btn--ghost">
          <Github size={15} />
          Code
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-card__btn project-card__btn--primary" style={{ background: `${project.color}22`, borderColor: `${project.color}60`, color: project.color }}>
            <ExternalLink size={15} />
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <section id="projects" className="projects section" ref={ref}>
      <div className="bg-glow bg-glow-purple" style={{ width: 500, height: 500, right: -200, bottom: -100, position: 'absolute', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// what I've built</span>
          <h2 className="section-title">Featured <span>Projects</span></h2>
          <p className="section-subtitle">A selection of my best work — from full-stack apps to open-source tools.</p>
          <div className="section-divider" />
        </motion.div>

        {/* Filter */}
        <motion.div
          className="projects__filter"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map(f => (
            <button
              key={f}
              className={`projects__filter-btn ${active === f ? 'projects__filter-btn--active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <motion.div className="projects__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} inView={inView} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="projects__cta"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <Github size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
