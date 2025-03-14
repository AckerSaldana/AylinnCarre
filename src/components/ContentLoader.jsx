// src/components/ContentLoader.jsx
// Componente para manejar la carga de contenido con diferentes estilos
import React from 'react';
import { Box, CircularProgress, Typography, Fade, Skeleton, Grid } from '@mui/material';

const ContentLoader = ({ message = "Cargando...", fullPage = false, type = "spinner" }) => {
  // Para el tipo spinner, mostramos el CircularProgress clásico
  if (type === "spinner") {
    return (
      <Fade in={true} timeout={300}>
        <Box 
          sx={{
            position: fullPage ? 'fixed' : 'relative',
            top: fullPage ? 0 : 'auto',
            left: fullPage ? 0 : 'auto',
            width: '100%',
            height: fullPage ? '100%' : '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: fullPage ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
            zIndex: fullPage ? 9998 : 'auto',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <CircularProgress size={40} thickness={4} />
          <Typography variant="body1" sx={{ mt: 3, fontFamily: '"Open Sauce", sans-serif' }}>
            {message}
          </Typography>
        </Box>
      </Fade>
    );
  }
  
  // Para el tipo skeleton, mostramos placeholders de contenido
  if (type === "skeleton") {
    return (
      <Fade in={true} timeout={300}>
        <Box sx={{ width: '100%', pt: 2, pb: 3 }}>
          {/* Título */}
          <Skeleton variant="text" width={250} height={60} sx={{ mb: 3 }} />
          
          {/* Párrafos de contenido */}
          <Skeleton variant="text" width="100%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="100%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="90%" height={24} sx={{ mb: 3 }} />
          
          {/* Imagen o bloque de contenido */}
          <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 3 }} />
          
          {/* Más párrafos */}
          <Skeleton variant="text" width="100%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="95%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="90%" height={24} sx={{ mb: 2 }} />
        </Box>
      </Fade>
    );
  }
  
  // Para el tipo "content" (más enfocado a contenido mixto)
  return (
    <Fade in={true} timeout={300}>
      <Box sx={{ width: '100%', pt: 2, pb: 3 }}>
        <Box sx={{ display: 'flex', mb: 3 }}>
          {/* Avatar o imagen pequeña */}
          <Skeleton variant="circular" width={60} height={60} sx={{ mr: 2 }} />
          <Box sx={{ width: '100%' }}>
            <Skeleton variant="text" width={200} height={30} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={150} height={20} />
          </Box>
        </Box>
        
        {/* Contenido principal */}
        <Skeleton variant="rectangular" width="100%" height={180} sx={{ mb: 2 }} />
        
        {/* Elementos más pequeños como botones o chips */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Skeleton variant="rounded" width={80} height={32} />
          <Skeleton variant="rounded" width={100} height={32} />
          <Skeleton variant="rounded" width={90} height={32} />
        </Box>
        
        {/* Más párrafos */}
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="90%" height={20} />
      </Box>
    </Fade>
  );
};

// Componente hijo para mostrar múltiples esqueletos de tarjetas
export const CardSkeletons = ({ count = 3 }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {Array(count).fill(0).map((_, index) => (
        <Box key={index} sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.33% - 11px)' } }}>
          <Skeleton variant="rectangular" width="100%" height={180} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="70%" height={28} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="100%" height={20} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Skeleton variant="rounded" width={60} height={24} />
            <Skeleton variant="rounded" width={70} height={24} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

// Componente para skeleton específico de la página About
export const AboutSkeleton = () => {
  return (
    <Grid container spacing={8}>
      {/* Left column - Photo and Interests */}
      <Grid item xs={12} md={5}>
        <Box>
          {/* Profile photo skeleton */}
          <Skeleton 
            variant="rectangular" 
            width="100%" 
            height={400} 
            sx={{ mb: 5 }}
          />
          
          {/* Interests section */}
          <Skeleton variant="text" width={150} height={40} sx={{ mb: 2 }} />
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} variant="rounded" width={80} height={32} />
            ))}
          </Box>
          
          <Skeleton variant="rectangular" width={200} height={50} />
        </Box>
      </Grid>
      
      {/* Right column - Content */}
      <Grid item xs={12} md={7}>
        <Skeleton variant="rectangular" width="100%" height={250} sx={{ mb: 6 }} />
        
        <Skeleton variant="text" width={220} height={40} sx={{ mb: 3 }} />
        
        <Box sx={{ mb: 6 }}>
          {Array(3).fill(0).map((_, i) => (
            <Skeleton 
              key={i} 
              variant="rectangular" 
              width="100%" 
              height={120} 
              sx={{ mb: 3 }} 
            />
          ))}
        </Box>
        
        <Skeleton variant="text" width={220} height={40} sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          {Array(4).fill(0).map((_, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Skeleton variant="rectangular" width="100%" height={100} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

// Skeleton específico para ProjectDetail
export const ProjectDetailSkeleton = () => {
  return (
    <>
      {/* Breadcrumbs */}
      <Box sx={{ py: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton variant="text" width={40} height={24} />
          <Skeleton variant="text" width={20} height={24} />
          <Skeleton variant="text" width={60} height={24} />
          <Skeleton variant="text" width={20} height={24} />
          <Skeleton variant="text" width={120} height={24} />
        </Box>
      </Box>
      
      {/* Hero section */}
      <Box sx={{ bgcolor: 'grey.100', py: 5, mb: 6 }}>
        <Skeleton variant="text" width={120} height={30} sx={{ mb: 3 }} />
        <Skeleton variant="text" width="60%" height={60} sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
          <Skeleton variant="rounded" width={100} height={32} />
          <Skeleton variant="rounded" width={80} height={32} />
        </Box>
        <Skeleton variant="text" width="80%" height={24} />
        <Skeleton variant="text" width="70%" height={24} />
      </Box>
      
      {/* Main content */}
      <Grid container spacing={6}>
        {/* Left column */}
        <Grid item xs={12} md={8}>
          <Skeleton variant="rectangular" width="100%" height={400} sx={{ mb: 4 }} />
          
          <Skeleton variant="text" width={150} height={36} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="90%" height={20} sx={{ mb: 4 }} />
          
          <Skeleton variant="text" width={150} height={36} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="85%" height={20} sx={{ mb: 4 }} />
          
          <Skeleton variant="text" width={150} height={36} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="95%" height={20} />
          <Skeleton variant="text" width="90%" height={20} sx={{ mb: 6 }} />
          
          {/* Gallery */}
          <Skeleton variant="text" width={150} height={36} sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Skeleton variant="rectangular" width="100%" height={200} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton variant="rectangular" width="100%" height={200} />
            </Grid>
          </Grid>
        </Grid>
        
        {/* Right column */}
        <Grid item xs={12} md={4}>
          <Skeleton variant="rectangular" width="100%" height={350} sx={{ mb: 4 }} />
          <Skeleton variant="rectangular" width="100%" height={200} />
        </Grid>
      </Grid>
    </>
  );
};

export default ContentLoader;