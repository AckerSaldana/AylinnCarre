import './Servicios.css'

const services = [
  {
    id: 1,
    title: 'Interiorismo',
    color: '#A8A47A',
  },
  {
    id: 2,
    title: 'Mobiliario',
    color: '#C4897A',
  },
]

function Servicios() {
  return (
    <div className="servicios">
      <div className="container">
        <h1 className="servicios__title">Servicios</h1>

        <div className="servicios__grid">
          {services.map((service) => (
            <article
              key={service.id}
              className="servicios__card"
              style={{ backgroundColor: service.color }}
            >
              <h2 className="servicios__card-title">{service.title}</h2>
            </article>
          ))}
        </div>

        <section className="clientes">
          <h2 className="clientes__title">Nuestros clientes</h2>
          <div className="clientes__logos">
            <div className="clientes__logo">
              <span className="clientes__logo-text">Tecnológico de Monterrey</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Servicios
