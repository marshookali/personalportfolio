import '../styles/Experience.css'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react'

const experiences = [
  {
    type: 'work',
    title: 'Senior MERN Stack Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    period: 'Jan 2023 — Present',
    current: true,
    desc: 'Lead developer for enterprise-grade SaaS applications serving 100k+ users. Architected microservices with Node.js, optimized MongoDB queries reducing load times by 60%, and mentored a team of 4 junior developers.',
    achievements: [
      'Reduced API response time by 60% via Redis caching',
      'Built real-time dashboard with Socket.io for 10k concurrent users',
      'Implemented CI/CD pipeline cutting deployment time by 40%',
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
  },
  {
    type: 'work',
    title: 'Full-Stack Developer',
    company: 'StartupLab Inc.',
    location: 'Remote',
    period: 'Jun 2021 — Dec 2022',
    current: false,
    desc: 'Built scalable web applications from scratch using the MERN stack. Worked directly with product owners to translate requirements into clean, performant code. Shipped 8+ major product features.',
    achievements: [
      'Shipped e-commerce platform processing $2M+ in monthly transactions',
      'Reduced bundle size by 45% through code splitting and lazy loading',
      'Integrated Stripe, PayPal, and Razorpay payment gateways',
    ],
    tags: ['React', 'Express', 'MongoDB', 'Stripe', 'Redux'],
  },
  {
    type: 'work',
    title: 'Frontend Developer',
    company: 'Digital Agency Co.',
    location: 'New York, NY',
    period: 'Aug 2020 — May 2021',
    current: false,
    desc: 'Developed responsive, pixel-perfect UIs for clients across healthcare, finance, and retail. Collaborated with designers using Figma and implemented smooth animations with GSAP and Framer Motion.',
    achievements: [
      'Delivered 12+ client projects on time and within budget',
      'Improved landing page conversion rates by 35% through UX optimization',
      'Built accessible components (WCAG 2.1 AA compliant)',
    ],
    tags: ['React', 'GSAP', 'Sass', 'Figma', 'JavaScript'],
  },
  {
    type: 'education',
    title: 'B.Sc. Computer Science',
    company: 'Stanford University',
    location: 'Stanford, CA',
    period: '2016 — 2020',
    current: false,
    desc: 'Studied algorithms, data structures, distributed systems, and software engineering. Graduated with Honours. Recipient of the Dean\'s Award for Academic Excellence.',
    achievements: [
      'GPA: 3.9/4.0 — Dean\'s List all semesters',
      'Final project: Real-time collaborative code editor (like CodePen)',
      'Teaching assistant for Web Development course',
    ],
    tags: ['Algorithms', 'DSA', 'Systems', 'Web Dev', 'AI/ML'],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="experience section" ref={ref}>
      <div className="bg-glow bg-glow-cyan" style={{ width: 400, height: 400, left: -150, top: '30%', position: 'absolute', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// my journey</span>
          <h2 className="section-title">Experience & <span>Education</span></h2>
          <p className="section-subtitle">My professional path and academic background that shaped my expertise.</p>
          <div className="section-divider" />
        </motion.div>

        <div className="timeline">
          {/* Animated center line */}
          <motion.div
            className="timeline__line"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Dot */}
              <div className={`timeline__dot ${exp.type === 'education' ? 'timeline__dot--edu' : ''} ${exp.current ? 'timeline__dot--current' : ''}`}>
                {exp.type === 'education' ? <GraduationCap size={14} /> : <Briefcase size={14} />}
              </div>

              {/* Card */}
              <motion.div className="timeline__card glass-card" whileHover={{ y: -4 }}>
                {exp.current && <span className="timeline__badge">Current</span>}

                <div className="timeline__card-header">
                  <h3 className="timeline__role">{exp.title}</h3>
                  <span className={`timeline__type-tag ${exp.type === 'education' ? 'timeline__type-tag--edu' : ''}`}>
                    {exp.type === 'education' ? '🎓 Education' : '💼 Work'}
                  </span>
                </div>

                <div className="timeline__company">{exp.company}</div>

                <div className="timeline__meta">
                  <span><Calendar size={12} />{exp.period}</span>
                  <span><MapPin size={12} />{exp.location}</span>
                </div>

                <p className="timeline__desc">{exp.desc}</p>

                <ul className="timeline__achievements">
                  {exp.achievements.map((a, j) => (
                    <li key={j}>
                      <span className="timeline__check">▹</span>
                      {a}
                    </li>
                  ))}
                </ul>

                <div className="timeline__tags">
                  {exp.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
