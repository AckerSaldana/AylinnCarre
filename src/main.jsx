import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/global.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Portafolio from './pages/Portafolio.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Servicios from './pages/Servicios.jsx'
import Contacto from './pages/Contacto.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'portafolio', Component: Portafolio },
      { path: 'portafolio/:slug', Component: ProjectDetail },
      { path: 'nosotros', Component: Nosotros },
      { path: 'servicios', Component: Servicios },
      { path: 'contacto', Component: Contacto },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
