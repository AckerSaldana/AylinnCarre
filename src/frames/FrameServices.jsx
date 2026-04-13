import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './FrameServices.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'interiorismo',
    title: 'Interiorismo',
    image: '/interiorismo.jpg',
    description: 'Enfocado en brindar soluciones que anticipen las necesidades del usuario y crear experiencias a su medida.',
    accentColor: '#5A5538',
  },
  {
    id: 'mobiliario',
    title: 'Mobiliario',
    image: '/mobiliario.jpg',
    description: 'Productos diseñados desde la ergonomía consciente con la intención de mejorar el bienestar cotidiano.',
    accentColor: '#75443C',
  },
]

function FrameServices() {
  const containerRef = useRef()

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=500vh',
        pin: true,
        scrub: true,
      }
    })

    // --- Service 1: Interiorismo (0s - 18s) ---
    tl.fromTo('.frame-services__image--interiorismo', {
      clipPath: 'inset(50% 50% 50% 50%)',
      scale: 1.3,
    }, {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      duration: 10,
      ease: 'power3.inOut',
    }, 0)

    tl.fromTo('.frame-services__title--interiorismo', {
      xPercent: 60,
      opacity: 0,
      filter: 'blur(4px)',
    }, {
      xPercent: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 8,
      ease: 'power2.out',
    }, 3)

    tl.fromTo('.frame-services__desc--interiorismo', {
      y: 40,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 6,
      ease: 'power2.out',
    }, 7)

    // Interiorismo exit
    tl.to('.frame-services__panel--interiorismo', {
      opacity: 0,
      y: -60,
      duration: 4,
      ease: 'power2.in',
    }, 16)

    // --- Service 2: Mobiliario (20s - 38s) ---
    tl.fromTo('.frame-services__image--mobiliario', {
      clipPath: 'circle(0% at 50% 50%)',
      scale: 1.2,
    }, {
      clipPath: 'circle(75% at 50% 50%)',
      scale: 1,
      duration: 10,
      ease: 'power2.inOut',
    }, 20)

    tl.fromTo('.frame-services__title--mobiliario', {
      xPercent: -60,
      opacity: 0,
      filter: 'blur(4px)',
    }, {
      xPercent: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 8,
      ease: 'power2.out',
    }, 23)

    tl.fromTo('.frame-services__desc--mobiliario', {
      y: 40,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 6,
      ease: 'power2.out',
    }, 27)

    // Final exit
    tl.to('.frame-services__inner', {
      scale: 0.95,
      opacity: 0,
      duration: 4,
      ease: 'power2.in',
    }, 36)

  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="frame-services"
      data-section="servicios"
      data-nav-bg="#9E976B"
    >
      <div className="frame-services__inner">
        {services.map((service) => (
          <div
            key={service.id}
            className={`frame-services__panel frame-services__panel--${service.id}`}
          >
            <div className="frame-services__visual">
              <div className={`frame-services__image frame-services__image--${service.id}`}>
                <img src={service.image} alt={service.title} />
              </div>
            </div>
            <div className="frame-services__text">
              <h2
                className={`frame-services__title frame-services__title--${service.id}`}
                style={{ color: service.accentColor }}
              >
                {service.title}
              </h2>
              <p
                className={`frame-services__desc frame-services__desc--${service.id}`}
                style={{ color: service.accentColor }}
              >
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FrameServices
