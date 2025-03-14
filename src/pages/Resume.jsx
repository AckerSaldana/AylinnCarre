import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Divider,
  Stack,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  useTheme,
  useMediaQuery,
  Avatar,
  LinearProgress
} from '@mui/material';
import {
  School as SchoolIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  Brush as BrushIcon,
  Language as LanguageIcon,
  Download as DownloadIcon,
  Circle as CircleIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

const Resume = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Datos del CV basados en el PDF
  const cvData = {
    personal: {
      name: 'Aylinn Carré',
      title: 'Estudiante de Diseño',
      location: 'Monterrey, Nuevo León',
      email: 'aylinniglerre@gmail.com',
      phone: '232 379 64 17',
      about: 'Estudiante de sexto semestre de Diseño, apasionada del arte y las industrias creativas.'
    },
    education: [
      {
        title: 'Lic. en Diseño',
        institution: 'Tecnológico de Monterrey',
        period: '2022 - Actualidad'
      }
    ],
    experience: [
      {
        title: 'On Campus Intern',
        company: 'Departamento de Comunicación',
        details: 'Escuela de Ingeniería y Ciencias Tecnológico de Monterrey',
        period: 'Febrero 2024 - Actualidad'
      },
      {
        title: 'Directora de Marketing',
        company: 'Grupo estudiantil "SACBÉ"',
        period: 'Febrero 2025'
      },
      {
        title: 'Taller "From Object to Context: A Graphic Journey"',
        company: 'con Maya Kopytman y Gabriela Mirensky',
        period: 'Noviembre 2024'
      },
      {
        title: 'Taller "Plant-Based"',
        company: 'con Henry Julier',
        period: 'Marzo 2024'
      },
      {
        title: 'Compañía de staff técnico, producción y diseño',
        company: 'Auditorio Luis Elizondo Tec de Monterrey',
        period: 'Agosto 2023 - Actualidad'
      },
      {
        title: 'Directora de Arte "Inercia"',
        company: 'BLUA MEDIA',
        period: 'Febrero - Diciembre 2023'
      },
      {
        title: 'Set Dresser Largometraje "LALI"',
        company: 'Lotería Producciones',
        period: 'Agosto - Diciembre 2022'
      }
    ],
    skills: [
      { name: 'Liderazgo', level: 95 },
      { name: 'Creatividad', level: 98 },
      { name: 'Adaptabilidad', level: 90 },
      { name: 'Eficiencia', level: 85 },
      { name: 'Atención a los detalles', level: 92 },
      { name: 'Perseverancia', level: 88 }
    ],
    software: [
      { name: 'Photoshop', level: 90 },
      { name: 'Illustrator', level: 95 },
      { name: 'Lightroom', level: 85 },
      { name: 'Canva', level: 95 },
      { name: 'Fusion 360', level: 80 },
      { name: 'AutoCad', level: 75 },
      { name: 'SketchUp', level: 85 },
      { name: 'KeyShot', level: 78 }
    ],
    languages: [
      {
        language: 'Español',
        level: 'Nativo',
        percentage: 100
      },
      {
        language: 'Inglés',
        level: 'Intermedio',
        percentage: 75
      },
      {
        language: 'Francés',
        level: 'Básico',
        percentage: 40
      }
    ]
  };
  
  return (
    <Box 
      sx={{ 
        pt: 10, 
        pb: 12,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #eef1f5 100%)'
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box 
          sx={{ 
            mb: 6, 
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: '"DM Serif Display", serif',
              fontWeight: 400,
              fontSize: '3.5rem',
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 3,
                bgcolor: 'black'
              }
            }}
          >
            Curriculum Vitae
          </Typography>
          
          <Box sx={{ mt: 5 }}>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{
                mt: 2,
                bgcolor: 'black',
                color: 'white',
                py: 1.5,
                px: 4,
                borderRadius: 0,
                textTransform: 'none',
                fontFamily: '"Open Sauce", sans-serif',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#333',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
              }}
            >
              Descargar CV
            </Button>
          </Box>
        </Box>
        
        <Grid container spacing={4}>
          {/* Left column - Main info */}
          <Grid item xs={12} md={8}>
            {/* Personal Information */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 0, 
                mb: 4,
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                position: 'relative'
              }}
            >
            
              
              <Box sx={{ 
                p: 4, 
                pt: 0, 
                mt: '40px',
                position: 'relative', 
                zIndex: 1,
                backgroundColor: 'white'
              }}>
                <Avatar
                  src="src/images/profile.jpg"
                  alt="Aylinn Carré"
                  sx={{
                    width: 160,
                    height: 160,
                    mb: 3,
                    border: '5px solid white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                />
                
                <Box>
                  <Typography
                    variant="h3"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontFamily: '"DM Serif Display", serif',
                      fontWeight: 400,
                      fontSize: '2.5rem'
                    }}
                  >
                    {cvData.personal.name}
                  </Typography>
                  
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'text.secondary',
                      fontFamily: '"Open Sauce", sans-serif',
                      fontWeight: 400,
                      fontSize: '1.25rem',
                      mb: 2.5
                    }}
                  >
                    {cvData.personal.title}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    paragraph
                    sx={{
                      fontFamily: '"Open Sauce", sans-serif',
                      fontSize: '1.1rem',
                      lineHeight: 1.8,
                      color: '#555',
                      maxWidth: 600,
                      mb: 3
                    }}
                  >
                    {cvData.personal.about}
                  </Typography>
                  
                  <Stack 
                    direction="row" 
                    spacing={4} 
                    flexWrap="wrap" 
                    useFlexGap
                    sx={{ mb: 1 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon sx={{ color: 'black', mr: 1, fontSize: 20 }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#555',
                          fontFamily: '"Open Sauce", sans-serif'
                        }}
                      >
                        {cvData.personal.email}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneIcon sx={{ color: 'black', mr: 1, fontSize: 20 }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#555',
                          fontFamily: '"Open Sauce", sans-serif'
                        }}
                      >
                        {cvData.personal.phone}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationIcon sx={{ color: 'black', mr: 1, fontSize: 20 }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#555',
                          fontFamily: '"Open Sauce", sans-serif'
                        }}
                      >
                        {cvData.personal.location}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Paper>
            
            {/* Experience */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                mb: 4,
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 4
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <WorkIcon sx={{ color: 'white' }} />
                </Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontFamily: '"DM Serif Display", serif',
                    fontWeight: 400,
                    fontSize: '1.75rem'
                  }}
                >
                  Experiencia
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 4 }} />
              
              <Grid container spacing={3}>
                {cvData.experience.map((exp, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Paper
                      elevation={0}
                      sx={{ 
                        p: 3, 
                        height: '100%',
                        border: '1px solid #f0f0f0',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 12px 20px rgba(0,0,0,0.06)'
                        }
                      }}
                    >
                      <Typography 
                        variant="subtitle1" 
                        sx={{
                          fontWeight: 600,
                          fontFamily: '"Open Sauce", sans-serif',
                          fontSize: '1.1rem',
                          mb: 1.5
                        }}
                      >
                        {exp.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        sx={{
                          color: '#555',
                          fontFamily: '"Open Sauce", sans-serif',
                          mb: 1
                        }}
                      >
                        {exp.company}
                      </Typography>
                      
                      {exp.details && (
                        <Typography 
                          variant="body2" 
                          sx={{
                            color: '#666',
                            fontFamily: '"Open Sauce", sans-serif',
                            mb: 1
                          }}
                        >
                          {exp.details}
                        </Typography>
                      )}
                      
                      <Chip
                        label={exp.period}
                        size="small"
                        sx={{ 
                          mt: 1.5,
                          bgcolor: '#f5f5f5',
                          fontFamily: '"Open Sauce", sans-serif',
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
            
            {/* Education */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4,
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 4
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <SchoolIcon sx={{ color: 'white' }} />
                </Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontFamily: '"DM Serif Display", serif',
                    fontWeight: 400,
                    fontSize: '1.75rem'
                  }}
                >
                  Educación
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 4 }} />
              
              {cvData.education.map((edu, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    mb: index !== cvData.education.length - 1 ? 3 : 0,
                    border: '1px solid #f0f0f0',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{
                          fontWeight: 600,
                          fontFamily: '"Open Sauce", sans-serif',
                          fontSize: '1.1rem',
                          mb: 1
                        }}
                      >
                        {edu.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        sx={{
                          color: '#555',
                          fontFamily: '"Open Sauce", sans-serif'
                        }}
                      >
                        {edu.institution}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                      <Chip
                        label={edu.period}
                        size="small"
                        sx={{ 
                          mt: { xs: 1, md: 1.5 },
                          bgcolor: '#f5f5f5',
                          fontFamily: '"Open Sauce", sans-serif',
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Paper>
          </Grid>
          
          {/* Right column - Skills and details */}
          <Grid item xs={12} md={4}>
            {/* Skills */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                mb: 4,
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 4
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <BrushIcon sx={{ color: 'white' }} />
                </Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontFamily: '"DM Serif Display", serif',
                    fontWeight: 400,
                    fontSize: '1.75rem'
                  }}
                >
                  Habilidades
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 4 }} />
              
              <Box sx={{ px: 1 }}>
                {cvData.skills.map((skill, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography 
                        variant="body2" 
                        sx={{
                          fontWeight: 500,
                          fontFamily: '"Open Sauce", sans-serif'
                        }}
                      >
                        {skill.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{
                          color: '#666',
                          fontFamily: '"Open Sauce", sans-serif'
                        }}
                      >
                        {skill.level}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={skill.level} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        bgcolor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: 'black'
                        }
                      }} 
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
            
            {/* Software */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                mb: 4,
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 4
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <CodeIcon sx={{ color: 'white' }} />
                </Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontFamily: '"DM Serif Display", serif',
                    fontWeight: 400,
                    fontSize: '1.75rem'
                  }}
                >
                  Software
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 4 }} />
              
              <Box sx={{ px: 1 }}>
                {cvData.software.map((sw, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography 
                        variant="body2" 
                        sx={{
                          fontWeight: 500,
                          fontFamily: '"Open Sauce", sans-serif'
                        }}
                      >
                        {sw.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{
                          color: '#666',
                          fontFamily: '"Open Sauce", sans-serif'
                        }}
                      >
                        {sw.level}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={sw.level} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        bgcolor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: 'black'
                        }
                      }} 
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
            
            {/* Languages */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4,
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 4
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <LanguageIcon sx={{ color: 'white' }} />
                </Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontFamily: '"DM Serif Display", serif',
                    fontWeight: 400,
                    fontSize: '1.75rem'
                  }}
                >
                  Idiomas
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 4 }} />
              
              <Box sx={{ px: 1 }}>
                {cvData.languages.map((lang, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography 
                        variant="body2" 
                        sx={{
                          fontWeight: 500,
                          fontFamily: '"Open Sauce", sans-serif'
                        }}
                      >
                        {lang.language}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{
                          color: '#666',
                          fontFamily: '"Open Sauce", sans-serif'
                        }}
                      >
                        {lang.level}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={lang.percentage} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        bgcolor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: 'black'
                        }
                      }} 
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Resume;