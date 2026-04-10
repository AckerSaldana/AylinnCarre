import './Nosotros.css'

const team = [
  { name: 'Ximena Lara', initials: 'XL' },
  { name: 'Ariadne Tapia', initials: 'AT' },
  { name: 'Aylinn Carré', initials: 'AC' },
]

function Nosotros() {
  return (
    <div className="nosotros">
      <div className="container">
        <h1 className="nosotros__title">¿Quienes somos?</h1>

        <div className="nosotros__info">
          <div className="nosotros__block">
            <h2 className="nosotros__subtitle">Misión</h2>
            <p className="nosotros__text">
              Somos un estudio de diseño multidisciplinario especializado en la
              conceptualización y elaboración de mobiliario e interiorismo con
              propósito.
            </p>
          </div>

          <div className="nosotros__block">
            <h2 className="nosotros__subtitle">Visión</h2>
            <p className="nosotros__text">
              Innovar y transformar la industria del interiorismo residencial y
              comercial en México.
            </p>
          </div>
        </div>

        <section className="team">
          <h2 className="team__title">The team</h2>
          <div className="team__grid">
            {team.map((member) => (
              <div key={member.name} className="team__member">
                <div className="team__photo">
                  <span className="team__initials">{member.initials}</span>
                </div>
                <p className="team__name">{member.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Nosotros
