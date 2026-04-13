import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './FrameHero.css'

gsap.registerPlugin(ScrollTrigger)

function FrameHero() {
  const containerRef = useRef()
  const [loaded, setLoaded] = useState(false)

  // Entrance animation (CSS-driven, fires once on mount)
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setLoaded(true))
    })
  }, [])

  // Mouse parallax with gsap.quickTo for performance
  useEffect(() => {
    const el = containerRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const xTo = gsap.quickTo('.frame-hero__bg', 'x', { duration: 0.8, ease: 'power3.out' })
    const yTo = gsap.quickTo('.frame-hero__bg', 'y', { duration: 0.8, ease: 'power3.out' })

    const onMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5
      xTo(x * 25)
      yTo(y * 15)
    }

    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  // Scroll-driven pinned parallax dissolve
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100vh',
        pin: true,
        scrub: true,
        anticipatePin: 1,
      }
    })

    // Layer 1: Background — starts shifted up to hide dark top edge of image
    tl.fromTo('.frame-hero__bg', {
      yPercent: -8,
      scale: 1,
    }, {
      yPercent: 10,
      scale: 1.1,
      ease: 'none',
    }, 0)

    // Layer 2: Vignette intensifies
    tl.to('.frame-hero__vignette', {
      opacity: 0.9,
      scale: 1.05,
      ease: 'none',
    }, 0)

    // Layer 3: Film grain fades
    tl.to('.frame-hero__grain', {
      opacity: 0,
      ease: 'power2.in',
    }, 0)

    // Layer 4: Logo zoom-through dissolve
    // Must use fromTo — at mount time the CSS has opacity:0 for the entrance animation,
    // and GSAP would record that as the starting value if we used .to()
    tl.fromTo('.frame-hero__logo', {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      yPercent: 0,
    }, {
      scale: 1.8,
      opacity: 0,
      filter: 'blur(12px)',
      yPercent: -15,
      ease: 'power2.in',
    }, 0.15)

    // Layer 5: Overlay darkens for transition to next frame
    tl.to('.frame-hero__overlay', {
      opacity: 0.95,
      ease: 'power1.in',
    }, 0)

  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className={`frame-hero${loaded ? ' frame-hero--loaded' : ''}`}
      data-section="hero"
      data-nav-bg="transparent"
    >
      <div className="frame-hero__grain" />
      <div className="frame-hero__bg">
        <img src="/heroimage.jpg" alt="" className="frame-hero__bg-img" />
      </div>
      <div className="frame-hero__overlay" />
      <div className="frame-hero__vignette" />
      <div className="frame-hero__content">
        <img className="frame-hero__logo" src="/logoxiryn.png" alt="XYRIN" />
      </div>
    </section>
  )
}

export default FrameHero
