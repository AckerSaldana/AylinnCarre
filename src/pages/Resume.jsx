import React, { useState, useEffect } from 'react';
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
  LinearProgress,
  CircularProgress,
  Alert
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
import profileImg from '../images/profile.jpg';
import { getProfile } from '../firebase/profileService'; // Importar el servicio

// Import Google Fonts
import '@fontsource/permanent-marker';
import '@fontsource/kalam/300.css';
import '@fontsource/kalam/400.css';
import '@fontsource/kalam/700.css';
import '@fontsource/caveat/400.css';
import '@fontsource/caveat/700.css';

// Custom sketchy border component
const SketchyBorder = ({ children, sx = {}, rotation = 0 }) => (
  <Box
    sx={{
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: -2,
        left: -2,
        right: -2,
        bottom: -2,
        border: '2px solid #333',
        borderRadius: '8px 12px 10px 15px',
        transform: `rotate(${rotation}deg)`,
        opacity: 0.8,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: -1,
        left: -1,
        right: -1,
        bottom: -1,
        border: '1.5px solid #555',
        borderRadius: '12px 8px 15px 10px',
        transform: `rotate(${-rotation * 0.5}deg)`,
        opacity: 0.6,
      },
      ...sx
    }}
  >
    {children}
  </Box>
);

// Sketchy section number component
const SketchyNumber = ({ number, rotation = -5 }) => (
  <Box
    sx={{
      position: 'absolute',
      top: -20,
      left: -20,
      width: 50,
      height: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: `rotate(${rotation}deg)`,
      zIndex: 10
    }}
  >
    <svg width="50" height="50" viewBox="0 0 50 50">
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="#333"
        strokeWidth="2"
        strokeDasharray="0"
        opacity="0.8"
      />
      <circle
        cx="26"
        cy="24"
        r="19"
        fill="none"
        stroke="#333"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
    <Typography
      sx={{
        position: 'absolute',
        fontFamily: '"Permanent Marker", cursive',
        fontSize: '1.5rem',
        fontWeight: 400,
        color: '#333'
      }}
    >
      {number}
    </Typography>
  </Box>
);

// Sketchy arrow component
const SketchyArrow = ({ direction = 'right', sx = {} }) => (
  <Box sx={{ display: 'inline-block', ...sx }}>
    <svg width="40" height="20" viewBox="0 0 40 20">
      {direction === 'right' && (
        <path
          d="M 5 10 Q 15 9, 25 10 L 22 7 M 25 10 L 22 13"
          stroke="#333"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      )}
      {direction === 'down' && (
        <path
          d="M 20 5 Q 19 10, 20 15 L 17 12 M 20 15 L 23 12"
          stroke="#333"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      )}
    </svg>
  </Box>
);

// Sketchy background pattern component
const SketchyBackground = ({ variant = 'dots' }) => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.03,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}
  >
    {variant === 'dots' && (
      <svg width="100%" height="100%">
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#333" />
          <circle cx="12" cy="12" r="1" fill="#333" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    )}
    {variant === 'lines' && (
      <svg width="100%" height="100%">
        <pattern id="lines" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 0 15 Q 10 14, 20 15 T 30 15" stroke="#333" strokeWidth="0.5" fill="none" />
          <path d="M 15 0 Q 14 10, 15 20 T 15 30" stroke="#333" strokeWidth="0.5" fill="none" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#lines)" />
      </svg>
    )}
  </Box>
);

