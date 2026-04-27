import { Link } from 'react-router-dom'
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
  return (
    <div className="portafolio">
      <div className="container">
        <h1 className="portafolio__title">Portafolio</h1>

        <div className="portafolio__grid">
          {projects.map((project, index) => {
            const morphName = project.slug ? `project-img-${project.slug}` : undefined
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
