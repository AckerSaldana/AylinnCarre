import { Outlet, ScrollRestoration } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <div className="app">
      <ScrollRestoration />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
