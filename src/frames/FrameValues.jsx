import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './FrameValues.css'

gsap.registerPlugin(ScrollTrigger)

function FrameValues() {
  const containerRef = useRef()

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=540vh',
        pin: true,
        scrub: true,
      }
    })

    // --- Phase 1: Mission (0% - 32%) ---
    tl.to(containerRef.current, {
      backgroundColor: '#4A1218',
      duration: 0.20,
      ease: 'power1.inOut',
    }, 0)

    tl.to('.frame-values__mission', {
      color: '#FFFAF7',
      duration: 0.12,
    }, 0.03)

    tl.fromTo('.frame-values__mission-title', {
      y: 60, opacity: 0,
    }, {
      y: 0, opacity: 1,
      duration: 0.15,
      ease: 'power3.out',
    }, 0.02)

    tl.fromTo('.frame-values__mission-text', {
      y: 40, opacity: 0,
    }, {
      y: 0, opacity: 1,
      duration: 0.15,
      ease: 'power2.out',
    }, 0.10)

    // Mission exit
    tl.to('.frame-values__mission', {
      opacity: 0, y: -40,
      duration: 0.08,
      ease: 'power2.in',
    }, 0.30)

    // --- Phase 2: Vision (38% - 60%) ---
    tl.to('.frame-values__vision', {
      color: '#FFFAF7',
      duration: 0.01,
    }, 0.38)

    tl.fromTo('.frame-values__vision-title', {
      y: 60, opacity: 0,
    }, {
      y: 0, opacity: 1,
      duration: 0.15,
      ease: 'power3.out',
    }, 0.38)

    tl.fromTo('.frame-values__vision-text', {
      y: 40, opacity: 0,
    }, {
      y: 0, opacity: 1,
      duration: 0.15,
      ease: 'power2.out',
    }, 0.46)

    tl.to('.frame-values__vision', {
      opacity: 0, y: -40,
      duration: 0.08,
      ease: 'power2.in',
    }, 0.60)

    // --- Phase 3: Values credo (65% - 100%) ---
    tl.to(containerRef.current, {
      backgroundColor: '#FFFAF7',
      duration: 0.12,
      ease: 'power1.inOut',
    }, 0.65)

    // Humanos
    tl.fromTo('.frame-values__credo-word--1', {
      opacity: 0, scale: 0.6, yPercent: 30, filter: 'blur(8px)',
    }, {
      opacity: 1, scale: 1, yPercent: 0, filter: 'blur(0px)',
      duration: 0.10,
      ease: 'power3.out',
    }, 0.68)

    // +
    tl.fromTo('.frame-values__credo-plus--1', {
      opacity: 0, scale: 0.3, rotation: -90,
    }, {
      opacity: 1, scale: 1, rotation: 0,
      duration: 0.06,
      ease: 'back.out(2)',
    }, 0.78)

    // Innovadores
    tl.fromTo('.frame-values__credo-word--2', {
      opacity: 0, scale: 0.6, yPercent: 30, filter: 'blur(8px)',
    }, {
      opacity: 1, scale: 1, yPercent: 0, filter: 'blur(0px)',
      duration: 0.10,
      ease: 'power3.out',
    }, 0.82)

    // +
    tl.fromTo('.frame-values__credo-plus--2', {
      opacity: 0, scale: 0.3, rotation: -90,
    }, {
      opacity: 1, scale: 1, rotation: 0,
      duration: 0.06,
      ease: 'back.out(2)',
    }, 0.90)

    // Conscientes
    tl.fromTo('.frame-values__credo-word--3', {
      opacity: 0, scale: 0.6, yPercent: 30, filter: 'blur(8px)',
    }, {
      opacity: 1, scale: 1, yPercent: 0, filter: 'blur(0px)',
      duration: 0.10,
      ease: 'power3.out',
    }, 0.92)

  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="frame-values"
      data-section="nosotros"
      data-nav-bg="#4A1218"
    >
      {/* Mission */}
      <div className="frame-values__block frame-values__mission">
        <h2 className="frame-values__subtitle frame-values__mission-title">Misión</h2>
        <p className="frame-values__text frame-values__mission-text">
          Somos un estudio de diseño multidisciplinario especializado en la
          conceptualización y elaboración de mobiliario e interiorismo con propósito.
        </p>
      </div>

      {/* Vision */}
      <div className="frame-values__block frame-values__vision">
        <h2 className="frame-values__subtitle frame-values__vision-title">Visión</h2>
        <p className="frame-values__text frame-values__vision-text">
          Innovar y transformar la industria del interiorismo residencial y
          comercial en México.
        </p>
      </div>

      {/* Values Credo */}
      <div className="frame-values__credo">
        <span className="frame-values__credo-word frame-values__credo-word--1">Humanos</span>
        <span className="frame-values__credo-plus frame-values__credo-plus--1">+</span>
        <span className="frame-values__credo-word frame-values__credo-word--2">Innovadores</span>
        <span className="frame-values__credo-plus frame-values__credo-plus--2">+</span>
        <span className="frame-values__credo-word frame-values__credo-word--3">Conscientes</span>
      </div>
    </section>
  )
}

export default FrameValues
