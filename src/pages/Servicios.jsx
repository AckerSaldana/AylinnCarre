import './Servicios.css'

const brandLogos = Array.from({ length: 17 }, (_, i) => `/brand-logos/logo-${i + 1}.png`)

const services = [
  {
    id: 1,
    title: 'Interiorismo',
    image: '/interiorismo.jpg',
    overlayColor: 'rgba(158, 151, 107, 0.67)',
    outlineColor: '#9E976B',
    description: 'Enfocado en brindar soluciones que anticipen las necesidades del usuario y crear experiencias a su medida.',
    descColor: '#5A5538',
  },
  {
    id: 2,
    title: 'Mobiliario',
    image: '/mobiliario.jpg',
    overlayColor: 'rgba(219, 143, 131, 0.67)',
    outlineColor: '#DB8F83',
    description: 'Productos diseñados desde la ergonomía consciente con la intención de mejorar el bienestar cotidiano.',
    descColor: '#75443C',
  },
]

function Servicios() {
  return (
    <div className="servicios">
      <div className="container">
        <h1 className="servicios__title">Servicios</h1>

        <div className="servicios__grid">
          {services.map((service) => (
            <article key={service.id} className={`servicios__card${service.outlineColor ? ' servicios__card--has-hover' : ''}`}
              style={service.outlineColor ? { '--outline-color': service.outlineColor } : undefined}>
              <img src={service.image} alt={service.title} />
              <div className="servicios__card-overlay" style={service.overlayColor ? { backgroundColor: service.overlayColor } : undefined}>
                <h2 className="servicios__card-title">{service.title}</h2>
              </div>
              {service.description && (
                <div className="servicios__card-hover">
                  <p className="servicios__card-desc" style={{ color: service.descColor }}>{service.description}</p>
                </div>
              )}
            </article>
          ))}
        </div>

        <section className="clientes">
          <h2 className="clientes__title">Nuestros clientes</h2>
          <div className="clientes__marquee" aria-label="Marcas con las que trabajamos">
            <ul className="clientes__track">
              {[...brandLogos, ...brandLogos].map((logo, i) => {
                const isClone = i >= brandLogos.length
                return (
                  <li
                    key={i}
                    className="clientes__item"
                    aria-hidden={isClone ? 'true' : undefined}
                  >
                    <img src={logo} alt={isClone ? '' : `Cliente ${i + 1}`} />
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Servicios
