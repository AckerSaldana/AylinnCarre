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
    reverse: false,
  },
  {
    name: 'Ariadne Tapia',
    photo: '/team/ariadne.jpg',
    instagram: '@ariadne.eee',
    role: 'Diseñadora de producto',
    focus: 'Enfoque en CAD y renderización',
    reverse: true,
  },
  {
    name: 'Aylinn Carré',
    photo: '/team/aylinn.jpg',
    instagram: '@itslynncarre',
    role: 'Diseñadora de producto',
    focus: 'Enfoque en diseño visual y UX/UI',
    reverse: false,
  },
]

// Each member gets a different clip-path reveal style
const clipReveals = [
  // Ximena: vertical wipe from bottom
  { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
  // Ariadne: expanding circle
  { from: 'circle(0% at 50% 50%)', to: 'circle(80% at 50% 50%)' },
  // Aylinn: diagonal wipe
  { from: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
]

function FrameTeam() {
  const containerRef = useRef()

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=850vh',
        pin: true,
        scrub: true,
      }
    })

    // --- Title reveal (0s - 3s) ---
    tl.fromTo('.frame-team__title', {
      y: 50, opacity: 0, filter: 'blur(4px)',
    }, {
      y: 0, opacity: 1, filter: 'blur(0px)',
      duration: 3, ease: 'power3.out',
    }, 0)

    // Title fades out as first member enters
    tl.to('.frame-team__title', {
      opacity: 0, y: -30,
      duration: 2, ease: 'power2.in',
    }, 4)

    // --- Acto 1: Ximena (3s - 14s) ---
    // Panel appears
    tl.set('.frame-team__panel--0', { opacity: 1 }, 3)

    // Photo clip-path reveal
    tl.fromTo('.frame-team__photo--0', {
      clipPath: clipReveals[0].from, scale: 1.15,
    }, {
      clipPath: clipReveals[0].to, scale: 1,
      duration: 8, ease: 'power3.inOut',
    }, 3)

    // Name
    tl.fromTo('.frame-team__name--0', {
      yPercent: 80, opacity: 0, filter: 'blur(6px)',
    }, {
      yPercent: 0, opacity: 1, filter: 'blur(0px)',
      duration: 6, ease: 'power2.out',
    }, 5)

    // Role + focus
    tl.fromTo('.frame-team__details--0', {
      y: 40, opacity: 0,
    }, {
      y: 0, opacity: 1,
      duration: 5, ease: 'power2.out',
    }, 7)

    // Instagram
    tl.fromTo('.frame-team__ig--0', {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 3, ease: 'power2.out',
    }, 9)

    // Panel exit
    tl.to('.frame-team__panel--0', {
      opacity: 0, xPercent: -8,
      duration: 3, ease: 'power2.in',
    }, 13)

    // --- Acto 2: Ariadne (16s - 27s) ---
    tl.set('.frame-team__panel--1', { opacity: 1 }, 16)

    tl.fromTo('.frame-team__photo--1', {
      clipPath: clipReveals[1].from, scale: 1.15,
    }, {
      clipPath: clipReveals[1].to, scale: 1,
      duration: 8, ease: 'power2.inOut',
    }, 16)

    tl.fromTo('.frame-team__name--1', {
      yPercent: 80, opacity: 0, filter: 'blur(6px)',
    }, {
      yPercent: 0, opacity: 1, filter: 'blur(0px)',
      duration: 6, ease: 'power2.out',
    }, 18)

    tl.fromTo('.frame-team__details--1', {
      y: 40, opacity: 0,
    }, {
      y: 0, opacity: 1,
      duration: 5, ease: 'power2.out',
    }, 20)

    tl.fromTo('.frame-team__ig--1', {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 3, ease: 'power2.out',
    }, 22)

    tl.to('.frame-team__panel--1', {
      opacity: 0, xPercent: 8,
      duration: 3, ease: 'power2.in',
    }, 26)

    // --- Acto 3: Aylinn (29s - 40s) ---
    tl.set('.frame-team__panel--2', { opacity: 1 }, 29)

    tl.fromTo('.frame-team__photo--2', {
      clipPath: clipReveals[2].from, scale: 1.15,
    }, {
      clipPath: clipReveals[2].to, scale: 1,
      duration: 8, ease: 'power3.inOut',
    }, 29)

    tl.fromTo('.frame-team__name--2', {
      yPercent: 80, opacity: 0, filter: 'blur(6px)',
    }, {
      yPercent: 0, opacity: 1, filter: 'blur(0px)',
      duration: 6, ease: 'power2.out',
    }, 31)

    tl.fromTo('.frame-team__details--2', {
      y: 40, opacity: 0,
    }, {
      y: 0, opacity: 1,
      duration: 5, ease: 'power2.out',
    }, 33)

    tl.fromTo('.frame-team__ig--2', {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 3, ease: 'power2.out',
    }, 35)

  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="frame-team"
      data-section="team"
      data-nav-bg="#9E976B"
    >
      <h2 className="frame-team__title">The team</h2>

      {team.map((member, i) => (
        <div
          key={member.name}
          className={`frame-team__panel frame-team__panel--${i}${member.reverse ? ' frame-team__panel--reverse' : ''}`}
        >
          <div className="frame-team__visual">
            <div className={`frame-team__photo frame-team__photo--${i}`}>
              <img src={member.photo} alt={member.name} loading="lazy" />
            </div>
          </div>

          <div className="frame-team__info">
            <div className={`frame-team__name-wrap`}>
              <h3 className={`frame-team__name frame-team__name--${i}`}>{member.name}</h3>
            </div>
            <div className={`frame-team__details frame-team__details--${i}`}>
              <p className="frame-team__role">{member.role}</p>
              <p className="frame-team__focus">{member.focus}</p>
            </div>
            <span className={`frame-team__ig frame-team__ig--${i}`}>{member.instagram}</span>
          </div>
        </div>
      ))}
    </section>
  )
}

export default FrameTeam
