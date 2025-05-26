import React, { useState, useEffect, useRef } from 'react';
import { Box, Skeleton } from '@mui/material';

const LazyImage = ({ src, alt, sx, className, priority = false, ...props }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imageRef = useRef(null);
  const observerRef = useRef(null);
  
  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imageRef.current) return;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    );
    
    observerRef.current.observe(imageRef.current);
    
    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);
  
  useEffect(() => {
    if (!isInView) return;
    
    // Resetear estado cuando cambia la fuente
    if (src !== imageSrc) {
      setLoading(true);
      setError(false);
      setRevealed(false);
    }
    
    // Crear nuevo Image para precargar
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setLoading(false);
      // Add slight delay for smooth reveal
      requestAnimationFrame(() => {
        setTimeout(() => setRevealed(true), 50);
      });
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
  }, [src, imageSrc, isInView]);
  
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
  
  return (
    <Box
      ref={imageRef}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        ...sx
      }}
    >
      {loading && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: '#f5f5f5',
            '&::after': {
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
            }
          }}
        />
      )}
      <Box
        component="img"
        src={imageSrc}
        alt={alt}
        className={className}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'scale(1)' : 'scale(1.1)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          ...sx
        }}
        {...props}
      />
    </Box>
  );
};

export default LazyImage;