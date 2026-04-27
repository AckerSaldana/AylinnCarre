import { useState } from 'react'
import { flushSync } from 'react-dom'
import { Link, useNavigationType } from 'react-router-dom'
import './Portafolio.css'

const projects = [
  {
    id: 1,
    title: 'Scarabú',
    image: '/portfolio/scarabu.jpg',
    slug: 'scarabu',
  },
  {
    id: 2,
    title: 'Bouquet',
    image: '/portfolio/bouquet.png',
    slug: 'bouquet',
  },
  {
    id: 3,
    title: 'Bonaterra',
    image: '/portfolio/bonaterra.jpg',
    slug: 'bonaterra',
  },
  {
    id: 4,
    title: 'Arahu',
    image: '/portfolio/arahu.png',
    slug: 'arahu',
  },
]

function Portafolio() {
  const navType = useNavigationType()
  // Only one project image gets a viewTransitionName at a time so the others
  // stay in the root snapshot and don't fade in individually during the morph.
  // On POP (back from a project), use the slug stored by ProjectDetail.
  const [activeSlug, setActiveSlug] = useState(() => {
    if (typeof window === 'undefined') return null
    if (navType === 'POP') {
      return sessionStorage.getItem('lastProjectSlug')
    }
    return null
  })

  const handleProjectClick = (slug) => {
    sessionStorage.setItem('lastProjectSlug', slug)
    // Sync DOM update so the OLD view-transition snapshot only carries the
    // viewTransitionName on the clicked card, before React Router starts
    // the transition on its own click handler.
    flushSync(() => setActiveSlug(slug))
  }

  return (
    <div className="portafolio">
      <div className="container">
        <h1 className="portafolio__title">Portafolio</h1>

        <div className="portafolio__grid">
          {projects.map((project, index) => {
            const isActive = project.slug && project.slug === activeSlug
            const morphName = isActive ? `project-img-${project.slug}` : undefined
            const card = (
              <article className="portafolio__project">
                <div className="portafolio__image">
                  <img
                    src={project.image}
                    alt={project.title}
                    style={morphName ? { viewTransitionName: morphName } : undefined}
                  />
                  <div className="portafolio__overlay">
                    <span className="portafolio__name">{project.title}</span>
                  </div>
                </div>
              </article>
            )

            return (
              <div key={project.id}>
                {project.slug ? (
                  <Link
                    to={`/portafolio/${project.slug}`}
                    className="portafolio__link"
                    viewTransition
                    onClick={() => handleProjectClick(project.slug)}
                  >
                    {card}
                  </Link>
                ) : (
                  card
                )}

                {index < projects.length - 1 && (
                  <div className="portafolio__separator">
                    <div className="portafolio__separator-line" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Portafolio
