// src/App.jsx
import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import theme from './styles/theme';
import { ProjectProvider } from './context/ProjectContext';
import { ProfileProvider } from './context/ProfileContext';
import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';
import CustomCursor from './components/CustomCursor';
import './App.css';

// Componentes de Layout
import Navbar from './layout/NavBar';
import Footer from './layout/Footer';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const About = lazy(() => import('./pages/About'));
const Resume = lazy(() => import('./pages/Resume'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Admin = lazy(() => import('./pages/Admin'));

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [prevLocation, setPrevLocation] = useState('');

  // Manejar la carga inicial de la aplicación
  useEffect(() => {
    // Mostrar el loading screen el tiempo suficiente para ver la animación
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 segundos para ver toda la animación completa

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
      
      // Transición rápida entre páginas
      const timer = setTimeout(() => {
        setPageLoading(false);
        setPrevLocation(location.pathname);
        
        // Hacer scroll suave al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100); // Más rápido
      
      return () => clearTimeout(timer);
    }
  }, [location, prevLocation]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Only show custom cursor on desktop */}
      {typeof window !== 'undefined' && !('ontouchstart' in window) && <CustomCursor />}
      
      {/* Pantalla de carga inicial */}
      {loading && <LoadingScreen message="Cargando portafolio..." />}
      
      <ProfileProvider>
        <ProjectProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
          <Box 
            component="main" 
            sx={{ 
              opacity: loading ? 0 : 1, 
              transition: 'opacity 0.5s ease-in-out',
              position: 'relative',
              flex: 1
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
            <Suspense fallback={<LoadingScreen />}>
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
            </Suspense>
          </AnimatePresence>
          </Box>
            <Footer />
          </Box>
        </ProjectProvider>
      </ProfileProvider>
      
    </ThemeProvider>
  );
}

export default App;