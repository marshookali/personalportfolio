import '../styles/About.css'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { User, Coffee, Award, Briefcase } from 'lucide-react'

function CountUp({ target, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const num = parseInt(target)
    const step = Math.ceil(num / (duration / 16))
    const timer = setInterval(() => {
      start = Math.min(start + step, num)
      setCount(start)
      if (start >= num) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return <span ref={ref}>{count}{target.includes('+') ? '+' : ''}</span>
}

const stats = [
  { icon: Briefcase, value: '50+', label: 'Projects Completed', color: 'var(--accent-purple)' },
  { icon: Award, value: '3+', label: 'Years Experience', color: 'var(--accent-cyan)' },
  { icon: User, value: '20+', label: 'Happy Clients', color: 'var(--accent-green)' },
  { icon: Coffee, value: '1000+', label: 'Cups of Coffee', color: 'var(--accent-pink)' },
]

const skills_list = [
  { label: 'React.js + Next.js', level: 92 },
  { label: 'Node.js + Express', level: 88 },
  { label: 'MongoDB + Mongoose', level: 85 },
  { label: 'TypeScript', level: 80 },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section id="about" className="about section">
      <div className="bg-glow bg-glow-purple" style={{ width: 500, height: 500, right: -200, top: '20%', position: 'absolute', pointerEvents: 'none' }} />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// who I am</span>
          <h2 className="section-title">About <span>Me</span></h2>
          <div className="section-divider" />
        </motion.div>

        <motion.div
          className="about__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Left: Avatar card */}
          <motion.div variants={itemVariants} className="about__avatar-col">
            <div className="about__avatar-card glass-card">
              <div className="about__avatar-img">
                <span className="about__avatar-initials">AM</span>
                <div className="about__avatar-glow" />
              </div>
              <div className="about__avatar-info">
                <h3 className="about__name">Alex Morgan</h3>
                <p className="about__role-tag">MERN Stack Developer</p>
                <div className="about__location">
                  <span>📍</span> San Francisco, CA
                </div>
              </div>
              <div className="about__quick-skills">
                {['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'AWS'].map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>

            {/* Mini skill bars */}
            <div className="about__mini-skills glass-card">
              <p className="about__mini-title">Core Proficiencies</p>
              {skills_list.map(({ label, level }) => (
                <div key={label} className="about__mini-bar-wrap">
                  <div className="about__mini-bar-header">
                    <span>{label}</span>
                    <span>{level}%</span>
                  </div>
                  <div className="about__mini-bar-track">
                    <motion.div
                      className="about__mini-bar-fill"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${level}%` } : {}}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div variants={itemVariants} className="about__content">
            <p className="about__text">
              I'm a full-stack developer with a strong passion for building modern, scalable web applications
              using the <strong className="gradient-text">MERN stack</strong>. With over 3 years of hands-on experience,
              I specialize in creating seamless digital experiences from elegant UI designs to robust server-side architectures.
            </p>
            <p className="about__text">
              My journey started with a Computer Science degree, but my real education has been in the trenches —
              shipping products, learning from feedback, and constantly refining my craft. I believe in
              <em> clean code, thoughtful architecture</em>, and user-first design principles.
            </p>
            <p className="about__text">
              When I'm not coding, you'll find me contributing to open-source projects, writing technical articles,
              or exploring new technologies to push my skill boundaries further.
            </p>

            <div className="about__highlights">
              {[
                { emoji: '🎓', text: 'B.Sc. Computer Science, Stanford University' },
                { emoji: '💼', text: 'Open to full-time & freelance opportunities' },
                { emoji: '🌍', text: 'Available for remote & on-site collaboration' },
                { emoji: '🚀', text: 'Always learning — currently mastering Rust & WebAssembly' },
              ].map(({ emoji, text }) => (
                <div key={text} className="about__highlight-item">
                  <span>{emoji}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="about__cta-row">
              <a href="#contact" className="btn btn-primary"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
                Let's Talk
              </a>
              <a href="#projects" className="btn btn-outline"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
                My Projects
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="about__stats"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {stats.map(({ icon: Icon, value, label, color }) => (
            <motion.div key={label} variants={itemVariants} className="about__stat-card glass-card">
              <div className="about__stat-icon" style={{ background: `${color}1a`, border: `1px solid ${color}40` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <div className="about__stat-value" style={{ color }}>
                <CountUp target={value} />
              </div>
              <p className="about__stat-label">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
