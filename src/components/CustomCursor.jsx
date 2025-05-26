import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!e || !e.target) return;
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over interactive elements
      const target = e.target;
      const interactive = target && (
        target.matches('a, button, input, textarea, select, [role="button"]') ||
        target.closest('a, button, input, textarea, select, [role="button"]')
      );
      setIsPointer(!!interactive);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    // Ensure document is available
    if (typeof document !== 'undefined') {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
  }, []);

  // Don't render on touch devices or if window is not available
  if (typeof window === 'undefined' || 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Cursor dot */}
      <Box
        sx={{
          position: 'fixed',
          left: mousePosition.x,
          top: mousePosition.y,
          width: 8,
          height: 8,
          bgcolor: '#000',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.15s ease',
          opacity: isHidden ? 0 : 1,
          mixBlendMode: 'difference'
        }}
      />
      
      {/* Cursor ring */}
      <Box
        sx={{
          position: 'fixed',
          left: mousePosition.x,
          top: mousePosition.y,
          width: isPointer ? 40 : 30,
          height: isPointer ? 40 : 30,
          border: '1px solid #000',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.15s ease-out',
          opacity: isHidden ? 0 : 0.5,
          mixBlendMode: 'difference'
        }}
      />
    </>
  );
};

export default CustomCursor;