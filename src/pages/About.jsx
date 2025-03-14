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
import { getProfile } from '../firebase/profileService'; // Importar el servicio

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    about: '',
    vision: '',
    approach: '',
    interests: [],
    activities: [],
    experiences: []
  });
  
  // Cargar datos del perfil desde Firebase
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const data = await getProfile();
        setProfileData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("No se pudo cargar la información del perfil. Por favor, intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);
  
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
    <Box sx={{ pt: { xs: 10, md: 12 }, pb: 8, bgcolor: '#FAFAFA' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: '"DM Serif Display", serif',
              fontWeight: 400,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 3,
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 40,
                height: 2,
                bgcolor: '#000'
              }
            }}
          >
            Sobre mí
          </Typography>
        </Box>
        
        <Grid container spacing={8}>
          {/* Left column - Photo and Interests */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <Box
                component="img"
                src={profileImg}
                alt="Aylinn Carré"
                sx={{
                  width: '100%',
                  height: 'auto',
                  mb: 5,
                  boxShadow: '20px 20px 0px rgba(0,0,0,0.05)'
                }}
              />
              
              <Typography
                variant="h5"
                gutterBottom
                sx={{ 
                  fontFamily: '"DM Serif Display", serif',
                  fontWeight: 400,
                  mb: 3,
                  position: 'relative',
                  display: 'inline-block',
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
                Intereses
              </Typography>
              
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mb: 5 }}>
                {aboutData.interests.map((interest, index) => (
                  <Chip 
                    key={index} 
                    label={interest}
                    sx={{ 
                      borderRadius: 0,
                      bgcolor: 'transparent',
                      border: '1px solid #000',
                      color: '#000',
                      fontSize: '0.8rem',
                      height: 32,
                      fontFamily: '"Open Sauce", sans-serif',
                      my: 0.5
                    }}
                  />
                ))}
              </Stack>
              
              <Button
                variant="contained"
                component={RouterLink}
                to="/contact"
                endIcon={<ArrowForwardIcon />}
                size="large"
                sx={{
                  bgcolor: '#000',
                  color: '#fff',
                  borderRadius: 0,
                  py: 1.5,
                  px: 4,
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
            </Box>
          </Grid>
          
          {/* Right column - Content */}
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 5, 
                mb: 6, 
                bgcolor: '#fff',
                border: '1px solid',
                borderColor: '#eee'
              }}
            >
              <Typography 
                variant="body1" 
                paragraph
                sx={{
                  fontFamily: '"Open Sauce", sans-serif',
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  color: '#333'
                }}
              >
                {aboutData.intro}
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph
                sx={{
                  fontFamily: '"Open Sauce", sans-serif',
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  color: '#333'
                }}
              >
                {aboutData.vision}
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph
                sx={{
                  fontFamily: '"Open Sauce", sans-serif',
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  color: '#333',
                  mb: 0
                }}
              >
                {aboutData.approach}
              </Typography>
            </Paper>
            
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                fontFamily: '"DM Serif Display", serif',
                fontWeight: 400,
                mt: 8,
                mb: 3,
                fontSize: '1.8rem',
                position: 'relative',
                display: 'inline-block',
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
              Áreas de experiencia
            </Typography>
            
            <Box sx={{ mb: 6 }}>
              {aboutData.experiences.map((exp, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 4,
                    mb: 3,
                    borderLeft: '3px solid',
                    borderColor: '#000',
                    bgcolor: '#fff',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(4px)',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.06)'
                    }
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ 
                      fontFamily: '"DM Serif Display", serif',
                      fontWeight: 400,
                      fontSize: '1.4rem'
                    }}
                  >
                    {exp.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      fontFamily: '"Open Sauce", sans-serif',
                      lineHeight: 1.7,
                      fontSize: '1rem'
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
              sx={{
                fontFamily: '"DM Serif Display", serif',
                fontWeight: 400,
                mt: 8,
                mb: 3,
                fontSize: '1.8rem',
                position: 'relative',
                display: 'inline-block',
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
              Actividades
            </Typography>
            
            <Grid container spacing={3}>
              {aboutData.activities.map((activity, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      bgcolor: '#fff',
                      border: '1px solid',
                      borderColor: '#eee',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.06)'
                      }
                    }}
                  >
                    <Typography 
                      variant="body1"
                      sx={{ 
                        fontFamily: '"Open Sauce", sans-serif',
                        lineHeight: 1.6
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
                mt: 8, 
                p: 5, 
                bgcolor: '#000', 
                color: '#fff'
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontFamily: '"DM Serif Display", serif',
                  fontWeight: 400,
                  fontSize: '1.6rem'
                }}
              >
                ¿Quieres conocer más sobre mi trabajo?
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{
                  fontFamily: '"Open Sauce", sans-serif',
                  lineHeight: 1.7,
                  fontSize: '1.05rem',
                  opacity: 0.9,
                  mb: 4
                }}
              >
                Explora mi portafolio para ver proyectos detallados o revisa mi CV para una visión completa de mi trayectoria.
              </Typography>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={3} 
                sx={{ mt: 2 }}
              >
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to="/"
                  sx={{
                    borderRadius: 0,
                    color: '#fff',
                    borderColor: '#fff',
                    borderWidth: '1px',
                    py: 1.5,
                    px: 4,
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
                  Ver proyectos
                </Button>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to="/resume"
                  sx={{
                    borderRadius: 0,
                    color: '#fff',
                    borderColor: '#fff',
                    borderWidth: '1px',
                    py: 1.5,
                    px: 4,
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
                  Ver CV completo
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;