import '../styles/Footer.css'
import { motion } from 'framer-motion'
import { Code2, Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="footer__top-line" />

      <div className="container">
        <div className="footer__inner">
          {/* Brand */}
          <div className="footer__brand">
            <a href="#hero" className="footer__logo" onClick={e => { e.preventDefault(); scrollToTop() }}>
              <div className="footer__logo-icon"><Code2 size={16} /></div>
              <span>Dev<span className="gradient-text">Portfolio</span></span>
            </a>
            <p className="footer__tagline">
              Crafting exceptional digital experiences with clean code and creative design.
            </p>
            <div className="footer__socials">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div className="footer__links">
            <h4 className="footer__links-title">Quick Links</h4>
            <ul>
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={e => {
                      e.preventDefault()
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="footer__stack">
            <h4 className="footer__links-title">Built With</h4>
            <ul>
              {['React.js', 'Framer Motion', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript'].map(tech => (
                <li key={tech}><span className="footer__tech-bullet">▹</span>{tech}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Alex Morgan. Made with <Heart size={13} fill="var(--accent-pink)" stroke="none" /> in San Francisco.
          </p>
          <motion.button
            className="footer__scroll-top"
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
