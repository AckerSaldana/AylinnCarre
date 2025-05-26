import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Button,
  Divider,
  Paper,
  Stack,
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
import { useProfile } from '../context/ProfileContext';
import LazyImage from '../components/LazyImage';
import profileImg from '../images/profile.jpg';

// Import Google Fonts
import '@fontsource/permanent-marker';
import '@fontsource/kalam/300.css';
import '@fontsource/kalam/400.css';
import '@fontsource/kalam/700.css';
import '@fontsource/caveat/400.css';
import '@fontsource/caveat/700.css'; 

const Home = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);

  const { profile, loading: profileLoading } = useProfile();
  const defaultProfile = {
    name: 'Aylinn Carré',
    title: 'Estudiante de Diseño',
    about: 'Estudiante de sexto semestre de Diseño, apasionada del arte y las industrias creativas.',
    email: 'aylinniglerre@gmail.com',
    phone: '232 379 64 17',
    location: 'Monterrey, Nuevo León'
  };
  
  // Use profile from context or default
  const profileData = profile || defaultProfile;
  
  // Usar el contexto de proyectos
  const { 
    categories, 
    loading, 
    error, 
    filterProjectsByCategory 
  } = useProjects();
  
  useEffect(() => {
    const filtered = filterProjectsByCategory(selectedCategory);
    
    const sortedProjects = [...filtered].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
    
    setFilteredProjects(sortedProjects);
  }, [selectedCategory, filterProjectsByCategory]);
  
  
  
  // Categorías de proyectos (si no se cargaron del contexto)
  const defaultCategories = [
    { id: 'all', label: 'Todo' },
    { id: 'diseño industrial', label: 'Diseño Industrial' },
    { id: 'diseño visual', label: 'Diseño Visual' }
  ];
  
  // Usar categorías del contexto o las predeterminadas
  const displayCategories =
    categories && categories.length > 0
      ? categories.map((cat) => ({
          id: cat,
          label: cat === 'all' ? 'Todo' : cat.charAt(0).toUpperCase() + cat.slice(1)
        }))
      : defaultCategories;
  
  // Datos para la sección de CV
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
    habilidades: [
      'Liderazgo',
      'Creatividad',
      'Adaptabilidad',
      'Eficiencia',
      'Atención a los detalles',
      'Perseverancia'
    ],
    software: [
      'Photoshop',
      'Illustrator',
      'Lightroom',
      'Canva',
      'Fusion 360',
      'AutoCad',
      'SketchUp',
      'KeyShot'
    ],
    idiomas: ['Español', 'Inglés (Intermedio)', 'Francés (Básico)']
  };

  return (
    <Box
      sx={{
        bgcolor: '#FAFAFA',
        minHeight: '100vh',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
          pointerEvents: 'none',
          zIndex: 0
        }
      }}
    >
      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: { xs: 8, md: 12 }, 
          pb: { xs: 8, md: 16 },
          position: 'relative',
          zIndex: 1
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
                    className="animate-fadeIn"
                    sx={{
                      fontFamily: '"Permanent Marker", cursive',
                      fontWeight: 400,
                      fontSize: { xs: '2.5rem', md: '4.5rem' },
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      mb: 3,
                      pb: 1,
                      color: '#1a1a1a',
                      transform: 'rotate(-0.5deg)',
                      textShadow: '2px 2px 0px rgba(0,0,0,0.05)'
                    }}
                  >
                    {profileData.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    className="animate-fadeIn delay-100"
                    sx={{
                      fontFamily: '"Kalam", cursive',
                      mb: 4,
                      fontWeight: 700,
                      fontSize: { xs: '1.25rem', md: '1.75rem' },
                      letterSpacing: '0.01em',
                      color: '#333',
                      transform: 'rotate(0.3deg)'
                    }}
                  >
                    {profileData.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    paragraph
                    className="animate-fadeIn delay-200"
                    sx={{
                      fontFamily: '"Kalam", cursive',
                      fontSize: '1.1rem',
                      lineHeight: 1.8,
                      mb: 6,
                      color: '#444',
                      maxWidth: 480,
                      fontWeight: 400
                    }}
                  >
                    {profileData.about}
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
                      borderRadius: '3px',
                      borderColor: '#333',
                      color: '#333',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      px: 4,
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      fontFamily: '"Kalam", cursive',
                      position: 'relative',
                      transform: 'rotate(-0.2deg)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: -2,
                        border: '1px solid #555',
                        borderRadius: '4px',
                        transform: 'rotate(0.4deg)',
                        zIndex: -1
                      },
                      '&:hover': {
                        bgcolor: '#333',
                        color: '#fff',
                        borderColor: '#333',
                        textDecoration: 'none'
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
                      bgcolor: '#333',
                      color: '#fff',
                      borderRadius: '3px',
                      px: 4,
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      fontFamily: '"Kalam", cursive',
                      boxShadow: 'none',
                      position: 'relative',
                      transform: 'rotate(0.2deg)',
                      border: '2px solid #333',
                      '&:hover': {
                        bgcolor: '#222',
                        borderColor: '#222',
                        boxShadow: 'none',
                        textDecoration: 'none'
                      }
                    }}
                  >
                    Contactar
                  </Button>
                </Stack>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2.5,
                mt: 6,
                p: 3,
                background: 'transparent',
                borderRadius: '3px',
                maxWidth: 'fit-content',
                position: 'relative',
                transform: 'rotate(-0.3deg)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  border: '1.5px solid #444',
                  borderRadius: '3px',
                  transform: 'rotate(0.5deg)'
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: -3,
                  border: '1px solid #555',
                  borderRadius: '4px',
                  opacity: 0.5,
                  transform: 'rotate(-0.3deg)'
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2.5
                  }}>
                    <EmailIcon sx={{ color: '#000', fontSize: 16 }} />
                  </Box>
                  <Typography 
                    variant="body2" 
                    color="#333" 
                    sx={{ 
                      fontSize: '1rem',
                      fontFamily: '"Kalam", cursive',
                      fontWeight: 400
                    }}
                  >
                    {profileData.email}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2.5
                  }}>
                    <PhoneIcon sx={{ color: '#000', fontSize: 16 }} />
                  </Box>
                  <Typography 
                    variant="body2" 
                    color="#333" 
                    sx={{ 
                      fontSize: '1rem',
                      fontFamily: '"Kalam", cursive',
                      fontWeight: 400
                    }}
                  >
                    {profileData.phone}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2.5
                  }}>
                    <LocationIcon sx={{ color: '#000', fontSize: 16 }} />
                  </Box>
                  <Typography 
                    variant="body2" 
                    color="#333" 
                    sx={{ 
                      fontSize: '1rem',
                      fontFamily: '"Kalam", cursive',
                      fontWeight: 400
                    }}
                  >
                    {profileData.location}
                  </Typography>
                </Box>
                </Box>
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <Box
                className="animate-scaleIn delay-300"
                  sx={{
                    width: '100%',
                    maxWidth: 480
                  }}
                >
                  <LazyImage
                    src={profileImg}
                    alt="Aylinn Carré"
                    priority={true}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      display: 'block',
                      boxShadow: '20px 20px 0px rgba(0,0,0,0.05)'
                    }}
                  />
                </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Portfolio Section */}
      <Box sx={{ 
        py: { xs: 12, md: 20 },
        position: 'relative',
        zIndex: 1
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            align="center"
            className="animate-fadeIn"
            sx={{ 
                mb: 8,
                fontFamily: '"Permanent Marker", cursive',
                fontWeight: 400,
                fontSize: { xs: '2rem', md: '3rem' },
                letterSpacing: '-0.01em',
                position: 'relative',
                color: '#1a1a1a',
                transform: 'rotate(-0.3deg)',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '120px',
                  height: '2px',
                  background: 'linear-gradient(to right, transparent, #333 20%, #333 80%, transparent)',
                  borderRadius: '1px'
                }
              }}
            >
              Proyectos
            </Typography>

          {/* Filtros de categoría */}
          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="center" 
            sx={{ 
              mt: 10, 
              mb: 10, 
              flexWrap: 'wrap', 
              gap: 2,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '1px',
                background: 'rgba(0,0,0,0.05)',
                zIndex: -1
              }
            }}
          >
            {displayCategories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? 'contained' : 'outlined'}
                sx={{
                  borderRadius: '3px',
                  fontSize: '0.875rem',
                  px: 3,
                  py: 1,
                  minWidth: 100,
                  fontFamily: '"Kalam", cursive',
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  border: '1.5px solid',
                  bgcolor: selectedCategory === category.id ? '#000' : '#fff',
                  color: selectedCategory === category.id ? '#fff' : '#666',
                  boxShadow: selectedCategory === category.id ? '0 4px 20px rgba(0,0,0,0.15)' : '0 2px 10px rgba(0,0,0,0.05)',
                  textTransform: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    bgcolor: selectedCategory === category.id ? '#000' : '#f5f5f5',
                    color: selectedCategory === category.id ? '#fff' : '#000',
                    boxShadow: selectedCategory === category.id ? '0 6px 25px rgba(0,0,0,0.2)' : '0 4px 15px rgba(0,0,0,0.08)',
                    transform: 'translateY(-2px)'
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
                  {filteredProjects.map((project, index) => (
                    <Grid item key={project.id} xs={12} sm={6} md={4}>
                      <Card 
                        className={`animate-fadeIn delay-${Math.min(index * 100, 500)}`}
                        sx={{ 
                          height: '100%', 
                          display: 'flex', 
                          flexDirection: 'column',
                          borderRadius: '3px',
                          boxShadow: 'none',
                          border: 'none',
                          transition: 'all 0.3s ease',
                          overflow: 'visible',
                          position: 'relative',
                          background: '#fff',
                          transform: `rotate(${-0.8 + Math.random() * 1.6}deg)`,
                          margin: '16px',
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
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: -1,
                            background: '#fff',
                            borderRadius: '3px',
                            pointerEvents: 'none',
                            zIndex: -3,
                            boxShadow: '2px 2px 8px rgba(0,0,0,0.05)'
                          },
                          '&:hover': {
                            transform: `rotate(${-0.8 + Math.random() * 1.6}deg) translateY(-4px)`,
                            '& .project-image': {
                              transform: 'scale(1.02)'
                            }
                          }
                        }}
                        component={RouterLink}
                        to={`/project/${project.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {/* Sketchy border */}
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
                              d={`M ${3 + Math.random() * 0.5} ${1 + Math.random() * 0.5} 
                                  Q ${1 + Math.random() * 0.3} ${1 + Math.random() * 0.3} ${1 + Math.random() * 0.5} ${3 + Math.random() * 0.5}
                                  L ${1 + Math.random() * 0.5} ${97 - Math.random() * 0.5} 
                                  Q ${1 + Math.random() * 0.3} ${99 - Math.random() * 0.3} ${3 + Math.random() * 0.5} ${99 - Math.random() * 0.5}
                                  L ${97 - Math.random() * 0.5} ${99 - Math.random() * 0.5} 
                                  Q ${99 - Math.random() * 0.3} ${99 - Math.random() * 0.3} ${99 - Math.random() * 0.5} ${97 - Math.random() * 0.5}
                                  L ${99 - Math.random() * 0.5} ${3 + Math.random() * 0.5} 
                                  Q ${99 - Math.random() * 0.3} ${1 + Math.random() * 0.3} ${97 - Math.random() * 0.5} ${1 + Math.random() * 0.5}
                                  Z`}
                              fill="none"
                              stroke="#444"
                              strokeWidth={project.featured ? "0.8" : "0.6"}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              opacity="0.9"
                              vectorEffect="non-scaling-stroke"
                            />
                            <path
                              d={`M ${3.2 + Math.random() * 0.3} ${1.2 + Math.random() * 0.3} 
                                  Q ${1.2 + Math.random() * 0.2} ${1.2 + Math.random() * 0.2} ${1.2 + Math.random() * 0.3} ${3.2 + Math.random() * 0.3}
                                  L ${1.2 + Math.random() * 0.3} ${96.8 - Math.random() * 0.3} 
                                  Q ${1.2 + Math.random() * 0.2} ${98.8 - Math.random() * 0.2} ${3.2 + Math.random() * 0.3} ${98.8 - Math.random() * 0.3}
                                  L ${96.8 - Math.random() * 0.3} ${98.8 - Math.random() * 0.3} 
                                  Q ${98.8 - Math.random() * 0.2} ${98.8 - Math.random() * 0.2} ${98.8 - Math.random() * 0.3} ${96.8 - Math.random() * 0.3}
                                  L ${98.8 - Math.random() * 0.3} ${3.2 + Math.random() * 0.3} 
                                  Q ${98.8 - Math.random() * 0.2} ${1.2 + Math.random() * 0.2} ${96.8 - Math.random() * 0.3} ${1.2 + Math.random() * 0.3}
                                  Z`}
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

                        {/* Badge para proyectos destacados */}
                        {project.featured && (
                          <Box 
                            sx={{ 
                              position: 'absolute', 
                              top: 16, 
                              right: 16, 
                              bgcolor: 'black', 
                              color: 'white', 
                              px: 2, 
                              py: 0.5, 
                              zIndex: 1,
                              fontFamily: '"Caveat", cursive',
                              fontSize: '0.875rem',
                              fontWeight: 700,
                              transform: 'rotate(-2deg)'
                            }}
                          >
                            Destacado
                          </Box>
                        )}

                        <Box sx={{ 
                          position: 'relative',
                          paddingTop: '75%',
                          overflow: 'hidden',
                          backgroundColor: '#fafafa',
                          m: '12px',
                          mb: 0,
                          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.03)'
                        }}>
                          <LazyImage
                            src={
                              project.images && project.images.length > 0 
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
                            className="project-title"
                            sx={{ 
                              fontFamily: '"Kalam", cursive',
                              fontWeight: 700,
                              fontSize: '1.4rem',
                              mb: 2,
                              color: '#222',
                              transition: 'color 0.3s ease',
                              letterSpacing: '-0.01em',
                              transform: 'rotate(-0.2deg)',
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'none'
                              }
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
                              fontSize: '1rem',
                              fontFamily: '"Kalam", cursive',
                              fontWeight: 400,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical'
                            }}
                          >
                            {project.description}
                          </Typography>
                          <Box sx={{ 
                            height: '1px',
                            mb: 2,
                            mt: 1,
                            position: 'relative',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              left: 0,
                              right: 0,
                              height: '1px',
                              background: `linear-gradient(to right, 
                                transparent, 
                                #888 10%, 
                                #888 30%, 
                                transparent 40%, 
                                transparent 60%, 
                                #888 70%, 
                                #888 90%, 
                                transparent)`,
                              transform: 'scaleY(0.5)'
                            }
                          }} />
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
                                fontSize: '0.75rem',
                                fontFamily: '"Caveat", cursive',
                                fontWeight: 700
                              }}
                            >
                              {project.category}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="#777"
                              sx={{ 
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                fontFamily: '"Caveat", cursive'
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

      {/* CV Highlights Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            align="center"
            sx={{ 
              mb: 8,
              fontFamily: '"Permanent Marker", cursive',
              fontWeight: 400,
              fontSize: { xs: '2rem', md: '2.5rem' },
              color: '#1a1a1a',
              transform: 'rotate(-0.4deg)',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -20,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '2px',
                background: 'linear-gradient(to right, transparent, #333 20%, #333 80%, transparent)',
                borderRadius: '1px'
              }
            }}
          >
            Experiencia y Habilidades
          </Typography>
          
          <Grid container spacing={5} sx={{ mt: 2 }}>
            {/* Educación */}
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0}
                className="hover-lift animate-scaleIn delay-200"
                  sx={{ 
                    p: 5, 
                    height: '100%',
                    background: 'transparent',
                    boxShadow: 'none',
                    position: 'relative',
                    transform: 'rotate(-0.3deg)',
                    transition: 'all 0.3s var(--ease-out-expo)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      border: '1.5px solid #444',
                      borderRadius: '3px',
                      transform: 'rotate(0.5deg)',
                      background: 'transparent'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: -4,
                      border: '1px solid #666',
                      borderRadius: '4px',
                      opacity: 0.5,
                      transform: 'rotate(-0.7deg)'
                    },
                    '&:hover': {
                      transform: 'rotate(-0.3deg) translateY(-2px)',
                      '& .section-title': {
                        transform: 'translateX(8px)'
                      },
                      '&::before': {
                        borderWidth: '2px'
                      }
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    className="section-title"
                    sx={{ 
                      fontFamily: '"Permanent Marker", cursive',
                      mb: 4,
                      pb: 2.5,
                      borderBottom: '2px solid #333',
                      fontSize: '1.4rem',
                      fontWeight: 400,
                      transform: 'rotate(-0.5deg)',
                      transition: 'transform 0.3s var(--ease-out-expo)'
                    }}
                  >
                    Educación
                  </Typography>
                
                {cvHighlights.educacion.map((item, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography 
                      variant="subtitle1"
                      sx={{ 
                        fontWeight: 700,
                        fontFamily: '"Kalam", cursive',
                        fontSize: '1.1rem'
                      }}
                    >
                      {item.titulo}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontFamily: '"Kalam", cursive',
                        fontWeight: 400,
                        mb: 1
                      }}
                    >
                      {item.institucion}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'inline-block',
                        bgcolor: 'transparent',
                        border: '1px solid #666',
                        borderRadius: '2px',
                        px: 1.5,
                        py: 0.5,
                        fontFamily: '"Caveat", cursive',
                        fontWeight: 700,
                        fontSize: '0.875rem'
                      }}
                    >
                      {item.periodo}
                    </Typography>
                  </Box>
                ))}
                
                <Button
                  component={RouterLink}
                  to="/resume"
                  endIcon={<ArrowIcon />}
                  sx={{
                    mt: 2,
                    color: '#333',
                    textTransform: 'none',
                    fontFamily: '"Kalam", cursive',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    border: '1.5px solid #333',
                    borderRadius: '3px',
                    px: 2,
                    py: 0.5,
                    '&:hover': {
                      bgcolor: '#333',
                      color: '#fff',
                      borderColor: '#333'
                    }
                  }}
                >
                  Ver CV completo
                </Button>
                </Paper>
            </Grid>
          
            {/* Experiencia */}
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0}
                className="hover-lift animate-scaleIn delay-300"
                  sx={{ 
                    p: 5, 
                    height: '100%',
                    background: 'transparent',
                    boxShadow: 'none',
                    position: 'relative',
                    transform: 'rotate(0.4deg)',
                    transition: 'all 0.3s var(--ease-out-expo)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      border: '1.5px solid #444',
                      borderRadius: '3px',
                      transform: 'rotate(-0.6deg)',
                      background: 'transparent'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: -4,
                      border: '1px solid #666',
                      borderRadius: '4px',
                      opacity: 0.5,
                      transform: 'rotate(0.8deg)'
                    },
                    '&:hover': {
                      transform: 'rotate(0.4deg) translateY(-2px)',
                      '& .section-title': {
                        transform: 'translateX(8px)'
                      },
                      '&::before': {
                        borderWidth: '2px'
                      }
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    className="section-title"
                    sx={{ 
                      fontFamily: '"Permanent Marker", cursive',
                      mb: 4,
                      pb: 2.5,
                      borderBottom: '2px solid #333',
                      fontSize: '1.4rem',
                      fontWeight: 400,
                      transform: 'rotate(0.3deg)',
                      transition: 'transform 0.3s var(--ease-out-expo)'
                    }}
                  >
                    Experiencia
                  </Typography>
                
                {cvHighlights.experiencia.map((item, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography 
                      variant="subtitle1"
                      sx={{ 
                        fontWeight: 700,
                        fontFamily: '"Kalam", cursive',
                        fontSize: '1.1rem'
                      }}
                    >
                      {item.puesto}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontFamily: '"Kalam", cursive',
                        fontWeight: 400,
                        mb: 1
                      }}
                    >
                      {item.empresa}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'inline-block',
                        bgcolor: 'transparent',
                        border: '1px solid #666',
                        borderRadius: '2px',
                        px: 1.5,
                        py: 0.5,
                        fontFamily: '"Caveat", cursive',
                        fontWeight: 700,
                        fontSize: '0.875rem'
                      }}
                    >
                      {item.periodo}
                    </Typography>
                  </Box>
                ))}
                
                <Button
                  component={RouterLink}
                  to="/resume"
                  endIcon={<ArrowIcon />}
                  sx={{
                    mt: 2,
                    color: '#333',
                    textTransform: 'none',
                    fontFamily: '"Kalam", cursive',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    border: '1.5px solid #333',
                    borderRadius: '3px',
                    px: 2,
                    py: 0.5,
                    '&:hover': {
                      bgcolor: '#333',
                      color: '#fff',
                      borderColor: '#333'
                    }
                  }}
                >
                  Ver más experiencia
                </Button>
              </Paper>
          </Grid>
          
            {/* Habilidades */}
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0}
                className="hover-lift animate-scaleIn delay-400"
                  sx={{ 
                    p: 5, 
                    height: '100%',
                    background: 'transparent',
                    boxShadow: 'none',
                    position: 'relative',
                    transform: 'rotate(-0.5deg)',
                    transition: 'all 0.3s var(--ease-out-expo)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      border: '1.5px solid #444',
                      borderRadius: '3px',
                      transform: 'rotate(0.7deg)',
                      background: 'transparent'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: -4,
                      border: '1px solid #666',
                      borderRadius: '4px',
                      opacity: 0.5,
                      transform: 'rotate(-0.9deg)'
                    },
                    '&:hover': {
                      transform: 'rotate(-0.5deg) translateY(-2px)',
                      '& .section-title': {
                        transform: 'translateX(8px)'
                      },
                      '&::before': {
                        borderWidth: '2px'
                      }
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    className="section-title"
                    sx={{ 
                      fontFamily: '"Permanent Marker", cursive',
                      mb: 4,
                      pb: 2.5,
                      borderBottom: '2px solid #333',
                      fontSize: '1.4rem',
                      fontWeight: 400,
                      transform: 'rotate(-0.2deg)',
                      transition: 'transform 0.3s var(--ease-out-expo)'
                    }}
                  >
                    Habilidades
                  </Typography>
                
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="subtitle2" 
                    gutterBottom
                    sx={{ 
                      fontFamily: '"Kalam", cursive',
                      fontWeight: 700,
                      color: '#555',
                      fontSize: '1rem'
                    }}
                  >
                    Competencias
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {cvHighlights.habilidades.map((skill, index) => (
                      <Chip 
                        key={index}
                        label={skill}
                        size="small"
                        sx={{ 
                          borderRadius: '2px',
                          bgcolor: 'transparent',
                          border: '1px solid #555',
                          color: '#333',
                          fontFamily: '"Caveat", cursive',
                          fontWeight: 700,
                          fontSize: '0.875rem'
                        }}
                      />
                    ))}
                  </Box>
                  
                  <Typography 
                    variant="subtitle2" 
                    gutterBottom
                    sx={{ 
                      fontFamily: '"Kalam", cursive',
                      fontWeight: 700,
                      color: '#555',
                      fontSize: '1rem',
                      mt: 3
                    }}
                  >
                    Software
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {cvHighlights.software.map((sw, index) => (
                      <Chip 
                        key={index}
                        label={sw}
                        size="small"
                        sx={{ 
                          borderRadius: '2px',
                          bgcolor: '#333',
                          color: '#fff',
                          fontFamily: '"Caveat", cursive',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          border: '1px solid #333'
                        }}
                      />
                    ))}
                  </Box>
                </Box>
                
                <Button
                  component={RouterLink}
                  to="/resume"
                  endIcon={<ArrowIcon />}
                  sx={{
                    mt: 2,
                    color: '#333',
                    textTransform: 'none',
                    fontFamily: '"Kalam", cursive',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    border: '1.5px solid #333',
                    borderRadius: '3px',
                    px: 2,
                    py: 0.5,
                    '&:hover': {
                      bgcolor: '#333',
                      color: '#fff',
                      borderColor: '#333'
                    }
                  }}
                >
                  Ver perfil completo
                </Button>
              </Paper>
          </Grid>
        </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        sx={{
          bgcolor: '#FAFAFA',
          color: '#333',
          py: { xs: 8, md: 10 },
          position: 'relative',
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
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontFamily: '"Permanent Marker", cursive',
                  fontWeight: 400,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  mb: 4,
                  color: '#1a1a1a',
                  transform: 'rotate(-0.5deg)'
                }}
              >
                ¿Interesado en colaborar?
              </Typography>
              
              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontFamily: '"Kalam", cursive',
                  fontSize: '1.15rem',
                  lineHeight: 1.7,
                  mb: 4,
                  fontWeight: 400,
                  color: '#444'
                }}
              >
                Estoy abierta a nuevas oportunidades y colaboraciones en diseño industrial, 
                diseño visual y dirección de arte. Si tienes un proyecto interesante o quieres 
                discutir posibilidades, no dudes en contactarme.
              </Typography>
              
              <Button 
                variant="outlined"
                component={RouterLink}
                to="/contact"
                size="large"
                sx={{
                  borderRadius: '3px',
                  color: '#333',
                  borderColor: '#333',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  fontFamily: '"Kalam", cursive',
                  position: 'relative',
                  transform: 'rotate(-0.3deg)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -2,
                    border: '1px solid #555',
                    borderRadius: '4px',
                    transform: 'rotate(0.6deg)',
                    zIndex: -1
                  },
                  '&:hover': {
                    bgcolor: '#333',
                    color: '#fff',
                    borderColor: '#333'
                  }
                }}
              >
                Contactar
              </Button>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  background: 'transparent',
                  boxShadow: 'none',
                  position: 'relative',
                  transform: 'rotate(0.4deg)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    border: '1.5px solid #444',
                    borderRadius: '3px',
                    transform: 'rotate(-0.6deg)',
                    background: `
                      repeating-linear-gradient(45deg, 
                        transparent, 
                        transparent 10px, 
                        rgba(0,0,0,0.02) 10px, 
                        rgba(0,0,0,0.02) 20px
                      )
                    `
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: -4,
                    border: '1px solid #666',
                    borderRadius: '4px',
                    opacity: 0.5,
                    transform: 'rotate(0.8deg)'
                  }
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontFamily: '"Permanent Marker", cursive',
                    color: '#333',
                    fontWeight: 400,
                    mb: 3,
                    fontSize: '1.3rem',
                    transform: 'rotate(-0.3deg)'
                  }}
                >
                  Información de contacto
                </Typography>
                
                <Stack spacing={3} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon sx={{ color: '#333', mr: 2, opacity: 0.8 }} />
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Kalam", cursive',
                        color: '#333',
                        fontWeight: 400
                      }}
                    >
                      aylinncorreotecdiseñojd@gmail.com
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon sx={{ color: '#333', mr: 2, opacity: 0.8 }} />
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Kalam", cursive',
                        color: '#333',
                        fontWeight: 400
                      }}
                    >
                      232 379 64 17
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon sx={{ color: '#333', mr: 2, opacity: 0.8 }} />
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Kalam", cursive',
                        color: '#333',
                        fontWeight: 400
                      }}
                    >
                      Monterrey, Nuevo León
                    </Typography>
                  </Box>
                </Stack>
                
                <Divider sx={{ borderColor: '#666', borderStyle: 'dashed', my: 3 }} />
                
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: '"Caveat", cursive',
                    fontWeight: 700,
                    color: '#555',
                    mt: 2,
                    fontSize: '1rem'
                  }}
                >
                  Respuesta estimada: 24-48 horas
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;