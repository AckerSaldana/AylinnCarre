import { useEffect, useRef, useState } from 'react'
import './Nosotros.css'

const team = [
  {
    name: 'Ximena Rivera',
    photo: '/team/ximena.jpg',
    instagram: '@anemixrl',
    role: 'Diseñadora de producto',
    focus: 'Enfoque en procesos\nde manufactura y calidad',
  },
  {
    name: 'Ariadne Tapia',
    photo: '/team/ariadne.jpg',
    instagram: '@ariadne.eee',
    role: 'Diseñadora de producto',
    focus: 'Enfoque en\nCAD y renderización',
  },
  {
    name: 'Aylinn Carré',
    photo: '/team/aylinn.jpg',
    instagram: '@itslynncarre',
    role: 'Diseñadora de producto',
    focus: 'Enfoque en\ndiseño visual y UX/UI',
  },
]

function Nosotros() {
  const [step, setStep] = useState(0)
  const valuesRef = useRef(null)

  useEffect(() => {
    const el = valuesRef.current
    if (!el) return
    let timers = []

    const runSequence = () => {
      setStep(0)
      let i = 0
      const run = () => {
        i++
        setStep(i)
        if (i < 5) {
          timers.push(setTimeout(run, 700))
        } else {
          // Hold for 3s then restart
          timers.push(setTimeout(runSequence, 3000))
        }
      }
      timers.push(setTimeout(run, 300))
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runSequence()
          obs.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

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

        <div ref={valuesRef} className="values">
          <p className="values__text">
            <span className={`values__word${step >= 1 ? ' values__word--visible' : ''}`}>Humanos</span>
            <span className={`values__plus${step >= 2 ? ' values__plus--visible' : ''}`}>&nbsp;+&nbsp;</span>
            <span className={`values__word${step >= 3 ? ' values__word--visible' : ''}`}>Innovadores</span>
            <span className={`values__plus${step >= 4 ? ' values__plus--visible' : ''}`}>&nbsp;+&nbsp;</span>
            <span className={`values__word${step >= 5 ? ' values__word--visible' : ''}`}>Conscientes</span>
          </p>
        </div>

        <section className="team">
          <h2 className="team__title">Nosotras</h2>
          <div className="team__grid">
            {team.map((member) => (
              <div key={member.name} className="team__member">
                <div className="team__photo">
                  <img src={member.photo} alt={member.name} />
                  <div className="team__overlay">
                    <span className="team__instagram">{member.instagram}</span>
                  </div>
                </div>
                <h3 className="team__name">{member.name}</h3>
                <p className="team__role">{member.role}</p>
                <p className="team__focus">{member.focus}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Nosotros
