import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  TextField, 
  Grid, 
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  IconButton,
  ImageList,
  ImageListItem,
  Tooltip,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Divider
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  Edit as EditIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Image as ImageIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { getProjects, addProject, updateProject, deleteProject, deleteProjectImage } from '../firebase/projectService';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ArrayField from '../components/ArrayField';
import ProfileEdit from '../components/ProfileEdit';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [authenticated, setAuthenticated] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [imageManagementOpen, setImageManagementOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [activeSection, setActiveSection] = useState('projects');

  // Formulario inicial vacío
  const emptyForm = {
    title: '',
    category: '',
    description: '',
    year: '',
    mentors: [],
    materials: [],
    challenge: '',
    solution: '',
    designProcess: '',
    awards: [],
    featured: false
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setAuthenticated(!!user);
      if (user) {
        fetchProjects();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (imageFiles.length > 0) {
      const newPreviewImages = Array.from(imageFiles).map(file => URL.createObjectURL(file));
      setPreviewImages(newPreviewImages);
      return () => {
        newPreviewImages.forEach(url => URL.revokeObjectURL(url));
      };
    }
  }, [imageFiles]);

  // Cargar proyectos
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects: ", error);
      setSnackbar({
        open: true,
        message: 'Error al cargar proyectos',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Manejar login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
      setSnackbar({
        open: true,
        message: 'Inicio de sesión exitoso',
        severity: 'success'
      });
    } catch (error) {
      console.error("Login error: ", error);
      setSnackbar({
        open: true,
        message: 'Error de inicio de sesión: credenciales incorrectas',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Manejar logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setSnackbar({
        open: true,
        message: 'Sesión cerrada',
        severity: 'info'
      });
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  // Abrir formulario para añadir nuevo proyecto
  const handleAddNew = () => {
    setEditingProject(null);
    setFormData(emptyForm);
    setImageFiles([]);
    setPreviewImages([]);
    setCurrentImages([]);
    setFormOpen(true);
  };

  // Abrir formulario para editar proyecto existente
  const handleEdit = (project) => {
    setEditingProject(project.id);
    const mentors = Array.isArray(project.mentors)
      ? project.mentors
      : (project.mentors ? String(project.mentors).split(',').map(item => item.trim()) : []);
    const materials = Array.isArray(project.materials)
      ? project.materials
      : (project.materials ? String(project.materials).split(',').map(item => item.trim()) : []);
    const awards = Array.isArray(project.awards)
      ? project.awards
      : (project.awards ? String(project.awards).split(',').map(item => item.trim()) : []);
    const projectData = {
      ...project,
      mentors,
      materials,
      awards,
      featured: Boolean(project.featured)
    };
    setFormData(projectData);
    setImageFiles([]);
    setPreviewImages([]);
    setCurrentImages(project.images || []);
    setFormOpen(true);
  };

  // Confirmar eliminación de proyecto
  const confirmDelete = (project) => {
    setProjectToDelete(project);
    setDeleteConfirmOpen(true);
  };

  // Eliminar proyecto
  const handleDelete = async () => {
    if (!projectToDelete) return;
    try {
      setLoading(true);
      await deleteProject(projectToDelete.id);
      setProjects(projects.filter(p => p.id !== projectToDelete.id));
      setSnackbar({
        open: true,
        message: 'Proyecto eliminado correctamente',
        severity: 'success'
      });
    } catch (error) {
      console.error("Error deleting project: ", error);
      setSnackbar({
        open: true,
        message: 'Error al eliminar el proyecto',
        severity: 'error'
      });
    } finally {
      setLoading(false);
      setDeleteConfirmOpen(false);
      setProjectToDelete(null);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  // Manejar cambios en campos de array (coma separados)
  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    const arrayValue = value
      .split(/,(?=\s*[^,]*)/)
      .map(item => item.trim())
      .filter(Boolean);
    setFormData({ ...formData, [name]: arrayValue });
  };

  // Preparar string con comas para inputs
  const prepareArrayForInput = (array) => {
    if (!array || !Array.isArray(array)) return '';
    return array.join(', ');
  };

  // Manejar selección de imágenes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  // Eliminar una imagen del proyecto
  const handleDeleteImage = async (imageUrl) => {
    if (!editingProject) return;
    try {
      setLoading(true);
      await deleteProjectImage(editingProject, imageUrl);
      setCurrentImages(currentImages.filter(url => url !== imageUrl));
      setSnackbar({
        open: true,
        message: 'Imagen eliminada correctamente',
        severity: 'success'
      });
    } catch (error) {
      console.error("Error deleting image: ", error);
      setSnackbar({
        open: true,
        message: 'Error al eliminar la imagen',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Reordenar imágenes
  const moveImageUp = (index) => {
    if (index === 0) return;
    const newImages = [...currentImages];
    const temp = newImages[index];
    newImages[index] = newImages[index - 1];
    newImages[index - 1] = temp;
    setCurrentImages(newImages);
  };

  const moveImageDown = (index) => {
    if (index === currentImages.length - 1) return;
    const newImages = [...currentImages];
    const temp = newImages[index];
    newImages[index] = newImages[index + 1];
    newImages[index + 1] = temp;
    setCurrentImages(newImages);
  };

  const setAsPrimaryImage = (index) => {
    if (index === 0) return; // No hacer nada si ya es la principal
    
    // Crear una copia profunda del array de imágenes actuales
    const newImages = [...currentImages];
    
    // Mover la imagen seleccionada a la primera posición
    const primaryImage = newImages[index];
    newImages.splice(index, 1);
    newImages.unshift(primaryImage);
    
    // Actualizar el estado de las imágenes actuales
    setCurrentImages(newImages);
    
    // Actualizar también el formData con las nuevas imágenes
    setFormData(prevData => ({
      ...prevData,
      images: newImages
    }));
    
    // Mostrar una notificación al usuario
    setSnackbar({
      open: true,
      message: 'Imagen establecida como principal',
      severity: 'success'
    });
  };

  // Cerrar diálogo de gestión de imágenes y aplicar cambios
  const handleImageManagementClose = () => {
    // Asegurarse de guardar los cambios al cerrar el diálogo
    setFormData(prevData => ({
      ...prevData,
      images: currentImages
    }));
    
    setImageManagementOpen(false);
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Crear el objeto que se enviará a Firebase
      const submitData = {
        ...formData,
        // Asegurarse de usar el array de imágenes actual
        images: currentImages
      };
      
      if (editingProject) {
        const updated = await updateProject(editingProject, submitData, imageFiles);
        setProjects(projects.map(p => p.id === editingProject ? updated : p));
        setSnackbar({
          open: true,
          message: 'Proyecto actualizado correctamente',
          severity: 'success'
        });
      } else {
        const newProject = await addProject(submitData, imageFiles);
        setProjects([newProject, ...projects]);
        setSnackbar({
          open: true,
          message: 'Proyecto añadido correctamente',
          severity: 'success'
        });
      }
      setFormData(emptyForm);
      setImageFiles([]);
      setPreviewImages([]);
      setCurrentImages([]);
      setFormOpen(false);
      setEditingProject(null);
  } catch (error) {
    console.error("Error saving project: ", error);
    setSnackbar({
      open: true,
      message: 'Error al guardar el proyecto: ' + error.message,
      severity: 'error'
    });
  } finally {
    setLoading(false);
  }
};

  if (!authenticated) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Administración de Proyectos
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              margin="normal"
              label="Correo electrónico"
              name="email"
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Contraseña"
              name="password"
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>
        </Paper>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          {activeSection === 'projects' ? 'Administración de Proyectos' : 'Administración de Perfil'}
        </Typography>
        <Box>
          {activeSection === 'projects' && (
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={handleAddNew} 
              sx={{ mr: 2 }}
            >
              Nuevo Proyecto
            </Button>
          )}
          <Button 
            variant={activeSection === 'profile' ? 'contained' : 'outlined'} 
            onClick={() => handleSectionChange('profile')}
            sx={{ mr: 2 }}
          >
            Editar Perfil
          </Button>
          <Button 
            variant={activeSection === 'projects' ? 'contained' : 'outlined'} 
            onClick={() => handleSectionChange('projects')}
            sx={{ mr: 2 }}
          >
            Proyectos
          </Button>
          <Button variant="outlined" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Box>
      </Box>
      {activeSection === 'projects' ? (
        // Mostrar el contenido actual de proyectos
        loading && !formOpen && !deleteConfirmOpen ? (
          <Typography align="center" sx={{ my: 4 }}>
            Cargando proyectos...
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {/* Contenido actual de proyectos */}
            {projects.map(project => (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
              <Paper
                  elevation={2}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    borderRadius: 2
                  }}
                >
                <Box
                  sx={{
                    position: 'relative',
                    height: 200,
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5'
                  }}
                >
                  {project.featured && (
                    <Chip
                      icon={<StarIcon fontSize="small" />}
                      label="Destacado"
                      color="primary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        zIndex: 1
                      }}
                    />
                  )}
                  {project.images && project.images.length > 0 ? (
                    <CardMedia
                      component="img"
                      height="200"
                      image={project.images[0]}
                      alt={project.title}
                      sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                  ) : (
                    <Paper
                      sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#eee'
                      }}
                    >
                      <ImageIcon sx={{ fontSize: 60, color: '#bbb' }} />
                    </Paper>
                  )}
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Chip
                      label={project.category}
                      size="small"
                      sx={{ mr: 1 }}
                      color="secondary"
                      variant="outlined"
                    />
                    <Chip label={project.year} size="small" variant="outlined" />
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      mb: 2
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {project.images && (
                      <Typography variant="caption" display="block" color="text.secondary">
                        Imágenes: {project.images.length}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ p: 2, justifyContent: 'flex-end' }}>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(project)}
                    size="small"
                    variant="outlined"
                    color="primary"
                  >
                    Editar
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => confirmDelete(project)}
                    size="small"
                    variant="outlined"
                  >
                    Eliminar
                  </Button>
                </CardActions>
              </Paper>
            </Grid>
          ))}
        </Grid>
        )
      ) : (
        <ProfileEdit />
      )}
      {/* Diálogo para añadir/editar proyecto */}
      <Dialog open={formOpen} onClose={() => !loading && setFormOpen(false)} fullWidth maxWidth="md" scroll="paper">
        <DialogTitle>{editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}</DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Título"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    name="category"
                    value={formData.category || ''}
                    onChange={handleChange}
                    label="Categoría"
                    required
                  >
                    <MenuItem value="diseño industrial">Diseño Industrial</MenuItem>
                    <MenuItem value="diseño visual">Diseño Visual</MenuItem>
                    <MenuItem value="dirección de arte">Dirección de Arte</MenuItem>
                    <MenuItem value="ilustración">Ilustración</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Año"
                  name="year"
                  value={formData.year || ''}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.featured || false}
                      onChange={handleChange}
                      name="featured"
                      color="primary"
                    />
                  }
                  label="Proyecto destacado"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Desafío"
                  name="challenge"
                  value={formData.challenge || ''}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Solución"
                  name="solution"
                  value={formData.solution || ''}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Proceso de Diseño"
                  name="designProcess"
                  value={formData.designProcess || ''}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <ArrayField
                  label="Mentores"
                  values={formData.mentors || []}
                  onChange={(newValues) => setFormData({ ...formData, mentors: newValues })}
                  helperText="Escribe un nombre y presiona 'Añadir' o Enter"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <ArrayField
                  label="Materiales"
                  values={formData.materials || []}
                  onChange={(newValues) => setFormData({ ...formData, materials: newValues })}
                  helperText="Ingresa cada material individualmente"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <ArrayField
                  label="Reconocimientos"
                  values={formData.awards || []}
                  onChange={(newValues) => setFormData({ ...formData, awards: newValues })}
                  helperText="Agrega cada reconocimiento por separado"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Imágenes
                </Typography>
                {currentImages && currentImages.length > 0 && (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {currentImages.length} imágenes existentes
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => setImageManagementOpen(true)}
                        startIcon={<ImageIcon />}
                      >
                        Gestionar imágenes
                      </Button>
                    </Box>
                    {currentImages.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="caption" display="block" gutterBottom>
                          Imagen principal:
                        </Typography>
                        <Card sx={{ maxWidth: 300, mx: 'auto' }}>
                          <CardMedia
                            component="img"
                            height="180"
                            image={currentImages[0]}
                            alt="Imagen principal"
                          />
                          <CardContent sx={{ p: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              La primera imagen se muestra como principal en el catálogo
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    )}
                  </>
                )}
                <Box sx={{ mb: 3 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    startIcon={<AddIcon />}
                    sx={{ mb: 2 }}
                  >
                    {imageFiles.length > 0 
                      ? `${imageFiles.length} nuevas imágenes seleccionadas` 
                      : 'Subir nuevas imágenes'}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={handleImageChange}
                    />
                  </Button>
                  {previewImages.length > 0 && (
                    <Box>
                      <Typography variant="caption" display="block" gutterBottom>
                        Vista previa de nuevas imágenes:
                      </Typography>
                      <ImageList cols={4} rowHeight={120} sx={{ maxHeight: 250, overflow: 'auto' }}>
                        {previewImages.map((img, index) => (
                          <ImageListItem key={index}>
                            <img
                              src={img}
                              alt={`Preview ${index + 1}`}
                              loading="lazy"
                              style={{ height: '100%', objectFit: 'cover' }}
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading} color="primary">
            {loading ? 'Guardando...' : 'Guardar proyecto'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Diálogo para gestionar imágenes existentes */}
      <Dialog open={imageManagementOpen} onClose={handleImageManagementClose} fullWidth maxWidth="md">
        <DialogTitle>
          Gestionar imágenes
          <IconButton
            aria-label="close"
            onClick={handleImageManagementClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" paragraph>
            La primera imagen será utilizada como la principal en el catálogo y vista de detalle. 
            Puedes reorganizar o eliminar imágenes según sea necesario.
          </Typography>
          <Grid container spacing={2}>
            {currentImages.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={3} sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={image}
                    alt={`Imagen ${index + 1}`}
                  />
                  {index === 0 && (
                    <Chip
                      icon={<StarIcon fontSize="small" />}
                      label="Principal"
                      color="primary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        zIndex: 1
                      }}
                    />
                  )}
                  <Box sx={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', gap: 1 }}>
                    <Tooltip title="Mover arriba">
                      <IconButton
                        size="small"
                        color="inherit"
                        onClick={() => moveImageUp(index)}
                        disabled={index === 0}
                      >
                        <ArrowUpwardIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Mover abajo">
                      <IconButton
                        size="small"
                        color="inherit"
                        onClick={() => moveImageDown(index)}
                        disabled={index === currentImages.length - 1}
                      >
                        <ArrowDownwardIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {index !== 0 && (
                      <Tooltip title="Establecer como principal">
                        <IconButton
                          size="small"
                          color="inherit"
                          onClick={() => setAsPrimaryImage(index)}
                        >
                          <StarBorderIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Eliminar imagen">
                      <IconButton
                        size="small"
                        color="inherit"
                        onClick={() => handleDeleteImage(image)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageManagementClose} variant="outlined">
            Guardar cambios
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Admin;
