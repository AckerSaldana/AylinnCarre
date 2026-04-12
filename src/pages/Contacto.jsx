import './Contacto.css'

function Contacto() {
  return (
    <div className="contacto">
      <div className="container">
        <h1 className="contacto__title">Contacto</h1>

        <div className="contacto__intro">
          <p className="contacto__cta">
            ¿Estás listo para llevar tu espacio al siguiente nivel de funcionalidad?
          </p>
          <p className="contacto__sub">
            Diseñemos juntos algo con propósito, diseñemos algo humano.
          </p>
        </div>

        <div className="contacto__info">
          {/* Row 1: Email + Phone */}
          <div className="contacto__row">
            <a href="mailto:xyrinstudio@gmail.com" className="contacto__item">
              <svg className="contacto__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13L2 4" />
              </svg>
              <span>xyrinstudio@gmail.com</span>
            </a>

            <a href="tel:+522323796417" className="contacto__item">
              <svg className="contacto__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>+52 232 379 6417</span>
            </a>
          </div>

          {/* Row 2: Website + Facebook + Social */}
          <div className="contacto__row">
            <div className="contacto__item">
              <svg className="contacto__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <span>xyrinstudio.com</span>
            </div>

            <div className="contacto__item">
              <svg className="contacto__icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Xyrin Studio</span>
            </div>

            <div className="contacto__item">
              <a href="https://instagram.com/xyryin.studio" target="_blank" rel="noopener noreferrer" className="contacto__social-link" aria-label="Instagram">
                <svg className="contacto__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="https://tiktok.com/@xyryin.studio" target="_blank" rel="noopener noreferrer" className="contacto__social-link" aria-label="TikTok">
                <svg className="contacto__icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.05a8.27 8.27 0 004.76 1.51V7.12a4.83 4.83 0 01-1-.43z" />
                </svg>
              </a>
              <span>@xyryin.studio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacto
