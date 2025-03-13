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
    { name: 'Proyectos', path: '/projects' },
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
            bgcolor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            borderBottom: '1px solid',
            borderColor: scrolled ? 'divider' : 'transparent',
            py: scrolled ? 0 : 1
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
              {/* Logo */}
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  fontFamily: '"DM Serif Display", serif',
                  fontWeight: 400,
                  color: 'text.primary',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  fontSize: '1.5rem'
                }}
              >
                Aylinn Carré
              </Typography>

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
                      sx={{
                        mx: 1.5,
                        color: 'text.primary',
                        fontSize: '0.95rem',
                        fontWeight: isActive(page.path) ? 600 : 400,
                        fontFamily: '"Open Sauce", sans-serif',
                        position: 'relative',
                        py: 1,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: isActive(page.path) ? '100%' : 0,
                          height: 2,
                          bgcolor: 'text.primary',
                          transition: 'width 0.3s ease'
                        },
                        '&:hover::after': {
                          width: '100%'
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
                    color: 'text.primary',
                    p: 1
                  }}
                >
                  <MenuIcon sx={{ fontSize: 28 }} />
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
            maxWidth: 360,
            bgcolor: 'background.paper',
            py: 2,
            px: 0
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
              fontFamily: '"DM Serif Display", serif',
              fontWeight: 400,
              color: 'text.primary',
              textDecoration: 'none',
              letterSpacing: '0.02em'
            }}
          >
            Aylinn Carré
          </Typography>
          
          <IconButton 
            onClick={toggleDrawer(false)}
            sx={{ color: 'text.primary' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <List sx={{ px: 2 }}>
          {pages.map((page) => (
            <ListItem 
              key={page.name}
              component={RouterLink}
              to={page.path}
              onClick={toggleDrawer(false)}
              sx={{
                py: 2,
                borderLeft: isActive(page.path) ? '2px solid' : '2px solid transparent',
                borderColor: isActive(page.path) ? 'text.primary' : 'transparent',
                pl: 3,
                bgcolor: isActive(page.path) ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.05)'
                }
              }}
            >
              <ListItemText 
                primary={page.name} 
                primaryTypographyProps={{ 
                  fontWeight: isActive(page.path) ? 600 : 400,
                  fontSize: '1.1rem',
                  fontFamily: '"Open Sauce", sans-serif'
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
              fontFamily: '"Open Sauce", sans-serif'
            }}
          >
            aylinniglerre@gmail.com
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              fontFamily: '"Open Sauce", sans-serif'
            }}
          >
            Monterrey, Nuevo León
          </Typography>
        </Box>
      </Drawer>
      
      {/* Espaciador para compensar la altura del navbar fijo */}
      <Toolbar sx={{ mb: scrolled ? 0 : 2 }} />
    </>
  );
};

export default Navbar;