import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Chip,
  Button,
  Divider,
  Paper,
  Stack,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  KeyboardArrowRight as ArrowIcon
} from '@mui/icons-material';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Categorías de proyectos
  const categories = [
    { id: 'all', label: 'Todo' },
    { id: 'diseño industrial', label: 'Diseño Industrial' },
    { id: 'diseño visual', label: 'Diseño Visual' }
  ];
  
  // Datos de proyectos basados en el portafolio de Aylinn
  const projects = [
    {
      id: 1,
      title: 'Bouquet',
      category: 'diseño industrial',
      image: 'src/images/bouquet.jpg',
      description: 'Florero inspirado en la forma de un ramo de flores y diseñado para facilitar el cambio de agua.',
      year: '2024'
    },
    {
      id: 2,
      title: 'Peque-biz',
      category: 'diseño industrial',
      image: 'src/images/peque-biz.jpg',
      description: 'Familia de productos de cocina para niños con discapacidad visual.',
      year: '2025'
    },
    {
      id: 3,
      title: 'Bettercepillo limpiador',
      category: 'diseño industrial',
      image: 'src/images/bettercepillo.jpg',
      description: 'Complemento multifunción para el fregadero desarrollado para Betterware.',
      year: '2024'
    },
    {
      id: 4,
      title: 'Bonaterra',
      category: 'diseño industrial',
      image: 'src/images/bonaterra.jpg',
      description: 'Familia de mobiliario para espacios reducidos orientado a estudiantes.',
      year: '2023'
    },
    {
      id: 5,
      title: 'Identidad Bonaterra',
      category: 'diseño visual',
      image: 'src/images/bonaterra-id.jpg',
      description: 'Desarrollo de identidad visual para la línea de mobiliario Bonaterra.',
      year: '2023'
    },
    {
      id: 6,
      title: 'Salmón',
      category: 'diseño visual',
      image: 'src/images/salmon.jpg',
      description: 'Composición visual minimalista para un libro ABC para niños.',
      year: '2024'
    },
    {
      id: 7,
      title: 'Expo Ingenierías',
      category: 'diseño visual',
      image: 'src/images/expo-ingenierias.jpg',
      description: 'Rediseño de identidad y materiales gráficos para evento del Tec de Monterrey.',
      year: '2024'
    },
    {
      id: 8,
      title: '6 décadas de computación',
      category: 'diseño visual',
      image: 'src/images/6-decadas.jpg',
      description: 'Identidad visual para evento conmemorativo del Tecnológico de Monterrey.',
      year: '2024'
    },
  ];

  // Filtrar proyectos según la categoría seleccionada
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Características principales del CV para mostrar en el inicio
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
            {categories.map((category) => (
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

          {/* Grid de proyectos - Con manejo mejorado de imágenes */}
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
                      '& .MuiCardMedia-root': {
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
                    paddingTop: '75%', // Proporción 4:3 para mantener consistencia
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5' // Fondo sutil para imágenes con transparencia
                  }}>
                    <CardMedia
                      component="img"
                      sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // Cubre el espacio asignado
                        objectPosition: 'center', // Centra la imagen
                        transition: 'transform 0.6s ease'
                      }}
                      image={project.image}
                      alt={project.title}
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
                        fontFamily: '"Open Sauce", sans-serif'
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
        </Container>
      </Box>

      {/* CV Highlights Section */}
      <Box sx={{ bgcolor: '#F5F5F5', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
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

          <Grid container spacing={5} sx={{ mt: 4 }}>
            {/* Experiencia */}
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  height: '100%', 
                  bgcolor: '#fff',
                  border: '1px solid',
                  borderColor: '#eee'
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontFamily: '"DM Serif Display", serif',
                    mb: 4,
                    fontSize: '1.25rem',
                    position: 'relative',
                    pb: 2,
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: 30,
                      height: 2,
                      bgcolor: '#000'
                    }
                  }}
                >
                  Experiencia
                </Typography>
                
                {cvHighlights.experiencia.map((exp, index) => (
                  <Box key={index} sx={{ mb: 3, pb: 3, borderBottom: index !== cvHighlights.experiencia.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: '1rem',
                        mb: 1,
                        fontFamily: '"Open Sauce", sans-serif'
                      }}
                    >
                      {exp.puesto}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="#555"
                      sx={{ 
                        fontSize: '0.9rem',
                        mb: 0.5,
                        fontFamily: '"Open Sauce", sans-serif'
                      }}
                    >
                      {exp.empresa}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="#777"
                      sx={{ 
                        fontSize: '0.8rem',
                        fontStyle: 'italic',
                        fontFamily: '"Open Sauce", sans-serif'
                      }}
                    >
                      {exp.periodo}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </Grid>

            {/* Educación y Habilidades */}
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  height: '100%', 
                  bgcolor: '#fff',
                  border: '1px solid',
                  borderColor: '#eee'
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontFamily: '"DM Serif Display", serif',
                    mb: 4,
                    fontSize: '1.25rem',
                    position: 'relative',
                    pb: 2,
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: 30,
                      height: 2,
                      bgcolor: '#000'
                    }
                  }}
                >
                  Educación
                </Typography>
                
                {cvHighlights.educacion.map((edu, index) => (
                  <Box key={index} sx={{ mb: 4 }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: '1rem',
                        mb: 1,
                        fontFamily: '"Open Sauce", sans-serif'
                      }}
                    >
                      {edu.titulo}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="#555"
                      sx={{ 
                        fontSize: '0.9rem',
                        mb: 0.5,
                        fontFamily: '"Open Sauce", sans-serif'
                      }}
                    >
                      {edu.institucion}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="#777"
                      sx={{ 
                        fontSize: '0.8rem',
                        fontStyle: 'italic',
                        fontFamily: '"Open Sauce", sans-serif'
                      }}
                    >
                      {edu.periodo}
                    </Typography>
                  </Box>
                ))}
                
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontFamily: '"DM Serif Display", serif',
                    mt: 6,
                    mb: 4,
                    fontSize: '1.25rem',
                    position: 'relative',
                    pb: 2,
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: 30,
                      height: 2,
                      bgcolor: '#000'
                    }
                  }}
                >
                  Habilidades
                </Typography>
                
                <Grid container spacing={1}>
                  {cvHighlights.habilidades.map((skill, index) => (
                    <Grid item key={index}>
                      <Chip 
                        label={skill}
                        sx={{ 
                          borderRadius: 0,
                          bgcolor: 'transparent',
                          border: '1px solid #ddd',
                          color: '#000',
                          fontSize: '0.8rem',
                          height: 32,
                          fontFamily: '"Open Sauce", sans-serif'
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            {/* Software e Idiomas */}
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  height: '100%', 
                  bgcolor: '#fff',
                  border: '1px solid',
                  borderColor: '#eee'
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontFamily: '"DM Serif Display", serif',
                    mb: 4,
                    fontSize: '1.25rem',
                    position: 'relative',
                    pb: 2,
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: 30,
                      height: 2,
                      bgcolor: '#000'
                    }
                  }}
                >
                  Software
                </Typography>
                
                <Grid container spacing={1}>
                  {cvHighlights.software.map((sw, index) => (
                    <Grid item xs={6} key={index}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          py: 1,
                          fontSize: '0.9rem',
                          color: '#333',
                          fontFamily: '"Open Sauce", sans-serif'
                        }}
                      >
                        {sw}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
                
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontFamily: '"DM Serif Display", serif',
                    mt: 6,
                    mb: 4,
                    fontSize: '1.25rem',
                    position: 'relative',
                    pb: 2,
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: 30,
                      height: 2,
                      bgcolor: '#000'
                    }
                  }}
                >
                  Idiomas
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {cvHighlights.idiomas.map((idioma, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          color: '#333',
                          fontFamily: '"Open Sauce", sans-serif'
                        }}
                      >
                        {idioma}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Button 
              variant="outlined"
              component={RouterLink}
              to="/resume"
              endIcon={<ArrowIcon />}
              sx={{
                borderRadius: 0,
                borderColor: '#000',
                color: '#000',
                py: 1.5,
                px: 4,
                borderWidth: '1px',
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
              Ver CV completo
            </Button>
          </Box>
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
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ 
              fontFamily: '"DM Serif Display", serif',
              fontWeight: 400,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              mb: 3
            }}
          >
            Trabajemos juntos
          </Typography>
          <Typography 
            variant="body1" 
            paragraph 
            sx={{ 
              maxWidth: 500, 
              mx: 'auto', 
              mb: 5,
              fontSize: '1.1rem',
              lineHeight: 1.7,
              opacity: 0.9,
              fontFamily: '"Open Sauce", sans-serif'
            }}
          >
            Actualmente disponible para proyectos freelance, pasantías y oportunidades de trabajo.
          </Typography>
          <Button
            variant="outlined"
            component={RouterLink}
            to="/contact"
            size="large"
            sx={{
              borderRadius: 0,
              borderColor: '#fff',
              color: '#fff',
              borderWidth: '1px',
              py: 1.5,
              px: 5,
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
        </Container>
      </Box>
    </>
  );
};

export default Home;