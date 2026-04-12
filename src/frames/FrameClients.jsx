import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import { useGSAP } from '@gsap/react'
import './FrameClients.css'

gsap.registerPlugin(ScrollTrigger, Observer)

const brandLogos = Array.from({ length: 17 }, (_, i) => `/brand-logos/logo-${i + 1}.png`)

function FrameClients() {
  const containerRef = useRef()

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Infinite marquee base animation
    const track = containerRef.current.querySelector('.frame-clients__track')
    if (!track) return

    const marqueeTl = gsap.to(track, {
      xPercent: -50,
      duration: 25,
      ease: 'none',
      repeat: -1,
    })

    // Velocity-responsive speed via Observer
    Observer.create({
      target: window,
      type: 'wheel,touch,scroll',
      onChange: (self) => {
        const velocity = Math.abs(self.velocityY || 0)
        const speedFactor = 1 + velocity / 500
        gsap.to(marqueeTl, {
          timeScale: speedFactor,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: true,
        })
      },
    })

    // Return to base speed when scroll stops
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onLeave: () => {
        gsap.to(marqueeTl, { timeScale: 1, duration: 1.5, ease: 'power3.out' })
      },
      onLeaveBack: () => {
        gsap.to(marqueeTl, { timeScale: 1, duration: 1.5, ease: 'power3.out' })
      },
    })

    // Fade in section
    gsap.fromTo(containerRef.current, {
      opacity: 0,
      y: 40,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    })

  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="frame-clients"
      data-section="clientes"
    >
      <h2 className="frame-clients__title">Nuestros clientes</h2>
      <div className="frame-clients__marquee">
        <div className="frame-clients__track">
          {/* Original + duplicate for seamless loop */}
          {[...brandLogos, ...brandLogos].map((logo, i) => (
            <div key={i} className="frame-clients__logo-wrap">
              <img
                src={logo}
                alt={`Cliente ${(i % brandLogos.length) + 1}`}
                className="frame-clients__logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FrameClients
