import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './styles/theme';
import { ProjectProvider } from './context/ProjectContext';

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
import Admin from './pages/Admin'; // Nueva página de administración

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProjectProvider>
        <Navbar />
        <main>
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