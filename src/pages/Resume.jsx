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
  useMediaQuery
} from '@mui/material';
import {
  School as SchoolIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  Brush as BrushIcon,
  Language as LanguageIcon,
  Download as DownloadIcon,
  Circle as CircleIcon
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
    languages: [
      {
        language: 'Español',
        level: 'Nativo'
      },
      {
        language: 'Inglés',
        level: 'Intermedio'
      },
      {
        language: 'Francés',
        level: 'Básico'
      }
    ]
  };
  
  return (
    <Box sx={{ pt: 10, pb: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700
            }}
          >
            Curriculum Vitae
          </Typography>
          
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{
              mt: 2,
              borderColor: 'text.primary',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'text.primary',
                color: 'background.paper'
              }
            }}
          >
            Descargar CV
          </Button>
        </Box>
        
        <Grid container spacing={4}>
          {/* Left column - Main info */}
          <Grid item xs={12} md={8}>
            {/* Personal Information */}
            <Paper elevation={0} sx={{ p: 4, mb: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4, alignItems: { xs: 'flex-start', sm: 'center' } }}>
                <Box
                  component="img"
                  src="src/images/profile.jpg"
                  alt="Aylinn Carré"
                  sx={{
                    width: 150,
                    height: 150,
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '4px solid',
                    borderColor: 'grey.200'
                  }}
                />
                
                <Box>
                  <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700
                    }}
                  >
                    {cvData.personal.name}
                  </Typography>
                  
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {cvData.personal.title}
                  </Typography>
                  
                  <Typography variant="body1" paragraph>
                    {cvData.personal.about}
                  </Typography>
                  
                  <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                    <Typography variant="body2" color="text.secondary">
                      {cvData.personal.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cvData.personal.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cvData.personal.location}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Paper>
            
            {/* Experience */}
            <Paper elevation={0} sx={{ p: 4, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <WorkIcon sx={{ color: 'text.primary', mr: 2 }} />
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600
                  }}
                >
                  Experiencia
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={4}>
                {cvData.experience.map((exp, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box 
                      sx={{ 
                        mb: 2, 
                        p: 2, 
                        border: '1px solid', 
                        borderColor: 'divider',
                        height: '100%'
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        {exp.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {exp.company}
                      </Typography>
                      {exp.details && (
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {exp.details}
                        </Typography>
                      )}
                      <Typography variant="caption" color="text.disabled">
                        {exp.period}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
            
            {/* Education */}
            <Paper elevation={0} sx={{ p: 4, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <SchoolIcon sx={{ color: 'text.primary', mr: 2 }} />
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600
                  }}
                >
                  Educación
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              {cvData.education.map((edu, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {edu.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {edu.institution}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {edu.period}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
          
          {/* Right column - Skills and details */}
          <Grid item xs={12} md={4}>
            {/* Skills */}
            <Paper elevation={0} sx={{ p: 4, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <BrushIcon sx={{ color: 'text.primary', mr: 2 }} />
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600
                  }}
                >
                  Habilidades
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              <List disablePadding>
                {cvData.skills.map((skill, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CircleIcon sx={{ fontSize: 8, color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText primary={skill} />
                  </ListItem>
                ))}
              </List>
            </Paper>
            
            {/* Software */}
            <Paper elevation={0} sx={{ p: 4, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CodeIcon sx={{ color: 'text.primary', mr: 2 }} />
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600
                  }}
                >
                  Software
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {cvData.software.map((software, index) => (
                  <Chip
                    key={index}
                    label={software}
                    variant="outlined"
                    sx={{
                      borderColor: 'text.primary',
                      color: 'text.primary'
                    }}
                  />
                ))}
              </Stack>
            </Paper>
            
            {/* Languages */}
            <Paper elevation={0} sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LanguageIcon sx={{ color: 'text.primary', mr: 2 }} />
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600
                  }}
                >
                  Idiomas
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              <List disablePadding>
                {cvData.languages.map((lang, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                    <ListItemText 
                      primary={lang.language} 
                      secondary={lang.level}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Resume;