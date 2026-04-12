import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { splitIntoWords } from '../lib/splitText'
import './FrameContact.css'

gsap.registerPlugin(ScrollTrigger)

const ctaWords = splitIntoWords('¿Estás listo para llevar tu espacio al siguiente nivel de funcionalidad?')
const subWords = splitIntoWords('Diseñemos juntos algo con propósito, diseñemos algo humano.')

function FrameContact() {
  const containerRef = useRef()

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200vh',
        pin: true,
        scrub: 1,
      }
    })

    // Background color transition: beige → burgundy
    tl.fromTo(containerRef.current, {
      backgroundColor: '#FFFAF7',
    }, {
      backgroundColor: '#6B1C23',
      duration: 0.25,
      ease: 'power1.inOut',
    }, 0)

    // CTA word-by-word reveal (0% - 30%)
    const ctaWordEls = gsap.utils.toArray('.frame-contact__cta-word')
    ctaWordEls.forEach((word, i) => {
      tl.fromTo(word,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.04,
          ease: 'power2.out',
        },
        0.03 + i * 0.02
      )
    })

    // Subtitle reveal (30% - 50%)
    const subWordEls = gsap.utils.toArray('.frame-contact__sub-word')
    subWordEls.forEach((word, i) => {
      tl.fromTo(word,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.04,
          ease: 'power2.out',
        },
        0.32 + i * 0.015
      )
    })

    // Contact items cascade (50% - 75%)
    const items = gsap.utils.toArray('.frame-contact__item')
    items.forEach((item, i) => {
      tl.fromTo(item,
        { yPercent: 60, opacity: 0, filter: 'blur(4px)' },
        {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.06,
          ease: 'power3.out',
        },
        0.52 + i * 0.03
      )
    })

    // Footer fade in (75% - 100%)
    tl.fromTo('.frame-contact__footer', {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.15,
      ease: 'power2.out',
    }, 0.80)

  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="frame-contact"
      data-section="contacto"
      data-nav-bg="#6B1C23"
    >
      <div className="frame-contact__content">
        <div className="frame-contact__hero">
          <p className="frame-contact__cta">
            {ctaWords.map(({ word, index }) => (
              <span key={index} className="frame-contact__word-mask">
                <span className="frame-contact__cta-word">{word}</span>
              </span>
            ))}
          </p>
          <p className="frame-contact__sub">
            {subWords.map(({ word, index }) => (
              <span key={index} className="frame-contact__word-mask">
                <span className="frame-contact__sub-word">{word}</span>
              </span>
            ))}
          </p>
        </div>

        <div className="frame-contact__info">
          <div className="frame-contact__row">
            <a href="mailto:xyrinstudio@gmail.com" className="frame-contact__item">
              <svg className="frame-contact__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13L2 4" />
              </svg>
              <span>xyrinstudio@gmail.com</span>
            </a>

            <a href="tel:+522323796417" className="frame-contact__item">
              <svg className="frame-contact__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>+52 232 379 6417</span>
            </a>
          </div>

          <div className="frame-contact__row">
            <div className="frame-contact__item">
              <svg className="frame-contact__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <span>xyrinstudio.com</span>
            </div>

            <div className="frame-contact__item frame-contact__item--social">
              <a href="https://instagram.com/xyrin.studio" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg className="frame-contact__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="https://tiktok.com/@xyrin.studio" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg className="frame-contact__icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.05a8.27 8.27 0 004.76 1.51V7.12a4.83 4.83 0 01-1-.43z" />
                </svg>
              </a>
              <span>@xyrin.studio</span>
            </div>
          </div>
        </div>

        <footer className="frame-contact__footer">
          <svg className="frame-contact__footer-logo" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4L12 12L20 4M4 20L12 12L20 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <span className="frame-contact__copyright">XYRIN Studio</span>
        </footer>
      </div>
    </section>
  )
}

export default FrameContact
