import './Portafolio.css'

const projects = [
  {
    id: 1,
    title: 'Proyecto 1',
    color: '#6B1C23',
    description: 'Mobiliario conceptual',
  },
  {
    id: 2,
    title: 'Proyecto 2',
    color: '#D4D0CB',
    description: 'Diseño floral y accesorios',
  },
  {
    id: 3,
    title: 'Proyecto 3',
    color: '#A8C5B2',
    description: 'Mobiliario funcional',
  },
  {
    id: 4,
    title: 'Proyecto 4',
    color: '#E8DDD3',
    description: 'Mobiliario en madera',
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
                <div
                  className="portafolio__image"
                  style={{ backgroundColor: project.color }}
                >
                  <span className="portafolio__placeholder">{project.description}</span>
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
