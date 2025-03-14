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
import LazyImage from '../components/LazyImage';
import profileImg from '../images/profile.jpg';
import { getProfile } from '../firebase/profileService'; 


<Box
  component="img"
  src={profileImg}
  alt="Aylinn Carré"
  sx={{
    width: '100%',
    maxWidth: 480,
    height: 'auto',
    objectFit: 'contain',
    boxShadow: '20px 20px 0px rgba(0,0,0,0.05)'
  }}
/>


const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [profileData, setProfileData] = useState({
    name: 'Aylinn Carré',
    title: 'Estudiante de Diseño',
    about: 'Estudiante de sexto semestre de Diseño, apasionada del arte y las industrias creativas.',
    email: 'aylinniglerre@gmail.com',
    phone: '232 379 64 17',
    location: 'Monterrey, Nuevo León'
  });
  const [profileLoading, setProfileLoading] = useState(true);

  // Modifica la parte del useEffect en Home.jsx
useEffect(() => {
  const fetchProfileData = async () => {
    try {
      // Usar valores predeterminados por si falla
      const defaultProfile = {
        name: 'Aylinn Carré',
        title: 'Estudiante de Diseño',
        about: 'Estudiante de Diseño en el Tecnológico de Monterrey',
        email: 'aylinniglerre@gmail.com',
        phone: '232 379 64 17',
        location: 'Monterrey, Nuevo León'
      };
      
      try {
        const data = await getProfile();
        setProfileData(data);
        
      } catch (err) {
        
        setProfileData(defaultProfile);
      }
    } finally {
      setProfileLoading(false);
    }
  };
  
  fetchProfileData();
}, []);
  
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
    <>
      {/* Hero Section */}
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
                  {profileData.name}
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
                  {profileData.title}
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
                    {profileData.email}
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
                    {profileData.phone}
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
                    {profileData.location}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <Box
                component="img"
                src={profileImg}
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

      {/* Portfolio Section */}
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
                variant={selectedCategory === category.id ? 'contained' : 'outlined'}
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
                          borderColor: project.featured ? 'primary.main' : 'divider', 
                          transition: 'all 0.4s ease',
                          overflow: 'hidden',
                          position: 'relative', 
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
                        {/* Badge para proyectos destacados */}
                        {project.featured && (
                          <Box 
                            sx={{ 
                              position: 'absolute', 
                              top: 0, 
                              right: 0, 
                              bgcolor: 'black', 
                              color: 'white', 
                              px: 2, 
                              py: 0.5, 
                              zIndex: 1,
                              fontFamily: '"Open Sauce", sans-serif',
                              fontSize: '0.75rem',
                              fontWeight: 500
                            }}
                          >
                            Destacado
                          </Box>
                        )}

                        <Box sx={{ 
                          position: 'relative',
                          paddingTop: '75%',
                          overflow: 'hidden',
                          backgroundColor: '#f5f5f5'
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
                              WebkitBoxOrient: 'vertical'
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

      {/* CV Highlights Section */}
      <Box sx={{ bgcolor: '#F5F5F5', py: { xs: 8, md: 12 } }}>
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
            Experiencia y Habilidades
          </Typography>
          
          <Grid container spacing={5} sx={{ mt: 2 }}>
            {/* Educación */}
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  height: '100%',
                  border: '1px solid #eee',
                  borderTop: '4px solid #000'
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontFamily: '"DM Serif Display", serif',
                    mb: 3,
                    pb: 2,
                    borderBottom: '1px solid #eee'
                  }}
                >
                  Educación
                </Typography>
                
                {cvHighlights.educacion.map((item, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography 
                      variant="subtitle1"
                      sx={{ 
                        fontWeight: 600,
                        fontFamily: '"Open Sauce", sans-serif'
                      }}
                    >
                      {item.titulo}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontFamily: '"Open Sauce", sans-serif',
                        mb: 1
                      }}
                    >
                      {item.institucion}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'inline-block',
                        bgcolor: '#eee',
                        px: 1,
                        py: 0.5,
                        fontFamily: '"Open Sauce", sans-serif'
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
                    color: '#000',
                    textTransform: 'none',
                    fontFamily: '"Open Sauce", sans-serif',
                    '&:hover': {
                      bgcolor: 'transparent',
                      textDecoration: 'underline'
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
                sx={{ 
                  p: 4, 
                  height: '100%',
                  border: '1px solid #eee',
                  borderTop: '4px solid #000'
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontFamily: '"DM Serif Display", serif',
                    mb: 3,
                    pb: 2,
                    borderBottom: '1px solid #eee'
                  }}
                >
                  Experiencia
                </Typography>
                
                {cvHighlights.experiencia.map((item, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography 
                      variant="subtitle1"
                      sx={{ 
                        fontWeight: 600,
                        fontFamily: '"Open Sauce", sans-serif'
                      }}
                    >
                      {item.puesto}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontFamily: '"Open Sauce", sans-serif',
                        mb: 1
                      }}
                    >
                      {item.empresa}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'inline-block',
                        bgcolor: '#eee',
                        px: 1,
                        py: 0.5,
                        fontFamily: '"Open Sauce", sans-serif'
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
                    color: '#000',
                    textTransform: 'none',
                    fontFamily: '"Open Sauce", sans-serif',
                    '&:hover': {
                      bgcolor: 'transparent',
                      textDecoration: 'underline'
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
                sx={{ 
                  p: 4, 
                  height: '100%',
                  border: '1px solid #eee',
                  borderTop: '4px solid #000'
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontFamily: '"DM Serif Display", serif',
                    mb: 3,
                    pb: 2,
                    borderBottom: '1px solid #eee'
                  }}
                >
                  Habilidades
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="subtitle2" 
                    gutterBottom
                    sx={{ 
                      fontFamily: '"Open Sauce", sans-serif',
                      color: '#555'
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
                          borderRadius: 0,
                          bgcolor: '#eee',
                          color: '#333',
                          fontFamily: '"Open Sauce", sans-serif'
                        }}
                      />
                    ))}
                  </Box>
                  
                  <Typography 
                    variant="subtitle2" 
                    gutterBottom
                    sx={{ 
                      fontFamily: '"Open Sauce", sans-serif',
                      color: '#555',
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
                          borderRadius: 0,
                          bgcolor: '#000',
                          color: '#fff',
                          fontFamily: '"Open Sauce", sans-serif'
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
                    color: '#000',
                    textTransform: 'none',
                    fontFamily: '"Open Sauce", sans-serif',
                    '&:hover': {
                      bgcolor: 'transparent',
                      textDecoration: 'underline'
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
          bgcolor: '#000',
          color: '#fff',
          py: { xs: 8, md: 10 }
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
                  fontFamily: '"DM Serif Display", serif',
                  fontWeight: 400,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  mb: 4
                }}
              >
                ¿Interesado en colaborar?
              </Typography>
              
              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontFamily: '"Open Sauce", sans-serif',
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  mb: 4,
                  opacity: 0.9
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
                  borderRadius: 0,
                  color: '#fff',
                  borderColor: '#fff',
                  borderWidth: '1px',
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 400,
                  fontFamily: '"Open Sauce", sans-serif',
                  '&:hover': {
                    bgcolor: '#fff',
                    color: '#000',
                    borderColor: '#fff'
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
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 0
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontFamily: '"DM Serif Display", serif',
                    color: 'rgb(255, 255, 255)',
                    fontWeight: 400,
                    mb: 3
                  }}
                >
                  Información de contacto
                </Typography>
                
                <Stack spacing={3} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon sx={{ color: 'white', mr: 2, opacity: 0.8 }} />
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Open Sauce", sans-serif',
                        color: 'rgb(255, 255, 255)'
                      }}
                    >
                      aylinncorreotecdiseñojd@gmail.com
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon sx={{ color: 'white', mr: 2, opacity: 0.8 }} />
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Open Sauce", sans-serif',
                        color: 'rgb(255, 255, 255)'
                      }}
                    >
                      232 379 64 17
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon sx={{ color: 'white', mr: 2, opacity: 0.8 }} />
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Open Sauce", sans-serif',
                        color: 'rgb(255, 255, 255)'
                      }}
                    >
                      Monterrey, Nuevo León
                    </Typography>
                  </Box>
                </Stack>
                
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 3 }} />
                
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: '"Open Sauce", sans-serif',
                    opacity: 0.8,
                    color: 'rgb(255, 255, 255)',
                    mt: 2
                  }}
                >
                  Respuesta estimada: 24-48 horas
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
