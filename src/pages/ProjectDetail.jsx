import { useEffect, useRef, useState } from 'react'
import { useNavigationType, useParams } from 'react-router-dom'
import './ProjectDetail.css'

const projects = {
  scarabu: {
    title: 'Scarabú',
    hero: '/figmaImages/Scarabu/scarabu familia 1.png',
    intro:
      'Familia de productos compuesta por una mesa auxiliar, un revistero y una lámpara. Productos fabricados con MDF y corte CNC.',
    purpose:
      'Diseñado con el propósito de brindar una superficie para colocar objetos pequeños, decorar y ofrecer libros y/o revistas, y brindar iluminación específica y cálida en la sala de estar.',
    user:
      'El usuario clave del proyecto son los jóvenes adultos recién independizados que habitan un espacio limitado. La problemática identificada fue la falta elementos decorativos accesibles y funcionales.',
    thumbnails: [
      { src: '/figmaImages/Scarabu/revistero2 1.png', alt: 'Revistero Scarabú' },
      { src: '/figmaImages/Scarabu/mesita2 1.png', alt: 'Mesa auxiliar Scarabú' },
      { src: '/figmaImages/Scarabu/lampara 1 1.png', alt: 'Lámpara Scarabú' },
    ],
  },
  bouquet: {
    title: 'Bouquet',
    hero: '/figmaImages/Bouquet/bouquet-hero.png',
    intro:
      'Bouquet es un florero inspirado en la forma de un ramo de flores. El concepto surge de la complicada acción de cambiar el agua de un florero durante el paso de los días.',
    purpose:
      'Diseñado con el propósito de cambiar el agua fácilmente, consta de dos partes removibles que pueden ser separadas para facilitar dicha acción, mientras que la parte superior puede ser puesta sobre la mesa a la vez que sostiene cuidadosamente las flores, la parte inferior es llenada con agua para mantener las flores con vida.',
    user:
      'El usuario clave del proyecto son todas las personas que acostumbran decorar su espacio con flores naturales.\nLa problemática identificada fue la complejidad de la acción del cambio de agua en los floreros tradicionales.',
    thumbnails: [
      { src: '/figmaImages/Bouquet/bouquet-1.png', alt: 'Bouquet — partes separadas' },
      { src: '/figmaImages/Bouquet/bouquet-2.png', alt: 'Bouquet — vista superior' },
      { src: '/figmaImages/Bouquet/bouquet-3.png', alt: 'Bouquet — florero ensamblado' },
    ],
  },
  bonaterra: {
    title: 'Bonaterra',
    hero: '/figmaImages/Bonaterra/bonaterra-hero.png',
    intro:
      'Bonaterra es una familia de mobiliario que busca adaptarse a lugares en donde el espacio sea reducido o simplemente se quiera agregar muebles compactos pero eficientes.',
    purpose:
      'Diseñado con el propósito de organizar espacios reducidos para la mejora de la concentración y del desarrollo del estudio personal.',
    user:
      'El usuario clave del proyecto son los jóvenes adultos recién independizados que habitan un espacio limitado. La problemática identificada fue la falta elementos decorativos accesibles y funcionales.',
    thumbnails: [
      { src: '/figmaImages/Bonaterra/bonaterra-1.png', alt: 'Bonaterra — librero' },
      { src: '/figmaImages/Bonaterra/bonaterra-2.png', alt: 'Bonaterra — taburete' },
      { src: '/figmaImages/Bonaterra/bonaterra-3.png', alt: 'Bonaterra — lámpara' },
    ],
  },
  arahu: {
    title: 'Arahu',
    hero: '/figmaImages/Arahu/arahu-hero.png',
    intro:
      'Familia de productos compuesta por una mesa auxiliar, un revistero y una lámpara. Productos fabricados con MDF y corte CNC.',
    purpose:
      'El mobiliario esta pensado para utilizarse en la sala, diseñado para optimizar el espacio eficientemente y con comodidad. Su diseño atractivo, flexible y multifuncional permite adaptar el área a diversas actividades como descanso, trabajo y entretenimiento, promoviendo la interacción en espacios reducidos.',
    user:
      'El usuario clave son jóvenes estudiantes foráneos que buscan mantener sus espacios en orden y limpios, además de elevar sus espacios, combinando funcionalidad y diseño contemporáneo.',
    thumbnails: [
      { src: '/figmaImages/Arahu/arahu-1.png', alt: 'Arahu — detalle 1' },
      { src: '/figmaImages/Arahu/arahu-2.png', alt: 'Arahu — detalle 2' },
      { src: '/figmaImages/Arahu/arahu-3.png', alt: 'Arahu — detalle 3' },
    ],
  },
}

