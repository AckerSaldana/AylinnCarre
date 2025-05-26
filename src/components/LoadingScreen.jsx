import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import '@fontsource/permanent-marker';
import '@fontsource/kalam/300.css';
import '@fontsource/kalam/400.css';
import '@fontsource/kalam/700.css';
import '@fontsource/caveat/400.css';
import '@fontsource/caveat/700.css';

const LoadingScreen = ({ message = "Cargando portafolio..." }) => {
  const [currentPath, setCurrentPath] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [pencilPosition, setPencilPosition] = useState({ x: 50, y: 50, rotation: -45 });
  
  useEffect(() => {
    // Secuencia mejorada con animación del lápiz
    const sequence = [
      { id: 0, delay: 400, pencil: { x: 165, y: 275, rotation: -10 } },     // Base
      { id: 1, delay: 800, pencil: { x: 200, y: 250, rotation: -90 } },   // Brazo inferior
      { id: 2, delay: 1200, pencil: { x: 200, y: 200, rotation: 0 } },    // Articulación
      { id: 3, delay: 1600, pencil: { x: 240, y: 160, rotation: -45 } },  // Brazo superior
      { id: 4, delay: 2000, pencil: { x: 280, y: 120, rotation: -30 } },  // Cabeza de lámpara
      { id: 5, delay: 2400, pencil: { x: 300, y: 140, rotation: 45 } },   // Luz
      { id: 6, delay: 2800, pencil: { x: 170, y: 295, rotation: 15 } },   // Cable
    ];
    
    sequence.forEach(({ id, delay, pencil }) => {
      setTimeout(() => {
        setCurrentPath(id + 1);
        setPencilPosition(pencil);
      }, delay);
    });
    
    setTimeout(() => {
      setShowDetails(true);
      setPencilPosition({ x: 320, y: 80, rotation: 30 });
    }, 3200);
  }, []);
  
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
        background: 'linear-gradient(to bottom, #FAFAFA 0%, #F5F5F5 100%)',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid pattern */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        opacity: 0.02,
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 40px,
            rgba(0,0,0,0.03) 40px,
            rgba(0,0,0,0.03) 41px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 40px,
            rgba(0,0,0,0.03) 40px,
            rgba(0,0,0,0.03) 41px
          )
        `,
      }} />
      
      {/* Main sketch container */}
      <Box sx={{ 
        position: 'relative',
        width: 400,
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="lampGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#374151" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#1F2937" stopOpacity="0.9"/>
            </linearGradient>
            
            {/* Light glow effect */}
            <radialGradient id="lightGlow">
              <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.4"/>
              <stop offset="50%" stopColor="#FDE68A" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"/>
            </radialGradient>
            
            {/* Arrow marker */}
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
            </marker>
          </defs>
          
          {/* Construction lines (very faint) */}
          <g opacity="0.03">
            <line x1="0" y1="200" x2="400" y2="200" stroke="#CBD5E1" strokeWidth="0.5" />
            <line x1="200" y1="0" x2="200" y2="400" stroke="#CBD5E1" strokeWidth="0.5" />
          </g>
          
          {/* Light glow effect (appears before lamp head) */}
          {currentPath >= 5 && (
            <ellipse
              cx="305"
              cy="138"
              rx="50"
              ry="40"
              fill="url(#lightGlow)"
              opacity="0"
              style={{
                animation: 'fadeIn 0.8s ease-out forwards',
                animationDelay: '0.3s'
              }}
            />
          )}
          
          {/* Desk lamp sketch */}
          <g>

            

            
            {/* Base of the lamp */}
            <path
              d="M 170 300 
                 C 165 300 160 305 160 310
                 L 160 315
                 C 160 320 165 325 170 325
                 L 230 325
                 C 235 325 240 320 240 315
                 L 240 310
                 C 240 305 235 300 230 300
                 Z"
              stroke="#374151"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={currentPath >= 1 ? 1 : 0}
              strokeDasharray="200"
              strokeDashoffset={currentPath >= 1 ? 0 : 200}
              style={{
                transition: 'stroke-dashoffset 0.8s ease-out, opacity 0.3s ease-out',
              }}
            />
            
            {/* Lower arm */}
            <path
              d="M 200 300 
                 L 200 220
                 C 200 210 195 205 190 200"
              stroke="#374151"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={currentPath >= 2 ? 1 : 0}
              strokeDasharray="150"
              strokeDashoffset={currentPath >= 2 ? 0 : 150}
              style={{
                transition: 'stroke-dashoffset 0.8s ease-out, opacity 0.3s ease-out',
              }}
            />
            
            {/* Joint/articulation */}
            <g opacity={currentPath >= 3 ? 1 : 0} style={{ transition: 'opacity 0.5s ease-out' }}>
              <circle
                cx="190"
                cy="200"
                r="10"
                stroke="#374151"
                strokeWidth="2"
                fill="#F3F4F6"
              />
              <circle
                cx="190"
                cy="200"
                r="4"
                fill="#374151"
              />
            </g>
            
            {/* Upper arm */}
            <path
              d="M 195 195
                 L 280 120"
              stroke="#374151"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={currentPath >= 4 ? 1 : 0}
              strokeDasharray="120"
              strokeDashoffset={currentPath >= 4 ? 0 : 120}
              style={{
                transition: 'stroke-dashoffset 0.8s ease-out, opacity 0.3s ease-out',
              }}
            />
            
            {/* Lamp head */}
            <g opacity={currentPath >= 5 ? 1 : 0} style={{ transition: 'opacity 0.5s ease-out' }}>
              <path
                d="M 275 125
                   C 270 120 270 115 275 110
                   L 320 90
                   C 325 87 330 87 335 90
                   C 340 93 340 98 335 103
                   L 290 140
                   C 285 143 280 143 275 140
                   Z"
                stroke="#374151"
                strokeWidth="2.5"
                fill="#F9FAFB"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Lamp head detail */}
              <path
                d="M 290 115 L 315 100"
                stroke="#374151"
                strokeWidth="1.5"
                opacity="0.5"
              />
            </g>
            
            {/* Light rays */}
            <g opacity={currentPath >= 6 ? 1 : 0} style={{ transition: 'opacity 0.6s ease-out' }}>
              <g opacity="0.5">
                <line x1="295" y1="135" x2="285" y2="160" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="300" y1="132" x2="295" y2="157" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="305" y1="130" x2="305" y2="155" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="310" y1="128" x2="315" y2="153" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="315" y1="125" x2="325" y2="150" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
              </g>
              <g opacity="0.3">
                <line x1="302" y1="135" x2="298" y2="152" stroke="#FCD34D" strokeWidth="1" strokeLinecap="round" />
                <line x1="308" y1="133" x2="310" y2="150" stroke="#FCD34D" strokeWidth="1" strokeLinecap="round" />
              </g>
            </g>
            
            {/* Power cable */}
            <path
              d="M 180 305
                 C 170 310 160 315 150 315
                 C 140 315 130 310 125 305"
              stroke="#374151"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity={currentPath >= 6 ? 0.7 : 0}
              strokeDasharray="3 2"
              style={{
                transition: 'opacity 0.5s ease-out',
              }}
            />
            
            {/* Sketch details and annotations */}
            {showDetails && (
              <g opacity="0" style={{ animation: 'fadeIn 0.8s ease-out forwards' }}>
                {/* Dimension lines */}
                <g opacity="0.3">
                  <line x1="360" y1="90" x2="360" y2="330" stroke="#9CA3AF" strokeWidth="0.5" />
                  <line x1="355" y1="95" x2="365" y2="95" stroke="#9CA3AF" strokeWidth="0.5" />
                  <line x1="355" y1="325" x2="365" y2="325" stroke="#9CA3AF" strokeWidth="0.5" />
                </g>
                
                {/* Annotations */}
                <text x="370" y="210" fill="#6B7280" fontSize="11" fontFamily="Kalam, cursive" transform="rotate(-90 370 210)">
                  460mm
                </text>
                
                <text x="50" y="150" fill="#6B7280" fontSize="12" fontFamily="Caveat, cursive">
                  adjustable
                </text>
                <text x="50" y="165" fill="#6B7280" fontSize="12" fontFamily="Caveat, cursive">
                  joints
                </text>
                
                {/* Arrow pointing to joint */}
                <path d="M 90 160 Q 130 180 180 195" stroke="#9CA3AF" strokeWidth="0.8" fill="none" markerEnd="url(#arrowhead)" opacity="0.5" />
                
                {/* Material note */}
                <text x="280" y="340" fill="#6B7280" fontSize="12" fontFamily="Kalam, cursive">
                  aluminum body
                </text>
                
                {/* Title */}
                <text x="200" y="370" fill="#374151" fontSize="16" fontFamily="Permanent Marker, cursive" fontWeight="400" textAnchor="middle">
                  Architect Lamp Study
                </text>
                
                {/* Cross-hatching for material */}
                <g opacity="0.2">
                  <path d="M 165 305 L 168 308 M 168 305 L 171 308 M 171 305 L 174 308" stroke="#6B7280" strokeWidth="0.6" />
                  <path d="M 285 130 L 288 133 M 288 130 L 291 133" stroke="#6B7280" strokeWidth="0.6" />
                </g>
              </g>
            )}
          </g>
          
          {/* Animated pencil */}
          <g 
            transform={`translate(${pencilPosition.x}, ${pencilPosition.y}) rotate(${pencilPosition.rotation})`}
            style={{ 
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
            }}
          >
            <rect x="-3" y="-40" width="6" height="35" fill="#F59E0B" stroke="#374151" strokeWidth="0.5" rx="1" />
            <polygon points="-3,-5 0,0 3,-5" fill="#374151" />
            <rect x="-3" y="-44" width="6" height="4" fill="#F87171" rx="1" />
            <text x="0" y="-20" fill="#92400E" fontSize="3" fontFamily="Arial" textAnchor="middle">2B</text>
          </g>
        </svg>
      </Box>
      
      {/* Loading text */}
      <Typography 
        sx={{ 
          mt: 6,
          fontFamily: '"Kalam", cursive',
          fontSize: '1.2rem',
          fontWeight: 400,
          color: '#374151',
          position: 'relative',
          opacity: 0,
          animation: 'fadeIn 0.8s ease-out 0.5s forwards',
          letterSpacing: '0.02em',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #6B7280, transparent)',
            animation: 'expandWidth 2s ease-out 1s forwards',
          }
        }}
      >
        {message}
      </Typography>
      
      {/* Loading dots */}
      <Box sx={{ 
        display: 'flex', 
        gap: 1, 
        mt: 3,
        opacity: 0,
        animation: 'fadeIn 0.8s ease-out 2s forwards'
      }}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: '#9CA3AF',
              animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite`,
            }}
          />
        ))}
      </Box>
      
      {/* Animation styles */}
      <style>
        {`
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
          
          @keyframes expandWidth {
            to {
              width: 100%;
            }
          }
          
          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0.8);
              opacity: 0.5;
            }
            40% {
              transform: scale(1.2);
              opacity: 1;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default LoadingScreen;