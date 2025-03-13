import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#FAFAFA',
        pt: { xs: 8, md: 10 },
        pb: { xs: 6, md: 8 },
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: '"DM Serif Display", serif',
                fontWeight: 400,
                mb: 3,
                fontSize: '1.5rem'
              }}
            >
              Aylinn Carré
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.secondary" 
              paragraph
              sx={{
                maxWidth: 300,
                lineHeight: 1.7,
                mb: 4,
                fontFamily: '"Open Sauce", sans-serif'
              }}
            >
              Estudiante de diseño en el Tecnológico de Monterrey, 
              apasionada del arte y las industrias creativas.
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Stack spacing={2}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontFamily: '"Open Sauce", sans-serif'
                  }}
                >
                  <EmailOutlinedIcon sx={{ fontSize: 20 }} />
                  correodeaylinnJAJAJ@gmail.com
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    fontFamily: '"Open Sauce", sans-serif'
                  }}
                >
                  Monterrey, Nuevo León, México
                </Typography>
              </Stack>
            </Box>
            
            <Stack direction="row" spacing={2}>
              <IconButton
                aria-label="Instagram"
                sx={{ 
                  color: 'text.primary',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 0,
                  p: 1,
                  '&:hover': {
                    bgcolor: 'text.primary',
                    color: 'background.paper'
                  }
                }}
                component="a"
                href="https://www.instagram.com/itslynncarre/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon sx={{ fontSize: 20 }} />
              </IconButton>
              
              <IconButton
                aria-label="LinkedIn"
                sx={{ 
                  color: 'text.primary',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 0,
                  p: 1,
                  '&:hover': {
                    bgcolor: 'text.primary',
                    color: 'background.paper'
                  }
                }}
                component="a"
                href="https://www.linkedin.com/in/aylinn-iglesias-carré-244b20340/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600,
                mb: 3,
                position: 'relative',
                display: 'inline-block',
                pb: 1,
                fontFamily: '"DM Serif Display", serif',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '30px',
                  height: '2px',
                  bgcolor: 'text.primary'
                }
              }}
            >
              Navegación
            </Typography>
            
            <Stack spacing={2}>
              <Link 
                component={RouterLink} 
                to="/" 
                color="text.secondary"
                sx={{
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontFamily: '"Open Sauce", sans-serif',
                  '&:hover': {
                    color: 'text.primary'
                  }
                }}
              >
                Inicio
              </Link>
              
              <Link 
                component={RouterLink} 
                to="/projects" 
                color="text.secondary"
                sx={{
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontFamily: '"Open Sauce", sans-serif',
                  '&:hover': {
                    color: 'text.primary'
                  }
                }}
              >
                Proyectos
              </Link>
              
              <Link 
                component={RouterLink} 
                to="/about" 
                color="text.secondary"
                sx={{
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontFamily: '"Open Sauce", sans-serif',
                  '&:hover': {
                    color: 'text.primary'
                  }
                }}
              >
                Sobre mí
              </Link>
              
              <Link 
                component={RouterLink} 
                to="/resume" 
                color="text.secondary"
                sx={{
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontFamily: '"Open Sauce", sans-serif',
                  '&:hover': {
                    color: 'text.primary'
                  }
                }}
              >
                CV
              </Link>
              
              <Link 
                component={RouterLink} 
                to="/contact" 
                color="text.secondary"
                sx={{
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontFamily: '"Open Sauce", sans-serif',
                  '&:hover': {
                    color: 'text.primary'
                  }
                }}
              >
                Contacto
              </Link>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600,
                mb: 3,
                position: 'relative',
                display: 'inline-block',
                pb: 1,
                fontFamily: '"DM Serif Display", serif',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '30px',
                  height: '2px',
                  bgcolor: 'text.primary'
                }
              }}
            >
              Áreas de trabajo
            </Typography>
            
            <Stack spacing={2}>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontFamily: '"Open Sauce", sans-serif'
                }}
              >
                Diseño Industrial
              </Typography>
              
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontFamily: '"Open Sauce", sans-serif'
                }}
              >
                Diseño Visual
              </Typography>
              
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontFamily: '"Open Sauce", sans-serif'
                }}
              >
                Dirección de Arte
              </Typography>
              
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontFamily: '"Open Sauce", sans-serif'
                }}
              >
                Ilustración
              </Typography>
              
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontFamily: '"Open Sauce", sans-serif'
                }}
              >
                Identidad de Marca
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 6, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
        
        <Grid 
          container 
          justifyContent="space-between" 
          alignItems="center"
          direction={isMobile ? 'column' : 'row'}
          spacing={isMobile ? 2 : 0}
        >
          <Grid item>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ 
                fontSize: '0.85rem',
                textAlign: isMobile ? 'center' : 'left',
                fontFamily: '"Open Sauce", sans-serif'
              }}
            >
              &copy; {currentYear} Aylinn Carré. Todos los derechos reservados.
            </Typography>
          </Grid>
          
          <Grid item>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ 
                fontSize: '0.85rem',
                textAlign: isMobile ? 'center' : 'right',
                fontFamily: '"Open Sauce", sans-serif'
              }}
            >
              Diseño y desarrollo por Acker Saldaña
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;