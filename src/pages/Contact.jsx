import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Stack,
  Alert,
  Snackbar,
  Link,
  CircularProgress
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import { getProfile } from '../firebase/profileService';
import { useEffect } from 'react';

// Import Google Fonts
import '@fontsource/permanent-marker';
import '@fontsource/kalam/300.css';
import '@fontsource/kalam/400.css';
import '@fontsource/kalam/700.css';
import '@fontsource/caveat/400.css';
import '@fontsource/caveat/700.css';

// Sketchy border component - moved outside and memoized
const SketchyBorder = React.memo(({ children, sx = {} }) => {
  // Generate random values only once
  const path1 = React.useMemo(() => 
    `M ${0.5 + Math.random() * 0.5} ${0.5 + Math.random() * 0.5} 
     L ${99 + Math.random() * 0.5} ${0.3 + Math.random() * 0.5} 
     L ${99.2 + Math.random() * 0.5} ${99 + Math.random() * 0.5} 
     L ${0.3 + Math.random() * 0.5} ${99.2 + Math.random() * 0.5} 
     Z`, []
  );
  
  const path2 = React.useMemo(() =>
    `M ${0.3 + Math.random() * 0.3} ${0.3 + Math.random() * 0.3} 
     L ${99.3 + Math.random() * 0.3} ${0.5 + Math.random() * 0.3} 
     L ${99.1 + Math.random() * 0.3} ${99.3 + Math.random() * 0.3} 
     L ${0.5 + Math.random() * 0.3} ${99.1 + Math.random() * 0.3} 
     Z`, []
  );

  return (
    <Box sx={{ position: 'relative', ...sx }}>
      {children}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        '& svg': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible'
        }
      }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={path1}
            fill="none"
            stroke="#444"
            strokeWidth="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={path2}
            fill="none"
            stroke="#555"
            strokeWidth="0.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </Box>
    </Box>
  );
});