// Simple pencil-style progress bar with rougher edges
const PencilProgressBar = ({ value, height = 12 }) => (
  <Box sx={{ position: 'relative', width: '100%', height: height + 4 }}>
    {/* Background sketch */}
    <svg width="100%" height={height + 4} style={{ position: 'absolute', top: 0, left: 0 }}>
      <path
        d={`M 2 ${height/2} Q 10 ${height/2-1}, 30 ${height/2} T 70 ${height/2} T 130 ${height/2} T 190 ${height/2} T 250 ${height/2} T 98% ${height/2}
             L 98% ${height/2+height/2} Q 90% ${height/2+height/2+1}, 70% ${height/2+height/2} T 30% ${height/2+height/2} T 2 ${height/2+height/2} Z`}
        fill="none"
        stroke="#333"
        strokeWidth="1.5"
        opacity="0.8"
      />
    </svg>
    
    {/* Filled progress with sketch-like black fill */}
    <Box
      sx={{
        position: 'absolute',
        top: 2,
        left: 2,
        width: `calc(${value}% - 4px)`,
        height: height - 4,
        overflow: 'hidden',
        borderRadius: '1px',
        bgcolor: '#000',
        opacity: 0.85,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 1px,
              rgba(255,255,255,0.1) 1px,
              rgba(255,255,255,0.1) 2px
            ),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 1px,
              rgba(255,255,255,0.05) 1px,
              rgba(255,255,255,0.05) 2px
            )
          `,
          mixBlendMode: 'overlay'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          right: -1,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '3px',
          height: '80%',
          background: 'linear-gradient(to right, rgba(0,0,0,0.3), transparent)'
        }
      }}
    />
  </Box>
);

// Sketchy donut progress bar component
const DonutProgressBar = ({ value, size = 100 }) => {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle - rough */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#333"
          strokeWidth="2"
          opacity="0.3"
          strokeDasharray="5 3 2 3"
        />
        {/* Second background circle - rougher */}
        <circle
          cx={size / 2 + 1}
          cy={size / 2 - 1}
          r={radius - 1}
          fill="none"
          stroke="#333"
          strokeWidth="1"
          opacity="0.2"
        />
        {/* Progress circle with sketchy fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#000"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          opacity="0.85"
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out',
            filter: 'url(#roughPaper)'
          }}
        />
        {/* Inner rough edge */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - 4}
          fill="none"
          stroke="#000"
          strokeWidth="1"
          strokeDasharray={`${circumference * 0.98}`}
          strokeDashoffset={strokeDashoffset * 0.98}
          opacity="0.3"
        />
        {/* Sketchy texture filter */}
        <defs>
          <filter id="roughPaper">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="5" result="turbulence" seed="1" />
            <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      {/* Center text */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Permanent Marker", cursive',
            fontSize: size * 0.22,
            fontWeight: 400,
            color: '#333'
          }}
        >
          {value}%
        </Typography>
      </Box>
    </Box>
  );
};

// Hand-drawn divider component (like in About.jsx)
const HandDrawnDivider = () => (
  <Box sx={{ mb: 4, mt: 1 }}>
    <svg width="100%" height="20" style={{ display: 'block', maxWidth: '300px' }}>
      <path 
        d="M 5 10 Q 30 8, 60 10 T 120 10 T 180 10 T 240 10 T 295 10" 
        stroke="#333" 
        strokeWidth="1.5" 
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path 
        d="M 7 11 Q 32 9, 62 11 T 122 11 T 182 11 T 242 11 T 293 11" 
        stroke="#333" 
        strokeWidth="0.8" 
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  </Box>
);

const Resume = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({});
  
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
        setError("No se pudo cargar la información del CV. Por favor, intenta de nuevo más tarde.");
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
  
  // Datos del CV basados en Firebase o valores predeterminados
  const cvData = {
    personal: {
      name: profileData.name || 'Aylinn Carré',
      title: profileData.title || 'Estudiante de Diseño',
      location: profileData.location || 'Monterrey, Nuevo León',
      email: profileData.email || 'aylinniglerre@gmail.com',
      phone: profileData.phone || '232 379 64 17',
      about: profileData.about || 'Estudiante de sexto semestre de Diseño, apasionada del arte y las industrias creativas.'
    },
    education: profileData.education || [
      {
        title: 'Lic. en Diseño',
        institution: 'Tecnológico de Monterrey',
        period: '2022 - Actualidad'
      }
    ],
    experience: profileData.experience || [
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
    skills: profileData.skills || [
      { name: 'Liderazgo', level: 95 },
      { name: 'Creatividad', level: 98 },
      { name: 'Adaptabilidad', level: 90 },
      { name: 'Eficiencia', level: 85 },
      { name: 'Atención a los detalles', level: 92 },
      { name: 'Perseverancia', level: 88 }
    ],
    software: profileData.software || [
      { name: 'Photoshop', level: 90 },
      { name: 'Illustrator', level: 95 },
      { name: 'Lightroom', level: 85 },
      { name: 'Canva', level: 95 },
      { name: 'Fusion 360', level: 80 },
      { name: 'AutoCad', level: 75 },
      { name: 'SketchUp', level: 85 },
      { name: 'KeyShot', level: 78 }
    ],
    languages: profileData.languages || [
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
        position: 'relative',
        backgroundImage: `
          radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px',
        backgroundColor: '#fafafa',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 50,
          right: 50,
          width: 100,
          height: 100,
          background: 'radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)',
          backgroundSize: '10px 10px',
          transform: 'rotate(15deg)',
          borderRadius: '50%'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 100,
          left: 30,
          width: 150,
          height: 150,
          background: 'radial-gradient(circle, rgba(0,0,0,0.015) 1px, transparent 1px)',
          backgroundSize: '15px 15px',
          transform: 'rotate(-10deg)',
          borderRadius: '40% 60% 60% 40%'
        }
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
              fontFamily: '"Permanent Marker", cursive',
              fontWeight: 400,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              position: 'relative',
              display: 'inline-block',
              transform: 'rotate(-1deg)',
              mb: 3,
            }}
          >
            Experiencia y Habilidades
          </Typography>
          
          {/* Hand-drawn divider */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <svg width="300" height="20" style={{ display: 'block' }}>
              <path 
                d="M 10 10 Q 50 8, 100 10 T 190 10 T 290 10" 
                stroke="#333" 
                strokeWidth="2" 
                fill="none"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path 
                d="M 12 11 Q 52 9, 102 11 T 192 11 T 288 11" 
                stroke="#333" 
                strokeWidth="1" 
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          </Box>
          
          {/* Subtitle with arrow */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 4 }}>
            <SketchyArrow direction="right" />
            <Typography
              sx={{
                fontFamily: '"Caveat", cursive',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#555',
                transform: 'rotate(1deg)'
              }}
            >
              Mi trayectoria profesional
            </Typography>
            <SketchyArrow direction="right" sx={{ transform: 'scaleX(-1)' }} />
          </Box>
          
        </Box>
        
        {/* Experience Section - Full Width */}
        <Box sx={{ mb: 6, position: 'relative' }}>
          <SketchyNumber number="01" rotation={-8} />
          <SketchyBorder rotation={0.2}>
            <Box 
              sx={{ 
                p: { xs: 3, md: 5 },
                bgcolor: 'rgba(255,255,255,0.9)',
                borderRadius: '6px 8px 7px 9px',
                position: 'relative'
              }}
            >
              <SketchyBackground variant="dots" />
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3,
                  position: 'relative'
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
                    mr: 2,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: 45,
                      height: 45,
                      border: '1.5px solid #333',
                      borderRadius: '50%',
                      top: -2.5,
                      left: -2.5,
                      transform: 'rotate(15deg)',
                      opacity: 0.3
                    }
                  }}
                >
                  <WorkIcon sx={{ color: 'white' }} />
                </Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontFamily: '"Permanent Marker", cursive',
                    fontWeight: 400,
                    fontSize: { xs: '1.5rem', md: '1.75rem' },
                    transform: 'rotate(-0.5deg)'
                  }}
                >
                  Experiencia Profesional
                </Typography>
              </Box>
              <HandDrawnDivider />
              
              <Grid container spacing={3}>
                {cvData.experience.map((exp, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <SketchyBorder rotation={index % 2 === 0 ? 0.3 : -0.3}>
                      <Box
                        sx={{ 
                          p: 3, 
                          height: '100%',
                          bgcolor: index % 3 === 0 ? 'rgba(255,255,255,0.6)' : index % 3 === 1 ? 'rgba(250,250,250,0.6)' : 'rgba(245,245,245,0.6)',
                          borderRadius: '4px 6px 5px 7px',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            transform: 'rotate(0.5deg) translateY(-2px)',
                            bgcolor: 'rgba(255,255,255,0.8)',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: -50,
                            right: -50,
                            width: 100,
                            height: 100,
                            background: 'radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)',
                            backgroundSize: '5px 5px',
                            transform: 'rotate(45deg)',
                            borderRadius: '50%'
                          }
                        }}
                      >
                      <Typography 
                        variant="subtitle1" 
                        sx={{
                          fontWeight: 700,
                          fontFamily: '"Kalam", cursive',
                          fontSize: '1.2rem',
                          mb: 1.5,
                          transform: 'rotate(-0.3deg)',
                          position: 'relative',
                          '&::before': {
                            content: '"→"',
                            position: 'absolute',
                            left: -25,
                            top: '50%',
                            transform: 'translateY(-50%) rotate(-5deg)',
                            fontSize: '1.5rem',
                            opacity: 0.3
                          }
                        }}
                      >
                        {exp.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        sx={{
                          color: '#555',
                          fontFamily: '"Kalam", cursive',
                          mb: 1,
                          fontSize: '1rem'
                        }}
                      >
                        {exp.company}
                      </Typography>
                      
                      {exp.details && (
                        <Typography 
                          variant="body2" 
                          sx={{
                            color: '#666',
                            fontFamily: '"Kalam", cursive',
                            mb: 1,
                            fontSize: '0.95rem'
                          }}
                        >
                          {exp.details}
                        </Typography>
                      )}
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
                        <Chip
                          label={exp.period}
                          size="small"
                          sx={{ 
                            bgcolor: 'transparent',
                            border: '1.5px solid #333',
                            borderRadius: '3px 5px 4px 6px',
                            fontFamily: '"Caveat", cursive',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            transform: 'rotate(0.5deg)',
                            '&:hover': {
                              bgcolor: 'rgba(0,0,0,0.05)'
                            }
                          }}
                        />
                        {index === 0 && (
                          <Typography
                            sx={{
                              fontFamily: '"Caveat", cursive',
                              fontSize: '0.8rem',
                              color: '#888',
                              fontWeight: 700,
                              transform: 'rotate(-2deg)'
                            }}
                          >
                            Actual
                          </Typography>
                        )}
                      </Box>
                      </Box>
                    </SketchyBorder>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </SketchyBorder>
        </Box>
        
        <Grid container spacing={4}>
            
          {/* Education - Full width */}
          <Grid item xs={12}>
            {/* Education */}
            <Box sx={{ mb: 4, position: 'relative' }}>
              <SketchyNumber number="02" rotation={5} />
              <SketchyBorder rotation={-0.2}>
                <Box 
                  sx={{ 
                    p: 4,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    borderRadius: '6px 8px 7px 9px',
                    position: 'relative'
                  }}
                >
                  <SketchyBackground variant="lines" />
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3
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
                    fontFamily: '"Permanent Marker", cursive',
                    fontWeight: 400,
                    fontSize: '1.75rem',
                    transform: 'rotate(0.3deg)'
                  }}
                >
                  Educación
                </Typography>
              </Box>
              
              <HandDrawnDivider />
              
              {cvData.education.map((edu, index) => (
                <SketchyBorder key={index} rotation={0.2}>
                  <Box
                    sx={{ 
                      p: 3, 
                      mb: index !== cvData.education.length - 1 ? 3 : 0,
                      bgcolor: 'rgba(255,255,255,0.5)',
                      borderRadius: '4px 6px 5px 7px'
                    }}
                  >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{
                          fontWeight: 700,
                          fontFamily: '"Kalam", cursive',
                          fontSize: '1.2rem',
                          mb: 1
                        }}
                      >
                        {edu.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        sx={{
                          color: '#555',
                          fontFamily: '"Kalam", cursive',
                          fontSize: '1rem'
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
                          bgcolor: 'transparent',
                          border: '1.5px solid #333',
                          borderRadius: '3px 5px 4px 6px',
                          fontFamily: '"Caveat", cursive',
                          fontSize: '0.9rem',
                          fontWeight: 700
                        }}
                      />
                    </Grid>
                  </Grid>
                  </Box>
                </SketchyBorder>
              ))}
                </Box>
              </SketchyBorder>
            </Box>
          </Grid>
          
          {/* Three column layout for Skills, Software, and Languages */}
          <Grid item xs={12}>
            <Grid container spacing={4}>
              {/* Skills - First Column */}
              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 4, position: 'relative' }}>
              <SketchyNumber number="03" rotation={-3} />
              <SketchyBorder rotation={0.3}>
                <Box 
                  sx={{ 
                    p: 4,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    borderRadius: '6px 8px 7px 9px',
                    position: 'relative'
                  }}
                >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3
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
                    fontFamily: '"Permanent Marker", cursive',
                    fontWeight: 400,
                    fontSize: '1.75rem',
                    transform: 'rotate(-0.3deg)'
                  }}
                >
                  Habilidades
                </Typography>
              </Box>
              
              <HandDrawnDivider />
              
              <Box sx={{ px: 1 }}>
                {cvData.skills.map((skill, index) => (
                  <Box key={index} sx={{ mb: 3, position: 'relative' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography 
                        variant="body2" 
                        sx={{
                          fontWeight: 700,
                          fontFamily: '"Kalam", cursive',
                          fontSize: '1rem',
                          position: 'relative',
                          '&::before': {
                            content: '"•"',
                            position: 'absolute',
                            left: -15,
                            fontSize: '1.2rem',
                            opacity: 0.5
                          }
                        }}
                      >
                        {skill.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{
                          color: '#666',
                          fontFamily: '"Caveat", cursive',
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          position: 'relative'
                        }}
                      >
                        {skill.level}%
                        {skill.level >= 90 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              right: -20,
                              top: -2,
                              fontSize: '0.8rem',
                              transform: 'rotate(10deg)'
                            }}
                          >
                            ★
                          </Box>
                        )}
                      </Typography>
                    </Box>
                    <PencilProgressBar value={skill.level} height={10} />
                  </Box>
                ))}
              </Box>
                </Box>
              </SketchyBorder>
            </Box>
              </Grid>
              
              {/* Software - Second Column */}
              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 4, position: 'relative' }}>
                  <SketchyNumber number="04" rotation={7} />
              <SketchyBorder rotation={-0.2}>
                <Box 
                  sx={{ 
                    p: 4,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    borderRadius: '6px 8px 7px 9px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Decorative sketch in corner */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -20,
                      right: -20,
                      opacity: 0.05
                    }}
                  >
                    <svg width="100" height="100">
                      <path
                        d="M 20 50 Q 30 30, 50 40 T 80 50 Q 70 70, 50 60 T 20 50"
                        stroke="#333"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </Box>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3
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
                    fontFamily: '"Permanent Marker", cursive',
                    fontWeight: 400,
                    fontSize: '1.75rem',
                    transform: 'rotate(0.5deg)'
                  }}
                >
                  Software
                </Typography>
              </Box>
              
              <HandDrawnDivider />
              
              <Box sx={{ px: 1 }}>
                {cvData.software.map((sw, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography 
                        variant="body2" 
                        sx={{
                          fontWeight: 700,
                          fontFamily: '"Kalam", cursive',
                          fontSize: '1rem'
                        }}
                      >
                        {sw.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{
                          color: '#666',
                          fontFamily: '"Caveat", cursive',
                          fontSize: '1.1rem',
                          fontWeight: 700
                        }}
                      >
                        {sw.level}%
                      </Typography>
                    </Box>
                    <PencilProgressBar value={sw.level} />
                  </Box>
                ))}
              </Box>
                </Box>
              </SketchyBorder>
                </Box>
              </Grid>
              
              {/* Languages - Third Column */}
              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 4, position: 'relative' }}>
                  <SketchyNumber number="05" rotation={-6} />
              <SketchyBorder rotation={0.2}>
                <Box 
                  sx={{ 
                    p: 4,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    borderRadius: '6px 8px 7px 9px',
                    position: 'relative'
                  }}
                >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3
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
                    fontFamily: '"Permanent Marker", cursive',
                    fontWeight: 400,
                    fontSize: '1.75rem',
                    transform: 'rotate(-0.4deg)'
                  }}
                >
                  Idiomas
                </Typography>
              </Box>
              
              <HandDrawnDivider />
              
              <Box sx={{ 
                px: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3
              }}>
                {cvData.languages.map((lang, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <DonutProgressBar value={lang.percentage} size={120} />
                    <Typography 
                      variant="body2" 
                      sx={{
                        fontWeight: 700,
                        fontFamily: '"Kalam", cursive',
                        fontSize: '1.1rem',
                        mt: 1
                      }}
                    >
                      {lang.language}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: '#666',
                        fontFamily: '"Caveat", cursive',
                        fontSize: '1rem',
                        fontWeight: 700
                      }}
                    >
                      {lang.level}
                    </Typography>
                  </Box>
                ))}
              </Box>
                </Box>
              </SketchyBorder>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        {/* Contact Info - Full width at bottom */}
        <Box sx={{ mt: 6, mb: 4, position: 'relative' }}>
          <SketchyNumber number="06" rotation={-4} />
          <SketchyBorder rotation={0.3}>
            <Box 
              sx={{ 
                p: 5,
                bgcolor: 'rgba(240,240,240,0.9)',
                background: 'linear-gradient(135deg, rgba(240,240,240,0.9) 0%, rgba(250,250,250,0.9) 100%)',
                borderRadius: '6px 8px 7px 9px',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -100,
                  right: -100,
                  width: 200,
                  height: 200,
                  background: 'radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)',
                  backgroundSize: '10px 10px',
                  transform: 'rotate(25deg)',
                  borderRadius: '50%'
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -80,
                  left: -80,
                  width: 160,
                  height: 160,
                  background: 'radial-gradient(circle, rgba(0,0,0,0.015) 1px, transparent 1px)',
                  backgroundSize: '8px 8px',
                  transform: 'rotate(-15deg)',
                  borderRadius: '40% 60% 60% 40%'
                }
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: '"Permanent Marker", cursive',
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    transform: 'rotate(-0.5deg)',
                    position: 'relative',
                    display: 'inline-block',
                    mb: 2,
                    '&::after': {
                      content: '"✉"',
                      position: 'absolute',
                      top: -15,
                      right: -40,
                      fontSize: '2rem',
                      opacity: 0.3,
                      transform: 'rotate(15deg)'
                    }
                  }}
                >
                  ¡Hablemos!
                </Typography>
                
                {/* Sketchy underline */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <svg width="250" height="15" style={{ display: 'block' }}>
                    <path 
                      d="M 10 8 Q 60 6, 120 8 T 240 8" 
                      stroke="#333" 
                      strokeWidth="2" 
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.6"
                    />
                  </svg>
                </Box>
                
                <Typography
                  sx={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '1.3rem',
                    color: '#666',
                    fontWeight: 700,
                    transform: 'rotate(0.5deg)',
                    mb: 4
                  }}
                >
                  Información de Contacto
                </Typography>
              </Box>
              
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center', 
                      gap: 1.5,
                      p: 3,
                      borderRadius: '8px',
                      transition: 'transform 0.3s ease',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-2px) rotate(0.5deg)'
                      }
                    }}
                  >
                    {/* "¡Aquí estoy!" annotation with arrow */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -40,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: '"Caveat", cursive',
                          fontSize: '1rem',
                          color: '#666',
                          fontWeight: 700,
                          transform: 'rotate(-5deg)',
                          mb: 0.5
                        }}
                      >
                        ¡Aquí estoy!
                      </Typography>
                      <svg width="30" height="20" style={{ marginTop: '-5px' }}>
                        <path
                          d="M 15 0 Q 14 8, 15 15 L 12 12 M 15 15 L 18 12"
                          stroke="#666"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </Box>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: 55,
                          height: 55,
                          border: '1.5px solid #333',
                          borderRadius: '48% 52% 50% 50%',
                          top: -2.5,
                          left: -2.5,
                          transform: 'rotate(10deg)',
                          opacity: 0.3
                        }
                      }}
                    >
                      <LocationIcon sx={{ color: 'white', fontSize: 28 }} />
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: '"Kalam", cursive',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        textAlign: 'center'
                      }}
                    >
                      {cvData.personal.location}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center', 
                      gap: 1.5,
                      p: 3,
                      borderRadius: '8px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px) rotate(-0.5deg)'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: 55,
                          height: 55,
                          border: '1.5px solid #333',
                          borderRadius: '52% 48% 50% 50%',
                          top: -2.5,
                          left: -2.5,
                          transform: 'rotate(-8deg)',
                          opacity: 0.3
                        }
                      }}
                    >
                      <EmailIcon sx={{ color: 'white', fontSize: 28 }} />
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: '"Kalam", cursive',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        textAlign: 'center'
                      }}
                    >
                      {cvData.personal.email}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center', 
                      gap: 1.5,
                      p: 3,
                      borderRadius: '8px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px) rotate(0.3deg)'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: 55,
                          height: 55,
                          border: '1.5px solid #333',
                          borderRadius: '50% 50% 48% 52%',
                          top: -2.5,
                          left: -2.5,
                          transform: 'rotate(12deg)',
                          opacity: 0.3
                        }
                      }}
                    >
                      <PhoneIcon sx={{ color: 'white', fontSize: 28 }} />
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: '"Kalam", cursive',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        textAlign: 'center'
                      }}
                    >
                      {cvData.personal.phone}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
            </Box>
          </SketchyBorder>
        </Box>
        
        {/* Decorative footer sketch */}
        <Box sx={{ mt: 8, textAlign: 'center', opacity: 0.3 }}>
          <svg width="300" height="50" style={{ maxWidth: '100%' }}>
            <path
              d="M 50 25 Q 100 10, 150 25 T 250 25"
              stroke="#333"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="30" cy="25" r="3" fill="#333" opacity="0.5" />
            <circle cx="270" cy="25" r="3" fill="#333" opacity="0.5" />
          </svg>
        </Box>
      </Container>
    </Box>
  );
};

export default Resume;