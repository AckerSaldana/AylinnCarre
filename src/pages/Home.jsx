import { useEffect, useRef, useState } from 'react'
import './Home.css'

const PILLARS_INTRO_WORDS = [
  'En', { brand: 'XYRIN' }, 'resolvemos', 'problemas', 'de', 'organización,',
  'optimización', 'y', 'experiencia', 'de', 'usuario', 'para', 'hogares', 'e',
  'industria', 'restaurantera.',
]

function Home() {
  const [loaded, setLoaded] = useState(false)
  const [settled, setSettled] = useState(false)
  const [pillarsSettled, setPillarsSettled] = useState(false)
  const [logoPlaying, setLogoPlaying] = useState(false)
  const homeRef = useRef(null)
  const heroRef = useRef(null)
  const pillarsRef = useRef(null)
  const xframeRefs = useRef([])
  const settledRef = useRef(false)

  // Staggered entrance animation
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setLoaded(true))
    })
    const t = setTimeout(() => setSettled(true), 1800)
    return () => clearTimeout(t)
  }, [])

  // Scroll-driven journey from hero to pillars.
  // Computes a 0..1 progress mapped to scrollY ∈ [0, pillarsTop] and exposes it
  // as --journey on the .home root. Pillars text reveals + X logo frame scrubbing
  // are derived from this single value in CSS / per-frame inline styles.
  // When the user has fully landed on pillars (settled), we hand off the X logo
  // to its idle 5-frame loop (the existing keyframe animation behaviour).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // No scroll-driven motion. Just reveal pillars when they enter view.
      const el = pillarsRef.current
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setPillarsSettled(true)
            obs.disconnect()
          }
        },
        { threshold: 0.3 }
      )
      obs.observe(el)
      return () => obs.disconnect()
    }

    let raf = 0
    let pendingFrame = false

    const update = () => {
      pendingFrame = false
      const home = homeRef.current
      const pillars = pillarsRef.current
      if (!home || !pillars) return

      const pillarsTop = pillars.offsetTop
      // Journey reaches 1 a hair before pillars top hits scroll origin so the
      // reveal cascade finishes while pillars is fully in frame, not after.
      const end = Math.max(1, pillarsTop - 60)
      const progress = Math.max(0, Math.min(1, window.scrollY / end))
      home.style.setProperty('--journey', progress.toFixed(4))

      // Scrub the X logo frames between journey [0.45, 0.95]. Each frame i has
      // peak opacity at framePos = i, fading linearly to 0 at framePos = i±1
      // — adjacent frames cross-fade to 0.5/0.5 in the middle, summing to ~1.
      const localProgress = Math.max(0, Math.min(1, (progress - 0.45) / 0.5))
      const framePos = localProgress * 4 // 0..4 over 5 frames
      const isSettled = progress >= 1
      xframeRefs.current.forEach((el, i) => {
        if (!el) return
        if (isSettled) {
          // Hand over to keyframe-driven idle loop.
          el.style.opacity = ''
        } else {
          const distance = Math.abs(framePos - i)
          el.style.opacity = String(Math.max(0, 1 - distance))
        }
      })

      if (isSettled !== settledRef.current) {
        settledRef.current = isSettled
        setPillarsSettled(isSettled)
      }
    }

    const onScroll = () => {
      if (pendingFrame) return
      pendingFrame = true
      raf = requestAnimationFrame(update)
    }

    update() // prime initial value (e.g. when reloaded mid-page)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Idle X logo loop — only after the user has settled into the pillars section.
  // Until then, frames are scrubbed by scroll position (above).
  useEffect(() => {
    if (!pillarsSettled) {
      setLogoPlaying(false)
      return
    }
    let intervalId
    const startId = setTimeout(() => {
      setLogoPlaying(true)
      intervalId = setInterval(() => {
        setLogoPlaying(false)
        requestAnimationFrame(() => requestAnimationFrame(() => setLogoPlaying(true)))
      }, 2500 + 2500)
    }, 600)
    return () => {
      clearTimeout(startId)
      clearInterval(intervalId)
    }
  }, [pillarsSettled])

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
    <div ref={homeRef} className={`home${pillarsSettled ? ' home--settled' : ''}`}>
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

      <section ref={pillarsRef} className="pillars">
        <div className="pillars__content">
          <p className="pillars__intro">
            {PILLARS_INTRO_WORDS.map((entry, i) => {
              const isBrand = typeof entry === 'object'
              const text = isBrand ? entry.brand : entry
              return (
                <span
                  key={i}
                  className={`pillars__intro-word${isBrand ? ' pillars__brand' : ''}`}
                  style={{ '--w': i }}
                >
                  {text}
                </span>
              )
            })}
          </p>

          <div className={`xlogo${logoPlaying ? ' xlogo--playing' : ''}`} aria-hidden="true">
            {[1, 2, 3, 4, 5].map((n, i) => (
              <img
                key={n}
                ref={(el) => { xframeRefs.current[i] = el }}
                className={`xlogo__frame xlogo__frame--${n}`}
                src={n === 1 ? '/logo-frames/Default.svg' : `/logo-frames/Variant${n}.svg`}
                alt=""
              />
            ))}
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
