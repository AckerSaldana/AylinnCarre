import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { splitIntoWords } from '../lib/splitText'
import './FramePhilosophy.css'

gsap.registerPlugin(ScrollTrigger)

const taglineWords = splitIntoWords('En XYRIN convertimos conceptos en experiencias')

const logoFrames = [
  '/logo-frames/Default.svg',
  '/logo-frames/Variant2.svg',
  '/logo-frames/Variant3.svg',
  '/logo-frames/Variant4.svg',
  '/logo-frames/Variant5.svg',
]

function FramePhilosophy() {
  const containerRef = useRef()

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=250vh',
        pin: true,
        scrub: 1.2,
      }
    })

    // X Logo frame-by-frame tied to scroll (0% - 15%)
    const frames = gsap.utils.toArray('.frame-philosophy__logo-frame')
    frames.forEach((frame, i) => {
      if (i === 0) {
        // First frame starts visible, fades out
        tl.to(frame, { opacity: 0, duration: 0.03 }, 0.03)
      } else {
        // Each subsequent frame fades in then out
        const startPos = (i / frames.length) * 0.15
        tl.fromTo(frame,
          { opacity: 0 },
          { opacity: 1, duration: 0.02 },
          startPos
        )
        if (i < frames.length - 1) {
          tl.to(frame, { opacity: 0, duration: 0.02 }, startPos + 0.03)
        }
      }
    })

    // Word-by-word reveal (20% - 80%)
    const words = gsap.utils.toArray('.frame-philosophy__word-inner')
    words.forEach((word, i) => {
      tl.fromTo(word,
        {
          yPercent: 120,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.08,
          ease: 'power2.out',
        },
        0.20 + i * 0.085
      )
    })

    // Section fade out (85% - 100%)
    tl.to('.frame-philosophy__content', {
      opacity: 0,
      y: -60,
      duration: 0.15,
      ease: 'power2.in',
    }, 0.85)

  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="frame-philosophy"
      data-section="philosophy"
      data-nav-bg="#9E976B"
    >
      <div className="frame-philosophy__content">
        <div className="frame-philosophy__xlogo" aria-hidden="true">
          {logoFrames.map((src, i) => (
            <img
              key={i}
              className="frame-philosophy__logo-frame"
              src={src}
              alt=""
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
        </div>

        <p className="frame-philosophy__text">
          {taglineWords.map(({ word, index }) => (
            <span key={index} className="frame-philosophy__word-mask">
              <span className="frame-philosophy__word-inner">{word}</span>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

export default FramePhilosophy
