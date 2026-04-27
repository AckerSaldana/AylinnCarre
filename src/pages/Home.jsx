import { useEffect, useRef, useState } from 'react'
import './Home.css'

function Home() {
  const [loaded, setLoaded] = useState(false)
  const [settled, setSettled] = useState(false)
  const [pillarsVisible, setPillarsVisible] = useState(false)
  const [logoPlaying, setLogoPlaying] = useState(false)
  const heroRef = useRef(null)
  const pillarsRef = useRef(null)

  // Staggered entrance animation
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setLoaded(true))
    })
    const t = setTimeout(() => setSettled(true), 1800)
    return () => clearTimeout(t)
  }, [])

  // Scroll-triggered pillars reveal
  useEffect(() => {
    const el = pillarsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPillarsVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Repeating logo animation: play → pause 6s → replay
  useEffect(() => {
    if (!pillarsVisible) return
    setLogoPlaying(true)
    const id = setInterval(() => {
      setLogoPlaying(false)
      requestAnimationFrame(() => requestAnimationFrame(() => setLogoPlaying(true)))
    }, 2500 + 6000)
    return () => clearInterval(id)
  }, [pillarsVisible])

  // Subtle mouse-driven parallax on hero layers
  useEffect(() => {
    const hero = heroRef.current
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5
      hero.style.setProperty('--mx', `${x * 15}px`)
      hero.style.setProperty('--my', `${y * 10}px`)
    }

    hero.addEventListener('mousemove', onMove)
    return () => hero.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="home">
      <section
        ref={heroRef}
        className={`hero${loaded ? ' hero--loaded' : ''}${settled ? ' hero--settled' : ''}`}
      >
        <div className="hero__grain" />
        <div className="hero__gradient" />
        <div className="hero__overlay" />
        <div className="hero__vignette" />
        <div className="hero__content">
          <h1 className="hero__title">
            <img className="hero__logo" src="/logoxiryn.png" alt="XYRIN" />
          </h1>
          <p className="hero__tagline">
            {['Convertimos', 'conceptos', 'en', 'experiencias'].map((word, i) => (
              <span key={i} className="hero__tagline-word" style={{ '--w': i }}>
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section
        ref={pillarsRef}
        className={`pillars${pillarsVisible ? ' pillars--visible' : ''}`}
      >
        <div className="pillars__content">
          <p className="pillars__intro">
            En <span className="pillars__brand">XYRIN</span> resolvemos problemas de organización, optimización y experiencia de usuario para hogares e industria restaurantera.
          </p>

          <div className={`xlogo${logoPlaying ? ' xlogo--playing' : ''}`} aria-hidden="true">
            <img className="xlogo__frame xlogo__frame--1" src="/logo-frames/Default.svg" alt="" />
            <img className="xlogo__frame xlogo__frame--2" src="/logo-frames/Variant2.svg" alt="" />
            <img className="xlogo__frame xlogo__frame--3" src="/logo-frames/Variant3.svg" alt="" />
            <img className="xlogo__frame xlogo__frame--4" src="/logo-frames/Variant4.svg" alt="" />
            <img className="xlogo__frame xlogo__frame--5" src="/logo-frames/Variant5.svg" alt="" />
          </div>

          <div className="pillars__list-wrap">
            <h2 className="pillars__heading">Nos enfocamos en tres pilares de solución:</h2>
            <ul className="pillars__list">
              <li style={{ '--p': 0 }}>Organización de elementos funcionales.</li>
              <li style={{ '--p': 1 }}>Optimización de espacios.</li>
              <li style={{ '--p': 2 }}>Experiencia de usuario.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
