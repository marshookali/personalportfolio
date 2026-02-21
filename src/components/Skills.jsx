import '../styles/Skills.css'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─── All skills grouped for the marquee rows ─────────────── */
const row1 = [
  { name: 'React.js', icon: '⚛️', color: '#61dafb' },
  { name: 'Node.js', icon: '🟢', color: '#68a063' },
  { name: 'MongoDB', icon: '🍃', color: '#47a248' },
  { name: 'Express.js', icon: '🚂', color: '#ffffff' },
  { name: 'TypeScript', icon: '🔷', color: '#3178c6' },
  { name: 'Next.js', icon: '▲', color: '#ffffff' },
  { name: 'JavaScript', icon: '🟡', color: '#f7df1e' },
  { name: 'Redux', icon: '🟣', color: '#764abc' },
]

const row2 = [
  { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
  { name: 'GraphQL', icon: '🔺', color: '#e535ab' },
  { name: 'Docker', icon: '🐳', color: '#2496ed' },
  { name: 'AWS', icon: '☁️', color: '#ff9900' },
  { name: 'Git / GitHub', icon: '🐙', color: '#f05032' },
  { name: 'Tailwind CSS', icon: '💨', color: '#38bdf8' },
  { name: 'Redis', icon: '⚡', color: '#dc382d' },
  { name: 'Figma', icon: '🎨', color: '#f24e1e' },
]

const row3 = [
  { name: 'REST APIs', icon: '🔌', color: '#00d9ff' },
  { name: 'Socket.io', icon: '🔗', color: '#cccccc' },
  { name: 'JWT / Auth', icon: '🔐', color: '#f05032' },
  { name: 'Mongoose', icon: '🐿️', color: '#880000' },
  { name: 'Framer Motion', icon: '🎞️', color: '#0055ff' },
  { name: 'HTML5 / CSS3', icon: '🌐', color: '#e34f26' },
  { name: 'Postman', icon: '📮', color: '#ff6c37' },
  { name: 'VS Code', icon: '💻', color: '#0078d4' },
]

/* Proficiency bars shown below the marquee */
const proficiencies = [
  { name: 'React.js', level: 92, color: '#61dafb' },
  { name: 'Node.js', level: 88, color: '#68a063' },
  { name: 'MongoDB', level: 88, color: '#47a248' },
  { name: 'TypeScript', level: 80, color: '#3178c6' },
  { name: 'Express.js', level: 86, color: '#ffffff' },
  { name: 'GraphQL', level: 72, color: '#e535ab' },
]

/* ─── Marquee Row ─────────────────────────────────────────── */
function MarqueeRow({ items, direction = 'left', speed = 35 }) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items, ...items]

  return (
    <div className="marquee-outer">
      <div
        className={`marquee-track marquee-track--${direction}`}
        style={{ '--marquee-speed': `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="marquee-card"
            style={{ '--card-color': item.color }}
          >
            <span className="marquee-card__icon">{item.icon}</span>
            <span className="marquee-card__name">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main Component ──────────────────────────────────────── */
export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="skills section" ref={ref}>
      {/* Background glows */}
      <div
        className="bg-glow bg-glow-cyan"
        style={{ width: 500, height: 500, left: -200, top: '10%', position: 'absolute', pointerEvents: 'none' }}
      />
      <div
        className="bg-glow bg-glow-purple"
        style={{ width: 400, height: 400, right: -150, bottom: '10%', position: 'absolute', pointerEvents: 'none' }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
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
      </div>

      {/* ── Marquee Rows (full-width, outside container) ── */}
      <motion.div
        className="skills__marquee-section"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <MarqueeRow items={row1} direction="left" speed={30} />
        <MarqueeRow items={row2} direction="right" speed={35} />
        <MarqueeRow items={row3} direction="left" speed={28} />
      </motion.div>

      {/* ── Proficiency Bars ── */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="skills__proficiency"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="skills__prof-title">Core Proficiency</p>
          <div className="skills__prof-grid">
            {proficiencies.map(({ name, level, color }, i) => (
              <div key={name} className="skills__prof-item">
                <div className="skills__prof-header">
                  <span className="skills__prof-name">{name}</span>
                  <span className="skills__prof-level" style={{ color }}>{level}%</span>
                </div>
                <div className="skills__prof-track">
                  <motion.div
                    className="skills__prof-fill"
                    style={{ background: `linear-gradient(90deg, ${color}66, ${color})` }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${level}%` } : {}}
                    transition={{ duration: 1.3, ease: 'easeOut', delay: 0.6 + i * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
