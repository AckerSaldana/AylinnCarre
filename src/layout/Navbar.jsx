import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Slide,
  useScrollTrigger,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { prefetchOnHover, prefetchAdjacentRoutes } from '../utils/prefetch';

// Import Google Fonts
import '@fontsource/permanent-marker';
import '@fontsource/kalam/300.css';
import '@fontsource/kalam/400.css';
import '@fontsource/kalam/700.css';
import '@fontsource/caveat/400.css';
import '@fontsource/caveat/700.css';

// Efecto de ocultar navbar al hacer scroll
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    threshold: 100
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Prefetch adjacent routes when location changes
  useEffect(() => {
    prefetchAdjacentRoutes(location.pathname);
  }, [location.pathname]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Detectar scroll para cambiar apariencia
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const pages = [
    { name: 'Inicio', path: '/' },
    { name: 'Sobre mí', path: '/about' },
    { name: 'CV', path: '/resume' },
    { name: 'Contacto', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <HideOnScroll>
        <AppBar 
          position="fixed"
          color="transparent"
          elevation={0}
          sx={{
            bgcolor: 'rgba(250, 250, 250, 0.95)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            py: scrolled ? 0 : 0.5,
            boxShadow: 'none',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'url("data:image/svg+xml,%3Csvg width="100" height="2" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 1 Q 25 0.5, 50 1 T 100 1" stroke="%23666" stroke-width="1.5" fill="none" opacity="0.6"/%3E%3C/svg%3E")',
              backgroundRepeat: 'repeat-x',
              backgroundSize: '100px 2px',
              opacity: scrolled ? 0.8 : 0.6
            }
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
              {/* Logo */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography
                  variant="h6"
                  component={RouterLink}
                  to="/"
                  sx={{
                    fontFamily: '"Permanent Marker", cursive',
                    fontWeight: 400,
                    color: '#1a1a1a',
                    textDecoration: 'none',
                    letterSpacing: '-0.02em',
                    fontSize: scrolled ? '1.3rem' : '1.5rem',
                    transition: 'all 0.3s ease',
                    transform: 'rotate(-1deg)',
                    textShadow: '1px 1px 0px rgba(0,0,0,0.05)',
                    position: 'relative',
                    '&:hover': {
                      transform: 'rotate(-1deg) translateY(-1px)'
                    }
                  }}
                >
                  Aylinn Carré
                </Typography>
                {/* Small pencil sketch icon */}
                <Box sx={{ 
                  display: { xs: 'none', sm: 'block' },
                  opacity: 0.7,
                  transform: 'rotate(15deg)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M 4 20 L 5 15 L 15 5 Q 16 4, 17 5 L 19 7 Q 20 8, 19 9 L 9 19 Z" 
                      stroke="#444" 
                      strokeWidth="1.5" 
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M 14 6 L 18 10" 
                      stroke="#444" 
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path 
                      d="M 4.5 19.5 L 5.5 20.5" 
                      stroke="#444" 
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Box>
              </Box>

              {/* Desktop Navigation */}
              {!isMobile && (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1
                  }}
                >
                  {pages.map((page) => (
                    <Button
                      key={page.name}
                      component={RouterLink}
                      to={page.path}
                      onMouseEnter={() => prefetchOnHover(page.path)}
                      sx={{
                        mx: 1.5,
                        px: 2,
                        color: isActive(page.path) ? '#1a1a1a' : '#666',
                        fontSize: '1rem',
                        fontWeight: isActive(page.path) ? 700 : 400,
                        fontFamily: '"Kalam", cursive',
                        letterSpacing: '0.01em',
                        position: 'relative',
                        py: 1.5,
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                        transform: `rotate(${-0.5 + Math.random() * 1}deg)`,
                        '&::after': {
                          content: isActive(page.path) ? '""' : 'none',
                          position: 'absolute',
                          bottom: 10,
                          left: '10%',
                          right: '10%',
                          height: '8px',
                          background: 'url("data:image/svg+xml,%3Csvg width="80" height="8" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M 5 4 Q 20 2, 40 4 T 75 4" stroke="%23FFD700" stroke-width="6" fill="none" opacity="0.5"/%3E%3C/svg%3E")',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          zIndex: -1
                        },
                        '&:hover': {
                          color: '#1a1a1a',
                          transform: `rotate(${-0.5 + Math.random() * 1}deg) translateY(-1px)`,
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 10,
                            left: '10%',
                            right: '10%',
                            height: '8px',
                            background: 'url("data:image/svg+xml,%3Csvg width="80" height="8" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M 5 4 Q 20 2, 40 4 T 75 4" stroke="%23FFD700" stroke-width="6" fill="none" opacity="0.3"/%3E%3C/svg%3E")',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            zIndex: -1
                          }
                        }
                      }}
                    >
                      {page.name}
                    </Button>
                  ))}
                </Box>
              )}

              {/* Mobile Menu Icon */}
              {isMobile && (
                <IconButton
                  onClick={toggleDrawer(true)}
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  sx={{
                    color: '#333',
                    p: 1,
                    '&:hover': {
                      transform: 'rotate(-5deg)',
                      bgcolor: 'transparent'
                    }
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M 4 6 L 20 6" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 4 12 L 20 12" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 4 18 L 20 18" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </IconButton>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Drawer Navigation */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: 400,
            bgcolor: '#FAFAFA',
            py: 3,
            px: 0,
            boxShadow: 'none',
            backgroundImage: `
              radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px'
          }
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            px: 3,
            mb: 3
          }}
        >
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            onClick={toggleDrawer(false)}
            sx={{
              fontFamily: '"Permanent Marker", cursive',
              fontWeight: 400,
              color: '#1a1a1a',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              fontSize: '1.5rem',
              transform: 'rotate(-1deg)'
            }}
          >
            Aylinn Carré
          </Typography>
          
          <IconButton 
            onClick={toggleDrawer(false)}
            sx={{ 
              color: '#333',
              '&:hover': {
                transform: 'rotate(90deg)',
                bgcolor: 'transparent'
              }
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M 6 6 L 18 18" stroke="#333" strokeWidth="2" strokeLinecap="round" />
              <path d="M 18 6 L 6 18" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </IconButton>
        </Box>
        
        <Box sx={{ mb: 3, px: 3 }}>
          <svg width="100%" height="20" style={{ overflow: 'visible' }}>
            <path
              d="M 10 10 Q 50 8, 100 10 T 190 10 T 280 10 T 370 10"
              stroke="#666"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </Box>
        
        <List sx={{ px: 2 }}>
          {pages.map((page) => (
            <ListItem 
              key={page.name}
              component={RouterLink}
              to={page.path}
              onClick={toggleDrawer(false)}
              sx={{
                py: 2.5,
                px: 3,
                position: 'relative',
                '&:hover': {
                  bgcolor: 'transparent',
                  '& .menu-sketch': {
                    opacity: 0.3
                  }
                }
              }}
            >
              {isActive(page.path) && (
                <Box 
                  className="menu-sketch"
                  sx={{ 
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: '40px',
                    opacity: 0.5,
                    pointerEvents: 'none'
                  }}
                >
                  <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
                    <path
                      d="M 30 20 Q 100 15, 200 20 T 350 20"
                      stroke="#FFD700"
                      strokeWidth="20"
                      fill="none"
                      opacity="0.4"
                    />
                  </svg>
                </Box>
              )}
              <ListItemText 
                primary={page.name} 
                primaryTypographyProps={{ 
                  fontWeight: isActive(page.path) ? 700 : 400,
                  fontSize: '1.2rem',
                  fontFamily: '"Kalam", cursive',
                  color: isActive(page.path) ? '#1a1a1a' : '#666',
                  transform: `rotate(${-0.5 + Math.random() * 1}deg)`,
                  position: 'relative',
                  zIndex: 1
                }} 
              />
            </ListItem>
          ))}
        </List>
        
        <Box sx={{ mt: 'auto', px: 3, py: 4 }}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 1,
              fontFamily: '"Caveat", cursive',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#666',
              transform: 'rotate(-0.3deg)'
            }}
          >
            aylinniglerre@gmail.com
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              fontFamily: '"Caveat", cursive',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#666',
              transform: 'rotate(0.3deg)'
            }}
          >
            Monterrey, Nuevo León
          </Typography>
        </Box>
      </Drawer>

    </>
  );
};

export default Navbar;