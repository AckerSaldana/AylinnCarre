import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { splitIntoChars } from '../lib/splitText'
import './FramePortfolio.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { id: 1, title: 'Scarabú', image: '/portfolio/scarabu.jpg' },
  { id: 2, title: 'Bouquet', image: '/portfolio/bouquet.png' },
  { id: 3, title: 'Bonaterra', image: '/portfolio/bonaterra.jpg' },
  { id: 4, title: 'Arahu', image: '/portfolio/arahu.png' },
]

function FramePortfolio() {
  const sectionRef = useRef()
  const trackRef = useRef()

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const track = trackRef.current
    const totalWidth = track.scrollWidth
    const viewportWidth = window.innerWidth
    const scrollDistance = totalWidth - viewportWidth

    // Main horizontal scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${scrollDistance * 1.6}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    })

    // Translate the track
    tl.to(track, {
      x: -scrollDistance,
      ease: 'none',
    })

    // Per-item parallax and reveals
    const items = gsap.utils.toArray('.frame-portfolio__item')
    items.forEach((item) => {
      const img = item.querySelector('.frame-portfolio__img')
      const title = item.querySelector('.frame-portfolio__title')

      // Image parallax: moves slower than container
      gsap.to(img, {
        xPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          containerAnimation: tl,
          start: 'left right',
          end: 'right left',
          scrub: true,
        }
      })

      // Item scale: grows as it approaches center
      gsap.fromTo(item, {
        scale: 0.88,
      }, {
        scale: 1,
        scrollTrigger: {
          trigger: item,
          containerAnimation: tl,
          start: 'left 90%',
          end: 'left 40%',
          scrub: true,
        }
      })

      // Title reveal
      if (title) {
        gsap.fromTo(title, {
          yPercent: 40,
          opacity: 0,
        }, {
          yPercent: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            containerAnimation: tl,
            start: 'left 70%',
            end: 'left 40%',
            scrub: true,
          }
        })
      }
    })

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="frame-portfolio"
      data-section="portafolio"
      data-nav-bg="#9E976B"
    >
      <div className="frame-portfolio__header">
        <span className="frame-portfolio__label">Portafolio</span>
        <span className="frame-portfolio__count">({String(projects.length).padStart(2, '0')})</span>
      </div>
      <div ref={trackRef} className="frame-portfolio__track">
        {projects.map((project, i) => (
          <article key={project.id} className="frame-portfolio__item">
            <div className="frame-portfolio__image-wrap">
              <img
                className="frame-portfolio__img"
                src={project.image}
                alt={project.title}
                loading="lazy"
              />
            </div>
            <div className="frame-portfolio__info">
              <span className="frame-portfolio__number">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="frame-portfolio__title">{project.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FramePortfolio
