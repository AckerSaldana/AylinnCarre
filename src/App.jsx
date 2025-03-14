// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import theme from './styles/theme';
import { ProjectProvider } from './context/ProjectContext';
import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';

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
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [prevLocation, setPrevLocation] = useState('');

  // Manejar la carga inicial de la aplicación
  useEffect(() => {
    // Simular tiempo de carga o esperar a que se carguen recursos importantes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Ajusta este tiempo según necesites

    return () => clearTimeout(timer);
  }, []);

  // Manejar transiciones entre páginas
  useEffect(() => {
    // Si es la carga inicial, no hacer nada
    if (prevLocation === '') {
      setPrevLocation(location.pathname);
      return;
    }

    // Si cambia la página, mostrar una animación de carga
    if (location.pathname !== prevLocation) {
      setPageLoading(true);
      
      // Simular tiempo de carga entre páginas (puedes quitar esto si prefieres transiciones instantáneas)
      const timer = setTimeout(() => {
        setPageLoading(false);
        setPrevLocation(location.pathname);
        
        // Hacer scroll al inicio de la página
        window.scrollTo(0, 0);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [location, prevLocation]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Pantalla de carga inicial */}
      {loading && <LoadingScreen message="Cargando portafolio..." />}
      
      <ProjectProvider>
        <Navbar />
        <Box 
          component="main" 
          sx={{ 
            opacity: loading ? 0 : 1, 
            transition: 'opacity 0.5s ease-in-out',
            minHeight: '100vh',
            position: 'relative'
          }}
        >
          {/* Pantalla de carga entre páginas */}
          {pageLoading && (
            <Box 
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '3px',
                backgroundColor: 'transparent',
                zIndex: 9999,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '25%',
                  backgroundColor: theme.palette.primary.main,
                  animation: 'loading 1.5s infinite ease-in-out',
                }
              }}
            />
          )}
          
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <PageTransition>
                  <Home />
                </PageTransition>
              } />
              <Route path="/project/:id" element={
                <PageTransition>
                  <ProjectDetail />
                </PageTransition>
              } />
              <Route path="/about" element={
                <PageTransition>
                  <About />
                </PageTransition>
              } />
              <Route path="/resume" element={
                <PageTransition>
                  <Resume />
                </PageTransition>
              } />
              <Route path="/contact" element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              } />
              <Route path="/admin" element={
                <PageTransition>
                  <Admin />
                </PageTransition>
              } />
              <Route path="*" element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              } />
            </Routes>
          </AnimatePresence>
        </Box>
        <Footer />
      </ProjectProvider>
      
      {/* Estilos globales para la animación de carga */}
      <style jsx global>{`
        @keyframes loading {
          0% {
            left: 0;
            transform: translateX(-100%);
          }
          100% {
            left: 100%;
            transform: translateX(0);
          }
        }
      `}</style>
    </ThemeProvider>
  );
}

export default App;