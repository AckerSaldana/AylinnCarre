import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Button,
  Divider,
  Paper,
  Stack,
  Link,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  KeyboardArrowRight as ArrowIcon
} from '@mui/icons-material';
import { useProjects } from '../context/ProjectContext';
import LazyImage from '../components/LazyImage';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Usar el contexto de proyectos
  const { 
    categories, 
    loading, 
    error, 
    filterProjectsByCategory 
  } = useProjects();
  
  // Actualizar proyectos filtrados cuando cambia la categoría
  useEffect(() => {
    setFilteredProjects(filterProjectsByCategory(selectedCategory));
  }, [selectedCategory, filterProjectsByCategory]);
  
  // Categorías de proyectos (si no se cargaron del contexto)
  const defaultCategories = [
    { id: 'all', label: 'Todo' },
    { id: 'diseño industrial', label: 'Diseño Industrial' },
    { id: 'diseño visual', label: 'Diseño Visual' }
  ];
  
  // Usar categorías del contexto o las predeterminadas
  const displayCategories = categories.length > 0 
    ? categories.map(cat => ({
        id: cat,
        label: cat === 'all' 
          ? 'Todo' 
          : cat.charAt(0).toUpperCase() + cat.slice(1)
      }))
    : defaultCategories;
  
  // Datos para la sección de CV (sin cambios)
  const cvHighlights = {
    educacion: [
      {
        titulo: 'Lic. en Diseño',
        institucion: 'Tecnológico de Monterrey',
        periodo: '2022 - Actualidad'
      }
    ],
    experiencia: [
      {
        puesto: 'On Campus Intern',
        empresa: 'Departamento de Comunicación, Escuela de Ingeniería y Ciencias',
        ubicacion: 'Tecnológico de Monterrey',
        periodo: 'Febrero 2024 - Actualidad'
      },
      {
        puesto: 'Directora de Arte "Inercia"',
        empresa: 'BLUA MEDIA',
        periodo: 'Febrero - Diciembre 2023'
      },
      {
        puesto: 'Set Dresser Largometraje "LALI"',
        empresa: 'Lotería Producciones',
        periodo: 'Agosto - Diciembre 2022'
      }
    ],
    habilidades: ['Liderazgo', 'Creatividad', 'Adaptabilidad', 'Eficiencia', 'Atención a los detalles', 'Perseverancia'],
    software: ['Photoshop', 'Illustrator', 'Lightroom', 'Canva', 'Fusion 360', 'AutoCad', 'SketchUp', 'KeyShot'],
    idiomas: ['Español', 'Inglés (Intermedio)', 'Francés (Básico)']
  };

  return (
    <>
      {/* Hero Section - sin cambios */}
      <Box 
        sx={{ 
          bgcolor: '#FAFAFA',
          pt: { xs: 12, md: 16 }, 
          pb: { xs: 8, md: 12 },
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ maxWidth: 540 }}>
                <Typography
                  component="h1"
                  variant="h2"
                  color="text.primary"
                  gutterBottom
                  sx={{
                    fontFamily: '"DM Serif Display", serif',
                    fontWeight: 400,
                    fontSize: { xs: '2.5rem', md: '3.75rem' },
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2
                  }}
                >
                  Aylinn Carré
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    fontFamily: '"DM Serif Display", serif',
                    mb: 4,
                    fontWeight: 400,
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    letterSpacing: '0.02em'
                  }}
                >
                  Portafolio de diseño
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  paragraph
                  sx={{
                    fontFamily: '"Open Sauce", sans-serif',
                    fontSize: '1.125rem',
                    lineHeight: 1.7,
                    mb: 5
                  }}
                >
                  Estudiante de sexto semestre de Diseño, apasionada del arte y las industrias creativas.
                  Con experiencia en diseño industrial, dirección de arte y diseño visual.
                </Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={3}
                  sx={{ mb: 6 }}
                >
                  <Button 
                    variant="outlined" 
                    component={RouterLink} 
                    to="/about"
                    size="large"
                    sx={{
                      borderRadius: 0,
                      borderColor: '#000',
                      color: '#000',
                      borderWidth: '1px',
                      px: 4,
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 400,
                      fontFamily: '"Open Sauce", sans-serif',
                      '&:hover': {
                        bgcolor: '#000',
                        color: '#fff',
                        borderColor: '#000'
                      }
                    }}
                  >
                    Sobre mí
                  </Button>
                  <Button 
                    variant="contained" 
                    component={RouterLink} 
                    to="/contact"
                    size="large"
                    sx={{
                      bgcolor: '#000',
                      color: '#fff',
                      borderRadius: 0,
                      px: 4,
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 400,
                      fontFamily: '"Open Sauce", sans-serif',
                      boxShadow: 'none',
                      '&:hover': {
                        bgcolor: '#333',
                        boxShadow: 'none'
                      }
                    }}
                  >
                    Contactar
                  </Button>
                </Stack>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmailIcon sx={{ color: '#666', mr: 2, fontSize: 20 }} />
                  <Typography 
                    variant="body2" 
                    color="#666" 
                    sx={{ 
                      fontSize: '0.95rem',
                      fontFamily: '"Open Sauce", sans-serif'
                    }}
                  >
                    aylinniglerre@gmail.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIcon sx={{ color: '#666', mr: 2, fontSize: 20 }} />
                  <Typography 
                    variant="body2" 
                    color="#666" 
                    sx={{ 
                      fontSize: '0.95rem',
                      fontFamily: '"Open Sauce", sans-serif'
                    }}
                  >
                    232 379 64 17
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon sx={{ color: '#666', mr: 2, fontSize: 20 }} />
                  <Typography 
                    variant="body2" 
                    color="#666" 
                    sx={{ 
                      fontSize: '0.95rem',
                      fontFamily: '"Open Sauce", sans-serif'
                    }}
                  >
                    Monterrey, Nuevo León
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <Box
                component="img"
                src="src/images/profile.jpg"
                alt="Aylinn Carré"
                sx={{
                  width: '100%',
                  maxWidth: 480,
                  height: 'auto',
                  objectFit: 'contain',
                  boxShadow: '20px 20px 0px rgba(0,0,0,0.05)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Portfolio Section - Modificado para usar Firebase */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            align="center"
            sx={{ 
              mb: 6,
              fontFamily: '"DM Serif Display", serif',
              fontWeight: 400,
              fontSize: { xs: '2rem', md: '2.5rem' },
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -24,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 40,
                height: 2,
                bgcolor: '#000'
              }
            }}
          >
            Proyectos
          </Typography>

          {/* Filtros de categoría */}
          <Stack 
            direction="row" 
            spacing={1} 
            justifyContent="center" 
            sx={{ mt: 8, mb: 8, flexWrap: 'wrap', gap: 1 }}
          >
            {displayCategories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "contained" : "outlined"}
                sx={{
                  borderRadius: 0,
                  fontSize: '0.9rem',
                  px: 3,
                  py: 1,
                  minWidth: 100,
                  fontFamily: '"Open Sauce", sans-serif',
                  borderColor: selectedCategory === category.id ? '#000' : '#ccc',
                  bgcolor: selectedCategory === category.id ? '#000' : 'transparent',
                  color: selectedCategory === category.id ? '#fff' : '#000',
                  boxShadow: 'none',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: selectedCategory === category.id ? '#333' : 'rgba(0,0,0,0.05)',
                    borderColor: selectedCategory === category.id ? '#333' : '#000',
                    boxShadow: 'none'
                  }
                }}
              >
                {category.label}
              </Button>
            ))}
          </Stack>

          {/* Estado de carga */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
              <CircularProgress />
            </Box>
          )}
          
          {/* Mensaje de error */}
          {error && (
            <Alert
              severity="error"
              sx={{ maxWidth: 'md', mx: 'auto', mb: 4 }}
            >
              {error}
            </Alert>
          )}

          {/* Grid de proyectos */}
          {!loading && !error && (
            <>
              {filteredProjects.length === 0 ? (
                <Box sx={{ textAlign: 'center', my: 8 }}>
                  <Typography variant="body1" paragraph>
                    No se encontraron proyectos para esta categoría.
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={4}>
                  {filteredProjects.map((project) => (
                    <Grid item key={project.id} xs={12} sm={6} md={4}>
                      <Card 
                        sx={{ 
                          height: '100%', 
                          display: 'flex', 
                          flexDirection: 'column',
                          borderRadius: 0,
                          boxShadow: 'none',
                          border: '1px solid',
                          borderColor: 'divider',
                          transition: 'all 0.4s ease',
                          overflow: 'hidden',
                         '&:hover': {
                              transform: 'translateY(-8px)',
                              boxShadow: '0 20px 30px rgba(0,0,0,0.1)',
                              '& .project-image': {
                                transform: 'scale(1.05)'
                              }
                            }
                          }}
                          component={RouterLink}
                          to={`/project/${project.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Box sx={{ 
                            position: 'relative',
                            paddingTop: '75%',
                            overflow: 'hidden',
                            backgroundColor: '#f5f5f5'
                          }}>
                            <LazyImage
                              src={project.images && project.images.length > 0 
                                ? project.images[0] 
                                : '/placeholder-image.jpg'
                              }
                              alt={project.title}
                              className="project-image"
                              sx={{ 
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                transition: 'transform 0.6s ease'
                              }}
                            />
                          </Box>
                          <CardContent sx={{ flexGrow: 1, p: 3 }}>
                            <Typography 
                              variant="subtitle1" 
                              component="h3" 
                              sx={{ 
                                fontFamily: '"DM Serif Display", serif',
                                fontWeight: 400,
                                fontSize: '1.2rem',
                                mb: 1.5 
                              }}
                            >
                              {project.title}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color="text.secondary" 
                              sx={{ 
                                mb: 3,
                                lineHeight: 1.6,
                                fontSize: '0.95rem',
                                fontFamily: '"Open Sauce", sans-serif',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                              }}
                            >
                              {project.description}
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}>
                              <Typography 
                                variant="caption" 
                                color="#777" 
                                sx={{ 
                                  textTransform: 'uppercase', 
                                  letterSpacing: 1,
                                  fontSize: '0.7rem',
                                  fontFamily: '"Open Sauce", sans-serif'
                                }}
                              >
                                {project.category}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                color="#777"
                                sx={{ 
                                  fontSize: '0.8rem',
                                  fontWeight: 500,
                                  fontFamily: '"Open Sauce", sans-serif'
                                }}
                              >
                                {project.year}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
            </>
          )}
        </Container>
      </Box>

      {/* CV Highlights Section - sin cambios */}
      <Box sx={{ bgcolor: '#F5F5F5', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          {/* Contenido sin cambios */}
          {/* ... */}
        </Container>
      </Box>

      {/* Contact Section - sin cambios */}
      <Box
        sx={{
          bgcolor: '#000',
          color: '#fff',
          py: { xs: 8, md: 10 }
        }}
      >
        {/* Contenido sin cambios */}
        {/* ... */}
      </Box>
    </>
  );
};

export default Home;