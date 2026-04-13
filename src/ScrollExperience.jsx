import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import { useGSAP } from '@gsap/react'
import { ReactLenis } from 'lenis/react'

import Navbar from './components/Navbar'
import FrameHero from './frames/FrameHero'
import FramePhilosophy from './frames/FramePhilosophy'
import FrameServices from './frames/FrameServices'
import FramePortfolio from './frames/FramePortfolio'
import FrameValues from './frames/FrameValues'
import FrameTeam from './frames/FrameTeam'
import FrameClients from './frames/FrameClients'
import FrameContact from './frames/FrameContact'

import './ScrollExperience.css'

gsap.registerPlugin(ScrollTrigger, Observer, useGSAP)

function ScrollExperience() {
  const lenisRef = useRef()

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => gsap.ticker.remove(update)
  }, [])

  // Refresh ScrollTrigger after all images load
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    // Safety refresh after 2s in case load event already fired
    const t = setTimeout(() => ScrollTrigger.refresh(), 2000)

    return () => {
      window.removeEventListener('load', onLoad)
      clearTimeout(t)
    }
  }, [])

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 0.5,
        touchMultiplier: 1.5,
        smoothWheel: true,
      }}
      ref={lenisRef}
    >
      <Navbar />
      <div className="scroll-experience">
        <FrameHero />
        <FramePhilosophy />
        <FrameServices />
        <FramePortfolio />
        <FrameValues />
        <FrameTeam />
        <FrameClients />
        <FrameContact />
      </div>
    </ReactLenis>
  )
}

export default ScrollExperience
