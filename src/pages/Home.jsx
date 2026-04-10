import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <h1 className="hero__title">
            <span className="hero__letter">X</span>
            <span className="hero__letter">Y</span>
            <span className="hero__letter">R</span>
            <span className="hero__letter">I</span>
            <span className="hero__letter">N</span>
          </h1>
        </div>
      </section>

      <section className="tagline">
        <div className="tagline__content">
          <div className="tagline__divider" />
          <p className="tagline__text">
            En XYRIN convertimos conceptos en experiencias
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home