// Hold text reveals until the morph image has nearly landed.
// Morph image-pair = 800ms; we release a hair before so the cascade overlaps
// the very last bit of the settle, feeling continuous instead of staged.
const MORPH_HOLD_MS = 720

function ProjectDetail() {
  const { slug = 'scarabu' } = useParams()
  const project = projects[slug]
  const navType = useNavigationType() // 'PUSH' = arrived from in-app click; 'POP'/'REPLACE' = direct/back
  const morphName = `project-img-${slug}`

  const cameViaMorph =
    navType === 'PUSH' &&
    typeof document !== 'undefined' &&
    typeof document.startViewTransition === 'function'

  const [revealReady, setRevealReady] = useState(!cameViaMorph)
  const [bodyVisible, setBodyVisible] = useState(false)
  const [thumbsVisible, setThumbsVisible] = useState(false)
  const bodyRef = useRef(null)
  const thumbsRef = useRef(null)

  // Gate the entrance cascade until the morph completes
  useEffect(() => {
    if (revealReady) return
    const t = setTimeout(() => setRevealReady(true), MORPH_HOLD_MS)
    return () => clearTimeout(t)
  }, [revealReady])

  // Scroll-triggered reveals — observers are armed but their visibility flag
  // only flips once revealReady is true (so the morph plays solo)
  useEffect(() => {
    if (!revealReady) return
    const refs = [
      [bodyRef, setBodyVisible],
      [thumbsRef, setThumbsVisible],
    ]
    const observers = refs.map(([ref, setter]) => {
      const el = ref.current
      if (!el) return null
      // If already in viewport (typical right after morph), set immediately.
      const rect = el.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0
      if (inView) {
        setter(true)
        return null
      }
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true)
            obs.disconnect()
          }
        },
        { threshold: 0.2 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [revealReady])

  if (!project) {
    return (
      <div className="project">
        <div className="container">
          <h1 className="project__title">Proyecto no encontrado</h1>
        </div>
      </div>
    )
  }

  return (
    <div className={`project${revealReady ? ' project--ready' : ''}`}>
      <div className="container">
        <h1 className="project__title">{project.title}</h1>

        <figure className="project__hero">
          <img
            src={project.hero}
            alt={project.title}
            style={{ viewTransitionName: morphName }}
          />
        </figure>

        <div
          ref={bodyRef}
          className={`project__body${bodyVisible ? ' project__body--visible' : ''}`}
        >
          <p className="project__paragraph" style={{ '--p': 0 }}>
            {project.intro}
          </p>
          <p className="project__paragraph project__paragraph--accent" style={{ '--p': 1 }}>
            {project.purpose}
          </p>
          <p className="project__paragraph" style={{ '--p': 2 }}>
            {project.user}
          </p>
        </div>

        <div
          ref={thumbsRef}
          className={`project__thumbs${thumbsVisible ? ' project__thumbs--visible' : ''}`}
        >
          {project.thumbnails.map((thumb, i) => (
            <figure key={i} className="project__thumb" style={{ '--t': i }}>
              <img src={thumb.src} alt={thumb.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
