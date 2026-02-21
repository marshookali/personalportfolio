import '../styles/Skills.css'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Inline SVG icons (monochrome, matching reference) ────── */
const icons = {
  MERNStack: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
      <path d="M2 12c3.333-2 6.667-3 10-3s6.667 1 10 3" />
      <path d="M2 12c3.333 2 6.667 3 10 3s6.667-1 10-3" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
  ),
  DotNETCore: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="Arial, sans-serif">.NET</text>
    </svg>
  ),
  React: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  ),
  NodeJS: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
      <path d="M12 2v20M2 7l10 5 10-5" />
    </svg>
  ),
  MongoDB: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C12 2 7 9 7 14a5 5 0 0010 0c0-5-5-12-5-12z" />
      <path d="M12 14v8" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  ),
  CSharp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="Arial, sans-serif">.NET</text>
    </svg>
  ),
  Express: () => (
    <svg viewBox="0 0 50 24" fill="currentColor">
      <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="400" fontFamily="Georgia, serif" letterSpacing="1">ex</text>
    </svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Arial, sans-serif" fill="#1c1c26">TS</text>
    </svg>
  ),
  JavaScript: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Arial, sans-serif" fill="#1c1c26">JS</text>
    </svg>
  ),
  Redux: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.5 4.5A7.5 7.5 0 0117 12M8.5 4.5A7.5 7.5 0 007 12" />
      <path d="M7 12a7.5 7.5 0 007.5 7.5" />
      <path d="M17 12a5 5 0 01-5 5" />
      <path d="M14 17l1.5 2.5M10 6.5L8 4" />
      <circle cx="17" cy="12" r="1.5" fill="currentColor" />
      <circle cx="7" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="20" r="1.5" fill="currentColor" />
    </svg>
  ),
  SQL: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <ellipse cx="12" cy="6" rx="9" ry="3" />
      <path d="M3 6v4c0 1.657 4.03 3 9 3s9-1.343 9-3V6" />
      <path d="M3 10v4c0 1.657 4.03 3 9 3s9-1.343 9-3v-4" />
      <path d="M3 14v4c0 1.657 4.03 3 9 3s9-1.343 9-3v-4" />
    </svg>
  ),
  Git: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <path d="M6 8v8" />
      <path d="M8 6h4a4 4 0 014 4v4" />
    </svg>
  ),
}

const skills = [
  { name: 'MERN Stack', icon: 'MERNStack' },
  { name: '.NET Core', icon: 'DotNETCore' },
  { name: 'React', icon: 'React' },
  { name: 'Node.js', icon: 'NodeJS' },
  { name: 'MongoDB', icon: 'MongoDB' },
  { name: 'C#', icon: 'CSharp' },
  { name: 'Express', icon: 'Express' },
  { name: 'TypeScript', icon: 'TypeScript' },
  { name: 'JavaScript', icon: 'JavaScript' },
  { name: 'Redux', icon: 'Redux' },
  { name: 'SQL', icon: 'SQL' },
  { name: 'Git', icon: 'Git' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" className="skills section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// what I work with</span>
          <h2 className="section-title">Technical <span>Skills</span></h2>
          <p className="section-subtitle">
            A broad toolkit of modern technologies I use to craft exceptional digital products.
          </p>
          <div className="section-divider" />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="skills__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {skills.map(({ name, icon }) => {
            const Icon = icons[icon]
            return (
              <motion.div key={name} className="skill-card" variants={cardVariants}>
                <div className="skill-card__icon">
                  <Icon />
                </div>
                <span className="skill-card__name">{name}</span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
