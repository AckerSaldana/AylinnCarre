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
        end: '+=300vh',
        pin: true,
        scrub: 1,
      }
    })

    // --- Service 1: Interiorismo — inset clip-path reveal ---
    tl.fromTo('.frame-services__image--interiorismo', {
      clipPath: 'inset(50% 50% 50% 50%)',
      scale: 1.3,
    }, {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      duration: 0.35,
      ease: 'power3.inOut',
    }, 0)

    // Title countermotion from right
    tl.fromTo('.frame-services__title--interiorismo', {
      xPercent: 60,
      opacity: 0,
      filter: 'blur(4px)',
    }, {
      xPercent: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.25,
      ease: 'power2.out',
    }, 0.08)

    // Description fade up
    tl.fromTo('.frame-services__desc--interiorismo', {
      y: 40,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.2,
      ease: 'power2.out',
    }, 0.15)

    // Interiorismo exit
    tl.to('.frame-services__panel--interiorismo', {
      opacity: 0,
      y: -60,
      duration: 0.1,
      ease: 'power2.in',
    }, 0.42)

    // --- Service 2: Mobiliario — circle clip-path reveal ---
    tl.fromTo('.frame-services__image--mobiliario', {
      clipPath: 'circle(0% at 50% 50%)',
      scale: 1.2,
    }, {
      clipPath: 'circle(75% at 50% 50%)',
      scale: 1,
      duration: 0.35,
      ease: 'power2.inOut',
    }, 0.48)

    // Title countermotion from left
    tl.fromTo('.frame-services__title--mobiliario', {
      xPercent: -60,
      opacity: 0,
      filter: 'blur(4px)',
    }, {
      xPercent: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.25,
      ease: 'power2.out',
    }, 0.55)

    // Description fade up
    tl.fromTo('.frame-services__desc--mobiliario', {
      y: 40,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.2,
      ease: 'power2.out',
    }, 0.62)

    // Final exit
    tl.to('.frame-services__inner', {
      scale: 0.95,
      opacity: 0,
      duration: 0.1,
      ease: 'power2.in',
    }, 0.92)

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
