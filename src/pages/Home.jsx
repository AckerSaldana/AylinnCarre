import { useEffect, useRef, useState } from 'react'
import './Home.css'

const PILLARS_INTRO_WORDS = [
  'En', { brand: 'XYRIN' }, 'resolvemos', 'problemas', 'de', 'organización,',
  'optimización', 'y', 'experiencia', 'de', 'usuario', 'para', 'hogares', 'e',
  'industria', 'restaurantera.',
]

const HERO_TAGLINE_WORDS = ['Convertimos', 'conceptos', 'en', 'experiencias']

function Home() {
  const [loaded, setLoaded] = useState(false)
  const [settled, setSettled] = useState(false)
  const [pinnedMode, setPinnedMode] = useState(false)
  const [pillarsSettled, setPillarsSettled] = useState(false)
  const [logoPlaying, setLogoPlaying] = useState(false)

  const homeRef = useRef(null)
  const heroRef = useRef(null)
  const pillarsRef = useRef(null)
  const actRef = useRef(null)
  const xframeRefs = useRef([])
  const settledRef = useRef(false)

  // Initial load entrance (logo + tagline fade-in on first paint)
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setLoaded(true))
    })
    const t = setTimeout(() => setSettled(true), 1800)
    return () => clearTimeout(t)
  }, [])

  // Detect whether the viewport supports the pinned cinematic experience.
  // Pinning needs both enough vertical room (sticky stage must fit content)
  // and a non-reduced-motion preference.
  useEffect(() => {
    const mq = window.matchMedia(
      '(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)'
    )
    const apply = () => setPinnedMode(mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])

  // Drive the single-stage journey, cinematic auto-play style:
  //   - Pinned mode: rAF loop reads a TARGET journey from scroll position and
  //     lerps a CURRENT journey toward it (smoothing factor SMOOTH). The
  //     scroll triggers and seeks the animation, but the cinematic plays out
  //     at its own pace — quick wheel flicks don't snap the morph; it eases
  //     into place. This is how most Awwwards sites feel "auto-play with scroll".
  //   - Flow mode (mobile / reduced motion): IntersectionObserver flips
  //     settled when the pillars section enters the viewport.
  useEffect(() => {
    const home = homeRef.current
    if (!home) return

    if (!pinnedMode) {
      home.style.removeProperty('--journey')
      xframeRefs.current.forEach((el) => { if (el) el.style.opacity = '' })

      const pillars = pillarsRef.current
      if (!pillars) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            settledRef.current = true
            setPillarsSettled(true)
            obs.disconnect()
          }
        },
        { threshold: 0.3 }
      )
      obs.observe(pillars)
      return () => obs.disconnect()
    }

    // Pinned mode: lerped scroll-driven journey
    const SMOOTH = 0.08 // per-frame lerp coefficient (~0.5s catch-up at 60fps)
    let target = 0
    let current = 0
    let rafId = 0
    let active = false

    const apply = () => {
      home.style.setProperty('--journey', current.toFixed(4))

      // X logo frame scrubbing during journey ∈ [0.55, 0.85] (width 0.30,
      // gives each frame ~6% of journey for plateau visibility).
      const isSettled = current >= 0.98
      if (isSettled) {
        xframeRefs.current.forEach((el) => { if (el) el.style.opacity = '' })
      } else {
        const localProgress = clamp01((current - 0.55) / 0.30)
        const framePos = localProgress * 4
        xframeRefs.current.forEach((el, i) => {
          if (!el) return
          const distance = Math.abs(framePos - i)
          // Plateau: opacity 1 when distance < 0.45, crossfade 0.45 → 0.55.
          const opacity = clamp01((0.55 - distance) * 10)
          el.style.opacity = String(opacity)
        })
      }

      if (isSettled !== settledRef.current) {
        settledRef.current = isSettled
        setPillarsSettled(isSettled)
      }
    }

    const computeTarget = () => {
      const act = actRef.current
      if (!act) return
      const vh = window.innerHeight
      const start = act.offsetTop
      const end = start + act.offsetHeight - vh + 70
      target = clamp01((window.scrollY - start) / Math.max(1, end - start))
    }

    const tick = () => {
      computeTarget()
      const delta = target - current
      if (Math.abs(delta) < 0.0005) {
        current = target
        apply()
        active = false
        return
      }
      current += delta * SMOOTH
      apply()
      rafId = requestAnimationFrame(tick)
    }

    const start = () => {
      if (active) return
      active = true
      rafId = requestAnimationFrame(tick)
    }

    // Prime initial state and start loop on first scroll/resize.
    computeTarget()
    current = target
    apply()
    const onChange = () => start()
    window.addEventListener('scroll', onChange, { passive: true })
    window.addEventListener('resize', onChange, { passive: true })
    return () => {
      window.removeEventListener('scroll', onChange)
      window.removeEventListener('resize', onChange)
      cancelAnimationFrame(rafId)
    }
  }, [pinnedMode])

  // Idle X logo loop — only after the user has fully settled into pillars.
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

  // Subtle mouse-driven parallax on the hero curtain (unchanged).
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
    <div
      ref={homeRef}
      className={`home${pinnedMode ? ' home--pinned' : ''}${pillarsSettled ? ' home--settled' : ''}`}
    >
      <div ref={actRef} className="act">
        <div className="stage">
        <section ref={heroRef} className={`stage__phase stage__phase--hero hero${loaded ? ' hero--loaded' : ''}${settled ? ' hero--settled' : ''}`}>
          <div className="hero__grain" />
          <div className="hero__gradient" />
          <div className="hero__overlay" />
          <div className="hero__vignette" />
          <div className="hero__content">
            <h1 className="hero__title">
              <img className="hero__logo" src="/logoxiryn.png" alt="XYRIN" />
            </h1>
            <p className="hero__tagline">
              {HERO_TAGLINE_WORDS.map((word, i) => (
                <span key={i} className="hero__tagline-word" style={{ '--w': i }}>
                  {word}
                </span>
              ))}
            </p>
          </div>
        </section>

        <section ref={pillarsRef} className="stage__phase stage__phase--pillars pillars">
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
      </div>
    </div>
  )
}

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

export default Home
