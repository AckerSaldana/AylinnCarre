import './Portafolio.css'

const projects = [
  {
    id: 1,
    title: 'Scarabú',
    image: '/portfolio/scarabu.jpg',
  },
  {
    id: 2,
    title: 'Bouquet',
    image: '/portfolio/bouquet.png',
  },
  {
    id: 3,
    title: 'Bonaterra',
    image: '/portfolio/bonaterra.jpg',
  },
  {
    id: 4,
    title: 'Arahu',
    image: '/portfolio/arahu.png',
  },
]

function Portafolio() {
  return (
    <div className="portafolio">
      <div className="container">
        <h1 className="portafolio__title">Portafolio</h1>

        <div className="portafolio__grid">
          {projects.map((project, index) => (
            <div key={project.id}>
              <article className="portafolio__project">
                <div className="portafolio__image">
                  <img src={project.image} alt={project.title} />
                  <div className="portafolio__overlay">
                    <span className="portafolio__name">{project.title}</span>
                  </div>
                </div>
              </article>

              {index < projects.length - 1 && (
                <div className="portafolio__separator">
                  <div className="portafolio__separator-line" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Portafolio
