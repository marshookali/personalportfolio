import '../styles/Contact.css'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, Github, Linkedin, Twitter } from 'lucide-react'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'alex.morgan@email.com', href: 'mailto:alex.morgan@email.com', color: 'var(--accent-purple)' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 012-3456', href: 'tel:+15550123456', color: 'var(--accent-cyan)' },
  { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: null, color: 'var(--accent-green)' },
]

const socials = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1800)
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section id="contact" className="contact section" ref={ref}>
      <div className="bg-glow bg-glow-purple" style={{ width: 500, height: 500, right: -200, top: '-10%', position: 'absolute', pointerEvents: 'none' }} />
      <div className="bg-glow bg-glow-cyan" style={{ width: 400, height: 400, left: -150, bottom: '10%', position: 'absolute', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// let's connect</span>
          <h2 className="section-title">Get In <span>Touch</span></h2>
          <p className="section-subtitle">Have a project in mind or just want to say hi? My inbox is always open.</p>
          <div className="section-divider" />
        </motion.div>

        <motion.div
          className="contact__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Left: Info */}
          <motion.div variants={itemVariants} className="contact__info">
            <div className="contact__info-text">
              <h3>Let's Build Something <span className="gradient-text">Amazing</span></h3>
              <p>I'm currently available for freelance projects, full-time roles, and technical consultations. Let's create something that makes a difference.</p>
            </div>

            <div className="contact__info-cards">
              {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} className="contact__info-card glass-card">
                  <div className="contact__info-icon" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <p className="contact__info-label">{label}</p>
                    {href
                      ? <a href={href} className="contact__info-value">{value}</a>
                      : <p className="contact__info-value">{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="contact__socials">
              <p className="contact__socials-label">Find me on</p>
              <div className="contact__socials-row">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-btn"
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div variants={itemVariants} className="contact__form-wrap glass-card">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="contact__success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle size={64} stroke="var(--accent-green)" />
                  </motion.div>
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  <button className="btn btn-outline" onClick={() => setSubmitted(false)}>Send Another</button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="contact__form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="contact__form-title">Send a Message</h3>

                  <div className="contact__form-row">
                    <div className={`contact__field ${errors.name ? 'contact__field--error' : ''}`}>
                      <label>Your Name *</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Alex Morgan" />
                      {errors.name && <span className="contact__error">{errors.name}</span>}
                    </div>
                    <div className={`contact__field ${errors.email ? 'contact__field--error' : ''}`}>
                      <label>Email Address *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                      {errors.email && <span className="contact__error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="contact__field">
                    <label>Subject</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Project Collaboration" />
                  </div>

                  <div className={`contact__field ${errors.message ? 'contact__field--error' : ''}`}>
                    <label>Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell me about your project..."></textarea>
                    {errors.message && <span className="contact__error">{errors.message}</span>}
                  </div>

                  <motion.button
                    type="submit"
                    className="btn btn-primary contact__submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.03 } : {}}
                    whileTap={!loading ? { scale: 0.97 } : {}}
                  >
                    {loading ? (
                      <span className="contact__loading-dots">Sending<span>.</span><span>.</span><span>.</span></span>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
