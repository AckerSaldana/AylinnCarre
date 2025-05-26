import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useProfile } from '../context/ProfileContext';

// Import Google Fonts
import '@fontsource/permanent-marker';
import '@fontsource/kalam/300.css';
import '@fontsource/kalam/400.css';
import '@fontsource/kalam/700.css';
import '@fontsource/caveat/400.css';
import '@fontsource/caveat/700.css';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentYear = new Date().getFullYear();
  const { profile } = useProfile();

  const contactData = {
    name: profile?.name || 'Aylinn Carré',
    email: profile?.email || 'aylinniglerre@gmail.com',
    location: profile?.location || 'Monterrey, Nuevo León',
    about: profile?.about || 'Estudiante de sexto semestre de Diseño, apasionada del arte y las industrias creativas.',
    social: {
      instagram: profile?.social?.instagram || 'https://www.instagram.com/itslynncarre/',
      linkedin: profile?.social?.linkedin || 'https://www.linkedin.com/in/aylinn-iglesias-carré-244b20340/'
    }
  };
  
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#FAFAFA',
        pt: { xs: 8, md: 10 },
        pb: { xs: 6, md: 8 },
        mt: 'auto',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'url("data:image/svg+xml,%3Csvg width="120" height="3" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 1.5 Q 30 0.5, 60 1.5 T 120 1.5" stroke="%23444" stroke-width="2" fill="none" opacity="0.4"/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat-x',
          backgroundSize: '120px 3px',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '25px 25px',
          opacity: 0.3,
          pointerEvents: 'none'
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, md: 8 }}>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: '"Permanent Marker", cursive',
                fontWeight: 400,
                mb: 3,
                fontSize: { xs: '1.5rem', md: '1.8rem' },
                color: '#1a1a1a',
                transform: 'rotate(-1deg)',
                display: 'inline-block'
              }}
            >
              {contactData.name}
            </Typography>
            
            <Typography 
              variant="body1" 
              paragraph
              sx={{
                maxWidth: 320,
                lineHeight: 1.8,
                mb: 4,
                fontFamily: '"Kalam", cursive',
                fontSize: '1rem',
                color: '#444',
                fontWeight: 400
              }}
            >
              {contactData.about}
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Stack spacing={2}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1.5,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: -10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: '#666',
                    opacity: 0.5
                  }
                }}>
                  <EmailOutlinedIcon sx={{ fontSize: 18, color: '#666' }} />
                  <Typography 
                    variant="body2"
                    sx={{
                      fontFamily: '"Kalam", cursive',
                      fontSize: '0.95rem',
                      color: '#555'
                    }}
                  >
                    {contactData.email}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="body2"
                  sx={{
                    fontFamily: '"Kalam", cursive',
                    fontSize: '0.95rem',
                    color: '#555',
                    pl: 4
                  }}
                >
                  {contactData.location}
                </Typography>
              </Stack>
            </Box>
            
            <Stack direction="row" spacing={2}>
              <IconButton
                aria-label="Instagram"
                sx={{ 
                  color: '#333',
                  border: '2px solid #333',
                  borderRadius: '3px',
                  p: 1,
                  position: 'relative',
                  transform: 'rotate(-2deg)',
                  transition: 'all 0.3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -3,
                    border: '1px solid #555',
                    borderRadius: '4px',
                    transform: 'rotate(1deg)',
                    opacity: 0.5
                  },
                  '&:hover': {
                    bgcolor: '#333',
                    color: '#fff',
                    transform: 'rotate(-2deg) translateY(-2px)'
                  }
                }}
                component="a"
                href={contactData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon sx={{ fontSize: 20 }} />
              </IconButton>
              
              <IconButton
                aria-label="LinkedIn"
                sx={{ 
                  color: '#333',
                  border: '2px solid #333',
                  borderRadius: '3px',
                  p: 1,
                  position: 'relative',
                  transform: 'rotate(1deg)',
                  transition: 'all 0.3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -3,
                    border: '1px solid #555',
                    borderRadius: '4px',
                    transform: 'rotate(-1deg)',
                    opacity: 0.5
                  },
                  '&:hover': {
                    bgcolor: '#333',
                    color: '#fff',
                    transform: 'rotate(1deg) translateY(-2px)'
                  }
                }}
                component="a"
                href={contactData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: '"Caveat", cursive',
                fontWeight: 700,
                fontSize: '1.5rem',
                mb: 3,
                color: '#333',
                position: 'relative',
                display: 'inline-block',
                transform: 'rotate(-0.5deg)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -5,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'url("data:image/svg+xml,%3Csvg width="80" height="3" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 1.5 Q 20 0.5, 40 1.5 T 80 1.5" stroke="%23666" stroke-width="2" fill="none"/%3E%3C/svg%3E")',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  opacity: 0.6
                }
              }}
            >
              Navegación
            </Typography>
            
            <Stack spacing={1.5} sx={{ mt: 4 }}>
              {[
                { label: 'Inicio', to: '/' },
                { label: 'Sobre mí', to: '/about' },
                { label: 'Experiencia', to: '/resume' },
                { label: 'Contacto', to: '/contact' }
              ].map((item, index) => (
                <Link 
                  key={item.to}
                  component={RouterLink} 
                  to={item.to}
                  sx={{
                    fontFamily: '"Kalam", cursive',
                    fontSize: '1rem',
                    color: '#555',
                    textDecoration: 'none',
                    position: 'relative',
                    display: 'inline-block',
                    transform: `rotate(${-0.5 + Math.random() * 1}deg)`,
                    transition: 'all 0.3s ease',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: -15,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 8,
                      height: 1,
                      backgroundColor: '#888',
                      opacity: 0
                    },
                    '&:hover': {
                      color: '#333',
                      transform: 'translateX(5px)',
                      '&::before': {
                        opacity: 1
                      }
                    }
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: '"Caveat", cursive',
                fontWeight: 700,
                fontSize: '1.5rem',
                mb: 3,
                color: '#333',
                position: 'relative',
                display: 'inline-block',
                transform: 'rotate(0.5deg)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -5,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'url("data:image/svg+xml,%3Csvg width="100" height="3" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 1.5 Q 25 0.5, 50 1.5 T 100 1.5" stroke="%23666" stroke-width="2" fill="none"/%3E%3C/svg%3E")',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  opacity: 0.6
                }
              }}
            >
              Áreas de trabajo
            </Typography>
            
            <Stack spacing={1.5} sx={{ mt: 4 }}>
              {[
                'Diseño Industrial',
                'Diseño Visual',
                'Dirección de Arte',
                'Ilustración',
                'Identidad de Marca'
              ].map((area, index) => (
                <Typography 
                  key={area}
                  variant="body2"
                  sx={{
                    fontFamily: '"Kalam", cursive',
                    fontSize: '1rem',
                    color: '#555',
                    position: 'relative',
                    pl: 2,
                    transform: `rotate(${-0.3 + Math.random() * 0.6}deg)`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      backgroundColor: '#888',
                      opacity: 0.6
                    }
                  }}
                >
                  {area}
                </Typography>
              ))}
            </Stack>
          </Grid>
        </Grid>
        
        {/* Wavy divider */}
        <Box sx={{ 
          my: 8, 
          position: 'relative',
          height: '20px',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '2px',
            background: 'url("data:image/svg+xml,%3Csvg width="200" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 10 Q 50 5, 100 10 T 200 10" stroke="%23888" stroke-width="1.5" fill="none" opacity="0.3"/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat-x',
            transform: 'translateY(-50%)'
          }
        }} />
        
        <Grid 
          container 
          justifyContent="space-between" 
          alignItems="center"
          direction={isMobile ? 'column' : 'row'}
          spacing={isMobile ? 3 : 0}
        >
          <Grid item>
            <Typography 
              variant="body2"
              sx={{ 
                fontFamily: '"Caveat", cursive',
                fontSize: '1rem',
                color: '#666',
                textAlign: isMobile ? 'center' : 'left',
                transform: 'rotate(-0.5deg)',
                display: 'inline-block'
              }}
            >
              &copy; {currentYear} {contactData.name}. Todos los derechos reservados.
            </Typography>
          </Grid>
          
          <Grid item>
            <Typography 
              variant="body2"
              sx={{ 
                fontFamily: '"Caveat", cursive',
                fontSize: '1rem',
                color: '#666',
                textAlign: isMobile ? 'center' : 'right',
                transform: 'rotate(0.5deg)',
                display: 'inline-block'
              }}
            >
              Diseño y desarrollo por Acker Saldaña
            </Typography>
          </Grid>
        </Grid>
      </Container>
      
      {/* Add heartbeat animation */}
      <style>
        {`
          @keyframes heartbeat {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Footer;