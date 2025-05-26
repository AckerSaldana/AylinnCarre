import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import profileImg from '../images/profile.jpg';
import { useProfile } from '../context/ProfileContext';

// Import Google Fonts for handwritten style
import '@fontsource/caveat/400.css';
import '@fontsource/caveat/700.css';
import '@fontsource/kalam/300.css';
import '@fontsource/kalam/400.css';
import '@fontsource/kalam/700.css';
import '@fontsource/architects-daughter/400.css';
import '@fontsource/permanent-marker/400.css';

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { profile, loading, error } = useProfile();
  
  // Default profile data
  const defaultProfile = {
    about: 'Soy una estudiante apasionada por el diseño y las artes visuales.',
    vision: 'Mi visión es crear experiencias significativas a través del diseño.',
    approach: 'Creo en un enfoque holístico del diseño.',
    interests: ['Diseño Industrial', 'Arte Digital', 'Fotografía'],
    activities: ['Proyectos creativos', 'Fotografía', 'Arte'],
    experiences: []
  };
  
  // Use profile from context or default
  const profileData = profile || defaultProfile;
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>
      </Container>
    );
  }
  
  // Datos para la página Sobre Mí
  const aboutData = {
    intro: profileData.about || "Soy Aylinn Carré, estudiante de sexto semestre de la Licenciatura en Diseño en el Tecnológico de Monterrey. Mi enfoque profesional se centra en el diseño industrial y visual, con particular interés en crear soluciones que mejoren la vida cotidiana de las personas.",
    vision: profileData.vision || "Mi visión como diseñadora es crear objetos y experiencias que no solo sean estéticamente atractivos, sino que también resuelvan problemas reales y aporten valor a la sociedad. Creo firmemente que el buen diseño puede transformar la forma en que interactuamos con nuestro entorno y entre nosotros.",
    approach: profileData.approach || "Mi enfoque de diseño se caracteriza por la atención meticulosa a los detalles, la búsqueda de soluciones innovadoras y una estética minimalista pero expresiva. Disfruto explorando la intersección entre la funcionalidad práctica y la belleza visual.",
    experiences: profileData.experiences || [
      {
        title: "Diseño Industrial",
        description: "He desarrollado varios proyectos de diseño de producto, desde floreros funcionales hasta utensilios de cocina inclusivos. Mi trabajo en este campo busca crear objetos útiles que también cuenten una historia a través de su forma y materiales."
      },
      {
        title: "Diseño Visual",
        description: "Mi experiencia en diseño visual incluye la creación de identidades de marca, materiales promocionales y comunicación visual para eventos académicos y corporativos. Me especializo en crear sistemas visuales coherentes que transmitan eficazmente los valores y mensajes del cliente."
      },
      {
        title: "Dirección de Arte",
        description: "Como Directora de Arte en BLUA MEDIA y Set Dresser en producciones cinematográficas, he aprendido a visualizar y materializar conceptos abstractos, coordinando equipos creativos para lograr resultados de alta calidad visual."
      }
    ],
    interests: profileData.interests || [
      "Diseño sostenible",
      "Diseño inclusivo",
      "Innovación de productos",
      "Experiencia de usuario",
      "Dirección de arte",
      "Cultura visual contemporánea"
    ],
    activities: profileData.activities || [
      "Participación en talleres especializados de diseño",
      "Colaboración en proyectos interdisciplinarios",
      "Asistencia a ferias y exposiciones de diseño",
      "Exploración de nuevas técnicas y materiales"
    ]
  };
  
  return (
    <Box sx={{ 
      pt: { xs: 8, md: 10 }, 
      pb: { xs: 10, md: 16 }, 
      bgcolor: '#FAFAFA',
      position: 'relative',
      // Industrial design dotted pattern background
      backgroundImage: `
        radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 10px 10px',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.01) 10px, rgba(0,0,0,0.01) 11px)',
        pointerEvents: 'none'
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.02"/%3E%3C/svg%3E")',
        opacity: 0.03,
        mixBlendMode: 'multiply',
        pointerEvents: 'none'
      }
    }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 12, textAlign: 'center', position: 'relative' }} className="animate-fadeIn">
          {/* Sketch label */}
          <Typography
            sx={{
              position: 'absolute',
              top: -40,
              left: '50%',
              transform: 'translateX(-50%) rotate(-0.5deg)',
              fontSize: '0.7rem',
              fontFamily: '"Caveat", cursive',
              color: '#444',
              letterSpacing: '0.05em',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -2,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(to right, transparent, #444 20%, #444 80%, transparent)',
                transform: 'scaleX(1.2)'
              }
            }}
          >
            Personal Profile
          </Typography>
          
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: '"Permanent Marker", cursive',
              fontWeight: 400,
              fontSize: { xs: '3rem', md: '5rem' },
              mb: 4,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: '#1a1a1a',
              textTransform: 'none',
              position: 'relative',
              transform: 'rotate(-0.3deg)',
              textShadow: '1px 1px 0px rgba(0,0,0,0.05)'
            }}
          >
            Sobre Mí
          </Typography>
          
          {/* Hand-drawn divider */}
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <svg width="200" height="20" style={{ display: 'block', margin: '0 auto' }}>
              <path 
                d="M 10 10 Q 50 8, 100 10 T 190 10" 
                stroke="#333" 
                strokeWidth="1.5" 
                fill="none"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path 
                d="M 12 11 Q 52 9, 102 11 T 188 11" 
                stroke="#333" 
                strokeWidth="0.8" 
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          </Box>
        </Box>
        
        <Grid container spacing={8} alignItems="flex-start">
          {/* Left column - Photo and Interests */}
          <Grid item xs={12} md={5}>
            <Box className="animate-scaleIn delay-200">
              {/* Photo with technical frame */}
              <Box sx={{ position: 'relative', mb: 6 }}>
                <Typography
                  sx={{
                    position: 'absolute',
                    top: -25,
                    left: 0,
                    fontSize: '0.7rem',
                    fontFamily: '"Caveat", cursive',
                    color: '#555',
                    fontStyle: 'italic',
                    transform: 'rotate(-1deg)'
                  }}
                >
                  Portrait Study
                </Typography>
                
                <Box
                  sx={{
                    position: 'relative',
                    filter: 'contrast(1.1) brightness(1.05)',
                    transform: 'rotate(0.2deg)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: -3,
                      border: '1px solid #333',
                      borderRadius: '2px',
                      opacity: 0.6,
                      transform: 'rotate(-0.3deg)'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: -6,
                      border: '1px solid #444',
                      borderRadius: '3px',
                      opacity: 0.3,
                      transform: 'rotate(0.5deg)'
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={profileImg}
                    alt="Aylinn Carré"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      boxShadow: '2px 2px 4px rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.05), 6px 6px 12px rgba(0,0,0,0.03)',
                      filter: 'grayscale(0.1)'
                    }}
                  />
                </Box>
                
              </Box>
              
              {/* Interests Section */}
              <Box sx={{ 
                p: 4,
                mb: 6,
                position: 'relative',
                bgcolor: 'transparent',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  border: '1.5px solid #333',
                  borderRadius: '3px',
                  opacity: 1,
                  transform: 'rotate(0.3deg)'
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: -2,
                  border: '1px solid #444',
                  borderRadius: '4px',
                  opacity: 0.5,
                  transform: 'rotate(-0.2deg)'
                }
              }}>

                
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ 
                    fontFamily: '"Kalam", cursive',
                    fontWeight: 700,
                    mb: 3,
                    fontSize: '1.5rem',
                    letterSpacing: '-0.01em',
                    color: '#1a1a1a',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -5,
                      left: 0,
                      right: '60%',
                      height: '2px',
                      background: 'linear-gradient(to right, #333, transparent)',
                      transform: 'skewY(-0.5deg)'
                    }
                  }}
                >
                  Intereses
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, position: 'relative', zIndex: 1 }}>
                  {aboutData.interests.map((interest, index) => (
                    <Box
                      key={index}
                      sx={{ 
                        px: 2.5,
                        py: 1.25,
                        bgcolor: 'transparent',
                        color: '#333',
                        fontSize: '0.85rem',
                        fontFamily: '"Kalam", cursive',
                        fontWeight: 400,
                        letterSpacing: '0.02em',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          border: '1.5px solid #444',
                          borderRadius: '2px',
                          opacity: 1,
                          transform: 'rotate(0.3deg)'
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: -2,
                          border: '1px solid #555',
                          borderRadius: '3px',
                          opacity: 0.5,
                          transform: 'rotate(-0.4deg)'
                        },
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      {interest}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
          
          {/* Right column - Content */}
          <Grid item xs={12} md={7}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Paper 
                elevation={0} 
                className="animate-fadeIn delay-300"
                sx={{ 
                  p: 6, 
                  bgcolor: 'transparent',
                  borderRadius: 0,
                  flex: '0 1 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative',
                  transform: 'rotate(-0.1deg)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    border: '1.5px solid #333',
                    borderRadius: '3px',
                    opacity: 0.7,
                    transform: 'rotate(0.2deg)'
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: -3,
                    border: '1px solid #444',
                    borderRadius: '4px',
                    opacity: 0.4,
                    transform: 'rotate(-0.3deg)'
                  }
                }}
              >
                <Typography
                  sx={{
                    position: 'absolute',
                    top: -15,
                    left: 20,
                    bgcolor: 'transparent',
                    px: 1,
                    fontSize: '0.65rem',
                    fontFamily: '"Caveat", cursive',
                    color: '#555',
                    fontStyle: 'italic',
                    transform: 'rotate(-0.5deg)'
                  }}
                >
                  About Me
                </Typography>
                
                <Typography 
                  variant="body1" 
                  paragraph
                  sx={{
                    fontFamily: '"Kalam", cursive',
                    fontSize: '1rem',
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: '#2a2a2a',
                    letterSpacing: '0.01em',
                    mb: 3,
                    textAlign: 'justify',
                    textIndent: '1.5em'
                  }}
                >
                  {aboutData.intro}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  paragraph
                  sx={{
                    fontFamily: '"Kalam", cursive',
                    fontSize: '1rem',
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: '#2a2a2a',
                    letterSpacing: '0.01em',
                    mb: 3,
                    textAlign: 'justify',
                    textIndent: '1.5em'
                  }}
                >
                  {aboutData.vision}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  paragraph
                  sx={{
                    fontFamily: '"Kalam", cursive',
                    fontSize: '1rem',
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: '#2a2a2a',
                    letterSpacing: '0.01em',
                    mb: 0,
                    textAlign: 'justify',
                    textIndent: '1.5em'
                  }}
                >
                  {aboutData.approach}
                </Typography>
              </Paper>
            
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                className="animate-fadeIn"
                sx={{
                  fontFamily: '"Permanent Marker", cursive',
                  fontWeight: 400,
                  mt: 10,
                  mb: 5,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  letterSpacing: '-0.01em',
                  textAlign: 'center',
                  position: 'relative',
                  color: '#1a1a1a',
                  transform: 'rotate(-0.2deg)',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '120px',
                    height: '2px',
                    background: 'linear-gradient(to right, transparent, #333 20%, #333 80%, transparent)',
                    borderRadius: '1px'
                  }
                }}
              >
                Áreas de Experiencia
              </Typography>
              
              <Box sx={{ mb: 6 }}>
                {aboutData.experiences.map((exp, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    className={`animate-slideInLeft delay-${index * 100 + 100}`}
                    sx={{
                      p: 5,
                      mb: 4,
                      bgcolor: 'transparent',
                      borderRadius: 0,
                      position: 'relative',
                      overflow: 'visible',
                      transition: 'all 0.3s ease',
                      transform: `rotate(${-0.3 + index * 0.2}deg)`,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        border: '1.5px solid #333',
                        borderRadius: '3px',
                        opacity: 0.7,
                        transform: 'rotate(0.2deg)'
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: -3,
                        border: '1px solid #444',
                        borderRadius: '4px',
                        opacity: 0.4,
                        transform: 'rotate(-0.3deg)'
                      },
                      '&:hover': {
                        transform: `rotate(${-0.3 + index * 0.2}deg) translateY(-2px)`
                      }
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ 
                        fontFamily: '"Kalam", cursive',
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        mb: 2,
                        letterSpacing: '-0.01em',
                        color: '#1a1a1a',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -5,
                          left: 0,
                          width: '40px',
                          height: '1.5px',
                          background: '#333',
                          opacity: 0.5,
                          transform: 'skewY(-0.5deg)'
                        }
                      }}
                    >
                      {exp.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ 
                        fontFamily: '"Kalam", cursive',
                        fontWeight: 300,
                        lineHeight: 1.8,
                        fontSize: '0.95rem',
                        color: '#3a3a3a',
                        textAlign: 'justify'
                      }}
                    >
                      {exp.description}
                    </Typography>
                  </Paper>
                ))}
              </Box>
              
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                className="animate-fadeIn"
                sx={{
                  fontFamily: '"Permanent Marker", cursive',
                  fontWeight: 400,
                  mt: 10,
                  mb: 5,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  letterSpacing: '-0.01em',
                  textAlign: 'center',
                  position: 'relative',
                  color: '#1a1a1a',
                  transform: 'rotate(0.1deg)',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '2px',
                    background: 'linear-gradient(to right, transparent, #333 20%, #333 80%, transparent)',
                    borderRadius: '1px'
                  }
                }}
              >
                Actividades
              </Typography>
              
              <Grid container spacing={3}>
                {aboutData.activities.map((activity, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Paper
                      elevation={0}
                      className={`animate-scaleIn delay-${index * 100 + 200}`}
                      sx={{
                        p: 4,
                        height: '100%',
                        bgcolor: 'transparent',
                        borderRadius: 0,
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        transform: `rotate(${-0.5 + index * 0.3}deg)`,
                        background: `
                          repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 10px,
                            rgba(0,0,0,0.02) 10px,
                            rgba(0,0,0,0.02) 11px
                          ),
                          repeating-linear-gradient(
                            -45deg,
                            transparent,
                            transparent 8px,
                            rgba(0,0,0,0.01) 8px,
                            rgba(0,0,0,0.01) 9px
                          )
                        `,
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          border: '2px solid #444',
                          borderRadius: '2px',
                          opacity: 0.8,
                          transform: `rotate(${0.2 + index * 0.1}deg)`,
                          borderStyle: 'solid',
                          borderWidth: '2px 1.5px 2.5px 2px',
                          borderImage: `linear-gradient(${45 + index * 30}deg, #333, #555, #333) 1`
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: -3,
                          border: '1px solid #555',
                          borderRadius: '3px',
                          opacity: 0.4,
                          transform: `rotate(${-0.3 - index * 0.15}deg)`,
                          borderStyle: 'dashed',
                          borderWidth: '1px 1.5px'
                        },
                        '&:hover': {
                          transform: `rotate(${-0.5 + index * 0.3}deg) translateY(-1px)`,
                          '&::before': {
                            borderWidth: '2.5px 2px 3px 2.5px',
                            opacity: 1
                          }
                        }
                      }}
                    >
                      <Typography 
                        variant="body1"
                        sx={{ 
                          fontFamily: '"Kalam", cursive',
                          fontWeight: 300,
                          lineHeight: 1.7,
                          fontSize: '0.9rem',
                          color: '#2a2a2a',
                          letterSpacing: '0.01em'
                        }}
                      >
                        {activity}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              
              <Box 
                sx={{ 
                  mt: 12, 
                  p: 6, 
                  bgcolor: 'transparent',
                  color: '#1a1a1a',
                  borderRadius: 0,
                  position: 'relative',
                  overflow: 'visible',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    border: '2px solid #333',
                    borderRadius: '4px',
                    opacity: 1,
                    transform: 'rotate(0.3deg)'
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: -4,
                    border: '1px solid #444',
                    borderRadius: '5px',
                    opacity: 0.5,
                    transform: 'rotate(-0.2deg)'
                  }
                }}
              >
                <Typography
                  sx={{
                    position: 'absolute',
                    top: -18,
                    left: 20,
                    bgcolor: 'transparent',
                    color: '#555',
                    px: 1,
                    fontSize: '0.65rem',
                    fontFamily: '"Caveat", cursive',
                    fontStyle: 'italic',
                    transform: 'rotate(-0.4deg)'
                  }}
                >
                  Let's Connect
                </Typography>
                
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontFamily: '"Kalam", cursive',
                    fontWeight: 700,
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    mb: 3,
                    letterSpacing: '-0.01em',
                    color: '#1a1a1a',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '60px',
                      height: '2px',
                      background: '#333',
                      opacity: 0.5,
                      transform: 'skewY(-0.5deg)'
                    }
                  }}
                >
                  ¿Quieres conocer más sobre mi trabajo?
                </Typography>
                <Typography 
                  variant="body1" 
                  paragraph
                  sx={{
                    fontFamily: '"Kalam", cursive',
                    fontWeight: 300,
                    lineHeight: 1.8,
                    fontSize: '0.95rem',
                    color: '#3a3a3a',
                    mb: 4
                  }}
                >
                  Explora mi portafolio para ver proyectos detallados o revisa mi CV para una visión completa de mi trayectoria.
                </Typography>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={3} 
                  sx={{ mt: 2, position: 'relative', zIndex: 2 }}
                >
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/"
                    sx={{
                      borderRadius: '3px',
                      color: '#fff',
                      bgcolor: '#333',
                      borderColor: '#333',
                      borderWidth: '2px',
                      py: 1.5,
                      px: 4,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      fontFamily: '"Kalam", cursive',
                      fontWeight: 400,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      transform: 'rotate(-0.2deg)',
                      zIndex: 10,
                      textDecoration: 'none',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: -2,
                        border: '1px solid #444',
                        borderRadius: '4px',
                        opacity: 0.3,
                        transform: 'rotate(0.4deg)',
                        zIndex: -1
                      },
                      '&:hover': {
                        bgcolor: '#222',
                        borderColor: '#222',
                        transform: 'rotate(-0.2deg) translateY(-2px)',
                        color: '#fff',
                        textDecoration: 'none'
                      }
                    }}
                  >
                    Ver Proyectos →
                  </Button>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/resume"
                    sx={{
                      borderRadius: '3px',
                      color: '#fff',
                      bgcolor: '#333',
                      borderColor: '#333',
                      borderWidth: '2px',
                      py: 1.5,
                      px: 4,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      fontFamily: '"Kalam", cursive',
                      fontWeight: 400,
                      transition: 'all 0.3s ease',
                      transform: 'rotate(0.3deg)',
                      position: 'relative',
                      zIndex: 10,
                      textDecoration: 'none',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: -2,
                        border: '1px solid #444',
                        borderRadius: '4px',
                        opacity: 0.3,
                        transform: 'rotate(-0.4deg)',
                        zIndex: -1
                      },
                      '&:hover': {
                        bgcolor: '#222',
                        borderColor: '#222',
                        transform: 'rotate(0.3deg) translateY(-2px)',
                        color: '#fff',
                        textDecoration: 'none'
                      }
                    }}
                  >
                    Ver CV Completo →
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Add sketch filter styles */}
      <style jsx global>{`
        .sketch-border {
          filter: url(#roughPaper);
        }
        
        @keyframes subtle-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-0.5px); }
          75% { transform: translateX(0.5px); }
        }
      `}</style>
      
      {/* SVG Filter for sketch effect */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="roughPaper">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
        </filter>
      </svg>
    </Box>
  );
};

export default About;