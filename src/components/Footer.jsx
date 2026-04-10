import { NavLink } from 'react-router-dom'
import './Footer.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/portafolio', label: 'Portafolio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/contacto', label: 'Contacto' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <NavLink to="/" className="footer__logo" aria-label="XYRIN Home">
          <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8L20 20M20 20L32 8M20 20L8 32M20 20L32 32" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" />
            <path d="M20 4L20 36" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            <path d="M4 20L36 20" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          </svg>
        </NavLink>

        <ul className="footer__links">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} className="footer__link">
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
