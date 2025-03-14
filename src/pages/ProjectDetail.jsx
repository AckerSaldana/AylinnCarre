import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
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
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { getProjectById, getProjects } from '../firebase/projectService';
import LazyImage from '../components/LazyImage';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Resetear estado al cambiar el ID
    setProject(null);
    setLoading(true);
    setError(null);
    
    // Cargar los datos del proyecto
    fetchProjectData();
  }, [id]);
  
  const fetchProjectData = async () => {
    try {
      // Cargar proyecto actual
      const projectData = await getProjectById(id);
      
      if (!projectData) {
        setError("Proyecto no encontrado");
        setLoading(false);
        return;
      }
      
      setProject(projectData);
      
      // Cargar todos los proyectos para determinar el siguiente
      const allProjects = await getProjects();
      
      if (allProjects.length > 1) {
        const currentIndex = allProjects.findIndex(p => p.id === id);
        const nextIndex = (currentIndex + 1) % allProjects.length;
        setNextProject(allProjects[nextIndex]);
      }
      
      setError(null);
    } catch (err) {
      console.error("Error fetching project: ", err);
      setError("Hubo un problema al cargar el proyecto. Por favor, intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ pt: 10 }}>
        <Container maxWidth="lg">
          <ProjectDetailSkeleton />
        </Container>
      </Box>
    );
  }
  
  if (error || !project) {
    return (
      <Container maxWidth="lg" sx={{ pt: 12, pb: 8, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error || "Proyecto no encontrado"}
        </Alert>
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
              fontFamily: '"DM Serif Display", serif',
              fontWeight: 400,
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
            <LazyImage
              src={project.images && project.images.length > 0 
                ? project.images[0] 
                : '/placeholder-image.jpg'
              }
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
                fontFamily: '"DM Serif Display", serif',
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
              {project.challenge || "No hay información disponible sobre el desafío de este proyecto."}
            </Typography>
            
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                fontFamily: '"DM Serif Display", serif',
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
              {project.designProcess || "No hay información disponible sobre el proceso de diseño de este proyecto."}
            </Typography>
            
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                fontFamily: '"DM Serif Display", serif',
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
              {project.solution || "No hay información disponible sobre la solución de este proyecto."}
            </Typography>
            
            {/* Gallery */}
            {project.images && project.images.length > 1 && (
              <>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontFamily: '"DM Serif Display", serif',
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
                      <LazyImage
                        src={image}
                        alt={`${project.title} - Imagen ${index + 2}`}
                        sx={{
                          width: '100%',
                          height: 'auto',
                          aspectRatio: '4/3',
                          objectFit: 'cover',
                          boxShadow: 2
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Grid>
          
          {/* Right column - Project info */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', mb: 4 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: '"DM Serif Display", serif',
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
              
              {project.mentors && project.mentors.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Mentores
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.mentors.join(', ')}
                  </Typography>
                </Box>
              )}
              
              {project.materials && project.materials.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Materiales
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.materials.join(', ')}
                  </Typography>
                </Box>
              )}
              
              {project.awards && project.awards.length > 0 && (
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
              <Typography variant="h6" gutterBottom fontFamily="'DM Serif Display', serif">
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
        {nextProject && (
          <>
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
          </>
        )}
      </Container>
    </Box>
  );
};

export default ProjectDetail;