// src/components/LoadingScreen.jsx
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingScreen = ({ message = "Cargando..." }) => {
  return (
    <Box 
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 9999,
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" sx={{ mt: 3, fontFamily: '"Open Sauce", sans-serif' }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingScreen;