import { useState, useEffect } from 'react'
import './Servicios.css'

const brandLogos = Array.from({ length: 17 }, (_, i) => `/brand-logos/logo-${i + 1}.png`)

const services = [
  {
    id: 1,
    title: 'Interiorismo',
    image: '/interiorismo.jpg',
    overlayColor: 'rgba(158, 151, 107, 0.67)',
    hoverColor: 'rgba(255, 246, 193, 0.67)',
    description: 'Enfocado en brindar soluciones que anticipen las necesidades del usuario y crear experiencias a su medida.',
    descColor: '#5A5538',
  },
  {
    id: 2,
    title: 'Mobiliario',
    image: '/mobiliario.jpg',
    overlayColor: 'rgba(219, 143, 131, 0.67)',
    hoverColor: 'rgba(255, 210, 202, 0.75)',
    description: 'Productos diseñados desde la ergonomía consciente con la intención de mejorar el bienestar cotidiano.',
    descColor: '#75443C',
  },
]

function Servicios() {
  const [currentLogo, setCurrentLogo] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % brandLogos.length)
    }, 2500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="servicios">
      <div className="container">
        <h1 className="servicios__title">Servicios</h1>

        <div className="servicios__grid">
          {services.map((service) => (
            <article key={service.id} className={`servicios__card${service.hoverColor ? ' servicios__card--has-hover' : ''}`}
              style={service.hoverColor ? { '--hover-color': service.hoverColor } : undefined}>
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
          <div className="clientes__carousel">
            {brandLogos.map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt={`Cliente ${i + 1}`}
                className={`clientes__carousel-logo${i === currentLogo ? ' clientes__carousel-logo--active' : ''}`}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Servicios
