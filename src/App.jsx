// src/App.jsx - actualización
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './styles/theme';
import { ProjectProvider } from './context/ProjectContext';
import LoadingScreen from './components/LoadingScreen'; // Importar componente

// Componentes de Layout
import Navbar from './layout/NavBar';
import Footer from './layout/Footer';

// Páginas
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga o esperar a que se carguen recursos importantes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Ajusta este tiempo según necesites

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Pantalla de carga */}
      {loading && <LoadingScreen message="Cargando portafolio..." />}
      
      <ProjectProvider>
        <Navbar />
        <main style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </ProjectProvider>
    </ThemeProvider>
  );
}

export default App;