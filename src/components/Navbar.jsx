import { useState } from 'react'
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

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__logo" aria-label="XYRIN Home">
          <svg viewBox="0 0 40 40" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8L20 20M20 20L32 8M20 20L8 32M20 20L32 32" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" />
            <path d="M20 4L20 36" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            <path d="M4 20L36 20" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          </svg>
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
