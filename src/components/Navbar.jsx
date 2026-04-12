import { useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/portafolio', label: 'Portafolio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/contacto', label: 'Contacto' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoPlaying, setLogoPlaying] = useState(false)
  const logoTimer = useRef(null)

  const handleLogoHover = () => {
    if (logoPlaying) return
    setLogoPlaying(true)
    logoTimer.current = setTimeout(() => setLogoPlaying(false), 1200)
  }

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <NavLink
          to="/"
          className="navbar__logo"
          aria-label="XYRIN Home"
          onMouseEnter={handleLogoHover}
        >
          <div className={`nav-xlogo${logoPlaying ? ' nav-xlogo--playing' : ''}`}>
            <img className="nav-xlogo__frame nav-xlogo__frame--1" src="/logo-frames/Default.svg" alt="" />
            <img className="nav-xlogo__frame nav-xlogo__frame--2" src="/logo-frames/Variant2.svg" alt="" />
            <img className="nav-xlogo__frame nav-xlogo__frame--3" src="/logo-frames/Variant3.svg" alt="" />
            <img className="nav-xlogo__frame nav-xlogo__frame--4" src="/logo-frames/Variant4.svg" alt="" />
            <img className="nav-xlogo__frame nav-xlogo__frame--5" src="/logo-frames/Variant5.svg" alt="" />
          </div>
        </NavLink>

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
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
