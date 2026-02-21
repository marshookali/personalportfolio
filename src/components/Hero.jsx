import '../styles/Hero.css'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react'

const roles = [
  'MERN Stack Developer',
  'Full-Stack Engineer',
  'React Specialist',
  'Node.js Developer',
  'MongoDB Expert',
]

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
]

const stats = [
  { value: '50+', label: 'Projects Built' },
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Happy Clients' },
]

function useTypingEffect(words, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState('typing') // 'typing' | 'pausing' | 'deleting'

  useEffect(() => {
    const word = words[wordIndex]
    let timeout

    if (phase === 'typing') {
      if (display.length < word.length) {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), speed)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pause)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 200)
    } else if (phase === 'deleting') {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), speed / 2)
      } else {
        setWordIndex((wordIndex + 1) % words.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(timeout)
  }, [display, phase, wordIndex, words, speed, pause])

  return display
}

export default function Hero() {
  const typedText = useTypingEffect(roles)
  const canvasRef = useRef(null)

  // Floating particles canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animFrameId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(145, 95, 109, ${p.alpha})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(230, 233, 249, ${0.06 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animFrameId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section id="hero" className="hero section">
      <canvas ref={canvasRef} className="hero__canvas" />

      {/* Background glows */}
      <div className="bg-glow bg-glow-purple hero__glow hero__glow--1" />
      <div className="bg-glow bg-glow-cyan hero__glow hero__glow--2" />

      <div className="container hero__container">
        {/* Left: Text Content */}
        <motion.div className="hero__content" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="hero__badge">
            <span className="hero__badge-dot" />
            Available for work
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero__title">
            Hi, I'm <span className="gradient-text">Alex Morgan</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="hero__role-wrap">
            <span className="hero__role-prefix">I build </span>
            <span className="hero__role">
              {typedText}
              <span className="hero__cursor" />
            </span>
          </motion.div>

          <motion.p variants={itemVariants} className="hero__desc">
            Passionate MERN stack developer crafting high-performance, scalable web applications.
            I turn complex problems into elegant digital experiences — from pixel to production.
          </motion.p>

          <motion.div variants={itemVariants} className="hero__actions">
            <motion.a
              href="#projects"
              className="btn btn-primary"
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              View My Work
            </motion.a>
            <motion.a
              href="/cv.pdf"
              className="btn btn-outline"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              Download CV
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="hero__socials">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-btn"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
            <span className="hero__social-line" />
            <span className="hero__social-label">Follow me</span>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="hero__stats">
            {stats.map((s, i) => (
              <div key={i} className="hero__stat">
                <span className="hero__stat-value gradient-text">{s.value}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Avatar */}
        <motion.div
          className="hero__avatar-wrap"
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <div className="hero__avatar-ring hero__avatar-ring--1" />
          <div className="hero__avatar-ring hero__avatar-ring--2" />
          <div className="hero__avatar">
            <div className="hero__avatar-inner">
              <span className="hero__avatar-initials">AM</span>
              <div className="hero__avatar-code">
                <code>
                  {`const dev = {\n  name: "Alex",\n  stack: "MERN",\n  passion: "∞"\n}`}
                </code>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <motion.div
            className="hero__float-badge hero__float-badge--1"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>⚛️</span> React
          </motion.div>
          <motion.div
            className="hero__float-badge hero__float-badge--2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <span>🍃</span> MongoDB
          </motion.div>
          <motion.div
            className="hero__float-badge hero__float-badge--3"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <span>🟢</span> Node.js
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        className="hero__scroll"
        onClick={scrollToAbout}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={20} />
        </motion.div>
        <span>Scroll down</span>
      </motion.button>
    </section>
  )
}
