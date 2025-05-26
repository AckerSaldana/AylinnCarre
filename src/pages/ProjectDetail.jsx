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
import ContentLoader, { ProjectDetailSkeleton } from '../components/ContentLoader';

// Import Google Fonts
import '@fontsource/permanent-marker';
import '@fontsource/kalam/300.css';
import '@fontsource/kalam/400.css';
import '@fontsource/kalam/700.css';
import '@fontsource/caveat/400.css';
import '@fontsource/caveat/700.css';

// Sketchy border component
const SketchyBorder = React.memo(({ children, sx = {} }) => {
  const path1 = React.useMemo(() => 
    `M ${0.5 + Math.random() * 0.5} ${0.5 + Math.random() * 0.5} 
     L ${99 + Math.random() * 0.5} ${0.3 + Math.random() * 0.5} 
     L ${99.2 + Math.random() * 0.5} ${99 + Math.random() * 0.5} 
     L ${0.3 + Math.random() * 0.5} ${99.2 + Math.random() * 0.5} 
     Z`, []
  );
  
  const path2 = React.useMemo(() =>
    `M ${0.3 + Math.random() * 0.3} ${0.3 + Math.random() * 0.3} 
     L ${99.3 + Math.random() * 0.3} ${0.5 + Math.random() * 0.3} 
     L ${99.1 + Math.random() * 0.3} ${99.3 + Math.random() * 0.3} 
     L ${0.5 + Math.random() * 0.3} ${99.1 + Math.random() * 0.3} 
     Z`, []
  );

  return (
    <Box sx={{ position: 'relative', ...sx }}>
      {children}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        '& svg': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible'
        }
      }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={path1}
            fill="none"
            stroke="#444"
            strokeWidth="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={path2}
            fill="none"
            stroke="#555"
            strokeWidth="0.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </Box>
    </Box>
  );
});

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
      <Box sx={{ 
        bgcolor: '#FAFAFA',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            repeating-linear-gradient(0deg, 
              transparent, 
              transparent 39px, 
              rgba(0,0,0,0.03) 39px, 
              rgba(0,0,0,0.03) 40px
            ),
            repeating-linear-gradient(90deg, 
              transparent, 
              transparent 39px, 
              rgba(0,0,0,0.03) 39px, 
              rgba(0,0,0,0.03) 40px
            )
          `,
          pointerEvents: 'none'
        }
      }}>
        <Container maxWidth="lg" sx={{ pt: 10, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ProjectDetailSkeleton />
        </Container>
      </Box>
    );
  }
  
  if (error || !project) {
    return (
      <Box sx={{ 
        bgcolor: '#FAFAFA',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            repeating-linear-gradient(0deg, 
              transparent, 
              transparent 39px, 
              rgba(0,0,0,0.03) 39px, 
              rgba(0,0,0,0.03) 40px
            ),
            repeating-linear-gradient(90deg, 
              transparent, 
              transparent 39px, 
              rgba(0,0,0,0.03) 39px, 
              rgba(0,0,0,0.03) 40px
            )
          `,
          pointerEvents: 'none'
        }
      }}>
      <Container maxWidth="lg" sx={{ pt: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
        <Alert severity="error" sx={{ 
          mb: 4,
          fontFamily: '"Kalam", cursive',
          '& .MuiAlert-message': {
            fontFamily: '"Kalam", cursive',
          }
        }}>
          {error || "Proyecto no encontrado"}
        </Alert>
        <Typography variant="h4" component="h1" gutterBottom sx={{
          fontFamily: '"Permanent Marker", cursive',
          fontWeight: 400,
          fontSize: { xs: '2rem', md: '2.5rem' },
          color: '#1a1a1a',
          transform: 'rotate(-0.5deg)'
        }}>
          Proyecto no encontrado
        </Typography>
        <Typography variant="body1" paragraph sx={{
          fontFamily: '"Kalam", cursive',
          fontSize: '1.1rem',
          color: '#444'
        }}>
          Lo sentimos, el proyecto que estás buscando no existe o ha sido movido.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{
            mt: 2,
            bgcolor: '#333',
            color: '#fff',
            borderRadius: '3px',
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            fontFamily: '"Kalam", cursive',
            boxShadow: 'none',
            position: 'relative',
            transform: 'rotate(0.2deg)',
            border: '2px solid #333',
            '&:hover': {
              bgcolor: '#222',
              borderColor: '#222',
              boxShadow: 'none'
            }
          }}
        >
          Volver al inicio
        </Button>
      </Container>
      </Box>
    );
  }
  
  return (
    <Box sx={{ 
      bgcolor: '#FAFAFA',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px',
        pointerEvents: 'none'
      }
    }}>
      {/* Breadcrumbs navigation */}
      <Container maxWidth="lg" sx={{ pt: 8, pb: 2 }}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" sx={{ color: '#666' }} />} 
          aria-label="breadcrumb"
          sx={{ 
            '& .MuiBreadcrumbs-li': {
              fontFamily: '"Kalam", cursive'
            }
          }}
        >
          <Link 
            underline="hover" 
            color="inherit" 
            component={RouterLink} 
            to="/"
            sx={{ 
              fontFamily: '"Kalam", cursive',
              color: '#666',
              '&:hover': {
                color: '#333'
              }
            }}
          >
            Inicio
          </Link>
          <Link 
            underline="hover" 
            color="inherit" 
            component={RouterLink} 
            to="/#projects"
            sx={{ 
              fontFamily: '"Kalam", cursive',
              color: '#666',
              '&:hover': {
                color: '#333'
              }
            }}
          >
            Proyectos
          </Link>
          <Typography 
            color="text.primary"
            sx={{ 
              fontFamily: '"Kalam", cursive',
              fontWeight: 700
            }}
          >
            {project.title}
          </Typography>
        </Breadcrumbs>
      </Container>
      
      {/* Hero section */}
      <Box
        sx={{
          py: 5,
          mb: 6,
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <Button
            component={RouterLink}
            to="/"
            startIcon={<ArrowBackIcon />}
            sx={{ 
              mb: 3, 
              color: '#666',
              fontFamily: '"Kalam", cursive',
              textTransform: 'none',
              '&:hover': {
                color: '#333',
                bgcolor: 'transparent'
              }
            }}
          >
            Volver a proyectos
          </Button>
          
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: '"Permanent Marker", cursive',
              fontWeight: 400,
              fontSize: { xs: '2.5rem', md: '4rem' },
              color: '#1a1a1a',
              transform: 'rotate(-0.5deg)',
              textShadow: '2px 2px 0px rgba(0,0,0,0.05)',
              mb: 4
            }}
          >
            {project.title}
          </Typography>
          
          <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ 
              display: 'inline-block',
              px: 2,
              py: 0.5,
              bgcolor: 'transparent',
              border: '1.5px solid #444',
              borderRadius: '2px',
              transform: 'rotate(-0.3deg)'
            }}>
              <Typography sx={{ 
                fontFamily: '"Caveat", cursive',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#333'
              }}>
                {project.category}
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'inline-block',
              px: 2,
              py: 0.5,
              bgcolor: '#333',
              color: '#fff',
              borderRadius: '2px',
              transform: 'rotate(0.3deg)'
            }}>
              <Typography sx={{ 
                fontFamily: '"Caveat", cursive',
                fontWeight: 700,
                fontSize: '1rem'
              }}>
                {project.year}
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="body1" paragraph sx={{ 
            maxWidth: 800,
            fontFamily: '"Kalam", cursive',
            fontSize: '1.15rem',
            lineHeight: 1.8,
            color: '#444',
            fontWeight: 400
          }}>
            {project.description}
          </Typography>
        </Container>
      </Box>
      
      {/* Main content */}
      <Container maxWidth="lg" sx={{ mb: 4, flex: 1, pb: 4 }}>
        <Grid container spacing={6}>
          {/* Left column - Main image and details */}
          <Grid item xs={12} md={8}>
            <SketchyBorder sx={{ mb: 4, display: 'inline-block', width: '100%' }}>
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
                  display: 'block'
                }}
              />
            </SketchyBorder>
            
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  fontFamily: '"Permanent Marker", cursive',
                  fontWeight: 400,
                  fontSize: '1.8rem',
                  color: '#1a1a1a',
                  transform: 'rotate(-0.3deg)',
                  mb: 1
                }}
              >
                El Desafío
              </Typography>
              <Box>
                <svg width="100" height="20" style={{ overflow: 'visible' }}>
                  <path
                    d="M 10 8 Q 60 6, 120 8 T 240 8"
                    stroke="#444"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </svg>
              </Box>
            </Box>
            <Typography variant="body1" paragraph sx={{
              fontFamily: '"Kalam", cursive',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#444',
              fontWeight: 400
            }}>
              {project.challenge || "No hay información disponible sobre el desafío de este proyecto."}
            </Typography>
            
            <Box sx={{ mt: 5, mb: 3 }}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  fontFamily: '"Permanent Marker", cursive',
                  fontWeight: 400,
                  fontSize: '1.8rem',
                  color: '#1a1a1a',
                  transform: 'rotate(0.4deg)',
                  mb: 1
                }}
              >
                El Proceso
              </Typography>
              <Box>
                <svg width="100" height="20" style={{ overflow: 'visible' }}>
                  <path
                    d="M 10 8 Q 60 6, 120 8 T 240 8"
                    stroke="#444"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </svg>
              </Box>
            </Box>
            <Typography variant="body1" paragraph sx={{
              fontFamily: '"Kalam", cursive',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#444',
              fontWeight: 400
            }}>
              {project.designProcess || "No hay información disponible sobre el proceso de diseño de este proyecto."}
            </Typography>
            
            <Box sx={{ mt: 5, mb: 3 }}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  fontFamily: '"Permanent Marker", cursive',
                  fontWeight: 400,
                  fontSize: '1.8rem',
                  color: '#1a1a1a',
                  transform: 'rotate(-0.2deg)',
                  mb: 1
                }}
              >
                La Solución
              </Typography>
              <Box>
                <svg width="100" height="20" style={{ overflow: 'visible' }}>
                  <path
                    d="M 10 8 Q 60 6, 120 8 T 240 8"
                    stroke="#444"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </svg>
              </Box>
            </Box>
            <Typography variant="body1" paragraph sx={{
              fontFamily: '"Kalam", cursive',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#444',
              fontWeight: 400
            }}>
              {project.solution || "No hay información disponible sobre la solución de este proyecto."}
            </Typography>
            
            {/* Gallery */}
            {project.images && project.images.length > 1 && (
              <>
                <Box sx={{ mt: 6, mb: 3 }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontFamily: '"Permanent Marker", cursive',
                      fontWeight: 400,
                      fontSize: '1.8rem',
                      color: '#1a1a1a',
                      transform: 'rotate(0.3deg)',
                      mb: 1
                    }}
                  >
                    Galería
                  </Typography>
                  <Box>
                    <svg width="100" height="20" style={{ overflow: 'visible' }}>
                      <path
                        d="M 10 10 Q 50 8, 100 10 T 190 10 T 290 10"
                        stroke="#444"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.7"
                      />
                    </svg>
                  </Box>
                </Box>
                
                <Grid container spacing={2}>
                  {project.images.slice(1).map((image, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <SketchyBorder sx={{ 
                        transform: `rotate(${-0.8 + (index % 2 === 0 ? 0.8 : -0.8)}deg)`,
                        backgroundImage: `
                          repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 20px,
                            rgba(0,0,0,0.01) 20px,
                            rgba(0,0,0,0.01) 21px
                          ),
                          repeating-linear-gradient(
                            -45deg,
                            transparent,
                            transparent 20px,
                            rgba(0,0,0,0.01) 20px,
                            rgba(0,0,0,0.01) 21px
                          )
                        `,
                        bgcolor: '#fff'
                      }}>
                        <LazyImage
                          src={image}
                          alt={`${project.title} - Imagen ${index + 2}`}
                          sx={{
                            width: '100%',
                            height: 'auto',
                            aspectRatio: '4/3',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                      </SketchyBorder>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Grid>
          
          {/* Right column - Project info */}
          <Grid item xs={12} md={4}>
            <SketchyBorder sx={{ 
              p: 3, 
              bgcolor: '#fff', 
              mb: 4,
              transform: 'rotate(-0.3deg)',
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 20px,
                  rgba(0,0,0,0.01) 20px,
                  rgba(0,0,0,0.01) 21px
                ),
                repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 20px,
                  rgba(0,0,0,0.01) 20px,
                  rgba(0,0,0,0.01) 21px
                )
              `
            }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: '"Permanent Marker", cursive',
                  fontWeight: 400,
                  fontSize: '1.4rem',
                  pb: 2,
                  mb: 3,
                  color: '#1a1a1a',
                  transform: 'rotate(-0.2deg)',
                  borderBottom: '2px solid #333'
                }}
              >
                Detalles del Proyecto
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{
                  fontFamily: '"Kalam", cursive',
                  fontWeight: 700,
                  color: '#333',
                  fontSize: '1.1rem',
                  transform: 'rotate(-0.2deg)'
                }}>
                  Categoría
                </Typography>
                <Typography variant="body2" paragraph sx={{
                  fontFamily: '"Kalam", cursive',
                  color: '#666',
                  fontSize: '1rem'
                }}>
                  {project.category}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{
                  fontFamily: '"Kalam", cursive',
                  fontWeight: 700,
                  color: '#333',
                  fontSize: '1.1rem',
                  transform: 'rotate(0.3deg)'
                }}>
                  Año
                </Typography>
                <Typography variant="body2" paragraph sx={{
                  fontFamily: '"Kalam", cursive',
                  color: '#666',
                  fontSize: '1rem'
                }}>
                  {project.year}
                </Typography>
              </Box>
              
              {project.mentors && project.mentors.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{
                    fontFamily: '"Kalam", cursive',
                    fontWeight: 700,
                    color: '#333',
                    fontSize: '1.1rem',
                    transform: 'rotate(-0.3deg)'
                  }}>
                    Mentores
                  </Typography>
                  <Typography variant="body2" paragraph sx={{
                    fontFamily: '"Kalam", cursive',
                    color: '#666',
                    fontSize: '1rem'
                  }}>
                    {project.mentors.join(', ')}
                  </Typography>
                </Box>
              )}
              
              {project.materials && project.materials.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{
                    fontFamily: '"Kalam", cursive',
                    fontWeight: 700,
                    color: '#333',
                    fontSize: '1.1rem',
                    transform: 'rotate(0.2deg)'
                  }}>
                    Materiales
                  </Typography>
                  <Typography variant="body2" paragraph sx={{
                    fontFamily: '"Kalam", cursive',
                    color: '#666',
                    fontSize: '1rem'
                  }}>
                    {project.materials.join(', ')}
                  </Typography>
                </Box>
              )}
              
              {project.awards && project.awards.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{
                    fontFamily: '"Kalam", cursive',
                    fontWeight: 700,
                    color: '#333',
                    fontSize: '1.1rem',
                    transform: 'rotate(-0.2deg)'
                  }}>
                    Reconocimientos
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {project.awards.map((award, index) => (
                      <Typography component="li" variant="body2" key={index} sx={{
                        fontFamily: '"Kalam", cursive',
                        color: '#666',
                        fontSize: '1rem'
                      }}>
                        {award}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}
            </SketchyBorder>
            
            {/* Contacto CTAs */}
            <SketchyBorder sx={{ 
              p: 3, 
              bgcolor: '#333', 
              color: '#fff', 
              mb: 4,
              transform: 'rotate(0.4deg)'
            }}>
              <Typography variant="h6" gutterBottom sx={{
                fontFamily: '"Permanent Marker", cursive',
                fontWeight: 400,
                fontSize: '1.3rem',
                transform: 'rotate(-0.3deg)'
              }}>
                ¿Te interesa mi trabajo?
              </Typography>
              <Typography variant="body2" paragraph sx={{
                fontFamily: '"Kalam", cursive',
                fontSize: '1rem',
                lineHeight: 1.6
              }}>
                Contáctame para hablar sobre posibles colaboraciones o proyectos similares.
              </Typography>
              <Button 
                variant="outlined" 
                component={RouterLink} 
                to="/contact"
                fullWidth
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  borderWidth: '2px',
                  borderRadius: '3px',
                  fontFamily: '"Kalam", cursive',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  py: 1.5,
                  transform: 'rotate(-0.2deg)',
                  '&:hover': {
                    bgcolor: '#fff',
                    color: '#333',
                    borderColor: '#fff'
                  }
                }}
              >
                Contactar
              </Button>
            </SketchyBorder>
          </Grid>
        </Grid>
        
        {/* Project navigation */}
        {nextProject && (
          <>
            <Box sx={{ 
              my: 6,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <svg width="300" height="20" style={{ overflow: 'visible' }}>
                <path
                  d="M 5 10 Q 30 8, 60 10 T 120 10 T 180 10 T 240 10 T 295 10"
                  stroke="#666"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </svg>
            </Box>
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
                sx={{ 
                  color: '#333',
                  fontFamily: '"Kalam", cursive',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: '#000'
                  }
                }}
              >
                Todos los proyectos
              </Button>
              
              <Button
                component={RouterLink}
                to={`/project/${nextProject.id}`}
                endIcon={<ArrowForwardIcon />}
                variant="outlined"
                sx={{
                  borderColor: '#333',
                  borderWidth: '2px',
                  borderRadius: '3px',
                  color: '#333',
                  fontFamily: '"Kalam", cursive',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  transform: 'rotate(-0.2deg)',
                  '&:hover': {
                    bgcolor: '#333',
                    color: '#fff',
                    borderColor: '#333'
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