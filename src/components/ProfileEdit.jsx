import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Grid, 
  Button, 
  Divider, 
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Snackbar,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { getProfile, updateProfile } from '../firebase/profileService';
import ArrayField from '../components/ArrayField';

// Componente de panel con contenido
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ProfileEdit = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Cargar datos del perfil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfile();
        setProfileData(data);
      } catch (error) {
        console.error("Error loading profile: ", error);
        setSnackbar({
          open: true,
          message: 'Error al cargar el perfil',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Manejar cambio de tabs
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Manejar cambios en formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Manejar cambios en campos sociales
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      social: {
        ...prevData.social,
        [name]: value
      }
    }));
  };

  // Manejar cambios en arrays
  const handleArrayChange = (field, newValues) => {
    setProfileData(prevData => ({
      ...prevData,
      [field]: newValues
    }));
  };

  // Manejar cambios en arrays complejos (educación, experiencia, etc.)
  const handleComplexArrayChange = (field, index, key, value) => {
    setProfileData(prevData => {
      const updatedArray = [...prevData[field]];
      updatedArray[index] = {
        ...updatedArray[index],
        [key]: value
      };
      return {
        ...prevData,
        [field]: updatedArray
      };
    });
  };

  // Añadir ítem a array complejo
  const addComplexItem = (field, template) => {
    setProfileData(prevData => ({
      ...prevData,
      [field]: [...(prevData[field] || []), template]
    }));
  };

  // Eliminar ítem de array complejo
  const removeComplexItem = (field, index) => {
    setProfileData(prevData => ({
      ...prevData,
      [field]: prevData[field].filter((_, i) => i !== index)
    }));
  };

  // Guardar perfil
  const handleSave = async () => {
    try {
      setSaving(true);
      await updateProfile(profileData);
      setSnackbar({
        open: true,
        message: 'Perfil actualizado correctamente',
        severity: 'success'
      });
    } catch (error) {
      console.error("Error saving profile: ", error);
      setSnackbar({
        open: true,
        message: 'Error al guardar el perfil',
        severity: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="h2">
          Editar Perfil
        </Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </Box>

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Información básica" />
          <Tab label="Sobre mí" />
          <Tab label="Educación" />
          <Tab label="Experiencia" />
          <Tab label="Habilidades" />
          <Tab label="Contacto" />
        </Tabs>

        {/* Tab: Información básica */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="name"
                value={profileData.name || ''}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Título"
                name="title"
                value={profileData.title || ''}
                onChange={handleChange}
                variant="outlined"
                required
                helperText="Ej: Estudiante de Diseño, Diseñadora Industrial, etc."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Correo electrónico"
                name="email"
                value={profileData.email || ''}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Teléfono"
                name="phone"
                value={profileData.phone || ''}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Ubicación"
                name="location"
                value={profileData.location || ''}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Redes sociales
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Instagram"
                name="instagram"
                value={profileData.social?.instagram || ''}
                onChange={handleSocialChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="LinkedIn"
                name="linkedin"
                value={profileData.social?.linkedin || ''}
                onChange={handleSocialChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Behance u otro"
                name="behance"
                value={profileData.social?.behance || ''}
                onChange={handleSocialChange}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab: Sobre mí */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Sobre mí"
                name="about"
                value={profileData.about || ''}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Visión"
                name="vision"
                value={profileData.vision || ''}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enfoque"
                name="approach"
                value={profileData.approach || ''}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ArrayField
                label="Intereses"
                values={profileData.interests || []}
                onChange={(newValues) => handleArrayChange('interests', newValues)}
                helperText="Añade tus áreas de interés"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ArrayField
                label="Actividades"
                values={profileData.activities || []}
                onChange={(newValues) => handleArrayChange('activities', newValues)}
                helperText="Añade tus actividades profesionales"
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab: Educación */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ mb: 3 }}>
            <Button 
              variant="outlined" 
              onClick={() => addComplexItem('education', { 
                title: '', 
                institution: '', 
                period: '' 
              })}
            >
              Añadir educación
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {profileData.education && profileData.education.map((edu, index) => (
              <Grid item xs={12} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6">Educación #{index + 1}</Typography>
                      <Button 
                        color="error" 
                        size="small"
                        onClick={() => removeComplexItem('education', index)}
                      >
                        Eliminar
                      </Button>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Título"
                          value={edu.title || ''}
                          onChange={(e) => handleComplexArrayChange('education', index, 'title', e.target.value)}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Institución"
                          value={edu.institution || ''}
                          onChange={(e) => handleComplexArrayChange('education', index, 'institution', e.target.value)}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Período"
                          value={edu.period || ''}
                          onChange={(e) => handleComplexArrayChange('education', index, 'period', e.target.value)}
                          variant="outlined"
                          helperText="Ej: 2022 - Actualidad"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Tab: Experiencia */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ mb: 3 }}>
            <Button 
              variant="outlined" 
              onClick={() => addComplexItem('experience', { 
                title: '', 
                company: '', 
                details: '',
                period: '' 
              })}
            >
              Añadir experiencia
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {profileData.experience && profileData.experience.map((exp, index) => (
              <Grid item xs={12} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6">Experiencia #{index + 1}</Typography>
                      <Button 
                        color="error" 
                        size="small"
                        onClick={() => removeComplexItem('experience', index)}
                      >
                        Eliminar
                      </Button>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Puesto"
                          value={exp.title || ''}
                          onChange={(e) => handleComplexArrayChange('experience', index, 'title', e.target.value)}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Empresa"
                          value={exp.company || ''}
                          onChange={(e) => handleComplexArrayChange('experience', index, 'company', e.target.value)}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Detalles adicionales"
                          value={exp.details || ''}
                          onChange={(e) => handleComplexArrayChange('experience', index, 'details', e.target.value)}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Período"
                          value={exp.period || ''}
                          onChange={(e) => handleComplexArrayChange('experience', index, 'period', e.target.value)}
                          variant="outlined"
                          helperText="Ej: Febrero 2023 - Actualidad"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Tab: Habilidades */}
        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Habilidades
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={() => addComplexItem('skills', { name: '', level: 80 })}
                  sx={{ mb: 2 }}
                >
                  Añadir habilidad
                </Button>
                
                {profileData.skills && profileData.skills.map((skill, index) => (
                  <Card variant="outlined" key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="subtitle1">{skill.name || 'Nueva habilidad'}</Typography>
                        <Button 
                          color="error" 
                          size="small"
                          onClick={() => removeComplexItem('skills', index)}
                        >
                          Eliminar
                        </Button>
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                          <TextField
                            fullWidth
                            label="Nombre"
                            value={skill.name || ''}
                            onChange={(e) => handleComplexArrayChange('skills', index, 'name', e.target.value)}
                            variant="outlined"
                            required
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Nivel (%)"
                            type="number"
                            value={skill.level || ''}
                            onChange={(e) => handleComplexArrayChange('skills', index, 'level', 
                              parseInt(e.target.value > 100 ? 100 : e.target.value < 0 ? 0 : e.target.value))}
                            variant="outlined"
                            inputProps={{ min: 0, max: 100 }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Software
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={() => addComplexItem('software', { name: '', level: 80 })}
                  sx={{ mb: 2 }}
                >
                  Añadir software
                </Button>
                
                {profileData.software && profileData.software.map((sw, index) => (
                  <Card variant="outlined" key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="subtitle1">{sw.name || 'Nuevo software'}</Typography>
                        <Button 
                          color="error" 
                          size="small"
                          onClick={() => removeComplexItem('software', index)}
                        >
                          Eliminar
                        </Button>
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                          <TextField
                            fullWidth
                            label="Nombre"
                            value={sw.name || ''}
                            onChange={(e) => handleComplexArrayChange('software', index, 'name', e.target.value)}
                            variant="outlined"
                            required
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Nivel (%)"
                            type="number"
                            value={sw.level || ''}
                            onChange={(e) => handleComplexArrayChange('software', index, 'level', 
                              parseInt(e.target.value > 100 ? 100 : e.target.value < 0 ? 0 : e.target.value))}
                            variant="outlined"
                            inputProps={{ min: 0, max: 100 }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Box>
              
              <Box>
                <Typography variant="h6" gutterBottom>
                  Idiomas
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={() => addComplexItem('languages', { language: '', level: '', percentage: 50 })}
                  sx={{ mb: 2 }}
                >
                  Añadir idioma
                </Button>
                
                {profileData.languages && profileData.languages.map((lang, index) => (
                  <Card variant="outlined" key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="subtitle1">{lang.language || 'Nuevo idioma'}</Typography>
                        <Button 
                          color="error" 
                          size="small"
                          onClick={() => removeComplexItem('languages', index)}
                        >
                          Eliminar
                        </Button>
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Idioma"
                            value={lang.language || ''}
                            onChange={(e) => handleComplexArrayChange('languages', index, 'language', e.target.value)}
                            variant="outlined"
                            required
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Nivel"
                            value={lang.level || ''}
                            onChange={(e) => handleComplexArrayChange('languages', index, 'level', e.target.value)}
                            variant="outlined"
                            helperText="Ej: Nativo, Avanzado, etc."
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Porcentaje"
                            type="number"
                            value={lang.percentage || ''}
                            onChange={(e) => handleComplexArrayChange('languages', index, 'percentage', 
                              parseInt(e.target.value > 100 ? 100 : e.target.value < 0 ? 0 : e.target.value))}
                            variant="outlined"
                            inputProps={{ min: 0, max: 100 }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab: Contacto */}
        <TabPanel value={tabValue} index={5}>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Esta sección se refleja en la página de contacto y en el pie de página.
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Correo electrónico"
                name="email"
                value={profileData.email || ''}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="phone"
                value={profileData.phone || ''}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ubicación"
                name="location"
                value={profileData.location || ''}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={saving}
          size="large"
        >
          {saving ? "Guardando..." : "Guardar todos los cambios"}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileEdit;