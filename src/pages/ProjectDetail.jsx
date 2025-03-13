import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  Skeleton,
  Breadcrumbs,
  Link,
  Divider,
  Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextProject, setNextProject] = useState(null);
  
  useEffect(() => {
    // Simulando una llamada a API
    const fetchProjectData = () => {
      setLoading(true);
      
      // Datos de ejemplo, en una app real esto vendría de una API
      const projectsData = [
        {
          id: 1,
          title: 'Bouquet',
          category: 'diseño industrial',
          year: '2024',
          mentors: ['Henry Julier', 'Jorge Diego Etienne'],
          materials: ['Lámina de acero', 'Pintura'],
          description: 'Florero inspirado en la forma de un ramo de flores. El concepto surge de la complicada acción de cambiar el agua de un florero durante el paso de los días.',
          challenge: 'Diseñar un objeto que integre las necesidades básicas de las plantas con los elementos estéticos y funcionales de la vida cotidiana.',
          solution: 'Consta de dos partes removibles que pueden ser separadas para cambiar el agua con facilidad. Mientras que la parte superior puede ser puesta sobre la mesa a la vez que sostiene cuidadosamente las flores, la parte inferior es llenada con agua para mantener las flores con vida.',
          designProcess: 'El ejercicio planteado consistía en la introspección de la relación personal con las plantas para el diseño y conceptualización de objetos como macetas, floreros o soportes para plantas.',
          awards: ['Exhibido en Wanted Design', 'Feria Internacional del Mueble Contemporáneo (ICFF)', 'Exhibición de los 25 años del Tec de Monterrey en Museo MARCO'],
          images: [
            '/src/images/bouquet.jpg',
            '/src/images/bouquet-1.jpg',
            '/src/images/bouquet-3.jpg',
            '/src/images/bouquet-4.jpg'
          ],
          color: '#646cff'
        },
        {
          id: 2,
          title: 'Peque-biz',
          category: 'diseño industrial',
          year: '2025',
          mentors: ['José de la O'],
          materials: ['Madera de abeto', 'Varilla de acero'],
          description: 'Familia de productos de cocina desarrollados para niños que padecen discapacidad visual y que busca introducirlos, por medio de sus formas, de una manera más fácil y sencilla a actividades "comunes", como lo puede ser el cocinar.',
          challenge: 'Responder a la poca disponibilidad de productos de cocina desarrollados para personas con discapacidad visual.',
          solution: 'Serie de utensilios con formas inspiradas en la biznaga, que facilitan el desarrollo de las habilidades motrices y generan cierto grado de independencia.',
          designProcess: 'La metáfora que inspiró este proyecto es la biznaga de yeso, una variante de la planta endémica del norte de México que recientemente se encontró en peligro de extinción.',
          awards: ['Seleccionado para exhibición en Milano Design Week y Salone Satellite 2025'],
          images: [
            '/src/images/peque-biz-1.jpg',
            '/src/images/peque-biz-2.jpg',
            '/src/images/peque-biz-3.jpg'
          ],
          color: '#90EE90'
        },
        {
          id: 3,
          title: 'Bettercepillo limpiador',
          category: 'diseño industrial',
          year: '2024',
          mentors: ['Betterware Design Lab'],
          materials: ['Polipropileno', 'TPR', 'Nylon'],
          description: 'Complemento para el fregadero con multifunción, que puede ser utilizado para lavar trastes, e incluso el fregadero, con su cabeza de limpieza, y su vez despegar la comida de los mismos al tallarlos con su espátula.',
          challenge: 'Identificar aquellos problemas o "dolores de cabeza" que toman lugar al momento de lavar los trastes.',
          solution: 'Producto 2 en 1 que ayuda a solucionar de manera práctica una problemática recurrente en muchos hogares.',
          designProcess: 'Después de un proceso de investigación, se hicieron notar dos de los problemas más comunes: el fregadero queda sucio después de lavar los trastes, así como también es difícil despegar la comida de los mismos al lavarlos.',
          awards: ['Diseño destacado del Reto Betterware Design Lab 2024'],
          images: [
            '/src/images/bettercepillo-1.jpg',
            '/src/images/bettercepillo-2.jpg'
          ],
          color: '#4682B4'
        },
        {
          id: 4,
          title: 'Bonaterra',
          category: 'diseño industrial',
          year: '2023',
          mentors: ['Emiliano Godoy'],
          materials: ['MDF laminado', 'Cubrecantos'],
          description: 'Familia de mobiliario que busca adaptarse a lugares en donde el espacio sea reducido o simplemente se quiera agregar muebles compactos pero eficientes.',
          challenge: 'Satisfacer las necesidades de estudiantes que requieran de espacios de concentración y estudio personal.',
          solution: 'Mobiliario con formas y colores cómodas a la vista que aprovecha al máximo el espacio.',
          designProcess: 'El concepto surge a partir de idea de satisfacer las necesidades de nuestro público objetivo, los cuales son estudiantes que requieran de espacios de concentración y estudio personal.',
          awards: [],
          images: [
            '/src/images/bonaterra-1.jpg',
            '/src/images/bonaterra-2.jpg'
          ],
          color: '#8BC34A'
        }
      ];
      
      // Encontrar el proyecto actual
      const projectData = projectsData.find(p => p.id === parseInt(id));
      
      // Encontrar el siguiente proyecto para navegación
      const currentIndex = projectsData.findIndex(p => p.id === parseInt(id));
      const nextIndex = (currentIndex + 1) % projectsData.length;
      const nextProjectData = projectsData[nextIndex];
      
      // Simular tiempo de carga
      setTimeout(() => {
        if (projectData) {
          setProject(projectData);
          setNextProject(nextProjectData);
        }
        setLoading(false);
      }, 800);
    };
    
    fetchProjectData();
  }, [id]);
  
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
        <Skeleton variant="text" width={200} height={30} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={60} sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" width="100%" height={400} sx={{ mb: 4 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="text" width="30%" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="100%" height={120} sx={{ mb: 4 }} />
            <Skeleton variant="text" width="30%" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="100%" height={120} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  if (!project) {
    return (
      <Container maxWidth="lg" sx={{ pt: 12, pb: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Proyecto no encontrado
        </Typography>
        <Typography variant="body1" paragraph>
          Lo sentimos, el proyecto que estás buscando no existe o ha sido movido.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{
            mt: 2,
            bgcolor: 'text.primary',
            color: 'background.paper',
            '&:hover': {
              bgcolor: 'text.secondary'
            }
          }}
        >
          Volver al inicio
        </Button>
      </Container>
    );
  }
  
  return (
    <Box sx={{ pt: 10 }}>
      {/* Breadcrumbs navigation */}
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" component={RouterLink} to="/">
            Inicio
          </Link>
          <Link underline="hover" color="inherit" component={RouterLink} to="/#projects">
            Proyectos
          </Link>
          <Typography color="text.primary">{project.title}</Typography>
        </Breadcrumbs>
      </Container>
      
      {/* Hero section */}
      <Box
        sx={{
          bgcolor: 'grey.100',
          py: 5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Button
            component={RouterLink}
            to="/"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 3, color: 'text.secondary' }}
          >
            Volver a proyectos
          </Button>
          
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            {project.title}
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Chip
              label={project.category}
              sx={{
                mr: 1,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider'
              }}
            />
            <Chip
              label={project.year}
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider'
              }}
            />
          </Box>
          
          <Typography variant="body1" paragraph sx={{ maxWidth: 800 }}>
            {project.description}
          </Typography>
        </Container>
      </Box>
      
      {/* Main content */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={6}>
          {/* Left column - Main image and details */}
          <Grid item xs={12} md={8}>
            <Box
              component="img"
              src={project.images[0]}
              alt={project.title}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 600,
                objectFit: 'cover',
                mb: 4,
                boxShadow: 3
              }}
            />
            
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                fontFamily: "'Playfair Display', serif",
                position: 'relative',
                pb: 2,
                mb: 3,
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: 60,
                  height: 2,
                  bgcolor: 'text.primary'
                }
              }}
            >
              El Desafío
            </Typography>
            <Typography variant="body1" paragraph>
              {project.challenge}
            </Typography>
            
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                fontFamily: "'Playfair Display', serif",
                position: 'relative',
                pb: 2,
                mb: 3,
                mt: 5,
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: 60,
                  height: 2,
                  bgcolor: 'text.primary'
                }
              }}
            >
              El Proceso
            </Typography>
            <Typography variant="body1" paragraph>
              {project.designProcess}
            </Typography>
            
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                fontFamily: "'Playfair Display', serif",
                position: 'relative',
                pb: 2,
                mb: 3,
                mt: 5,
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: 60,
                  height: 2,
                  bgcolor: 'text.primary'
                }
              }}
            >
              La Solución
            </Typography>
            <Typography variant="body1" paragraph>
              {project.solution}
            </Typography>
            
            {/* Gallery */}
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                fontFamily: "'Playfair Display', serif",
                position: 'relative',
                pb: 2,
                mb: 3,
                mt: 6,
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: 60,
                  height: 2,
                  bgcolor: 'text.primary'
                }
              }}
            >
              Galería
            </Typography>
            
            <Grid container spacing={2}>
              {project.images.slice(1).map((image, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box
                    component="img"
                    src={image}
                    alt={`${project.title} - Imagen ${index + 2}`}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      boxShadow: 2
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          
          {/* Right column - Project info */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', mb: 4 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  pb: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  mb: 3
                }}
              >
                Detalles del Proyecto
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Categoría
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.category}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Año
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.year}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Mentores
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.mentors.join(', ')}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Materiales
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.materials.join(', ')}
                </Typography>
              </Box>
              
              {project.awards.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Reconocimientos
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {project.awards.map((award, index) => (
                      <Typography component="li" variant="body2" color="text.secondary" key={index}>
                        {award}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}
            </Paper>
            
            {/* Contacto CTAs */}
            <Paper elevation={0} sx={{ p: 3, bgcolor: 'text.primary', color: 'background.paper', mb: 4 }}>
              <Typography variant="h6" gutterBottom fontFamily="'Playfair Display', serif">
                ¿Te interesa mi trabajo?
              </Typography>
              <Typography variant="body2" paragraph>
                Contáctame para hablar sobre posibles colaboraciones o proyectos similares.
              </Typography>
              <Button 
                variant="outlined" 
                component={RouterLink} 
                to="/contact"
                fullWidth
                sx={{
                  color: 'background.paper',
                  borderColor: 'background.paper',
                  '&:hover': {
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    borderColor: 'background.paper'
                  }
                }}
              >
                Contactar
              </Button>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Project navigation */}
        <Divider sx={{ my: 6 }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2
          }}
        >
          <Button
            component={RouterLink}
            to="/"
            startIcon={<ArrowBackIcon />}
            sx={{ color: 'text.primary' }}
          >
            Todos los proyectos
          </Button>
          
          <Button
            component={RouterLink}
            to={`/project/${nextProject.id}`}
            endIcon={<ArrowForwardIcon />}
            variant="outlined"
            sx={{
              borderColor: 'text.primary',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'text.primary',
                color: 'background.paper'
              }
            }}
          >
            Siguiente proyecto: {nextProject.title}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectDetail;