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
    <Box sx={{ pt: 10, pb: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                mb: 4
              }}
            >
              Contacto
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              ¿Tienes un proyecto en mente o quieres colaborar? Estoy disponible para trabajos freelance,
              pasantías y oportunidades laborales. ¡Contáctame y platiquemos!
            </Typography>
            
            <Stack spacing={3} sx={{ mb: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ color: 'text.secondary', mr: 2 }} />
                <Typography variant="body1">
                {contactData.email}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ color: 'text.secondary', mr: 2 }} />
                <Typography variant="body1">
                {contactData.phone}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationIcon sx={{ color: 'text.secondary', mr: 2 }} />
                <Typography variant="body1">
                {contactData.location}
                </Typography>
              </Box>
            </Stack>
            
            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
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
            <Paper elevation={0} sx={{ p: 4, bgcolor: 'grey.50' }}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  mb: 3
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
                        bgcolor: 'text.primary',
                        color: 'background.paper',
                        '&:hover': {
                          bgcolor: 'text.secondary'
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
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      <Snackbar
        open={submitSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          ¡Mensaje enviado con éxito! Te responderé lo antes posible.
        </Alert>
      </Snackbar>
      
      <Snackbar
        open={submitError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;