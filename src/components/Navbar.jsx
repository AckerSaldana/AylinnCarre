import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLenis } from 'lenis/react'
import './Navbar.css'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { section: 'hero', label: 'Home' },
  { section: 'portafolio', label: 'Portafolio' },
  { section: 'nosotros', label: 'Nosotros' },
  { section: 'servicios', label: 'Servicios' },
  { section: 'contacto', label: 'Contacto' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoPlaying, setLogoPlaying] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const logoTimer = useRef(null)
  const navRef = useRef(null)
  const lenis = useLenis()

  const handleLogoHover = () => {
    if (logoPlaying) return
    setLogoPlaying(true)
    logoTimer.current = setTimeout(() => setLogoPlaying(false), 1200)
  }

  useEffect(() => {
    return () => clearTimeout(logoTimer.current)
  }, [])

  const scrollToSection = (sectionId) => {
    const target = document.querySelector(`[data-section="${sectionId}"]`)
    if (target && lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.5 })
    }
    setMenuOpen(false)
  }

  // GSAP: hide on scroll down, show on scroll up
  useGSAP(() => {
    const nav = navRef.current
    if (!nav) return

    const showAnim = gsap.fromTo(nav, {
      yPercent: -100,
    }, {
      yPercent: 0,
      duration: 0.4,
      ease: 'power2.out',
      paused: true,
    })

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play()
        } else if (self.direction === 1 && self.progress > 0.01) {
          showAnim.reverse()
        }
      }
    })

    // Track active section
    const sections = gsap.utils.toArray('[data-section]')
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 30%',
        end: 'bottom 30%',
        onEnter: () => setActiveSection(section.dataset.section),
        onEnterBack: () => setActiveSection(section.dataset.section),
      })
    })
  }, { scope: navRef })

  return (
    <nav ref={navRef} className="navbar">
      <div className="navbar__inner">
        <button
          className="navbar__logo"
          aria-label="XYRIN Home"
          onMouseEnter={handleLogoHover}
          onClick={() => scrollToSection('hero')}
        >
          <div className={`nav-xlogo${logoPlaying ? ' nav-xlogo--playing' : ''}`}>
            <img className="nav-xlogo__frame nav-xlogo__frame--1" src="/logo-frames/Default.svg" alt="" />
            <img className="nav-xlogo__frame nav-xlogo__frame--2" src="/logo-frames/Variant2.svg" alt="" />
            <img className="nav-xlogo__frame nav-xlogo__frame--3" src="/logo-frames/Variant3.svg" alt="" />
            <img className="nav-xlogo__frame nav-xlogo__frame--4" src="/logo-frames/Variant4.svg" alt="" />
            <img className="nav-xlogo__frame nav-xlogo__frame--5" src="/logo-frames/Variant5.svg" alt="" />
          </div>
        </button>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(({ section, label }) => (
            <li key={section}>
              <button
                className={`navbar__link${activeSection === section ? ' navbar__link--active' : ''}`}
                onClick={() => scrollToSection(section)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
