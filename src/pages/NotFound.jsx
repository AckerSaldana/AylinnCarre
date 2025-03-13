import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Stack
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.paper'
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '6rem', md: '10rem' },
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: 'text.primary',
            mb: 2
          }}
        >
          404
        </Typography>
        
        <Typography
          variant="h4"
          component="p"
          gutterBottom
          sx={{
            fontFamily: "'Playfair Display', serif",
            mb: 3
          }}
        >
          Página no encontrada
        </Typography>
        
        <Typography
          variant="body1"
          paragraph
          color="text.secondary"
          sx={{ maxWidth: 500, mx: 'auto', mb: 4 }}
        >
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </Typography>
        
        <Stack 
          direction="row" 
          spacing={3} 
          justifyContent="center"
        >
          <Button
            variant="contained"
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
            sx={{
              bgcolor: 'text.primary',
              color: 'background.paper',
              '&:hover': {
                bgcolor: 'text.secondary'
              }
            }}
          >
            Volver al inicio
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default NotFound;