import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './FrameTeam.css'

gsap.registerPlugin(ScrollTrigger)

const team = [
  {
    name: 'Ximena Rivera',
    photo: '/team/ximena.jpg',
    instagram: '@anemixrl',
    role: 'Diseñadora de producto',
    focus: 'Enfoque en procesos de manufactura y calidad',
  },
  {
    name: 'Ariadne Tapia',
    photo: '/team/ariadne.jpg',
    instagram: '@ariadne.eee',
    role: 'Diseñadora de producto',
    focus: 'Enfoque en CAD y renderización',
  },
  {
    name: 'Aylinn Carré',
    photo: '/team/aylinn.jpg',
    instagram: '@itslynncarre',
    role: 'Diseñadora de producto',
    focus: 'Enfoque en diseño visual y UX/UI',
  },
]

function FrameTeam() {
  const containerRef = useRef()

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = gsap.utils.toArray('.frame-team__card')

    cards.forEach((card, i) => {
      // Cards scale down as they get "stacked under" the next card
      if (i < cards.length - 1) {
        gsap.to(card, {
          scale: 0.9,
          filter: 'brightness(0.7)',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top 20%',
            scrub: true,
          }
        })
      }

      // Info overlay reveals
      const info = card.querySelector('.frame-team__info')
      gsap.fromTo(info, {
        yPercent: 20,
        opacity: 0,
      }, {
        yPercent: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: card,
          start: 'top 60%',
          end: 'top 30%',
          scrub: true,
        }
      })
    })
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="frame-team"
      data-section="team"
      data-nav-bg="#9E976B"
    >
      <div className="frame-team__header">
        <h2 className="frame-team__title">The team</h2>
      </div>

      <div className="frame-team__stack">
        {team.map((member, i) => (
          <div
            key={member.name}
            className="frame-team__card"
            style={{ '--card-index': i }}
          >
            <div className="frame-team__photo">
              <img src={member.photo} alt={member.name} loading="lazy" />
            </div>
            <div className="frame-team__info">
              <h3 className="frame-team__name">{member.name}</h3>
              <p className="frame-team__role">{member.role}</p>
              <p className="frame-team__focus">{member.focus}</p>
              <span className="frame-team__instagram">{member.instagram}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FrameTeam