const Contact = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    
    // Clear errors when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const [contactData, setContactData] = useState({
    email: 'aylinniglerre@gmail.com',
    phone: '232 379 64 17',
    location: 'Monterrey, Nuevo León',
    social: {
      instagram: 'https://www.instagram.com/itslynncarre/',
      linkedin: 'https://www.linkedin.com/in/aylinn-iglesias-carré-244b20340/',
      behance: 'https://behance.net'
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const data = await getProfile();
        setContactData({
          email: data.email || 'aylinniglerre@gmail.com',
          phone: data.phone || '232 379 64 17',
          location: data.location || 'Monterrey, Nuevo León',
          social: {
            instagram: data.social?.instagram || 'https://www.instagram.com/itslynncarre/',
            linkedin: data.social?.linkedin || 'https://www.linkedin.com/in/aylinn-iglesias-carré-244b20340/',
            behance: data.social?.behance || 'https://behance.net'
          }
        });
      } catch (err) {
        console.error("Error fetching contact data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContactData();
  }, []);
  
  const validate = () => {
    const errors = {};
    
    if (!formValues.name.trim()) {
      errors.name = 'El nombre es requerido';
    }
    
    if (!formValues.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!formValues.message.trim()) {
      errors.message = 'El mensaje es requerido';
    }
    
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setFormValues({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    setSubmitSuccess(false);
    setSubmitError(false);
  };

  return (
    <Box sx={{ 
      pt: { xs: 8, md: 10 }, 
      pb: { xs: 6, md: 10 },
      bgcolor: '#FAFAFA',
      position: 'relative',
      minHeight: '100vh',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px',
        pointerEvents: 'none'
      }
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontFamily: '"Permanent Marker", cursive',
                fontWeight: 400,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 4,
                color: '#1a1a1a',
                transform: 'rotate(-0.5deg)',
                textShadow: '2px 2px 0px rgba(0,0,0,0.05)'
              }}
            >
              Contacto
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ 
              mb: 4,
              fontFamily: '"Kalam", cursive',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: '#444',
              fontWeight: 400
            }}>
              ¿Tienes un proyecto en mente o quieres colaborar? Estoy disponible para trabajos freelance,
              pasantías y oportunidades laborales. ¡Contáctame y platiquemos!
            </Typography>
            
            <SketchyBorder sx={{ mb: 6, p: 3, background: '#fff', transform: 'rotate(-0.3deg)' }}>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2.5
                  }}>
                    <EmailIcon sx={{ color: '#000', fontSize: 16 }} />
                  </Box>
                  <Typography variant="body1" sx={{
                    fontFamily: '"Kalam", cursive',
                    fontWeight: 400,
                    color: '#333'
                  }}>
                    {contactData.email}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2.5
                  }}>
                    <PhoneIcon sx={{ color: '#000', fontSize: 16 }} />
                  </Box>
                  <Typography variant="body1" sx={{
                    fontFamily: '"Kalam", cursive',
                    fontWeight: 400,
                    color: '#333'
                  }}>
                    {contactData.phone}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2.5
                  }}>
                    <LocationIcon sx={{ color: '#000', fontSize: 16 }} />
                  </Box>
                  <Typography variant="body1" sx={{
                    fontFamily: '"Kalam", cursive',
                    fontWeight: 400,
                    color: '#333'
                  }}>
                    {contactData.location}
                  </Typography>
                </Box>
              </Stack>
            </SketchyBorder>
            
            <Typography variant="h6" gutterBottom sx={{ 
              fontFamily: '"Permanent Marker", cursive',
              fontWeight: 400,
              fontSize: '1.3rem',
              color: '#1a1a1a',
              transform: 'rotate(-0.3deg)',
              mb: 2
            }}>
              Sígueme
            </Typography>
            
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Link href={contactData.social.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramIcon sx={{ color: 'text.primary', fontSize: 28 }} />
              </Link>
              <Link href={contactData.social.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon sx={{ color: 'text.primary', fontSize: 28 }} />
              </Link>
              <Link href={contactData.social.behance} target="_blank" rel="noopener noreferrer">
                <LanguageIcon sx={{ color: 'text.primary', fontSize: 28 }} />
              </Link>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <SketchyBorder sx={{ 
              p: 4, 
              background: '#fff',
              transform: 'rotate(0.4deg)',
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 20px,
                  rgba(0,0,0,0.01) 20px,
                  rgba(0,0,0,0.01) 21px
                ),
                repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 20px,
                  rgba(0,0,0,0.01) 20px,
                  rgba(0,0,0,0.01) 21px
                )
              `
            }}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  fontFamily: '"Permanent Marker", cursive',
                  fontWeight: 400,
                  fontSize: '1.6rem',
                  mb: 4,
                  color: '#1a1a1a',
                  transform: 'rotate(-0.4deg)',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: 0,
                    width: '100px',
                    height: '2px',
                    background: 'linear-gradient(to right, #333 20%, transparent 80%)',
                    transform: 'rotate(-0.5deg)'
                  }
                }}
              >
                Envía un mensaje
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Nombre"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                      error={!!formErrors.name}
                      helperText={formErrors.name}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fontFamily: '"Kalam", cursive',
                          '& fieldset': {
                            borderColor: '#666',
                            borderRadius: 0,
                          },
                          '&:hover fieldset': {
                            borderColor: '#444',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#333',
                            borderWidth: '2px',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: '"Kalam", cursive',
                          color: '#666',
                          '&.Mui-focused': {
                            color: '#333',
                          },
                        },
                        '& .MuiFormHelperText-root': {
                          fontFamily: '"Caveat", cursive',
                          fontSize: '1rem',
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formValues.email}
                      onChange={handleChange}
                      error={!!formErrors.email}
                      helperText={formErrors.email}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fontFamily: '"Kalam", cursive',
                          '& fieldset': {
                            borderColor: '#666',
                            borderRadius: 0,
                          },
                          '&:hover fieldset': {
                            borderColor: '#444',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#333',
                            borderWidth: '2px',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: '"Kalam", cursive',
                          color: '#666',
                          '&.Mui-focused': {
                            color: '#333',
                          },
                        },
                        '& .MuiFormHelperText-root': {
                          fontFamily: '"Caveat", cursive',
                          fontSize: '1rem',
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Asunto"
                      name="subject"
                      value={formValues.subject}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fontFamily: '"Kalam", cursive',
                          '& fieldset': {
                            borderColor: '#666',
                            borderRadius: 0,
                          },
                          '&:hover fieldset': {
                            borderColor: '#444',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#333',
                            borderWidth: '2px',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: '"Kalam", cursive',
                          color: '#666',
                          '&.Mui-focused': {
                            color: '#333',
                          },
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Mensaje"
                      name="message"
                      multiline
                      rows={6}
                      value={formValues.message}
                      onChange={handleChange}
                      error={!!formErrors.message}
                      helperText={formErrors.message}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fontFamily: '"Kalam", cursive',
                          '& fieldset': {
                            borderColor: '#666',
                            borderRadius: 0,
                          },
                          '&:hover fieldset': {
                            borderColor: '#444',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#333',
                            borderWidth: '2px',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: '"Kalam", cursive',
                          color: '#666',
                          '&.Mui-focused': {
                            color: '#333',
                          },
                        },
                        '& .MuiFormHelperText-root': {
                          fontFamily: '"Caveat", cursive',
                          fontSize: '1rem',
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      sx={{
                        mt: 2,
                        bgcolor: '#333',
                        color: '#fff',
                        borderRadius: '3px',
                        px: 4,
                        py: 1.5,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        fontFamily: '"Kalam", cursive',
                        boxShadow: 'none',
                        position: 'relative',
                        transform: 'rotate(0.2deg)',
                        border: '2px solid #333',
                        '&:hover': {
                          bgcolor: '#222',
                          borderColor: '#222',
                          boxShadow: 'none'
                        },
                        '&:disabled': {
                          bgcolor: '#999',
                          borderColor: '#999',
                          color: '#fff'
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Enviar mensaje'
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </SketchyBorder>
          </Grid>
        </Grid>
      </Container>
      
      <Snackbar
        open={submitSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ 
          width: '100%',
          fontFamily: '"Kalam", cursive',
          '& .MuiAlert-message': {
            fontFamily: '"Kalam", cursive',
          }
        }}>
          ¡Mensaje enviado con éxito! Te responderé lo antes posible.
        </Alert>
      </Snackbar>
      
      <Snackbar
        open={submitError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ 
          width: '100%',
          fontFamily: '"Kalam", cursive',
          '& .MuiAlert-message': {
            fontFamily: '"Kalam", cursive',
          }
        }}>
          Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;