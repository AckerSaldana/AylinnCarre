import React, { useState, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';

const LazyImage = ({ src, alt, sx, ...props }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    // Resetear estado cuando cambia la fuente
    if (src !== imageSrc) {
      setLoading(true);
      setError(false);
    }
    
    // Crear nuevo Image para precargar
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setLoading(false);
    };
    
    img.onerror = () => {
      setError(true);
      setLoading(false);
    };
    
    return () => {
      // Cancelar carga de imagen al desmontar
      img.onload = null;
      img.onerror = null;
    };
  }, [src, imageSrc]);
  
  if (error) {
    return (
      <Box
        sx={{
          ...sx,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f5f5f5',
          color: '#999'
        }}
        {...props}
      >
        Error al cargar la imagen
      </Box>
    );
  }
  
  return loading ? (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        ...sx,
        bgcolor: '#f0f0f0'
      }}
      {...props}
    />
  ) : (
    <Box
      component="img"
      src={imageSrc}
      alt={alt}
      sx={{
        ...sx,
        transition: 'opacity 0.3s ease',
      }}
      {...props}
    />
  );
};

export default LazyImage;